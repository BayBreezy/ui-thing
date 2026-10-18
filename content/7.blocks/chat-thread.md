---
title: Chat - Thread
description: "Chat thread blocks built on the message, bubble, attachment and message scroller components: one to one chat, group chat, attachments, reactions, replies, a typing indicator, system messages and a support conversation."
---

A thread is the part of a chat app where messages live. These blocks use `UiMessageScroller` so the view follows the latest message and shows a jump to latest button, and `UiMessage` with `UiBubble` for the messages themselves. Each one is a card with a fixed height, so you can drop it into a layout and let the scroller handle the overflow.

All people and messages are fictional and the avatars are placeholders from Pravatar. Messages come from a typed prop and are copied into local state, so sending a message never mutates your data. Replace the simulated replies and timers with your own socket or API.

## Style One

One to one chat with a header, bubbles on both sides, timestamps and a working composer. Press enter to send and a simulated reply arrives a moment later.

:BlockShowcase{blockPath="Chat/Thread/BlockThread1" component="BlockThread1" iframeHeight="640px"}

## Style Two

Group chat with an avatar stack in the header, names above each run of messages, consecutive messages grouped into one stack and a day divider.

:BlockShowcase{blockPath="Chat/Thread/BlockThread2" component="BlockThread2" iframeHeight="640px"}

## Style Three

Thread with image and file attachments, download buttons and an upload that shows progress and can be cancelled.

:BlockShowcase{blockPath="Chat/Thread/BlockThread3" component="BlockThread3" iframeHeight="700px"}

## Style Four

Emoji reactions. Counts under each bubble, your own reactions highlighted, a click to toggle and a popover with quick emoji. Reactions are real toggle buttons with accessible names.

:BlockShowcase{blockPath="Chat/Thread/BlockThread4" component="BlockThread4" iframeHeight="620px"}

## Style Five

Replies and quotes. Reply to any message and the quoted text appears inside your bubble, with a banner above the composer that you can cancel.

:BlockShowcase{blockPath="Chat/Thread/BlockThread5" component="BlockThread5" iframeHeight="640px"}

## Style Six

Typing indicator with three bouncing dots that stop for people who prefer reduced motion, a typing label for screen readers and a simulated reply after a short delay.

:BlockShowcase{blockPath="Chat/Thread/BlockThread6" component="BlockThread6" iframeHeight="620px"}

## Style Seven

Channel thread with system messages for joins, renames and pins, date separators and a new messages divider.

:BlockShowcase{blockPath="Chat/Thread/BlockThread7" component="BlockThread7" iframeHeight="640px"}

## Style Eight

Support conversation with a ticket header, an open or resolved status, agent bubbles with a label, internal notes, quick reply buttons and a closed state that hides the composer.

:BlockShowcase{blockPath="Chat/Thread/BlockThread8" component="BlockThread8" iframeHeight="700px"}
