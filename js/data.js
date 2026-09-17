/**
 * AMY FITNESS — CONTENT DATA
 * ---------------------------------------------------------------
 * Every editable string on the site lives here. Swap copy, numbers,
 * and image paths in this one file — the markup never needs to change.
 *
 * Anything marked PLACEHOLDER is invented for layout purposes only
 * and is NOT a real business claim. Replace before launch.
 * --------------------------------------------------------------- */

const HERO_IMAGE = "images/hero.jpg";
const ABOUT_IMAGE = "images/about.jpg";

const SITE = {
  name: "Amy Fitness",
  tagline: "Strength coaching for people who take training seriously.",
  phone: "+91 95422 24419",
  phoneRaw: "+919542224419",
  email: "hello@amyfitness.com",
  plusCode: "F94V+5R Madhapur, Hyderabad, Telangana",
  address: [
    "Plot No: 109 & 110, 1st Floor",
    "Survey of India Colony Road, Parvath Nagar",
    "Chandanayak Thanda, Madhapur",
    "Hyderabad, Telangana 500081"
  ],
  mapsUrl: "https://maps.app.goo.gl/FmhWkc4vo23L75DfA",
  mapsEmbed: "https://maps.google.com/maps?q=Amy+Fitness,+Plot+No+109+110,+1st+Floor,+Survey+of+India+Colony+Road,+Parvath+Nagar,+Chandanayak+Thanda,+Madhapur,+Hyderabad,+Telangana+500081&t=&z=17&ie=UTF8&iwloc=B&output=embed",
  hours: [
    { d: "Mon — Sat", h: "5:30 am — 10:00 pm" },
    { d: "Sunday", h: "6:00 am — 11:00 am" },
  ],
  social: [
    { label: "Instagram", href: "https://www.instagram.com/amy_fitness_4419/" },
    { label: "WhatsApp", href: "https://wa.me/919542224419" },
  ],
};

const NAV_LINKS = [
  { label: "Training", href: "training.html" },
  { label: "Coaches", href: "coaches.html" },
  { label: "Facility", href: "facility.html" },
  { label: "Results", href: "results.html" },
  { label: "About", href: "about.html" },
];

const PROGRAMS = [
  {
    slug: "strength-training",
    index: "01",
    name: "Strength Training",
    tag: "Barbell / Progressive Overload",
    summary: "Structured strength cycles built on the big compound lifts, programmed around your recovery and schedule.",
    detail: "A progressive strength system centered on the squat, deadlift, press and pull. Sessions are periodized in blocks so load increases only when your technique and recovery support it — not by accident.",
    includes: ["Movement assessment", "Periodized programming", "Technique coaching on every rep", "Monthly re-testing"],
    image: "images/program_strength.jpg"
  },
  {
    slug: "personal-training",
    index: "02",
    name: "Personal Training",
    tag: "1:1 Coaching",
    summary: "One coach, one plan, fully built around your goals, injury history and time available to train.",
    detail: "Fully individualized coaching. Your program is written around your body, your schedule and your goal — whether that's a first pull-up, a returning injury, or a long-term body-composition change.",
    includes: ["Private sessions", "Custom programming", "Ongoing plan adjustments", "Direct coach access"],
    image: "images/program_personal.jpg"
  },
  {
    slug: "conditioning",
    index: "03",
    name: "Conditioning",
    tag: "Engine / Work Capacity",
    summary: "Build a bigger aerobic and anaerobic engine without sacrificing the strength you've already built.",
    detail: "Conditioning work designed to raise your work capacity — intervals, tempo efforts and mixed-modal circuits sequenced so they support your strength training instead of competing with it.",
    includes: ["Heart-rate based zones", "Mixed-modal circuits", "Progress benchmarks", "Recovery-aware scheduling"],
    image: "images/program_conditioning.jpg"
  },
  {
    slug: "athletic-performance",
    index: "04",
    name: "Athletic Performance",
    tag: "Speed / Power / Sport",
    summary: "Sport-specific power, speed and change-of-direction work for competitive and recreational athletes.",
    detail: "For athletes training for a sport, not just the gym. Programming layers speed mechanics, plyometrics and rotational power on top of a strength base, timed to your season.",
    includes: ["Sprint mechanics", "Plyometric progressions", "In-season load management", "Off-season build cycles"],
    image: "images/program_athletic.jpg"
  },
  {
    slug: "mobility-recovery",
    index: "05",
    name: "Mobility & Recovery",
    tag: "Range of Motion / Restoration",
    summary: "Targeted mobility work and recovery protocols that keep training sustainable over years, not weeks.",
    detail: "The unglamorous work that keeps you training long-term — joint-specific mobility, breathing mechanics and recovery protocols built around what your other training is asking of your body.",
    includes: ["Joint-specific mobility work", "Breathing & bracing mechanics", "Recovery protocol design", "Movement screening"],
    image: "images/program_mobility.jpg"
  },
  {
    slug: "group-training",
    index: "06",
    name: "Group Training",
    tag: "Small Group / Coached",
    summary: "Small, coached groups that keep the accountability of a team with the precision of individual coaching.",
    detail: "Capped small-group sessions — never a crowded class. You get programmed training, real coaching cues, and the energy of training alongside people working toward similar goals.",
    includes: ["Groups capped at 8", "Scaled to each member", "Weekly programming cycle", "Community accountability"],
    image: "images/program_group.jpg"
  },
];

