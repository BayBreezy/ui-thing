<template>
  <div class="mx-auto flex w-full max-w-md flex-col gap-6 py-6 text-sm">
    <UiMessage align="end">
      <UiMessageContent>
        <UiBubble align="end" variant="muted">
          <UiBubbleContent>Give me a tagline for a Vue component library.</UiBubbleContent>
        </UiBubble>
      </UiMessageContent>
    </UiMessage>

    <UiMessage>
      <UiMessageContent class="gap-2">
        <p v-if="generating" class="shimmer text-muted-foreground">Writing another version…</p>
        <p v-else :key="index">{{ branches[index] }}</p>

        <UiMessageFooter class="px-0">
          <div class="flex items-center">
            <UiButton
              variant="ghost"
              size="icon-sm"
              aria-label="Previous response"
              :disabled="generating || index === 0"
              @click="index--"
            >
              <Icon name="lucide:chevron-left" class="size-4" />
            </UiButton>
            <span
              class="text-muted-foreground min-w-12 text-center text-xs tabular-nums"
              aria-live="polite"
            >
              {{ index + 1 }} / {{ branches.length }}
            </span>
            <UiButton
              variant="ghost"
              size="icon-sm"
              aria-label="Next response"
              :disabled="generating || index === branches.length - 1"
              @click="index++"
            >
              <Icon name="lucide:chevron-right" class="size-4" />
            </UiButton>
          </div>
          <UiButton
            variant="ghost"
            size="icon-sm"
            aria-label="Regenerate response"
            :disabled="generating"
            @click="regenerate"
          >
            <Icon
              name="lucide:refresh-ccw"
              class="size-4"
              :class="generating ? 'animate-spin' : undefined"
            />
          </UiButton>
        </UiMessageFooter>
      </UiMessageContent>
    </UiMessage>
  </div>
</template>

<script lang="ts" setup>
  import { promiseTimeout } from "@vueuse/core";

  // Every time the reply is regenerated, the new version is added as a branch. The person can step
  // back and forth between them. In your app, `branches` is the list of regenerated replies.
  const more = [
    "Components you own, not a dependency you rent.",
    "Copy it, change it, ship it.",
    "Accessible by default. Yours by design.",
    "Build faster without giving up control.",
  ];

  const branches = ref(["Beautiful components for Vue and Nuxt."]);
  const index = ref(0);
  const generating = ref(false);

  async function regenerate() {
    generating.value = true;
    await promiseTimeout(900);
    branches.value.push(more[(branches.value.length - 1) % more.length]!);
    index.value = branches.value.length - 1;
    generating.value = false;
  }
</script>
