<template>
  <ProseCallout v-if="error" variant="error" title="Mermaid Chart Error" :description="error" />
  <div v-else class="rounded-lg p-4 text-card-foreground not-first:mt-5 not-last:mb-5">
    <div v-if="loading" class="flex items-center justify-center">
      <div class="flex flex-col items-center gap-2 p-4">
        <Icon name="lucide:loader-circle" class="size-6! animate-spin" />
        <span class="text-sm text-muted-foreground">Rendering Chart</span>
      </div>
    </div>
    <div
      ref="mermaidContainer"
      class="flex justify-center overflow-x-auto transition-all"
      v-html="svgContent"
    />
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    /** The Mermaid diagram definition code */
    code?: string;
  }>();

  const mermaidContainer = useTemplateRef("mermaidContainer");
  const svgContent = ref<string>("");
  const error = ref<string | null>(null);
  const loading = ref(true);
  const hasRenderedOnce = ref(false);
  const mermaidDefinition = ref("");

  const colorMode = useColorMode();
  const { $mermaidInstance, $mermaidInitConfig } = useNuxtApp();
  const slots = useSlots();

  const mermaidTheme = computed(() => (colorMode.value === "dark" ? "dark" : "default"));
  // Generate unique IDs
  const uniqueId = `mermaid-${Math.random().toString(36).substring(2, 9)}`;
  /**
   * Renders the Mermaid diagram with the current theme and configuration
   */
  async function renderMermaid() {
    if (!$mermaidInstance) {
      error.value = "Mermaid instance not initialized";
      loading.value = false;
      return;
    }

    try {
      loading.value = true;
      error.value = null;

      // Get diagram definition from props or slot content
      mermaidDefinition.value =
        props.code?.trim() ||
        slots
          .default?.()
          .map((vnode) => vnode.children)
          .join("")
          .trim() ||
        "";

      if (!mermaidDefinition.value) {
        error.value = "No Mermaid definition provided";
        loading.value = false;
        return;
      }

      // Initialize Mermaid with current theme
      $mermaidInstance.initialize({
        ...$mermaidInitConfig,
        theme: mermaidTheme.value,
      });

      await nextTick();

      // Render the diagram with a unique ID
      const { svg } = await $mermaidInstance.render(`mermaid-${uniqueId}`, mermaidDefinition.value);

      svgContent.value = svg;
      hasRenderedOnce.value = true;
    } catch (e) {
      console.error("Error rendering Mermaid chart:", e);
      error.value = (e as any)?.message || String(e);
    } finally {
      loading.value = false;
    }
  }

  useIntersectionObserver(
    mermaidContainer,
    ([entry]) => {
      if (entry?.isIntersecting && !hasRenderedOnce.value) {
        renderMermaid();
      }
    },
    { threshold: 0.1 }
  );

  // Re-render when theme changes (only if already rendered once)
  watch(mermaidTheme, () => {
    if (hasRenderedOnce.value) {
      renderMermaid();
    }
  });

  // Re-render when code prop changes (only if already rendered once)
  watch(
    () => props.code,
    () => {
      if (hasRenderedOnce.value) {
        renderMermaid();
      }
    }
  );

  const emit = defineEmits<{
    mermaidError: [payload?: string];
  }>();

  // Watch error and emit event
  watch(error, (newError) => {
    if (newError) {
      // Emit an event or handle the error as needed
      emit("mermaidError", newError);
    }
  });
</script>
