<template>
  <div class="flex flex-col items-center gap-10">
    <UiBreadcrumbs separator="lucide:slash" :items="items" class="justify-center" />
    <UiBreadcrumbs separator="lucide:dot" :items="items" class="justify-center" />
  </div>
</template>

<script lang="ts" setup>
  import type { Crumbs } from "~/components/Ui/Breadcrumbs.vue";

  const items: Crumbs[] = [
    { icon: "lucide:home" },
    { label: "Components", link: "/" },
    { label: "Breadcrumb" },
  ];
</script>
