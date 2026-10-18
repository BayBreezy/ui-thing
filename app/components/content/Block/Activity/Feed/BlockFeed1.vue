<template>
  <!--
    Simple activity feed
    Features: A plain list of events with a round icon for each kind, a short sentence, a relative time, a divider line between events and a load more button
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-xl">
      <h1 class="text-2xl font-bold tracking-tight">Recent activity</h1>
      <ul class="mt-6" aria-live="polite">
        <li v-for="(item, index) in shown" :key="item.id" class="relative flex gap-4 pb-6">
          <span
            v-if="index < shown.length - 1"
            class="bg-border absolute top-9 bottom-0 left-[1.0625rem] w-px"
            aria-hidden="true"
          />
          <span class="bg-muted relative grid size-9 shrink-0 place-items-center rounded-full">
            <Icon :name="icons[item.kind]" class="size-4" />
          </span>
          <div class="min-w-0 flex-1 pt-1.5">
            <p class="text-sm">
              <span class="font-medium">{{ item.who }}</span> {{ item.text }}
              <span v-if="item.target" class="font-medium">{{ item.target }}</span>
            </p>
            <p class="text-muted-foreground mt-0.5 text-xs">{{ ago(item.at) }}</p>
          </div>
        </li>
      </ul>
      <UiButton v-if="count < items.length" variant="outline" class="w-full" @click="count += 3"
        >Load more</UiButton
      >
      <p v-else class="text-muted-foreground text-center text-sm">That is everything so far.</p>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Kind = "create" | "edit" | "comment" | "complete" | "invite";
  type Item = { id: string; kind: Kind; who: string; text: string; target?: string; at: string };

  const props = withDefaults(
    defineProps<{
      now?: string;
      items?: Item[];
    }>(),
    {
      now: "2026-10-18T10:20",
      items: () => [
        {
          id: "f1",
          kind: "create",
          who: "Maya Patel",
          text: "created the project",
          target: "Homepage redesign",
          at: "2026-10-18T10:02",
        },
        {
          id: "f2",
          kind: "comment",
          who: "Leo Fischer",
          text: "commented on",
          target: "API rate limits",
          at: "2026-10-18T09:30",
        },
        {
          id: "f3",
          kind: "complete",
          who: "Noah Kim",
          text: "completed",
          target: "Release 2.4",
          at: "2026-10-18T08:10",
        },
        {
          id: "f4",
          kind: "edit",
          who: "Sofia Alvarez",
          text: "edited the roadmap",
          at: "2026-10-17T17:20",
        },
        {
          id: "f5",
          kind: "invite",
          who: "Priya Nair",
          text: "invited Tom Becker to the team",
          at: "2026-10-17T14:00",
        },
        {
          id: "f6",
          kind: "create",
          who: "Ines Costa",
          text: "created the doc",
          target: "Launch checklist",
          at: "2026-10-16T09:45",
        },
        {
          id: "f7",
          kind: "complete",
          who: "Tom Becker",
          text: "completed",
          target: "Fix invoice rounding",
          at: "2026-10-15T16:05",
        },
      ],
    }
  );

  const icons: Record<Kind, string> = {
    create: "lucide:plus",
    edit: "lucide:pencil",
    comment: "lucide:message-square",
    complete: "lucide:circle-check",
    invite: "lucide:user-plus",
  };

  const count = ref(4);
  const shown = computed(() => props.items.slice(0, count.value));

  function ago(iso: string) {
    const diff = Math.round(
      (new Date(`${props.now}:00Z`).getTime() - new Date(`${iso}:00Z`).getTime()) / 60000
    );
    if (diff < 1) return "Just now";
    if (diff < 60) return `${diff} minutes ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)} hours ago`;
    const days = Math.floor(diff / 1440);
    return days === 1 ? "Yesterday" : `${days} days ago`;
  }
</script>
