<template>
  <div class="flex w-full items-center justify-center">
    <UiMenubar>
      <UiMenubarMenu value="file">
        <UiMenubarTrigger class="cursor-pointer">File</UiMenubarTrigger>
        <UiMenubarContent>
          <UiMenubarItem title="New File" shortcut="⌘N" />
          <UiMenubarItem title="Open..." shortcut="⌘O" />
          <UiMenubarItem title="Save" shortcut="⌘S" />
          <UiMenubarItem title="Save As..." shortcut="⇧⌘S" />
          <UiMenubarSeparator />
          <UiMenubarItem title="Close Window" shortcut="⌘W" />
        </UiMenubarContent>
      </UiMenubarMenu>

      <UiMenubarMenu value="edit">
        <UiMenubarTrigger class="cursor-pointer">Edit</UiMenubarTrigger>
        <UiMenubarContent>
          <UiMenubarItem title="Undo" shortcut="⌘Z" />
          <UiMenubarItem title="Redo" shortcut="⇧⌘Z" />
          <UiMenubarSeparator />
          <UiMenubarItem title="Cut" shortcut="⌘X" />
          <UiMenubarItem title="Copy" shortcut="⌘C" />
          <UiMenubarItem title="Paste" shortcut="⌘V" />
          <UiMenubarSeparator />
          <UiMenubarItem title="Select All" shortcut="⌘A" />
        </UiMenubarContent>
      </UiMenubarMenu>

      <UiMenubarMenu value="format">
        <UiMenubarTrigger class="cursor-pointer">Format</UiMenubarTrigger>
        <UiMenubarContent>
          <UiMenubarItem title="Bold" shortcut="⌘B" />
          <UiMenubarItem title="Italic" shortcut="⌘I" />
          <UiMenubarItem title="Underline" shortcut="⌘U" />
          <UiMenubarSeparator />
          <UiMenubarItem title="Strikethrough" disabled />
          <UiMenubarItem title="Superscript" disabled />
        </UiMenubarContent>
      </UiMenubarMenu>
    </UiMenubar>
  </div>
</template>
