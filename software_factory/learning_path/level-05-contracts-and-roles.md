# Level 5: Contracts and Roles (30 min)

## Goal
Run a pipeline: planner, implementer, reviewer. Learn why written contracts keep agents aligned.

## Concepts
- **Pipeline:** work flows through roles in order.
- **Contract:** a spec file all agents read. Without one, agents guess and drift.
- **Review loop:** the reviewer sends work back if it fails the contract.

## Steps
1. In `playground/`, write `spec.md`: one small feature (for example: "add a command to mark a todo done"), with acceptance criteria.
2. Ask a planner sub agent to turn the spec into tasks.
3. Ask an implementer sub agent to do one task.
4. Ask your Level 3 `reviewer` to check it against `spec.md`.
5. If it fails, send it back to the implementer.

## Document it
Screenshot: the spec, the review result, and the rework. Note which instruction in the spec the reviewer used.

## Check yourself
- What would go wrong if there were no `spec.md`?
