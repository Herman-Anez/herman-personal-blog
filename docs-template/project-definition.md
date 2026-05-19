# {{PROJECT_NAME}} — Project Definition

This document consolidates the functional and architectural definition of the project before starting productive code development.

## Project objective

{{PROJECT_OBJECTIVE}}

> Example: "Build a modular platform that allows managing user identity and employee lifecycle securely, with decoupled and traceable integrations."

## Related documents

- [Documentation portal](./readme.md)
- [Global requirements](./requirements-index.md)
- [Architecture and patterns](./2-architecture/arquitectura-y-patrones.md)
- [Global processes](./3-global-processes/readme.md)
- [Integration events](./5-events/readme.md)

## Problem statement

{{PROBLEM_STATEMENT}}

> Describe the core problem this system solves. List specific pain points:
> - Data scattered across disconnected systems
> - Manual or error-prone processes
> - Lack of traceability or auditability
> - Weak access controls

## Product vision

The system must allow:

- {{ACTOR_1}} to {{ACTOR_1_RESPONSIBILITY}} as the source of truth for {{DOMAIN_1}}.
- {{ACTOR_2}} to {{ACTOR_2_RESPONSIBILITY}} without mixing concerns with {{DOMAIN_2}}.
- Cross-cutting processes to be resolved through events and clear contracts.

## Main actors

- **{{ACTOR_ROLE_1}}:** {{ACTOR_DESCRIPTION_1}}
- **{{ACTOR_ROLE_2}}:** {{ACTOR_DESCRIPTION_2}}
- **Automated system processes:** React to events, execute retries, and trigger integrations.

## Scope of the first stage

### Included modules

- **{{MODULE_1}}**
- **{{MODULE_2}}**

### Included capabilities

- {{CAPABILITY_1}}
- {{CAPABILITY_2}}
- {{CAPABILITY_3}}

### Out of scope for now

- {{OUT_OF_SCOPE_1}}
- {{OUT_OF_SCOPE_2}}

## Defined bounded contexts

### {{MODULE_1}}

Source of truth for:

- {{ENTITY_1}}
- {{ENTITY_2}}

Must NOT handle: {{WHAT_IT_DOES_NOT_OWN}}

### {{MODULE_2}}

Source of truth for:

- {{ENTITY_A}}
- {{ENTITY_B}}

Must NOT handle: {{WHAT_IT_DOES_NOT_OWN_2}}

## Already identified cross-cutting processes

- {{CROSS_PROCESS_1}}
- {{CROSS_PROCESS_2}}

## Global system rules

- {{GLOBAL_RULE_1}}
- All access to the system must pass through the identity/auth module.
- All integration between modules must have explicit contracts.
- Events must be idempotent and traceable.
- Sensitive data must not travel in events unless strictly necessary.
- Documentation must precede or accompany each architecture or behavior change.

## Documentary Quality Guarantees

Before coding, each module must comply with the standard:

- **Standard Structure:** `readme.md`, `requirements.md`, `domain-model.md`, `api-spec.md`, `use-cases/index.md`.
- **Clear Contracts:** Published and consumed events identified and catalogued.
- **Full Traceability:** Architecture decisions recorded as ADRs, cross-cutting processes mapped.

## Definition Status

**Status:** {{STATUS}}

> Example statuses: "In progress", "Hardened & Ready", "Under review"

## Implementation phase

When ready, prioritize:

1. **Infrastructure foundations:** Event Bus and per-context databases.
2. **Core security module:** Authentication and authorization nucleus.
3. **Primary business module:** Base business flows.
4. **Integrations:** Cross-cutting process orchestration via events.

[back](./readme.md)
