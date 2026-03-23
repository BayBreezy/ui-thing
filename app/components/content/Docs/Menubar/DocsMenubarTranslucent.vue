<template>
  <div class="flex w-full items-center justify-center">
    <UiMenubar>
      <UiMenubarMenu value="file">
        <UiMenubarTrigger class="cursor-pointer">File</UiMenubarTrigger>
        <UiMenubarContent translucent>
          <UiMenubarItem title="New Tab" shortcut="⌘T" />
          <UiMenubarItem title="New Window" shortcut="⌘N" />
          <UiMenubarSeparator />
          <UiMenubarItem title="Open Location..." shortcut="⌘L" />
          <UiMenubarItem title="Close Tab" shortcut="⌘W" />
          <UiMenubarSeparator />
          <UiMenubarItem title="Print..." shortcut="⌘P" />
        </UiMenubarContent>
      </UiMenubarMenu>

      <UiMenubarMenu value="window">
        <UiMenubarTrigger class="cursor-pointer">Window</UiMenubarTrigger>
        <UiMenubarContent translucent>
          <UiMenubarItem title="Minimize" shortcut="⌘M" />
          <UiMenubarItem title="Zoom" />
          <UiMenubarSeparator />
          <UiMenubarItem title="Move to Left Side" />
          <UiMenubarItem title="Move to Right Side" />
          <UiMenubarSeparator />
          <UiMenubarItem title="Bring All to Front" />
        </UiMenubarContent>
      </UiMenubarMenu>

      <UiMenubarMenu value="help">
        <UiMenubarTrigger class="cursor-pointer">Help</UiMenubarTrigger>
        <UiMenubarContent translucent class="w-56">
          <UiMenubarItem title="Documentation" icon="lucide:book-open" />
          <UiMenubarItem title="Keyboard Shortcuts" icon="lucide:keyboard" shortcut="⌘/" />
          <UiMenubarSeparator />
          <UiMenubarItem title="Report an Issue" icon="lucide:bug" />
          <UiMenubarItem title="About" icon="lucide:info" />
        </UiMenubarContent>
      </UiMenubarMenu>
    </UiMenubar>
  </div>
</template>
