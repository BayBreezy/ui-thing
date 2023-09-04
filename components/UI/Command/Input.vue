<template>
  <div class="flex items-center border-b px-3">
    <slot name="icon">
      <Icon :name="icon" v-if="icon" class="mr-2 h-4 w-4 shrink-0 opacity-50" />
    </slot>
    <Command.Input :placeholder="placeholder" :class="styles({ class: props.class })" />
  </div>
</template>

<script lang="ts" setup>
  import { Command } from "vue-command-palette";

  const props = withDefaults(
    defineProps<{
      placeholder?: string;
      icon?: string;
      class?: any;
    }>(),
    {
      placeholder: "Search...",
      icon: "lucide:search",
    }
  );

  const styles = tv({
    base: "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
  });
</script>
