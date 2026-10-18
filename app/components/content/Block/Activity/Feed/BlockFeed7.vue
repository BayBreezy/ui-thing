<template>
  <!--
    Feed with filter chips
    Features: Toggle chips for each activity type with counts, several filters at once, a clear filters button, a result count and an empty state with a reset link
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-2xl">
      <h1 class="text-2xl font-bold tracking-tight">Activity</h1>

      <div class="mt-4 flex flex-wrap items-center gap-2" role="group" aria-label="Filter by type">
        <UiButton
          v-for="type in types"
          :key="type.value"
          size="sm"
          :variant="active.has(type.value) ? 'default' : 'outline'"
          class="rounded-full"
          :aria-pressed="active.has(type.value)"
          @click="toggle(type.value)"
        >
          <Icon :name="type.icon" class="size-4" />{{ type.label }}
          <span class="text-xs opacity-70">{{ count(type.value) }}</span>
        </UiButton>
        <UiButton v-if="active.size" variant="ghost" size="sm" @click="active = new Set()"
          >Clear filters</UiButton
        >
      </div>
      <p class="text-muted-foreground mt-3 text-sm" aria-live="polite">
        Showing {{ visible.length }} of {{ items.length }} updates
      </p>

      <ul v-if="visible.length" class="mt-4 divide-y rounded-xl border">
        <li v-for="item in visible" :key="item.id" class="flex items-start gap-3 px-4 py-3.5">
          <span class="bg-muted grid size-8 shrink-0 place-items-center rounded-full"
            ><Icon :name="iconOf(item.type)" class="size-4"
          /></span>
          <div class="min-w-0 flex-1">
            <p class="text-sm">
              <span class="font-medium">{{ item.who }}</span> {{ item.text }}
              <span class="font-medium">{{ item.target }}</span>
            </p>
            <p class="text-muted-foreground mt-0.5 text-xs">{{ item.when }}</p>
          </div>
          <UiBadge variant="soft" shape="pill">{{ labelOf(item.type) }}</UiBadge>
        </li>
      </ul>
      <div
        v-else
        class="mt-4 rounded-xl border border-dashed px-6 py-12 text-center"
        aria-live="polite"
      >
        <Icon name="lucide:filter-x" class="text-muted-foreground mx-auto size-6" />
        <p class="mt-2 text-sm font-medium">No updates match these filters</p>
        <UiButton variant="link" size="sm" @click="active = new Set()">Show everything</UiButton>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Type = "comment" | "deploy" | "issue" | "doc";
  type Item = { id: string; type: Type; who: string; text: string; target: string; when: string };

  const props = withDefaults(
    defineProps<{
      items?: Item[];
    }>(),
    {
      items: () => [
        {
          id: "i1",
          type: "comment",
          who: "Maya Patel",
          text: "commented on",
          target: "Homepage redesign",
          when: "10 minutes ago",
        },
        {
          id: "i2",
          type: "deploy",
          who: "Noah Kim",
          text: "deployed",
          target: "Release 2.4 to production",
          when: "2 hours ago",
        },
        {
          id: "i3",
          type: "issue",
          who: "Leo Fischer",
          text: "opened",
          target: "Rate limits return 500",
          when: "3 hours ago",
        },
        {
          id: "i4",
          type: "doc",
          who: "Sofia Alvarez",
          text: "updated",
          target: "Onboarding guide",
          when: "Yesterday",
        },
        {
          id: "i5",
          type: "comment",
          who: "Priya Nair",
          text: "replied in",
          target: "Invoice rounding",
          when: "Yesterday",
        },
        {
          id: "i6",
          type: "issue",
          who: "Tom Becker",
          text: "closed",
          target: "Broken avatar upload",
          when: "2 days ago",
        },
        {
          id: "i7",
          type: "deploy",
          who: "Ines Costa",
          text: "deployed",
          target: "Marketing site to staging",
          when: "3 days ago",
        },
      ],
    }
  );

  const types: { value: Type; label: string; icon: string }[] = [
    { value: "comment", label: "Comments", icon: "lucide:message-square" },
    { value: "deploy", label: "Deploys", icon: "lucide:rocket" },
    { value: "issue", label: "Issues", icon: "lucide:circle-dot" },
    { value: "doc", label: "Docs", icon: "lucide:file-text" },
  ];

  const active = ref(new Set<Type>());

  const iconOf = (type: Type) => types.find((item) => item.value === type)!.icon;
  const labelOf = (type: Type) =>
    types.find((item) => item.value === type)!.label.replace(/s$/, "");
  const count = (type: Type) => props.items.filter((item) => item.type === type).length;
  const visible = computed(() =>
    props.items.filter((item) => active.value.size === 0 || active.value.has(item.type))
  );

  function toggle(type: Type) {
    const next = new Set(active.value);
    if (next.has(type)) next.delete(type);
    else next.add(type);
    active.value = next;
  }
</script>
