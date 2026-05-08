# TrailSense Architecture

## Overview

TrailSense is a fullstack application for planning hiking trips.

Tech stack:
- Backend: NestJS + PostgreSQL + Drizzle
- Web: Next.js
- Mobile: React Native (Expo)
- Monorepo: Turborepo

---

## High-Level Architecture

Clients:
- Web (Next.js)
- Mobile (React Native)

Backend:
- REST API (NestJS)

Database:
- PostgreSQL

---

## Data Flow

Client → API → Database

- All business logic is inside backend
- Clients are thin (UI + API calls)

---

## Modules

Core modules:
- Auth
- User
- Trip
- Gear
- TripGear
- UserGear
- Weather
- Recommendation

---

## Key Principles

### 1. Single Source of Truth
Backend owns all logic

---

### 2. Separation of Concerns
- Controller → HTTP
- Service → business logic
- Repository → DB

---

### 3. Extensibility

Recommendation engine:
- initially inside NestJS
- later extracted into FastAPI service

---

## Future Architecture

- Add FastAPI microservice for recommendations
- Add background workers
- Add caching (Redis)

---

## Mobile Strategy

Mobile is NOT a copy of web:
- simplified UX
- checklist-driven UI

---

## Scalability

- Monorepo supports scaling
- Services can be extracted later