# {{MODULE_NAME}} — Infrastructure

## Persistence

- **Engine:** {{DB_ENGINE}} (e.g., PostgreSQL, MongoDB)
- **Schema isolation:** This bounded context owns its own schema/database. No other module accesses it directly.
- **Key tables/collections:** `{{TABLE_1}}`, `{{TABLE_2}}`

## Messaging

- **Broker:** {{MESSAGE_BROKER}} (e.g., RabbitMQ, Kafka)
- **Published events:** `{{EVENT_1}}` → routing key `{{MODULE_SLUG}}.{{resource}}.{{action}}`
- **Consumed events:** `{{CONSUMED_EVENT}}` → from `{{PRODUCER_MODULE}}`

## External dependencies

- **{{EXTERNAL_SERVICE}}:** Used for {{EXTERNAL_SERVICE_PURPOSE}}. Accessed exclusively within this module through an adapter interface.

## Deployment notes

- {{DEPLOYMENT_NOTE_1}} (e.g., "Can be deployed as an independent container or as part of a modular monolith")
- {{DEPLOYMENT_NOTE_2}} (e.g., "Requires access to the shared message broker")

## Related documents

- [Quality Attributes](./quality-attributes.md)
- [C4 Component Diagram](./c4-component-diagram.md)
- [Architecture and patterns](../../2-architecture/arquitectura-y-patrones.md)
