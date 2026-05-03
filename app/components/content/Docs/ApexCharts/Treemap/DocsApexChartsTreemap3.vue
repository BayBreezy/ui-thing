<template>
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>File System Usage</UiCardTitle>
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
      name: "File Usage",
      data: Array.from({ length: 12 }, () => ({
        x: faker.system.commonFileType(),
        y: faker.number.int({ min: 900, max: 50_000 }),
      })),
    },
  ]);

  const formatSizeText = (size: number): string => {
    if (size <= 1000) {
      return `${size} KB`;
    } else if (size < 30_000) {
      return `${(size / 1000).toFixed(2)} MB`;
    } else {
      return `${(size / 10000).toFixed(2)} GB`;
    }
  };

  const options = ref<ApexOptions>({
    stroke: { width: 2, colors: ["var(--color-card)"] },
    dataLabels: {
      enabled: true,
      formatter(val) {
        // capitalize the first letter of the file type
        const value = String(val);
        const fileType = value.charAt(0).toUpperCase() + value.slice(1);
        // return the file type with the size
        return fileType;
      },
    },
    states: { hover: { filter: { type: "none" } } },
    tooltip: {
      y: {
        formatter(val) {
          return formatSizeText(val);
        },
      },
    },
    plotOptions: {
      treemap: {
        colorScale: {
          ranges: [
            {
              from: 0,
              to: 10_000,
              color: "#34D399",
            },
            {
              from: 10_001,
              to: 30_000,
              color: "#FBBF24",
            },
            {
              from: 30_001,
              to: 50_000,
              color: "#E02914",
            },
          ],
        },
      },
    },
  });
</script>
