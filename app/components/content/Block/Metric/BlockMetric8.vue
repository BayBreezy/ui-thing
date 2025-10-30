<template>
  <UiContainer class="py-10 lg:py-20">
    <div class="rounded-lg border bg-card p-8 shadow-sm lg:p-12">
      <div class="mb-10 text-center lg:mb-12">
        <h3 class="mb-3 text-3xl font-semibold lg:text-4xl">Why choose us?</h3>
        <p class="text-lg text-muted-foreground">Numbers that speak for themselves</p>
      </div>

      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        <template v-for="(s, i) in stats" :key="i">
          <div class="text-center">
            <div class="mb-4">
              <Icon :name="s.icon" class="mx-auto size-7 text-primary" />
            </div>
            <h4 class="mb-2 text-3xl font-bold lg:text-4xl">
              {{ s.value }}
            </h4>
            <p class="text-sm font-medium">
              {{ s.text }}
            </p>
            <p class="mt-2 text-sm text-muted-foreground">
              {{ s.description }}
            </p>
          </div>
        </template>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  const stats = [
    {
      text: "Success Rate",
      value: "99%",
      icon: "lucide:trending-up",
      description: "Project completion",
    },
    {
      text: "Response Time",
      value: "<1hr",
      icon: "lucide:clock",
      description: "Average support",
    },
    {
      text: "Team Size",
      value: "100+",
      icon: "lucide:users",
      description: "Expert members",
    },
    {
      text: "Experience",
      value: "10yr",
      icon: "lucide:award",
      description: "In the industry",
    },
  ];
</script>
