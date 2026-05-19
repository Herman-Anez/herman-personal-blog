# Infrastructure — C4 Model (Containers)

To orchestrate the interaction between clients, modules, and integration components, the solution adopts a container view based on **API Gateway**, decoupled bounded contexts, and async messaging.

## Container Diagram

```plantuml
@startuml C4_Elements
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Container.puml

Person(user, "End User", "Authenticated user of the system")
Person(admin, "Administrator", "Manages roles, permissions, and operations")

Container(spa, "Web Application", "React / TypeScript", "Main system UI")
Container(api_gateway, "API Gateway / BFF", "Node.js / Nginx", "Entry point, delegated auth, routing")

System_Boundary(system, "{{PROJECT_NAME}}") {
    Container(module_a, "{{MODULE_A_NAME}}", "Service", "{{MODULE_A_DESCRIPTION}}")
    Container(module_b, "{{MODULE_B_NAME}}", "Service", "{{MODULE_B_DESCRIPTION}}")
    ContainerDb(module_a_db, "{{MODULE_A_NAME}} Database", "PostgreSQL", "Module A data")
    ContainerDb(module_b_db, "{{MODULE_B_NAME}} Database", "PostgreSQL", "Module B data")
    ContainerDb(msg_bus, "Message Broker", "RabbitMQ / Kafka", "Integration events and async processes")
}

System_Ext(external_provider, "External Provider", "External service for outbound operations")

Rel(user, spa, "Uses the portal", "HTTPS")
Rel(admin, spa, "Manages system", "HTTPS")
Rel(spa, api_gateway, "Invokes APIs", "HTTPS")

Rel(api_gateway, module_a, "Module A operations", "HTTP")
Rel(api_gateway, module_b, "Module B operations", "HTTP")

Rel(module_a, module_a_db, "Reads and writes", "SQL/TCP")
Rel(module_b, module_b_db, "Reads and writes", "SQL/TCP")

Rel(module_a, msg_bus, "Publishes {{MODULE_A_EVENT}}", "AMQP")
Rel(msg_bus, module_b, "Delivers events from Module A", "AMQP")
Rel(module_b, external_provider, "Delegates outbound operations", "HTTPS")
@enduml
```

> Replace module names, events, and relationships with your actual architecture.

## View notes

- Each bounded context keeps its own persistence.
- The broker decouples global processes and failure scenarios.
- External provider access is isolated within a specific module.

## Related documents

- [Context Diagram](./Diagrama-de-Contexto.md)
- [Infrastructure](../infrastructure.md)
- [Integration events](../../5-events/integration-events.md)

[back](../arquitectura-y-patrones.md)
