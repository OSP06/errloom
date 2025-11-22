# 🔥 Errloom

**Debug Production Outages in Your Browser**

Errloom is an interactive learning platform that teaches developers how to debug real-world production outages. Practice troubleshooting common issues like 404 errors, N+1 queries, memory leaks, CORS errors, and environment variable misconfigurations—all in your browser with no setup required.

[![Built with React](https://img.shields.io/badge/React-19.2-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2-purple.svg)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

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

## 📝 Creating New Scenarios

Scenarios are defined in YAML files under `public/scenarios/{level}/`. Here's the structure:

```yaml
id: "scenario-id"
level: "beginner"
title: "Scenario Title"
duration: "15 minutes"
teaches:
  - "Concept 1"
  - "Concept 2"

context: |
  Background story and setup for the scenario...

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
        is_answer: true

  - name: "Code"
    type: "code"
    content:
      language: "javascript"
      content: |
        // Code snippet

tasks:
  - type: "multiple-choice"
    question: "What's causing the issue?"
    options:
      - "Option 1"
      - "Option 2"
      - "Correct answer"
    correct: 2
    explanation: |
      Explanation of the correct answer...

completion:
  summary: |
    What the user learned...
  resources:
    - title: "Resource Title"
      url: "https://example.com"
```

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

Contributions are welcome! Here's how you can help:

1. **Add New Scenarios** - Create YAML files for intermediate and advanced scenarios
2. **Improve Existing Scenarios** - Enhance explanations, add hints, or improve task descriptions
3. **Bug Fixes** - Report and fix bugs
4. **Feature Requests** - Suggest new features or improvements
5. **Documentation** - Improve documentation and examples

### Development Workflow

```bash
# Fork and clone the repository
git clone https://github.com/OSP06/errloom.git

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

# Open a Pull Request
```

## 🚀 Deployment

Errloom is configured for easy deployment on Vercel:

### Deploy to Vercel

1. **Fork and Connect**

2. **Auto-Configuration**

3. **Enabled Analytics**

### Configuration Files

- **vercel.json** - SPA routing and caching configuration
- **Analytics** - Pre-integrated `@vercel/analytics/react`

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
