# Template: C4 Component Diagram (Level 3)

## Component Diagram

```plantuml
@startuml C4_Elements
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Component.puml

title Components - [Module Name]

Container_Boundary(mod, "[Bounded Context Name]") {
    Component(api, "API Layer", "REST/GraphQL", "Exposes functionality to the outside")
    Component(app, "Application Services", "Service", "Coordinates use cases")
    Component(domain, "Domain Model", "Logic", "Invariants and business rules")
    Component(infra, "Infrastructure", "Adapter", "Technical implementations (DB, Broker, etc)")
}

ContainerDb(db, "Database", "PostgreSQL", "Persistent storage")
ContainerDb(msg_bus, "Message Broker", "RabbitMQ", "Event bus")

Rel(api, app, "Invokes")
Rel(app, domain, "Uses")
Rel(app, infra, "Implements via interfaces")
Rel(infra, db, "Writes/Reads", "SQL")
Rel(infra, msg_bus, "Publishes/Consumes", "AMQP")
@enduml
```

## Highlighted components

- **[Component 1]:** Brief description.
- **[Component 2]:** Brief description.

[back](../diagram-conventions.md)
