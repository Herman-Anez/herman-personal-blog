# {{MODULE_NAME}} — Quality Attributes

## Integrity

- Business invariants are enforced within the `{{AGGREGATE_ROOT}}` aggregate root.
- No external module can directly mutate the state of this bounded context's aggregates.

## Auditability

- All creates, updates, and relevant state transitions must be logged.
- Critical operations must include `correlationId` for distributed traceability.

## Resilience

- **Event publishing:** Uses {{PUBLISHING_PATTERN}} (e.g., Outbox pattern) to guarantee at-least-once event delivery.
- **Retry policy:** Async consumers must implement exponential backoff on transient failures.
- **Idempotency:** All event consumers must be idempotent — duplicate delivery has no side effects.

## Security

- **Access control:** RBAC enforced on all endpoints. Permissions required: `{{MODULE_SLUG}}:{{resource}}:read`, `{{MODULE_SLUG}}:{{resource}}:write`.
- **PII protection:** Sensitive fields ({{PII_FIELDS}}) must not be included in integration events unless strictly necessary.
- **M2M authentication:** Synchronous calls from other modules require ephemeral JWT (Client Credentials flow).

## Performance

- Operational read queries ({{COMMON_QUERIES}}) must respond within acceptable times for normal administrative use.
- Complex read projections bypass the domain model (CQRS read side) for performance.

## Related documents

- [Infrastructure](./infrastructure.md)
- [Global quality attributes](../../2-architecture/quality-attributes.md)
