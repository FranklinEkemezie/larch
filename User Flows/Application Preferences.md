Application Preferences

1. Overview

The Application Preferences section allows users to customise basic aspects of the app's appearance and manage simple application-level settings.

It should remain minimal and straightforward.

2. Access Application Preferences

Objective: Provide a central place for accessing and changing application settings.

- A Settings item should be available in the primary navigation.
- Selecting it opens the Application Preferences screen.
- The screen should display available settings in clearly labelled sections.

3. Theme Selection

Objective: Allow users to choose their preferred application appearance.

Provide a theme selector with three options:

- Light: Always use the light theme.
- Dark: Always use the dark theme.
- System Default: Follow the device's current appearance setting.

Interaction:

- Selecting an option immediately applies the corresponding theme.
- The selected option should be visibly indicated.
- The preference must be saved locally and restored when the application is reopened.
- When System Default is selected, the application should respond to changes in the device's appearance setting.

All application screens and components should consistently support the selected theme.

4. General Behaviour

- Preferences should persist across application restarts and normal app updates.
- Changing preferences should not affect entries, groups or recorded progress.
- Settings should provide immediate feedback where appropriate.
- The screen should clearly communicate the currently selected options.

5. MVP Scope

The following are outside the initial implementation scope:

- User accounts and synchronisation settings.
- Cloud backup and restore.
- Data import and export.
- Notifications and reminders.
- Biometric authentication or application locking.
- Advanced customisation of colours, typography or interface layout.