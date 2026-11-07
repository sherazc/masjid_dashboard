# Level 8: Guardrails (25 min)

## Goal
Learn how to trust agent output without reading every line.

## Concepts
- **Tests as the judge:** agents must pass tests before work counts.
- **Hooks:** scripts that run automatically at set moments (for example, after an edit).
- **Review gate:** nothing merges until you approve.
- **Cost control:** limit how many agents and how long they run.

## Steps
1. In `playground/`, add one test for your todo CLI.
2. Tell the implementer: "Not done until the test passes."
3. Read the docs on hooks (10 min max). Add one hook that runs the tests after edits.
4. Break the code on purpose and watch the guardrail catch it.

## Document it
Screenshot: the failing test caught by the guardrail. Write your own rule: what must pass before you review?

## Check yourself
- What can the guardrails NOT catch? (Hint: wrong requirements.)
