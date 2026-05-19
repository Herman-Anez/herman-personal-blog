# API Specification — {{MODULE_NAME}}

**Bounded Context:** {{MODULE_NAME}}  
**Version:** 1.0.0  
**Format:** OpenAPI 3.1.0  
**Base URL:** `/api/{{MODULE_SLUG}}`

## API objective

{{API_OBJECTIVE}}

> Describe what operations this API exposes and what it intentionally does NOT handle (e.g., authentication, unrelated domains).

## OpenAPI Specification

```yaml
openapi: 3.1.0
info:
  title: {{MODULE_NAME}} API
  version: 1.0.0
  description: |
    {{API_DESCRIPTION}}
servers:
  - url: /api/{{MODULE_SLUG}}
    description: Internal Base URL

security:
  - bearerAuth: []

paths:
  /{{RESOURCE_PLURAL}}:
    get:
      summary: List {{RESOURCE_PLURAL}}
      description: List {{RESOURCE_PLURAL}} by filters.
      parameters:
        - name: status
          in: query
          schema:
            type: string
        - name: {{FILTER_PARAM}}
          in: query
          schema:
            type: string
      responses:
        '200':
          description: List of {{RESOURCE_PLURAL}}.
    post:
      summary: Create a new {{RESOURCE}}
      description: Register a new {{RESOURCE}} with initial data.
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Create{{RESOURCE}}Request'
      responses:
        '201':
          description: {{RESOURCE}} created successfully.

  /{{RESOURCE_PLURAL}}/{id}:
    parameters:
      - name: id
        in: path
        required: true
        schema:
          type: string
          format: uuid
    get:
      summary: Get {{RESOURCE}} detail
      responses:
        '200':
          description: {{RESOURCE}} detail.
        '404':
          description: {{RESOURCE}} not found.
    patch:
      summary: Update {{RESOURCE}}
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Update{{RESOURCE}}Request'
      responses:
        '200':
          description: {{RESOURCE}} updated successfully.

  /{{RESOURCE_PLURAL}}/{id}/{{BUSINESS_ACTION}}:
    post:
      summary: Execute {{BUSINESS_ACTION}} on {{RESOURCE}}
      description: {{BUSINESS_ACTION_DESCRIPTION}}
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
            format: uuid
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/{{BUSINESS_ACTION}}Request'
      responses:
        '200':
          description: Action executed successfully.

components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT

  schemas:
    Create{{RESOURCE}}Request:
      type: object
      required:
        - {{REQUIRED_FIELD_1}}
        - {{REQUIRED_FIELD_2}}
      properties:
        {{REQUIRED_FIELD_1}}:
          type: string
        {{REQUIRED_FIELD_2}}:
          type: string
        {{OPTIONAL_FIELD}}:
          type: string

    Update{{RESOURCE}}Request:
      type: object
      properties:
        {{FIELD_1}}:
          type: string
        {{FIELD_2}}:
          type: string

    {{BUSINESS_ACTION}}Request:
      type: object
      required:
        - {{ACTION_REQUIRED_FIELD}}
      properties:
        {{ACTION_REQUIRED_FIELD}}:
          type: string
          format: date
        reason:
          type: string
```

## Contract rules

- **Zero Trust M2M:** All synchronous communication originated from other modules toward this API mandatorily requires a valid ephemeral JWT token (M2M) issued by the auth module.
- The API must not expose internal domain rules as simple editable fields without validation.
- Operations that affect cross-cutting processes must trigger integrations when applicable.
- Validation errors must be clear and distinguishable from technical errors.

## Annexe documentation

For detailed business rules behind these endpoints, consult the use cases:

- **[{{USE_CASE_1}}](./use-cases/uc-{{CTX}}-01-{{action}}.md)**: Ref: `POST /{{RESOURCE_PLURAL}}`.
- **[{{USE_CASE_2}}](./use-cases/uc-{{CTX}}-02-{{action}}.md)**: Ref: `PATCH /{{RESOURCE_PLURAL}}/{id}`.

[back](./readme.md)
