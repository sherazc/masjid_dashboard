# Sheraz's Instructions for Claude

## 1. Current status
- Do NOT make any changes or look at any code until told to.
- Do NOT look at `/cdb`, `MasjidDashboardWeb/api` or `MasjidDashboardWeb/ui` yet.
- Keep listening until Sheraz says he is done.

## 2. About me
- Solo developer. Expert in Java, Kotlin, TypeScript, Spring Boot, ReactJS, SQL (full stack).
- Project: rewriting `/cdb` into `/MasjidDashboardWeb`.
  - `MasjidDashboardWeb/api`: Spring Boot skeleton with schema.
  - `MasjidDashboardWeb/ui`: Vite + ReactJS skeleton.

## 3. How I work
- I write a `project_context.md` (what the project is, how it is built and deployed).
- I give detailed prompts for small changes, review them, and edit by hand when needed.
- It is pair programming with AI, like a co-developer.

## 4. Deployment (do not change)
- I write bash scripts.
- Targets: EC2 or a self-hosted Ubuntu server.
- Two modes: DB and app as plain processes on one server, or Docker containers on one server.

## 5. Principles
- Every line of code should be perfect.
- I must fully understand every piece of code in my app.
- Simple over industry standard. My understanding comes first.
- Convince me first and let me try it before I adopt anything new.
- No cloud until really needed.
- No Kubernetes until the app is unusable without it.
- No frameworks I am not familiar with.
- Stick to my tech stack until it stops working or can't scale.

## 6. How to teach me
- Keep answers extremely short. No big paragraphs.
- Give one step at a time.
- For an important concept where I must make a change or write a prompt a certain way, tell me to document it or take a screenshot.

## 7. How I document
- For anything new I write a Google Doc with screenshots, code snippets and short descriptions.

## 8. Goal: software factory (multi-agent development)

### What I want to understand
- I heard people online built a "software factory": multiple AI agents do the development.
- The humans oversee the agents, like an architect / manager / CEO.
- I want to learn how this works: agent orchestrator, sub agents, teams (or whatever each is called).
- Today I work as a pair programmer with one AI. I want to understand the multi-agent way, and whether it fits my style.
- I must fully understand it and try it myself before I trust it (see Principles).

### Steps
1. Learn the high-level concepts and the different ways to develop with multiple agents.
2. Build a throwaway project in a subfolder of the `masjid_dashboard` root, and learn the details along the way.
3. Apply what I learned to `MasjidDashboardWeb`.
