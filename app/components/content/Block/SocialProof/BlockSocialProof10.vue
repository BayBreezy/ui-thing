<template>
  <!--
    Logo wall that reveals a result on hover
    Features: Grid of customer cards where the logo slides up to reveal a one line outcome on hover or keyboard focus, always visible on touch screens
  -->
  <UiContainer class="py-16 lg:py-24">
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-3xl font-bold tracking-tight text-balance sm:text-4xl">{{ props.title }}</h2>
      <p class="text-muted-foreground mt-3 text-lg text-balance">{{ props.description }}</p>
    </div>
    <ul class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <li v-for="item in props.customers" :key="item.name">
        <a
          href="#"
          class="group bg-card hover:border-primary/40 focus-visible:ring-ring relative flex h-40 flex-col justify-between overflow-hidden rounded-2xl border p-6 transition-all outline-none hover:shadow-md focus-visible:ring-2"
        >
          <span class="flex items-center gap-2 text-xl font-semibold">
            <Icon :name="item.icon" class="size-6" />
            {{ item.name }}
          </span>
          <span class="flex items-end justify-between gap-4">
            <span class="max-w-52 text-sm">
              <span class="text-primary block text-2xl font-bold tracking-tight">{{
                item.stat
              }}</span>
              <span class="text-muted-foreground">{{ item.result }}</span>
            </span>
            <Icon
              name="lucide:arrow-up-right"
              class="text-muted-foreground size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </a>
      </li>
    </ul>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Customer = { name: string; icon: string; stat: string; result: string };

  const props = withDefaults(
    defineProps<{ title?: string; description?: string; customers?: Customer[] }>(),
    {
      title: "Real results from real teams",
      description: "A few of the outcomes our customers are proud of.",
      customers: () => [
        {
          name: "Northwind",
          icon: "lucide:compass",
          stat: "42%",
          result: "faster sprint planning",
        },
        {
          name: "Vertex",
          icon: "lucide:triangle",
          stat: "5x",
          result: "quicker engineer onboarding",
        },
        { name: "Lumen", icon: "lucide:sun", stat: "-33%", result: "fewer support tickets" },
        {
          name: "Orbit",
          icon: "lucide:orbit",
          stat: "$1.2M",
          result: "saved on tooling each year",
        },
        {
          name: "Pulse",
          icon: "lucide:activity",
          stat: "99.99%",
          result: "uptime across launches",
        },
        {
          name: "Nimbus",
          icon: "lucide:cloud",
          stat: "3 weeks",
          result: "from pilot to company wide",
        },
      ],
    }
  );
</script>
