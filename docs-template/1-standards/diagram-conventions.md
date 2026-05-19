# Diagram Conventions

**Version:** 1.0.0  
**Status:** Active  
**Standard tool:** PlantUML

## Objective

Ensure all technical diagrams in the project have a unified aesthetic, are easy to maintain (diagram as code), and use the correct symbology for their purpose.

## Standards by diagram type

### 1. C4 Model — Component Diagram (Level 3)

* **Purpose:** Show the internal structure of a Bounded Context (API, Application, Domain, Infrastructure).
* **Library:** `C4-PlantUML`.
* **Required include:** `!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Component.puml`.
* **Location:** `docs/4-modules/[name]/architecture/c4-component-diagram.md`.

### 2. Sequence diagrams

* **Purpose:** Detail interaction between components or complex processes (Sagas).
* **Syntax:** Standard PlantUML Sequence.
* **Location:** Inside `use-cases/` (if specific) or `3-global-processes/` (if cross-cutting).

### 3. Domain model (Class diagram)

* **Purpose:** Visualize relationships between Aggregates, Entities, and Value Objects.
* **Location:** Inside `docs/4-modules/[name]/domain-model.md`.

## Style rules

1. **Names:** Use **PascalCase** for component and entity names.
2. **Relationships:** All interaction arrows must have a descriptive label (e.g., "Persists data", "Emits event").
3. **Headers:** Each diagram must include a descriptive title (`title`).
4. **Colors:** Follow C4-PlantUML default palette to avoid visual distractions.

## Maintenance

* Diagrams must live **inside Markdown code blocks** with the `plantuml` identifier.
* Do not commit static images (PNG/SVG) to the repository; the system must render them from code.

## Related templates

* [Template: C4 Component](./templates/c4-component-diagram.md)
* [Template: Sequence Diagram](./templates/sequence-diagram.md)
* [Template: Domain Model Diagram](./templates/domain-model-diagram.md)

[back](./documentation-guidelines.md)
