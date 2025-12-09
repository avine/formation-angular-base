# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Angular training documentation project that generates presentation slides using Reveal.js. The project contains two separate slide decks:

- **Course** (`course/`): Full training course materials (port 3000)
- **Workbook** (`workbook/`): Lab exercises and practical work (port 3100)

Both use Vite as the build tool and Reveal.js for rendering markdown-based presentation slides.

## Development Commands

### Starting Development Servers

```bash
# Start course presentation (http://localhost:3000)
npm run start:course

# Start workbook presentation (http://localhost:3100)
npm run start:workbook
```

### Building for Production

```bash
# Build course presentation
npm run build:course

# Build workbook presentation
npm run build:workbook

# Build both
npm run build
```

Build outputs are placed in `../dist/course` and `../dist/workbook` respectively.

## Architecture

### Dual Presentation Structure

The project maintains two parallel presentation structures:

1. **Course presentations** - comprehensive training slides with detailed theory
2. **Workbook presentations** - hands-on lab exercises

Both share:
- Common styles (`styles/`)
- Common plugins (`plugins/copy-code/`)
- Dependencies (Reveal.js, highlight.js, etc.)

### Key Files

**Entry points:**
- `course/index.html` - Lists all course markdown files in order
- `workbook/index.html` - Lists all workbook markdown files in order
- `course/main.js` - Reveal.js configuration for course (1920x1080 slides)
- `workbook/main.js` - Reveal.js configuration for workbook (1400x1980 slides)

**Configuration:**
- `course/vite.config.js` - Vite config for course (port 3000)
- `workbook/vite.config.js` - Vite config for workbook (port 3100)

**Content:**
- `course/public/*.md` - Course slide markdown files
- `workbook/public/*.md` - Lab exercise markdown files

Markdown files use special separators:
- `\n\n\n\n\n\n\n\n\n\n` (10 newlines) - horizontal slide separator
- `<!-- separator-vertical -->` - vertical slide separator
- `NOTES:` - speaker notes separator

### Reveal.js Plugins

The project uses custom and standard Reveal.js plugins:

- **Markdown** - Parse markdown content into slides
- **Highlight** - Syntax highlighting for code blocks (atom-one-light theme)
- **Notes** - Speaker notes support
- **CopyCode** (custom) - Adds copy-to-clipboard buttons to code blocks

Special feature: Press 'x' key to trigger confetti animation (using canvas-confetti).

### Content Organization

Course chapters (in order):
1. Getting started
2. Workspace
3. TypeScript (prerequisite)
4. Components
5. Testing
6. Control flow
7. Directives
8. Signals
9. Dependency injection
10. Pipes
11. RxJS (prerequisite)
12. HTTP client
13. Routing
14. Forms
15. More on Components (appendix)

The workbook follows the same structure minus the prerequisite chapters (TypeScript, RxJS) and the chapter "More on Components".

### Styling

The project uses SCSS with a custom theme system:
- `styles/theme.scss` - Main theme configuration
- `styles/custom.scss` - Custom styling
- `styles/colors-light.scss` & `styles/colors-dark.scss` - Color schemes
- `plugins/copy-code/copy-code.scss` - Copy button styling

Fonts:
- Nunito - Headings
- Open Sans - Body text
- Source Code Pro - Code blocks

## Adding New Content

To add a new chapter:

1. Create markdown file in `course/public/` or `workbook/public/`
2. Add file path to the array in respective `index.html`
3. Update table of contents in `00_table_of_contents.md`

File naming convention: `NN_chapter_name.md` where NN is the chapter number.

Special prefixes:
- `NN__name.md` (double underscore) - Indicates prerequisite/supplementary content

## Parent Repository Context

This `doc/` directory is part of a larger Angular training repository that includes:
- Lab exercises (`../lab/`)
- Evaluation materials (`../evaluations/`)
- PDF exports (`../pdf/`)
- Scripts (`../scripts/`)
