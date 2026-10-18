---
title: Calendar - Week and Agenda
description: "Week and day calendar blocks: a week time grid with overlapping events, a day view with a working hours switch, an agenda list grouped by day, a day timeline with free time, an upcoming events card and a team schedule that finds the best time to meet."
---

These blocks show events along a time axis or as a list. The time grids place every event from its start and end time, and events that overlap share the column. All of them take a `now` or `today` prop, so the demos stay stable and you can pass the real date in your own app, and a typed `events` prop with fictional data.

Times are plain `HH:mm` strings and dates are ISO strings handled in UTC, so there is no time zone surprise in the layout math. Convert your own data to those shapes before you pass it in. Events that can be clicked are real buttons, and the current time line is hidden from assistive technology.

## Style One

Week time grid with seven day columns, hour rows, a current time line on today and a details panel for the event you select.

:BlockShowcase{blockPath="Calendar/WeekAgenda/BlockWeekAgenda1" component="BlockWeekAgenda1" iframeHeight="900px"}

## Style Two

Day view with hourly rows, an all day strip, event cards with place and attendees and a switch that trims the grid to working hours.

:BlockShowcase{blockPath="Calendar/WeekAgenda/BlockWeekAgenda2" component="BlockWeekAgenda2" iframeHeight="860px"}

## Style Three

Agenda list grouped by day with Today and Tomorrow labels, a category filter, a join button for video calls and an empty state.

:BlockShowcase{blockPath="Calendar/WeekAgenda/BlockWeekAgenda3" component="BlockWeekAgenda3" iframeHeight="760px"}

## Style Four

Vertical timeline of one day. Past events are checked off, the running event shows a progress bar and the gaps between events show how much free time you have.

:BlockShowcase{blockPath="Calendar/WeekAgenda/BlockWeekAgenda4" component="BlockWeekAgenda4" iframeHeight="900px"}

## Style Five

Upcoming events card with the next event, a countdown and a join button, then the following events with date chips, attendees and a reminder toggle.

:BlockShowcase{blockPath="Calendar/WeekAgenda/BlockWeekAgenda5" component="BlockWeekAgenda5" iframeHeight="720px"}

## Style Six

Team schedule with one row per person across the working day. It finds the hours when everyone is free and lets you preview a slot across all rows.

:BlockShowcase{blockPath="Calendar/WeekAgenda/BlockWeekAgenda6" component="BlockWeekAgenda6" iframeHeight="640px"}
