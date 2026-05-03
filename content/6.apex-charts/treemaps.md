---
title: Treemaps
description: Treemaps are used to visualize hierarchical data using nested rectangles, where the size and color of each rectangle represent different attributes of the data.
---

## Installation

:prose-pm-x{command="ui-thing@latest add apexcharts"}

## Usage

### Treemap Chart

::prose-show-case

:DocsApexChartsTreemap1

#code

<!-- automd:file src="../../app/components/content/Docs/ApexCharts/Treemap/DocsApexChartsTreemap1.vue" code lang="vue" -->

```vue [DocsApexChartsTreemap1.vue]
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
```

<!-- /automd -->

::

### Treemap Chart - Multiple

::prose-show-case

:DocsApexChartsTreemap2

#code

<!-- automd:file src="../../app/components/content/Docs/ApexCharts/Treemap/DocsApexChartsTreemap2.vue" code lang="vue" -->

```vue [DocsApexChartsTreemap2.vue]
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
```

<!-- /automd -->

::

### Treemap Chart - Color Ranges

::prose-show-case

:DocsApexChartsTreemap3

#code

<!-- automd:file src="../../app/components/content/Docs/ApexCharts/Treemap/DocsApexChartsTreemap3.vue" code lang="vue" -->

```vue [DocsApexChartsTreemap3.vue]
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
```

<!-- /automd -->

::
