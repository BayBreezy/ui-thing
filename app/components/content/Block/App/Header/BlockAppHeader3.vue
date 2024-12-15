<template>
  <UiContainer>
    <div
      class="flex flex-col flex-wrap justify-between gap-5 px-4 py-5 md:flex-row md:items-center md:px-6"
    >
      <div class="flex items-center gap-5">
        <div>
          <slot name="title">
            <p v-if="props.title" class="text-lg font-semibold" v-html="props.title" />
          </slot>
          <slot name="description">
            <p v-if="props.description" class="text-muted-foreground" v-html="props.description" />
          </slot>
        </div>
      </div>
      <div class="flex flex-wrap items-center gap-3">
        <slot>
          <UiButton variant="outline" size="sm">Download</UiButton>
          <UiButton size="sm">Add new</UiButton>
        </slot>
      </div>
    </div>
    <UiDivider class="my-5" />
  </UiContainer>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
    }>(),
    {
      title: "Team Members",
      description: "Manage your team members here",
    }
  );
</script>
