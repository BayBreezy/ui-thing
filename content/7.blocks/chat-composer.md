---
title: Chat - Composer
description: "Message composer blocks: a simple input, file attachments with drag and drop, emoji and mentions, a slash command menu, voice notes with a waveform and an expanding multi line textarea."
---

The composer is where people type. Each block shows its own sent messages above the input so you can see what happens on send, and all of them keep state in local refs. Swap the send handlers for your own API calls.

The autocomplete menus in the mentions and slash command blocks follow the combobox pattern, with `role="combobox"` on the input, a listbox of options and `aria-activedescendant`, so they work with arrow keys and screen readers. The voice note waveform stops moving when the user prefers reduced motion. Recording is simulated, so no microphone permission is requested.

## Style One

Simple composer. A rounded input with a send button, enter to send, a send button that is disabled while empty and sent messages shown above.

:BlockShowcase{blockPath="Chat/Composer/BlockComposer1" component="BlockComposer1" iframeHeight="420px"}

## Style Two

Attachments. Click the paperclip or drop files onto the composer, preview images, remove files, see sizes and hit a limit of four files.

:BlockShowcase{blockPath="Chat/Composer/BlockComposer2" component="BlockComposer2" iframeHeight="440px"}

## Style Three

Emoji and mentions. An emoji popover inserts at the cursor, and typing at opens a filtered list of teammates you can pick with the arrow keys. Mentions are highlighted in sent messages.

:BlockShowcase{blockPath="Chat/Composer/BlockComposer3" component="BlockComposer3" iframeHeight="560px"}

## Style Four

Slash commands. Typing slash opens a command menu with icons and descriptions, enter picks one and it shows up as a chip with its own placeholder.

:BlockShowcase{blockPath="Chat/Composer/BlockComposer4" component="BlockComposer4" iframeHeight="560px"}

## Style Five

Voice notes. A mic button starts a simulated recording with a timer and a live waveform, with cancel and send buttons. Sent notes appear as bubbles with a waveform.

:BlockShowcase{blockPath="Chat/Composer/BlockComposer5" component="BlockComposer5" iframeHeight="420px"}

## Style Six

Expanding textarea that grows up to a maximum height, enter to send and shift enter for a new line, formatting buttons and a character counter that turns red near the limit.

:BlockShowcase{blockPath="Chat/Composer/BlockComposer6" component="BlockComposer6" iframeHeight="480px"}
