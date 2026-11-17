Larch

Product Requirements Document (PRD)

Status: Draft
Product Type: Personal productivity / progress-tracking application
Platform: Android (NativePHP Mobile)
Data Storage: Local device storage

---

1. Product Overview

Larch is a lightweight, personal progress-tracking application for monitoring progress across books, courses, learning materials, projects, and other activities that can be measured in units.

The application allows users to organise tracked items into Groups, record their progress, and visualise completion through simple analytics.

It is intended to replace a manually maintained Excel tracker with a more convenient, interactive and mobile-friendly experience.

The application is not initially intended to be a reading platform or content management system. Its primary responsibility is tracking progress, not providing or hosting the content being tracked.

2. Problem Statement

Tracking progress across multiple books, courses, projects and study activities can become cumbersome when managed manually.

A spreadsheet provides basic tracking capabilities but requires users to update values manually, offers limited interaction on mobile devices, and makes organising and comparing related activities less convenient.

Larch addresses this by providing a dedicated interface for managing entries, updating progress and monitoring completion across Groups.

3. Product Goals

The application should:

1. Make creating and managing tracked items straightforward.
2. Allow users to update progress quickly and accurately.
3. Provide flexible organisation through Groups.
4. Make progress easy to understand through visual indicators and simple analytics.
5. Preserve user data locally without requiring an internet connection or remote account.
6. Provide a clean, intuitive and responsive mobile experience.

7. Terminology and Core Concepts

The application uses three primary concepts:

4.1 Entry

An Entry represents an individual item whose progress is being tracked.

Examples:

- A book
- A YouTube tutorial or course
- A university course
- A software project
- A set of exercises

An entry has the following attributes:

Attribute| Description
Title| Name of the item
Unit| What is being measured, e.g. Chapters, Hours, Exercises, Features
Completed| Number of units completed
Total| Total number of units
Progress| Completion percentage, calculated from completed and total

Progress is calculated as:

"Progress = (Completed / Total) × 100"

The completed value must not be negative or exceed the total. The total must be greater than zero.

4.2 Unit

A Unit describes the measurement used to track an entry's progress.

It is a user-defined, free-form label rather than a fixed selection.

Examples include Chapters, Pages, Hours, Lessons, Exercises and Features.

4.3 Group

A Group is a named grouping of entries.

Examples:

- Final Year — First Semester
- C++ Learning Path
- November Study Plan

An entry may belong to multiple Groups or none at all.

Progress is maintained at the entry level, not independently within each Group. Consequently, updating an entry updates its progress wherever it appears.

Deleting a Group must not delete its entries. Deleting an entry removes it from all Groups.

5. Functional Requirements

5.1 Entry Management

Users must be able to:

- Create an entry by providing its title, unit and total.
- Set an initial completed value, defaulting to zero.
- View a list of all entries.
- View an individual entry and its progress details.
- Edit an entry's details.
- Delete an entry.
- Update progress by incrementing or decrementing the completed value.
- Set the completed value directly.

The application must validate progress updates and prevent values outside the permitted range.

Each entry should display:

- Title
- Unit and progress count ("completed / total")
- Completion percentage
- Visual progress indicator

5.2 Group Management

Users must be able to:

- Create Groups with a name.
- View all Groups.
- Rename Groups.
- Delete Groups.
- Add existing entries to a Group.
- Remove entries from a Group.
- View the entries belonging to a Group.

An entry can appear in multiple Groups without creating separate copies of its progress data.

5.3 Progress Tracking

Progress must be easy to update and understand.

The application should:

- Provide convenient increment and decrement controls.
- Allow direct entry of a completed value.
- Display progress as both a numerical count and percentage.
- Display a visual progress bar.
- Reflect changes immediately throughout the application.

Progress percentages must be calculated from the entry's completed and total values.

5.4 Analytics

The application should provide simple visual summaries of progress.

For the MVP, Group analytics should include:

- A horizontal bar chart comparing the completion percentages of entries in a Group.
- Clear identification of each entry.
- Percentage labels and, where practical, completed/total counts.

Percentages should be used for comparisons because entries may have different totals and measurement units.

The MVP does not require an aggregate Group completion score.

5.5 Home Screen and Navigation

The application must provide a home screen serving as the main entry point.

It should provide convenient access to:

- An overview of tracked entries.
- Groups.
- Relevant progress summaries.
- Common actions such as creating an entry or Group.

