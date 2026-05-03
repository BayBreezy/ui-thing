<template>
  <div
    class="from-background to-muted/30 relative min-h-[280px] rounded-3xl border bg-linear-to-br"
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
    { title: "Home", icon: "lucide:house", href: "#", active: true },
    { title: "Search", icon: "lucide:search", href: "#" },
    { title: "Notifications", icon: "lucide:bell", href: "#", active: true },
    { title: "Profile", icon: "lucide:user-round", href: "#", active: true },
    { title: "Settings", icon: "lucide:settings-2", href: "#" },
  ];
</script>
