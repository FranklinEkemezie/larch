Entry Management

1. Overview

Objective: Allow users to create, organise, find, view, modify and delete entries while tracking their progress.

An entry represents an individual item being tracked. Each entry has a title, a measurement unit, a total number of units and a completed number of units.

Entry management should support both standalone entries and entries associated with one or more entry groups.

---

2. Create Entry

Objective: Allow users to create an entry by providing its basic information and initial progress.

Form Fields

Field| Input Type| Behaviour
Title| Text input| Required. Accepts the entry's name or description.
Unit| Text input with suggestions| Required. Describes what is being measured, e.g. Chapters, Hours, Lessons, Exercises or Features.
Total| Numeric input| Required. Must be a positive whole number.
Completed| Numeric input| Optional. Defaults to "0". Must be between "0" and Total.
Entry Groups| Multi-select dropdown| Optional. Allows the user to associate the new entry with existing groups.

Interactions

- The Unit field should support free-form input while offering suggestions from previously used units.
- Suggestions should update as the user types. Selecting a suggestion should populate the field, but users must remain free to enter a new unit.
- The Entry Groups field should allow multiple selections.
- Selected groups should be clearly identifiable and individually removable before submission.
- If no groups exist, the user should be able to create the entry without group membership.
- Provide clear validation feedback for missing or invalid values.

Submission

When the user submits the form:

1. Validate the supplied information.
2. Create the entry.
3. Associate it with any selected entry groups.
4. Display a success notification.
5. Navigate to the newly created entry's details or otherwise provide immediate access to it.

If validation or creation fails, display appropriate error feedback while preserving the user's input.

---

3. View Entries

Objective: Allow users to browse and access all their tracked entries.

Entry Listing

Each entry should be presented using a compact card or list item containing:

- Entry title.
- Measurement unit.
- Completed/total count.
- Completion percentage.
- Visual progress bar.

The listing should provide a clear indication of progress without requiring users to open individual entries.

Interactions

- Selecting an entry opens its details.
- Provide access to entry creation.
- Provide access to search, sorting and filtering.
- Where appropriate, expose common actions through an overflow menu rather than overcrowding each entry item.

Empty State

When no entries exist, display an informative empty state with an action to create the first entry.

---

4. View Entry Details

Objective: Provide a more detailed view of an individual entry and its progress.

Information to Display

- Entry title.
- Measurement unit.
- Completed units and total units.
- Completion percentage.
- Progress bar.
- Associated entry groups, if any.
- Creation and last modification dates, where useful.

Available Actions

- Update progress.
- Edit entry details.
- Delete entry.
- Manage its entry group associations.

The details view should make progress updates particularly convenient, since this is likely to be one of the most frequently performed operations.

---

5. Edit Entry

Objective: Allow users to modify an existing entry's information.

Form Behaviour

Provide an editing form containing the same fields as the creation form:

- Title.
- Unit.
- Total.
- Completed.
- Entry Groups.

All fields should be pre-populated with their current values.

Interactions and Validation

- Users can modify any field.
- Existing group associations should be displayed as selected.
- Users can add or remove group associations.
- Changes to the total must not result in a completed value greater than the new total.
- Invalid changes should produce clear validation messages.

Submission

On successful submission:

1. Save the changes.
2. Synchronise the entry's updated information and group associations.
3. Display a success notification.
4. Return to the entry details view or otherwise reflect the saved changes.

If submission fails, retain the user's input and display the relevant errors.

---

6. Update Entry Progress

Objective: Allow users to record completed units quickly without having to edit the entry's general information.

This should be one of the most accessible interactions in the application.

UI Components

Provide:

- A decrement button.
- A prominently displayed completed value.
- An increment button.
- A progress bar and percentage.
- An option to enter an exact completed value directly.

Interactions

Increment:

- Increase the completed value by one.
- Prevent the value from exceeding the total.

Decrement:

- Decrease the completed value by one.
- Prevent the value from becoming negative.

Set Exact Progress:

- Allow the user to enter a specific completed value.
- Accept only whole numbers within the valid range.
- Provide an explicit confirmation action to apply the value.

Feedback

- Update the displayed count, percentage and progress bar immediately after a successful update.
- Provide appropriate feedback when a boundary is reached.
- Avoid unnecessary confirmation dialogs for ordinary increment and decrement operations.
- Ensure updated progress is reflected everywhere the entry appears, including associated entry groups and the home page.

Completion State

When completed equals total, the entry should visibly indicate that it is complete.

If the total is subsequently increased, the entry should return to an in-progress state.

---

7. Delete Entry

Objective: Permanently remove an entry from the application.

Interaction

- Provide a delete action through the entry details or an appropriate action menu.
- Require confirmation before deletion.
- The confirmation should clearly identify the entry being deleted and communicate that the action is permanent.

Behaviour

On confirmation:

1. Delete the entry.
2. Remove its associations with all entry groups.
3. Update affected listings and progress summaries.
4. Display a success notification.
5. Navigate to an appropriate previous view or listing.

Cancelling the confirmation must leave the entry unchanged.

---

8. Search Entries

Objective: Allow users to find entries quickly, especially as the number of tracked items increases.

UI Components

Provide a search input with:

- A search icon.
- A clear action.
- A suitable placeholder.
- A results area.

Behaviour

- Search entries by title.
- Update results as the user types, preferably with a short debounce.
- Search should be case-insensitive.
- Matching entries should retain the normal entry-list presentation, including their progress indicators.
- Clearing the search should restore the unfiltered listing.
- Selecting a result should open its details.

Search States

- Display matching entries when results are available.
- Display a clear no-results message when nothing matches.
- Display the normal empty state when there are no entries to search.

---

9. Sort and Filter Entries

Objective: Help users organise and narrow down their entry listings.

Sorting

Provide sorting options such as:

- Newest first.
- Oldest first.
- Title: A–Z.
- Title: Z–A.
- Progress: Lowest first.
- Progress: Highest first.

Filtering

Provide filters based on progress status:

- All entries.
- Not started.
- In progress.
- Completed.

Behaviour

- Sorting and filtering should work together.
- The selected options should be clearly indicated.
- Users should be able to reset filters and return to the default listing.
- Filtering and sorting should not modify the underlying entry data.
- The default listing should display newest entries first.

---

10. General Behaviour and Consistency

- Progress is always calculated from the completed and total values.
- Entry changes must be reflected consistently across the home page, entry listings and associated entry groups.
- All forms should provide appropriate validation feedback.
- Destructive actions must require confirmation.
- Successful operations should provide concise toast notifications.
- Loading states should be displayed when operations take noticeable time.
- Empty states should guide users towards the next useful action.
- The interface should prevent accidental duplicate submissions where appropriate.