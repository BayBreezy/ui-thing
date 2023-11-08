<template>
  <component
    :is="eltype"
    :to="to"
    @click="onClick"
    :class="
      styles({
        hover: Boolean(onClick) || Boolean(to) || Boolean(href),
        class: props.class,
      })
    "
  >
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    class?: any;
    onClick?: () => void;
    to?: string;
    href?: string;
  }>();

  const styles = tv({
    base: "flex w-full items-center gap-5 px-4 py-2",
    variants: {
      hover: {
        true: "cursor-pointer outline-none hover:bg-muted focus-visible:ring-4 focus-visible:ring-primary/10",
      },
    },
  });

  const eltype = computed(() => {
    if (props.to || props.href) return resolveComponent("NuxtLink");
    if (props.onClick) return "button";
    return "li";
  });
</script>
