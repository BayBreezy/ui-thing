<template>
  <div>
    <UiBreadcrumbs class="justify-center" :items="crumbs" />
  </div>
</template>

<script lang="ts" setup>
  import type { Crumbs } from "~/components/Ui/Breadcrumbs.vue";

  const crumbs: Crumbs[] = [
    {
      label: "Home",
      click: () => {
        console.log("clicked");
      },
    },
    { label: "Sales", link: "#" },
    {
      label: "Dashboard",
      link: "/examples/dashboard",
      icon: "heroicons:squares-plus",
      disabled: true,
    },
  ];
</script>
