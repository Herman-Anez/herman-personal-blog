# Global Process 01: [Process Name]

## Objective

Describe the end-to-end flow from [triggering event] to [final outcome].

## Participating modules

- **{{MODULE_A}}:** [role in this process].
- **{{MODULE_B}}:** [role in this process].
- **{{MODULE_C}}:** [role in this process, e.g., handles outbound notifications].

## Main flow

### 1. [First step name]

- **Actor:** [human actor or system]
- **Module:** `[module-slug]`
- **Related use case:** `UC-CTX-01: [Use Case Name]`

[Description of what happens in this step and what gets triggered.]

### 2. [Second step name]

- **Actor:** system
- **Module:** `[module-slug]`
- **Related use cases:**
  - `UC-CTX-02: [Use Case Name]`

[Description of what happens. Include alternative scenarios if relevant.]

### 3. [Third step name]

- **Actor:** [actor]
- **Module:** `[module-slug]`
- **Related use case:** `UC-CTX-03: [Use Case Name]`

[Description of what happens in this step.]

## Sequence diagram

```plantuml
@startuml
autonumber
actor "Actor" as actor
participant "Module A" as mod_a
queue "Messaging (RabbitMQ)" as bus
participant "Module B" as mod_b
participant "Module C" as mod_c

actor -> mod_a: POST /resource (action)
mod_a -> mod_a: Persist state
mod_a -> bus: Publish [TriggerIntegrationEvent]
mod_a --> actor: 201 Created

bus -> mod_b: Consume event
alt Success
    mod_b -> mod_b: Process business logic
    mod_b -> bus: Publish [SuccessIntegrationEvent]
else Failure
    mod_b -> mod_b: Fail to process
    mod_b -> bus: Publish [FailureIntegrationEvent]
    bus -> mod_c: Consume failure event
    mod_c -> mod_c: Alert support / compensate
end

bus -> mod_c: Consume success event
mod_c -> actor: Send notification / confirmation
@enduml
```

## Expected outcome

When the process completes:

- [outcome 1]
- [outcome 2]
- [outcome 3]

## Risks and considerations

- If [module] fails to [action], it must emit a failure event to alert support, without reverting [previous module] state.
- If [notification or delivery] fails, the system must allow retries or operational escalation.
- The entire flow must be auditable through `correlationId`.
