<template>
  <div
    class="w-64 rounded-lg border bg-card font-mono shadow-[0_1px_1px_rgba(0,0,0,0.02),_0_2px_2px_rgba(0,0,0,0.02),_0_4px_4px_rgba(0,0,0,0.02),_0_8px_8px_rgba(0,0,0,0.02),_0_16px_16px_rgba(0,0,0,0.02),_0_32px_32px_rgba(0,0,0,0.02)]"
    :class="[selected ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : '']"
  >
    <div
      class="flex items-center justify-between border-b border-border/80 bg-gradient-to-t from-background/70 px-4 py-3 dark:from-background/30"
    >
      <div class="text-[13px]">
        <span class="text-muted-foreground/80">/</span>
        <span class="font-medium">{{ data.label }}</span>
      </div>
      <UiButton
        size="icon"
        variant="ghost"
        class="-my-2 -me-2 text-muted-foreground/60 shadow-none hover:bg-transparent hover:text-muted-foreground"
        aria-label="Open edit menu"
        title="Open edit menu"
        v-tippy="'Open edit menu'"
      >
        <Icon name="lucide:ellipsis-vertical" class="size-5" aria-hidden="true" />
      </UiButton>
    </div>
    <div class="py-2 text-xs">
      <template v-for="(field, index) in data.fields" :key="field.name">
        <div class="group relative px-4">
          <div
            class="flex items-center justify-between gap-2 border-b border-dashed py-2"
            :class="[index === data.fields.length - 1 ? 'border-b-0' : '']"
          >
            <div class="flex items-center gap-2">
              <span class="truncate" :class="[field.isPrimary ? 'font-semibold' : 'font-medium']">{{
                field.name
              }}</span>
              <Icon
                v-if="field.isPrimary"
                name="lucide:key-round"
                class="size-3 text-muted-foreground"
              />
              <span v-else-if="field.isForeign" class="text-muted-foreground/70">(FK)</span>
            </div>
            <span class="text-muted-foreground/60">{{ field.type }}</span>

            <!-- Field handles -->
            <template
              v-if="
                (field.isPrimary && sourceConnections.includes(field.name)) ||
                (field.isForeign && targetConnections.includes(field.name))
              "
            >
              <Handle
                :type="field.isPrimary ? 'source' : 'target'"
                :position="field.isPrimary ? Position.Left : Position.Right"
                :id="field.name"
                class="size-2.5 rounded-full border-2 border-background transition"
                :class="[selected ? '!bg-primary' : '!bg-foreground/60']"
                :connectable="false"
              />
            </template>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { Handle, Position } from "@vue-flow/core";
  import type { CustomTableData, CustomTableEvents } from "./schema-data";
  import type { NodeProps } from "@vue-flow/core";

  import { initialSchemaEdges } from "./schema-data";

  const props = defineProps<NodeProps<CustomTableData, CustomTableEvents>>();

  // Find all source connections for this node
  const sourceConnections = computed(() =>
    initialSchemaEdges.filter((edge) => edge.source === props.id).map((edge) => edge.sourceHandle)
  );

  // Find all target connections for this node
  const targetConnections = computed(() =>
    initialSchemaEdges.filter((edge) => edge.target === props.id).map((edge) => edge.targetHandle)
  );
</script>
