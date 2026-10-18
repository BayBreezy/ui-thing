<template>
  <!--
    Expanding multi line composer
    Features: Textarea that grows with its content up to a maximum height, enter to send and shift enter for a new line, character counter that turns red near the limit, formatting buttons and a send button that disables when empty or too long
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto flex max-w-lg flex-col gap-6">
      <div v-if="sent.length" class="flex flex-col items-end gap-2" aria-live="polite">
        <UiBubble v-for="(text, index) in sent" :key="index">
          <UiBubbleContent class="whitespace-pre-wrap">{{ text }}</UiBubbleContent>
        </UiBubble>
      </div>

      <form class="bg-background rounded-2xl border p-3 shadow-xs" @submit.prevent="send">
        <UiLabel for="composer6" class="sr-only">Message</UiLabel>
        <UiTextarea
          id="composer6"
          v-model="draft"
          :rows="1"
          placeholder="Write a message. Shift and enter adds a new line."
          class="max-h-40 min-h-9 resize-none overflow-y-auto border-0 bg-transparent p-0 shadow-none focus-visible:ring-0 dark:bg-transparent"
          @keydown.enter.exact.prevent="send"
        />
        <div class="mt-2 flex items-center justify-between">
          <div class="flex items-center gap-1">
            <UiButton
              v-for="tool in tools"
              :key="tool.label"
              type="button"
              variant="ghost"
              size="icon-sm"
              :aria-label="tool.label"
              @click="wrap(tool.mark)"
            >
              <Icon :name="tool.icon" class="size-4" />
            </UiButton>
          </div>
          <div class="flex items-center gap-3">
            <span
              class="text-xs tabular-nums"
              :class="remaining < 20 ? 'text-destructive' : 'text-muted-foreground'"
              aria-live="polite"
            >
              {{ remaining }}
              <span class="sr-only">characters left</span>
            </span>
            <UiButton type="submit" size="sm" :disabled="!draft.trim() || remaining < 0"
              >Send</UiButton
            >
          </div>
        </div>
      </form>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  const limit = 280;

  const tools = [
    { label: "Bold", icon: "lucide:bold", mark: "**" },
    { label: "Italic", icon: "lucide:italic", mark: "_" },
    { label: "Code", icon: "lucide:code", mark: "`" },
  ];

  const draft = ref("");
  const sent = ref<string[]>([]);

  const remaining = computed(() => limit - draft.value.length);

  function field() {
    return document.getElementById("composer6") as HTMLTextAreaElement | null;
  }

  // Grow with the content, then scroll once the maximum height is reached.
  function resize() {
    const el = field();
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }

  watch(draft, () => nextTick(resize));

  function wrap(mark: string) {
    const el = field();
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = draft.value.slice(start, end) || "text";
    draft.value = `${draft.value.slice(0, start)}${mark}${selected}${mark}${draft.value.slice(end)}`;
    nextTick(() => {
      el.focus();
      el.setSelectionRange(start + mark.length, start + mark.length + selected.length);
    });
  }

  function send() {
    const text = draft.value.trim();
    if (!text || remaining.value < 0) return;
    sent.value = [...sent.value, text].slice(-3);
    draft.value = "";
  }
</script>
