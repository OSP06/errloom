# Scenario Templates

This folder contains templates to help you create new debugging scenarios for Errloom.

## Quick Start

1. **Copy the template**:
   ```bash
   cp scenarios/templates/scenario-template.yaml public/scenarios/{level}/{your-scenario-id}.yaml
   ```

2. **Edit the YAML file** with your scenario content

3. **Test locally**:
   ```bash
   npm run dev
   ```

4. **Submit a PR** when ready!

## Template Files

- **scenario-template.yaml** - Complete scenario template with all fields and examples
- **README.md** - This file

## Scenario Structure

Every scenario needs:

### Required Fields
- `id` - Unique identifier (must match filename)
- `level` - Difficulty: beginner, intermediate, or advanced
- `title` - Display name for the scenario
- `duration` - Estimated completion time
- `description` - One-line summary for the scenario list
- `teaches` - 2-4 key concepts
- `context` - Background story
- `tabs` - At least one content tab
- `tasks` - At least one interactive task
- `completion` - Summary and resources

### Optional Fields
- `real_incident` - For advanced scenarios based on real outages

## Task Types

### 1. Multiple Choice
Tests understanding of concepts:
```yaml
- type: "multiple-choice"
  question: "What caused the outage?"
  options:
    - "Option 1"
    - "Option 2"
    - "Correct answer"
  correct: 2
  explanation: "Why this is correct..."
```

### 2. Code Fix
Requires fixing buggy code:
```yaml
- type: "code-fix"
  instructions: "Fix the bug"
  starting_code: "// broken code"
  validation:
    must_contain: ["if", "null"]
  solution: "// fixed code"
  explanation: "How to fix it..."
```

### 3. Find in Logs
Log analysis challenge:
```yaml
- type: "find-in-logs"
  instructions: "Find the error log"
  explanation: "What it means..."
```

## Content Types

### Text Tab
```yaml
- name: "Error"
  type: "text"
  content: |
    Plain text or markdown content
```

### Logs Tab
```yaml
- name: "Logs"
  type: "logs"
  content:
    - time: "10:23:45"
      level: "ERROR"
      message: "Error description"
      is_answer: true  # Mark important logs
```

### Code Tab
```yaml
- name: "Code"
  type: "code"
  content:
    language: "javascript"
    content: |
      // Code here
```

## Tips for Great Scenarios

### Story First
- Start with a compelling narrative
- Make it relatable (2am pages, production down, angry users)
- Build tension and urgency

### Progressive Difficulty
- **Beginner**: Single clear issue, direct debugging
- **Intermediate**: Multiple factors, requires analysis
- **Advanced**: Complex systems, cascading failures

### Educational Value
- Focus on ONE main concept per scenario
- Include 2-3 related sub-concepts
- Provide clear explanations
- Link to additional resources

### Realistic Content
- Use actual error messages
- Include realistic logs
- Show real code patterns
- Reference real incidents (for advanced)

## Testing Your Scenario

Before submitting:

1. **Run it yourself** - Complete the scenario start to finish
2. **Time it** - Verify your duration estimate
3. **Check validation** - Ensure `must_contain` strings work
4. **Test explanations** - Are they clear and helpful?
5. **Verify links** - All resources should be accessible

## Need Help?

- Check existing scenarios in `public/scenarios/` for examples
- Open an issue with the "scenario" label
- Ask in a PR draft for early feedback

## Example Scenarios

Good examples to learn from:

- **Beginner**: `public/scenarios/beginner/404-error.yaml`
- **Intermediate**: `public/scenarios/intermediate/cache-stampede.yaml`
- **Advanced**: `public/scenarios/advanced/reddit-k8s-outage.yaml`
