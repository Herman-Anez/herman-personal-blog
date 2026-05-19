# {{MODULE_NAME}}

**Bounded Context:** {{BOUNDED_CONTEXT_DESCRIPTION}}  
**Main Responsibility:** {{MODULE_MAIN_RESPONSIBILITY}}  
**Version:** 1.0.0

## Objective

{{MODULE_OBJECTIVE}}

> Describe in business terms what problem this context solves and what it manages.

## Main Entities

- **`{{AGGREGATE_ROOT}}`** — Main aggregate root. Brief description.
- **`{{ENTITY_1}}`** — Brief description and role.
- **`{{ENTITY_2}}`** — Brief description and role.

## Key Responsibilities

- {{RESPONSIBILITY_1}}
- {{RESPONSIBILITY_2}}
- {{RESPONSIBILITY_3}}

## Architecture and Attributes

- **Integrity:** Business invariants protected in the domain core (Hexagonal Architecture).
- **Auditability:** Full traceability of relevant state changes.
- **Resilience:** {{RESILIENCE_PATTERN}} (e.g., Outbox pattern for guaranteed event publishing).
- **Security:** Strict access control (RBAC) over sensitive data and PII.

## Integration with Other Contexts

- **Subscribes to:** {{CONSUMED_EVENTS}} (or "None — Master context")
- **Publishes:** `{{EVENT_1}}`, `{{EVENT_2}}`
- **Direct relation with:** {{RELATED_MODULES}}

## Important Links

- [Domain Model](./domain-model.md)
- [Requirements](./requirements.md)
- [API Specification](./api-spec.md)
- [Use Cases](./use-cases/index.md)
- [C4 Component Diagram](./architecture/c4-component-diagram.md)
- [Architecture Details](./architecture/infrastructure.md)
- [Quality Attributes](./architecture/quality-attributes.md)

[back](../../readme.md)
