---
title: "Utility - Maintenance"
description: "Maintenance and downtime page blocks: a maintenance mode page with progress steps, a scheduled downtime notice, an offline page that follows the browser connection and a rate limited page with a countdown."
---

These are the pages visitors see when your product cannot serve them normally. Each one explains what happened, says what to do next and keeps the tone calm. They take typed props with fictional data, such as `steps`, `services`, `retryAfter` and `pages`, and a `now` prop on the scheduled downtime notice so the demo stays stable.

Nothing is sent anywhere. Buttons update local state, so connect them to your own status checks and mailing list.

## Style One

Maintenance mode page with progress steps, an estimated return time, a check again button that reports the last check and an email form to be told when the app is back.

:BlockShowcase{blockPath="Utility/Maintenance/BlockMaintenance1" component="BlockMaintenance1" iframeHeight="860px"}

## Style Two

Scheduled downtime notice. It shows the window in UTC with its duration, how long until it starts, the services affected with an impact badge, a reminder switch and a copy details button.

:BlockShowcase{blockPath="Utility/Maintenance/BlockMaintenance2" component="BlockMaintenance2" iframeHeight="760px"}

## Style Three

Offline page. It starts in the offline state, counts retries, switches to a recovered state when the connection returns and lists the pages saved for offline use.

:BlockShowcase{blockPath="Utility/Maintenance/BlockMaintenance3" component="BlockMaintenance3" iframeHeight="860px"}

## Style Four

Rate limited page. A countdown ring and timer show when requests resume, the limit and usage are summarised, and the retry button unlocks when the timer ends.

:BlockShowcase{blockPath="Utility/Maintenance/BlockMaintenance4" component="BlockMaintenance4" iframeHeight="760px"}
