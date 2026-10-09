<template>
  <div class="flex w-full items-center justify-center">
    <UiDropdownMenu @update:open="(open) => !open && (search = '')">
      <UiDropdownMenuTrigger as-child>
        <UiButton variant="outline">Filter actions</UiButton>
      </UiDropdownMenuTrigger>
      <UiDropdownMenuContent class="w-56">
        <UiDropdownMenuFilter
          v-model="search"
          auto-focus
          aria-label="Filter actions"
          placeholder="Filter actions…"
        />
        <UiDropdownMenuItem
          v-for="action in filteredActions"
          :key="action.title"
          :title="action.title"
          :icon="action.icon"
          :shortcut="action.shortcut"
          :text-value="action.title"
        />
        <p
          v-if="!filteredActions.length"
          class="text-muted-foreground px-2 py-4 text-center text-sm"
        >
          No actions found.
        </p>
      </UiDropdownMenuContent>
    </UiDropdownMenu>
  </div>
</template>

<script lang="ts" setup>
  import { useFilter } from "reka-ui";

  const actions = [
    { title: "Copy", icon: "ph:copy", shortcut: "⌘C" },
    { title: "Cut", icon: "ph:scissors", shortcut: "⌘X" },
    { title: "Paste", icon: "ph:clipboard", shortcut: "⌘V" },
    { title: "Duplicate", icon: "ph:files", shortcut: "⌘D" },
    { title: "Rename", icon: "ph:pencil-simple", shortcut: "F2" },
    { title: "Move to folder", icon: "ph:folder-simple", shortcut: "⇧⌘M" },
    { title: "Share", icon: "ph:share-network", shortcut: "⇧⌘S" },
    { title: "Archive", icon: "ph:archive", shortcut: "⌘E" },
  ];

  const search = ref("");
  const { contains } = useFilter({ sensitivity: "base" });

  const filteredActions = computed(() =>
    search.value ? actions.filter((action) => contains(action.title, search.value)) : actions
  );
</script>
