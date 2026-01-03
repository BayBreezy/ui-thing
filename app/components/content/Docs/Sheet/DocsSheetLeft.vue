<template>
  <div class="flex w-full justify-center">
    <UiSheet>
      <UiSheetTrigger as-child>
        <UiButton variant="outline">Open Left Sheet</UiButton>
      </UiSheetTrigger>

      <UiSheetContent
        side="left"
        title="Navigation"
        description="Access additional navigation options"
        class="w-80"
      >
        <template #content>
          <div class="">
            <UiGradientDivider />
            <nav class="mt-4 flex flex-col gap-1 px-3">
              <template v-for="item in links" :key="item.name">
                <UiButton variant="ghost" class="w-full justify-start" :href="item.href">
                  <Icon :name="item.icon" class="size-4 text-muted-foreground/70" />
                  {{ item.name }}
                </UiButton>
              </template>
            </nav>
          </div>
        </template>
      </UiSheetContent>
    </UiSheet>
  </div>
</template>

<script lang="ts" setup>
  const links = [
    { name: "Home", href: "#", icon: "lucide:home" },
    { name: "Profile", href: "#", icon: "lucide:user" },
    { name: "Settings", href: "#", icon: "lucide:settings" },
    { name: "Help", href: "#", icon: "lucide:life-buoy" },
    { name: "Settings", href: "#", icon: "lucide:settings" },
    { name: "Logout", href: "#", icon: "lucide:log-out" },
  ];
</script>
