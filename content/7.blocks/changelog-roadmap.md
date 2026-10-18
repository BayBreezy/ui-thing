---
title: Changelog - Roadmap
description: "Roadmap blocks: quarterly columns, a month timeline with team rows, a planned, in progress and shipped board, a voting list, a now, next and later layout and feature request cards with a request dialog."
---

These blocks share what you plan to build and let people react to it. They take typed props with fictional initiatives, and the timeline uses dates as ISO strings with a `today` prop so the marker stays where the demo expects it.

Votes, follows and new requests only change local state. Store them on the server, and rate limit voting so one person cannot vote many times. The timeline draws its bars as divs and adds a hidden table with the same data, so screen reader users still get every item and its dates.

## Style One

Quarterly columns with initiative cards, an area filter and progress bars for work in progress.

:BlockShowcase{blockPath="Changelog/Roadmap/BlockRoadmap1" component="BlockRoadmap1" iframeHeight="760px"}

## Style Two

Timeline with month columns, one row for each team, colored bars for status, a today marker and a legend.

:BlockShowcase{blockPath="Changelog/Roadmap/BlockRoadmap2" component="BlockRoadmap2" iframeHeight="680px"}

## Style Three

Status board with planned, in progress and shipped columns, an area filter, vote counts and links to the release notes.

:BlockShowcase{blockPath="Changelog/Roadmap/BlockRoadmap3" component="BlockRoadmap3" iframeHeight="760px"}

## Style Four

Voting list with a vote button that toggles, sorting, search and a form to suggest a new idea.

:BlockShowcase{blockPath="Changelog/Roadmap/BlockRoadmap4" component="BlockRoadmap4" iframeHeight="860px"}

## Style Five

Now, next and later columns with a short introduction for each one and a follow toggle on every item.

:BlockShowcase{blockPath="Changelog/Roadmap/BlockRoadmap5" component="BlockRoadmap5" iframeHeight="720px"}

## Style Six

Feature request cards with votes, comments and status, a read more toggle and a dialog to send a new request.

:BlockShowcase{blockPath="Changelog/Roadmap/BlockRoadmap6" component="BlockRoadmap6" iframeHeight="760px"}
