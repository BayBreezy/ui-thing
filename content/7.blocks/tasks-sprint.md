---
title: Tasks - Sprint
description: "Sprint blocks for agile teams: planning with a capacity meter, a burndown chart drawn in SVG, a sprint review with velocity and a retrospective board with limited votes."
---

These blocks cover the ceremonies around a sprint. The planning block uses `UiDraggable` to move stories between the backlog and the sprint, and the burndown chart is plain SVG, so it needs no charting library and works in both color modes. Everything takes typed props with fictional data.

The chart has a text alternative: an accessible name that states the current numbers and a visually hidden table with the data for every day. Votes in the retrospective block are real toggle buttons, announced with their pressed state.

## Style One

Sprint planning with the backlog and the sprint side by side. Drag stories or use the buttons, watch the capacity meter turn red when the sprint is overcommitted and start the sprint once it fits.

:BlockShowcase{blockPath="Tasks/Sprint/BlockSprint1" component="BlockSprint1" iframeHeight="740px"}

## Style Two

Sprint summary with days remaining, points done and remaining and a burndown chart with an ideal and an actual line. Pass the remaining points for each day in `actual`.

:BlockShowcase{blockPath="Tasks/Sprint/BlockSprint2" component="BlockSprint2" iframeHeight="680px"}

## Style Three

Sprint review. Completed versus planned points, a velocity bar chart for the last sprints, shipped stories, carried over stories with the reason and a button that copies a summary.

:BlockShowcase{blockPath="Tasks/Sprint/BlockSprint3" component="BlockSprint3" iframeHeight="780px"}

## Style Four

Retrospective board with went well, to improve and action items columns. Add notes, spend a limited number of votes and tick off action items.

:BlockShowcase{blockPath="Tasks/Sprint/BlockSprint4" component="BlockSprint4" iframeHeight="640px"}
