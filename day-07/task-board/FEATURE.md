# FEATURE.md

**Where does the sort value live?** In `App` as state, because the select
(in FilterBar) writes it and the list computation in `App` reads it; the sorted
list itself is derived and never stored.

**Where does "which row is being edited" live?** In `App` as `editingId`
(number | null), because a single value above all the rows guarantees only one
row can be in edit mode at a time, while each row's typed draft stays local to
its editor since only that row cares about it.

**Blur behaviour.** Clicking outside the input cancels the edit, same as Escape.