---
title: App - Header
description: Page header blocks for application screens. Profiles, teams, dashboards, projects, edit pages, lists and a scroll-condensing sticky header, with real interactions and subtle entrance motion.
---

Every header accepts props for its content and exposes slots, so you can replace the title, description, tabs or actions. The entrance animation uses `motion-v`, so remove the `Motion` wrapper if you don't want it.

## Style One

A profile header with a gradient cover, an overlapping avatar, a verified badge and a stats row. The follow button toggles and the content animates in.

::BlockShowcase{blockPath="App/Header/BlockAppHeader1" component="BlockAppHeader1" iframeHeight="450px"}

:prose-code-snippet{file="/components/content/Block/App/Header/BlockAppHeader1.vue" language="vue" title="Profile with gradient cover"}
::

## Style Two

A team page header with a member count and overlapping avatars that lift on hover, plus invite and add actions.

::BlockShowcase{blockPath="App/Header/BlockAppHeader2" component="BlockAppHeader2" iframeHeight="220px"}

:prose-code-snippet{file="/components/content/Block/App/Header/BlockAppHeader2.vue" language="vue" title="Team with avatar stack"}
::

## Style Three

A large page title with breadcrumbs and a search field. Press slash anywhere outside a field to jump to the search.

::BlockShowcase{blockPath="App/Header/BlockAppHeader3" component="BlockAppHeader3" iframeHeight="260px"}

:prose-code-snippet{file="/components/content/Block/App/Header/BlockAppHeader3.vue" language="vue" title="Breadcrumbs and search"}
::

## Style Four

A time of day greeting with the date, a segmented date range switcher and a refresh button that spins and updates its timestamp.

::BlockShowcase{blockPath="App/Header/BlockAppHeader4" component="BlockAppHeader4" iframeHeight="240px"}

:prose-code-snippet{file="/components/content/Block/App/Header/BlockAppHeader4.vue" language="vue" title="Dashboard greeting"}
::

## Style Five

A page header with breadcrumbs, an overflow menu and tabs with count badges and a sliding underline. The tabs scroll on small screens.

::BlockShowcase{blockPath="App/Header/BlockAppHeader5" component="BlockAppHeader5" iframeHeight="300px"}

:prose-code-snippet{file="/components/content/Block/App/Header/BlockAppHeader5.vue" language="vue" title="Breadcrumbs and tabs"}
::

## Style Six

A user header with an online status dot, contact details and pill tabs with a sliding indicator.

::BlockShowcase{blockPath="App/Header/BlockAppHeader6" component="BlockAppHeader6" iframeHeight="250px"}

:prose-code-snippet{file="/components/content/Block/App/Header/BlockAppHeader6.vue" language="vue" title="User header with segmented tabs"}
::

## Style Seven

A project header with a status badge, a progress bar, owner and member avatars, a due date and a star toggle.

::BlockShowcase{blockPath="App/Header/BlockAppHeader7" component="BlockAppHeader7" iframeHeight="330px"}

:prose-code-snippet{file="/components/content/Block/App/Header/BlockAppHeader7.vue" language="vue" title="Project with progress"}
::

## Style Eight

A sticky bar with an inline editable title, a saved or unsaved indicator, and discard and save buttons that enable as you edit.

::BlockShowcase{blockPath="App/Header/BlockAppHeader8" component="BlockAppHeader8" iframeHeight="200px"}

:prose-code-snippet{file="/components/content/Block/App/Header/BlockAppHeader8.vue" language="vue" title="Edit page with unsaved changes"}
::

## Style Nine

A list header with trend stats, a search field, status and sort filters, a list or grid toggle, and removable filter chips.

::BlockShowcase{blockPath="App/Header/BlockAppHeader9" component="BlockAppHeader9" iframeHeight="450px"}

:prose-code-snippet{file="/components/content/Block/App/Header/BlockAppHeader9.vue" language="vue" title="List with filters"}
::

## Style Ten

A deployment header with a patterned gradient banner, a live status pill with a pulsing dot, version and branch details, tech chips and tabs.

::BlockShowcase{blockPath="App/Header/BlockAppHeader10" component="BlockAppHeader10" iframeHeight="380px"}

:prose-code-snippet{file="/components/content/Block/App/Header/BlockAppHeader10.vue" language="vue" title="App with live status"}
::

## Style Eleven

A sticky header that shrinks as you scroll: the title gets smaller, the description collapses and a blurred background appears. The demo includes a scrollable list.

::BlockShowcase{blockPath="App/Header/BlockAppHeader11" component="BlockAppHeader11" iframeHeight="480px"}

:prose-code-snippet{file="/components/content/Block/App/Header/BlockAppHeader11.vue" language="vue" title="Sticky condensing header"}
::
