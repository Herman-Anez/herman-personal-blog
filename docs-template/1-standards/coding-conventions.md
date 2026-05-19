# Code and Structure Conventions

**Version:** 1.0.0

This document defines naming and structure rules to maintain consistency across the entire codebase, aligned with **Domain-Driven Design (DDD)** and **Clean Architecture** practices.

## General naming

- **Directories and files (except classes):** `kebab-case` (e.g., `identity-and-access`, `user-created.event.ts`).
- **Classes and Interfaces:** `PascalCase` (e.g., `UserRepository`, `CreateUserUseCase`).
- **Variables and methods:** `camelCase` (e.g., `userId`, `activateAccount()`).
- **Constants:** `UPPER_SNAKE_CASE` (e.g., `MAX_RETRY_ATTEMPTS`).

## Domain-Driven Design (DDD)

Code must reflect the **Ubiquitous Language** defined in functional documentation.

### Entities and Value Objects

- **Entities:** Singular names representing the business concept. No suffixes like `Entity` or `Model`.
  - ✅ `User` | ❌ `UserModel`
  - ✅ `Order` | ❌ `OrderEntity`
- **Value Objects:** Typically immutable. Descriptive names without suffixes.
  - ✅ `EmailAddress`
  - ✅ `Money`

### Interfaces and contracts

- Avoid prefixing with `I` unless standard in the chosen language; use the framework convention if mandatory. Prefer names based on the role they fulfill.
- **Repositories:** Should indicate the action on the aggregate.
  - ✅ `UserRepository` (interface), `PostgresUserRepository` (implementation).

## Application layer (Use Cases)

- Use cases handle a single main application flow.
- Naming: `Verb + Concept + UseCase/CommandHandler`
  - ✅ `CreateUserUseCase` or `CreateUserCommandHandler`

## Infrastructure layer

- Encapsulate libraries under their own interfaces if they change domain logic.
- Place database implementations, third-party API clients (e.g., SMS sending) here.

## Integration Events

- Naming: `[Subject][PastTenseVerb]IntegrationEvent`
  - ✅ `UserCreatedIntegrationEvent`
  - ✅ `OrderPlacedIntegrationEvent`

## REST API naming

If the module exposes endpoints, follow standard HTTP conventions:

- **Plural routes:** `/users`, `/orders`
- **Nested actions for sub-resources (simple read/modify):** `/users/{id}/roles`
- **Explicit business commands (when CRUD is not enough):** `/users/{id}/activate` (POST preferred over a complex PATCH).
