<template>
  <div class="not-prose relative flex min-h-[calc(100dvh-58px)] w-full flex-col rounded-lg border">
    <ExamplesSchemaVisualizerHeader />
    <ClientOnly>
      <ExamplesSchemaVisualizer />
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup></script>
