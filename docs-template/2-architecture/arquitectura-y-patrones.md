# Architecture and Patterns

This project adopts a modular architecture guided by **Domain-Driven Design (DDD)** and **Clean Architecture** to clearly separate business rules from technical concerns.

## Architectural principles

- **Bounded Contexts:** each module defines its own ubiquitous language, rules, and boundaries.
- **Layer separation:** domain, application, infrastructure, and interfaces must have clear responsibilities.
- **Low coupling:** modules collaborate through contracts and events, not internal dependencies.
- **Controlled evolution:** relevant decisions must be recorded as ADRs.
- **Domain focus:** important business rules must not be hidden in controllers, ORMs, or framework details.

## Main patterns

### Domain-Driven Design

Business is modeled through:

- Entities
- Value Objects
- Aggregates
- Repositories
- Domain Services
- Domain Events

Each bounded context must protect its invariants and prevent other modules from directly manipulating its internal model.

### Clean Architecture

Structure favors inward dependencies:

- Domain does not know frameworks.
- Application orchestrates use cases.
- Infrastructure implements adapters and access to external services.
- Interfaces expose APIs, messages, or entry points.

## Integration between modules

Collaboration between modules relies primarily on **integration events** and decoupled processes.

### Zero Trust and Backchannels

Although the architecture prioritizes async, there are flows where a module must synchronously invoke another subsystem via HTTP (Backchannels). Under no circumstances should these requests be considered secure "just because they are on the internal subnet." Inter-module connections require M2M tokens generated dynamically by the auth module (OAuth2 Client Credentials Flow), negating the use of Static API Keys.

### Choreographed Sagas

All distributed transactions or cross-cutting process flows are modeled under the **Saga (Choreographed)** pattern.

- **No Central Brain:** Instead of a Service Orchestrator, each Bounded Context reacts to events published on the broker.
- **Business Compensations (Rollbacks):** If a module fails processing a business rule, it emits a compensation event that previous modules listen to passively in order to execute a local rollback, returning their aggregates to a consistent or neutral state.
- **Exception for Infrastructure Failures:** For strictly technical or infrastructure failures (e.g., duplicate email), business rollback in the originating module is avoided to not decouple the legal reality from the technical one. Instead, the affected module emits a failure event that a `Notifications` module consumes to alert IT Support. This exception ensures that an IT problem does not undo an already consolidated business operation.

This allows:

- reducing direct dependencies
- isolating failures
- scaling capabilities independently
- maintaining autonomy per bounded context

When an operation crosses multiple modules, it must be explicitly modeled as a global process, orchestration, or event-based flow, according to its nature.

## Persistence and autonomy

As a general architectural direction, each bounded context must avoid sharing its persistent model with other contexts. Data autonomy reduces coupling and makes the evolution of each module clearer.

## Related documents

- [Quality attributes](./quality-attributes.md)
- [Infrastructure](./infrastructure.md)
- [ADR Index](./adrs/index.md)
- [C4 Model](./c4-model/Diagrama-de-Contenedores.md)
