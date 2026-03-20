<template>
  <NuxtLink
    v-bind="forwarded"
    data-slot="navbar-item"
    :class="styles().wrapper({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
    <span data-navbar="current-indicator" :class="styles().indicator()" />
  </NuxtLink>
</template>

<script lang="ts" setup>
  import { normalizeClass } from "vue";
  import type { NuxtLinkProps } from "#app";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    Omit<NuxtLinkProps, "noPrefetch"> & {
      /** custom t\class(es) to add to the link */
      class?: HTMLAttributes["class"];
    }
  >();

  const forwarded = reactiveOmit(props, "class");

  const styles = tv({
    slots: {
      wrapper: [
        "group/sidebar-item hover:bg-secondary",
        "aria-[current=page]*:data-[slot=icon]:text-foreground aria-[current=page]:text-foreground",
        "col-span-full grid grid-cols-[auto_1fr_1.5rem_0.5rem_auto] supports-[grid-template-columns:subgrid]:grid-cols-subgrid md:supports-[grid-template-columns:subgrid]:grid-cols-none",
        "relative min-w-0 items-center gap-x-3 rounded-lg p-2 text-left text-base/6 font-medium sm:text-sm/5 md:gap-x-2.5",
        "*:data-[slot=icon]:size-5 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:text-muted-foreground sm:*:data-[slot=icon]:size-4",
        "*:data-[slot=loader]:size-5 *:data-[slot=loader]:shrink-0 sm:*:data-[slot=loader]:size-4",
        "*:not-nth-2:last:data-[slot=icon]:row-start-1 *:not-nth-2:last:data-[slot=icon]:ml-auto *:not-nth-2:last:data-[slot=icon]:size-5 sm:*:not-nth-2:last:data-[slot=icon]:size-4",
        "*:data-[slot=avatar]:-m-0.5 *:data-[slot=avatar]:size-6 sm:*:data-[slot=avatar]:size-5",
        "pressed:*:data-[slot=icon]:text-foreground *:data-[slot=icon]:text-muted-foreground hover:*:data-[slot=icon]:text-foreground",
        "outline-hidden focus-visible:ring-2 focus-visible:inset-ring focus-visible:ring-ring/20 focus-visible:inset-ring-ring",
        "text-left disabled:cursor-default disabled:opacity-50",
      ],
      indicator: [
        "hidden group-aria-[current=page]/sidebar-item:inline-block",
        "absolute rounded-full bg-foreground [--gutter:--spacing(0.5)]",
        "inset-y-2 -left-4 w-(--gutter) md:inset-y-auto md:w-auto",
        "md:inset-x-2 md:-bottom-[--spacing(3.4)] md:h-(--gutter) md:group-data-[navbar=inset]/navbar-intent:-bottom-[--spacing(3.1)]",
      ],
    },
  });
</script>
