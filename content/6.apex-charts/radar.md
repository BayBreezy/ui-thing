---
title: Radar
description: Radar charts are used to display multivariate data in a two-dimensional chart of three or more quantitative variables represented on axes starting from the same point.
---

## Installation

:prose-pm-x{command="ui-thing@latest add apexcharts"}

## Usage

### Radar Chart

::ShowCase

:DocsApexChartsRadar1

#code

<!-- automd:file src="../../app/components/content/Docs/ApexCharts/Radar/DocsApexChartsRadar1.vue" code lang="vue" -->

```vue [DocsApexChartsRadar1.vue]
<template>
  <div>
    <UiCard class="flex flex-col">
      <UiCardHeader class="items-center pb-0">
        <UiCardTitle>Radar Chart</UiCardTitle>
        <UiCardDescription>Showing total visitors for the last 6 months</UiCardDescription>
      </UiCardHeader>
      <UiCardContent class="h-[350px]">
        <UiApexchart type="radar" :series :options />
      </UiCardContent>
      <UiCardFooter class="flex-col gap-2 text-sm">
        <div class="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <Icon name="lucide:trending-up" class="size-4" />
        </div>
        <div class="leading-none text-muted-foreground">January - June 2024</div>
      </UiCardFooter>
    </UiCard>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { ApexOptions } from "apexcharts";
  import dayjs from "dayjs";

  const series = ref<ApexOptions["series"]>([
    {
      name: "Visitors",
      data: Array.from({ length: 6 }, (_, i) => ({
        x: dayjs()
          .subtract(5 - i, "month")
          .format("MMMM"),
        y: faker.number.int({ min: 2000, max: 5000 }),
      })),
    },
  ]);

  const options = ref<ApexOptions>({
    fill: { opacity: 0.6 },
    stroke: { width: 0 },
    yaxis: { show: false },
  });
</script>
```

<!-- /automd -->

::

### Radar Chart - Lines Only

::ShowCase

:DocsApexChartsRadar2

#code

<!-- automd:file src="../../app/components/content/Docs/ApexCharts/Radar/DocsApexChartsRadar2.vue" code lang="vue" -->

```vue [DocsApexChartsRadar2.vue]
<template>
  <div>
    <UiCard class="flex flex-col">
      <UiCardHeader class="items-center pb-0">
        <UiCardTitle>Radar Chart</UiCardTitle>
        <UiCardDescription>Showing total visitors for the last 6 months</UiCardDescription>
      </UiCardHeader>
      <UiCardContent class="h-[350px]">
        <UiApexchart type="radar" :series :options />
      </UiCardContent>
      <UiCardFooter class="flex-col gap-2 text-sm">
        <div class="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <Icon name="lucide:trending-up" class="size-4" />
        </div>
        <div class="leading-none text-muted-foreground">January - June 2024</div>
      </UiCardFooter>
    </UiCard>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { ApexOptions } from "apexcharts";
  import dayjs from "dayjs";

  const series = ref<ApexOptions["series"]>([
    {
      name: "Mobile",
      data: Array.from({ length: 6 }, (_, i) => ({
        x: dayjs()
          .subtract(5 - i, "month")
          .format("MMMM"),
        y: faker.number.int({ min: 2000, max: 5000 }),
      })),
    },
    {
      name: "Desktop",
      data: Array.from({ length: 6 }, (_, i) => ({
        x: dayjs()
          .subtract(5 - i, "month")
          .format("MMMM"),
        y: faker.number.int({ min: 1000, max: 3000 }),
      })),
    },
  ]);

  const options = ref<ApexOptions>({
    fill: { opacity: 0.6, colors: ["transparent"] },
    stroke: { width: 1 },
    yaxis: { show: false },
    markers: { size: 4 },
  });
</script>
```

<!-- /automd -->

::

### Radar Chart - Labels

::ShowCase

:DocsApexChartsRadar3

#code

<!-- automd:file src="../../app/components/content/Docs/ApexCharts/Radar/DocsApexChartsRadar3.vue" code lang="vue" -->

