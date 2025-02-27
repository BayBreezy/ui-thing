<template>
  <Primitive data-slot="timeline-header" :as :as-child>
    <slot />
  </Primitive>
</template>

<script lang="ts" setup>
  import { Primitive } from "radix-vue";
  import type { PrimitiveProps } from "radix-vue";

  defineProps<PrimitiveProps>();
</script>
