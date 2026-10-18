---
title: Files - File Manager
description: "File manager blocks: a grid with previews and selection, a sortable file table, a folder browser with breadcrumbs and a toolbar, a sidebar folder tree, recent files and a trash with restore and delete forever."
---

These blocks are the building pieces of a file manager. They take typed props with fictional files, folders and people, plus a `now` prop where they show relative dates, so the demos stay stable. The photos are placeholders from Unsplash.

Selection, sorting, renaming, deleting and restoring only change local state. Connect the handlers to your storage API, and use signed URLs for downloads. The folder tree uses the `UiTree` component, so arrow keys expand, collapse and move between folders.

## Style One

File grid with image previews, a checkbox on every card, a bulk bar, search, sorting and inline rename from the card menu.

:BlockShowcase{blockPath="Files/FileManager/BlockFileManager1" component="BlockFileManager1" iframeHeight="760px"}

## Style Two

File table with sortable columns, a star toggle, row selection and a bulk bar.

:BlockShowcase{blockPath="Files/FileManager/BlockFileManager2" component="BlockFileManager2" iframeHeight="680px"}

## Style Three

Folder browser with breadcrumbs, a back button, a new folder dialog, a grid and list toggle and search.

:BlockShowcase{blockPath="Files/FileManager/BlockFileManager3" component="BlockFileManager3" iframeHeight="640px"}

## Style Four

Sidebar folder tree with item counts and a storage meter. The selected folder drives the file list.

:BlockShowcase{blockPath="Files/FileManager/BlockFileManager4" component="BlockFileManager4" iframeHeight="640px"}

## Style Five

Recent files grouped by day with a quick access row of folders, a type filter and star and share actions.

:BlockShowcase{blockPath="Files/FileManager/BlockFileManager5" component="BlockFileManager5" iframeHeight="780px"}

## Style Six

Trash with days left for each file, restore, delete forever and empty trash, all behind confirmation dialogs.

:BlockShowcase{blockPath="Files/FileManager/BlockFileManager6" component="BlockFileManager6" iframeHeight="680px"}
