<template>
  <Label
    data-slot="label"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
    v-bind="forwarded"
  >
    <slot />
    <slot name="hint">
      <span v-if="hint" data-slot="label-hint" class="text-xs font-normal text-muted-foreground">
        {{ hint }}
      </span>
    </slot>
  </Label>
</template>

<script lang="ts">
  import { Label } from "reka-ui";
  import type { LabelProps as LP } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export type LabelProps = LP & {
    /** Custom class(es) to add to the label */
    class?: HTMLAttributes["class"];
    /**
     * Optional hint text to display alongside the label.
     */
    hint?: string;
  };
</script>

<script lang="ts" setup>
  const props = defineProps<LabelProps>();

  const forwarded = reactiveOmit(props, "class", "hint");

  const styles = tv({
    base: "flex items-center justify-between gap-2 text-sm leading-none font-medium select-none not-peer-disabled:cursor-pointer group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
  });
</script>
