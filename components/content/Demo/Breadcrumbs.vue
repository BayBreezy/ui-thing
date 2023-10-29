<template>
  <div>
    <Heading title="Breadcrumbs" subtext="Allow your users to navigate easily in your app." />

    <UIBreadcrumbs :items="crumbs" />
  </div>
</template>

<script lang="ts" setup>
  import { Crumbs } from "@/components/UI/Breadcrumbs.vue";

  const crumbs: Crumbs[] = [
    {
      label: "Home",
      click: () => {
        console.log("clicked");
      },
    },
    {
      label: "Sales",
      link: "#",
    },
    {
      label: "Dashboard",
      link: "/examples/dashboard",
      icon: "heroicons:squares-plus",
      disabled: true,
    },
  ];
</script>
