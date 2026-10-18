---
title: Calendar - Event Detail
description: "Event detail blocks: an event popover with actions, a full event page with tickets, an RSVP card with live counts, an attendee list with search and tabs and a create event dialog with validation and guest chips."
---

These blocks cover what happens around a single event. They take typed props with fictional events and people, and everything they change, like deleting an event or sending an RSVP, only updates local state. Replace the handlers with calls to your own API.

The photos come from Unsplash and the avatars are placeholders from Pravatar. Dates are ISO strings handled in UTC and times are plain `HH:mm` strings.

## Style One

Event chips on a week row that open a popover with the time, place, description, attendees and join, duplicate and delete actions.

:BlockShowcase{blockPath="Calendar/EventDetail/BlockEventDetail1" component="BlockEventDetail1" iframeHeight="640px"}

## Style Two

Full event page with a cover image, schedule, location, an about section and a sticky ticket card with a quantity stepper and a share button.

:BlockShowcase{blockPath="Calendar/EventDetail/BlockEventDetail2" component="BlockEventDetail2" iframeHeight="900px"}

## Style Three

RSVP card with going, maybe and can not go options, a guest stepper, a dietary note and counts that update with your answer.

:BlockShowcase{blockPath="Calendar/EventDetail/BlockEventDetail3" component="BlockEventDetail3" iframeHeight="720px"}

## Style Four

Attendee list with search, status tabs with counts, role and status badges and an actions menu for each person.

:BlockShowcase{blockPath="Calendar/EventDetail/BlockEventDetail4" component="BlockEventDetail4" iframeHeight="720px"}

## Style Five

Create event dialog with an all day switch, start and end time checks, guest chips, color swatches and a repeat select. New events appear in the list.

:BlockShowcase{blockPath="Calendar/EventDetail/BlockEventDetail5" component="BlockEventDetail5" iframeHeight="640px"}
