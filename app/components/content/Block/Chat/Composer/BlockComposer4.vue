<template>
  <!--
    Composer with a slash command menu
    Features: Type slash to open a filtered command list with icons and descriptions, arrow keys and enter to choose, escape to close, chosen command shown as a chip and a hint row with keyboard shortcuts
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto flex max-w-lg flex-col gap-6">
      <div class="flex min-h-72 flex-col items-end justify-end gap-2" aria-live="polite">
        <UiBubble v-for="(entry, index) in log" :key="index">
          <UiBubbleContent class="flex items-center gap-2">
            <UiBadge v-if="entry.command" variant="secondary">/{{ entry.command }}</UiBadge>
            {{ entry.text }}
          </UiBubbleContent>
        </UiBubble>
      </div>

      <form class="relative" @submit.prevent="send">
        <div
          v-if="menuOpen"
          class="bg-popover absolute right-0 bottom-full left-0 z-10 mb-2 overflow-hidden rounded-lg border shadow-md"
        >
          <ul
            id="command-list"
            role="listbox"
            aria-label="Commands"
            class="max-h-56 overflow-auto p-1"
          >
            <li
              v-for="(command, index) in matches"
              :id="`command-${index}`"
              :key="command.name"
              role="option"
              :aria-selected="index === active"
              class="flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 text-sm"
              :class="index === active ? 'bg-accent' : ''"
              @mousedown.prevent="choose(command)"
              @mousemove="active = index"
            >
              <span class="bg-muted grid size-8 shrink-0 place-items-center rounded-md">
                <Icon :name="command.icon" class="size-4" />
              </span>
              <span class="min-w-0">
                <span class="block font-medium">/{{ command.name }}</span>
                <span class="text-muted-foreground block truncate text-xs">{{
                  command.description
                }}</span>
              </span>
            </li>
          </ul>
          <p class="text-muted-foreground border-t px-3 py-1.5 text-xs">
            <UiKbd>↑</UiKbd> <UiKbd>↓</UiKbd> to move, <UiKbd>Enter</UiKbd> to choose,
            <UiKbd>Esc</UiKbd> to close
          </p>
        </div>

        <div class="bg-background flex items-center gap-2 rounded-xl border p-2 pl-3 shadow-xs">
          <UiBadge v-if="chosen" variant="secondary" class="gap-1 pr-1">
            /{{ chosen.name }}
            <button
              type="button"
              class="rounded p-0.5"
              :aria-label="`Remove ${chosen.name} command`"
              @click="chosen = undefined"
            >
              <Icon name="lucide:x" class="size-3" />
            </button>
          </UiBadge>
          <UiLabel for="composer4" class="sr-only">Message</UiLabel>
          <input
            id="composer4"
            v-model="draft"
            type="text"
            role="combobox"
            aria-autocomplete="list"
            :aria-expanded="menuOpen"
            aria-controls="command-list"
            :aria-activedescendant="menuOpen ? `command-${active}` : undefined"
            :placeholder="chosen ? chosen.placeholder : 'Type / for commands'"
            autocomplete="off"
            class="placeholder:text-muted-foreground/70 min-w-0 flex-1 bg-transparent text-sm outline-none"
            @keydown="onKey"
          />
          <UiButton
            type="submit"
            size="icon"
            :disabled="!draft.trim() && !chosen"
            aria-label="Send message"
          >
            <Icon name="lucide:send-horizontal" class="size-4" />
          </UiButton>
        </div>
      </form>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Command = { name: string; description: string; icon: string; placeholder: string };

  const props = withDefaults(
    defineProps<{
      commands?: Command[];
    }>(),
    {
      commands: () => [
        {
          name: "remind",
          description: "Set a reminder for later",
          icon: "lucide:alarm-clock",
          placeholder: "Remind me to...",
        },
        {
          name: "poll",
          description: "Create a quick poll",
          icon: "lucide:chart-bar",
          placeholder: "Ask a question",
        },
        {
          name: "giphy",
          description: "Search for a GIF",
          icon: "lucide:image",
          placeholder: "Search GIFs",
        },
        {
          name: "summarize",
          description: "Summarize this conversation",
          icon: "lucide:sparkles",
          placeholder: "Anything specific to focus on?",
        },
        {
          name: "invite",
          description: "Invite someone to the channel",
          icon: "lucide:user-plus",
          placeholder: "name@company.com",
        },
      ],
    }
  );

  const draft = ref("");
  const chosen = ref<Command>();
  const active = ref(0);
  const dismissed = ref(false);
  const log = ref<{ command?: string; text: string }[]>([]);

  const open = computed(
    () =>
      !chosen.value && draft.value.startsWith("/") && !draft.value.includes(" ") && !dismissed.value
  );
  const matches = computed(() =>
    props.commands.filter((command) => command.name.startsWith(draft.value.slice(1).toLowerCase()))
  );
  const menuOpen = computed(() => open.value && matches.value.length > 0);

  watch(draft, () => {
    active.value = 0;
    if (!draft.value.startsWith("/")) dismissed.value = false;
  });

  function choose(command: Command) {
    chosen.value = command;
    draft.value = "";
  }

  function onKey(event: KeyboardEvent) {
    if (!menuOpen.value) {
      if (event.key === "Backspace" && !draft.value && chosen.value) chosen.value = undefined;
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      active.value = (active.value + 1) % matches.value.length;
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      active.value = (active.value - 1 + matches.value.length) % matches.value.length;
    } else if (event.key === "Enter" || event.key === "Tab") {
      event.preventDefault();
      choose(matches.value[active.value]!);
    } else if (event.key === "Escape") {
      dismissed.value = true;
    }
  }

  function send() {
    if (menuOpen.value) return choose(matches.value[active.value]!);
    const text = draft.value.trim();
    if (!text && !chosen.value) return;
    log.value = [...log.value, { command: chosen.value?.name, text }].slice(-3);
    draft.value = "";
    chosen.value = undefined;
  }
</script>
