<template>
  <UiBreadcrumbs :items="items" class="justify-center" />
</template>

<script lang="ts" setup>
  import type { Crumbs } from "~/components/Ui/Breadcrumbs.vue";

  const items: Crumbs[] = [
    { label: "Home", link: "/", icon: "lucide:home" },
    { label: "Components", link: "/", icon: "lucide:component" },
    { label: "Breadcrumb" },
  ];
</script>
