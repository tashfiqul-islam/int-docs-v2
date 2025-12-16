# Field Nation Developer Platform Documentation

A modern, comprehensive documentation site for the Field Nation Integration Platform, built with [Fumadocs](https://fumadocs.dev) and Next.js.

## 🚀 Features

- **Interactive API Documentation** - Auto-generated from OpenAPI specs with live playground
- **Comprehensive Guides** - Step-by-step tutorials for REST API, Webhooks, and Connectors
- **Search** - Full-text search powered by Orama
- **Dark Mode** - Automatic theme switching with system preference detection
- **Static Export** - Fully static site generation for optimal performance
- **LLM-Friendly** - Structured content optimized for AI assistants

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org) 16 with App Router
- **Documentation:** [Fumadocs](https://fumadocs.dev) - Modern docs framework
- **OpenAPI:** [fumadocs-openapi](https://fumadocs.dev/docs/openapi) - Auto-generated API docs
- **Styling:** Tailwind CSS 4
- **Language:** TypeScript
- **Package Manager:** [Bun](https://bun.sh)

## 📦 Getting Started

### Prerequisites

- [Bun](https://bun.sh) (v1.0+)
- Node.js 18+ (if not using Bun)

### Installation

```bash
# Install dependencies
bun install

# Start development server
bun run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the documentation.

### Build

```bash
# Generate LLM files and build
bun run build

# Start production server
bun run start
```

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── docs/              # Documentation pages
│   ├── api-references/    # Auto-generated API reference pages
│   └── components/        # React components
├── content/               # MDX content files
│   ├── docs/             # Manual documentation
│   └── api-references/    # Auto-generated API docs
├── openapi/               # OpenAPI specification files
│   ├── rest/v2/          # REST API v2 spec
│   └── webhooks/v3/       # Webhooks v3 spec
├── lib/                   # Shared utilities
│   ├── openapi.ts        # OpenAPI configuration
│   └── source.ts         # Fumadocs source loader
└── scripts/               # Build and generation scripts
    ├── generate-openapi-docs.ts  # Generate API docs from OpenAPI
    └── generate-llm-files.ts     # Generate LLM-friendly files
```

## 🔧 Development

### Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production (includes LLM file generation)
- `bun run start` - Start production server
- `bun run lint` - Run linter
- `bun run format` - Format code
- `bun run typecheck` - Type check without emitting files

### Generating API Documentation

API reference pages are auto-generated from OpenAPI specifications:

```bash
# Generate API docs from OpenAPI specs
bun run scripts/generate-openapi-docs.ts
```

This script:
- Reads OpenAPI YAML files from `openapi/`
- Generates MDX files in `content/api-references/`
- Creates index pages for REST API and Webhooks
- Organizes endpoints by tags and operations

### Adding New Documentation

1. Create MDX files in `content/docs/`
2. Update `meta.json` files to control sidebar navigation
3. Use Fumadocs components (Cards, Tabs, Callouts, etc.) for rich content

## 🎨 Customization

### Navigation

Edit `lib/layout.shared.tsx` to customize:
- Navigation links
- Logo and branding
- Theme configuration

### Styling

- Global styles: `app/app.css`
- Tailwind config: `tailwind.config.ts`
- Component styles: Inline with Tailwind classes

### OpenAPI Configuration

Configure OpenAPI specs in `lib/openapi.ts`:
- Add new OpenAPI files
- Configure proxy URL for playground
- Set schema IDs for multiple specs

## 📚 Documentation Sections

- **Getting Started** - Introduction, prerequisites, and quickstart guides
- **REST API** - Complete REST API v2 reference with interactive playground
- **Webhooks** - Webhooks v3 documentation with event handling guides
- **Connectors** - Pre-built connector documentation for 9 platforms
- **Resources** - Support, FAQ, troubleshooting, and reference materials

## 🌐 Deployment

The site supports static export:

```bash
NEXT_EXPORT=true bun run build
```

Output is generated in the `out/` directory and can be deployed to any static hosting service.

## 📝 License

Private - Field Nation Internal Documentation
