# Level 1: Vocabulary (20 min)

## Goal
Know the words before using them. No coding.

## Terms
| Term | Plain meaning |
|---|---|
| Agent | An AI that loops: think, use a tool, look at the result, repeat |
| Tool | Something an agent can do: read file, edit file, run command |
| Context window | The agent's working memory. It fills up. |
| Orchestrator | The agent that splits work and directs others |
| Sub agent | A helper started by the orchestrator, with its own fresh context |
| Team | Several agents that can message each other |
| Handoff | Passing work and information from one agent to another |
| Contract | A written agreement (spec, schema, API shape) that agents build against |

## Key idea
A sub agent works alone and returns one report. Only the orchestrator sees it.
A team member can talk to the other members directly.

## Two shapes
- **Hub and spoke:** orchestrator in the middle, sub agents on the edges.
- **Peer to peer:** agents talk to each other.

Your CEO/architect picture: you sit above the orchestrator.

## Document it
Write the table in your own words in your Google Doc. Draw both shapes by hand and screenshot them.

## Check yourself
- Why does a sub agent get a fresh context? (Hint: the orchestrator's context stays small.)
