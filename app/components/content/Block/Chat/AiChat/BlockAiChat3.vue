<template>
  <!--
    AI chat with a thinking state and streaming reply
    Features: Shimmering skeleton lines while the assistant is thinking, a collapsible reasoning summary, text that streams in with a caret, a stop generating button and motion that is reduced for people who prefer it
  -->
  <div class="mx-auto flex h-[38rem] w-full max-w-2xl flex-col">
    <div class="min-h-0 flex-1">
      <UiMessageScrollerProvider>
        <UiMessageScroller>
          <UiMessageScrollerViewport>
            <UiMessageScrollerContent class="gap-6 px-4 py-6">
              <UiMessageScrollerItem message-id="user">
                <UiMessage align="end">
                  <UiMessageContent>
                    <UiBubble variant="muted">
                      <UiBubbleContent>{{ question }}</UiBubbleContent>
                    </UiBubble>
                  </UiMessageContent>
                </UiMessage>
              </UiMessageScrollerItem>

              <UiMessageScrollerItem v-if="phase !== 'idle'" message-id="assistant">
                <UiMessage>
                  <UiMessageContent class="w-full">
                    <div
                      v-if="phase === 'thinking'"
                      class="w-full max-w-md space-y-2.5 py-1"
                      role="status"
                      aria-label="The assistant is thinking"
                    >
                      <p class="text-muted-foreground flex items-center gap-2 text-sm">
                        <Icon
                          name="lucide:sparkles"
                          class="size-4 animate-pulse motion-reduce:animate-none"
                        />
                        Thinking…
                      </p>
                      <UiSkeleton class="h-3.5 w-full" />
                      <UiSkeleton class="h-3.5 w-11/12" />
                      <UiSkeleton class="h-3.5 w-3/5" />
                    </div>
                    <template v-else>
                      <UiCollapsible class="mb-2">
                        <UiCollapsibleTrigger as-child>
                          <button
                            type="button"
                            class="text-muted-foreground hover:text-foreground flex items-center gap-1.5 text-sm"
                          >
                            <Icon name="lucide:brain" class="size-4" />
                            Thought for {{ thoughtFor }} seconds
                            <Icon name="lucide:chevron-down" class="size-3.5" />
                          </button>
                        </UiCollapsibleTrigger>
                        <UiCollapsibleContent>
                          <p class="text-muted-foreground mt-2 border-l-2 pl-3 text-sm">
                            Compared the two options on cost, setup time and long term flexibility,
                            then picked the one that fits a small team.
                          </p>
                        </UiCollapsibleContent>
                      </UiCollapsible>
                      <UiBubble variant="ghost">
                        <UiBubbleContent class="text-[15px] leading-relaxed">
                          {{ shown
                          }}<span
                            v-if="phase === 'streaming'"
                            class="bg-foreground ml-0.5 inline-block h-4 w-0.5 animate-pulse align-middle motion-reduce:animate-none"
                          />
                        </UiBubbleContent>
                      </UiBubble>
                    </template>
                  </UiMessageContent>
                </UiMessage>
              </UiMessageScrollerItem>
            </UiMessageScrollerContent>
          </UiMessageScrollerViewport>
        </UiMessageScroller>
      </UiMessageScrollerProvider>
    </div>

    <div class="flex items-center justify-center gap-2 px-4 pb-4">
      <UiButton v-if="phase === 'idle'" @click="start">
        <Icon name="lucide:play" class="size-4" />
        Ask the question
      </UiButton>
      <UiButton v-else-if="phase !== 'done'" variant="outline" @click="stop">
        <Icon name="lucide:square" class="size-4" />
        Stop generating
      </UiButton>
      <UiButton v-else variant="outline" @click="reset">
        <Icon name="lucide:rotate-ccw" class="size-4" />
        Try again
      </UiButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      question?: string;
      answer?: string;
    }>(),
    {
      question: "Should a small team start with a monolith or microservices?",
      answer:
        "Start with a well organized monolith. You will ship faster, debugging is simpler and you avoid the operational cost of running many services. Draw clear module boundaries so you can split out a service later if one part really needs to scale on its own.",
    }
  );

  const phase = ref<"idle" | "thinking" | "streaming" | "done">("idle");
  const shown = ref("");
  const thoughtFor = ref(2);
  const timers: ReturnType<typeof setTimeout | typeof setInterval>[] = [];

  function clear() {
    timers.forEach((timer) => {
      clearTimeout(timer as ReturnType<typeof setTimeout>);
      clearInterval(timer as ReturnType<typeof setInterval>);
    });
    timers.length = 0;
  }

  function start() {
    clear();
    shown.value = "";
    phase.value = "thinking";
    timers.push(
      setTimeout(() => {
        phase.value = "streaming";
        let index = 0;
        timers.push(
          setInterval(() => {
            index += 4;
            shown.value = props.answer.slice(0, index);
            if (index >= props.answer.length) {
              clear();
              phase.value = "done";
            }
          }, 30)
        );
      }, 1800)
    );
  }

  function stop() {
    clear();
    phase.value = shown.value ? "done" : "idle";
  }

  function reset() {
    clear();
    phase.value = "idle";
    shown.value = "";
  }

  onBeforeUnmount(clear);
</script>
