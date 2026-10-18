---
title: Activity - Notification Center
description: "Notification blocks: a bell with a popover list, a full page with bulk actions, notifications grouped by day, inline accept and reply actions, a tabbed list with counts and an inbox zero queue with an empty state."
---

These blocks show what happened and what needs attention. They take typed `notifications` props with fictional people and a `now` prop, so relative times like "12m ago" stay stable in the demos. Pass the real time in your own app and the raw timestamps from your API.

Read state, selection, replies and dismissals only change local state, so connect the handlers to your own endpoints. Unread rows use a dot with an accessible label and never rely on color alone.

## Style One

Bell button with an unread badge that opens a popover list. Click a row to mark it read, or mark them all at once.

:BlockShowcase{blockPath="Activity/NotificationCenter/BlockNotificationCenter1" component="BlockNotificationCenter1" iframeHeight="640px"}

## Style Two

Full notifications page with a type filter, a checkbox on every row, select all, a bulk bar to mark read or delete, load more and an empty state.

:BlockShowcase{blockPath="Activity/NotificationCenter/BlockNotificationCenter2" component="BlockNotificationCenter2" iframeHeight="760px"}

## Style Three

Notifications grouped into today, yesterday and earlier, with an icon for each kind and hover actions to mark a row read or dismiss it.

:BlockShowcase{blockPath="Activity/NotificationCenter/BlockNotificationCenter3" component="BlockNotificationCenter3" iframeHeight="760px"}

## Style Four

Notifications with actions. Accept or decline an invitation, approve a request or reply to a comment without leaving the list.

:BlockShowcase{blockPath="Activity/NotificationCenter/BlockNotificationCenter4" component="BlockNotificationCenter4" iframeHeight="680px"}

## Style Five

Card with all, unread and mentions tabs that show counts, a quoted mention and a message for each empty tab.

:BlockShowcase{blockPath="Activity/NotificationCenter/BlockNotificationCenter5" component="BlockNotificationCenter5" iframeHeight="680px"}

## Style Six

Inbox zero queue. Clear notifications one by one with a progress bar, then see a friendly empty state with a restore button.

:BlockShowcase{blockPath="Activity/NotificationCenter/BlockNotificationCenter6" component="BlockNotificationCenter6" iframeHeight="560px"}
