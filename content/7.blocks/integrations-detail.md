---
title: Integrations - Detail
description: "Integration detail blocks: a detail page with tabs, reviews and a details sidebar, a step by step setup flow, a permissions list with required and optional access and a related integrations section with add buttons."
---

These blocks make up the page for a single integration. They take typed props for the app, its steps and its permissions, so one set of blocks can show any tool. The logos come from the Iconify `logos` set.

Installing, connecting and granting access only change local state, and the setup block fails its first test message on purpose to show the error state. Replace the timers with your own OAuth flow, and always check the granted scopes on the server.

## Style One

Detail page with the logo, rating, an install button, tabs for overview, features and reviews and a details sidebar.

:BlockShowcase{blockPath="IntegrationsMarketing/IntegrationDetail/BlockIntegrationDetail1" component="BlockIntegrationDetail1" iframeHeight="860px"}

## Style Two

Setup steps where each step opens after the one before it: connect an account, choose a channel and send a test message.

:BlockShowcase{blockPath="IntegrationsMarketing/IntegrationDetail/BlockIntegrationDetail2" component="BlockIntegrationDetail2" iframeHeight="780px"}

## Style Three

Permissions list with required and optional access, a risk label for each one, switches and a count of what you allow.

:BlockShowcase{blockPath="IntegrationsMarketing/IntegrationDetail/BlockIntegrationDetail3" component="BlockIntegrationDetail3" iframeHeight="860px"}

## Style Four

Related integrations with a category filter, add buttons and a show more button.

:BlockShowcase{blockPath="IntegrationsMarketing/IntegrationDetail/BlockIntegrationDetail4" component="BlockIntegrationDetail4" iframeHeight="680px"}
