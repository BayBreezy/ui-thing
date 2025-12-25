<template>
  <NuxtLink data-slot="prose-a" v-bind="rest" :class="proseAStyles({ class: _class })">
    <slot />
  </NuxtLink>
</template>

<script lang="ts">
  import type { NuxtLinkProps } from "#app";
  import type { HTMLAttributes } from "vue";

  export type ProseAProps = NuxtLinkProps & {
    /**
     * Additional classes for the parent element
     */
    class?: HTMLAttributes["class"];
  };

  export const proseAStyles = tv({
    base: "inline-block font-semibold text-inherit underline underline-offset-4",
  });
</script>

<script setup lang="ts">
  const { class: _class, ...rest } = defineProps<ProseAProps>();
</script>
