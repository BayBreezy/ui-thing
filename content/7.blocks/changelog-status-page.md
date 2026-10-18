---
title: Changelog - Status Page
description: "Status page blocks: an uptime overview with 90 day bars, an incident history with update timelines, a component status list with an issues only switch and a subscribe to updates card for email, webhook and RSS."
---

These blocks make a public status page. They take typed props with fictional services and incidents, and the demos use a fixed `now` or `today` so the bars and the history stay stable.

Status is never shown with color alone. Every bar has a title and the chart has a text summary, and every status has an icon and a word. Replace the sample data with your monitoring data, and send subscriber email from the server, never from the browser.

## Style One

Uptime overview with a banner that follows the worst service, 90 day bars and an uptime percentage for each service.

:BlockShowcase{blockPath="Changelog/StatusPage/BlockStatusPage1" component="BlockStatusPage1" iframeHeight="720px"}

## Style Two

Incident history with a time range, impact badges, a timeline of updates for each incident and quiet days that say so.

:BlockShowcase{blockPath="Changelog/StatusPage/BlockStatusPage2" component="BlockStatusPage2" iframeHeight="860px"}

## Style Three

Component list in groups that collapse, with a status for each part and an only show issues switch.

:BlockShowcase{blockPath="Changelog/StatusPage/BlockStatusPage3" component="BlockStatusPage3" iframeHeight="680px"}

## Style Four

Subscribe card with tabs for email, webhook and RSS, a choice of components and validation.

:BlockShowcase{blockPath="Changelog/StatusPage/BlockStatusPage4" component="BlockStatusPage4" iframeHeight="640px"}
