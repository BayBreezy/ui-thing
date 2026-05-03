<template>
  <UiCard>
    <UiCardHeader>
      <UiCardTitle> Flower Sales </UiCardTitle>
      <UiCardDescription>January - June 2024</UiCardDescription>
    </UiCardHeader>
    <UiCardContent class="aspect-auto h-[300px] w-full">
      <UiApexchart type="bar" :series :options />
    </UiCardContent>
    <UiCardFooter>
      <div class="flex w-full items-start gap-2 text-sm">
        <div class="grid gap-2">
          <div class="flex items-center gap-2 leading-none font-medium">
            Trending up by 5.2% this month <Icon name="lucide:trending-up" class="inline size-4" />
          </div>
          <div class="text-muted-foreground flex items-center gap-2 leading-none">
            Showing total visitors for the last 6 months
          </div>
        </div>
      </div>
    </UiCardFooter>
  </UiCard>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { ApexOptions } from "apexcharts";

  // Create fake data
  const generateFakeData = () => {
    return Array.from({ length: 70 }, () => ({
      x: faker.date.month({ abbreviated: true }),
      y: faker.number.int({ min: 250, max: 300 }),
    }));
  };

  const series = ref<ApexOptions["series"]>([
    {
      name: "Flowers Sold",
      data: generateFakeData(),
    },
  ]);

  const options = ref<ApexOptions>({
    plotOptions: {
      bar: {
        barHeight: "100%",
        columnWidth: "100%",
        borderRadius: 4,
        borderRadiusApplication: "end",
      },
    },
    stroke: { width: 0 },
    fill: {
      opacity: 1,
      type: "image",
      image: {
        src: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    },
    colors: ["var(--color-pink-500)"],
    states: { active: { filter: { type: "none" } }, hover: { filter: { type: "none" } } },
    grid: { show: false },
    yaxis: { labels: { show: false } },
    xaxis: {
      type: "category",
      crosshairs: { show: false },
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    tooltip: {
      followCursor: true,
    },
  });
</script>
