---
title: Files - Storage
description: "Storage blocks: a usage meter with a segmented bar, a breakdown by file type with a size or file count switch, a plan upgrade prompt with a monthly and yearly price toggle and quota warning banners that change at 80, 90 and 100 percent."
---

These blocks show how much space is used and what to do about it. They take typed props, like `total`, `segments` and `plans`, with fictional numbers, and the segmented bar has a text alternative so the same information is available without color.

The quota warning block includes a slider that previews each state. It is only there for the demo, so remove it and pass the real usage in. The upgrade buttons show a toast, so connect them to your billing flow.

## Style One

Usage meter with a segmented bar split by file type, a legend and manage and upgrade buttons.

:BlockShowcase{blockPath="Files/Storage/BlockStorage1" component="BlockStorage1" iframeHeight="560px"}

## Style Two

Breakdown by type with a bar for each kind of file and a switch between size and file count.

:BlockShowcase{blockPath="Files/Storage/BlockStorage2" component="BlockStorage2" iframeHeight="560px"}

## Style Three

Upgrade prompt with plan cards, a monthly and yearly switch that changes the price and an upgrade button.

:BlockShowcase{blockPath="Files/Storage/BlockStorage3" component="BlockStorage3" iframeHeight="760px"}

## Style Four

Quota warning banners for 80, 90 and 100 percent, with a dismiss button for the lower levels and uploads that pause when the storage is full.

:BlockShowcase{blockPath="Files/Storage/BlockStorage4" component="BlockStorage4" iframeHeight="640px"}
