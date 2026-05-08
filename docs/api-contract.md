# TrailSense API Contract

## Base URL

/api/v1

---

# Auth Service API Contract

## Base URL
/api/v1/auth

---

## Authentication Model

- Access Token (JWT) — short-lived
- Refresh Token — long-lived
- Tokens are returned in response (MVP) or cookies (future)

---

# 1. Register

### POST /register

Create new user account

---

### Request

{
  "email": "user@example.com",
  "password": "string (min 8 chars)"
}

---

### Validation
- email must be valid
- password min length = 8

---

### Response (201)

{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "createdAt": "ISO date"
  },
  "tokens": {
    "accessToken": "jwt",
    "refreshToken": "jwt"
  }
}

---

### Errors
- 400 → validation error
- 409 → user already exists

---

# 2. Login

### POST /login

Authenticate user

---

### Request

{
  "email": "user@example.com",
  "password": "string"
}

---

### Response (200)

{
  "user": {
    "id": "uuid",
    "email": "user@example.com"
  },
  "tokens": {
    "accessToken": "jwt",
    "refreshToken": "jwt"
  }
}

---

### Errors
- 401 → invalid credentials

---

# 3. Refresh Token

### POST /refresh

Get new access token

---

### Request

{
  "refreshToken": "jwt"
}

---

### Response (200)

{
  "accessToken": "jwt"
}

---

### Errors
- 401 → invalid or expired refresh token

---

# 4. Logout

### POST /logout

Invalidate refresh token

---

### Request

{
  "refreshToken": "jwt"
}

---

### Response (200)

{
  "success": true
}

---

### Notes
- For MVP: can be no-op
- For production: store refresh tokens in DB/Redis

---

# 5. Get Current User

### GET /me

---

### Headers
Authorization: Bearer <accessToken>

---

### Response (200)

{
  "id": "uuid",
  "email": "user@example.com",
  "createdAt": "ISO date"
}

---

### Errors
- 401 → unauthorized

---

# 6. Change Password

### POST /change-password

---

### Headers
Authorization: Bearer <accessToken>

---

### Request

{
  "currentPassword": "string",
  "newPassword": "string"
}

---

### Response (200)

{
  "success": true
}

---

### Errors
- 401 → unauthorized
- 400 → wrong current password

---

# 7. Forgot Password (optional for MVP)

### POST /forgot-password

---

### Request

{
  "email": "user@example.com"
}

---

### Response (200)

{
  "success": true
}

---

# 8. Reset Password

### POST /reset-password

---

### Request

{
  "token": "string",
  "newPassword": "string"
}

---

### Response (200)

{
  "success": true
}

---

# Response Format Standart

## Success

{
  "data": {},
  "meta": {}
}

---

## Error

{
  "statusCode": 400,
  "message": "Error description",
  "error": "Bad Request"
}

---

# Token Payload

Access Token:

{
  "sub": "userId",
  "email": "user@example.com"
}

---

# Security Notes

- Passwords must be hashed (bcrypt)
- Access token expires ~15 min
- Refresh token expires ~7-30 days
- Never store passwords in plain text

---

# Future Improvements

- OAuth (Google, Apple)
- Device tracking
- Session management
- Cookie-based auth (for web)

---

## Trip

### POST /trips
Create trip

Request:
{
  "location": "string",
  "startDate": "string",
  "endDate": "string"
}

---

### GET /trips
Get user trips

Response:
[
  {
    "id": "string",
    "location": "string",
    "startDate": "string",
    "endDate": "string"
  }
]

---

## Gear

### GET /gear
Get all gear

---

### POST /gear
Create gear

Request:
{
  "name": "string",
  "weight": number,
  "category": "string",
  "isEssential": boolean
}

---

## Trip Gear

### POST /trips/:id/gear
Attach gear to trip

Request:
{
  "gearId": "string",
  "quantity": number
}

---

### GET /trips/:id/gear
Get trip gear

---

## Weight

### GET /trips/:id/weight

Response:
{
  "totalWeight": number
}

---

## Weather

### GET /trips/:id/weather

Response:
{
  "temperature": number,
  "rain": boolean,
  "wind": number
}

---

## Recommendations

### GET /trips/:id/recommendations

Response:
[
  {
    "gearId": "string",
    "reason": "string"
  }
]