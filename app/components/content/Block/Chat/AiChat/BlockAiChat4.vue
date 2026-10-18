<template>
  <!--
    AI chat with tool call steps
    Features: Collapsible trace of the steps the assistant took, running and finished states with icons, step details with arguments and results, a final answer with sources and a replay button
  -->
  <div class="mx-auto flex h-[40rem] w-full max-w-2xl flex-col">
    <div class="min-h-0 flex-1">
      <UiMessageScrollerProvider>
        <UiMessageScroller>
          <UiMessageScrollerViewport>
            <UiMessageScrollerContent class="gap-6 px-4 py-6">
              <UiMessageScrollerItem message-id="q">
                <UiMessage align="end">
                  <UiMessageContent>
                    <UiBubble variant="muted">
                      <UiBubbleContent>{{ question }}</UiBubbleContent>
                    </UiBubble>
                  </UiMessageContent>
                </UiMessage>
              </UiMessageScrollerItem>

              <UiMessageScrollerItem message-id="a">
                <UiMessage>
                  <UiMessageContent class="w-full">
                    <UiTrace class="w-full">
                      <UiTraceCollapsible
                        v-for="(step, index) in steps"
                        :key="step.title"
                        :default-open="false"
                      >
                        <template v-if="index < visible">
                          <UiTraceCollapsibleTrigger>
                            <UiTraceLine>
                              <UiTraceIcon
                                :name="
                                  index === visible - 1 && running
                                    ? 'lucide:loader-circle'
                                    : step.icon
                                "
                                :class="
                                  index === visible - 1 && running
                                    ? 'animate-spin motion-reduce:animate-none'
                                    : ''
                                "
                              />
                              <UiTraceTitle>{{ step.title }}</UiTraceTitle>
                            </UiTraceLine>
                          </UiTraceCollapsibleTrigger>
                          <UiTraceCollapsibleContent>
                            <p class="font-mono text-xs">{{ step.args }}</p>
                            <p class="mt-1">{{ step.result }}</p>
                          </UiTraceCollapsibleContent>
                        </template>
                      </UiTraceCollapsible>
                    </UiTrace>

                    <template v-if="!running && visible >= steps.length">
                      <UiBubble variant="ghost" class="mt-3">
                        <UiBubbleContent class="text-[15px] leading-relaxed">{{
                          answer
                        }}</UiBubbleContent>
                      </UiBubble>
                      <ul class="mt-3 flex flex-wrap gap-2" aria-label="Sources">
                        <li v-for="source in sources" :key="source.label">
                          <a
                            :href="source.href"
                            class="hover:bg-muted flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs"
                            @click.prevent="useSonner.info(`Opening ${source.label}`)"
                          >
                            <Icon name="lucide:globe" class="size-3.5" />
                            {{ source.label }}
                          </a>
                        </li>
                      </ul>
                    </template>
                  </UiMessageContent>
                </UiMessage>
              </UiMessageScrollerItem>
            </UiMessageScrollerContent>
          </UiMessageScrollerViewport>
        </UiMessageScroller>
      </UiMessageScrollerProvider>
    </div>

    <div class="flex justify-center px-4 pb-4">
      <UiButton variant="outline" :disabled="running" @click="play">
        <Icon name="lucide:rotate-ccw" class="size-4" />
        {{ running ? "Working…" : "Replay" }}
      </UiButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
  type Step = { title: string; icon: string; args: string; result: string };

  const props = withDefaults(
    defineProps<{
      question?: string;
      answer?: string;
      steps?: Step[];
      sources?: { label: string; href: string }[];
    }>(),
    {
      question: "How many people live in Lisbon, and how has it changed since 2010?",
      answer:
        "Lisbon has roughly 550,000 residents in the city proper, and about 2.9 million in the wider metropolitan area. The city has grown by around 3 percent since 2010, after years of decline.",
      steps: () => [
        {
          title: "Searched the web",
          icon: "lucide:search",
          args: 'search({ query: "Lisbon population 2024" })',
          result: "Found 6 results from official statistics pages.",
        },
        {
          title: "Read statistics portal",
          icon: "lucide:file-text",
          args: 'open({ url: "stats.example/lisbon" })',
          result: "City population 2024: 552,700. Census 2011: 547,733.",
        },
        {
          title: "Calculated the change",
          icon: "lucide:calculator",
          args: "calc((552700 - 547733) / 547733)",
          result: "0.9 percent since the 2011 census.",
        },
      ],
      sources: () => [
        { label: "stats.example", href: "#stats" },
        { label: "city-portal.example", href: "#city" },
      ],
    }
  );

  const visible = ref(0);
  const running = ref(false);
  const timers: ReturnType<typeof setTimeout>[] = [];

  function play() {
    timers.forEach(clearTimeout);
    visible.value = 0;
    running.value = true;
    props.steps.forEach((_, index) => {
      timers.push(setTimeout(() => (visible.value = index + 1), 700 * (index + 1)));
    });
    timers.push(setTimeout(() => (running.value = false), 700 * props.steps.length + 600));
  }

  onMounted(() => {
    visible.value = props.steps.length;
  });
  onBeforeUnmount(() => timers.forEach(clearTimeout));
</script>
