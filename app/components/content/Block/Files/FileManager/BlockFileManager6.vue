<template>
  <!--
    Trash
    Features: Deleted files with days left before they are removed for good, restore for one file or a selection, delete forever with a confirmation, an empty trash action with a confirmation and a notice about the 30 day rule
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-3xl">
      <div class="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 class="text-2xl font-bold tracking-tight">Trash</h1>
          <p class="text-muted-foreground text-sm" aria-live="polite">
            {{ items.length }} {{ items.length === 1 ? "item" : "items" }}
          </p>
        </div>
        <UiAlertDialog>
          <UiAlertDialogTrigger as-child>
            <UiButton variant="outline" size="sm" :disabled="!items.length"
              ><Icon name="lucide:trash-2" class="size-4" />Empty trash</UiButton
            >
          </UiAlertDialogTrigger>
          <UiAlertDialogContent>
            <UiAlertDialogHeader>
              <UiAlertDialogTitle>Empty the trash?</UiAlertDialogTitle>
              <UiAlertDialogDescription>
                {{ items.length }} {{ items.length === 1 ? "item" : "items" }} will be deleted
                forever. This cannot be undone.
              </UiAlertDialogDescription>
            </UiAlertDialogHeader>
            <UiAlertDialogFooter>
              <UiAlertDialogCancel>Cancel</UiAlertDialogCancel>
              <UiAlertDialogAction
                class="bg-destructive hover:bg-destructive/90 text-white"
                @click="empty"
                >Delete forever</UiAlertDialogAction
              >
            </UiAlertDialogFooter>
          </UiAlertDialogContent>
        </UiAlertDialog>
      </div>

      <UiAlert
        class="mt-5"
        icon="lucide:info"
        description="Items in the trash are deleted forever after 30 days."
      />

      <div v-if="items.length" class="mt-4">
        <div class="flex min-h-9 items-center gap-3 border-b pb-3">
          <UiCheckbox
            id="trash-all"
            :model-value="allSelected ? true : selected.size ? 'indeterminate' : false"
            @update:model-value="toggleAll"
          />
          <UiLabel for="trash-all" class="text-sm font-normal">Select all</UiLabel>
          <span v-if="selected.size" class="text-muted-foreground text-sm" aria-live="polite"
            >{{ selected.size }} selected</span
          >
          <UiButton v-if="selected.size" size="sm" class="ml-auto" @click="restoreSelected"
            ><Icon name="lucide:undo-2" class="size-4" />Restore</UiButton
          >
        </div>
        <ul class="divide-y" aria-live="polite">
          <li v-for="file in items" :key="file.id" class="flex items-center gap-3 py-3">
            <UiCheckbox
              :model-value="selected.has(file.id)"
              :aria-label="`Select ${file.name}`"
              @update:model-value="toggle(file.id)"
            />
            <Icon :name="file.icon" class="text-muted-foreground size-5 shrink-0" />
            <div class="min-w-0 flex-1">
              <p class="truncate text-sm font-medium">{{ file.name }}</p>
              <p class="text-muted-foreground text-xs">
                {{ file.size }} · deleted {{ file.deleted }}
              </p>
            </div>
            <UiBadge variant="soft" shape="pill" :color="file.daysLeft <= 3 ? 'red' : 'blue'"
              >{{ file.daysLeft }} days left</UiBadge
            >
            <UiButton
              variant="ghost"
              size="sm"
              :aria-label="`Restore ${file.name}`"
              @click="restore(file.id)"
              >Restore</UiButton
            >
            <UiAlertDialog>
              <UiAlertDialogTrigger as-child>
                <UiButton
                  variant="ghost"
                  size="icon-sm"
                  class="text-destructive"
                  :aria-label="`Delete ${file.name} forever`"
                  ><Icon name="lucide:x" class="size-4"
                /></UiButton>
              </UiAlertDialogTrigger>
              <UiAlertDialogContent>
                <UiAlertDialogHeader>
                  <UiAlertDialogTitle>Delete {{ file.name }} forever?</UiAlertDialogTitle>
                  <UiAlertDialogDescription
                    >This file cannot be recovered after you delete it.</UiAlertDialogDescription
                  >
                </UiAlertDialogHeader>
                <UiAlertDialogFooter>
                  <UiAlertDialogCancel>Cancel</UiAlertDialogCancel>
                  <UiAlertDialogAction
                    class="bg-destructive hover:bg-destructive/90 text-white"
                    @click="purge(file.id)"
                    >Delete forever</UiAlertDialogAction
                  >
                </UiAlertDialogFooter>
              </UiAlertDialogContent>
            </UiAlertDialog>
          </li>
        </ul>
      </div>
      <div v-else class="mt-4 rounded-xl border border-dashed py-16 text-center" role="status">
        <Icon name="lucide:trash" class="text-muted-foreground mx-auto size-8" />
        <p class="mt-3 text-sm font-medium">The trash is empty</p>
        <p class="text-muted-foreground mt-1 text-sm">
          Deleted files will show up here for 30 days.
        </p>
        <UiButton variant="outline" size="sm" class="mt-4" @click="reset"
          >Put the samples back</UiButton
        >
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type TrashItem = {
    id: string;
    name: string;
    icon: string;
    size: string;
    deleted: string;
    daysLeft: number;
  };

  const props = withDefaults(
    defineProps<{
      files?: TrashItem[];
    }>(),
    {
      files: () => [
        {
          id: "x1",
          name: "Old logo.svg",
          icon: "lucide:image",
          size: "24 KB",
          deleted: "yesterday",
          daysLeft: 29,
        },
        {
          id: "x2",
          name: "Draft proposal.docx",
          icon: "lucide:file-text",
          size: "120 KB",
          deleted: "5 days ago",
          daysLeft: 25,
        },
        {
          id: "x3",
          name: "Team photo 2025.jpg",
          icon: "lucide:image",
          size: "4.2 MB",
          deleted: "Sep 24",
          daysLeft: 6,
        },
        {
          id: "x4",
          name: "Budget (copy).xlsx",
          icon: "lucide:file-spreadsheet",
          size: "310 KB",
          deleted: "Sep 20",
          daysLeft: 2,
        },
        {
          id: "x5",
          name: "Archive 2024.zip",
          icon: "lucide:file-archive",
          size: "380 MB",
          deleted: "Sep 19",
          daysLeft: 1,
        },
      ],
    }
  );

  const items = ref<TrashItem[]>(props.files.map((file) => ({ ...file })));
  const selected = ref(new Set<string>());

  const allSelected = computed(
    () => items.value.length > 0 && items.value.every((file) => selected.value.has(file.id))
  );

  function toggle(id: string) {
    const next = new Set(selected.value);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    selected.value = next;
  }

  function toggleAll() {
    selected.value = allSelected.value ? new Set() : new Set(items.value.map((file) => file.id));
  }

  function restore(id: string) {
    const file = items.value.find((item) => item.id === id);
    items.value = items.value.filter((item) => item.id !== id);
    selected.value.delete(id);
    if (file) useSonner.success(`Restored ${file.name}`);
  }

  function restoreSelected() {
    const count = selected.value.size;
    items.value = items.value.filter((file) => !selected.value.has(file.id));
    selected.value = new Set();
    useSonner.success(`Restored ${count} ${count === 1 ? "item" : "items"}`);
  }

  function purge(id: string) {
    items.value = items.value.filter((file) => file.id !== id);
    selected.value.delete(id);
    useSonner.success("Deleted forever");
  }

  function empty() {
    items.value = [];
    selected.value = new Set();
    useSonner.success("Trash emptied");
  }

  function reset() {
    items.value = props.files.map((file) => ({ ...file }));
  }
</script>
