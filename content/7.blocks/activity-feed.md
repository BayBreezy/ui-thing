---
title: Activity - Feed
description: "Activity feed blocks: a simple event list, a feed with avatars and attachments, posts with comments and likes, a timeline grouped by date, a commit style feed, system events with expandable details, filter chips and a compact sidebar widget."
---

These blocks show a stream of things that happened. They take typed props with fictional people and events, plus a `now` prop where they show relative times, so the demos stay stable. Feeds are built from plain lists, so each event is read as one item by a screen reader. The compact widget uses the `UiItem` components.

Filters, likes, comments and expanded rows only change local state. Replace the handlers and the sample arrays with your own API, and load more pages from the server instead of slicing in the browser.

## Style One

Simple activity feed with an icon for each kind of event, a connecting line and a load more button.

:BlockShowcase{blockPath="Activity/Feed/BlockFeed1" component="BlockFeed1" iframeHeight="680px"}

## Style Two

Feed with avatars, attachment chips and a preview card for a shared link.

:BlockShowcase{blockPath="Activity/Feed/BlockFeed2" component="BlockFeed2" iframeHeight="760px"}

## Style Three

Posts with a like button, a thread of comments under each post, a show all toggle and an inline comment box.

:BlockShowcase{blockPath="Activity/Feed/BlockFeed3" component="BlockFeed3" iframeHeight="860px"}

## Style Four

Timeline grouped by date with colored markers, status badges and a switch between newest and oldest first.

:BlockShowcase{blockPath="Activity/Feed/BlockFeed4" component="BlockFeed4" iframeHeight="760px"}

## Style Five

Commit style feed grouped by day, with verified badges, branch tags, a short hash and a copy button.

:BlockShowcase{blockPath="Activity/Feed/BlockFeed5" component="BlockFeed5" iframeHeight="680px"}

## Style Six

System events in monospace with severity icons, a severity filter with counts, expandable details and a live switch.

:BlockShowcase{blockPath="Activity/Feed/BlockFeed6" component="BlockFeed6" iframeHeight="680px"}

## Style Seven

Feed with toggle chips for each activity type, several filters at once, a result count and an empty state.

:BlockShowcase{blockPath="Activity/Feed/BlockFeed7" component="BlockFeed7" iframeHeight="720px"}

## Style Eight

Compact activity widget for a sidebar, built from the `UiItem` components, with a new badge and a mark as seen action.

:BlockShowcase{blockPath="Activity/Feed/BlockFeed8" component="BlockFeed8" iframeHeight="520px"}
