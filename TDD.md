Project Tracker

Technical Design Document (TDD)

Status: Draft
Platform: Android
Application Type: Native Android application with embedded WebView
Architecture: Laravel MVC with Inertia.js
Database: SQLite
Development Environment: Windows 11

---

1. Technology Stack

The application will use the following technologies and their latest stable, mutually compatible releases at implementation time.

Component| Technology| Version
Language (Backend)| PHP| 8.5.x
Backend Framework| Laravel| 13.x
Native Runtime| NativePHP Mobile| 4.x
Frontend Integration| Inertia.js| 3.x
Frontend Framework| React| 19.3.x
Frontend Language| TypeScript| 6.x
CSS Framework| Tailwind CSS| 4.3.x
UI Components| shadcn/ui| Latest stable
Build Tool| Vite| 8.x
Package Manager| pnpm| 12.x
Database| SQLite| Latest compatible
Testing Framework| Pest| 5.x
Icons| Lucide React| Latest stable
Typography| Inter Variable| Latest stable

Additional Tools

- Node.js: Current LTS release compatible with Vite and NativePHP.
- Composer: Latest stable Composer 2.x.
- Android SDK, ADB and JDK: Versions required by NativePHP Mobile.

All dependencies must remain compatible with the selected NativePHP and Laravel versions.

2. Application Architecture

2.1 Architectural Approach

The application will follow Laravel's conventional MVC architecture, using Inertia.js to connect the Laravel backend with the React frontend.

There will be no separate REST API or additional architectural layers.

Backend Organisation

Use conventional Laravel structures and responsibilities:

Component| Responsibility
Models| Eloquent models, relationships and model behaviour
Controllers| Handle requests and coordinate application operations
Form Requests| Request validation and authorisation where applicable
Actions| Encapsulate discrete application operations where useful
Services| Handle reusable or more complex business logic
Resources| Transform data where an explicit resource representation is needed
Migrations| Database schema and schema changes
Seeders| Development and test data

Follow Laravel naming conventions, dependency injection and established framework practices.

Avoid unnecessary abstractions such as repository layers or elaborate domain architectures.

2.2 Domain Models

The application has two primary models:

- "Entry"
- "EntryGroup"

They have a many-to-many relationship.

An entry can belong to multiple groups, and a group can contain multiple entries.

3. Database Design

SQLite will be used for persistent local application data.

The initial schema consists of two entity tables and one pivot table.

3.1 Entries

Table: "entries"

Column| Type| Constraints
id| BIGINT| Primary key, auto-increment
uuid| UUID| NOT NULL, UNIQUE
title| VARCHAR(255)| NOT NULL
unit| VARCHAR(100)| NOT NULL
completed| INTEGER| NOT NULL, DEFAULT 0
total| INTEGER| NOT NULL
created_at| TIMESTAMP| NOT NULL
updated_at| TIMESTAMP| NOT NULL

Constraints

- "uuid" must be unique and generated when an entry is created.
- "total" must be greater than zero.
- "completed" must be greater than or equal to zero.
- "completed" must not exceed "total".

3.2 Entry Groups

Table: "entry_groups"

Column| Type| Constraints
id| BIGINT| Primary key, auto-increment
uuid| UUID| NOT NULL, UNIQUE
name| VARCHAR(255)| NOT NULL
created_at| TIMESTAMP| NOT NULL
updated_at| TIMESTAMP| NOT NULL

Constraints

- "uuid" must be unique and generated when a group is created.
- Group names do not need to be globally unique.

3.3 Entry-Group Pivot

Table: "entry_entry_group"

Column| Type| Constraints
entry_id| BIGINT| Foreign key → entries.id
entry_group_id| BIGINT| Foreign key → entry_groups.id

Constraints

- Composite primary key: "(entry_id, entry_group_id)".
- Both foreign keys cascade on deletion.
- An entry-group association must not be duplicated.
- An index should support querying memberships in the reverse relationship direction.

The pivot table does not require UUIDs or timestamps.

3.4 Identifiers

Entity tables will use both numeric IDs and UUIDs.

- Numeric IDs serve as internal primary keys and relationship references.
- UUIDs provide externally exposed identifiers for application routes and frontend references.

UUIDs must be unique and generated server-side.

3.5 Eloquent Relationships

Entry:

- "belongsToMany(EntryGroup::class)"

EntryGroup:

- "belongsToMany(Entry::class)"

The pivot relationship will use Laravel's conventional Eloquent many-to-many functionality.

3.6 Additional Database Decisions

- No soft deletes.
- No progress-history table.
- No stored progress percentage; calculate it from "completed" and "total".
- No manual sort-order columns.
- No unique constraints on entry titles or group names.
- Timestamps are required and non-nullable.

