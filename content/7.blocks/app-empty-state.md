---
title: App - Empty State
description: Empty state designs for search results, missing data, uploads, onboarding checklists and team invites. Built from theme tokens so they work in light and dark mode, and several are interactive.
---

Every empty state accepts `title` and `description` props and exposes slots for the title, description and actions, so you can reuse them for your own content.

## Style One

Search with no matches. Skeleton rows fade out behind a search badge, with suggested searches as chips and clear search and create actions.

:::BlockShowcase{blockPath="App/EmptyState/BlockAppEmptyState1" component="BlockAppEmptyState1" iframeHeight="550px" containerClass="max-w-xl mx-auto"}

:prose-code-snippet{file="/components/content/Block/App/EmptyState/BlockAppEmptyState1.vue" language="vue" title="No results with ghost list"}

:::

## Style Two

Payment methods empty state. A stack of cards drawn with theme tokens, so it works in dark mode, with a plus badge and primary and secondary actions.

:::BlockShowcase{blockPath="App/EmptyState/BlockAppEmptyState2" component="BlockAppEmptyState2" iframeHeight="500px" containerClass="max-w-xl mx-auto"}

:prose-code-snippet{file="/components/content/Block/App/EmptyState/BlockAppEmptyState2.vue" language="vue" title="Fanned cards illustration"}

:::

## Style Three

A generic no data state. Dashed concentric rings with floating icon tiles and a softly pulsing outer ring.

:::BlockShowcase{blockPath="App/EmptyState/BlockAppEmptyState3" component="BlockAppEmptyState3" iframeHeight="550px" containerClass="max-w-xl mx-auto"}

:prose-code-snippet{file="/components/content/Block/App/EmptyState/BlockAppEmptyState3.vue" language="vue" title="Pulsing orbit illustration"}

:::

## Style Four

First project state. A dashed new project card leads a grid of faded skeleton cards, with a secondary import action.

:::BlockShowcase{blockPath="App/EmptyState/BlockAppEmptyState4" component="BlockAppEmptyState4" iframeHeight="600px" containerClass="max-w-3xl mx-auto"}

:prose-code-snippet{file="/components/content/Block/App/EmptyState/BlockAppEmptyState4.vue" language="vue" title="Ghost project grid"}

:::

## Style Five

Empty dashboard. A faded preview of stat tiles, a chart and a table shows what the page will look like, with a call to action card on top.

:::BlockShowcase{blockPath="App/EmptyState/BlockAppEmptyState5" component="BlockAppEmptyState5" iframeHeight="550px" containerClass="max-w-4xl mx-auto"}

:prose-code-snippet{file="/components/content/Block/App/EmptyState/BlockAppEmptyState5.vue" language="vue" title="Dashboard preview overlay"}

:::

## Style Six

Upload state. Drag and drop with a highlighted drag state, accepted file type chips, a browse button and a removable list of the files that were added.

:::BlockShowcase{blockPath="App/EmptyState/BlockAppEmptyState6" component="BlockAppEmptyState6" iframeHeight="600px" containerClass="max-w-xl mx-auto"}

:prose-code-snippet{file="/components/content/Block/App/EmptyState/BlockAppEmptyState6.vue" language="vue" title="Working drop zone"}

:::

## Style Seven

Choose how to get started. Two large cards with feature lists and a recommended badge. Continue is enabled once an option is picked.

:::BlockShowcase{blockPath="App/EmptyState/BlockAppEmptyState7" component="BlockAppEmptyState7" iframeHeight="650px" containerClass="max-w-3xl mx-auto"}

:prose-code-snippet{file="/components/content/Block/App/EmptyState/BlockAppEmptyState7.vue" language="vue" title="Selectable option cards"}

:::

## Style Eight

Onboarding checklist. The ring fills as each step completes, the current step has an action button, and finishing shows a completed state.

:::BlockShowcase{blockPath="App/EmptyState/BlockAppEmptyState8" component="BlockAppEmptyState8" iframeHeight="600px" containerClass="max-w-xl mx-auto"}

:prose-code-snippet{file="/components/content/Block/App/EmptyState/BlockAppEmptyState8.vue" language="vue" title="Setup checklist with progress ring"}

:::

## Style Nine

Inbox zero for notification lists. An animated check badge with confetti dots over faded read items.

:::BlockShowcase{blockPath="App/EmptyState/BlockAppEmptyState9" component="BlockAppEmptyState9" iframeHeight="550px" containerClass="max-w-xl mx-auto"}

:prose-code-snippet{file="/components/content/Block/App/EmptyState/BlockAppEmptyState9.vue" language="vue" title="All caught up"}

:::

## Style Ten

Empty workspace state. Overlapping avatar placeholders, an email field with validation, pending invites and a copyable invite link.

:::BlockShowcase{blockPath="App/EmptyState/BlockAppEmptyState10" component="BlockAppEmptyState10" iframeHeight="650px" containerClass="max-w-xl mx-auto"}

:prose-code-snippet{file="/components/content/Block/App/EmptyState/BlockAppEmptyState10.vue" language="vue" title="Invite your team"}

:::
