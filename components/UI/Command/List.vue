<template>
  <Command.List>
    <slot></slot>
  </Command.List>
</template>

<script lang="ts" setup>
  import { Command } from "vue-command-palette";
</script>

<style>
  [command-list] {
    @apply max-h-[300px] overflow-y-auto overflow-x-hidden;
  }
</style>
