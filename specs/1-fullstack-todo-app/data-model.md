# Data Model: Full-Stack Todo Application

**Prerequisite**: `spec.md`

This document defines the data entities for the application.

## User Entity

Represents an authenticated user in the system.

- **`id`**: `integer` (Primary Key)
- **`email`**: `string` (Unique, Indexed)
- **`hashed_password`**: `string`
- **`created_at`**: `datetime`
- **`updated_at`**: `datetime`

**Relationships**:
- A `User` has many `Task`s.

## Task Entity

Represents a single todo item.

- **`id`**: `integer` (Primary Key)
- **`user_id`**: `integer` (Foreign Key to `User.id`, Indexed)
- **`title`**: `string` (Not Nullable)
- **`description`**: `string` (Nullable)
- **`is_completed`**: `boolean` (Default: `false`)
- **`priority`**: `string` (Enum: 'low', 'medium', 'high', Nullable)
- **`tags`**: `array[string]` (Nullable)
- **`due_date`**: `datetime` (Nullable)
- **`repeat_interval`**: `string` (Enum: 'daily', 'weekly', 'monthly', Nullable)
- **`created_at`**: `datetime`
- **`updated_at`**: `datetime`

**Relationships**:
- A `Task` belongs to one `User`.

## Validation Rules

- **User**:
    - `email` must be a valid email format.
    - `password` must meet complexity requirements (handled by Better Auth).
- **Task**:
    - `title` cannot be empty.
    - `priority` must be one of the allowed enum values.
    - `repeat_interval` must be one of the allowed enum values.
