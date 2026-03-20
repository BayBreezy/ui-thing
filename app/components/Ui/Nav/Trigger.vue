<template>
  <UiButton
    data-slot="navbar-trigger"
    variant="ghost"
    :aria-label="ariaLabel"
    size="icon-sm"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
    @click="
      ($event: MouseEvent) => {
        injectedValues?.toggleNav();
        props.onClick?.($event);
      }
    "
  >
    <Icon :name="icon" />
    <span class="sr-only">Toggle Navbar</span>
  </UiButton>
</template>

<script lang="ts" setup>
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  import { navProviderKey } from "./Provider.vue";

  const injectedValues = inject(navProviderKey);

  if (!injectedValues) {
    throw createError({
      statusCode: 500,
      message: "Nav context not found. Make sure to wrap your component with <NavProvider>.",
    });
  }

  const props = withDefaults(
    defineProps<{
      ariaLabel?: string;
      class?: HTMLAttributes["class"];
      onClick?: (event: MouseEvent) => void;
      icon?: string;
    }>(),
    {
      ariaLabel: "Toggle Navbar",
      icon: "lucide:menu",
    }
  );

  const styles = tv({
    base: "-ml-2 lg:hidden",
  });
</script>
