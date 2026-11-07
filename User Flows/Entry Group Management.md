
Entry Group Management

1. Overview

Objective: Allow users to organise related entries into named groups, making it easier to manage and monitor multiple entries belonging to a common activity, subject or plan.

An entry group is simply a logical grouping of existing entries. It does not own or duplicate entry data. Changes to an entry's information or progress must be reflected wherever that entry appears.

---

2. Create Entry Group

Objective: Allow users to create a named group for organising related entries.

Form Fields

Field| Input Type| Behaviour
Name| Text input| Required. Accepts the name of the group.
Entries| Multi-select dropdown| Optional. Allows users to select existing entries to include in the group.

Interactions

- The Entries field should support searching existing entries by title.
- Users should be able to select multiple entries.
- Selected entries should be clearly displayed and individually removable.
- If no entries exist, users should still be able to create an empty group.
- The group name must not be empty.

Submission

On successful submission:

1. Create the entry group.
2. Associate the selected entries with it.
3. Display a success notification.
4. Navigate to the newly created group's details.

If submission fails, preserve the form input and display appropriate validation feedback.

---

3. View Entry Groups

Objective: Allow users to browse and access all their entry groups.

Group Listing

Each group should be presented using a card or list item containing:

- Group name.
- Number of entries.
- A brief progress summary, where useful.

Interactions

- Selecting a group opens its details.
- Provide an action to create a new group.
- Provide access to group search.
- Expose editing and deletion through an appropriate action menu.

Empty State

When no groups exist, display an informative empty state explaining their purpose and providing an action to create the first group.

---

4. View Entry Group Details

Objective: Allow users to inspect a group's contents and access its management and analytics features.

Information to Display

- Group name.
- Number of associated entries.
- List of associated entries.
- Each entry's title, unit, completed/total count, percentage and progress indicator.
- A progress comparison chart, covered in detail under Progress and Analytics.

Interactions

- Selecting an entry opens its details.
- Users can add existing entries to the group.
- Users can remove entries from the group.
- Users can rename or delete the group.
- Provide convenient access to the group's analytics.

Empty State

If a group contains no entries, display an appropriate empty state with an action to add existing entries.

---

5. Edit Entry Group

Objective: Allow users to rename an existing group.

Form Behaviour

- Provide a text input pre-populated with the current group name.
- The name is required and must not be empty.
- Preserve the group's existing entry associations.

Submission

On successful submission:

1. Save the updated name.
2. Reflect the change throughout the application.
3. Display a success notification.
4. Return to the group details or reflect the updated name immediately.

The operation must not affect the group's entries or their progress.

---

6. Manage Group Membership

Objective: Allow users to add existing entries to a group or remove entries that no longer belong to it.

Add Entries

Provide an interface for selecting existing entries.

UI components:

- Searchable multi-select input or selection dialog.
- List of available entries.
- Clear indication of already-associated entries.
- Confirmation or apply action.

Behaviour:

- Search entries by title.
- Allow multiple selections.
- Exclude or disable entries already belonging to the group to prevent duplicate associations.
- Apply the selected associations.
- Reflect the updated membership immediately.

Remove Entries

Provide a remove action for each associated entry, accessible through an appropriate action menu or control.

Behaviour:

- Removing an entry only deletes its association with the current group.
- The entry itself must remain intact.
- The entry must remain accessible through the main entry listing and any other groups it belongs to.
- Update the group's entry count and analytics immediately.

A confirmation dialog is optional for this operation because it does not delete the underlying entry. The interface must nevertheless make the distinction clear.

General Behaviour

- Adding an entry that already belongs to the group must not create a duplicate.
- An entry can belong to multiple groups.
- Changes to entry information and progress must be reflected in every group containing that entry.

---

7. Delete Entry Group

Objective: Permanently remove an entry group.

Interaction

- Provide a delete action through the group details or an appropriate action menu.
- Require confirmation before deletion.
- Clearly communicate that the group will be deleted but its entries will be retained.

Behaviour

On confirmation:

1. Delete the group.
2. Remove all its entry associations.
3. Preserve every associated entry and its progress.
4. Update application summaries and group listings.
5. Display a success notification.
6. Navigate to an appropriate previous view or group listing.

Cancelling the confirmation must leave the group unchanged.

---

8. Search Entry Groups

Objective: Help users locate groups quickly.

UI Components

Provide a search input with:

- Search icon.
- Clear action.
- Suitable placeholder.
- Results area.

Behaviour

- Search groups by name.
- Update results as the user types, preferably with a short debounce.
- Search should be case-insensitive.
- Display matching groups using the normal group-list presentation.
- Selecting a result opens its details.
- Clearing the search restores the unfiltered listing.

Search States

- Display matching groups when available.
- Display a no-results message when nothing matches.
- Display the normal empty state when no groups exist.

---

9. General Behaviour and Consistency

- Entry groups must not duplicate or independently maintain entry information.
- Entry progress belongs to the entry, not the group.
- Group membership changes must not modify entry progress.
- Deleting a group must never delete its entries.
- Removing an entry from a group must never delete the entry.
- All changes must be reflected consistently across the application.
- Forms must provide appropriate validation and feedback.
- Successful operations should display concise toast notifications.
- Loading states should be displayed when operations take noticeable time.
- Empty states should guide users towards the next useful action.