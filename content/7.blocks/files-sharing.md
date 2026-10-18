---
title: Files - Sharing
description: "File sharing blocks: a share dialog that invites people and sets roles, an access list with pending invitations and undo, public link settings with a password and an expiry and a file detail panel with tabs, tags and actions."
---

These blocks cover who can see a file and how. They take typed props with fictional people, and the invite, role and link settings only change local state, so connect them to your API. Always check access on the server. A hidden button is not a permission.

The roles are viewer, commenter and editor, and the owner row cannot be changed. The photo in the detail panel is a placeholder from Unsplash.

## Style One

Share dialog with an invite field, a role select for each person, general access and a copy link button.

:BlockShowcase{blockPath="Files/Sharing/BlockSharing1" component="BlockSharing1" iframeHeight="520px"}

## Style Two

Access list with role selects, pending invitations that can be resent or cancelled and an undo after you remove someone.

:BlockShowcase{blockPath="Files/Sharing/BlockSharing2" component="BlockSharing2" iframeHeight="640px"}

## Style Three

Public link settings with a switch, a copy button, a permission, an optional password, an expiry and a reset link action.

:BlockShowcase{blockPath="Files/Sharing/BlockSharing3" component="BlockSharing3" iframeHeight="820px"}

## Style Four

File detail panel with a preview, tabs for details, activity and sharing and tags that can be added and removed.

:BlockShowcase{blockPath="Files/Sharing/BlockSharing4" component="BlockSharing4" iframeHeight="760px"}