Navigation should be straightforward and consistent across the application.

5.6 Appearance and Preferences

The application must support:

- Light mode.
- Dark mode.
- A consistent visual system across screens.

The selected appearance should be retained between application sessions.

6. User Flows

The application should support the following primary workflows:

1. Create an entry: Open the entry creation interface, provide the required details and save.
2. Manage an entry: Open an existing entry to view its details, edit its information or delete it.
3. Update progress: Open an entry and increment, decrement or directly set its completed value.
4. Create a Group: Create a named Group.
5. Organise entries: Open a Group and add existing entries or remove entries from it.
6. Review progress: Open a Group to view its entries and compare their completion percentages.
7. Navigate the application: Move between the home screen, entries, Groups and settings.

8. User Interface and Visual Direction

The application should have a clean, modern and minimal interface.

The design should prioritise:

- Readability and visual hierarchy.
- Clear presentation of progress information.
- Comfortable spacing and touch targets.
- Consistent components and interaction patterns.
- Efficient navigation without unnecessary visual clutter.

Visual Identity

Element| Selection
Colour direction| Forest / Sage
Typography| Inter Variable
Icon library| Lucide
Appearance| Light and dark themes

The Forest / Sage palette should provide the primary visual identity, supported by neutral backgrounds, restrained accents and clear contrast.

8. Non-Functional Requirements

8.1 Offline Operation

The application must operate entirely offline. Core functionality must not depend on an internet connection.

8.2 Local Data Persistence

All application data must be stored locally on the device.

Data must remain available across application restarts and must not be lost during normal application updates.

8.3 Performance

- Common interactions should feel immediate.
- Progress updates should not require unnecessary page reloads.
- The application should remain responsive as the number of entries and Groups increases.

8.4 Usability

- The interface must be designed primarily for Android mobile devices.
- Common operations should require minimal interaction.
- Forms and controls should provide clear feedback and validation.
- Empty states should guide users towards creating their first entry or Group.

8.5 Data Integrity

- Progress values must always satisfy the defined constraints.
- Group membership must remain consistent when entries or Groups are deleted.
- An entry's progress must remain consistent wherever that entry is displayed.

9. MVP Scope

The initial release should include:

- Entry creation, viewing, editing and deletion.
- Progress tracking and updates.
- Group creation, editing and deletion.
- Adding and removing entries from Groups.
- Progress indicators and simple Group analytics.
- Home screen and application navigation.
- Light and dark themes.
- Offline operation and persistent local storage.

Out of Scope

The following are not required for the MVP:

- User accounts and authentication.
- Cloud storage or synchronisation.
- Multi-user collaboration.
- Reading books or viewing course content inside the application.
- Progress history and activity logs.
- Reminders and notifications.
- Gamification, achievements and streaks.
- Notes and attachments.
- Advanced analytics and reporting.
- Importing existing Excel spreadsheets.
- Exporting data to external formats.

These may be considered for future versions based on actual usage and requirements.

10. Acceptance Criteria

The MVP will be considered functionally complete when the following conditions are met:

1. Users can create, view, edit and delete entries.
2. Users can update entry progress through incremental controls and direct value entry.
3. Progress validation prevents invalid completed and total values.
4. Users can create, rename and delete Groups.
5. Users can add existing entries to Groups and remove them.
6. Entries can belong to multiple Groups without duplicating their progress data.
7. Entry progress is reflected consistently across the application.
8. Users can view progress counts, percentages and visual progress indicators.
9. Group analytics can compare the completion percentages of its entries.
10. The home screen provides access to the application's primary features.
11. Light and dark appearance modes work correctly and persist across sessions.
12. Application data persists across restarts and normal application updates.
13. Core functionality works without an internet connection.

The acceptance criteria represent the primary capabilities of the existing Excel-based tracker, improved with Group management, visual analytics and a dedicated mobile interface.

---

11. Future Considerations

The application should remain open to future enhancements without making them prerequisites for the MVP.

Potential additions include:

- Reading and viewing supported content within the application.
- Progress history and activity tracking.
- Data import and export, including Excel/CSV support.
- Reminders and scheduled progress notifications.
- More advanced analytics.
- Biometric authentication for local application access.
- Additional resource types and specialised tracking capabilities.

These features should be evaluated separately and introduced only when they provide meaningful value.