# Contributing to Errloom

Thank you for your interest in contributing to Errloom! We welcome contributions from everyone, whether you're adding new scenarios, fixing bugs, or improving documentation.

## 🎯 Ways to Contribute

- **Add New Scenarios** - Share your production debugging knowledge
- **Improve Existing Scenarios** - Enhance explanations, fix typos, add hints
- **Report Bugs** - Help us identify and fix issues
- **Suggest Features** - Propose new functionality or improvements
- **Improve Documentation** - Make our guides clearer and more helpful

---

## 🚀 Quick Start: Contributing a Scenario

**The easiest way to contribute!** Just add a YAML file - no code changes needed.

### 1. Create Your Scenario YAML File

Create a new file in `public/scenarios/{level}/{your-scenario-id}.yaml`:

**Beginner**: Production debugging fundamentals
**Intermediate**: Common production challenges
**Advanced**: Real production disasters from major tech companies

```yaml
id: "your-scenario-id"              # Must match filename (without .yaml)
level: "beginner"                   # beginner | intermediate | advanced
title: "Your Scenario Title"
duration: "20 minutes"              # Realistic estimate
description: "Brief one-line description for the scenario card"  # REQUIRED
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
      Error message or stack trace...

  - name: "Logs"
    type: "logs"
    content:
      - time: "10:23:45"
        level: "ERROR"
        message: "Error description"
        is_answer: true              # Mark critical log entries

  - name: "Code"
    type: "code"
    content:
      language: "javascript"         # javascript | python | yaml | go | etc.
      content: |
        // Code snippet showing the problem

tasks:
  - type: "multiple-choice"
    question: "What's causing the issue?"
    options:
      - "Option 1"
      - "Option 2"
      - "Correct answer"
    correct: 2                       # 0-based index
    explanation: |
      Clear explanation of why this is correct...

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
      Explanation of the fix and why it works...

completion:
  summary: |
    # What You Learned

    **The Problem**
    Brief description of the root cause.

    **The Fix**
    What was done to resolve it.

    **Prevention**
    How to avoid this in the future.

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
  story: "Detailed story of what happened"
```

### 2. Test Your Scenario

```bash
# Generate manifest (optional - build does this automatically)
npm run generate-manifest

# Start dev server
npm run dev

# Navigate to http://localhost:5173 and test your scenario
```

### 3. Validation Checklist

Before submitting:

- [ ] `id` matches filename (without .yaml extension)
- [ ] `description` field is present and concise
- [ ] `duration` is realistic (test your scenario)
- [ ] `teaches` array has 2-4 clear, specific concepts
- [ ] All `must_contain` strings appear in your `solution`
- [ ] `explanation` fields are helpful and educational
- [ ] No typos or grammatical errors
- [ ] Tested end-to-end in the browser
- [ ] Works on both desktop and mobile

### 4. Submit Your Contribution

```bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/YOUR_USERNAME/errloom.git
cd errloom

# Create a feature branch
git checkout -b add-scenario-your-topic

# Add your scenario file
git add public/scenarios/{level}/{your-scenario}.yaml

# Commit with a descriptive message
git commit -m "Add scenario: Your Scenario Title

- Teaches: Concept 1, Concept 2, Concept 3
- Level: beginner/intermediate/advanced
- Duration: XX minutes"

# Push to your fork
git push origin add-scenario-your-topic

# Open a Pull Request on GitHub
```

---

## 💻 Contributing Code Changes

### Development Setup

```bash
# Clone the repository
git clone https://github.com/OSP06/errloom.git
cd errloom

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Project Structure

```
errloom/
├── public/scenarios/        # YAML scenario definitions
├── scripts/                 # Build scripts (manifest generation)
├── src/
│   ├── components/         # React components
│   ├── lib/                # Utilities and types
│   ├── pages/              # Route pages
│   └── main.tsx            # Entry point
├── package.json
├── vite.config.ts
└── tsconfig.json
```

### Code Guidelines

- **TypeScript**: All code must be TypeScript
- **Formatting**: Code is auto-formatted with ESLint
- **Components**: Use functional components with hooks
- **Styling**: Use Tailwind CSS classes
- **State**: Zustand for global state, React hooks for local state
- **Testing**: Test your changes manually in the browser

### Making Changes

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Keep changes focused and atomic
   - Follow existing code style
   - Update documentation if needed

3. **Test thoroughly**
   ```bash
   npm run build  # Ensure it builds
   npm run lint   # Check for linting errors
   npm run dev    # Test manually
   ```

4. **Commit with clear messages**
   ```bash
   git commit -m "Add feature: Brief description

   - Detailed point 1
   - Detailed point 2"
   ```

5. **Push and create a Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```

