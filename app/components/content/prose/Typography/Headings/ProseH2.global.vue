<template>
  <h2 :id="id" :class="proseH2Styles({ class: normalizeClass(_class) || undefined })">
    <NuxtLink
      v-if="generate"
      data-slot="h2-link"
      v-bind="linkProps"
      class="group relative inline-block"
      :to="`#${id}`"
    >
      <Icon
        name="lucide:link"
        aria-hidden="true"
        class="absolute top-2 -left-8 hidden size-5 text-primary opacity-0 transition-opacity duration-150 group-focus-within:opacity-70 group-hover:opacity-70 lg:block"
      />
      <slot />
    </NuxtLink>
    <slot v-else />
  </h2>
</template>

<script lang="ts">
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  import type { NuxtLinkProps } from "#app";

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
