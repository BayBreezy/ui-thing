---
title: Tasks - Task Detail
description: "Task detail blocks: a side sheet, a full page with click to edit, comments and activity tabs, subtasks with attachments, a properties sidebar with popover pickers and a quick add dialog."
---

These blocks are what you see after opening a task. They work with local copies of typed props (`initial`), so edits never change the data you passed in, and each one simulates saving so you can replace it with your own API call.

The sheet and dialog follow the focus trap and escape key behavior of the underlying components. Fields have visible labels or accessible names, and the quick add dialog shows its validation message with `role="alert"`. Names, tasks and files are fictional.

## Style One

Detail sheet. A list of tasks opens a sheet from the right with editable title, description, status, assignee, due date and labels.

:BlockShowcase{blockPath="Tasks/TaskDetail/BlockTaskDetail1" component="BlockTaskDetail1" iframeHeight="560px"}

## Style Two

Full page. Breadcrumbs, a click to edit title, a description, subtasks with progress and a properties card with a mark complete button.

:BlockShowcase{blockPath="Tasks/TaskDetail/BlockTaskDetail2" component="BlockTaskDetail2" iframeHeight="820px"}

## Style Three

Comments and activity in tabs. Post a comment, see the history of changes as a timeline and see counts on both tabs.

:BlockShowcase{blockPath="Tasks/TaskDetail/BlockTaskDetail3" component="BlockTaskDetail3" iframeHeight="780px"}

## Style Four

Subtasks and attachments. Add and remove subtasks, attach files through the picker, preview images and remove files.

:BlockShowcase{blockPath="Tasks/TaskDetail/BlockTaskDetail4" component="BlockTaskDetail4" iframeHeight="760px"}

## Style Five

Properties sidebar. Popover pickers for status and assignee, a priority toggle, a due date, an estimate stepper and labels you can add and remove.

:BlockShowcase{blockPath="Tasks/TaskDetail/BlockTaskDetail5" component="BlockTaskDetail5" iframeHeight="640px"}

## Style Six

Quick add dialog. A large title field, notes, quick selects for project, assignee, priority and due date, a keyboard shortcut to save and validation.

:BlockShowcase{blockPath="Tasks/TaskDetail/BlockTaskDetail6" component="BlockTaskDetail6" iframeHeight="480px"}
