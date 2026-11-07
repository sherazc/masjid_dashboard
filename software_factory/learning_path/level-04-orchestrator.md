# Level 4: Orchestrator (25 min)

## Goal
See one agent direct several sub agents in parallel.

## Concepts
- **Decomposition:** splitting a big task into independent pieces.
- **Parallel:** pieces that don't depend on each other can run at the same time.
- **Synthesis:** the orchestrator combines the reports into one answer.

## Steps
1. In `playground/`, ask Claude to add three small, independent things (for example: a README, a `.gitignore`, a license file).
2. Tell it to use one sub agent per item, running in parallel.
3. Watch them start together and report back.
4. Read how the orchestrator combines the results.

## Document it
Screenshot: the parallel sub agents. Write the one prompt that worked.

## Check yourself
- Which tasks can NOT run in parallel? (Hint: task B needs task A's output.)
