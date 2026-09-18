resource "aws_ecr_repository" "amy_fitness" {
  name = "amy-fitness"

  image_scanning_configuration {
    scan_on_push = true
  }

  image_tag_mutability = "MUTABLE"
}
resource "aws_iam_openid_connect_provider" "github" {
  url = "https://token.actions.githubusercontent.com"

  client_id_list = [
    "sts.amazonaws.com"
  ]
}
resource "aws_iam_role" "github_actions" {
  name = "amy-fitness-github-actions"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"

    Statement = [
      {
        Effect = "Allow"

        Principal = {
          Federated = aws_iam_openid_connect_provider.github.arn
        }

        Action = "sts:AssumeRoleWithWebIdentity"

        Condition = {
          StringEquals = {
            "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com"
          }

          StringLike = {
            "token.actions.githubusercontent.com:sub" = "repo:nandipatiavinash@113230925/amy-fitness@1374223836:*"
          }
        }
      }
    ]
  })
}
resource "aws_iam_policy" "github_ecr" {
  name        = "amy-fitness-github-ecr"
  description = "Allow GitHub Actions to push images to the Amy Fitness ECR repository"

  policy = jsonencode({
    Version = "2012-10-17"

    Statement = [
      {
        Effect = "Allow"

        Action = [
          "ecr:GetAuthorizationToken"
        ]

        Resource = "*"
      },
      {
        Effect = "Allow"

        Action = [
          "ecr:BatchCheckLayerAvailability",
          "ecr:CompleteLayerUpload",
          "ecr:InitiateLayerUpload",
          "ecr:PutImage",
          "ecr:UploadLayerPart"
        ]

        Resource = aws_ecr_repository.amy_fitness.arn
      }
    ]
  })
}
resource "aws_iam_role_policy_attachment" "github_ecr" {
  role       = aws_iam_role.github_actions.name
  policy_arn = aws_iam_policy.github_ecr.arn
}
resource "aws_ecs_cluster" "amy_fitness" {
  name = "amy-fitness-cluster"
}
resource "aws_ecs_task_definition" "amy_fitness" {
  family                   = "amy-fitness"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"

  cpu    = "256"
  memory = "512"

  execution_role_arn = aws_iam_role.ecs_task_execution.arn

  container_definitions = jsonencode([
    {
      name      = "amy-fitness"
      image     = "${aws_ecr_repository.amy_fitness.repository_url}:latest"
      essential = true

      portMappings = [
        {
          containerPort = 80
          hostPort      = 80
          protocol      = "tcp"
        }
      ]

      logConfiguration = {
        logDriver = "awslogs"

        options = {
          awslogs-group         = aws_cloudwatch_log_group.amy_fitness.name
          awslogs-region        = "ap-south-1"
          awslogs-stream-prefix = "ecs"
        }
      }
    }
  ])
}
resource "aws_iam_role" "ecs_task_execution" {
  name = "amy-fitness-ecs-task-execution"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"

    Statement = [
      {
        Effect = "Allow"

        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }

        Action = "sts:AssumeRole"
      }
    ]
  })
}
resource "aws_iam_role_policy_attachment" "ecs_task_execution" {
  role = aws_iam_role.ecs_task_execution.name

  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}
resource "aws_cloudwatch_log_group" "amy_fitness" {
  name              = "/ecs/amy-fitness"
  retention_in_days = 7
}
resource "aws_ecs_service" "amy_fitness" {
  name            = "amy-fitness-service"
  cluster         = aws_ecs_cluster.amy_fitness.id
  task_definition = aws_ecs_task_definition.amy_fitness.arn

  desired_count = 1

  launch_type = "FARGATE"

  network_configuration {
    subnets          = aws_subnet.public[*].id
    security_groups  = [aws_security_group.ecs.id]
    assign_public_ip = true
  }

  depends_on = [
    aws_iam_role_policy_attachment.ecs_task_execution
  ]
}
resource "aws_ecs_service" "amy_fitness" {
  name            = "amy-fitness-service"
  cluster         = aws_ecs_cluster.amy_fitness.id
  task_definition = aws_ecs_task_definition.amy_fitness.arn

  desired_count = 1

  launch_type = "FARGATE"

  network_configuration {
    subnets          = aws_subnet.public[*].id
    security_groups  = [aws_security_group.ecs.id]
    assign_public_ip = true
  }

  depends_on = [
    aws_iam_role_policy_attachment.ecs_task_execution
  ]
}