# Stackflow

Stackflow is an advanced AI-Agent Runtime combining the **strategic governance** of [Gstack](https://github.com/garrytan/gstack), the **strict software engineering process** of [Superpowers](https://github.com/obra/superpowers), and an **AST-based Context Engine** for massive token optimization.

It runs natively as a set of modular `@` hooks strictly on top of the [Antigravity](https://github.com/google/antigravity) ecosystem.

---

## 🎯 The Philosophy & Intent

Current AI workflows treat coding agents as omnipotent genies—give it a prompt, and it dumps 1,000 lines of code. This leads to architectural hallucinations, broken test coverage, and massive context bloat. 

**Stackflow fixes this by dividing labor.**
We built Stackflow so AI doesn't code until the "CEO" persona approves the product-market fit, and until the "Engineering constraint" writes the failing tests first. It brings human-grade organizational discipline to autonomous AI.

---

## 🚀 The Power Stack ("3-Layer" Architecture)

Instead of relying on a single agent, Stackflow categorizes responsibilities into 3 distinct layers to prevent context collision and enforce elite standards:

1. **Decision Layer (`@sf-think`, `@sf-challenge`)**: Act as the product visionary and Y-Combinator strategist. They answer the "Why" and "What", heavily scrutinize product-market fit (PMF), and ruthlessly cut unneeded scope *before* writing any code.
2. **Environment Layer (`@sf-plan`, `@sf-autoplan`)**: Setting up isolated `git worktrees` and creating semantic AST Repo Contexts (`.stackflow-context.md`) to save tokens via prompt caching and completely prevent context contamination.
3. **Execution Layer (`@sf-build`, `@sf-review`, `@sf-debug`)**: Strict execution engine enforcing TDD (RED-GREEN-REFACTOR), subagent delegation, and rigorous adversarial code audits.

---

## 📦 Global Rules vs. Local Isolation

You will install Stackflow *globally* so you can use it anywhere. However, your project context will never get tangled!

* **Global Knowledge**: The `@sf` commands and their behavioral source policies are installed globally into your `~/.gemini/antigravity/skills` configuration. These act simply as the "Rulebooks".
* **Fierce Local Isolation**: When you run `@sf-think` inside `~/my-project`, the AI uses the global rulebook, but its **memory, context window, and AST mappings** are strictly sandboxed isolated to `~/my-project`. You can simultaneously run Stackflow across multiple projects without cross-contamination.

---

## 🛠 Core Skills Pipeline

Stackflow ships with 9 core agentic skills. Invoke them explicitly in terminal to control your software factory:

- `@sf-think` : Ideation, edge case discovery, and PMF validation. Generates `design-doc.md`.
- `@sf-challenge` : Strategic challenge and ruthless MVP scope limitation.
- `@sf-plan` : Technical engineering review, git worktree setup, AST mapping, and atomic `task.md` creation.
- `@sf-autoplan` : Fast-track automation chaining CEO ➡️ Design ➡️ Engineering reviews without human pauses.
- `@sf-build` : The execution engine. Spawns Subagents and mandates test-driven execution (`RED-GREEN-REFACTOR`).
- `@sf-debug` : Diagnostic clinic. Blocks random code patching when tests fail, demanding proven hypotheses and log-driven testing.
- `@sf-review` : Code quality review and adverserial tier-1 security analysis.
- `@sf-qa` : Browser-based automated UI exploration and validation.
- `@sf-ship` : Verifies green tests, handles pull requests, version bumping, and cleanup.

---

## 🔄 Dynamic Upstream Synchronization (Option 2)

Unlike typical AI prompts that just say "act like", Stackflow uses actual source-truth markdown guidelines copied physically from the original Gstack and Superpowers authors. 

When you install or explicitly run `stackflow sync`, the CLI dynamically `git clone`s the original `garrytan/gstack` and `obra/superpowers` repositories down to your machine. It extracts the raw prompts into `~/.gemini/antigravity/references`. The Stackflow skills are hardcoded to read these files directly in real-time, ensuring 100% philosophical adoption.

```bash
# Force a raw framework sync at any time without reinstalling
stackflow sync
```

---

## 📥 Installation & Usage

Install the package via NPM:

```bash
# 1. Install globally via NPM
npm install -g @runchr/stackflow

# 2. Inject skills and fetch source truths into your Antigravity runtime
stackflow install
```

*(Alternatively, try it directly without global install: `npx @runchr/stackflow install`)*

### Quick Start Example
Open the AI CLI in any local project directory and start the workflow:

```bash
# 1. Start the Strategy Phase
> @sf-think "Let's build a real-time multiplayer cursor tracker"

# 2. Start the Engineering Prep
> @sf-plan "Approve design and map the repository context"

# 3. Code Execution with TDD
> @sf-build "Implement the task list adhering strictly to tests"
```
