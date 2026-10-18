---
title: App - Stats
description: Stat cards and metric layouts for dashboards. Sparklines, progress rings, segmented breakdowns, count-up values, period switchers and multi-stat sections, all using the Fancy Icon component.
---

The stat blocks take their numbers as props, so you can pass real data. Trend colors use green and red, the icons use `UiFancyIcon` themes, and the animated values respect a plain render if you remove the `useTransition` call.

## Style One

An icon, a trend pill and an area sparkline drawn from your data. Pass a `data` array and the line and fill follow.

:::BlockShowcase{blockPath="App/Stats/BlockAppStats1" component="BlockAppStats1" iframeHeight="380px" frameClass="py-5 px-1" containerClass="max-w-md mx-auto"}

:prose-code-snippet{file="/components/content/Block/App/Stats/BlockAppStats1.vue" language="vue" title="Stat card with sparkline"}

:::

## Style Two

A gradient fancy icon on the right of the value, with a trend and a hover lift.

:::BlockShowcase{blockPath="App/Stats/BlockAppStats2" component="BlockAppStats2" iframeHeight="300px" frameClass="py-5 px-1" containerClass="max-w-md mx-auto"}

:prose-code-snippet{file="/components/content/Block/App/Stats/BlockAppStats2.vue" language="vue" title="Gradient icon card"}

:::

## Style Three

A target card with a fancy icon, a progress bar with a marker, the amount remaining and days left.

:::BlockShowcase{blockPath="App/Stats/BlockAppStats3" component="BlockAppStats3" iframeHeight="420px" frameClass="py-5 px-1" containerClass="max-w-md mx-auto"}

:prose-code-snippet{file="/components/content/Block/App/Stats/BlockAppStats3.vue" language="vue" title="Goal with progress"}

:::

## Style Four

A dark fancy icon on an accent column, a pulsing live badge and a value that counts up on load.

:::BlockShowcase{blockPath="App/Stats/BlockAppStats4" component="BlockAppStats4" iframeHeight="280px" frameClass="py-5 px-1" containerClass="max-w-md mx-auto"}

:prose-code-snippet{file="/components/content/Block/App/Stats/BlockAppStats4.vue" language="vue" title="Live stat"}

:::

## Style Five

A fancy icon, an actions menu whose refresh reloads the bars, a trend and a mini bar chart.

:::BlockShowcase{blockPath="App/Stats/BlockAppStats5" component="BlockAppStats5" iframeHeight="340px" frameClass="py-5 px-1" containerClass="max-w-md mx-auto"}

:prose-code-snippet{file="/components/content/Block/App/Stats/BlockAppStats5.vue" language="vue" title="Bar chart with menu"}

:::

## Style Six

A total with a stacked bar split by status and a legend. Hovering a segment or a row focuses it.

:::BlockShowcase{blockPath="App/Stats/BlockAppStats6" component="BlockAppStats6" iframeHeight="400px" frameClass="py-5 px-1" containerClass="max-w-md mx-auto"}

:prose-code-snippet{file="/components/content/Block/App/Stats/BlockAppStats6.vue" language="vue" title="Segmented breakdown"}

:::

## Style Seven

The current value against the previous period as paired bars, with a delta badge and a plain language note.

:::BlockShowcase{blockPath="App/Stats/BlockAppStats7" component="BlockAppStats7" iframeHeight="440px" frameClass="py-5 px-1" containerClass="max-w-md mx-auto"}

:prose-code-snippet{file="/components/content/Block/App/Stats/BlockAppStats7.vue" language="vue" title="Period comparison"}

:::

## Style Eight

A ring that fills to the value, an outline fancy icon, a used and available legend and an upgrade link.

:::BlockShowcase{blockPath="App/Stats/BlockAppStats8" component="BlockAppStats8" iframeHeight="300px" frameClass="py-5 px-1" containerClass="max-w-lg mx-auto"}

:prose-code-snippet{file="/components/content/Block/App/Stats/BlockAppStats8.vue" language="vue" title="Progress ring"}

:::

## Style Nine

A large always-dark card with a counting value, a glowing sparkline and a call to action.

:::BlockShowcase{blockPath="App/Stats/BlockAppStats9" component="BlockAppStats9" iframeHeight="440px" frameClass="py-5 px-1" containerClass="max-w-md mx-auto"}

:prose-code-snippet{file="/components/content/Block/App/Stats/BlockAppStats9.vue" language="vue" title="Hero stat on a dark card"}

:::

## Style Ten

A 7D, 30D and 90D control that swaps the value, delta and bars. Clicking the active item keeps it selected.

:::BlockShowcase{blockPath="App/Stats/BlockAppStats10" component="BlockAppStats10" iframeHeight="340px" frameClass="py-5 px-1" containerClass="max-w-md mx-auto"}

:prose-code-snippet{file="/components/content/Block/App/Stats/BlockAppStats10.vue" language="vue" title="Period switcher"}

:::

## Style Eleven

Four stats in one card with hairline dividers that stay correct as the grid reflows.

:::BlockShowcase{blockPath="App/Stats/BlockAppStats11" component="BlockAppStats11" iframeHeight="380px" frameClass="py-5 px-1" containerClass="max-w-5xl mx-auto"}

:prose-code-snippet{file="/components/content/Block/App/Stats/BlockAppStats11.vue" language="vue" title="Joined stat group"}

:::

## Style Twelve

Compact selectable tiles, each with an icon, a delta and an inline sparkline. Scrolls sideways on small screens.

:::BlockShowcase{blockPath="App/Stats/BlockAppStats12" component="BlockAppStats12" iframeHeight="260px" frameClass="py-5 px-1" containerClass="max-w-5xl mx-auto"}

:prose-code-snippet{file="/components/content/Block/App/Stats/BlockAppStats12.vue" language="vue" title="KPI strip with sparklines"}

:::

## Style Thirteen

A large revenue card with a hover tooltip bar chart beside a grid of four compact stats.

:::BlockShowcase{blockPath="App/Stats/BlockAppStats13" component="BlockAppStats13" iframeHeight="520px" frameClass="py-5 px-1" containerClass="max-w-5xl mx-auto"}

:prose-code-snippet{file="/components/content/Block/App/Stats/BlockAppStats13.vue" language="vue" title="Featured chart with stat grid"}

:::

## Style Fourteen

A section heading with a range control and four gradient icon cards. Changing the range shows a skeleton and then the new numbers.

:::BlockShowcase{blockPath="App/Stats/BlockAppStats14" component="BlockAppStats14" iframeHeight="520px" frameClass="py-5 px-1" containerClass="max-w-5xl mx-auto"}

:prose-code-snippet{file="/components/content/Block/App/Stats/BlockAppStats14.vue" language="vue" title="Overview with range switcher"}

:::
