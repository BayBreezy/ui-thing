---
title: Calendar - Booking
description: "Booking flow blocks: a date and time slot picker, service selection with staff and add ons, an appointment details form, a booking confirmation with calendar links, reschedule and cancel screens and a time zone aware slot picker."
---

These blocks cover the steps of an appointment flow, from picking a service to managing the booking afterwards. Each one is a single step, so you can use them alone or chain them with your router or a stepper. They take typed props with fictional data, such as the `host`, `services`, `slots` and `booking` objects, and a `today` or `now` prop so the demos stay stable.

Nothing is sent anywhere. Submit buttons show a toast or a success state, so connect them to your own booking API. Dates are ISO strings handled in UTC, and the time zone block uses `Intl` to convert UTC instants for display.

## Style One

Date and time slot picker. Weekends, past days and fully booked days are disabled, booked times are removed and the chosen slot gets a confirm button.

:BlockShowcase{blockPath="Calendar/Booking/BlockBooking1" component="BlockBooking1" iframeHeight="640px"}

## Style Two

Service selection with radio cards, a choice of staff, optional add ons and a summary card with the total time and price.

:BlockShowcase{blockPath="Calendar/Booking/BlockBooking2" component="BlockBooking2" iframeHeight="900px"}

## Style Three

Appointment details form with inline validation, a reminder select, a terms checkbox, a booking summary and a success state.

:BlockShowcase{blockPath="Calendar/Booking/BlockBooking3" component="BlockBooking3" iframeHeight="760px"}

## Style Four

Booking confirmation with the appointment details, add to calendar links, a downloadable calendar file, a copy button and what to bring.

:BlockShowcase{blockPath="Calendar/Booking/BlockBooking4" component="BlockBooking4" iframeHeight="860px"}

## Style Five

Reschedule or cancel a booking. Pick a new day and time, or cancel with a reason and a confirmation dialog. The policy changes when the appointment is close.

:BlockShowcase{blockPath="Calendar/Booking/BlockBooking5" component="BlockBooking5" iframeHeight="760px"}

## Style Six

Time zone aware slot picker. Choose a zone, switch between 12 and 24 hour time and see the host time next to the slot you pick.

:BlockShowcase{blockPath="Calendar/Booking/BlockBooking6" component="BlockBooking6" iframeHeight="760px"}
