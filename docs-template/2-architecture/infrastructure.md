# Architectural Infrastructure

This document exposes the logical infrastructure components needed to support the modular, event-driven design of {{PROJECT_NAME}}.

## Core components

### 1. API Gateway / Entry Point

All clients interact with an *API Gateway* or *BFF (Backend For Frontend)* instead of connecting directly to each logical module.

- **Responsibilities:** HTTP routing, SSL termination, initial access token validation, and protection against malicious traffic (*Rate Limiting*).

### 2. Isolated Persistence (Data Sovereignty)

To guarantee independence, Bounded Contexts do not share SQL schemas or NoSQL collections at runtime.

- **Advantages:** Each module chooses the database engine that suits it best.
- **ADR reference:** Link to relevant ADR when decided.

### 3. Message Bus / Event Broker

A robust async channel (e.g., RabbitMQ, Apache Kafka, AWS SNS/SQS, or Azure Service Bus) enables event choreography.

- **Recommended logical structure:** Topic or Pub/Sub exchanges, allowing the emitter to lack explicit knowledge of all its consumers.
- **Durability:** Messages must be enqueued durably (Durable Queues/DLQ) to mitigate temporary consumer unavailability.

### 4. External Providers Encapsulated (Adapter Pattern)

- External services (e.g., email, SMS, payment gateways) are used exclusively within specific modules through adapter interfaces. Other modules are unaware of these external technologies.

## Future vision

Depending on scale, deployment of these elements could derive into independent microservices or a modular monolith (*Modular Monolith*), where, although deployed together, the code architecture imposes impassable process/memory boundaries. Short-term decisions will be detailed in subsequent Architecture iterations or ADRs.

## Related documents

- [Architecture and patterns](./arquitectura-y-patrones.md)
- [Quality attributes](./quality-attributes.md)
- [C4 Model — Containers](./c4-model/Diagrama-de-Contenedores.md)
