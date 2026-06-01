# Skill Registry

**Delegator use only.** Any agent that launches sub-agents reads this registry to resolve compact rules, then injects them directly into sub-agent prompts. Sub-agents do NOT read this registry or individual SKILL.md files.

See `_shared/skill-resolver.md` for the full resolution protocol.

## User Skills

| Trigger | Skill | Path |
|---------|-------|------|
| When creating a pull request, opening a PR, or preparing changes for review | branch-pr | ~/.claude/skills/branch-pr/SKILL.md |
| When writing Go tests, using teatest, or adding test coverage | go-testing | ~/.claude/skills/go-testing/SKILL.md |
| When creating a GitHub issue, reporting a bug, or requesting a feature | issue-creation | ~/.claude/skills/issue-creation/SKILL.md |
| When user says "judgment day", "judgment-day", "review adversarial", "dual review", "doble review", "juzgar", "que lo juzguen" | judgment-day | ~/.claude/skills/judgment-day/SKILL.md |
| When user asks to create a new skill, add agent instructions, or document patterns for AI | skill-creator | ~/.claude/skills/skill-creator/SKILL.md |

## Compact Rules

Pre-digested rules per skill. Delegators copy matching blocks into sub-agent prompts as `## Project Standards (auto-resolved)`.

### branch-pr
- Every PR MUST link a GitHub issue with `status:approved` label — no exceptions
- Branch naming: `type/description` matching `^(feat|fix|chore|docs|style|refactor|perf|test|build|ci|revert)\/[a-z0-9._-]+$`
- Add exactly one `type:*` label to every PR
- Use conventional commits on all changes
- Blank PRs without issue linkage will be blocked by GitHub Actions

### go-testing
- Use `teatest` for Bubbletea TUI components; never test `.View()` output directly
- Call `t.Helper()` in all test helper functions
- Avoid global state — inject dependencies, never rely on init() side effects
- Table-driven tests preferred; name subtests with `t.Run()`
- Use `testify/assert` for assertions, not raw `t.Fatal`

### issue-creation
- Use templates only — bug report or feature request (blank issues are disabled)
- Issues auto-get `status:needs-review` on creation; wait for `status:approved` before opening PR
- Questions go to GitHub Discussions, not issues
- Fill ALL required fields in the template and check pre-flight checkboxes

### judgment-day
- Launch TWO sub-agents in parallel, each reviewing the same target independently
- Neither judge knows about the other — no cross-contamination in prompts
- Synthesize findings after both return; apply fixes, then re-judge (max 2 iterations)
- Inject skill registry compact rules into BOTH judge prompts before launching
- Escalate to user if both judges still fail after 2 iterations

### skill-creator
- SKILL.md requires frontmatter: `name`, `description` (with Trigger line), `license`
- Compact rules must be 5-15 lines — actionable only, no motivation or background
- Store at `skills/{skill-name}/SKILL.md` or `~/.claude/skills/{skill-name}/SKILL.md`
- Never include when-to-use or full code examples in compact rules
- After creating, update the skill registry

## Project Conventions

| File | Path | Notes |
|------|------|-------|
| CLAUDE.md | /Users/federicosuarez/arcomob/CLAUDE.md | Project-level conventions for arcomob |
