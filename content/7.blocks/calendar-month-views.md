---
title: Calendar - Month Views
description: "Month calendar blocks: a full month grid with event chips, a mini calendar with an agenda, a compact grid with event dots and keyboard navigation, multi day events drawn as bars, a year overview and a small upcoming events widget."
---

These blocks show dates and events in a month. Most of them draw their own grid from plain date math, so you can see how it works and change it, and one uses the `UiCalendar` component for a picker with dots. All of them take a `today` prop, so the demos stay stable and you can pass the real date in your own app, and a typed `events` prop with fictional data.

Days are real buttons with an accessible label that includes the date and the number of events, and the selected day uses `aria-pressed`. The compact calendar also supports the arrow keys, with a roving tabindex. The year overview and the widget are visual summaries that add screen reader text to days with events. Dates are handled as ISO strings in UTC to avoid time zone surprises.

## Style One

Full month grid with previous, next and today buttons, color coded event chips with a plus more link, selectable days and a list of the selected day's events.

:BlockShowcase{blockPath="Calendar/MonthViews/BlockMonthViews1" component="BlockMonthViews1" iframeHeight="860px"}

## Style Two

Mini calendar with dots on days that have events. Pick a day to see its agenda with time, place and attendees.

:BlockShowcase{blockPath="Calendar/MonthViews/BlockMonthViews2" component="BlockMonthViews2" iframeHeight="560px"}

## Style Three

Compact month with event dots, a stronger tint for busy days, arrow key navigation and a list for the selected day.

:BlockShowcase{blockPath="Calendar/MonthViews/BlockMonthViews3" component="BlockMonthViews3" iframeHeight="620px"}

## Style Four

Multi day events drawn as bars that span the week rows and continue over week breaks, with rounded ends only where an event starts and finishes, plus an accessible list of events.

:BlockShowcase{blockPath="Calendar/MonthViews/BlockMonthViews4" component="BlockMonthViews4" iframeHeight="860px"}

## Style Five

Year overview with twelve mini months, event days marked, event counts per month and a panel that lists the events of the month you pick.

:BlockShowcase{blockPath="Calendar/MonthViews/BlockMonthViews5" component="BlockMonthViews5" iframeHeight="900px"}

## Style Six

Compact calendar widget in a card with a mini month and the next three events with relative day labels.

:BlockShowcase{blockPath="Calendar/MonthViews/BlockMonthViews6" component="BlockMonthViews6" iframeHeight="680px"}
