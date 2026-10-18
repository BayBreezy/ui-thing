---
title: Changelog - Releases
description: "Changelog blocks: a release timeline, version cards with expandable notes, release notes grouped by new, improved and fixed, a changelog with tags and filters, a compact list and a changelog with an email subscribe card."
---

These blocks show what changed and when. They take a typed `releases` or `entries` prop with fictional versions and dates, so you can map your own release data to them. Dates are ISO strings formatted in UTC, and each date uses a real `time` element with a `datetime` attribute.

Filters, expanded notes and the subscribe form only change local state. Connect the subscribe form to your email provider, and if you want an RSS feed, generate it from the same data.

## Style One

Release timeline with a version, a date, a label for major, minor and patch releases and a load older button.

:BlockShowcase{blockPath="Changelog/Releases/BlockReleases1" component="BlockReleases1" iframeHeight="860px"}

## Style Two

Version cards with counts of new, improved and fixed items and notes that expand inside the card.

:BlockShowcase{blockPath="Changelog/Releases/BlockReleases2" component="BlockReleases2" iframeHeight="760px"}

## Style Three

One release at a time, grouped under new, improved and fixed headings, with a version select and a copy as markdown button.

:BlockShowcase{blockPath="Changelog/Releases/BlockReleases3" component="BlockReleases3" iframeHeight="760px"}

## Style Four

Changelog with search and combinable tag chips, grouped by month, with a result count and an empty state.

:BlockShowcase{blockPath="Changelog/Releases/BlockReleases4" component="BlockReleases4" iframeHeight="800px"}

## Style Five

Compact list with the date on the left, type badges, year headings and entries that expand on click.

:BlockShowcase{blockPath="Changelog/Releases/BlockReleases5" component="BlockReleases5" iframeHeight="660px"}

## Style Six

Changelog next to a sticky subscribe card with a frequency select, validation, a thank you state and a copy RSS link button.

:BlockShowcase{blockPath="Changelog/Releases/BlockReleases6" component="BlockReleases6" iframeHeight="760px"}
