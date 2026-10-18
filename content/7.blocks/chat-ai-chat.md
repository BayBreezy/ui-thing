---
title: Chat - AI Chat
description: "AI chat interface blocks: a centered chat with copy and feedback actions, a welcome screen with suggestion cards, a thinking and streaming state, tool call steps, a model picker and a history sidebar."
---

These blocks are the front end of an AI assistant. Replies are simulated with timers so you can see how streaming, thinking and tool steps look and feel. Replace the timers with a call to your own model endpoint and append tokens to the last message the same way.

They share the message, bubble and message scroller components. The scroller keeps the view anchored to the latest user message, so a long streaming answer does not push the question out of sight, and it shows a jump to latest button when you scroll away. Spinners and carets stop animating for people who prefer reduced motion, and thinking and tool call states are exposed to assistive tech with `role="status"` or labelled controls.

## Style One

Centered chat in the style of popular assistants. User messages in muted bubbles, assistant replies as plain text with copy and feedback buttons, an auto growing prompt box and a stop button while streaming.

:BlockShowcase{blockPath="Chat/AiChat/BlockAiChat1" component="BlockAiChat1" iframeHeight="720px"}

## Style Two

Welcome screen with four suggestion cards. Clicking a card starts the conversation, and the new chat button brings the welcome screen back.

:BlockShowcase{blockPath="Chat/AiChat/BlockAiChat2" component="BlockAiChat2" iframeHeight="720px"}

## Style Three

Thinking and streaming. Skeleton lines while the assistant thinks, a collapsible reasoning summary, text that streams in with a caret and a stop generating button.

:BlockShowcase{blockPath="Chat/AiChat/BlockAiChat3" component="BlockAiChat3" iframeHeight="680px"}

## Style Four

Tool call steps. A collapsible trace shows each step the assistant took with its arguments and result, followed by the answer and a list of sources, with a replay button.

:BlockShowcase{blockPath="Chat/AiChat/BlockAiChat4" component="BlockAiChat4" iframeHeight="720px"}

## Style Five

Model picker. A dropdown with radio items and speed and capability badges, the selected model shown in the prompt box and on every answer.

:BlockShowcase{blockPath="Chat/AiChat/BlockAiChat5" component="BlockAiChat5" iframeHeight="680px"}

## Style Six

History sidebar with a new chat button, search, conversations grouped by day and a menu with rename and delete. The sidebar is hidden on small screens, where you would put it in a drawer.

:BlockShowcase{blockPath="Chat/AiChat/BlockAiChat6" component="BlockAiChat6" iframeHeight="720px"}
