<template>
  <UiContainer class="px-4 py-5 md:px-6">
    <div class="flex flex-col gap-5">
      <div class="flex flex-wrap items-start justify-between gap-3">
        <div class="flex items-start gap-3">
          <slot name="icon">
            <div
              v-if="props.icon"
              class="bg-primary/10 text-primary flex size-14 items-center justify-center rounded-lg"
            >
              <Icon :name="props.icon" class="size-6" />
            </div>
          </slot>
          <div class="flex flex-col gap-1">
            <slot name="title">
              <h1 v-if="props.title" class="text-lg font-bold" v-html="props.title" />
            </slot>
            <slot name="badge">
              <UiBadge v-if="props.badge" variant="outline" class="w-fit">
                {{ props.badge }}
              </UiBadge>
            </slot>
          </div>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <slot>
            <UiButton variant="outline" size="sm">
              <Icon name="lucide:share-2" class="size-4" />
              Share
            </UiButton>
            <UiButton variant="outline" size="sm">
              <Icon name="lucide:settings" class="size-4" />
              Settings
            </UiButton>
            <UiButton size="sm">
              <Icon name="lucide:plus" class="size-4" />
              Create
            </UiButton>
          </slot>
        </div>
      </div>
      <slot name="description">
        <p
          v-if="props.description"
          class="text-muted-foreground text-sm"
          v-html="props.description"
        />
      </slot>
    </div>
    <UiDivider class="my-5" />
  </UiContainer>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      icon?: string;
      badge?: string;
    }>(),
    {
      title: "Projects Dashboard",
      description:
        "Monitor and manage all your projects from one central location. Track progress, assign tasks, and collaborate with your team.",
      icon: "lucide:layout-dashboard",
      badge: "12 Active",
    }
  );
</script>