Entries and groups will use creation-date ordering by default. Alternative sorting will be handled through database queries rather than persisted ordering fields.

4. Backend and Request Handling

Laravel will handle application logic and database operations.

- Web routes will be defined using Laravel's routing system.
- Controllers will handle incoming requests.
- Form Requests will handle appropriate validation.
- Actions and services will be introduced where they improve separation and reuse.
- Eloquent will handle database operations and relationships.
- Inertia responses will deliver page data to React.

Progress calculations and validation rules must be handled consistently on the backend.

5. Frontend Architecture

The frontend will use React, TypeScript and Inertia.js.

Conventions

- Inertia pages will represent application screens.
- Shared layouts and reusable components will be maintained separately.
- shadcn/ui components will be customised using Tailwind CSS.
- Lucide React will provide application icons.
- Inter Variable will be bundled locally.
- TypeScript will be used throughout the frontend.

State Management

No external state-management library will be introduced.

Use:

- Inertia page props for server-provided data.
- React state for local component interactions.
- Inertia form and navigation utilities for server communication.

Detailed screen specifications, navigation and user flows will be maintained in a separate document.

6. Local Database and Persistence

The application must operate entirely offline, with all user data stored locally.

Database

SQLite will be accessed through Laravel's database layer and Eloquent ORM.

Development

During conventional Laravel development, the default SQLite database location will be:

"database/database.sqlite"

Packaged Android Application

The packaged application must use NativePHP's supported persistent application storage for its writable SQLite database.

The implementation must ensure:

- The database is created and initialised correctly.
- Laravel migrations run as required.
- Data survives application restarts.
- Data survives normal application updates.
- Database files are not stored in temporary or replaceable application build directories.

The exact database path and NativePHP integration must follow the Mobile v4 documentation.

7. Testing Strategy

Testing Framework: Pest 5

Testing will prioritise backend correctness, business logic and application integration.

7.1 Unit Tests

Test isolated application logic, including:

- Progress calculations.
- Progress validation and boundary conditions.
- Other independently testable business rules.

7.2 Feature Tests

Feature tests will cover complete application workflows and integration between Laravel components.

Coverage should include:

- Entry creation, retrieval, editing and deletion.
- Progress updates.
- Entry-group creation, editing and deletion.
- Adding and removing entries from groups.
- Eloquent relationships and database integrity.
- Validation rules and error responses.
- Inertia responses and returned page properties.
- Redirects, flash messages and response behaviour.
- Data persistence and deletion behaviour.

Tests should cover successful operations, invalid input and relevant edge cases.

7.3 Frontend and End-to-End Tests

Frontend implementation and browser-based verification will primarily be handled by an AI coding agent.

Its testing responsibilities include:

- Component interactions.
- Frontend validation and feedback.
- Important user workflows.
- Backend/frontend integration.
- Responsive behaviour.
- End-to-end verification.

Browser testing will supplement, not replace, backend tests.

7.4 Android Device Testing

The application must also be tested on a physical Android device to verify native packaging, local persistence and actual device behaviour.

8. Development Environment and Device Testing

Development will take place on Windows 11.

Primary Testing Method: USB Debugging

A physical Android device will be connected through USB.

Requirements:

- Android Developer Options enabled.
- USB debugging enabled.
- ADB available.
- Device authorised for debugging.

NativePHP's development workflow will be used to build, install and run the application directly on the device.

This avoids requiring the PC to connect to a mobile hotspot or consume mobile data.

Alternative Testing Methods

- Android Emulator: Available for supplementary testing, but not the primary development target.
- Local Network: Can be used when necessary, but is not required for the normal development workflow.

9. Android Build and Distribution

NativePHP Mobile will handle Android application packaging and build orchestration.

The objective is to produce an installable APK without manually managing the underlying Gradle build process.

Requirements

- Android application package identifier.
- Application name.
- Application icon.
- Application version and build number.
- Appropriate APK signing configuration.

Distribution

The application will be distributed privately as an APK.

No Google Play Store publication or app-store-specific release workflow is required.

Both development installation and final APK installation must be tested on a physical device.

---

10. Implementation Principles

The following principles will guide implementation:

1. Prefer Laravel conventions and built-in functionality.
2. Keep the architecture straightforward.
3. Avoid unnecessary dependencies and abstractions.
4. Keep business logic and validation on the backend.
5. Maintain database integrity through application and database-level constraints.
6. Use UUIDs for externally exposed entity identifiers.
7. Keep the application fully functional offline.
8. Prioritise backend test coverage and verify frontend integration.
9. Use NativePHP-supported mechanisms for Android storage, execution and packaging.
10. Do not introduce features or infrastructure outside the agreed MVP scope without a clear requirement.