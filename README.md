# Vantage

## Overview

Vantage is a unified project intelligence dashboard for engineering teams.

Instead of context-switching between Jira, Confluence, and status meetings, Vantage pulls it all into one view: active tickets, milestone progress, documentation updates, and AI-generated plain-English summaries of what's actually happening across your projects.

It gives engineering leaders and PMs the vantage point they need: see which projects are on track, what's blocking them, and where the team's focus is... in seconds, not spreadsheets.

## AI Chat Assistant

Vantage includes a conversational AI assistant accessible via a floating chat button in the dashboard. Ask questions about your project in natural language and get instant answers about:

- Project progress and completion status
- Current risks and blockers
- Timeline estimates and milestones
- Team velocity and workload
- Specific ticket details

The AI assistant understands context from your live Jira and Confluence data to provide relevant, actionable insights without leaving the dashboard.

## Prerequisites

- Node.js 18+ (Node.js 20 LTS recommended)
- npm (comes with Node.js)

## Install

1. Clone the repository.
2. Open a terminal in the project root.
3. Install dependencies:

```bash
npm install
```

## Run The React App (Vite)

Start the development server:

```bash
npm run dev
```

Vite will print a local URL (usually http://localhost:5173).

## Build And Preview Production

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Lint

Run ESLint:

```bash
npm run lint
```

## Static Version (No Build Needed)

A standalone static version of the site is included in the `static` folder:

- Entry file: `static/index.html`

You can run it in any static hosting environment without installing dependencies.

### Options

- Open `static/index.html` directly in a browser.
- Or serve the `static` folder using any static server/host (GitHub Pages, Netlify, Vercel static deploy, S3, etc.).

