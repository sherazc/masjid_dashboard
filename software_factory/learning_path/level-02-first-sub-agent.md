# Level 2: First Sub Agent (20 min)

## Goal
Watch one delegation happen, end to end.

## Concepts
- **Delegation:** the main agent hands a task to a sub agent.
- **Report:** the only thing that comes back. Not the sub agent's full work.

## Steps
1. In `playground/`, ask Claude: "Use a sub agent to explore this folder and report what is in it."
2. Watch for the sub agent being started.
3. Read the report it returns.
4. Ask the same question again, but without mentioning a sub agent. Compare how it behaves.

## Document it
Screenshot: the sub agent being started and its returned report. Note one difference between step 3 and step 4.

## Check yourself
- What did the main agent see: the sub agent's full work, or only its report?
