<template>
  <SelectTrigger :as-child="asChild" :class="styles({ class: props.class })">
    <slot>
      <UISelectValue :placeholder="placeholder" />
    </slot>
    <UISelectIcon :icon="icon" />
  </SelectTrigger>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
    class?: any;
    icon?: string;
    placeholder?: string;
  }>();

  const styles = tv({
    base: "line-clamp-1 flex h-10 w-full items-center justify-between truncate rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-muted-foreground",
  });
</script>
