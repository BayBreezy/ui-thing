---
title: Activity - Audit Log
description: "Audit log blocks: a sortable table with paging, a filterable log with chips, a detail drawer with before and after values, an export bar that downloads CSV or JSON, security events with review actions and a login history with session controls."
---

These blocks help people see who did what and when. They take typed props with fictional events and a `now` prop where a time range is used, so the demos stay stable. Timestamps are `YYYY-MM-DDTHH:mm` strings in UTC. Format them in the viewer's time zone in your own app.

Filters, paging, reviews and sign outs only change local state, so connect them to your own API. The export block builds a real CSV or JSON file in the browser from the filtered rows, which is a good start for small logs. For large logs, create the file on the server.

## Style One

Audit log table with a sortable time column, failed event badges and page controls.

:BlockShowcase{blockPath="Activity/AuditLog/BlockAuditLog1" component="BlockAuditLog1" iframeHeight="760px"}

## Style Two

Filterable log with search, actor, action type and time range filters, removable chips and an empty state.

:BlockShowcase{blockPath="Activity/AuditLog/BlockAuditLog2" component="BlockAuditLog2" iframeHeight="720px"}

## Style Three

Event list where each row opens a side drawer with who, when, where and a before and after view of the change, plus buttons to walk through events.

:BlockShowcase{blockPath="Activity/AuditLog/BlockAuditLog3" component="BlockAuditLog3" iframeHeight="560px"}

## Style Four

Export bar with a time range, an event type and a format choice, a live count and a download button that creates a CSV or JSON file.

:BlockShowcase{blockPath="Activity/AuditLog/BlockAuditLog4" component="BlockAuditLog4" iframeHeight="760px"}

## Style Five

Security events with summary tiles, a banner for high severity events, review and dismiss actions and an undo.

:BlockShowcase{blockPath="Activity/AuditLog/BlockAuditLog5" component="BlockAuditLog5" iframeHeight="860px"}

## Style Six

Login history with the current session, a flagged sign in with a not me action and sign out for one or all other sessions.

:BlockShowcase{blockPath="Activity/AuditLog/BlockAuditLog6" component="BlockAuditLog6" iframeHeight="640px"}
