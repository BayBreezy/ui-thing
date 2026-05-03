<template>
  <UiContainer class="py-10 lg:py-20">
    <div class="grid grid-cols-1 place-items-center gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
      <template v-for="(s, i) in stats" :key="i">
        <div class="flex items-start gap-3">
          <div
            class="from-primary/50 inline-flex size-12 items-center justify-center rounded-full bg-linear-to-b via-transparent"
          >
            <Icon :name="s.icon" class="text-primary size-5" />
          </div>
          <div class="flex flex-col">
            <h4 class="text-4xl font-bold lg:text-5xl">
              {{ s.value }}
            </h4>
            <p class="text-muted-foreground text-sm font-medium">
              {{ s.text }}
            </p>
          </div>
        </div>
      </template>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  const stats = [
    { text: "Active users", value: "50K+", icon: "lucide:users" },
    { text: "Uptime", value: "99.9%", icon: "lucide:activity" },
    { text: "Countries", value: "150+", icon: "lucide:globe" },
    { text: "Support rating", value: "4.9", icon: "lucide:star" },
  ];
</script>
