# Architecture — C4 Model (Context)

## Context Diagram (Level 1)

This diagram shows the highest-level view of the system: who interacts with `{{PROJECT_NAME}}` and which external systems it integrates with in the first stage.

```plantuml
@startuml C4_Elements
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Context.puml

title Context Diagram - {{PROJECT_NAME}}

Person(user, "End User", "Uses the system according to their permissions")
Person(admin, "Administrator", "Manages users, roles, permissions, and policies")

System(system_core, "{{PROJECT_NAME}}", "{{SYSTEM_DESCRIPTION}}")

System_Ext(external_provider, "External Provider", "External service used by the system")

Rel(user, system_core, "Uses the system", "HTTPS")
Rel(admin, system_core, "Manages configuration and access", "HTTPS")

Rel(system_core, external_provider, "Delegates external operations", "HTTPS")

@enduml
```

> Replace actors, systems, and relationships to match your project.

## Relationship summary

- `{{PROJECT_NAME}}` is the central interaction point for internal actors.
- Users do not interact directly with external providers.
- External services are infrastructure dependencies isolated behind specific modules.

## Related documents

- [Container Diagram](./Diagrama-de-Contenedores.md)
- [Architecture and patterns](../arquitectura-y-patrones.md)
- [Project definition](../../project-definition.md)

[back](../arquitectura-y-patrones.md)
