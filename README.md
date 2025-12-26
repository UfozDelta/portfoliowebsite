## Development Commands

```bash
# Start development server (default port 3000)
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run ESLint
npm run lint
```

## Architecture

### Tech Stack
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript (strict mode enabled)
- **Styling**: Tailwind CSS with CSS variables for theming
- **UI Components**: shadcn/ui (New York style variant)
- **Icons**: lucide-react
- **Fonts**: Geist Sans and Geist Mono (loaded from next/font/google)

### Directory Structure

```
app/
  layout.tsx       # Root layout with font configuration and metadata
  page.tsx         # Home page assembling all sections (Header, About, Projects, Contact)
  globals.css      # Tailwind imports and CSS variable definitions

components/
  Header.tsx       # Sticky navigation header with hash links
  About.tsx        # About section
  Projects.tsx     # Project showcase grid with hardcoded project data
  ProjectItem.tsx  # Individual project card component
  Contact.tsx      # Contact form/section
  ui/              # shadcn/ui components (auto-generated, don't manually edit)

lib/
  utils.ts         # Utility functions (cn helper for className merging)
```