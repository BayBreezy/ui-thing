---
title: Calendar - Availability
description: "Availability settings blocks: a weekly hours editor with several ranges per day, date overrides with holiday shortcuts, calendar connections with conflict checks and a booking page settings form with a live preview."
---

These blocks are the settings side of a scheduling product. They let someone decide when they can be booked, which calendars to check and how the public booking page looks. Each one keeps a local copy of the data you pass in, so editing never changes your props, and the save buttons only show a toast until you connect them to your API.

Times are plain `HH:mm` strings and dates are ISO strings. The date overrides block takes a `today` prop so the demo stays stable.

## Style One

Weekly hours editor with a switch for each weekday, one or more time ranges per day, a copy to weekdays action, range validation and a weekly total.

:BlockShowcase{blockPath="Calendar/Availability/BlockAvailability1" component="BlockAvailability1" iframeHeight="760px"}

## Style Two

Date overrides. Mark a single day as unavailable or give it custom hours, and add common holidays with one click.

:BlockShowcase{blockPath="Calendar/Availability/BlockAvailability2" component="BlockAvailability2" iframeHeight="640px"}

## Style Three

Calendar connections for Google, Outlook and iCloud with conflict checks, a target calendar for new bookings and a confirmation before disconnecting.

:BlockShowcase{blockPath="Calendar/Availability/BlockAvailability3" component="BlockAvailability3" iframeHeight="720px"}

## Style Four

Booking page settings with a link and a copy button, duration, buffer and notice selects, a booking window slider, an approval switch and a live preview.

:BlockShowcase{blockPath="Calendar/Availability/BlockAvailability4" component="BlockAvailability4" iframeHeight="900px"}
