<template>
  <!--
    Trusted by row of company wordmarks
    Features: Centered label above a row of wordmark logos that fade in on scroll, muted by default and full strength on hover, wraps on small screens
  -->
  <UiContainer class="py-16 lg:py-20">
    <Motion
      :initial="{ opacity: 0, y: 12 }"
      :while-in-view="{ opacity: 1, y: 0 }"
      :in-view-options="{ once: true }"
      :transition="{ duration: 0.5 }"
    >
      <p class="text-muted-foreground text-center text-sm font-medium">{{ props.title }}</p>
      <ul class="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 lg:gap-x-14">
        <li
          v-for="logo in props.logos"
          :key="logo.name"
          class="text-muted-foreground hover:text-foreground flex items-center gap-2 text-xl font-semibold transition-colors"
        >
          <Icon :name="logo.icon" class="size-6" />
          {{ logo.name }}
        </li>
      </ul>
    </Motion>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Logo = { name: string; icon: string };

  const props = withDefaults(defineProps<{ title?: string; logos?: Logo[] }>(), {
    title: "Trusted by teams at 4,000+ companies",
    logos: () => [
      { name: "Acme", icon: "lucide:hexagon" },
      { name: "Northwind", icon: "lucide:compass" },
      { name: "Vertex", icon: "lucide:triangle" },
      { name: "Lumen", icon: "lucide:sun" },
      { name: "Orbit", icon: "lucide:orbit" },
      { name: "Pulse", icon: "lucide:activity" },
    ],
  });
</script>
