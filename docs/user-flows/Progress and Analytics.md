Progress and Analytics

1. Overview

The Progress and Analytics section provides a clear visual representation of progress across individual entries and entry groups.

Progress is based on the "completed" and "total" values recorded for each entry. Percentages are calculated automatically and are never manually entered.

2. View Entry Progress

Objective: Make the completion state of an entry easy to understand at a glance.

Each entry should display:

- Completed count and total (e.g. "12 / 20 Chapters").
- Completion percentage.
- A progress bar.
- A completion status:
  - Not Started: 0 completed.
  - In Progress: completed is greater than 0 but less than total.
  - Completed: completed equals total.

Progress indicators should update whenever the entry's progress or total changes. The same progress information should remain consistent wherever the entry appears in the application.

3. View Group Progress Comparison

Objective: Compare the progress of entries belonging to an entry group.

The group details view should provide a horizontal bar chart comparing the completion percentages of its associated entries.

The chart should:

- Display each entry's title alongside its progress bar.
- Represent progress as a percentage from 0% to 100%.
- Show the percentage value clearly.
- Optionally display the completed count and total alongside the percentage.
- Allow entries with different units and totals to be compared meaningfully through percentages.

Selecting an entry in the chart should open its details view.

The chart should reflect changes to entry progress and group membership automatically.

Important: Do not calculate or display a single aggregate completion percentage for the group. Entries may have different units and totals, so such a figure could be misleading.

4. Analytics States

The application should handle different group and progress states clearly:

- Empty group: Display an empty state explaining that entries must be added before a comparison can be shown.
- Single entry: Display its progress normally; a comparison with other entries is not possible yet.
- Multiple entries: Display the comparison chart.
- All completed: Show that every entry in the group is complete.
- Mixed progress: Display each entry's individual progress without implying that one entry's progress determines another's.

Charts must remain understandable without relying on colour alone. Entry titles and percentage labels should provide sufficient context.

5. General Behaviour

- Calculate percentages from the current completed and total values.
- Prevent invalid progress values through the entry validation rules.
- Keep progress indicators consistent across the home page, entry listings, entry details and group details.
- Update charts when entries are added to or removed from groups, or when their progress changes.
- Do not introduce progress history or time-based analytics in the MVP.