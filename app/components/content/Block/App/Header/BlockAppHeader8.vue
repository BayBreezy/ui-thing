<template>
  <!--
    Edit page header with an editable title and unsaved changes state
    Features: Back button, inline editable title, saved and unsaved indicator, discard and save buttons that enable on change, saving spinner, blurred sticky bar
  -->
  <header
    class="bg-background/80 supports-backdrop-filter:bg-background/60 sticky top-0 z-10 border-b backdrop-blur"
  >
    <UiContainer class="flex flex-wrap items-center justify-between gap-3 px-4 py-3 md:px-8">
      <div class="flex min-w-0 items-center gap-3">
        <slot name="back">
          <UiButton variant="ghost" size="icon" aria-label="Go back">
            <Icon name="lucide:arrow-left" class="size-4" />
          </UiButton>
        </slot>
        <div class="min-w-0">
          <slot name="title">
            <input
              v-model="title"
              class="hover:bg-muted focus:bg-muted focus:ring-ring/40 -mx-1.5 w-full max-w-xs rounded-md bg-transparent px-1.5 py-0.5 text-lg font-bold tracking-tight outline-none focus:ring-2"
              aria-label="Page title"
            />
          </slot>
          <p class="text-muted-foreground flex items-center gap-1.5 px-0 text-xs">
            <span
              class="size-1.5 rounded-full transition-colors"
              :class="
                saving ? 'animate-pulse bg-blue-500' : dirty ? 'bg-amber-500' : 'bg-green-500'
              "
            />
            {{ saving ? "Saving…" : dirty ? "Unsaved changes" : `Saved ${savedAt}` }}
          </p>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <slot>
          <UiDropdownMenu>
            <UiDropdownMenuTrigger as-child>
              <UiButton variant="ghost" size="icon" aria-label="More actions">
                <Icon name="lucide:ellipsis" class="size-4" />
              </UiButton>
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent align="end">
              <UiDropdownMenuItem icon="lucide:history" title="Version history" />
              <UiDropdownMenuItem icon="lucide:copy" title="Duplicate" />
              <UiDropdownMenuSeparator />
              <UiDropdownMenuItem variant="destructive" icon="lucide:trash-2" title="Delete" />
            </UiDropdownMenuContent>
          </UiDropdownMenu>
          <UiButton variant="outline" :disabled="!dirty || saving" @click="discard"
            >Discard</UiButton
          >
          <UiButton :disabled="!dirty || saving" @click="save">
            <Icon v-if="saving" name="lucide:loader-circle" class="size-4 animate-spin" />
            Save changes
          </UiButton>
        </slot>
      </div>
    </UiContainer>
  </header>
</template>

<script lang="ts" setup>
  const props = withDefaults(defineProps<{ title?: string }>(), {
    title: "Edit user profile",
  });

  const title = ref(props.title);
  const saved = ref(props.title);
  const saving = ref(false);
  const savedAt = ref("2 minutes ago");

  const dirty = computed(() => title.value !== saved.value);

  function discard() {
    title.value = saved.value;
  }

  async function save() {
    saving.value = true;
    await new Promise((resolve) => setTimeout(resolve, 900));
    saved.value = title.value;
    saving.value = false;
    savedAt.value = "just now";
    useSonner.success("Changes saved");
  }
</script>
