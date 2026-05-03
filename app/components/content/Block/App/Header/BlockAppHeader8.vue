<template>
  <div class="bg-muted/30 border-b">
    <UiContainer class="px-4 py-5 md:px-6">
      <div class="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div class="flex items-start gap-4">
          <slot name="back">
            <UiButton variant="ghost" size="sm" title="Go back">
              <Icon name="lucide:arrow-left" class="size-4" />
              <span class="sr-only">Back</span>
            </UiButton>
          </slot>
          <div class="flex flex-col gap-1">
            <slot name="title">
              <h1 v-if="props.title" class="text-lg leading-none font-bold" v-html="props.title" />
            </slot>
            <slot name="subtitle">
              <p
                v-if="props.subtitle"
                class="text-muted-foreground text-xs"
                v-html="props.subtitle"
              />
            </slot>
          </div>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <slot>
            <UiDropdownMenu>
              <UiDropdownMenuTrigger as-child>
                <UiButton variant="ghost" size="sm" title="More options">
                  <Icon name="lucide:more-horizontal" class="size-4" />
                  <span class="sr-only"> More options </span>
                </UiButton>
              </UiDropdownMenuTrigger>
              <UiDropdownMenuContent>
                <UiDropdownMenuItem title="Delete" icon="lucide:trash-2" variant="destructive" />
                <UiDropdownMenuItem title="Duplicate" icon="lucide:copy" />
                <UiDropdownMenuItem title="Share" icon="lucide:share-2" />
                <UiDropdownMenuItem title="Move" icon="lucide:folder" />
                <UiDropdownMenuItem title="Copy Link" icon="lucide:link" />
              </UiDropdownMenuContent>
            </UiDropdownMenu>
            <UiSeparator orientation="vertical" class="mx-1 h-6" />
            <UiButton variant="outline" size="sm">Cancel</UiButton>
            <UiButton size="sm">Save changes</UiButton>
          </slot>
        </div>
      </div>
    </UiContainer>
  </div>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      title?: string;
      subtitle?: string;
    }>(),
    {
      title: "Edit User Profile",
      subtitle: "Last saved 2 minutes ago",
    }
  );
</script>
