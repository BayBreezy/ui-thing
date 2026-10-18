<template>
  <!--
    Compact activity sidebar widget
    Features: Narrow card with small avatar rows built from the Item component, one line per event with a relative time, a new badge on unseen events, a mark as seen action and a view all link
  -->
  <UiContainer class="py-12 lg:py-20">
    <UiCard class="mx-auto w-full max-w-xs gap-0 py-0">
      <div class="flex items-center justify-between px-4 py-3">
        <h1 class="text-sm font-semibold">Activity</h1>
        <UiButton
          variant="ghost"
          size="sm"
          class="h-7 px-2 text-xs"
          :disabled="!fresh"
          @click="seen = true"
          >Mark as seen</UiButton
        >
      </div>
      <UiItemGroup class="border-t">
        <template v-for="(item, index) in items" :key="item.id">
          <UiItem size="sm" class="rounded-none">
            <UiItemMedia>
              <UiAvatar
                :src="`https://i.pravatar.cc/80?img=${item.avatar}`"
                :fallback="item.who.slice(0, 1)"
                class="size-7"
              />
            </UiItemMedia>
            <UiItemContent>
              <UiItemTitle class="text-xs leading-snug font-normal">
                <span
                  ><span class="font-medium">{{ item.who }}</span> {{ item.text }}</span
                >
              </UiItemTitle>
              <UiItemDescription class="text-xs">{{ item.when }}</UiItemDescription>
            </UiItemContent>
            <UiItemActions v-if="item.fresh && !seen">
              <UiBadge variant="soft" color="blue" shape="pill">New</UiBadge>
            </UiItemActions>
          </UiItem>
          <UiItemSeparator v-if="index < items.length - 1" />
        </template>
      </UiItemGroup>
      <div class="border-t px-4 py-2">
        <UiButton
          variant="link"
          size="sm"
          class="h-auto p-0 text-xs"
          @click="useSonner.info('Open the full activity page here')"
          >View all activity</UiButton
        >
      </div>
    </UiCard>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Item = {
    id: string;
    who: string;
    avatar: number;
    text: string;
    when: string;
    fresh?: boolean;
  };

  const props = withDefaults(
    defineProps<{
      items?: Item[];
    }>(),
    {
      items: () => [
        {
          id: "c1",
          who: "Maya",
          avatar: 32,
          text: "commented on Homepage redesign",
          when: "10m ago",
          fresh: true,
        },
        {
          id: "c2",
          who: "Leo",
          avatar: 12,
          text: "opened a pull request",
          when: "1h ago",
          fresh: true,
        },
        { id: "c3", who: "Noah", avatar: 15, text: "deployed Release 2.4", when: "2h ago" },
        { id: "c4", who: "Sofia", avatar: 45, text: "updated the roadmap", when: "Yesterday" },
        { id: "c5", who: "Priya", avatar: 44, text: "joined the team", when: "Mon" },
      ],
    }
  );

  const seen = ref(false);
  const fresh = computed(() => !seen.value && props.items.some((item) => item.fresh));
</script>
