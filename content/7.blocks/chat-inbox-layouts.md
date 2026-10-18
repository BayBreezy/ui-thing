---
title: Chat - Inbox Layouts
description: "Full page inbox layouts that combine conversation lists, threads and composers: a two pane chat app, a three pane email inbox, a support helpdesk with a customer panel and a mobile first stacked messenger."
---

The earlier chat blocks are the parts, and these are complete screens built from them. Each layout has a fixed height so it works as a demo, so give it `h-dvh` or `h-full` inside your own app shell.

State is local and the data comes in through typed props (`conversations`, `mails`, `tickets`). Selecting, filtering, starring, archiving, replying and changing a ticket status all update the demo, so you can see how each pane reacts. Names and messages are fictional.

## Style One

Two pane chat app. The conversation list is on the left and the selected thread is on the right. Opening a conversation clears its unread dot, and the composer adds messages to the thread. On small screens the panes stack.

:BlockShowcase{blockPath="Chat/InboxLayouts/BlockInboxLayouts1" component="BlockInboxLayouts1" iframeHeight="720px"}

## Style Two

Three pane email style inbox with a folder sidebar, a message list with stars and unread state and a reading pane with archive, delete and reply actions. Below the large breakpoint the folder pane becomes a select. On phones the reading pane is hidden, so open the message in a sheet or on its own route there.

:BlockShowcase{blockPath="Chat/InboxLayouts/BlockInboxLayouts2" component="BlockInboxLayouts2" iframeHeight="720px"}

## Style Three

Support helpdesk. A ticket queue with status filters and priority badges, the ticket thread with canned replies and a status select, and a customer panel with plan and open tickets.

:BlockShowcase{blockPath="Chat/InboxLayouts/BlockInboxLayouts3" component="BlockInboxLayouts3" iframeHeight="760px"}

## Style Four

Mobile first stacked messenger. One screen at a time, with a list and a thread view, a back button and a bottom tab bar. Opening a thread moves focus to its heading.

:BlockShowcase{blockPath="Chat/InboxLayouts/BlockInboxLayouts4" component="BlockInboxLayouts4" iframeHeight="720px"}
