# Integration Events Catalogue

**Version:** 1.0.0  
**Status:** In evolution  
**Objective:** Define the async contracts exchanged between bounded contexts of {{PROJECT_NAME}}.

## Global rules

Every integration event must include:

- `eventId`: unique message identifier to support idempotency.
- `eventType`: stable event name.
- `occurredOn`: timestamp in ISO 8601 UTC format.
- `correlationId`: distributed process tracking identifier when applicable.
- `data`: minimum payload needed for the consumer to act.

Additionally:

- Events must not expose internal persistence structures.
- The payload must be stable and versionable.
- Consumers must tolerate retries and duplicate messages.

## Events from module {{MODULE_A_NAME}}

### `{{AGGREGATE_ROOT}}CreatedIntegrationEvent`

Emitted when {{MODULE_A_NAME}} consolidates the creation of a new `{{AGGREGATE_ROOT}}`.

- **Producer:** `{{MODULE_A_SLUG}}`
- **Routing Key:** `{{MODULE_A_SLUG}}.{{resource}}.created`
- **Known consumers:** `{{CONSUMING_MODULE_SLUG}}`

**Example payload**

```json
{
  "eventId": "{{uuid}}",
  "eventType": "{{AGGREGATE_ROOT}}CreatedIntegrationEvent",
  "occurredOn": "{{ISO_TIMESTAMP}}",
  "correlationId": "{{correlation-id}}",
  "data": {
    "{{resource}}Id": "{{id}}",
    "{{field_1}}": "{{value_1}}",
    "{{field_2}}": "{{value_2}}"
  }
}
```

### `{{AGGREGATE_ROOT}}UpdatedIntegrationEvent`

Emitted when a relevant state change occurs in `{{AGGREGATE_ROOT}}` that affects other modules.

- **Producer:** `{{MODULE_A_SLUG}}`
- **Routing Key:** `{{MODULE_A_SLUG}}.{{resource}}.updated`
- **Known consumers:** `{{CONSUMING_MODULE_SLUG}}`

**Example payload**

```json
{
  "eventId": "{{uuid}}",
  "eventType": "{{AGGREGATE_ROOT}}UpdatedIntegrationEvent",
  "occurredOn": "{{ISO_TIMESTAMP}}",
  "data": {
    "{{resource}}Id": "{{id}}",
    "{{changed_field}}": "{{new_value}}"
  }
}
```

### `{{AGGREGATE_ROOT}}DeletedIntegrationEvent`

Emitted when the `{{AGGREGATE_ROOT}}` lifecycle ends. Critical for revoking accesses or triggering cleanup in other modules.

- **Producer:** `{{MODULE_A_SLUG}}`
- **Routing Key:** `{{MODULE_A_SLUG}}.{{resource}}.deleted`
- **Known consumers:** `{{CONSUMING_MODULE_1}}`, `{{CONSUMING_MODULE_2}}`

**Example payload**

```json
{
  "eventId": "{{uuid}}",
  "eventType": "{{AGGREGATE_ROOT}}DeletedIntegrationEvent",
  "occurredOn": "{{ISO_TIMESTAMP}}",
  "data": {
    "{{resource}}Id": "{{id}}",
    "reason": "{{REASON_CODE}}"
  }
}
```

## Events from module {{MODULE_B_NAME}}

### `{{MODULE_B_EVENT}}IntegrationEvent`

Emitted when {{MODULE_B_NAME}} completes {{EVENT_TRIGGER}}.

- **Producer:** `{{MODULE_B_SLUG}}`
- **Routing Key:** `{{MODULE_B_SLUG}}.{{resource}}.{{action}}`
- **Known consumers:** `{{CONSUMING_MODULE_SLUG}}`

**Example payload**

```json
{
  "eventId": "{{uuid}}",
  "eventType": "{{MODULE_B_EVENT}}IntegrationEvent",
  "occurredOn": "{{ISO_TIMESTAMP}}",
  "correlationId": "{{correlation-id}}",
  "data": {
    "{{field_1}}": "{{value_1}}",
    "{{field_2}}": "{{value_2}}"
  }
}
```

> Note: The event must not transport secrets, tokens, or passwords in plain text.

## Design considerations

- `correlationId` is key for traceability across distributed processes.
- `reasonCode` allows automating responses, translations, and corrective actions.
- Event names must remain stable even if the internal implementation changes.
- Event semantics must be business-oriented, not internal-technology-oriented.
- **Cohesive coupling:** Consumers of events containing business logic must use adaptation layers (ACL) to map concepts to their own technical language, avoiding domain leakage.

## Security and Secret Handling

To guarantee system integrity and comply with data protection regulations:

1. **No secrets on the bus:** Under no circumstances should activation tokens, temporary passwords, or cryptographic secrets be sent through the Message Broker.
2. **Secret resolution (Fetch-on-Demand):** In flows requiring secrets (e.g., account activation), the consumer must receive a generic state event and then "pull" the secret from the emitter module through a private and secure internal API.
3. **State events:** Integration events must limit themselves to notifying state changes to allow orchestration to continue without compromising sensitive data.

[back](../readme.md)
