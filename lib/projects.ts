export interface Project {
  slug: string
  title: string
  description: string
  tech: string[]
  /** Repo URL. Leave out if there isn't a public one; the source link is then hidden. */
  github?: string
  demo?: string
  /** Shown in the list and on the project page when set. */
  year?: number
  status?: "live" | "archived"
  /** Plain-text write-up. Blank lines separate paragraphs. Empty means not written yet. */
  body: string
  /** Hidden projects are kept in the database but not shown on the site. */
  visible: boolean
}

type Seed = Omit<Project, "body" | "visible">

/** Starting data. Used until the first save in the admin, and when Redis is not connected. */
const seeds: Seed[] = [
  {
    slug: "fundingflow",
    title: "FundingFlow",
    description: "ML-powered cross-exchange funding rate arbitrage system with delta-neutral portfolios",
    tech: ["Python", "scikit-learn", "XGBoost", "PostgreSQL", "asyncio", "WebSockets"],
    github: "https://github.com/UfozDelta/fundingflow",
  },
  {
    slug: "edigen",
    title: "EdiGen",
    description: "Creates short-form content from long-form videos using machine learning",
    tech: ["Python", "TensorFlow", "FFmpeg", "OpenAI"],
    github: "https://github.com/UfozDelta/WindowsTalk",
  },
  {
    slug: "arbright",
    title: "ArbRight",
    description: "Finds real-time arbitrage opportunities between different sportsbooks",
    tech: ["Python", "WebSockets", "APIs", "Supabase"],
    github: "https://github.com/UfozDelta/ArbRight",
  },
  {
    slug: "uoft-explore",
    title: "UofT Credit Explorer",
    description: "Visualizes UofT course prerequisites as an interactive dependency graph",
    tech: ["Next.js", "D3.js", "Python", "Web Scraping", "ChromaDB"],
    github: "https://github.com/UfozDelta/uoft-explore",
  },
  {
    slug: "moventra",
    title: "Moventra",
    description: "Habit tracking app with streak tracking, calendar visualization, and routine management",
    tech: ["React Native", "Next.js", "Supabase", "Prisma", "TypeScript"],
    github: "https://github.com/UfozDelta/Moventra",
  },
  {
    slug: "rbc-pdf-reader",
    title: "RBC Credit Statement Reader",
    description: "Analyzes RBC credit card statements and visualizes them in an informative way",
    tech: ["Next.js", "GraphQL", "Python", "OCR"],
    github: "https://github.com/UfozDelta/rbc-pdf-reader",
  },
  {
    slug: "swiftrttc",
    title: "SwiftrTTC",
    description: "Real-time TTC bus tracking and transit news",
    tech: ["React Native", "Next.js", "Python"],
    github: "https://github.com/UfozDelta/SwiftrTTC",
  },
  {
    slug: "trading-dashboard",
    title: "Trading Dashboard",
    description: "Dashboard for viewing the market",
    tech: ["Express.js", "Redis", "Next.js", "Node"],
    // Repo link removed: it pointed at WindowsTalk, which is EdiGen's repo. Add the real one here.
  },
  {
    slug: "velox",
    title: "Velox",
    description: "Streamlined trade execution CLI for efficient market operations",
    tech: ["Python", "WebSocket", "APIs"],
    github: "https://github.com/UfozDelta/Velox",
  },
]

export const EMAIL = "max.syagrovskyy@gmail.com"

export const defaultProjects: Project[] = seeds.map((p) => ({ ...p, body: "", visible: true }))

/**
 * Put your resume in /public (for example public/resume.pdf) and set this to "/resume.pdf".
 * While it is empty, no resume link appears anywhere.
 */
export const RESUME_URL = ""

export const links = [
  { label: "GitHub", href: "https://github.com/UfozDelta" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/maksymsyagrovskyy" },
  { label: "Email", href: `mailto:${EMAIL}` },
  { label: "Twitter", href: "https://x.com/Max0xf" },
]

