---
title: Voice Input
description: Dictate into the prompt field with the browser's speech recognition.
label: New
---

::prose-show-case

:DocsAiVoiceInput

#code

<!-- automd:file src="../../app/components/content/Docs/AiElements/VoiceInput/DocsAiVoiceInput.vue" code lang="vue" -->

```vue [DocsAiVoiceInput.vue]
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
```

<!-- /automd -->

::

Voice Input adds a microphone to the [Prompt Input](/ai-elements/prompt-input). The spoken words appear in the field as the person talks, after whatever they already typed, and they can edit them before sending.

## Installation

Voice Input is built with the [Input Group](/components/input-group) and [Tooltip](/components/tooltip) components. It uses `useSpeechRecognition` from [VueUse](https://vueuse.org/core/useSpeechRecognition/).

:prose-pm-x{command="ui-thing@latest add input-group tooltip"}

## Usage

`useSpeechRecognition` returns `isSupported`, `isListening`, the `result` transcript, and `start` / `stop`. With `continuous` and `interimResults` on, the transcript updates while the person is still speaking.

- Remember what was typed before dictation starts and add the transcript after it.
- Show a clear listening state. The button changes to a stop button, and a pulsing dot and "Listening" appear.
- When speech recognition is not supported, disable the button and say why in the tooltip. Wrap the disabled button in a focusable `span` so the tooltip still shows.

::prose-callout{variant="warning" title="Browser support"}
The Web Speech API is not available in every browser, and some send audio to a server to transcribe it. Say so in your privacy notes. For consistent results across browsers, record audio and send it to a transcription model instead.
::

## Accessibility

- The button has `aria-pressed` and a label that changes between "Start dictation" and "Stop dictation".
- The listening state is shown with text as well as the pulsing dot, so it does not rely on color or motion.