const COACHES = [
  {
    slug: "arjun-sharma",
    name: "Arjun Sharma",
    role: "Head Performance Coach",
    spec: "Strength / Conditioning / Athletic Performance",
    years: "12+",
    clients: "600+",
    philosophy: "Train the pattern before you load the pattern.",
    bio: "Arjun leads programming for the strength and performance tracks at Amy Fitness. His approach favors patient progression — building airtight technique before adding heavy load — and working closely with each client on long-term periodization.",
    image: "images/coach_james.jpg"
  },
  {
    slug: "pooja-reddy",
    name: "Pooja Reddy",
    role: "Personal Training Lead",
    spec: "1:1 Coaching / Body Composition / Injury Return",
    years: "9+",
    clients: "450+",
    philosophy: "Consistency beats intensity, every time.",
    bio: "Pooja specializes in individualized coaching for clients returning from injury or starting from scratch. She builds programs that fit into real IT and corporate schedules in Madhapur.",
    image: "images/coach_renee.jpg"
  },
  {
    slug: "vikram-verma",
    name: "Vikram Verma",
    role: "Conditioning Coach",
    spec: "Engine Building / Metabolic Conditioning",
    years: "7+",
    clients: "350+",
    philosophy: "Build the engine that strength can sit on top of.",
    bio: "Vikram designs the conditioning tracks with an emphasis on measurable work capacity — heart-rate zones and honest benchmarking so progress is visible.",
    image: "images/coach_marcus.jpg"
  },
  {
    slug: "sneha-rao",
    name: "Sneha Rao",
    role: "Mobility & Recovery Specialist",
    spec: "Mobility / Breathing Mechanics / Movement Screening",
    years: "10+",
    clients: "500+",
    philosophy: "The best program is the one your body can actually recover from.",
    bio: "Sneha runs movement screening for every new client and builds the mobility and recovery protocols that sit underneath everyone else's programming — keeping training sustainable.",
    image: "images/coach_dana.jpg"
  },
];

const STATS = [
  { n: "10", suffix: "+", label: "Years Coaching" },
  { n: "4", suffix: "", label: "Full-Time Coaches" },
  { n: "6", suffix: "", label: "Training Programs" },
  { n: "8", suffix: "", label: "Max Group Size" },
];

const RESULTS = [
  {
    name: "Krishna Kumar",
    metric: "+40 kg Squat / -12 kg Fat Loss",
    goal: "Strength & Body Comp",
    program: "Strength Training",
    duration: "7 months",
    quote: "The plan changed every time my body needed it to. I added 40kg to my squat while shedding fat systematically.",
  },
  {
    name: "Ananya Sharma",
    metric: "100% Pain-Free / +15 kg Deadlift",
    goal: "Post-Injury Return",
    program: "Mobility & Recovery → Personal Training",
    duration: "6 months",
    quote: "I stopped guessing in the gym. The coaches fixed my knee mechanics before we added heavy load.",
  },
  {
    name: "Vikram Reddy",
    metric: "+25% Work Capacity / -10 kg",
    goal: "Engine & Stamina",
    program: "Conditioning",
    duration: "5 months",
    quote: "Built an incredible engine that raised my stamina without burning out my strength gains.",
  },
  {
    name: "Siddharth Verma",
    metric: "First 10 Strict Pull-Ups",
    goal: "Upper Body Strength",
    program: "Personal Training",
    duration: "4 months",
    quote: "Coaching that actually adjusted to my busy tech work schedule in Madhapur instead of expecting me to adjust to it.",
  },
  {
    name: "Priya Patel",
    metric: "+30 kg Compound Total",
    goal: "Power & Speed",
    program: "Athletic Performance",
    duration: "8 months",
    quote: "The precision in technique cues changed everything for my athletic speed and joint health.",
  },
  {
    name: "Rahul Rao",
    metric: "-15 kg Fat Loss / Muscle Gain",
    goal: "Body Transformation",
    program: "Group Training",
    duration: "6 months",
    quote: "Capped small group size meant I got individual attention on every rep while enjoying team energy.",
  },
];

const TESTIMONIALS = [
  {
    quote: "I came here looking for a better workout. I left with a completely different approach to training.",
    attr: "Member, Strength Training",
  },
  {
    quote: "The coaching is specific in a way I hadn't experienced before — every cue had a reason behind it.",
    attr: "Member, Personal Training",
  },
  {
    quote: "It's the first program that actually adjusted around my schedule instead of the other way around.",
    attr: "Member, Group Training",
  },
];

const FACILITY_IMAGES = [
  { key: "a", label: "Training Floor", image: "images/facility_a.jpg" },
  { key: "b", label: "Strength Area", image: "images/facility_b.jpg" },
  { key: "c", label: "Conditioning Area", image: "images/facility_c.jpg" },
  { key: "d", label: "Equipment Wall", image: "images/facility_d.jpg" },
  { key: "e", label: "Coaching Studio", image: "images/facility_e.jpg" },
  { key: "f", label: "Recovery Room", image: "images/facility_f.jpg" },
];

