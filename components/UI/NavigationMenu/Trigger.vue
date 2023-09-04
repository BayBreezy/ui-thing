<template>
  <NavigationMenuTrigger :as-child="asChild" :class="styles({ class: props.class })">
    <slot>{{ title }}</slot>
    <Icon
      :name="icon || 'lucide:chevron-down'"
      class="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuTrigger>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
    class?: any;
    icon?: string;
    title?: string;
  }>();

  const styles = tv({
    base: "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
  });
</script>
