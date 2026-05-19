# Requirements: {{MODULE_NAME}}

## Module objective

{{MODULE_REQUIREMENTS_OBJECTIVE}}

> Describe what this module manages and what lifecycle or process it owns.

## Functional requirements

- **RF-{{CTX}}-01:** {{FUNCTIONAL_REQUIREMENT_1}} **[UC-{{CTX}}-01]**
- **RF-{{CTX}}-02:** {{FUNCTIONAL_REQUIREMENT_2}} **[UC-{{CTX}}-02]**
- **RF-{{CTX}}-03:** {{FUNCTIONAL_REQUIREMENT_3}} **[UC-{{CTX}}-03]**

> Add one row per functional requirement. Link to the corresponding use case ID.

## Key business rules

- A `{{AGGREGATE_ROOT}}` is identified by a `{{PRIMARY_ID}}` internal identifier.
- No two `{{AGGREGATE_ROOT}}` can share the same `{{UNIQUE_FIELD}}`.
- {{BUSINESS_RULE_3}}
- {{BUSINESS_RULE_4}}

## Non-functional requirements

- **RNF-{{CTX}}-S1 (Security):** Personal and sensitive data must have strict access controls.
- **RNF-{{CTX}}-S2 (Privacy):** Sensitive information must be minimized in integration events.
- **RNF-{{CTX}}-M1 (Maintainability):** The domain model must protect invariants within the aggregate.
- **RNF-{{CTX}}-P1 (Performance):** Operational queries must respond within acceptable times for normal administrative use.
- **RNF-{{CTX}}-A1 (Auditability):** All creates, relevant updates, and deletes must be recorded.

## Expected integrations

- **Publishes:** `{{EVENT_1}}`, `{{EVENT_2}}`
- **Consumes:** `{{CONSUMED_EVENT_1}}` (or "None — Master context")

[back](./readme.md)
