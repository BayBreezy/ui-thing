<template>
  <div
    :style="{
      '--container-height': props.iframeHeight || '600px',
    }"
  >
    <UiTabs v-model="selectedTab">
      <div class="mb-3 flex flex-col justify-between gap-5 gap-y-3 md:flex-row md:items-center">
        <UiTabsList class="relative h-auto border bg-transparent">
          <UiTabsTrigger
            class="relative z-10 h-7 bg-transparent px-2 text-sm data-[state=active]:bg-transparent"
            value="preview"
            >Preview</UiTabsTrigger
          >
          <UiTabsTrigger
            class="relative z-10 h-7 bg-transparent px-2 text-sm data-[state=active]:bg-transparent"
            value="code"
            >Code</UiTabsTrigger
          >
          <UiTabsTrigger
            v-if="$slots.components || components"
            class="relative z-10 h-7 bg-transparent px-2 text-sm data-[state=active]:bg-transparent"
            value="components"
            >Components</UiTabsTrigger
          >
          <UiTabsIndicator
            class="[&>div]:bg-muted inset-0 size-full rounded px-0 py-0.5 [&>div]:rounded"
          />
        </UiTabsList>
        <div
          class="bg-background inline-flex h-auto w-fit items-center rounded-md border p-0.5 shadow-xs"
        >
          <AnimatePresence>
            <Motion
              v-if="selectedTab === 'preview'"
              :initial="{ opacity: 0, width: 0, scale: 0 }"
              :animate="{ opacity: 1, width: 'auto', scale: 1 }"
              :exit="{ opacity: 0, width: 0, scale: 0 }"
              :transition="{ type: 'spring', stiffness: 500, damping: 30 }"
            >
              <UiToggleGroup
                type="single"
                default-value="100"
                @update:model-value="
                  (value: any) => {
                    resizableRef?.resize(parseInt(value as string));
                  }
                "
              >
                <UiToggleGroupItem
                  v-tippy="'Desktop View'"
                  class="size-7 rounded-sm p-0"
                  value="100"
                >
                  <Icon class="size-3.5" name="lucide:monitor" />
                  <span class="sr-only">Desktop View</span>
                </UiToggleGroupItem>
                <UiToggleGroupItem v-tippy="'Tablet View'" class="size-7 rounded-sm p-0" value="60">
                  <Icon class="size-3.5" name="lucide:tablet" />
                  <span class="sr-only">Tablet View</span>
                </UiToggleGroupItem>
                <UiToggleGroupItem v-tippy="'Mobile View'" value="40" class="size-7 rounded-sm p-0">
                  <Icon class="size-3.5" name="lucide:smartphone" />
                  <span class="sr-only">Mobile View</span>
                </UiToggleGroupItem>
              </UiToggleGroup>
            </Motion>
          </AnimatePresence>
          <UiButton
            v-if="externalViewLink"
            v-tippy="'Full Screen View'"
            target="_blank"
            :href="externalViewLink"
            class="h-7 rounded-sm"
            variant="ghost"
          >
            <Icon name="lucide:gallery-vertical" class="size-3.5" />
            <span class="sr-only">External View</span>
          </UiButton>
          <UiButton
            v-if="codeBlock || codeSnippet"
            v-tippy="'Copy Source Code'"
            class="h-7 rounded-sm"
            size="icon-sm"
            variant="ghost"
            @click="onCopy"
          >
            <Icon :name="copied ? 'lucide:check' : 'lucide:clipboard'" class="size-3.5" />
            <span class="sr-only">Copy Source Code</span>
          </UiButton>
        </div>
      </div>

      <UiTabsContent value="preview">
        <div class="bg-muted relative h-(--container-height) rounded-lg">
          <ClientOnly>
            <UiSplitter id="block-resizable" direction="horizontal" class="relative z-10">
              <UiSplitterPanel
                id="block-resizable-panel-1"
                class="bg-background relative overflow-hidden rounded-lg border transition-all"
                :default-size="100"
                :min-size="40"
                @ready="resizableRef = $event"
              >
                <div v-if="externalViewLink" class="bg-background absolute inset-0">
                  <UiIframeLazy
                    class="bg-background z-20 h-(--container-height) w-full"
                    :src="externalViewLink"
                    :iframe-class="props.frameClass"
                  />
                </div>
              </UiSplitterPanel>
              <UiSplitterHandle class="bg-transparent" />
              <UiSplitterPanel id="block-resizable-panel-2" :default-size="0" :min-size="0" />
            </UiSplitter>
          </ClientOnly>
        </div>
      </UiTabsContent>
      <UiTabsContent value="code" class="**:data-[slot='prose-pre-wrapper']:mt-0">
        <slot mdc-unwrap="p">
          <ProseCodeSnippet v-if="codeSnippet" :file="codeSnippet" language="vue" :title="title" />
          <div v-else class="flex h-[400px] items-center justify-center text-center font-semibold">
            No code snippet provided.
          </div>
        </slot>
      </UiTabsContent>
      <UiTabsContent
        value="components"
        class="flex flex-col gap-3 **:data-[slot='prose-pre-wrapper']:mt-0"
      >
        <slot name="components" mdc-unwrap="p">
          <div v-if="components" class="flex flex-col gap-3">
            <span>These are the components used in this example:</span>
            <ProsePmX class="!mt-0" :command="`ui-thing@latest add ${components}`" />
          </div>
          <div v-else class="flex h-[400px] items-center justify-center text-center font-semibold">
            No components used.
          </div>
        </slot>
      </UiTabsContent>
    </UiTabs>
  </div>
