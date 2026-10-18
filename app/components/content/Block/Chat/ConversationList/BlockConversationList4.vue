<template>
  <!--
    Searchable conversation list
    Features: Search field with a clear button, matches highlighted in names and previews, result count announced to screen readers, no results state with a suggestion and a keyboard shortcut hint
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-md overflow-hidden rounded-xl border">
      <div class="border-b p-3">
        <div class="relative">
          <UiLabel for="chat-search" class="sr-only">Search conversations</UiLabel>
          <Icon
            name="lucide:search"
            class="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
          />
          <UiInput
            id="chat-search"
            v-model="query"
            placeholder="Search conversations"
            class="px-9"
          />
          <button
            v-if="query"
            type="button"
            class="text-muted-foreground hover:text-foreground absolute top-1/2 right-2 -translate-y-1/2 rounded p-1"
            aria-label="Clear search"
            @click="query = ''"
          >
            <Icon name="lucide:x" class="size-4" />
          </button>
          <UiKbd v-else class="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2"
            >/</UiKbd
          >
        </div>
        <p class="sr-only" aria-live="polite">{{ rows.length }} conversations found</p>
      </div>
      <ul v-if="rows.length" class="divide-y" role="list">
        <li v-for="chat in rows" :key="chat.id">
          <button
            type="button"
            class="hover:bg-muted/50 focus-visible:ring-ring/50 flex w-full items-center gap-3 px-4 py-3 text-left outline-none focus-visible:ring-[3px] focus-visible:ring-inset"
          >
            <UiAvatar :src="chat.avatar" :fallback="chat.name[0]" class="size-10" />
            <span class="min-w-0 flex-1">
              <span class="block truncate font-medium">
                <template v-for="(part, i) in highlight(chat.name)" :key="i">
                  <mark
                    v-if="part.match"
                    class="rounded-sm bg-yellow-200 text-inherit dark:bg-yellow-500/40"
                    >{{ part.text }}</mark
                  >
                  <template v-else>{{ part.text }}</template>
                </template>
              </span>
              <span class="text-muted-foreground block truncate text-sm">
                <template v-for="(part, i) in highlight(chat.preview)" :key="i">
                  <mark
                    v-if="part.match"
                    class="rounded-sm bg-yellow-200 text-inherit dark:bg-yellow-500/40"
                    >{{ part.text }}</mark
                  >
                  <template v-else>{{ part.text }}</template>
                </template>
              </span>
            </span>
          </button>
        </li>
      </ul>
      <div v-else class="flex flex-col items-center px-6 py-12 text-center">
        <Icon name="lucide:search-x" class="text-muted-foreground size-8" />
        <p class="mt-3 font-medium">No conversations found</p>
        <p class="text-muted-foreground mt-1 text-sm">
          Try a different name or a word from the message.
        </p>
        <UiButton variant="outline" size="sm" class="mt-4" @click="query = ''"
          >Clear search</UiButton
        >
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Conversation = { id: string; name: string; avatar: string; preview: string };

  const props = withDefaults(
    defineProps<{
      conversations?: Conversation[];
    }>(),
    {
      conversations: () => [
        {
          id: "1",
          name: "Sofia Alvarez",
          avatar: "https://i.pravatar.cc/80?img=32",
          preview: "Can you review the onboarding mockups?",
        },
        {
          id: "2",
          name: "Liam Carter",
          avatar: "https://i.pravatar.cc/80?img=12",
          preview: "Deployed the fix to staging.",
        },
        {
          id: "3",
          name: "Design team",
          avatar: "https://i.pravatar.cc/80?img=47",
          preview: "Aisha: Moodboard is ready for review",
        },
        {
          id: "4",
          name: "Noah Williams",
          avatar: "https://i.pravatar.cc/80?img=15",
          preview: "I will send the invoice tomorrow.",
        },
        {
          id: "5",
          name: "Ethan Brooks",
          avatar: "https://i.pravatar.cc/80?img=33",
          preview: "Are we still on for Thursday?",
        },
      ],
    }
  );

  const query = ref("");

  const term = computed(() => query.value.trim().toLowerCase());

  const rows = computed(() =>
    props.conversations.filter(
      (chat) =>
        !term.value ||
        chat.name.toLowerCase().includes(term.value) ||
        chat.preview.toLowerCase().includes(term.value)
    )
  );

  function highlight(text: string) {
    if (!term.value) return [{ text, match: false }];
    const parts: { text: string; match: boolean }[] = [];
    const lower = text.toLowerCase();
    let cursor = 0;
    let found = lower.indexOf(term.value);
    while (found !== -1) {
      if (found > cursor) parts.push({ text: text.slice(cursor, found), match: false });
      parts.push({ text: text.slice(found, found + term.value.length), match: true });
      cursor = found + term.value.length;
      found = lower.indexOf(term.value, cursor);
    }
    if (cursor < text.length) parts.push({ text: text.slice(cursor), match: false });
    return parts;
  }

  // Press slash anywhere to jump to the search field.
  useEventListener("keydown", (event: KeyboardEvent) => {
    const target = event.target as HTMLElement;
    if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(target.tagName)) {
      event.preventDefault();
      document.getElementById("chat-search")?.focus();
    }
  });
</script>
