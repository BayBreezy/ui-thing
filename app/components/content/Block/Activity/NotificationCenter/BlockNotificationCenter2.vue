<template>
  <!--
    Notifications page with bulk actions
    Features: Full page list with a type filter, a checkbox on every row, select all, a bulk bar to mark as read or delete the selection, unread highlight, load more and an empty state
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-3xl">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 class="text-2xl font-bold tracking-tight">Notifications</h1>
          <p class="text-muted-foreground text-sm" aria-live="polite">{{ unread }} unread</p>
        </div>
        <UiSelect v-model="type">
          <UiSelectTrigger class="w-44" aria-label="Filter by type"
            ><UiSelectValue
          /></UiSelectTrigger>
          <UiSelectContent>
            <UiSelectItem value="all">All types</UiSelectItem>
            <UiSelectItem v-for="(label, key) in kinds" :key="key" :value="key">{{
              label
            }}</UiSelectItem>
          </UiSelectContent>
        </UiSelect>
      </div>

      <div class="mt-5 flex min-h-10 items-center gap-3 border-b pb-3">
        <UiCheckbox
          id="select-all"
          :model-value="allSelected ? true : someSelected ? 'indeterminate' : false"
          :disabled="!visible.length"
          @update:model-value="toggleAll"
        />
        <UiLabel for="select-all" class="text-sm font-normal">Select all</UiLabel>
        <span v-if="selected.size" class="text-muted-foreground text-sm" aria-live="polite"
          >{{ selected.size }} selected</span
        >
        <div v-if="selected.size" class="ml-auto flex gap-2">
          <UiButton variant="outline" size="sm" @click="markSelected"
            ><Icon name="lucide:check-check" class="size-4" />Mark as read</UiButton
          >
          <UiButton variant="outline" size="sm" class="text-destructive" @click="removeSelected"
            ><Icon name="lucide:trash-2" class="size-4" />Delete</UiButton
          >
        </div>
      </div>

      <ul v-if="shown.length" class="divide-y" aria-live="polite">
        <li
          v-for="item in shown"
          :key="item.id"
          class="flex items-start gap-3 py-4"
          :class="item.read ? '' : 'bg-primary/5 -mx-3 rounded-lg px-3'"
        >
          <UiCheckbox
            :id="`row-${item.id}`"
            class="mt-1"
            :model-value="selected.has(item.id)"
            :aria-label="`Select: ${item.actor} ${item.text} ${item.target}`"
            @update:model-value="toggle(item.id)"
          />
          <UiAvatar
            :src="`https://i.pravatar.cc/80?img=${item.avatar}`"
            :fallback="item.actor.slice(0, 1)"
            class="size-9"
          />
          <div class="min-w-0 flex-1">
            <p class="text-sm">
              <span class="font-medium">{{ item.actor }}</span> {{ item.text }}
              <span class="font-medium">{{ item.target }}</span>
            </p>
            <p class="text-muted-foreground mt-0.5 flex items-center gap-2 text-xs">
              {{ ago(item.at) }}
              <UiBadge variant="soft" shape="pill">{{ kinds[item.kind] }}</UiBadge>
            </p>
          </div>
          <span
            v-if="!item.read"
            class="bg-primary mt-2 size-2 shrink-0 rounded-full"
            aria-label="Unread"
          />
        </li>
      </ul>
      <div
        v-else
        class="text-muted-foreground mt-6 rounded-xl border border-dashed py-14 text-center text-sm"
        aria-live="polite"
      >
        <Icon name="lucide:bell-off" class="mx-auto mb-2 size-6" />
        Nothing to show here.
      </div>

      <div v-if="visible.length > limit" class="mt-4 text-center">
        <UiButton variant="outline" @click="limit += 5">Load more</UiButton>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Kind = "comment" | "mention" | "invite" | "system";
  type Notification = {
    id: string;
    kind: Kind;
    actor: string;
    avatar: number;
    text: string;
    target: string;
    at: string;
    read: boolean;
  };

  const props = withDefaults(
    defineProps<{
      now?: string;
      notifications?: Notification[];
    }>(),
    {
      now: "2026-10-18T10:20",
      notifications: () => [
        {
          id: "p1",
          kind: "comment",
          actor: "Maya Patel",
          avatar: 32,
          text: "commented on",
          target: "Homepage redesign",
          at: "2026-10-18T10:05",
          read: false,
        },
        {
          id: "p2",
          kind: "mention",
          actor: "Leo Fischer",
          avatar: 12,
          text: "mentioned you in",
          target: "API rate limits",
          at: "2026-10-18T09:40",
          read: false,
        },
        {
          id: "p3",
          kind: "invite",
          actor: "Sofia Alvarez",
          avatar: 45,
          text: "invited you to",
          target: "Q4 planning",
          at: "2026-10-18T08:15",
          read: false,
        },
        {
          id: "p4",
          kind: "system",
          actor: "Acme",
          avatar: 47,
          text: "finished the export",
          target: "Customers.csv",
          at: "2026-10-17T18:00",
          read: true,
        },
        {
          id: "p5",
          kind: "comment",
          actor: "Noah Kim",
          avatar: 15,
          text: "replied to your comment on",
          target: "Release 2.4",
          at: "2026-10-17T16:30",
          read: true,
        },
        {
          id: "p6",
          kind: "mention",
          actor: "Priya Nair",
          avatar: 44,
          text: "mentioned you in",
          target: "Invoice rounding",
          at: "2026-10-16T11:00",
          read: true,
        },
        {
          id: "p7",
          kind: "invite",
          actor: "Tom Becker",
          avatar: 33,
          text: "invited you to",
          target: "Support rota",
          at: "2026-10-15T09:00",
          read: true,
        },
        {
          id: "p8",
          kind: "comment",
          actor: "Ines Costa",
          avatar: 47,
          text: "commented on",
          target: "Newsletter draft",
          at: "2026-10-14T15:20",
          read: true,
        },
      ],
    }
  );

  const kinds: Record<Kind, string> = {
    comment: "Comments",
    mention: "Mentions",
    invite: "Invites",
    system: "System",
  };

  const items = ref<Notification[]>(props.notifications.map((item) => ({ ...item })));
  const type = ref("all");
  const selected = ref(new Set<string>());
  const limit = ref(5);

  const unread = computed(() => items.value.filter((item) => !item.read).length);
  const visible = computed(() =>
    items.value.filter((item) => type.value === "all" || item.kind === type.value)
  );
  const shown = computed(() => visible.value.slice(0, limit.value));
  const allSelected = computed(
    () => shown.value.length > 0 && shown.value.every((item) => selected.value.has(item.id))
  );
  const someSelected = computed(() => selected.value.size > 0 && !allSelected.value);

  watch(type, () => (selected.value = new Set()));

  function ago(iso: string) {
    const diff = Math.round(
      (new Date(`${props.now}:00Z`).getTime() - new Date(`${iso}:00Z`).getTime()) / 60000
    );
    if (diff < 60) return `${Math.max(diff, 1)}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    const days = Math.floor(diff / 1440);
    return days === 1 ? "Yesterday" : `${days}d ago`;
  }

  function toggle(id: string) {
    const next = new Set(selected.value);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    selected.value = next;
  }

  function toggleAll() {
    selected.value = allSelected.value ? new Set() : new Set(shown.value.map((item) => item.id));
  }

  function markSelected() {
    items.value.forEach((item) => selected.value.has(item.id) && (item.read = true));
    selected.value = new Set();
  }

  function removeSelected() {
    const count = selected.value.size;
    items.value = items.value.filter((item) => !selected.value.has(item.id));
    selected.value = new Set();
    useSonner.success(`Deleted ${count} notification${count > 1 ? "s" : ""}`);
  }
</script>
