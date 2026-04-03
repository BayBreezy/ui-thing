<template>
  <Primitive
    v-if="isRender"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
    data-slot="command-empty"
    cmdk-empty
  >
    <slot />
  </Primitive>
</template>

<script setup lang="ts">
  import { reactiveOmit } from "@vueuse/core";
  import { Primitive } from "reka-ui";
  import type { PrimitiveProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  import { useCommand } from "./Command.vue";

  const props = defineProps<PrimitiveProps & { class?: HTMLAttributes["class"] }>();

  const forwarded = reactiveOmit(props, "class");

  const { filterState } = useCommand();
  const isRender = computed(() => !!filterState.search && filterState.filtered.count === 0);

  const styles = tv({
    base: "py-6 text-center text-sm",
  });
</script>
