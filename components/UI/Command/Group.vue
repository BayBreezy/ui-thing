<template>
  <Command.Group :heading="heading" :class="styles({ class: props.class })">
    <slot></slot>
  </Command.Group>
</template>

<script lang="ts" setup>
  import { Command } from "vue-command-palette";

  const props = defineProps<{
    heading: string;
    class?: any;
  }>();

  const styles = tv({
    base: "[&>[command-group-heading]]:px-2 [&>[command-group-heading]]:py-1.5 [&>[command-group-heading]]:text-xs [&>[command-group-heading]]:font-medium [&>[command-group-heading]]:text-muted-foreground [&[command-group]]:overflow-hidden [&[command-group]]:p-1 [&[command-group]]:text-foreground",
  });
</script>