```vue [DocsApexChartsRadar3.vue]
<template>
  <div>
    <UiCard class="flex flex-col">
      <UiCardHeader class="items-center pb-0">
        <UiCardTitle>Radar Chart</UiCardTitle>
        <UiCardDescription>Showing total visitors for the last 6 months</UiCardDescription>
      </UiCardHeader>
      <UiCardContent class="h-[350px]">
        <UiApexchart type="radar" :series :options />
      </UiCardContent>
      <UiCardFooter class="flex-col gap-2 text-sm">
        <div class="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <Icon name="lucide:trending-up" class="size-4" />
        </div>
        <div class="leading-none text-muted-foreground">January - June 2024</div>
      </UiCardFooter>
    </UiCard>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { ApexOptions } from "apexcharts";
  import dayjs from "dayjs";

  const series = ref<ApexOptions["series"]>([
    {
      name: "Visitors",
      data: Array.from({ length: 6 }, (_, i) => ({
        x: dayjs()
          .subtract(5 - i, "month")
          .format("MMMM"),
        y: faker.number.int({ min: 2000, max: 5000 }),
      })),
    },
  ]);

  const options = ref<ApexOptions>({
    fill: { opacity: 0.6 },
    stroke: { width: 0 },
    yaxis: { show: false },
    dataLabels: {
      enabled: true,
      offsetY: -16,
      background: {
        backgroundColor: "var(--color-card)",
        borderWidth: 1,
        borderRadius: 4,
        borderColor: "var(--color-border)",
        padding: 6,
        foreColor: "var(--color-card-foreground)",
      },
      style: {
        fontSize: "10px",
        fontWeight: 500,
        colors: ["green"],
      },
    },
  });
</script>
```

<!-- /automd -->

::

### Radar Chart - No Grid Lines

::ShowCase

:DocsApexChartsRadar4

#code

<!-- automd:file src="../../app/components/content/Docs/ApexCharts/Radar/DocsApexChartsRadar4.vue" code lang="vue" -->

```vue [DocsApexChartsRadar4.vue]
<template>
  <div>
    <UiCard class="flex flex-col">
      <UiCardHeader class="items-center pb-0">
        <UiCardTitle>Radar Chart</UiCardTitle>
        <UiCardDescription>Showing total visitors for the last 6 months</UiCardDescription>
      </UiCardHeader>
      <UiCardContent class="h-[350px]">
        <UiApexchart type="radar" :series :options />
      </UiCardContent>
      <UiCardFooter class="flex-col gap-2 text-sm">
        <div class="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <Icon name="lucide:trending-up" class="size-4" />
        </div>
        <div class="leading-none text-muted-foreground">January - June 2024</div>
      </UiCardFooter>
    </UiCard>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { ApexOptions } from "apexcharts";
  import dayjs from "dayjs";

  const series = ref<ApexOptions["series"]>([
    {
      name: "Visitors",
      data: Array.from({ length: 6 }, (_, i) => ({
        x: dayjs()
          .subtract(5 - i, "month")
          .format("MMMM"),
        y: faker.number.int({ min: 2000, max: 5000 }),
      })),
    },
  ]);

  const options = ref<ApexOptions>({
    fill: { opacity: 0.6 },
    stroke: { width: 0 },
    plotOptions: {
      radar: {
        polygons: {
          strokeColors: ["transparent"],
          strokeWidth: "0px",
          connectorColors: "transparent",
        },
      },
    },
    yaxis: { show: false },
  });
</script>
```

<!-- /automd -->

::

### Radar Chart - Grid Filled

::ShowCase

:DocsApexChartsRadar5

#code

<!-- automd:file src="../../app/components/content/Docs/ApexCharts/Radar/DocsApexChartsRadar5.vue" code lang="vue" -->

```vue [DocsApexChartsRadar5.vue]
<template>
  <div>
    <UiCard class="flex flex-col">
      <UiCardHeader class="items-center pb-0">
        <UiCardTitle>Radar Chart</UiCardTitle>
        <UiCardDescription>Showing total visitors for the last 6 months</UiCardDescription>
      </UiCardHeader>
      <UiCardContent class="h-[350px]">
        <UiApexchart type="radar" :series :options />
      </UiCardContent>
      <UiCardFooter class="flex-col gap-2 text-sm">
        <div class="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <Icon name="lucide:trending-up" class="size-4" />
        </div>
        <div class="leading-none text-muted-foreground">January - June 2024</div>
      </UiCardFooter>
    </UiCard>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { ApexOptions } from "apexcharts";
  import dayjs from "dayjs";

  const series = ref<ApexOptions["series"]>([
    {
      name: "Mobile",
      data: Array.from({ length: 6 }, (_, i) => ({
        x: dayjs()
          .subtract(5 - i, "month")
          .format("MMMM"),
        y: faker.number.int({ min: 2000, max: 5000 }),
      })),
    },
    {
      name: "Desktop",
      data: Array.from({ length: 6 }, (_, i) => ({
        x: dayjs()
          .subtract(5 - i, "month")
          .format("MMMM"),
        y: faker.number.int({ min: 1000, max: 3000 }),
      })),
    },
  ]);

  const options = ref<ApexOptions>({
    fill: { opacity: 0.6 },
    stroke: { width: 0 },
    legend: { show: true },
    markers: { shape: "diamond" },
    plotOptions: {
      radar: {
        polygons: {
          strokeWidth: "0px",
          connectorColors: "transparent",
          fill: { colors: ["rgba(64, 163, 243, 0.2)", "rgba(10, 255, 165,0.3)"] },
        },
      },
    },
    yaxis: { show: false },
  });
</script>
```

<!-- /automd -->

::
