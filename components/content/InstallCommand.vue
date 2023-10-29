<template>
  <div>
    <template v-for="(_, name) in $slots">
      <slot :name="name" />
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { TabsContent, TabsList, TabsRoot, TabsTrigger } from "radix-vue";

  const tabs = [
    { title: "NPM", icon: "logos:npm", value: "npm" },
    { title: "Yarn", icon: "logos:yarn", value: "yarn" },
    { title: "PNPM", icon: "logos:pnpm", value: "pnpm" },
    { title: "Bun", icon: "logos:bun", value: "bun" },
  ];
</script>

<style scoped>
  :deep(pre) {
    margin: 0;
  }
</style>
