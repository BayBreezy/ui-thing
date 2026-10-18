---
title: Files - Uploads
description: "Upload blocks: a dropzone with file validation, multi file progress with pause and cancel, an avatar upload with preview, an image grid with a cover image, an upload dialog with an import from link tab and a failed uploads list with retry."
---

These blocks cover the common upload patterns. The dropzone ones use the `UiDropfile` component and add a real browse button, because the dropzone itself reacts to the mouse only. Files are checked for type, size and duplicates in the browser, and previews come from object URLs that the blocks revoke when they are not needed any more.

No file is sent anywhere. The progress bars are simulated with a timer, so replace them with real upload progress from your request, and check type and size again on the server.

## Style One

Dropzone with a browse button, checks for type, size and duplicates, a list of rejected files and a list of the chosen files.

:BlockShowcase{blockPath="Files/Uploads/BlockUploads1" component="BlockUploads1" iframeHeight="640px"}

## Style Two

Multi file progress with speed and time left, pause and resume, cancel for one file or all and an overall progress bar.

:BlockShowcase{blockPath="Files/Uploads/BlockUploads2" component="BlockUploads2" iframeHeight="560px"}

## Style Three

Avatar upload with an instant preview, type and size checks, remove, cancel and save.

:BlockShowcase{blockPath="Files/Uploads/BlockUploads3" component="BlockUploads3" iframeHeight="480px"}

## Style Four

Image upload with a thumbnail grid, a cover image, a limit counter and remove buttons.

:BlockShowcase{blockPath="Files/Uploads/BlockUploads4" component="BlockUploads4" iframeHeight="760px"}

## Style Five

Upload dialog with an upload tab and an import from link tab. It shows progress and closes when the file is done.

:BlockShowcase{blockPath="Files/Uploads/BlockUploads5" component="BlockUploads5" iframeHeight="560px"}

## Style Six

Failed uploads with a clear reason for each one, retry for network errors, replace file for bad files and a retry all button.

:BlockShowcase{blockPath="Files/Uploads/BlockUploads6" component="BlockUploads6" iframeHeight="640px"}
