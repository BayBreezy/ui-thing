<template>
  <div class="h-[calc(100dvh-58px)] w-full">
    <VueFlow :nodes :edges fit-view-on-init :min-zoom="0.5" :max-zoom="1">
      <Background variant="dots" :gap="20" :size="3" pattern-color="hsl(var(--muted))" />
      <MiniMap
        node-color="hsl(var(--muted))"
        node-stroke-color="hsl(var(--primary))"
        :node-border-radius="30"
        mask-color="hsl(var(--muted))"
        :mask-border-radius="30"
        pannable
        :height="100"
        :offset-scale="5"
        :width="120"
        inverse-pan
        position="bottom-left"
      />
      <Panel position="bottom-right">
        <div class="shadow-xs inline-flex -space-x-px rounded-md rtl:space-x-reverse">
          <UiButton
            v-tippy="'Zoom In'"
            class="rounded-none bg-card text-muted-foreground/80 shadow-none first:rounded-s-lg last:rounded-e-lg hover:text-muted-foreground focus-visible:z-10"
            size="icon"
            variant="outline"
            @click="zoomIn({})"
          >
            <Icon name="lucide:plus" class="size-5" aria-hidden="true" />
          </UiButton>
          <UiButton
            v-tippy="'Zoom Out'"
            class="rounded-none bg-card text-muted-foreground/80 shadow-none first:rounded-s-lg last:rounded-e-lg hover:text-muted-foreground focus-visible:z-10"
            size="icon"
            variant="outline"
            @click="zoomOut({})"
          >
            <Icon name="lucide:minus" class="size-5" aria-hidden="true" />
          </UiButton>
          <UiButton
            v-tippy="'Reset View'"
            class="rounded-none bg-card text-muted-foreground/80 shadow-none first:rounded-s-lg last:rounded-e-lg hover:text-muted-foreground focus-visible:z-10"
            size="icon"
            variant="outline"
            @click="fitView({ padding: 0.2 })"
          >
            <Icon name="lucide:scan" class="size-5" aria-hidden="true" />
          </UiButton>
        </div>
      </Panel>
      <Panel position="bottom-center">
        <NuxtLink
          external
          target="_blank"
          href="https://crafted.is/exp7"
          class="z-10 rounded-md bg-muted p-2 py-1.5 text-center text-xs shadow-md"
        >
          Credits to Crafted ❤️
        </NuxtLink>
      </Panel>
      <template #node-tableNode="customNodeProps">
        <ExamplesSchemaVisualizerTableNode v-bind="customNodeProps" />
      </template>
    </VueFlow>
  </div>
</template>

<script lang="ts" setup>
  import { Background } from "@vue-flow/background";
  import { Panel, useVueFlow, VueFlow } from "@vue-flow/core";
  import { MiniMap } from "@vue-flow/minimap";

  import { initialSchemaEdges, initialSchemaNodes } from "./schema-data";

  import "@vue-flow/controls/dist/style.css";
  import "@vue-flow/core/dist/style.css";

  const nodes = ref(initialSchemaNodes);
  const edges = ref(initialSchemaEdges);

  const { fitView, zoomIn, zoomOut } = useVueFlow();
</script>
