<template>
  <h2 :id="id" :class="proseH2Styles({ class: _class })">
    <NuxtLink v-if="generate" data-slot="h2-link" v-bind="linkProps" :to="`#${id}`">
      <slot />
    </NuxtLink>
    <slot v-else />
  </h2>
</template>

<script lang="ts">
  import type { NuxtLinkProps } from "#app";
  import type { HTMLAttributes } from "vue";

  export type ProseH2Props = {
    /**
     * Optional ID for anchor links
     */
    id?: string;
    /**
     * Props to pass to NuxtLink when anchor links are enabled
     */
    linkProps?: NuxtLinkProps;
    /**
     * Additional classes for the parent element
     */
    class?: HTMLAttributes["class"];
  };

  export const proseH2Styles = tv({
    base: "mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight text-balance transition-colors first:mt-0",
  });
</script>

<script setup lang="ts">
  const { id, linkProps, class: _class } = defineProps<ProseH2Props>();

  // Determine if we should generate anchor links
  const { headings } = useRuntimeConfig().public.mdc;
  const generate = computed(
    () =>
      id &&
      ((typeof headings?.anchorLinks === "boolean" && headings?.anchorLinks === true) ||
        (typeof headings?.anchorLinks === "object" && headings?.anchorLinks?.h2))
  );
</script>