---

## 🐛 Reporting Bugs

Found a bug? Please open an issue with:

1. **Clear title** - Describe the bug concisely
2. **Steps to reproduce** - Exact steps to trigger the bug
3. **Expected behavior** - What should happen
4. **Actual behavior** - What actually happens
4. **Screenshots** - If applicable
5. **Environment** - Browser, OS, device

**Example:**
```
Title: "Scenario timer continues after completion"

Steps to reproduce:
1. Start any scenario
2. Complete all tasks
3. Observe timer

Expected: Timer should stop when scenario is complete
Actual: Timer continues running

Browser: Chrome 120
OS: macOS 14
```

---

## 💡 Suggesting Features

Have an idea? Open an issue with:

1. **Use case** - What problem does this solve?
2. **Proposed solution** - How should it work?
3. **Alternatives** - Other approaches you considered
4. **Examples** - Similar features in other tools (if any)

---

## 📝 Pull Request Process

1. **Fork & Branch** - Create a feature branch from `main`
2. **Make Changes** - Implement your feature or fix
3. **Test** - Verify everything works
4. **Commit** - Use clear, descriptive commit messages
5. **Push** - Push to your fork
6. **Pull Request** - Open a PR with a clear description

### PR Description Template

```markdown
## Description
Brief description of what this PR does

## Type of Change
- [ ] New scenario
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Other (please describe)

## Changes Made
- Change 1
- Change 2

## Testing
How did you test this?

## Screenshots (if applicable)
Add screenshots here

## Checklist
- [ ] Code builds without errors
- [ ] Tested manually in browser
- [ ] Updated documentation (if needed)
- [ ] Follows project code style
```

---

## 🎨 Scenario Writing Tips

### Good Scenarios Should:

✅ **Be realistic** - Based on actual production issues
✅ **Teach clearly** - Focus on 2-4 specific concepts
✅ **Build progressively** - Start simple, increase difficulty
✅ **Provide context** - Tell a story, not just technical details
✅ **Have clear explanations** - Explain the "why", not just "what"
✅ **Include resources** - Link to additional learning materials

### Avoid:

❌ **Trivial problems** - Too simple or unrealistic
❌ **Unclear questions** - Ambiguous or confusing
❌ **Missing explanations** - Just showing answers without context
❌ **Too many concepts** - Trying to teach everything at once
❌ **Outdated technologies** - Use current, relevant tools

### Task Types

**Multiple Choice** - Best for:
- Identifying root causes
- Understanding concepts
- Choosing between approaches

**Code Fix** - Best for:
- Hands-on debugging
- Fixing actual bugs
- Learning syntax/patterns

**Find in Logs** - Best for:
- Log analysis skills
- Pattern recognition
- Debugging methodology

---

## 🏆 Recognition

All contributors will be:
- Listed in our README
- Credited in commit messages
- Part of building an amazing learning resource

---

## 📜 Code of Conduct

### Our Standards

- **Be respectful** - Treat everyone with respect
- **Be constructive** - Provide helpful feedback
- **Be inclusive** - Welcome diverse perspectives
- **Be professional** - Keep discussions focused and productive

### Not Acceptable

- Harassment or discriminatory language
- Personal attacks or insults
- Publishing private information
- Trolling or inflammatory comments

---

## 📞 Getting Help

- **Questions**: Open a GitHub Discussion
- **Bugs**: Open a GitHub Issue
- **Email**: ompateldev06@gmail.com

---

## 📚 Additional Resources

- [README.md](README.md) - Project overview
- [Scenario Examples](public/scenarios/) - Reference scenarios
- [TypeScript Docs](https://www.typescriptlang.org/) - Language reference
- [React Docs](https://react.dev/) - Framework guide
- [Tailwind CSS](https://tailwindcss.com/) - Styling reference

---

**Thank you for contributing to Errloom!** 🎉

Together, we're helping developers around the world master production debugging.
