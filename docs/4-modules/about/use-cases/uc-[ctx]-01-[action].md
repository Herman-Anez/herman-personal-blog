# [UC-{{CTX}}-01] {{USE_CASE_NAME}}

**Module:** {{MODULE_NAME}}  
**Main Actor:** {{ACTOR}}  
**Description:** {{USE_CASE_DESCRIPTION}}

---

## 1. Preconditions

* The {{ACTOR}} must be authenticated via JWT with claims to write to {{MODULE_SLUG}} (`{{MODULE_SLUG}}:{{RESOURCE}}:create`).
* {{PRECONDITION_2}}
* Referenced entities by ID ({{REFERENCED_IDS}}) must be valid and active.

## 2. Main Flow (Happy Path)

1. The {{ACTOR}} sends the registration data (via `POST /api/{{MODULE_SLUG}}/{{RESOURCE_PLURAL}}`).
2. The system validates nullability rules, format constraints, and required fields.
3. The system checks internally for {{UNIQUENESS_CHECK}} to discard duplicates.
4. The system creates the `{{AGGREGATE_ROOT}}` aggregate in memory (State: {{INITIAL_STATE}}).
5. The repository atomically persists all data to `{{MODULE_NAME}} Database`.
6. The system confirms the operation (`201 Created` or successful response).

## 3. Alternate Flows / Exceptions

* **A1 - {{DUPLICATE_ERROR}} (409 Conflict):** If the resource already exists, the transaction is cancelled. Nothing is inserted.
* **A2 - Invariant Violation (400 Bad Request):** If invalid data is detected ({{EXAMPLE_INVALID_DATA}}).

## 4. Postconditions

* **Success:** Persistence layer consolidates the state change atomically.
* **Failure:** Zero mutability (absolute Rollback based on persistence atomicity).

## 5. Domain Events (Domain & Integration Events)

* **Domain Event:** `{{AGGREGATE_ROOT}}CreatedDomainEvent` (only intercepted by handlers within {{MODULE_SLUG}}).
* **Integration Event:** `{{INTEGRATION_EVENT_NAME}}`. This event is published on the Broker so that `{{CONSUMING_MODULE}}` can react and perform {{CONSUMING_MODULE_ACTION}}.

[back](./index.md)
