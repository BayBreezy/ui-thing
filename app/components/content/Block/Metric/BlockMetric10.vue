<template>
  <UiContainer class="py-10 lg:py-20">
    <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <template v-for="(s, i) in stats" :key="i">
        <div
          class="group bg-card relative overflow-hidden rounded-lg border p-6 transition-shadow hover:shadow-md"
        >
          <div class="mb-4 flex items-start justify-between">
            <div class="from-primary/50 rounded-full bg-linear-to-b via-transparent p-3">
              <Icon :name="s.icon" class="text-primary size-6" />
            </div>
            <UiBadge :variant="s.badgeVariant">{{ s.badge }}</UiBadge>
          </div>
          <h4 class="mb-2 text-3xl font-bold lg:text-4xl">
            {{ s.value }}
          </h4>
          <p class="mb-3 text-base font-medium">
            {{ s.text }}
          </p>
          <p class="text-muted-foreground text-sm">
            {{ s.description }}
          </p>
        </div>
      </template>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  const stats = [
    {
      text: "Total Revenue",
      value: "$2.4M",
      icon: "lucide:dollar-sign",
      badge: "+12.5%",
      badgeVariant: "default" as const,
      description: "Revenue growth compared to last quarter",
    },
    {
      text: "New Customers",
      value: "1,840",
      icon: "lucide:user-plus",
      badge: "+18.2%",
      badgeVariant: "default" as const,
      description: "New customer acquisition this month",
    },
    {
      text: "Conversion Rate",
      value: "3.2%",
      icon: "lucide:trending-up",
      badge: "+2.1%",
      badgeVariant: "default" as const,
      description: "Average conversion across all channels",
    },
  ];
</script>
