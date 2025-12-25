<template>
  <h3 :id="id" :class="proseH3Styles({ class: _class })">
    <NuxtLink v-if="generate" data-slot="h3-link" v-bind="linkProps" :to="`#${id}`">
      <slot />
    </NuxtLink>
    <slot v-else />
  </h3>
</template>

<script lang="ts">
  import type { NuxtLinkProps } from "#app";
  import type { HTMLAttributes } from "vue";

  export type ProseH3Props = {
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

  export const proseH3Styles = tv({
    base: "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight text-balance not-first:mt-8",
  });
</script>

<script setup lang="ts">
  const { id, linkProps, class: _class } = defineProps<ProseH3Props>();

  // Determine if we should generate anchor links
  const { headings } = useRuntimeConfig().public.mdc;
  const generate = computed(
    () =>
      id &&
      ((typeof headings?.anchorLinks === "boolean" && headings?.anchorLinks === true) ||
        (typeof headings?.anchorLinks === "object" && headings?.anchorLinks?.h3))
  );
</script>
