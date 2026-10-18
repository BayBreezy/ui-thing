<template>
  <!--
    Composer with emoji picker and mentions
    Features: Emoji popover that inserts at the cursor, type at to mention a teammate with arrow key navigation and enter to pick, listbox semantics with aria active descendant and mentions highlighted in sent messages
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto flex max-w-lg flex-col gap-6">
      <div class="flex min-h-64 flex-col items-end justify-end gap-2" aria-live="polite">
        <UiBubble v-for="(text, index) in sent" :key="index">
          <UiBubbleContent>
            <template v-for="(part, i) in parts(text)" :key="i">
              <strong v-if="part.mention" class="underline decoration-dotted">{{
                part.text
              }}</strong>
              <template v-else>{{ part.text }}</template>
            </template>
          </UiBubbleContent>
        </UiBubble>
      </div>

      <form class="relative" @submit.prevent="send">
        <div
          v-if="menuOpen"
          class="bg-popover absolute right-0 bottom-full left-0 z-10 mb-2 overflow-hidden rounded-lg border shadow-md"
        >
          <ul
            id="mention-list"
            role="listbox"
            aria-label="Mention a teammate"
            class="max-h-48 overflow-auto p-1"
          >
            <li
              v-for="(person, index) in matches"
              :id="`mention-${index}`"
              :key="person.name"
              role="option"
              :aria-selected="index === active"
              class="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm"
              :class="index === active ? 'bg-accent' : ''"
              @mousedown.prevent="pick(person)"
              @mousemove="active = index"
            >
              <UiAvatar :src="person.avatar" :fallback="person.name[0]" class="size-6" />
              {{ person.name }}
            </li>
          </ul>
        </div>

        <div class="bg-background flex items-center gap-1 rounded-xl border p-2 shadow-xs">
          <UiPopover v-model:open="emojiOpen">
            <UiPopoverTrigger as-child>
              <UiButton type="button" variant="ghost" size="icon" aria-label="Insert emoji">
                <Icon name="lucide:smile" class="size-4" />
              </UiButton>
            </UiPopoverTrigger>
            <UiPopoverContent align="start" class="w-64 p-2">
              <div class="grid grid-cols-8 gap-0.5">
                <button
                  v-for="emoji in emojis"
                  :key="emoji"
                  type="button"
                  class="hover:bg-muted rounded p-1 text-lg"
                  :aria-label="`Insert ${emoji}`"
                  @click="insert(emoji)"
                >
                  {{ emoji }}
                </button>
              </div>
            </UiPopoverContent>
          </UiPopover>
          <UiLabel for="composer3" class="sr-only">Message</UiLabel>
          <input
            id="composer3"
            ref="field"
            v-model="draft"
            type="text"
            role="combobox"
            aria-autocomplete="list"
            :aria-expanded="menuOpen"
            aria-controls="mention-list"
            :aria-activedescendant="menuOpen ? `mention-${active}` : undefined"
            placeholder="Type @ to mention someone"
            autocomplete="off"
            class="placeholder:text-muted-foreground/70 min-w-0 flex-1 bg-transparent px-1 text-sm outline-none"
            @input="update"
            @click="update"
            @keydown="onKey"
          />
          <UiButton type="submit" size="icon" :disabled="!draft.trim()" aria-label="Send message">
            <Icon name="lucide:send-horizontal" class="size-4" />
          </UiButton>
        </div>
      </form>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Person = { name: string; avatar: string };

  const props = withDefaults(
    defineProps<{
      people?: Person[];
    }>(),
    {
      people: () => [
        { name: "Sofia Alvarez", avatar: "https://i.pravatar.cc/80?img=32" },
        { name: "Liam Carter", avatar: "https://i.pravatar.cc/80?img=12" },
        { name: "Aisha Khan", avatar: "https://i.pravatar.cc/80?img=44" },
        { name: "Noah Williams", avatar: "https://i.pravatar.cc/80?img=15" },
      ],
    }
  );

  const emojis = [
    "😀",
    "😂",
    "😍",
    "🥳",
    "😎",
    "🤔",
    "😢",
    "😡",
    "👍",
    "👏",
    "🙏",
    "🔥",
    "🎉",
    "🚀",
    "💯",
    "👀",
  ];

  const field = ref<HTMLInputElement>();
  const draft = ref("");
  const sent = ref<string[]>([]);
  const emojiOpen = ref(false);
  const query = ref<string | null>(null);
  const active = ref(0);

  const matches = computed(() =>
    query.value === null
      ? []
      : props.people.filter((person) =>
          person.name.toLowerCase().includes(query.value!.toLowerCase())
        )
  );
  const menuOpen = computed(() => query.value !== null && matches.value.length > 0);

  // Look for an at sign right before the cursor, with no spaces after it.
  function update() {
    const el = field.value;
    if (!el) return;
    const before = el.value.slice(0, el.selectionStart ?? 0);
    const found = /(^|\s)@([^\s@]*)$/.exec(before);
    query.value = found ? found[2]! : null;
    active.value = 0;
  }

  function pick(person: Person) {
    const el = field.value;
    if (!el) return;
    const cursor = el.selectionStart ?? el.value.length;
    const before = el.value.slice(0, cursor).replace(/@[^\s@]*$/, `@${person.name.split(" ")[0]} `);
    draft.value = before + el.value.slice(cursor);
    query.value = null;
    nextTick(() => {
      el.focus();
      el.setSelectionRange(before.length, before.length);
    });
  }

  function onKey(event: KeyboardEvent) {
    if (!menuOpen.value) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      active.value = (active.value + 1) % matches.value.length;
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      active.value = (active.value - 1 + matches.value.length) % matches.value.length;
    } else if (event.key === "Enter" || event.key === "Tab") {
      event.preventDefault();
      pick(matches.value[active.value]!);
    } else if (event.key === "Escape") {
      query.value = null;
    }
  }

  function insert(emoji: string) {
    const el = field.value;
    const start = el?.selectionStart ?? draft.value.length;
    const end = el?.selectionEnd ?? start;
    draft.value = draft.value.slice(0, start) + emoji + draft.value.slice(end);
    emojiOpen.value = false;
    nextTick(() => {
      el?.focus();
      el?.setSelectionRange(start + emoji.length, start + emoji.length);
    });
  }

  function parts(text: string) {
    return text
      .split(/(@\w+)/g)
      .filter(Boolean)
      .map((part) => ({ text: part, mention: part.startsWith("@") }));
  }

  function send() {
    const text = draft.value.trim();
    if (!text) return;
    sent.value = [...sent.value, text].slice(-3);
    draft.value = "";
    query.value = null;
  }
</script>
