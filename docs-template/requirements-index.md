# {{PROJECT_NAME}} — System Requirements

This document summarizes the global system requirements and serves as the starting point for each module's specific requirements.

## Related documents

- [Project definition](./project-definition.md)
- [Architecture and patterns](./2-architecture/arquitectura-y-patrones.md)
- [Global processes](./3-global-processes/readme.md)
- [Integration events](./5-events/readme.md)

## Business objectives

- {{BUSINESS_OBJECTIVE_1}}
- {{BUSINESS_OBJECTIVE_2}}
- Maintain traceability, security, and controlled evolution of the ecosystem.

## Global functional scope

### {{MODULE_1}}

- {{FUNCTIONAL_REQUIREMENT_1}}
- {{FUNCTIONAL_REQUIREMENT_2}}

### {{MODULE_2}}

- {{FUNCTIONAL_REQUIREMENT_A}}
- {{FUNCTIONAL_REQUIREMENT_B}}

### Integration and support

- Publishing and consuming events between modules
- Outbound notifications derived from business processes
- Coordination of cross-cutting processes

## Global non-functional requirements

### Security

- **RNF-S1:** All external communication must use HTTPS.
- **RNF-S2:** Authentication tokens must persist with rotation and revocation controls.
- **RNF-S3:** Sensitive actions must be auditable.

### Maintainability

- **RNF-M1:** The domain must not depend on external frameworks.
- **RNF-M2:** The system structure must favor explicitly decoupled bounded contexts.
- **RNF-M3:** Technical and functional documentation must remain aligned with code.

### Performance

- **RNF-P1:** Authentication and authorization validations must not introduce perceptible latency for the end user.
- **RNF-P2:** Read-intensive queries must be optimizable without compromising domain invariants.

### Scalability

- **RNF-E1:** Modules must be able to evolve independently.
- **RNF-E2:** Async integrations must tolerate retries and transient failures.

## Traceability to modules

Detailed requirements must live in each bounded context's own documents:

- [{{MODULE_1}} requirements](./4-modules/[module-1-slug]/requirements.md)
- [{{MODULE_2}} requirements](./4-modules/[module-2-slug]/requirements.md)

> Replace `[module-1-slug]` with the actual kebab-case folder name.

## Note on templates

To create requirements for a new module, use this file as global scope reference and create the detail in `docs/4-modules/[module]/requirements.md`.

[back](./readme.md)
