<template>
  <h6 :id="id" :class="proseH6Styles({ class: normalizeClass(_class) || undefined })">
    <NuxtLink v-if="generate" data-slot="h6-link" v-bind="linkProps" :to="`#${id}`">
      <slot />
    </NuxtLink>
    <slot v-else />
  </h6>
</template>

<script lang="ts">
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  import type { NuxtLinkProps } from "#app";

  export type ProseH6Props = {
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

  export const proseH6Styles = tv({
    base: "scroll-m-20 text-lg font-semibold tracking-tight text-balance not-first:mt-6",
  });
</script>

<script setup lang="ts">
  const { id, linkProps, class: _class } = defineProps<ProseH6Props>();

  // Determine if we should generate anchor links
  const { headings } = useRuntimeConfig().public.mdc;
  const generate = computed(
    () =>
      id &&
      ((typeof headings?.anchorLinks === "boolean" && headings?.anchorLinks === true) ||
        (typeof headings?.anchorLinks === "object" && headings?.anchorLinks?.h6))
  );
</script>
