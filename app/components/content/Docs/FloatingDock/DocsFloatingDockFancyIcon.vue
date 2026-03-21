<template>
  <div
    class="relative min-h-[300px] rounded-[2rem] border bg-linear-to-br from-background to-muted/20 p-4"
  >
    <UiFloatingDock
      :items="items"
      desktop-class="absolute bottom-4 left-1/2 -translate-x-1/2"
      mobile-class="absolute right-4 bottom-4"
    >
      <template #item="{ item }">
        <UiFancyIcon
          :icon="typeof item.icon === 'string' ? item.icon : undefined"
          color="primary"
          theme="gradient"
          size="md"
        />
      </template>
    </UiFloatingDock>
  </div>
</template>

<script lang="ts" setup>
  const items = [
    { title: "Inbox", icon: "lucide:inbox", href: "#", active: true, color: "primary" },
    { title: "Search", icon: "lucide:search", href: "#", color: "info" },
    { title: "Alerts", icon: "lucide:bell", href: "#", active: true, color: "warning" },
    { title: "Teams", icon: "lucide:users-round", href: "#", color: "success" },
    { title: "Settings", icon: "lucide:settings-2", href: "#", color: "gray" },
  ];
</script>
