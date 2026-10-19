---
title: "Utility - Success"
description: "Confirmation page blocks: a payment success page with receipt, a form submitted page with next steps and rating, an account verified page with an automatic redirect and an action completed page with a timed undo."
---

These blocks close the loop after something went right. Each one says what happened, shows the details that matter and points to the next step. They take typed props with fictional data, such as `items`, `answers`, `steps` and `facts`.

Nothing is sent anywhere. Buttons only update local state or show a toast, so connect them to your router and API. The timers (redirect and undo) are driven by the clock, so they stay accurate even when a tab is in the background.

## Style One

Payment success with an order number and copy button, an itemised receipt with subtotal, tax and total, the payment method and download and view order actions.

:BlockShowcase{blockPath="Utility/Success/BlockSuccess1" component="BlockSuccess1" iframeHeight="860px"}

## Style Two

Form submitted confirmation. It repeats the answers the visitor gave, lists what happens next, offers a reference number to copy and asks for a one tap rating of the form.

:BlockShowcase{blockPath="Utility/Success/BlockSuccess2" component="BlockSuccess2" iframeHeight="900px"}

## Style Three

Account verified. It confirms the email, counts down to an automatic redirect that can be cancelled or skipped and shows a short get started checklist.

:BlockShowcase{blockPath="Utility/Success/BlockSuccess3" component="BlockSuccess3" iframeHeight="760px"}

## Style Four

Action completed with undo. A shrinking timer shows how long the undo is available, then the block moves to a restored or expired state with a short summary.

:BlockShowcase{blockPath="Utility/Success/BlockSuccess4" component="BlockSuccess4" iframeHeight="640px"}
