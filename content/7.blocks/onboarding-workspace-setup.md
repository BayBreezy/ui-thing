---
title: Onboarding - Workspace Setup
description: "Workspace setup blocks: create a workspace with an auto filled URL, upload a logo and pick a brand color, invite teammates, connect integrations, import a CSV with column mapping and choose notification preferences."
---

These blocks are the practical steps of setting up a new workspace. Each one works on its own, so use them as separate pages in a wizard or drop one into a settings screen. State is kept in plain refs and nothing is sent anywhere, so replace the simulated saves with calls to your own API.

All names, companies and emails are fictional. File inputs read the file in the browser only, and the preview URLs are revoked when you remove the file or leave the page.

## Style One

Create a workspace. The URL slug follows the name until you edit it by hand, errors appear under the field and the button shows a loading state.

:BlockShowcase{blockPath="Onboarding/WorkspaceSetup/BlockWorkspaceSetup1" component="BlockWorkspaceSetup1" iframeHeight="680px"}

## Style Two

Brand setup with a logo dropzone, an accent color picker and a live preview card that updates as you change things. Files are checked for type and size.

:BlockShowcase{blockPath="Onboarding/WorkspaceSetup/BlockWorkspaceSetup2" component="BlockWorkspaceSetup2" iframeHeight="680px"}

## Style Three

Invite teammates with email chips. Press enter or comma to add an address, paste a whole list, set a role for each person and copy a shareable invite link.

:BlockShowcase{blockPath="Onboarding/WorkspaceSetup/BlockWorkspaceSetup3" component="BlockWorkspaceSetup3" iframeHeight="720px"}

## Style Four

Connect your tools. Integration cards with category tabs, connect and disconnect buttons with a loading state and a running count of what is connected.

:BlockShowcase{blockPath="Onboarding/WorkspaceSetup/BlockWorkspaceSetup4" component="BlockWorkspaceSetup4" iframeHeight="720px"}

## Style Five

Import a CSV. Drop a file or use the sample, match the columns to your fields, check a preview of the first rows and import. Parsing happens in the browser.

:BlockShowcase{blockPath="Onboarding/WorkspaceSetup/BlockWorkspaceSetup5" component="BlockWorkspaceSetup5" iframeHeight="860px"}

## Style Six

Notification preferences with an email and in app switch for each topic, a digest frequency picker, optional quiet hours and a button for the recommended defaults.

:BlockShowcase{blockPath="Onboarding/WorkspaceSetup/BlockWorkspaceSetup6" component="BlockWorkspaceSetup6" iframeHeight="900px"}
