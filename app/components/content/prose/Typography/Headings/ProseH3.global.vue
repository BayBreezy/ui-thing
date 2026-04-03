<template>
  <h3 :id="id" :class="proseH3Styles({ class: normalizeClass(_class) || undefined })">
    <NuxtLink
      v-if="generate"
      data-slot="h3-link"
      v-bind="linkProps"
      class="group relative inline-block"
      :to="`#${id}`"
    >
      <Icon
        name="lucide:link"
        aria-hidden="true"
        class="absolute top-1.5 -left-8 hidden size-5 text-primary opacity-0 transition-opacity duration-150 group-focus-within:opacity-70 group-hover:opacity-70 lg:block"
      />
      <slot />
    </NuxtLink>
    <slot v-else />
  </h3>
</template>

<script lang="ts">
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  import type { NuxtLinkProps } from "#app";

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
