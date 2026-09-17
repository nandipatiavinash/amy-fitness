output "ecr_repository_url" {
  description = "ECR Repository URL"
  value       = aws_ecr_repository.amy_fitness.repository_url
}
output "github_actions_role_arn" {
  description = "IAM role ARN used by GitHub Actions"
  value       = aws_iam_role.github_actions.arn
}