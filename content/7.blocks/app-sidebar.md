---
title: App - Sidebar
description: Application sidebars built on the Sidebar component. Workspace switchers, two-tier mail layouts, icon rails, floating and inset variants, project lists, settings navigation, chat lists and a dark brand sidebar.
---

These blocks use the `UiSidebar*` components, so they get the mobile sheet, the collapsed icon state, the keyboard shortcut (Ctrl/Cmd + B) and the saved open state for free. Resize the preview to see the mobile sheet.

## Style One

A workspace switcher, a command search button, collapsible groups with badges, projects with hover actions and a storage card. It collapses to an icon rail with tooltips, and the user menu sits in the footer. Toggle with the trigger, the rail or Ctrl/Cmd + B.

::BlockShowcase{blockPath="App/Sidebar/BlockAppSidebar1" component="BlockAppSidebar1" iframeHeight="80vh"}

:prose-code-snippet{file="/components/content/Block/App/Sidebar/BlockAppSidebar1.vue" language="vue" title="Workspace sidebar that collapses to icons"}
::

## Style Two

An icon rail that switches the folder, next to a second panel with a searchable conversation list and an unread filter. Selecting a message fills the content area.

::BlockShowcase{blockPath="App/Sidebar/BlockAppSidebar2" component="BlockAppSidebar2" iframeHeight="80vh"}

:prose-code-snippet{file="/components/content/Block/App/Sidebar/BlockAppSidebar2.vue" language="vue" title="Two-tier mail sidebar"}
::

## Style Three

Starts collapsed to icons with tooltips and expands on demand. Includes an activity dot on items, a help link and a user menu.

::BlockShowcase{blockPath="App/Sidebar/BlockAppSidebar3" component="BlockAppSidebar3" iframeHeight="80vh"}

:prose-code-snippet{file="/components/content/Block/App/Sidebar/BlockAppSidebar3.vue" language="vue" title="Compact icon sidebar"}
::

## Style Four

The floating variant with rounded corners, a live menu filter, notification badges and colored workspace indicators you can switch between.

::BlockShowcase{blockPath="App/Sidebar/BlockAppSidebar4" component="BlockAppSidebar4" iframeHeight="80vh"}

:prose-code-snippet{file="/components/content/Block/App/Sidebar/BlockAppSidebar4.vue" language="vue" title="Floating sidebar with sections"}
::

## Style Five

The inset variant where the page sits in a rounded card. Adds quick action buttons, grouped navigation with nested items, a storage meter and the user row.

::BlockShowcase{blockPath="App/Sidebar/BlockAppSidebar5" component="BlockAppSidebar5" iframeHeight="80vh"}

:prose-code-snippet{file="/components/content/Block/App/Sidebar/BlockAppSidebar5.vue" language="vue" title="Inset sidebar with quick actions"}
::

## Style Six

Recent, starred and all tabs with live search. Stars move projects between tabs and the empty states explain what to do.

::BlockShowcase{blockPath="App/Sidebar/BlockAppSidebar6" component="BlockAppSidebar6" iframeHeight="80vh"}

:prose-code-snippet{file="/components/content/Block/App/Sidebar/BlockAppSidebar6.vue" language="vue" title="Projects sidebar with tabs"}
::

## Style Seven

A back to app link and grouped settings links with the active page reflected in the content and breadcrumbs, with an upgrade callout in the footer.

::BlockShowcase{blockPath="App/Sidebar/BlockAppSidebar7" component="BlockAppSidebar7" iframeHeight="80vh"}

:prose-code-snippet{file="/components/content/Block/App/Sidebar/BlockAppSidebar7.vue" language="vue" title="Settings navigation sidebar"}
::

## Style Eight

Pinned and recent conversations with presence dots, unread badges that clear when opened, search, and the selected chat shown beside it.

::BlockShowcase{blockPath="App/Sidebar/BlockAppSidebar8" component="BlockAppSidebar8" iframeHeight="80vh"}

:prose-code-snippet{file="/components/content/Block/App/Sidebar/BlockAppSidebar8.vue" language="vue" title="Chat conversations sidebar"}
::

## Style Nine

A sidebar that stays dark next to a light page. Includes an environment switcher with colored status, a gradient logo, an active item highlight and an icon collapse.

::BlockShowcase{blockPath="App/Sidebar/BlockAppSidebar9" component="BlockAppSidebar9" iframeHeight="80vh"}

:prose-code-snippet{file="/components/content/Block/App/Sidebar/BlockAppSidebar9.vue" language="vue" title="Dark brand sidebar"}
::
