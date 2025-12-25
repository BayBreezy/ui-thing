---
title: Heatmap
description: Heatmaps are used to visualize data through variations in color, making it easy to see patterns and correlations in large datasets.
---

## Installation

:prose-pm-x{command="ui-thing@latest add apexcharts"}

## Usage

### Heatmap Chart

::ShowCase

:DocsApexChartsHeatmap1

#code

<!-- automd:file src="../../app/components/content/Docs/ApexCharts/Heatmap/DocsApexChartsHeatmap1.vue" code lang="vue" -->

```vue [DocsApexChartsHeatmap1.vue]
<template>
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>User Activity</UiCardTitle>
      <UiCardDescription> {{ dayjs().format("MMMM DD YYYY") }}</UiCardDescription>
    </UiCardHeader>
    <UiCardContent class="h-[320px]">
      <UiApexchart type="heatmap" :series :options />
    </UiCardContent>
    <UiCardFooter>
      <div class="flex w-full items-start gap-2 text-sm">
        <div class="grid gap-2">
          <div class="flex items-center gap-2 leading-none font-medium">
            Want to learn more about heatmap charts?
          </div>
          <div class="flex items-center gap-2 leading-none text-muted-foreground">
            <span>Check out</span>
            <NuxtLink
              target="_blank"
              href="https://apexcharts.com/javascript-chart-demos/heatmap-charts/basic/"
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
  import dayjs from "dayjs";
  import type { ApexOptions } from "apexcharts";

  type HeatmapOptions = {
    rows: number;
    columns: number;
    min: number;
    max: number;
    xLabels?: string[]; // optional column headers
    rowLabels?: string[]; // optional row names
  };

  function generateHeatmapData(options: HeatmapOptions) {
    const { rows, columns, min, max, xLabels, rowLabels } = options;

    const data = [];

    for (let i = 0; i < rows; i++) {
      const seriesName = rowLabels?.[i] || `Row ${i + 1}`;
      const seriesData = [];

      for (let j = 0; j < columns; j++) {
        const label = xLabels?.[j] || `Col ${j + 1}`;
        seriesData.push({
          x: label,
          y: faker.number.int({ min, max }),
        });
      }

      data.push({
        name: seriesName,
        data: seriesData,
      });
    }

    return data;
  }
  const chartData = generateHeatmapData({
    rows: 7,
    columns: 12,
    min: 0,
    max: 100,
    xLabels: Array.from({ length: 12 }, (_, i) => `${i + 1}:00`),
    rowLabels: Array.from(
      { length: 7 },
      () => `${faker.person.firstName()} ${faker.person.lastName()}`
    ),
  });

  const series = ref(chartData);

  const options = ref<ApexOptions>({
    stroke: { colors: ["var(--color-card)"] },
  });
</script>
```

<!-- /automd -->

::

### Heatmap Chart - Color Range

::ShowCase

:DocsApexChartsHeatmap2

#code

<!-- automd:file src="../../app/components/content/Docs/ApexCharts/Heatmap/DocsApexChartsHeatmap2.vue" code lang="vue" -->

```vue [DocsApexChartsHeatmap2.vue]
<template>
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>System Performance</UiCardTitle>
      <UiCardDescription> {{ dayjs().format("MMMM DD YYYY") }}</UiCardDescription>
    </UiCardHeader>
    <UiCardContent class="h-[320px]">
      <UiApexchart type="heatmap" :series :options />
    </UiCardContent>
    <UiCardFooter>
      <div class="flex w-full items-start gap-2 text-sm">
        <div class="grid gap-2">
          <div class="flex items-center gap-2 leading-none font-medium">
            Want to learn more about heatmap charts?
          </div>
          <div class="flex items-center gap-2 leading-none text-muted-foreground">
            <span>Check out</span>
            <NuxtLink
              target="_blank"
              href="https://apexcharts.com/javascript-chart-demos/heatmap-charts/basic/"
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
  import dayjs from "dayjs";
  import type { ApexOptions } from "apexcharts";

  type HeatmapOptions = {
    rows: number;
    columns: number;
    min: number;
    max: number;
    xLabels?: string[]; // optional column headers
    rowLabels?: string[]; // optional row names
  };

  function generateHeatmapData(options: HeatmapOptions) {
    const { rows, columns, min, max, xLabels, rowLabels } = options;

    const data = [];

    for (let i = 0; i < rows; i++) {
      const seriesName = rowLabels?.[i] || `Row ${i + 1}`;
      const seriesData = [];

      for (let j = 0; j < columns; j++) {
        const label = xLabels?.[j] || `Col ${j + 1}`;
        seriesData.push({
          x: label,
          y: faker.number.int({ min, max }),
        });
      }

      data.push({
        name: seriesName,
        data: seriesData,
      });
    }

    return data;
  }
  const chartData = generateHeatmapData({
    rows: 7,
    columns: 12,
    min: 0,
    max: 100,
    xLabels: Array.from({ length: 12 }, (_, i) => `${i + 1}:00`),
    rowLabels: Array.from(
      { length: 7 },
      () => faker.location.continent() + " " + faker.number.int({ min: 1, max: 100 })
    ),
  });

  const series = ref(chartData);

  const options = ref<ApexOptions>({
    stroke: { colors: ["var(--color-card)"] },
    plotOptions: {
      heatmap: {
        colorScale: {
          ranges: [
            { color: "#E10531", from: 75, to: 100, name: "High" },
            { color: "#E6C822", from: 50, to: 75, name: "Medium" },
            { color: "#14E196", from: 0, to: 50, name: "Low" },
          ],
        },
      },
    },
  });
</script>
```

<!-- /automd -->

::
