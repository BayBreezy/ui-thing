<template>
  <div class="mx-auto w-full max-w-lg py-6">
    <UiInputGroup>
      <UiInputGroupTextarea
        v-model="text"
        placeholder="Type, or press the microphone and speak..."
        class="p-3"
      />
      <UiInputGroupAddon align="block-end">
        <UiTooltip>
          <UiTooltipTrigger as-child>
            <!-- A disabled button cannot show a tooltip, so the wrapper span does -->
            <span class="inline-flex" :tabindex="isSupported ? undefined : 0">
              <UiInputGroupButton
                size="icon-sm"
                :variant="isListening ? 'default' : 'outline'"
                class="rounded-full"
                :disabled="!isSupported"
                :aria-label="isListening ? 'Stop dictation' : 'Start dictation'"
                :aria-pressed="isListening"
                @click="toggle"
              >
                <Icon v-if="isListening" name="lucide:square" class="size-4" />
                <Icon v-else name="lucide:mic" class="size-4" />
              </UiInputGroupButton>
            </span>
          </UiTooltipTrigger>
          <UiTooltipContent>
            {{
              isSupported
                ? isListening
                  ? "Stop dictation"
                  : "Start dictation"
                : "Speech recognition is not supported in this browser"
            }}
          </UiTooltipContent>
        </UiTooltip>

        <span v-if="isListening" class="text-muted-foreground flex items-center gap-2 text-xs">
          <span class="relative flex size-2">
            <span
              class="absolute inline-flex size-full animate-ping rounded-full bg-red-500 opacity-75"
            />
            <span class="relative inline-flex size-2 rounded-full bg-red-500" />
          </span>
          Listening
        </span>

        <UiInputGroupButton size="icon-sm" class="ml-auto rounded-full" aria-label="Send">
          <Icon name="lucide:arrow-up" class="size-4" />
        </UiInputGroupButton>
      </UiInputGroupAddon>
    </UiInputGroup>
  </div>
</template>

<script lang="ts" setup>
  const text = ref("");
  // What was typed before dictation started, so the spoken words are added after it
  let base = "";

  const { isSupported, isListening, result, start, stop } = useSpeechRecognition({
    lang: "en-US",
    continuous: true,
    interimResults: true,
  });

  // The transcript updates while the person speaks, including words that may still change
  watch(result, (spoken) => {
    if (isListening.value) text.value = [base, spoken].filter(Boolean).join(base ? " " : "");
  });

  function toggle() {
    if (isListening.value) {
      stop();
      return;
    }
    base = text.value.trim();
    start();
  }
</script>
