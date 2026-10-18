<template>
  <!--
    Split section with key numbers and a logo grid
    Features: Heading with three fancy icon highlights on one side and a two column grid of logo tiles on the other, tiles lift on hover
  -->
  <UiContainer class="py-16 lg:py-24">
    <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
      <div>
        <h2 class="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          {{ props.title }}
        </h2>
        <p class="text-muted-foreground mt-4 text-lg">{{ props.description }}</p>
        <ul class="mt-8 space-y-5">
          <li v-for="item in props.highlights" :key="item.title" class="flex items-center gap-4">
            <UiFancyIcon :icon="item.icon" theme="light" :color="item.color" />
            <div>
              <p class="font-semibold">{{ item.title }}</p>
              <p class="text-muted-foreground text-sm">{{ item.text }}</p>
            </div>
          </li>
        </ul>
      </div>
      <ul class="grid grid-cols-2 gap-4">
        <li
          v-for="logo in props.logos"
          :key="logo.name"
          class="bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground flex h-24 items-center justify-center gap-2 rounded-xl text-lg font-semibold transition-all hover:-translate-y-0.5"
        >
          <Icon :name="logo.icon" class="size-6" />
          {{ logo.name }}
        </li>
      </ul>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Logo = { name: string; icon: string };
  type Highlight = {
    title: string;
    text: string;
    icon: string;
    color: "primary" | "gray" | "error" | "warning" | "success" | "info";
  };

  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      highlights?: Highlight[];
      logos?: Logo[];
    }>(),
    {
      title: "Join thousands of happy customers",
      description:
        "See why leading companies choose our platform to move faster and reach their goals sooner.",
      highlights: () => [
        {
          title: "50,000+ active users",
          text: "A growing community of professionals",
          icon: "lucide:users",
          color: "info",
        },
        {
          title: "4.9 out of 5 rating",
          text: "Based on 2,000+ verified reviews",
          icon: "lucide:star",
          color: "warning",
        },
        {
          title: "Award winning support",
          text: "Real people, replies within the hour",
          icon: "lucide:award",
          color: "success",
        },
      ],
      logos: () => [
        { name: "Acme", icon: "lucide:hexagon" },
        { name: "Northwind", icon: "lucide:compass" },
        { name: "Vertex", icon: "lucide:triangle" },
        { name: "Lumen", icon: "lucide:sun" },
        { name: "Orbit", icon: "lucide:orbit" },
        { name: "Pulse", icon: "lucide:activity" },
      ],
    }
  );
</script>
