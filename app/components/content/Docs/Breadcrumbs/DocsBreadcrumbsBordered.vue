<template>
  <UiBreadcrumbs
    :items="items"
    class="mx-auto w-fit rounded-lg border border-border bg-background px-3 py-2 shadow-sm shadow-black/5"
  />
</template>

<script lang="ts" setup>
  import type { Crumbs } from "~/components/Ui/Breadcrumbs.vue";

  const items: Crumbs[] = [
    { icon: "lucide:home" },
    { label: "Components", link: "/" },
    { label: "Breadcrumb" },
  ];
</script>
