<template>
  <div
    class="not-prose"
    :style="{
      '--container-height': props.iframeHeight || '600px',
    }"
  >
    <ClientOnly>
      <UiTabs defaultValue="preview">
        <div class="mb-5 flex items-center justify-between">
          <UiTabsList>
            <UiTabsTrigger value="preview">Preview</UiTabsTrigger>
            <UiTabsTrigger value="code">Code</UiTabsTrigger>
          </UiTabsList>

          <div
            class="hidden h-[28px] items-center gap-1.5 rounded-md border p-[2px] shadow-sm md:flex"
          >
            <ToggleGroupRoot
              type="single"
              default-value="100"
              @update:model-value="
                (value) => {
                  resizableRef?.resize(parseInt(value));
                }
              "
            >
              <ToggleGroupItem value="100" class="rounded-sm p-0">
                <UiToggle class="size-5" as="span"><Icon name="lucide:laptop" /></UiToggle>
              </ToggleGroupItem>
              <ToggleGroupItem value="60" class="rounded-sm p-0">
                <UiToggle class="size-5" as="span"><Icon name="lucide:tablet" /></UiToggle>
              </ToggleGroupItem>
              <ToggleGroupItem value="30" class="rounded-sm p-0">
                <UiToggle class="size-5" as="span"><Icon name="lucide:smartphone" /></UiToggle>
              </ToggleGroupItem>
            </ToggleGroupRoot>
          </div>
        </div>
        <UiTabsContent
          forceMount
          value="preview"
          class="relative h-[--container-height] rounded-lg bg-muted"
        >
          <UiSplitter id="block-resizable" direction="horizontal" class="relative z-10">
            <UiSplitterPanel
              @ready="resizableRef = $event"
              id="block-resizable-panel-1"
              class="relative rounded-lg border bg-background transition-all"
              :default-size="100"
              :min-size="30"
            >
              <iframe
                v-show="!isLoading"
                @load="isLoading = false"
                :src="`/block-renderer?component=${props.component}&containerClass=${containerClass}`"
                class="relative z-20 h-[--container-height] w-full bg-background"
              ></iframe>
            </UiSplitterPanel>
            <UiSplitterHandle class="bg-transparent" />
            <UiSplitterPanel id="block-resizable-panel-2" :default-size="0" :min-size="0" />
          </UiSplitter>
        </UiTabsContent>
      </UiTabs>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
  import { ToggleGroupItem, ToggleGroupRoot } from "radix-vue";
  import { codeToHtml } from "shiki";

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
  const preCode = ref<string | null>(null);
  const importPath = async () => {
    if (!props.blockPath) return console.error("Block path is required.");
    const blockImports = import.meta.glob<string>("./**/*.vue", {
      query: "?raw",
      import: "default",
    });
    const path = blockImports[`./${props.blockPath}.vue`];
    codeBlock.value = await path();
    preCode.value = await codeToHtml(codeBlock.value, {
      lang: "vue",
      theme: "material-theme-palenight",
    });
    isLoading.value = false;
  };

  const resizableRef = ref();

  await importPath();

  watch(
    () => colorMode.value,
    async () => {
      isLoading.value = true;
      setTimeout(() => {
        isLoading.value = false;
      }, 1500);
    }
  );
</script>
