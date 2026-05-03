<template>
  <UiContainer
    class="flex flex-col flex-wrap justify-between gap-5 px-4 py-5 md:flex-row md:items-center md:px-6"
  >
    <div class="flex items-center gap-5">
      <slot name="avatar">
        <UiAvatar v-if="props.avatar" :src="props.avatar" class="size-8 md:size-10" />
      </slot>
      <div class="flex flex-col gap-1 *:leading-none">
        <slot name="title">
          <p v-if="props.title" class="font-semibold" v-html="props.title" />
        </slot>
        <slot name="description">
          <p
            v-if="props.description"
            class="text-muted-foreground text-sm"
            v-html="props.description"
          />
        </slot>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-3 md:flex md:flex-wrap md:items-center">
      <slot>
        <UiButton variant="outline" size="sm">Download</UiButton>
        <UiButton size="sm">Add new</UiButton>
      </slot>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      avatar?: string;
    }>(),
    {
      title: "Team Members",
      description: "Manage your team members here",
      avatar: "https://randomuser.me/api/portraits/med/men/2.jpg",
    }
  );
</script>
