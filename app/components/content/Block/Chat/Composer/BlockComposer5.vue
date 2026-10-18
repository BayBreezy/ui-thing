<template>
  <!--
    Composer with voice notes
    Features: Mic button that starts a simulated recording with a timer and live waveform, cancel and send buttons while recording, waveform stops moving for reduced motion and sent voice notes shown as playable looking bubbles
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto flex max-w-lg flex-col gap-6">
      <div v-if="notes.length" class="flex flex-col items-end gap-2" aria-live="polite">
        <UiBubble v-for="note in notes" :key="note.id">
          <UiBubbleContent class="flex items-center gap-3">
            <Icon name="lucide:play" class="size-4" />
            <span class="flex h-6 items-center gap-0.5" aria-hidden="true">
              <span
                v-for="(bar, i) in note.bars"
                :key="i"
                class="w-0.5 rounded-full bg-current"
                :style="{ height: `${bar}px` }"
              />
            </span>
            <span class="text-xs tabular-nums">{{ format(note.seconds) }}</span>
            <span class="sr-only">Voice note, {{ note.seconds }} seconds</span>
          </UiBubbleContent>
        </UiBubble>
      </div>

      <form
        class="bg-background flex items-center gap-2 rounded-full border p-1.5 pl-4 shadow-xs"
        @submit.prevent="send"
      >
        <template v-if="!recording">
          <UiLabel for="composer5" class="sr-only">Message</UiLabel>
          <input
            id="composer5"
            v-model="draft"
            type="text"
            placeholder="Write a message"
            autocomplete="off"
            class="placeholder:text-muted-foreground/70 min-w-0 flex-1 bg-transparent text-sm outline-none"
          />
          <UiButton
            v-if="draft.trim()"
            type="submit"
            size="icon"
            class="rounded-full"
            aria-label="Send message"
          >
            <Icon name="lucide:arrow-up" class="size-4" />
          </UiButton>
          <UiButton
            v-else
            type="button"
            size="icon"
            variant="ghost"
            class="rounded-full"
            aria-label="Record a voice note"
            @click="start"
          >
            <Icon name="lucide:mic" class="size-4" />
          </UiButton>
        </template>
        <template v-else>
          <span
            class="size-2.5 shrink-0 rounded-full bg-red-500"
            :class="reduced ? '' : 'animate-pulse'"
            aria-hidden="true"
          />
          <span class="w-12 text-sm tabular-nums" role="timer" aria-label="Recording time">{{
            format(seconds)
          }}</span>
          <span class="flex h-8 flex-1 items-center gap-0.5 overflow-hidden" aria-hidden="true">
            <span
              v-for="(bar, i) in live"
              :key="i"
              class="bg-muted-foreground/60 w-0.5 shrink-0 rounded-full transition-[height] duration-150"
              :style="{ height: `${bar}px` }"
            />
          </span>
          <UiButton
            type="button"
            variant="ghost"
            size="icon"
            class="rounded-full"
            aria-label="Cancel recording"
            @click="stop(false)"
          >
            <Icon name="lucide:trash-2" class="size-4" />
          </UiButton>
          <UiButton
            type="button"
            size="icon"
            class="rounded-full"
            aria-label="Send voice note"
            @click="stop(true)"
          >
            <Icon name="lucide:arrow-up" class="size-4" />
          </UiButton>
        </template>
      </form>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Note = { id: number; seconds: number; bars: number[] };

  const draft = ref("");
  const recording = ref(false);
  const seconds = ref(0);
  const live = ref<number[]>([]);
  const notes = ref<Note[]>([]);
  const reduced = usePreferredReducedMotion().value === "reduce";

  const randomBar = () => 4 + Math.round(Math.random() * 20);
  let timer: ReturnType<typeof setInterval> | undefined;
  let wave: ReturnType<typeof setInterval> | undefined;

  function start() {
    recording.value = true;
    seconds.value = 0;
    live.value = Array.from({ length: 40 }, randomBar);
    timer = setInterval(() => seconds.value++, 1000);
    // The waveform keeps still when the user prefers reduced motion.
    if (!reduced) {
      wave = setInterval(() => (live.value = [...live.value.slice(1), randomBar()]), 150);
    }
  }

  function stop(save: boolean) {
    clearInterval(timer);
    clearInterval(wave);
    recording.value = false;
    if (save && seconds.value > 0) {
      notes.value = [
        ...notes.value,
        {
          id: notes.value.length,
          seconds: seconds.value,
          bars: Array.from({ length: 24 }, randomBar),
        },
      ].slice(-3);
    }
  }

  function format(total: number) {
    return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
  }

  function send() {
    if (!draft.value.trim()) return;
    draft.value = "";
  }

  onBeforeUnmount(() => {
    clearInterval(timer);
    clearInterval(wave);
  });
</script>
