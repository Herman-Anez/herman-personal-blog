# {{MODULE_NAME}} — C4 Component Diagram (Level 3)

## Component Diagram

```plantuml
@startuml C4_Elements
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Component.puml

title Components - {{MODULE_NAME}}

Container_Boundary(mod, "{{MODULE_NAME}}") {
    Component(api, "API Layer", "REST/gRPC", "Exposes use cases to the outside")
    Component(app, "Application Services", "Service", "Orchestrates use cases and domain logic")
    Component(domain, "Domain Model", "Logic", "Invariants, aggregates, and business rules")
    Component(infra, "Infrastructure", "Adapter", "DB, Broker, external service adapters")
}

ContainerDb(db, "{{MODULE_NAME}} Database", "PostgreSQL", "Persistent storage for this bounded context")
ContainerDb(msg_bus, "Message Broker", "RabbitMQ", "Event bus for async integration")

Rel(api, app, "Invokes use cases")
Rel(app, domain, "Uses domain model")
Rel(app, infra, "Implements via interfaces (ports)")
Rel(infra, db, "Writes/Reads", "SQL")
Rel(infra, msg_bus, "Publishes/Consumes events", "AMQP")
@enduml
```

## Highlighted components

- **API Layer:** Receives HTTP/gRPC requests, validates input, delegates to Application Services.
- **Application Services:** Coordinate use cases, enforce transaction boundaries.
- **Domain Model:** Contains aggregates, entities, value objects, and domain events.
- **Infrastructure:** Implements repository interfaces, event publishers, and external adapters.

[back](../readme.md)
