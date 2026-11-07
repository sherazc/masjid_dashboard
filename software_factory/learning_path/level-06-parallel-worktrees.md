# Level 6: Parallel Work with Worktrees (25 min)

## Goal
Let two agents change code at the same time without overwriting each other.

## Concepts
- **Conflict:** two agents editing the same file.
- **Git worktree:** a second checkout of the same repo in another folder, on its own branch.
- **Merge:** you (or the orchestrator) combine the branches afterwards.

## Steps
1. In `playground/`, run `git worktree add ../wt-a -b feature-a` and the same for `wt-b`.
2. Ask one agent to work in `wt-a` and another in `wt-b`, on different features.
3. Merge both branches back into main.
4. Now deliberately make both touch the same file and see the merge conflict.

## Document it
Screenshot: `git worktree list`, and the merge conflict. Note the rule: split work by files, not by feature names.

## Check yourself
- Why is a worktree safer than two agents in one folder?