</template>

<script lang="ts" setup>
  import type { SplitterPanel } from "reka-ui";
  import type { HtmlHTMLAttributes } from "vue";

  const props = withDefaults(
    defineProps<{
      blockPath?: string;
      component?: string;
      components?: string;
      iframeHeight?: string;
      frameClass?: HtmlHTMLAttributes["class"];
      containerClass?: HtmlHTMLAttributes["class"];
      title?: string;
    }>(),
    {
      blockPath: "",
      component: "Block Code",
    }
  );

  if (!props.blockPath)
    throw createError({
      statusCode: 400,
      statusMessage: "[BlockShowcase.vue] Block path is required.",
    });

  const selectedTab = ref("preview");

  const _blockImports = import.meta.glob<string>("./**/*.vue", {
    query: "?raw",
    import: "default",
    eager: false, // Lazy load to improve initial performance
  });

  const resizableRef = ref<InstanceType<typeof SplitterPanel>>();

  // Lazy load code only when needed (when switching to code tab)
  const codeBlock = ref<string | undefined>(undefined);
  const codeLoaded = ref(false);

  const loadCode = async () => {
    if (codeLoaded.value) return; // Only load once

    const path = _blockImports[`./${props.blockPath}.vue`];
    if (path) {
      try {
        codeBlock.value = (await path()) ?? undefined;
        codeLoaded.value = true;
      } catch (error) {
        console.error(`Failed to load block code: ${props.blockPath}`, error);
      }
    }
  };

  // Load code when switching to code tab
  watch(selectedTab, async (newTab) => {
    if (newTab === "code" && !codeLoaded.value) {
      await loadCode();
    }
  });

  // Generate the prose-code-snippet
  const codeSnippet = computed(() => `/components/content/Block/${props.blockPath}.vue`);

  const { copied, copy } = useClipboard({ copiedDuring: 2500, legacy: true });

  const { contentPage } = await useDocPage();
  const route = useRoute();

  const onCopy = async () => {
    // Load code if not already loaded
    if (!codeLoaded.value) {
      await loadCode();
    }

    if (!codeBlock.value) return;
    copy(codeBlock.value);
    useSonner("Copied to clipboard!");
    // Track copied code event
    useTrackEvent("copy_code", {
      code_source: "block",
      code_language: "vue",
      file_name: "N/A",
      block_path: props.blockPath,
      component: props.component,
      page_title: contentPage?.title || "unknown",
      page_path: route.path,
      page_location: window.location.href,
    });
  };

  const externalViewLink = computed(() => {
    return `/block-renderer?component=${encodeURIComponent(props.component)}&path=${encodeURIComponent(props.blockPath)}&containerClass=${encodeURIComponent(props.containerClass ?? "")}`;
  });
</script>
