# Git Workflow

**Version:** 1.0.0

This repository uses a branch-based workflow (*Feature Branch Workflow* with influences from *Trunk-Based Development*) for fast and controlled integrations.

## Main branches

- `main`: The primary branch. Represents the current installable state of the software in production or staging. **Direct commits are not allowed**; all integration happens through *Pull Requests* (PRs).

## Temporary branches

Created from `main` and deleted once approved and merged.

### Branch naming convention

`<type>/[TICKET-ID]-<short-description>`

Allowed types:

- `feature/`: new functionality.
- `fix/`: documented bug fixes.
- `chore/`: project maintenance (dependencies, structural refactors, non-functional documentation).
- `docs/`: documentation updates.

*Example:* `feature/CTX-101-user-onboarding`

## Commit conventions (Conventional Commits)

Highly recommended: [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

Structure: `<type>(<optional scope>): <description>`

Common types:

- `feat:` A new feature
- `fix:` A bug fix
- `docs:` Documentation-only changes
- `refactor:` A code change that neither fixes a bug nor adds a feature
- `test:` Adding or fixing tests

*Example:* `feat(iam): add activation token for new users`

## Pull Request process

1. **Create PR toward `main`:** Title must be descriptive (follow commit format if using Squash Merge).
2. **Continuous review:** Code should not live outside `main` for more than a couple of days to avoid large conflicts.
3. **Basic merge checklist:**
   - [ ] Unit/integration tests pass.
   - [ ] Documentation in `docs/` updated if domain or architecture changed.
   - [ ] Approval from at least one technical reviewer.

## Conflict handling and updates

Developers should *Rebase* from `main` into their feature branches rather than *Merge* to maintain a linear, clean history, or opt for *Squash and Merge* when finishing the PR.
