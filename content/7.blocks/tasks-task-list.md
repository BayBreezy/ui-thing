---
title: Tasks - Task List
description: "Task list blocks: tasks grouped by project, a simple checklist with filters and inline editing, a sortable task table, due date sections, a backlog you can reorder and tasks with expandable subtasks."
---

These blocks cover the many ways of showing a to do list. Each one keeps a local copy of its typed prop (`initial`) in a ref, so ticking, adding, editing and deleting tasks never changes the data you passed in. Persist changes with your own API calls.

Names and tasks are fictional. The due date section block takes a `today` prop, so the demo stays stable and you can pass the real date in your app. Rows use real checkboxes with labels, and the reorderable backlog has arrow buttons as a keyboard alternative to dragging.

## Style One

Tasks grouped by project. Collapsible groups with a progress bar and count, priority dots, due dates that turn red when overdue and an add field in every group.

:BlockShowcase{blockPath="Tasks/TaskList/BlockTaskList1" component="BlockTaskList1" iframeHeight="720px"}

## Style Two

Simple checklist with an add field, filter tabs for all, active and completed, inline editing with enter or a double click, delete buttons and a clear completed action.

:BlockShowcase{blockPath="Tasks/TaskList/BlockTaskList2" component="BlockTaskList2" iframeHeight="620px"}

## Style Three

Task table with sortable columns and `aria-sort`, a status select in every row, assignee avatars, priority badges and due dates.

:BlockShowcase{blockPath="Tasks/TaskList/BlockTaskList3" component="BlockTaskList3" iframeHeight="640px"}

## Style Four

Inbox with sections for overdue, today, this week and later, worked out from the dates. Quick complete checkboxes, a snooze menu and a message when everything is done.

:BlockShowcase{blockPath="Tasks/TaskList/BlockTaskList4" component="BlockTaskList4" iframeHeight="720px"}

## Style Five

Backlog you can reorder. Drag the handle or use the arrow buttons to change the priority, with rank numbers and a running total of points.

:BlockShowcase{blockPath="Tasks/TaskList/BlockTaskList5" component="BlockTaskList5" iframeHeight="560px"}

## Style Six

Tasks with subtasks. A progress bar for each parent, expandable subtask lists, a parent that completes when every subtask is done and an add subtask field.

:BlockShowcase{blockPath="Tasks/TaskList/BlockTaskList6" component="BlockTaskList6" iframeHeight="620px"}
