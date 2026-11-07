# Level 3: Custom Sub Agent (25 min)

## Goal
Define your own sub agent with a role and limited tools.

## Concepts
- **Role:** a short job description in the agent's prompt.
- **Least privilege:** give an agent only the tools it needs. A reviewer doesn't need to edit files.
- **Agent definition file:** a markdown file with a name, description, tools, and instructions. Claude Code keeps these in `.claude/agents/`. Check the current docs for the exact format.

## Steps
1. Read the Claude Code docs page on sub agents (10 min max).
2. In `playground/`, create a `reviewer` agent: read-only tools, job is to review code and list problems.
3. Ask Claude to use the `reviewer` on any file.
4. Try asking the reviewer to edit a file. Observe what happens.

## Document it
Screenshot: your agent definition file. Copy it into your Google Doc with one line per field explaining it.

## Check yourself
- Why is a read-only reviewer safer than a general agent?
