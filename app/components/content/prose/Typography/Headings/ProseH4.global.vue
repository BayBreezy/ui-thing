<template>
  <h4 :id="id" :class="proseH4Styles({ class: normalizeClass(_class) || undefined })">
    <NuxtLink
      v-if="generate"
      data-slot="h4-link"
      v-bind="linkProps"
      class="group relative inline-block"
      :to="`#${id}`"
    >
      <Icon
        name="lucide:link"
        aria-hidden="true"
        class="absolute top-1.5 -left-6 hidden size-3.5 text-primary opacity-0 transition-opacity duration-150 group-focus-within:opacity-70 group-hover:opacity-70 lg:block"
      />
      <slot />
    </NuxtLink>
    <slot v-else />
  </h4>
</template>

<script lang="ts">
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  import type { NuxtLinkProps } from "#app";

  export type ProseH4Props = {
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

  export const proseH4Styles = tv({
    base: "scroll-m-20 text-xl font-semibold tracking-tight text-balance not-first:mt-6",
  });
</script>

<script setup lang="ts">
  const { id, linkProps, class: _class } = defineProps<ProseH4Props>();

  // Determine if we should generate anchor links
  const { headings } = useRuntimeConfig().public.mdc;
  const generate = computed(
    () =>
      id &&
      ((typeof headings?.anchorLinks === "boolean" && headings?.anchorLinks === true) ||
        (typeof headings?.anchorLinks === "object" && headings?.anchorLinks?.h4))
  );
</script>
