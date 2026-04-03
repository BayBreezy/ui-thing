<template>
  <h1 :id="id" :class="proseH1Styles({ class: normalizeClass(_class) || undefined })">
    <NuxtLink
      v-if="generate"
      data-slot="h1-link"
      v-bind="linkProps"
      class="relative inline-block"
      :to="`#${id}`"
    >
      <Icon
        name="lucide:link"
        aria-hidden="true"
        class="absolute top-2 -left-6 h-4 w-4 text-muted-foreground opacity-0 transition-opacity duration-150 group-focus-within:opacity-100 group-hover:opacity-100"
      />
      <slot />
    </NuxtLink>
    <slot v-else />
  </h1>
</template>

<script lang="ts">
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  import type { NuxtLinkProps } from "#app";

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
    base: "group scroll-m-20 text-4xl font-extrabold tracking-tight text-balance",
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
