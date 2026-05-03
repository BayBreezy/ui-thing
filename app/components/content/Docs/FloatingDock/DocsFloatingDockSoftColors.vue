<template>
  <div
    class="dark:via-background relative min-h-[280px] rounded-[2rem] bg-linear-to-br from-sky-100 via-white to-violet-100 p-4 dark:from-sky-950/40 dark:to-violet-950/40"
  >
    <UiFloatingDock
      :items="items"
      desktop-class="absolute bottom-4 left-1/2 -translate-x-1/2"
      mobile-class="absolute right-4 bottom-4"
    />
  </div>
</template>

<script lang="ts" setup>
  const items = [
    { title: "Inbox", icon: "lucide:inbox", href: "#", active: true },
    { title: "Calendar", icon: "lucide:calendar-days", href: "#", active: true },
    { title: "Files", icon: "lucide:folder-open", href: "#" },
    { title: "Teams", icon: "lucide:users-round", href: "#", active: true },
    { title: "Analytics", icon: "lucide:chart-column", href: "#" },
  ];
</script>
