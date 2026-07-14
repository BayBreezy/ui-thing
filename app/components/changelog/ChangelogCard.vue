<template>
  <UiCard
    data-slot="changelog-card"
    :class="[
      'bg-card/50 @container',
      variant === 'compact' ? 'cursor-pointer transition-shadow hover:shadow-md' : '',
    ]"
    @click="variant === 'compact' && emit('select', entry)"
  >
    <UiCardHeader
      class="@max-[440px]:flex @max-[440px]:flex-col @max-[440px]:items-start @max-[440px]:gap-2"
    >
      <UiCardTitle as="h3">{{ entry.title }}</UiCardTitle>
      <UiCardAction class="flex items-center gap-1.5">
        <UiBadge v-if="entry.breaking" variant="destructive" size="sm">Breaking</UiBadge>
        <UiBadge :variant="categoryMeta.badge" size="sm">{{ categoryMeta.label }}</UiBadge>
        <UiButton
          :href="`/changelog/${entry.slug}`"
          variant="ghost"
          size="icon-sm"
          class="size-7"
          title="View permalink"
          @click.stop
        >
          <Icon name="lucide:link" class="size-3.5" />
        </UiButton>
      </UiCardAction>
      <UiCardDescription :description="formatChangelogDate(entry.date)" />
    </UiCardHeader>
    <UiCardContent>
      <ChangelogDetail v-if="variant === 'full'" :entry="entry" />
      <p v-else class="text-muted-foreground line-clamp-3 text-sm">{{ entry.summary }}</p>
    </UiCardContent>
  </UiCard>
</template>

<script setup lang="ts">
  import {
    CHANGELOG_CATEGORIES,
    formatChangelogDate,
    type ChangelogEntry,
  } from "@/utils/changelog";

  const props = withDefaults(
    defineProps<{
      entry: ChangelogEntry;
      variant?: "full" | "compact";
    }>(),
    { variant: "compact" }
  );

  const emit = defineEmits<{ select: [entry: ChangelogEntry] }>();

  const categoryMeta = computed(() => CHANGELOG_CATEGORIES[props.entry.category]);
</script>
