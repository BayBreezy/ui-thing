<template>
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>Sales Breakdown</UiCardTitle>
      <UiCardDescription> {{ dayjs().format("MMMM DD YYYY") }}</UiCardDescription>
    </UiCardHeader>
    <UiCardContent class="h-[320px]">
      <UiApexchart type="treemap" :series :options height="100%" />
    </UiCardContent>
    <UiCardFooter>
      <div class="flex w-full items-start gap-2 text-sm">
        <div class="grid gap-2">
          <div class="flex items-center gap-2 leading-none font-medium">
            Want to learn more about treemap charts?
          </div>
          <div class="text-muted-foreground flex items-center gap-2 leading-none">
            <span>Check out</span>
            <NuxtLink
              target="_blank"
              href="https://apexcharts.com/docs/chart-types/treemap-chart/"
              class="text-primary hover:underline"
            >
              ApexCharts documentation
            </NuxtLink>
            <span>for more examples and tips.</span>
          </div>
        </div>
      </div>
    </UiCardFooter>
  </UiCard>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { ApexOptions } from "apexcharts";
  import dayjs from "dayjs";

  const series = ref<ApexOptions["series"]>([
    {
      name: "Sales",
      data: Array.from({ length: 10 }, () => ({
        x: faker.commerce.department(),
        y: faker.number.int({ min: 1000, max: 5000 }),
        color: faker.color.rgb(),
      })),
    },
  ]);

  const options = ref<ApexOptions>({
    stroke: { width: 2, colors: ["var(--color-card)"] },
    dataLabels: { enabled: true },
    states: {
      hover: { filter: { type: "none" } },
    },
    colors: ["#14E196"],
  });
</script>
