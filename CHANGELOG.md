# Changelog

All notable changes to this project will be documented in this file.

## 2025-08-12

### Added

- **User Profile Endpoint**: Implemented `GET /api/users/:username` to fetch public user profiles. This includes a new router (`users.routes.ts`) and API controller (`users.ts`).
- **Authentication Middleware**: Created a JWT authentication middleware (`src/middleware/auth.middleware.ts`) to protect routes. It verifies the `Bearer` token and attaches the user payload to the request object. Also added corresponding Express Request type definitions.
- **Performance History Endpoint**: Implemented `GET /api/performances/:username` to fetch a user's performance history. The endpoint is protected by the authentication middleware.

### Changed

- **User Model**: Updated the `User` interface in `src/models/user.model.ts` to include `username` and `name` fields, aligning it with the frontend `UserProfileData` model.
- **Authentication Logic**:
    - Rewrote the `register` function in `src/api/auth.ts` to handle `username` and `name` fields. It now checks for uniqueness of both `email` and `username`.
    - Updated the `login` function to include the `username` in the JWT payload, as required by the frontend for subsequent API calls.
    - Standardized authentication responses to match the frontend's `ServiceResponseData` model.
- **Performance Data Handling**:
    - Updated the `ExercisePerformance` model to include a `username` field, linking the data to a user.
    - Modified the `createPerformance` API to pull the `username` from the authenticated user's token payload and save it with the performance data.
    - Secured the `POST /api/performances` endpoint by applying the authentication middleware, requiring a valid user token for data submission.

## 2025-08-11

### Added

- **Dependencies for Authentication**: Installed `bcrypt` for password hashing and `jsonwebtoken` for generating JWTs (JSON Web Tokens). Also added TypeScript types (`@types/bcrypt`, `@types/jsonwebtoken`). This is a crucial security step for implementing user login and registration.
- **Security Configuration**: Added `JWT_SECRET` to the `.env` file to ensure secure signing of user session tokens.
- **User Model**: Created a `User` interface at `src/models/user.model.ts` to define the data structure for users in the database.
- **Authentication API**: Implemented the core logic for user registration and login in `src/api/auth.ts`. This includes password hashing, user creation, credential validation, and JWT generation.
- **Authentication Routes**: Created a dedicated router at `src/routes/auth.routes.ts` for handling `/register` and `/login` endpoints.

### Changed

- **Project Structure**: Created new directories (`src/api`, `src/middleware`, `src/models`, `src/routes`) to refactor the application from a single file into a modular structure. This improves maintainability and scalability.
- **Database Logic**: Extracted MongoDB connection logic from `index.ts` into a new, reusable module at `src/config/db.ts`. This centralizes database configuration.
- **Performances Route**: Refactored the performances endpoint. Logic is now split into a model (`src/models/performance.model.ts`), a controller (`src/api/performances.ts`), and a router (`src/routes/performances.routes.ts`).
- **Main Entrypoint**: Simplified `index.ts` to only be responsible for bootstrapping the application: connecting to the database, setting up middleware, and mounting the API routers. The new authentication router has also been integrated.