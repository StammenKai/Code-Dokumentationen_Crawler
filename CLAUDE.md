# CLAUDE.md
First, please Ask only in Germen.
This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Purpose

This repository is a collection of **Claude Code agent definition files** — reusable agent personas that can be loaded into AI tools (Claude, Gemini, etc.) to save tokens by avoiding repeated system prompt setup. The original motivation (described in README.md) is to crawl code documentation, export it to Markdown/PDF, and load it as a knowledge base.

## Repository Structure

All agent definitions live in `Agents/` as Markdown files with YAML frontmatter. There is no build system, test runner, or package manager.

## Agent File Format

Each file in `Agents/` follows this structure:

```markdown
---
name: Agent Name
description: One-line description of capabilities
color: <color>
emoji: <emoji>
vibe: Short tagline
---

# Agent Name

[Agent personality, rules, deliverables, communication style]
```

**Frontmatter fields:**
- `name` — Display name used when selecting the agent
- `description` — Used for agent discovery/matching; be specific about domain
- `color` — UI accent color (blue, cyan, red, green, amber, orange, …)
- `emoji` — Single emoji icon
- `vibe` — One-liner that captures the agent's personality

## Naming Convention

Files follow the pattern: `<category>-<role>.md`

Current categories: `engineering-`

Examples: `engineering-backend-architect.md`, `engineering-security-engineer.md`

## Agent Content Guidelines

When writing or editing agent files:

- **Critical Rules** sections are non-negotiable constraints the agent always enforces
- **Core Mission** defines the primary deliverables and responsibilities
- **Communication Style** shapes how the agent responds
- **Success Metrics** are concrete, measurable (e.g., "API response times under 200ms")
- Code examples in agent files should be illustrative best-practice patterns, not runnable code
- End each file with an `Instructions Reference` line pointing to where the agent's full methodology lives (training or external docs)
