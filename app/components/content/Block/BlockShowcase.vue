<template>
  <div
    class="not-prose"
    :style="{
      '--container-height': props.iframeHeight || '600px',
    }"
  >
    <div class="mb-5 flex items-center justify-between gap-5">
      <div class="flex h-8 items-center rounded-md border p-0.5 shadow-sm">
        <UiToggleGroup
          type="single"
          default-value="100"
          @update:model-value="
            (value) => {
              resizableRef?.resize(parseInt(value as string));
            }
          "
        >
          <UiToggleGroupItem v-tippy="'Desktop View'" class="size-6 rounded-sm p-0" value="100">
            <Icon class="size-3.5" name="lucide:monitor" />
          </UiToggleGroupItem>
          <UiToggleGroupItem v-tippy="'Tablet View'" class="size-6 rounded-sm p-0" value="60">
            <Icon class="size-3.5" name="lucide:tablet" />
          </UiToggleGroupItem>
          <UiToggleGroupItem v-tippy="'Mobile View'" value="40" class="size-6 rounded-sm p-0">
            <Icon class="size-3.5" name="lucide:smartphone" />
          </UiToggleGroupItem>
        </UiToggleGroup>
      </div>
      <div class="flex items-center gap-3">
        <UiButton
          v-if="externalViewLink"
          v-tippy="'External View'"
          target="_blank"
          :href="externalViewLink"
          class="size-8 rounded-md"
          size="icon-sm"
          variant="outline"
        >
          <Icon name="lucide:square-arrow-out-up-right" class="size-3.5" />
          <span class="sr-only">External View</span>
        </UiButton>

        <UiButton
          v-if="codeBlock"
          v-tippy="'Copy Source Code'"
          class="size-8 rounded-md"
          size="icon-sm"
          variant="outline"
          @click="copy(codeBlock)"
        >
          <Icon :name="copied ? 'lucide:check' : 'lucide:copy'" class="size-3.5" />
          <span class="sr-only">Copy Source Code</span>
        </UiButton>
      </div>
    </div>

    <div class="relative h-[--container-height] rounded-lg bg-muted">
      <ClientOnly>
        <UiSplitter id="block-resizable" direction="horizontal" class="relative z-10">
          <UiSplitterPanel
            id="block-resizable-panel-1"
            class="relative rounded-lg border bg-background transition-all"
            :default-size="100"
            :min-size="40"
            @ready="resizableRef = $event"
          >
            <TransitionFade>
              <div v-if="isLoading" class="flex h-full items-center justify-center">
                <Icon class="size-20" name="svg-spinners:blocks-wave" />
              </div>
              <iframe
                v-if="!isLoading"
                class="relative z-20 h-[--container-height] w-full bg-background"
                :src="externalViewLink"
                :class="props.frameClass"
                @load="isLoading = false"
              />
            </TransitionFade>
          </UiSplitterPanel>
          <UiSplitterHandle class="bg-transparent" />
          <UiSplitterPanel id="block-resizable-panel-2" :default-size="0" :min-size="0" />
        </UiSplitter>
      </ClientOnly>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import type { SplitterPanel } from "radix-vue";

  const props = withDefaults(
    defineProps<{
      blockPath?: string;
      component?: string;
      iframeHeight?: string;
      frameClass?: any;
      containerClass?: any;
    }>(),
    {
      blockPath: "",
    }
  );

  const isLoading = ref(true);
  const colorMode = useColorMode();

  const codeBlock = ref<string | null>(null);

  const importPath = async () => {
    isLoading.value = true;
    if (!props.blockPath) return console.error("Block path is required.");
    const blockImports = import.meta.glob<string>("./**/*.vue", {
      query: "?raw",
      import: "default",
    });
    const path = blockImports[`./${props.blockPath}.vue`];
    codeBlock.value = (await path?.()) ?? null;
    isLoading.value = false;
  };

  const resizableRef = ref<InstanceType<typeof SplitterPanel>>();

  await importPath();
  watch(
    () => colorMode.value,
    async () => {
      await importPath();
    }
  );

  const { copied, copy } = useClipboard({ copiedDuring: 2500, legacy: true });

  const externalViewLink = computed(() => {
    return `/block-renderer?component=${props.component}&path=${props.blockPath}&containerClass=${props.containerClass ?? ""}`;
  });
</script>
