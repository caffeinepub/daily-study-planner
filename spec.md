# Daily Study Planner

## Current State
A daily study planner with morning/afternoon/evening sessions, task checkboxes, progress ring, goals section, reminders panel, and summary card. State saved to localStorage per day.

## Requested Changes (Diff)

### Add
- Notes section with 3 per-session text areas (Morning, Afternoon, Evening) so the user can jot down key things learned during each session.
- Notes are persisted in localStorage alongside tasks/goals.

### Modify
- localStorage save/load to include notes state.

### Remove
- Nothing.

## Implementation Plan
1. Add `notes` state: `Record<'morning'|'afternoon'|'evening', string>`
2. Persist notes in localStorage with tasks and goals.
3. Add a "📝 Session Notes" section below the schedule grid with three textarea cards (one per session), styled to match each session's color theme.
