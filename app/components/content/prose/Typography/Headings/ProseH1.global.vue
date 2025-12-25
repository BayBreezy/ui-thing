<template>
  <h1 :id="id" :class="proseH1Styles({ class: _class })">
    <NuxtLink v-if="generate" data-slot="h1-link" v-bind="linkProps" :to="`#${id}`">
      <slot />
    </NuxtLink>
    <slot v-else />
  </h1>
</template>

<script lang="ts">
  import type { NuxtLinkProps } from "#app";
  import type { HTMLAttributes } from "vue";

  export type ProseH1Props = {
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

  export const proseH1Styles = tv({
    base: "scroll-m-20 text-4xl font-extrabold tracking-tight text-balance",
  });
</script>

<script setup lang="ts">
  const { id, linkProps, class: _class } = defineProps<ProseH1Props>();

  // Determine if we should generate anchor links
  const { headings } = useRuntimeConfig().public.mdc;
  const generate = computed(
    () =>
      id &&
      ((typeof headings?.anchorLinks === "boolean" && headings?.anchorLinks === true) ||
        (typeof headings?.anchorLinks === "object" && headings?.anchorLinks?.h1))
  );
</script>
