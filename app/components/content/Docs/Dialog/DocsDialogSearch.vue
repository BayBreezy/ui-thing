<template>
  <div class="mx-auto flex max-w-sm justify-center">
    <UiButton class="w-full" variant="outline" @click="dialog = !dialog">
      <Icon
        name="lucide:search"
        class="size-4 shrink-0 text-muted-foreground/80"
        aria-hidden="true"
      />
      <span class="font-normal text-muted-foreground/70">Search</span>

      <UiKbd class="ml-auto"> ⌘+Shift+K </UiKbd>
    </UiButton>
    <UiCommandDialog v-model:open="dialog">
      <UiDialogTitle class="sr-only">Search commands</UiDialogTitle>
      <UiDialogDescription class="sr-only">
        Use the arrow keys to navigate and press Enter to select a command.
      </UiDialogDescription>
      <UiCommandInput placeholder="Type a UiCommand or search..." />
      <UiCommandList>
        <UiCommandEmpty>No results found.</UiCommandEmpty>
        <template v-for="(group, i) in groups" :key="i">
          <UiCommandGroup class="p-2" :heading="group.heading">
            <UiCommandItem v-for="(child, j) in group.items" :key="j" :value="child.value">
              <Icon :name="child.icon" class="size-4 opacity-60" aria-hidden="true" />
              <span>{{ child.text }}</span>
              <UiCommandShortcut v-if="child.shortcut" class="justify-center">{{
                child.shortcut
              }}</UiCommandShortcut>
            </UiCommandItem>
          </UiCommandGroup>
          <UiCommandSeparator v-if="i < groups.length - 1" />
        </template>
      </UiCommandList>
    </UiCommandDialog>
  </div>
</template>

<script lang="ts" setup>
  const dialog = ref(false);

  useEventListener("keydown", (e) => {
    if (e.key === "k" && (e.metaKey || e.ctrlKey) && e.shiftKey) {
      e.preventDefault();
      dialog.value = !dialog.value;
    }
  });

  const groups = [
    {
      heading: "Quick start",
      items: [
        { icon: "lucide:folder-plus", text: "New folder", shortcut: "⌘N", value: "new-folder" },
        {
          icon: "lucide:file-input",
          text: "Import document",
          shortcut: "⌘I",
          value: "import-document",
        },
        {
          icon: "lucide:circle-fading-plus",
          text: "Add block",
          shortcut: "⌘B",
          value: "add-block",
        },
      ],
    },
    {
      heading: "Navigation",
      items: [
        {
          icon: "lucide:arrow-up-right",
          text: "Go to dashboard",
          value: "go-to-dashboard",
          shortcut: "",
        },
        { icon: "lucide:arrow-up-right", text: "Go to apps", value: "go-to-apps", shortcut: "" },
        {
          icon: "lucide:arrow-up-right",
          text: "Go to connections",
          value: "go-to-connections",
          shortcut: "",
        },
      ],
    },
  ];
</script>
