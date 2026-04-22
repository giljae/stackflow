---
name: sf-workflows
description: Official Stackflow unified end-to-end operational workflows.
author: runchr
---

# `stackflow` Handoff Workflows

When operating within an Antigravity environment, invoke the stackflow pipeline serially to maintain optimum quality, minimize token usage, and isolate dependencies. Let each agent do exactly what they do best.

## Step 1: Decision Layer 
You must decide **what** to build and **validate** the idea.
1. Invoke `@sf-think "I want to build a ticket-sharing AICC"` to brainstorm the PMF and edge cases, producing a `design-doc.md`.
2. Invoke `@sf-challenge` to subject the design document to intense business scrutiny, pruning unnecessary features entirely.

## Step 2: Architecture & Environment Layer
Prepare the blueprint and isolated workspace before code touches your main trunk.
**(Option A) Granular:** 
1. Invoke `@sf-plan` to have the technical lead audit architecture, construct a `git worktree`, dump semantic context via AST, and divide work into atomic `task.md`.

**(Option B) Fast-Track:**
1. Invoke `@sf-autoplan` to automate Step 1 (CEO review), UX Review, and Technical Architecture sequentially, immediately spitting out the AST context map and `task.md` in one bound.

## Step 3: Execution Layer
The factory floor.
1. Invoke `@sf-build` against your `task.md`. Tests are strictly written *before* the code (RED-GREEN-REFACTOR). Subagents handle granular 2-5 min tasks to prevent context loss. Read the AST Context Map to save tokens.

## Step 4: Audit & Defense
Trust, but verify at an adversarial level.
1. Intercept builds periodically with `@sf-review`. Ensures compliance with the spec, and triggers `/codex` for hostile security auditing.
2. (In case of build failures): Invoke `@sf-debug`. Hard-stops blind code patching. Forces detailed trace and log extraction before any logic is changed.

## Step 5: E2E Assurance
1. Invoke `@sf-qa` to start up the headless browser and actively navigate the application catching interaction-level flaws.

## Step 6: Operations & Deployment
1. Invoke `@sf-ship`. Checks the baseline, cleans up the `git worktree`, packages versions, maintains the changelog, and pushes a PR.
