---
title: Chat - Conversation List
description: "Conversation list blocks for chat and inbox apps: a simple list, unread badges with tabs, grouping by date with pinning, search with highlighted matches, a channels and direct messages sidebar and an alphabetical contacts list."
---

The conversation list is the left hand side of most chat apps. These blocks cover the common variants, and each one takes a typed prop (`conversations`, `contacts`) with sample data. Selecting, searching, pinning and marking as read all run on the client, so replace them with your own state or API calls.

Names and messages are fictional and the avatars are placeholders from Pravatar. Rows are real buttons, the selected row uses `aria-current`, presence is also announced as text for screen readers and result counts use live regions.

## Style One

Simple list with an avatar, name, preview and time for every conversation, a selected row and a compose button.

:BlockShowcase{blockPath="Chat/ConversationList/BlockConversationList1" component="BlockConversationList1" iframeHeight="560px"}

## Style Two

Inbox with all and unread tabs, bold names and count badges for unread conversations. Opening a conversation marks it read and there is a mark all read action.

:BlockShowcase{blockPath="Chat/ConversationList/BlockConversationList2" component="BlockConversationList2" iframeHeight="600px"}

## Style Three

Conversations grouped by pinned, today, yesterday and earlier, with sticky headings in a scroll area and pin buttons that appear on hover and focus.

:BlockShowcase{blockPath="Chat/ConversationList/BlockConversationList3" component="BlockConversationList3" iframeHeight="640px"}

## Style Four

Searchable list. Matches are highlighted in names and previews, a clear button resets the search, results are announced and pressing slash anywhere jumps to the field.

:BlockShowcase{blockPath="Chat/ConversationList/BlockConversationList4" component="BlockConversationList4" iframeHeight="600px"}

## Style Five

Sidebar with collapsible channels and direct messages sections, unread channels in bold with a count, presence dots on people and a create channel button.

:BlockShowcase{blockPath="Chat/ConversationList/BlockConversationList5" component="BlockConversationList5" iframeHeight="620px"}

## Style Six

Contacts list grouped by letter with sticky headings, online status, search and message and call buttons for each person.

:BlockShowcase{blockPath="Chat/ConversationList/BlockConversationList6" component="BlockConversationList6" iframeHeight="680px"}
