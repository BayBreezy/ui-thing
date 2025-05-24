<template>
  <div class="flex min-h-[calc(100dvh-58px)] w-full flex-col">
    <ExamplesSchemaVisualizerHeader />
    <ClientOnly>
      <ExamplesSchemaVisualizer />
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup></script>
