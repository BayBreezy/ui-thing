---
title: Onboarding - Welcome
description: "Welcome and first run blocks: quick start actions, a product tour, role and use case pickers, a plan picker and a personalised welcome banner with setup progress."
---

The welcome blocks are the first thing a new user sees after signing up. They collect a little context, point at the next step and never trap anyone, so each one has a skip or dismiss action. Selections live in plain refs and typed props (`roles`, `options`, `plans`, `slides`, `steps`) hold the sample content, so replace the handlers with a call to your own API.

Names and plans are fictional. Selection cards are real radio groups and checkboxes, so they work with the keyboard and screen readers, and counts are announced through live regions.

## Style One

Welcome screen with a greeting, three quick start cards that get a check when you click them, a primary action and a skip link.

:BlockShowcase{blockPath="Onboarding/Welcome/BlockWelcome1" component="BlockWelcome1" iframeHeight="640px"}

## Style Two

Product tour with one slide at a time, clickable progress dots, back and next buttons, a skip link and a get started button on the last slide.

:BlockShowcase{blockPath="Onboarding/Welcome/BlockWelcome2" component="BlockWelcome2" iframeHeight="620px"}

## Style Three

Role picker built from a radio group styled as cards. Continue stays disabled until a role is selected.

:BlockShowcase{blockPath="Onboarding/Welcome/BlockWelcome3" component="BlockWelcome3" iframeHeight="680px"}

## Style Four

Use case picker with multi select checkbox cards, a live selected count and a clear shortcut.

:BlockShowcase{blockPath="Onboarding/Welcome/BlockWelcome4" component="BlockWelcome4" iframeHeight="680px"}

## Style Five

Plan picker with a monthly and yearly switch, three selectable plan cards with a recommended badge and a continue button that names the chosen plan.

:BlockShowcase{blockPath="Onboarding/Welcome/BlockWelcome5" component="BlockWelcome5" iframeHeight="720px"}

## Style Six

Personalised welcome banner for the dashboard with the user's avatar, a circular setup progress, the next recommended step and a dismiss button.

:BlockShowcase{blockPath="Onboarding/Welcome/BlockWelcome6" component="BlockWelcome6" iframeHeight="420px"}
