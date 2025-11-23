# 🔥 Errloom

**Debug Production Outages in Your Browser**

Errloom is an interactive learning platform that teaches developers how to debug real-world production outages. Practice troubleshooting common issues like 404 errors, N+1 queries, memory leaks, CORS errors, and environment variable misconfigurations—all in your browser with no setup required.

<div align="center">

[![GitHub stars](https://img.shields.io/github/stars/OSP06/errloom?style=social)](https://github.com/OSP06/errloom/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/OSP06/errloom?style=social)](https://github.com/OSP06/errloom/network/members)
[![CI Status](https://github.com/OSP06/errloom/workflows/CI/badge.svg)](https://github.com/OSP06/errloom/actions)
[![Built with React](https://img.shields.io/badge/React-19.2-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2-purple.svg)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

### [🚀 Try Live Demo](https://errloom.dev) | [📖 Documentation](https://github.com/OSP06/errloom#readme) | [💬 Discussions](https://github.com/OSP06/errloom/discussions)

</div>

---

### 📸 Screenshots

<div align="center">

![Errloom Hero](./public/assets/marketing/screenshot-hero.png)
*Interactive debugging scenarios with real production outage examples*

![Scenario Player](./public/assets/marketing/screenshot-scenario.png)
*Step-by-step guided debugging with code editor, logs, and interactive tasks*

![Demo](./public/assets/marketing/demo.gif)
*Live demo showing the complete debugging experience*

</div>

---

## 📑 Table of Contents

- [First Contributions Welcome!](#-first-contributions-welcome)
- [Features](#-features)
- [Available Scenarios](#-available-scenarios)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Contributing New Scenarios](#-contributing-new-scenarios)
- [Tech Stack](#-tech-stack)
- [Contributing](#-contributing)
- [Deployment](#-deployment)
- [License](#-license)

## 🎯 First Contributions Welcome!

**New to open source? Start here!** We've made it super easy to make your first contribution:

### 📌 Good First Issues (Pick One!)

1. **🎓 Create a New Beginner Scenario** (Estimated: 30-45 minutes)
   - Use our [scenario template](scenarios/templates/scenario-template.yaml) to create a debugging scenario
   - Examples: Race condition bug, API timeout, SQL injection fix, Docker networking issue
   - Follow the [step-by-step guide](scenarios/templates/README.md)
   - Just add one YAML file—no code changes needed!
   - **Why it's easy**: Template provided, auto-validation via CI, clear examples to follow

2. **📝 Improve Scenario Documentation** (Estimated: 15-20 minutes)
   - Pick any scenario in `public/scenarios/` and enhance the explanations
   - Add real-world context, better hints, or clearer task instructions
   - Improve completion summaries or add helpful resource links
   - **Why it's easy**: Small, focused changes with immediate impact

3. **💡 Add Code Comments to Core Components** (Estimated: 20-30 minutes)
   - Document functions in [ScenarioPlayer.tsx](src/components/ScenarioPlayer.tsx) or [TaskPanel.tsx](src/components/TaskPanel.tsx)
   - Add JSDoc comments explaining complex logic
   - Help future contributors understand the codebase
   - **Why it's easy**: No functional changes, just explanatory comments

### 🚀 How to Contribute

```bash
# 1. Fork and clone
git clone https://github.com/YOUR_USERNAME/errloom.git
cd errloom

# 2. Create a branch
git checkout -b my-first-contribution

# 3. Make your changes and test
npm install
npm run dev

# 4. Commit and push
git add .
git commit -m "Add: brief description of your change"
git push origin my-first-contribution

# 5. Open a Pull Request on GitHub
```

**Need help?** Open an issue with the `good first issue` label or check our [Code of Conduct](CODE_OF_CONDUCT.md) and [Issue Templates](.github/ISSUE_TEMPLATE/).

---

## ✨ Features

- **🎯 Interactive Scenarios** - Real-world production debugging exercises from beginner to advanced
- **📊 Three Difficulty Levels** - Beginner (5 scenarios), Intermediate (5 scenarios), Advanced (5 real incidents)
- **💻 Multiple Task Types** - Multiple choice questions, code fixes, and interactive log analysis
- **🎨 Modern Dark Theme UI** - Beautiful dark gradient interface with orange/red accents
- **🔧 Monaco Editor** - Full-featured code editor with syntax highlighting (VS Code's editor)
- **📈 Progress Tracking** - Automatic progress tracking with localStorage persistence
- **⏱️ Scenario Timer** - Track your completion time and beat target times
- **🔄 Smart Navigation** - Auto-navigate to next scenario after completion
- **📊 Analytics Integration** - Built-in Vercel Analytics for usage tracking
- **🎓 Educational Resources** - Curated links to additional learning materials
- **🏆 Real Incident Context** - Learn from actual outages at Reddit, GitLab, Discord, AWS, and Cloudflare
- **🚀 No Setup Required** - 100% browser-based, no cloud or backend needed
- **💾 Persistent Progress** - Your progress is saved locally and persists across sessions

## 🎮 Available Scenarios

### Beginner Level (5 scenarios, ~86 minutes)

1. **The 404 Error** (15 min)
   - Learn: HTTP, Logs, Routing
   - Debug a missing route causing 404 errors

2. **The Slow API** (20 min)
   - Learn: Performance, Database Queries, N+1 Problem
   - Fix an N+1 query problem slowing down your homepage

3. **The Memory Leak** (18 min)
   - Learn: Memory Management, Event Listeners, Cleanup
   - Track down event listeners causing memory leaks

4. **The CORS Error** (17 min)
   - Learn: CORS, HTTP Headers, Browser Security
   - Understand why your API works in Postman but not in browsers

5. **The Missing Environment Variable** (16 min)
   - Learn: Environment Variables, Configuration, Deployment
   - Fix production crashes caused by missing configuration

### Intermediate Level (5 scenarios, ~122 minutes)

1. **Database Connection Pool Exhausted** (25 min)
   - Learn: Connection Pooling, Resource Management, Database Scaling
   - Black Friday traffic spike! Your database is idle but all requests timeout

2. **The Cache Stampede** (28 min)
   - Learn: Caching Strategies, Cache Invalidation, Race Conditions
   - You cleared the cache. Now 10,000 users are hammering your database

3. **The Failed Deployment** (22 min)
   - Learn: Deployment Strategies, Rollback Procedures, Database Migrations
   - Rolling back the code made things WORSE. The database still has the new schema

4. **The Message Queue Backup** (24 min)
   - Learn: Message Queues, Async Processing, Backpressure
   - 8,000 welcome emails stuck in queue. Users are waiting hours

5. **The Rate Limit Cascade** (23 min)
   - Learn: Rate Limiting, API Dependencies, Circuit Breakers
   - Stripe is rate limiting you. User retries make it 8x worse

### Advanced Level (5 scenarios, ~160 minutes)

Real production disasters from major tech companies!

1. **Reddit's Kubernetes Meltdown** (35 min)
   - Learn: Kubernetes, Auto-scaling, Resource Limits, Cascading Failures
   - Death spiral: 50 healthy pods → 500 crashing pods in 60 seconds

2. **GitLab's Accidental Database Deletion** (30 min)
   - Learn: Database Replication, Backup & Recovery, Human Error Prevention
   - You ran rm -rf on production. 276GB deleted. Backups are broken. Now what?

3. **Discord's Redis Cascade Failure** (32 min)
   - Learn: Redis Clustering, Cache Failures, Circuit Breakers, Graceful Degradation
   - @everyone to 5M users. 50K req/sec to one key. Redis melting down

4. **AWS S3 Cascade Failure** (33 min)
   - Learn: Service Dependencies, Blast Radius, Circuit Breakers, Incident Response
   - Typo removed 500 servers. S3 down. Half the internet down. Can't report outage!

5. **Cloudflare's BGP Route Leak** (30 min)
   - Learn: BGP Routing, Network Infrastructure, Global Outages, Internet Architecture
   - Small ISP misconfigured BGP. Global traffic routing through Pennsylvania

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/OSP06/errloom.git
cd errloom

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `https://errloom.dev`

### Build for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## 🏗️ Project Structure

```
errloom/
├── public/
│   └── scenarios/          # YAML scenario definitions
│       ├── beginner/
│       │   ├── 404-error.yaml
│       │   ├── slow-api.yaml
│       │   ├── memory-leak.yaml
│       │   ├── cors-error.yaml
│       │   └── env-variable.yaml
│       ├── intermediate/
│       │   ├── db-pool-exhausted.yaml
│       │   ├── cache-stampede.yaml
│       │   ├── failed-deployment.yaml
│       │   ├── queue-backup.yaml
│       │   └── rate-limit-cascade.yaml
│       └── advanced/
│           ├── reddit-k8s-outage.yaml
│           ├── gitlab-data-loss.yaml
│           ├── discord-redis-failure.yaml
│           ├── aws-cascade-failure.yaml
│           └── cloudflare-bgp-hijack.yaml
├── src/
│   ├── components/         # React components
│   │   ├── ScenarioPlayer.tsx      # Main scenario player with timer
│   │   ├── TaskPanel.tsx           # Task handling (MCQ, code, logs)
│   │   ├── InteractiveLogViewer.tsx # Clickable log entries
│   │   ├── RealIncidentContext.tsx  # Real incident information
│   │   ├── ScenarioTimer.tsx        # Timer and performance tracking
│   │   ├── CodeEditor.tsx           # Monaco editor wrapper
│   │   └── TabNavigation.tsx        # Tab navigation component
│   ├── lib/
│   │   ├── types.ts                 # TypeScript type definitions
│   │   ├── scenarioLoader.ts        # YAML scenario loader
│   │   └── progressStore.ts         # Zustand store for progress tracking
│   ├── pages/
│   │   ├── Landing.tsx              # Landing page with dark theme
│   │   └── ScenarioList.tsx         # Scenario list with progress bar
│   ├── App.tsx
│   └── main.tsx                     # Entry point with Analytics
├── vercel.json             # Vercel deployment configuration
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## 📝 Contributing New Scenarios

**Easy Contribution Process**: Just add a YAML file! The scenario manifest auto-generates during build, and CI automatically validates your submission.

### 🎯 Use Our Template

We provide a comprehensive scenario template to get you started:

```bash
# Copy the template
cp scenarios/templates/scenario-template.yaml public/scenarios/beginner/my-scenario.yaml

# Edit your scenario
# See scenarios/templates/README.md for detailed guidance
```

### 📁 Sample Scenario Structure

Here's what a complete scenario looks like (e.g., `public/scenarios/beginner/404-error.yaml`):

```
public/scenarios/beginner/
└── 404-error.yaml          # Single YAML file defines everything!
```

**What gets tested when you submit:**
- ✅ YAML syntax validation
- ✅ Required fields check (id, level, title, duration, description, teaches, context, tabs, tasks, completion)
- ✅ ID matches filename
- ✅ Level matches directory (beginner/intermediate/advanced)
- ✅ Task validation strings (`must_contain`) actually appear in solutions
- ✅ YAML linting for consistent formatting

**All validation runs automatically via GitHub Actions when you open a PR!**

### Step 1: Create Your YAML File

Create a new file in `public/scenarios/{level}/{your-scenario-id}.yaml`:

```yaml
id: "your-scenario-id"              # Must match filename (without .yaml)
level: "beginner"                   # beginner | intermediate | advanced
title: "Your Scenario Title"
duration: "20 minutes"               # Estimated completion time
description: "Brief one-line description for the scenario list"  # REQUIRED
teaches:
  - "Concept 1"
  - "Concept 2"
  - "Concept 3"

context: |
  Background story and setup for the scenario...
  Explain the situation the user is facing.

tabs:
  - name: "Error"
    type: "text"
    content: |
      Error message or information...

  - name: "Logs"
    type: "logs"
    content:
      - time: "10:23:45"
        level: "ERROR"
        message: "Error description"
        is_answer: true              # Marks critical log entries

  - name: "Code"
    type: "code"
    content:
      language: "javascript"         # javascript | python | yaml | etc.
      content: |
        // Code snippet

tasks:
  - type: "multiple-choice"
    question: "What's causing the issue?"
    options:
      - "Option 1"
      - "Option 2"
      - "Correct answer"
    correct: 2                       # 0-based index
    explanation: |
      Explanation of the correct answer...

  - type: "code-fix"
    instructions: "Fix the code below"
    starting_code: |
      // Broken code here
    validation:
      must_contain:
        - "required string 1"
        - "required string 2"
    solution: |
      // Fixed code here
    explanation: |
      Explanation of the fix...

completion:
  summary: |
    # What You Learned
    Summary of key concepts...
  resources:
    - title: "Resource Title"
      url: "https://example.com"

# Optional: For real incident scenarios
real_incident:
  company: "Company Name"
  date: "YYYY-MM-DD"
  duration: "X hours"
  impact: "Impact description"
  cause: "Root cause"
  story: "Detailed story of the incident"
```

### Step 2: That's It!

**No code changes needed!** When you run `npm run build`, the manifest automatically:
- Discovers your new scenario
- Extracts metadata (id, title, description, duration, teaches)
- Generates `public/scenarios/index.json`
- Updates scenario counts and durations on the landing page

### Step 3: Test Locally

```bash
# Generate manifest manually (optional - build does this automatically)
npm run generate-manifest

# Start dev server
npm run dev

# Your scenario will appear in the appropriate level!
```

### Validation Checklist

Before submitting your scenario:

- [ ] `id` matches filename (without .yaml extension)
- [ ] `description` field is present (required for scenario list)
- [ ] `duration` is realistic (test your scenario)
- [ ] `teaches` array has 2-4 clear concepts
- [ ] All `must_contain` strings appear in your `solution`
- [ ] `explanation` fields are helpful and educational
- [ ] Test the scenario end-to-end

### 📸 Complete Sample Scenario Walkthrough

Here's a real example from [404-error.yaml](public/scenarios/beginner/404-error.yaml):

**File: `public/scenarios/beginner/404-error.yaml`**

```yaml
id: "404-error"
level: "beginner"
title: "The 404 Error"
duration: "15 minutes"
description: "Your first production bug. Learn to read logs and understand HTTP status codes."
teaches:
  - "HTTP Status Codes"
  - "Log Analysis"
  - "Routing Debugging"

context: |
  You just launched your first website! A user reports: "The About link is broken."
  Your job: Figure out what's wrong and fix it.

tabs:
  - name: "Error"
    type: "text"
    content: |
      404 Not Found
      The page you're looking for doesn't exist.

  - name: "Logs"
    type: "logs"
    content:
      - time: "10:24:12"
        level: "INFO"
        message: "GET /home → 200 OK"
      - time: "10:24:15"
        level: "ERROR"
        message: "GET /about → 404 Not Found"
        is_answer: true  # This log entry is highlighted for learning

tasks:
  - type: "multiple-choice"
    question: "What does HTTP 404 mean?"
    options:
      - "Server error"
      - "Resource not found"
      - "Forbidden access"
    correct: 1  # 0-indexed: "Resource not found"
    explanation: |
      Correct! HTTP 404 means the requested resource was not found on the server.

  - type: "code-fix"
    instructions: "Fix the routing code to handle /about"
    starting_code: |
      app.get('/home', (req, res) => res.send('Home'));
      // Missing /about route!
    validation:
      must_contain: ["'/about'", "res.send"]
    solution: |
      app.get('/home', (req, res) => res.send('Home'));
      app.get('/about', (req, res) => res.send('About'));
    explanation: |
      You added the missing route handler for /about. Great job!

completion:
  summary: |
    # 🎉 Congratulations!

    You've debugged your first 404 error! Key lessons:
    1. HTTP 404 = Resource Not Found
    2. Always check server logs for error details
    3. Routing configuration must match expected URLs
```

**Testing Your Scenario:**

```bash
# 1. Create your scenario YAML file
vim public/scenarios/beginner/my-scenario.yaml

# 2. Generate manifest (or just build)
npm run generate-manifest

# 3. Start dev server
npm run dev

# 4. Navigate to http://localhost:5173/scenario/beginner/my-scenario
# 5. Complete all tasks to verify they work correctly
# 6. Check the completion time matches your estimate
```

**What you'll see in the UI:**
- Clean terminal-style interface with dark theme
- Tabs for Error, Logs, and Code
- Interactive log viewer with clickable entries
- Monaco code editor for code-fix tasks
- Timer tracking your completion time
- Progress saving automatically

### 🏷️ Scenario Metadata & Tags

Each scenario includes metadata for better organization:

- **Duration**: Realistic time estimate (test it yourself!)
- **Teaches**: 2-4 key concepts (e.g., "Caching", "Database", "Networking")
- **Level**: beginner | intermediate | advanced
- **Tags** (coming soon): Filter scenarios by topic (Redis, Kubernetes, API, etc.)

### Example Scenarios

See existing scenarios for reference:
- **Beginner**: [404-error.yaml](public/scenarios/beginner/404-error.yaml) - HTTP routing and logs
- **Intermediate**: [cache-stampede.yaml](public/scenarios/intermediate/cache-stampede.yaml) - Cache invalidation and race conditions
- **Advanced**: [reddit-k8s-outage.yaml](public/scenarios/advanced/reddit-k8s-outage.yaml) - Real Kubernetes incident from Reddit 2018

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.2 with TypeScript 5.9
- **Build Tool**: Vite 7.2 - Lightning fast HMR and builds
- **Routing**: React Router DOM 7.9 - Client-side routing
- **State Management**: Zustand 5.0 - Lightweight state management with persistence
- **Styling**: Tailwind CSS 4.1 - Utility-first CSS with dark theme
- **Code Editor**: Monaco Editor 4.7 - VS Code's powerful editor
- **Icons**: Lucide React 0.554 - Beautiful icon library
- **YAML Parsing**: js-yaml 4.1 - Scenario configuration parsing
- **Analytics**: Vercel Analytics 1.5 - Privacy-friendly analytics
- **Deployment**: Vercel - Serverless deployment platform

## 🤝 Contributing

Contributions are welcome! We've built a contributor-friendly process with templates, automated validation, and clear guidelines.

### Ways to Contribute

1. **Add New Scenarios** - Use our [scenario template](scenarios/templates/) for beginner/intermediate/advanced scenarios
2. **Improve Existing Scenarios** - Enhance explanations, add hints, or improve task descriptions
3. **Bug Fixes** - Report bugs using our [bug report template](.github/ISSUE_TEMPLATE/bug_report.yml)
4. **Feature Requests** - Suggest improvements via [feature request template](.github/ISSUE_TEMPLATE/feature_request.yml)
5. **Documentation** - Improve documentation and examples
6. **Code Reviews** - Help review scenario submissions from other contributors

### Development Workflow

```bash
# Fork and clone the repository by using your username.
git clone https://github.com/{your_username}/errloom.git

# Create a feature branch
git checkout -b feature/your-feature-name

# Make your changes and test
npm run dev

# Run linting
npm run lint

# Build to verify
npm run build

# Commit and push
git add .
git commit -m "Add your feature description"
git push origin feature/your-feature-name

# Open a Pull Request using our PR template
```

### Pull Request Review Process

When you open a PR:

1. **Automated CI Checks** run automatically:
   - TypeScript type checking
   - ESLint code quality checks
   - Build verification
   - Scenario YAML validation (for scenario PRs)

2. **Peer Review**: PRs are labeled for triage:
   - `under review` - Awaiting maintainer review
   - `needs changes` - Feedback provided, changes requested
   - `accepted` - Approved and ready to merge

3. **Scenario PRs**: For new scenarios, include a brief test report in your PR:
   - Did you complete it end-to-end?
   - Does the completion time match the estimate?
   - Are validation strings working correctly?

### Community Guidelines

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing. We're committed to providing a welcoming and inclusive environment for all contributors.

**Questions?** Open an issue with the `question` label or check our [Issue Templates](.github/ISSUE_TEMPLATE/) for guidance.

## 🚀 Deployment

**Live site:** The main Errloom site at [errloom.dev](https://errloom.dev) is hosted on Vercel and **automatically deploys when changes are pushed to main**.

### Want to Deploy Your Own Fork?

Errloom is a **100% static site** with no backend required.

**Quick Deploy to Vercel:**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/OSP06/errloom)

1. Click the button above
2. Connect your GitHub account
3. Vercel auto-configures and deploys
4. **Future pushes to main auto-deploy** (no manual steps needed!)

### Self-Host Anywhere

Build the static files and deploy to any host:

```bash
npm run build
# Output: dist/ folder with static HTML, CSS, JS
```

**Compatible with:** Netlify, GitHub Pages, AWS S3, Cloudflare Pages, Docker (nginx), or any static host.

**Self-hosting benefits:**
- Full control and customization
- No vendor lock-in (standard static files)
- Free on most platforms
- Optional: Remove analytics for complete privacy

## 📊 Progress Tracking

Errloom automatically tracks your progress using localStorage:

- **Persistent Progress**: Your completion status is saved locally
- **Cross-Session**: Progress persists even after closing the browser
- **Level-Based Tracking**: Each difficulty level tracks separately
- **Visual Indicators**: Progress bars and completion badges

## 🎨 Design System

- **Color Palette**: Dark theme with orange (#f97316) and red (#dc2626) accents
- **Typography**: System fonts with clear hierarchy
- **Components**: Consistent rounded corners, shadows, and hover states
- **Responsive**: Mobile-first design that scales to desktop

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by real-world production incidents and outage postmortems from Reddit, GitLab, Discord, AWS, and Cloudflare
- Built with modern web technologies and best practices
- Community-driven scenario contributions
- Powered by Vercel for deployment and analytics

## 🌟 Show Your Support

If you find this project helpful, please consider:

- ⭐ Starring the repository
- 🐛 Reporting bugs or issues
- 💡 Suggesting new scenarios
- 🔗 Sharing with others

## 📧 Contact

For questions, suggestions, or feedback:

- Open an issue on GitHub
- Email:ompateldev06@gmail.com

---

**Made with ❤️ for developers learning production debugging**

🔥 **Start debugging now at [errloom.dev](https://errloom.dev)**
