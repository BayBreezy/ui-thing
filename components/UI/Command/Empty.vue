<template>
  <Command.Empty>
    <slot>{{ text }}</slot>
  </Command.Empty>
</template>

<script lang="ts" setup>
  import { Command } from "vue-command-palette";

  const props = withDefaults(
    defineProps<{
      text?: string;
    }>(),
    {
      text: "No results found",
    }
  );
</script>

<style>
  [command-empty=""] {
    @apply py-6 text-center text-sm;
  }
</style>
