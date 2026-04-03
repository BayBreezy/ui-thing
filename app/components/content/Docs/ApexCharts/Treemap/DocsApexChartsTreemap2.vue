<template>
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>Website Traffic</UiCardTitle>
      <UiCardDescription> {{ dayjs().format("MMMM DD YYYY") }}</UiCardDescription>
    </UiCardHeader>
    <UiCardContent class="h-[320px]">
      <UiApexchart type="treemap" :series :options />
    </UiCardContent>
    <UiCardFooter>
      <div class="flex w-full items-start gap-2 text-sm">
        <div class="grid gap-2">
          <div class="flex items-center gap-2 leading-none font-medium">
            Want to learn more about treemap charts?
          </div>
          <div class="flex items-center gap-2 leading-none text-muted-foreground">
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
      name: "Mobile",
      data: Array.from({ length: 5 }, () => ({
        x: faker.internet.domainName(),
        y: faker.number.int({ min: 1000, max: 5000 }),
      })),
    },
    {
      name: "Desktop",
      data: Array.from({ length: 5 }, () => ({
        x: faker.internet.domainName(),
        y: faker.number.int({ min: 1000, max: 5000 }),
      })),
    },
  ]);

  const options = ref<ApexOptions>({
    stroke: { width: 2, colors: ["var(--color-card)"] },
    dataLabels: { enabled: true },
    legend: { show: true },
    plotOptions: {
      treemap: {
        seriesTitle: {
          borderColor: "var(--color-border)",
          borderRadius: 6,
          borderWidth: 1,
          offsetY: -18,
          offsetX: 5,
          style: {
            background: "var(--color-card)",
            color: "var(--color-card-foreground)",
          },
        },
      },
    },
    states: {
      hover: { filter: { type: "none" } },
    },
    colors: ["#7E14E0", "#1469E0"],
  });
</script>
