# TrailSense AI Coding Rules

## General Principles
- Always follow Clean Architecture
- Prefer simplicity over abstraction
- Avoid magic and implicit behavior
- Write readable and predictable code

## Tech Stack
- Backend: NestJS + TypeScript
- Database: PostgreSQL
- ORM: Drizzle ORM ONLY
- Validation: class-validator or Zod

---

## Architecture Rules

### Layers
- Controller → handles HTTP only
- Service → contains business logic
- Repository → handles DB access
- DTO → validation and typing

STRICT RULE:
- Controllers must NOT contain business logic
- Services must NOT contain raw SQL
- Repositories must NOT contain business logic

---

## Module Structure
Each feature must be isolated:

- trip/
- gear/
- auth/
- user/

Each module must contain:
- controller
- service
- repository
- dto
- schema

---

## Naming Conventions
- Use full domain names (Trip, Gear, User)
- Avoid abbreviations
- Use singular for entities

---

## Database Rules
- Use Drizzle schema definitions
- Use explicit relations
- Avoid implicit joins
- No raw SQL unless necessary

---

## Code Quality
- No `any`
- No hardcoded values
- Use enums/constants
- Keep functions small and focused

---

## DTO Rules
- Always validate input
- Separate Create / Update DTOs
- Never expose DB schema directly

---

## Error Handling
- Use NestJS exceptions
- Do not throw raw errors
- Use meaningful error messages

---

## Frontend (for shared logic later)
- Separate UI from logic
- API calls must be isolated

---

## Scalability
- Write code that can be extended
- Avoid tight coupling
- Prefer composition over inheritance

---

## What to Avoid
- God services
- Fat controllers
- Hidden side effects
- Over-engineering

---

## When Generating Code
ALWAYS:
- Follow this file strictly
- Explain architectural decisions if unclear
- Prefer clarity over cleverness