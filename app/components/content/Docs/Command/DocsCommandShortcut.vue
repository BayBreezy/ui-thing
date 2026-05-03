<template>
  <div class="flex flex-col items-center justify-center">
    <p class="text-muted-foreground text-sm">
      Press
      <UiKbd variant="outline"> ⌘J </UiKbd>
    </p>
    <UiCommandDialog v-model:open="open">
      <UiCommandInput placeholder="Type a command or search..." />
      <UiCommandList>
        <UiCommandEmpty>No results found.</UiCommandEmpty>
        <UiCommandGroup heading="Navigation">
          <UiCommandItem value="home" text="Home" icon="lucide:home" />
          <UiCommandItem value="inbox" text="Inbox" icon="lucide:inbox" />
          <UiCommandItem value="documents" text="Documents" icon="lucide:file-text" />
          <UiCommandItem value="folders" text="Folders" icon="lucide:folder" />
        </UiCommandGroup>
        <UiCommandSeparator />
        <UiCommandGroup heading="Actions">
          <UiCommandItem value="new-file" text="New File" icon="lucide:plus" shortcut="⌘N" />
          <UiCommandItem
            value="new-window"
            text="New Window"
            icon="lucide:app-window"
            shortcut="⌘⇧N"
          />
          <UiCommandItem
            value="new-folder"
            text="New Folder"
            icon="lucide:folder-plus"
            shortcut="⌘,"
          />
          <UiCommandItem value="copy" text="Copy" icon="lucide:copy" shortcut="⌘C" />
          <UiCommandItem value="cut" text="Cut" icon="lucide:scissors" shortcut="⌘X" />
          <UiCommandItem value="paste" text="Paste" icon="lucide:clipboard" shortcut="⌘V" />
          <UiCommandItem value="delete" text="Delete" icon="lucide:trash" shortcut="⌘⌫" />
        </UiCommandGroup>
        <UiCommandSeparator />
        <UiCommandGroup heading="Suggestions">
          <UiCommandItem value="calendar" text="Calendar" icon="lucide:calendar-days" />
          <UiCommandItem value="search-emoji" text="Emoji" icon="lucide:smile-plus" />
          <UiCommandItem value="calculator" disabled text="Calculator" icon="lucide:calculator" />
        </UiCommandGroup>
        <UiCommandSeparator />
        <UiCommandGroup heading="Settings">
          <UiCommandItem value="profile"> Profile </UiCommandItem>
          <UiCommandItem value="billing"> Billing </UiCommandItem>
          <UiCommandItem value="settings"> Settings </UiCommandItem>
        </UiCommandGroup>
      </UiCommandList>
      <UiCommandFooter />
    </UiCommandDialog>
  </div>
</template>

<script setup lang="ts">
  import { useMagicKeys } from "@vueuse/core";

  const open = ref(false);

  const { Meta_J, Ctrl_J } = useMagicKeys({
    passive: false,
    onEventFired(e) {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) e.preventDefault();
    },
  });

  watch([Meta_J, Ctrl_J], (v) => {
    if (v[0] || v[1]) open.value = !open.value;
  });
</script>
