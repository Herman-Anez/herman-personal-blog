# {{PROJECT_NAME}} — Documentation

Base documentation for {{PROJECT_NAME}}, organized to support design, implementation, and maintenance.

This repository follows **Domain-Driven Design (DDD)** and **Clean Architecture**, with emphasis on:

- Clear separation between domain, application, infrastructure, and integration.
- Decoupled modules through bounded contexts.
- Traceability of technical and business decisions.
- Documentation for onboarding, evolution, and team alignment.

## Purpose of this folder

The `docs/` folder concentrates the functional and technical documentation needed to understand:

- What problem the system solves.
- How its architecture is organized.
- What responsibilities each module has.
- What architecture decisions have already been made.
- How to maintain consistent documentation as the project grows.

## Quick navigation

- [Project definition](./project-definition.md)
- [Global requirements](./requirements-index.md)
- [Architecture](./2-architecture/arquitectura-y-patrones.md)
- [Global processes](./3-global-processes/readme.md)
- [Integration events](./5-events/readme.md)

## Recommended reading order

First time in the project? Follow this order:

1. [Project definition](./project-definition.md)
2. [Global requirements index](./requirements-index.md)
3. [Architecture and patterns](./2-architecture/arquitectura-y-patrones.md)
4. [Quality attributes](./2-architecture/quality-attributes.md)
5. [Infrastructure](./2-architecture/infrastructure.md)
6. [ADR Index](./2-architecture/adrs/index.md)
7. Business modules in `docs/4-modules/`

## Documentation structure

```text
docs/
|-- 1-standards/         # Work standards and documentation conventions
|-- 2-architecture/      # Architecture vision, patterns, infrastructure and ADRs
|-- 3-global-processes/  # Cross-cutting processes involving multiple modules
|-- 4-modules/           # Documentation per bounded context / module
|-- 5-events/            # Integration events between modules
|-- readme.md            # Documentation entry portal
`-- requirements-index.md
```

## Current modules

### Main modules

| Module | Main responsibility | Status |
|---|---|---|
| [{{MODULE_NAME}}](./4-modules/[module-name]/readme.md) | {{MODULE_RESPONSIBILITY}} | In documentation |

> Add one row per bounded context. Replace `[module-name]` with the module's kebab-case slug.

### Support components considered in the architecture

| Component | Role in the solution |
|---|---|
| API Gateway / BFF | Entry point for clients, response composition, policy enforcement |
| Service Broker | Channels integrations, events, and decoupled communication between modules |

## Key documents

### Standards

- [Documentation guide](./1-standards/documentation-guidelines.md)
- [Coding conventions](./1-standards/coding-conventions.md)
- [Git workflow](./1-standards/git-workflow.md)

### Architecture

- [Project definition](./project-definition.md)
- [Architecture and patterns](./2-architecture/arquitectura-y-patrones.md)
- [Quality attributes](./2-architecture/quality-attributes.md)
- [Infrastructure](./2-architecture/infrastructure.md)
- [C4 Model](./2-architecture/c4-model/Diagrama-de-Contenedores.md)

### Processes and events

- [Global processes](./3-global-processes/readme.md)
- [Integration events](./5-events/readme.md)

## Editorial conventions

- Spanish for business context, decisions, and business-oriented explanations.
- English for technical names, code artifacts, patterns, and implementation terms.
- One document per topic.
- Relative links whenever possible.
- Each module must have a `readme.md` as its entry point.
