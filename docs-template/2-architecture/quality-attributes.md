# Quality Attributes

This document defines the architectural characteristics (non-functional requirements / quality attributes) that must be considered and protected in the evolution of {{PROJECT_NAME}}.

## Maintainability and Independence

- **Loose Coupling:** Bounded Contexts do not share databases nor directly invoke the internal state of another module.
- **Evolvability:** Each module must be maintainable, refactorable, or rewritable (with justification) in isolation, without affecting the entire ecosystem.
- **Traceability:** Any async invocation between modules, as well as critical changes in domain aggregates, must include a `correlationId` for full tracking.

## Security and Identity

- **Centralized Authorization, Local Verification:** All system access is intermediated and authenticated by the auth module. Other modules assume the identity and claims (roles/permissions) contained in JWT tokens without querying the central user database on each invocation.
- **Audit:** High-criticality processes must keep records.
- **Zero Trust & M2M Communication:** Implicit network trust (VPC/LAN) is rejected. Any synchronous or HTTP backchannel communication between modules mandatorily requires a valid ephemeral JWT token (Machine-to-Machine) obtained through a Client Credentials flow. Static Security Keys are prohibited.

## Scalability and Resilience

- **Tolerance to Transient Failures:** Async integrations must include Retry policies with Exponential Backoff.
- **Idempotency:** When using Integration Events, consumers must manage idempotency. If a module receives the same event twice, the second invocation is silenced (no side effects).

## Performance and Operation

- **Acceptable Eventual Consistency:** The design accepts that data between modules can safely lag. If one module completes an operation, other modules may take a fraction of a second (or more, in case of network failures) to process it.
- **Light CQRS (Command Query Responsibility Segregation):** Complex queries or aggregated views should bypass the write model (Aggregate Roots) to perform ultra-fast queries directly to persistence via DTOs or other fast read technologies.

## Module-specific quality attributes

> Add module-specific quality attribute files in `docs/4-modules/[module]/architecture/quality-attributes.md`.
