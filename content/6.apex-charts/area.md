---
title: Area
description: Area charts are used to represent quantitative data visually, showing the magnitude of change over time.
---

## Installation

:prose-pm-x{command="ui-thing@latest add apexcharts"}

## Usage

### Interactive

::ShowCase

:DocsApexChartsAreaInteractive

#code

<!-- automd:file src="../../app/components/content/Docs/ApexCharts/Area/DocsApexChartsAreaInteractive.vue" code lang="vue" -->

```vue [DocsApexChartsAreaInteractive.vue]
<template>
  <div>
    <UiCard class="pt-0">
      <UiCardHeader class="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div class="grid flex-1 gap-1">
          <UiCardTitle>Area Chart - Interactive</UiCardTitle>
          <UiCardDescription> Showing total visitors for the last 3 months </UiCardDescription>
        </div>
        <UiSelect v-model="timeRange">
          <UiSelectTrigger class="hidden w-[160px] sm:ml-auto sm:flex" aria-label="Select a value">
            <UiSelectValue placeholder="Last 3 months" />
          </UiSelectTrigger>
          <UiSelectContent>
            <UiSelectItem value="90d" class="rounded-md"> Last 3 months </UiSelectItem>
            <UiSelectItem value="30d" class="rounded-md"> Last 30 days </UiSelectItem>
            <UiSelectItem value="7d" class="rounded-md"> Last 7 days </UiSelectItem>
          </UiSelectContent>
        </UiSelect>
      </UiCardHeader>
      <UiCardContent class="aspect-auto h-[350px] w-full px-2 pt-4 sm:px-6 sm:pt-6">
        <UiApexchart type="area" :series :options />
      </UiCardContent>
    </UiCard>
  </div>
</template>

<script lang="ts" setup>
  import dayjs from "dayjs";
  import type { ApexOptions } from "apexcharts";

  const timeRange = ref("90d");
  const chartData = [
    { date: "2024-04-01", desktop: 222, mobile: 150 },
    { date: "2024-04-02", desktop: 97, mobile: 180 },
    { date: "2024-04-03", desktop: 167, mobile: 120 },
    { date: "2024-04-04", desktop: 242, mobile: 260 },
    { date: "2024-04-05", desktop: 373, mobile: 290 },
    { date: "2024-04-06", desktop: 301, mobile: 340 },
    { date: "2024-04-07", desktop: 245, mobile: 180 },
    { date: "2024-04-08", desktop: 409, mobile: 320 },
    { date: "2024-04-09", desktop: 59, mobile: 110 },
    { date: "2024-04-10", desktop: 261, mobile: 190 },
    { date: "2024-04-11", desktop: 327, mobile: 350 },
    { date: "2024-04-12", desktop: 292, mobile: 210 },
    { date: "2024-04-13", desktop: 342, mobile: 380 },
    { date: "2024-04-14", desktop: 137, mobile: 220 },
    { date: "2024-04-15", desktop: 120, mobile: 170 },
    { date: "2024-04-16", desktop: 138, mobile: 190 },
    { date: "2024-04-17", desktop: 446, mobile: 360 },
    { date: "2024-04-18", desktop: 364, mobile: 410 },
    { date: "2024-04-19", desktop: 243, mobile: 180 },
    { date: "2024-04-20", desktop: 89, mobile: 150 },
    { date: "2024-04-21", desktop: 137, mobile: 200 },
    { date: "2024-04-22", desktop: 224, mobile: 170 },
    { date: "2024-04-23", desktop: 138, mobile: 230 },
    { date: "2024-04-24", desktop: 387, mobile: 290 },
    { date: "2024-04-25", desktop: 215, mobile: 250 },
    { date: "2024-04-26", desktop: 75, mobile: 130 },
    { date: "2024-04-27", desktop: 383, mobile: 420 },
    { date: "2024-04-28", desktop: 122, mobile: 180 },
    { date: "2024-04-29", desktop: 315, mobile: 240 },
    { date: "2024-04-30", desktop: 454, mobile: 380 },
    { date: "2024-05-01", desktop: 165, mobile: 220 },
    { date: "2024-05-02", desktop: 293, mobile: 310 },
    { date: "2024-05-03", desktop: 247, mobile: 190 },
    { date: "2024-05-04", desktop: 385, mobile: 420 },
    { date: "2024-05-05", desktop: 481, mobile: 390 },
    { date: "2024-05-06", desktop: 498, mobile: 520 },
    { date: "2024-05-07", desktop: 388, mobile: 300 },
    { date: "2024-05-08", desktop: 149, mobile: 210 },
    { date: "2024-05-09", desktop: 227, mobile: 180 },
    { date: "2024-05-10", desktop: 293, mobile: 330 },
    { date: "2024-05-11", desktop: 335, mobile: 270 },
    { date: "2024-05-12", desktop: 197, mobile: 240 },
    { date: "2024-05-13", desktop: 197, mobile: 160 },
    { date: "2024-05-14", desktop: 448, mobile: 490 },
    { date: "2024-05-15", desktop: 473, mobile: 380 },
    { date: "2024-05-16", desktop: 338, mobile: 400 },
    { date: "2024-05-17", desktop: 499, mobile: 420 },
    { date: "2024-05-18", desktop: 315, mobile: 350 },
    { date: "2024-05-19", desktop: 235, mobile: 180 },
    { date: "2024-05-20", desktop: 177, mobile: 230 },
    { date: "2024-05-21", desktop: 82, mobile: 140 },
    { date: "2024-05-22", desktop: 81, mobile: 120 },
    { date: "2024-05-23", desktop: 252, mobile: 290 },
    { date: "2024-05-24", desktop: 294, mobile: 220 },
    { date: "2024-05-25", desktop: 201, mobile: 250 },
    { date: "2024-05-26", desktop: 213, mobile: 170 },
    { date: "2024-05-27", desktop: 420, mobile: 460 },
    { date: "2024-05-28", desktop: 233, mobile: 190 },
    { date: "2024-05-29", desktop: 78, mobile: 130 },
    { date: "2024-05-30", desktop: 340, mobile: 280 },
    { date: "2024-05-31", desktop: 178, mobile: 230 },
    { date: "2024-06-01", desktop: 178, mobile: 200 },
    { date: "2024-06-02", desktop: 470, mobile: 410 },
    { date: "2024-06-03", desktop: 103, mobile: 160 },
    { date: "2024-06-04", desktop: 439, mobile: 380 },
    { date: "2024-06-05", desktop: 88, mobile: 140 },
    { date: "2024-06-06", desktop: 294, mobile: 250 },
    { date: "2024-06-07", desktop: 323, mobile: 370 },
    { date: "2024-06-08", desktop: 385, mobile: 320 },
    { date: "2024-06-09", desktop: 438, mobile: 480 },
    { date: "2024-06-10", desktop: 155, mobile: 200 },
    { date: "2024-06-11", desktop: 92, mobile: 150 },
    { date: "2024-06-12", desktop: 492, mobile: 420 },
    { date: "2024-06-13", desktop: 81, mobile: 130 },
    { date: "2024-06-14", desktop: 426, mobile: 380 },
    { date: "2024-06-15", desktop: 307, mobile: 350 },
    { date: "2024-06-16", desktop: 371, mobile: 310 },
    { date: "2024-06-17", desktop: 475, mobile: 520 },
    { date: "2024-06-18", desktop: 107, mobile: 170 },
    { date: "2024-06-19", desktop: 341, mobile: 290 },
    { date: "2024-06-20", desktop: 408, mobile: 450 },
    { date: "2024-06-21", desktop: 169, mobile: 210 },
    { date: "2024-06-22", desktop: 317, mobile: 270 },
    { date: "2024-06-23", desktop: 480, mobile: 530 },
    { date: "2024-06-24", desktop: 132, mobile: 180 },
    { date: "2024-06-25", desktop: 141, mobile: 190 },
    { date: "2024-06-26", desktop: 434, mobile: 380 },
    { date: "2024-06-27", desktop: 448, mobile: 490 },
    { date: "2024-06-28", desktop: 149, mobile: 200 },
    { date: "2024-06-29", desktop: 103, mobile: 160 },
    { date: "2024-06-30", desktop: 446, mobile: 400 },
  ];

  const series = ref<ApexOptions["series"]>([
    {
      name: "Desktop",
      data: chartData.map((item) => ({
        x: dayjs(item.date).toDate(),
        y: item.desktop,
      })),
    },
    {
      name: "Mobile",
      data: chartData.map((item) => ({
        x: dayjs(item.date).toDate(),
        y: item.mobile,
      })),
    },
  ]);

  watch(timeRange, (newRange) => {
    const referenceDate = dayjs("2024-06-30");
    const newDays = parseInt(newRange, 10);
    const startDate = referenceDate.subtract(newDays, "days");
    const filteredData = chartData.filter((item) => {
      return dayjs(item.date).isAfter(startDate);
    });
    series.value = [
      {
        name: "Desktop",
        data: filteredData.map((item) => ({
          x: dayjs(item.date).toDate(),
          y: item.desktop,
        })),
      },
      {
        name: "Mobile",
        data: filteredData.map((item) => ({
          x: dayjs(item.date).toDate(),
          y: item.mobile,
        })),
      },
    ];
  });

  const options = ref<ApexOptions>({
    stroke: { width: 1, curve: "smooth", lineCap: "round" },
    tooltip: {
      style: { fontSize: "12px" },
    },
    chart: {
      toolbar: { show: false },
      zoom: { enabled: false },
      fontFamily: "var(--font-sans)",
    },
    legend: {
      fontSize: "12px",
      offsetY: 10,
      itemMargin: { horizontal: 8 },
      labels: {
        colors: "var(--color-card-foreground)",
      },
      markers: {
        offsetX: -4,
        size: 6,
        strokeWidth: 0,
      },
    },
    markers: { strokeWidth: 0 },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0,
        opacityFrom: 0.7,
        opacityTo: 0.4,
        stops: [0, 100],
      },
    },
    yaxis: { labels: { show: false } },
    xaxis: {
      type: "category",
      crosshairs: { show: false },
      labels: {
        hideOverlappingLabels: true,
        rotateAlways: false,
        rotate: 0,
        formatter(value) {
          return dayjs(value).format("MMM D");
        },
      },
      tickAmount: 5,
      axisTicks: { show: false },
      tooltip: { enabled: false },
    },
  });
</script>
```

<!-- /automd -->

::

### Area Chart

::ShowCase

:DocsApexChartsArea1

#code

<!-- automd:file src="../../app/components/content/Docs/ApexCharts/Area/DocsApexChartsArea1.vue" code lang="vue" -->

```vue [DocsApexChartsArea1.vue]
<template>
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>Area Chart</UiCardTitle>
      <UiCardDescription> Showing total visitors for the last 6 months </UiCardDescription>
    </UiCardHeader>
    <UiCardContent class="aspect-auto h-[350px] w-full">
      <UiApexchart type="area" :series :options />
    </UiCardContent>
    <UiCardFooter>
      <div class="flex w-full items-start gap-2 text-sm">
        <div class="grid gap-2">
          <div class="flex items-center gap-2 leading-none font-medium">
            Trending up by 5.2% this month <Icon name="lucide:trending-up" class="inline size-4" />
          </div>
          <div class="flex items-center gap-2 leading-none text-muted-foreground">
            January - June 2024
          </div>
        </div>
      </div>
    </UiCardFooter>
  </UiCard>
</template>

<script lang="ts" setup>
  import type { ApexOptions } from "apexcharts";

  const series = ref<ApexOptions["series"]>([
    {
      name: "Desktop",
      data: [
        { x: "January", y: 186 },
        { x: "February", y: 305 },
        { x: "March", y: 237 },
        { x: "April", y: 73 },
        { x: "May", y: 209 },
        { x: "June", y: 214 },
      ],
    },
  ]);

  const options = ref<ApexOptions>({
    stroke: { curve: "smooth", width: 1 },

    fill: { type: "solid", opacity: 0.3 },
    yaxis: { labels: { show: false } },
    xaxis: {
      labels: {
        formatter(value) {
          return value?.slice(0, 3);
        },
      },
    },
  });
</script>
```

<!-- /automd -->

::

### Area Chart - Linear

::ShowCase

:DocsApexChartsArea2

#code

<!-- automd:file src="../../app/components/content/Docs/ApexCharts/Area/DocsApexChartsArea2.vue" code lang="vue" -->

```vue [DocsApexChartsArea2.vue]
<template>
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>Area Chart</UiCardTitle>
      <UiCardDescription> Showing total visitors for the last 6 months </UiCardDescription>
    </UiCardHeader>
    <UiCardContent class="aspect-auto h-[350px] w-full">
      <UiApexchart type="area" :series :options />
    </UiCardContent>
    <UiCardFooter>
      <div class="flex w-full items-start gap-2 text-sm">
        <div class="grid gap-2">
          <div class="flex items-center gap-2 leading-none font-medium">
            Trending up by 5.2% this month <Icon name="lucide:trending-up" class="inline size-4" />
          </div>
          <div class="flex items-center gap-2 leading-none text-muted-foreground">
            January - June 2024
          </div>
        </div>
      </div>
    </UiCardFooter>
  </UiCard>
</template>

<script lang="ts" setup>
  import type { ApexOptions } from "apexcharts";

  const series = ref<ApexOptions["series"]>([
    {
      name: "Desktop",
      data: [
        { x: "January", y: 186 },
        { x: "February", y: 305 },
        { x: "March", y: 237 },
        { x: "April", y: 73 },
        { x: "May", y: 209 },
        { x: "June", y: 214 },
      ],
    },
  ]);

  const options = ref<ApexOptions>({
    stroke: { curve: "straight", width: 1 },

    fill: { type: "solid", opacity: 0.3 },
    yaxis: { labels: { show: false } },
    xaxis: {
      labels: {
        formatter(value) {
          return value?.slice(0, 3);
        },
      },
    },
  });
</script>
```

<!-- /automd -->

::

### Area Chart - Step Line

::ShowCase

:DocsApexChartsArea3

#code

<!-- automd:file src="../../app/components/content/Docs/ApexCharts/Area/DocsApexChartsArea3.vue" code lang="vue" -->

```vue [DocsApexChartsArea3.vue]
<template>
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>Area Chart</UiCardTitle>
      <UiCardDescription> Showing total visitors for the last 6 months </UiCardDescription>
    </UiCardHeader>
    <UiCardContent class="aspect-auto h-[350px] w-full">
      <UiApexchart type="area" :series :options />
    </UiCardContent>
    <UiCardFooter>
      <div class="flex w-full items-start gap-2 text-sm">
        <div class="grid gap-2">
          <div class="flex items-center gap-2 leading-none font-medium">
            Trending up by 5.2% this month <Icon name="lucide:trending-up" class="inline size-4" />
          </div>
          <div class="flex items-center gap-2 leading-none text-muted-foreground">
            January - June 2024
          </div>
        </div>
      </div>
    </UiCardFooter>
  </UiCard>
</template>

<script lang="ts" setup>
  import type { ApexOptions } from "apexcharts";

  const series = ref<ApexOptions["series"]>([
    {
      name: "Desktop",
      data: [
        { x: "January", y: 186 },
        { x: "February", y: 305 },
        { x: "March", y: 237 },
        { x: "April", y: 73 },
        { x: "May", y: 209 },
        { x: "June", y: 214 },
      ],
    },
  ]);

  const options = ref<ApexOptions>({
    stroke: { curve: "stepline", width: 1 },

    fill: { type: "solid", opacity: 0.3 },
    yaxis: { labels: { show: false } },
    xaxis: {
      labels: {
        formatter(value) {
          return value?.slice(0, 3);
        },
      },
    },
  });
</script>
```

<!-- /automd -->

::

### Area Chart - Legend

::ShowCase

:DocsApexChartsArea4

#code

<!-- automd:file src="../../app/components/content/Docs/ApexCharts/Area/DocsApexChartsArea4.vue" code lang="vue" -->

```vue [DocsApexChartsArea4.vue]
<template>
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>Area Chart</UiCardTitle>
      <UiCardDescription> Showing total visitors for the last 6 months </UiCardDescription>
    </UiCardHeader>
    <UiCardContent class="aspect-auto h-[350px] w-full">
      <UiApexchart type="area" :series :options />
    </UiCardContent>
    <UiCardFooter>
      <div class="flex w-full items-start gap-2 text-sm">
        <div class="grid gap-2">
          <div class="flex items-center gap-2 leading-none font-medium">
            Trending up by 5.2% this month <Icon name="lucide:trending-up" class="inline size-4" />
          </div>
          <div class="flex items-center gap-2 leading-none text-muted-foreground">
            January - June 2024
          </div>
        </div>
      </div>
    </UiCardFooter>
  </UiCard>
</template>

<script lang="ts" setup>
  import type { ApexOptions } from "apexcharts";

  const series = ref<ApexOptions["series"]>([
    {
      name: "Desktop",
      data: [
        { x: "January", y: 186 },
        { x: "February", y: 305 },
        { x: "March", y: 237 },
        { x: "April", y: 73 },
        { x: "May", y: 209 },
        { x: "June", y: 214 },
      ],
    },
    {
      name: "Mobile",
      data: [
        { x: "January", y: 80 },
        { x: "February", y: 200 },
        { x: "March", y: 120 },
        { x: "April", y: 190 },
        { x: "May", y: 130 },
        { x: "June", y: 140 },
      ],
    },
  ]);

  const options = ref<ApexOptions>({
    legend: { show: true },
    stroke: { curve: "smooth", width: 1 },

    fill: { type: "solid", opacity: 0.3 },
    yaxis: { labels: { show: false } },
    xaxis: {
      tooltip: { enabled: false },
      labels: {
        formatter(value) {
          return value?.slice(0, 3);
        },
      },
    },
  });
</script>
```

<!-- /automd -->

::

### Area Chart - Custom Marker

::ShowCase

:DocsApexChartsArea5

#code

<!-- automd:file src="../../app/components/content/Docs/ApexCharts/Area/DocsApexChartsArea5.vue" code lang="vue" -->

```vue [DocsApexChartsArea5.vue]
<template>
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>Area Chart</UiCardTitle>
      <UiCardDescription> Showing total visitors for the last 6 months </UiCardDescription>
    </UiCardHeader>
    <UiCardContent class="aspect-auto h-[350px] w-full">
      <UiApexchart type="area" :series :options />
    </UiCardContent>
    <UiCardFooter>
      <div class="flex w-full items-start gap-2 text-sm">
        <div class="grid gap-2">
          <div class="flex items-center gap-2 leading-none font-medium">
            Trending up by 5.2% this month <Icon name="lucide:trending-up" class="inline size-4" />
          </div>
          <div class="flex items-center gap-2 leading-none text-muted-foreground">
            January - June 2024
          </div>
        </div>
      </div>
    </UiCardFooter>
  </UiCard>
</template>

<script lang="ts" setup>
  import type { ApexOptions } from "apexcharts";

  const series = ref<ApexOptions["series"]>([
    {
      name: "Desktop",
      data: [
        { x: "January", y: 186 },
        { x: "February", y: 305 },
        { x: "March", y: 237 },
        { x: "April", y: 73 },
        { x: "May", y: 209 },
        { x: "June", y: 214 },
      ],
    },
    {
      name: "Mobile",
      data: [
        { x: "January", y: 80 },
        { x: "February", y: 200 },
        { x: "March", y: 120 },
        { x: "April", y: 190 },
        { x: "May", y: 130 },
        { x: "June", y: 140 },
      ],
    },
  ]);

  const options = ref<ApexOptions>({
    stroke: { curve: "smooth", width: 1 },
    legend: {
      show: true,
      markers: {
        customHTML() {
          return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="m22 7l-8.5 8.5l-5-5L2 17"/><path d="M16 7h6v6"/></g></svg>`;
        },
      },
    },

    fill: { type: "solid", opacity: 0.3 },
    yaxis: { labels: { show: false } },
    xaxis: {
      tooltip: { enabled: false },
      labels: {
        formatter(value) {
          return value?.slice(0, 3);
        },
      },
    },
  });
</script>
```

<!-- /automd -->

::

### Area Chart - Gradient

::ShowCase

:DocsApexChartsArea6

#code

<!-- automd:file src="../../app/components/content/Docs/ApexCharts/Area/DocsApexChartsArea6.vue" code lang="vue" -->

```vue [DocsApexChartsArea6.vue]
<template>
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>Area Chart</UiCardTitle>
      <UiCardDescription> Showing total visitors for the last 6 months </UiCardDescription>
    </UiCardHeader>
    <UiCardContent class="aspect-auto h-[350px] w-full">
      <UiApexchart type="area" :series :options />
    </UiCardContent>
    <UiCardFooter>
      <div class="flex w-full items-start gap-2 text-sm">
        <div class="grid gap-2">
          <div class="flex items-center gap-2 leading-none font-medium">
            Trending up by 5.2% this month <Icon name="lucide:trending-up" class="inline size-4" />
          </div>
          <div class="flex items-center gap-2 leading-none text-muted-foreground">
            January - June 2024
          </div>
        </div>
      </div>
    </UiCardFooter>
  </UiCard>
</template>

<script lang="ts" setup>
  import type { ApexOptions } from "apexcharts";

  const series = ref<ApexOptions["series"]>([
    {
      name: "Desktop",
      data: [
        { x: "January", y: 186 },
        { x: "February", y: 305 },
        { x: "March", y: 237 },
        { x: "April", y: 73 },
        { x: "May", y: 209 },
        { x: "June", y: 214 },
      ],
    },
    {
      name: "Mobile",
      data: [
        { x: "January", y: 80 },
        { x: "February", y: 200 },
        { x: "March", y: 120 },
        { x: "April", y: 190 },
        { x: "May", y: 130 },
        { x: "June", y: 140 },
      ],
    },
  ]);

  const options = ref<ApexOptions>({
    stroke: { curve: "smooth", width: 1 },

    fill: {
      type: "gradient",
      opacity: 0.3,
      gradient: {
        stops: [0, 100],
        opacityFrom: 0.9,
        opacityTo: 0.1,
        shadeIntensity: 0,
      },
    },
    yaxis: { labels: { show: false } },
    xaxis: {
      tooltip: { enabled: false },
      labels: {
        formatter(value) {
          return value?.slice(0, 3);
        },
      },
    },
  });
</script>
```

<!-- /automd -->

::

### Area Chart - Axes

::ShowCase

:DocsApexChartsArea7

#code

<!-- automd:file src="../../app/components/content/Docs/ApexCharts/Area/DocsApexChartsArea7.vue" code lang="vue" -->

```vue [DocsApexChartsArea7.vue]
<template>
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>Area Chart</UiCardTitle>
      <UiCardDescription> Showing total visitors for the last 6 months </UiCardDescription>
    </UiCardHeader>
    <UiCardContent class="aspect-auto h-[350px] w-full">
      <UiApexchart type="area" :series :options />
    </UiCardContent>
    <UiCardFooter>
      <div class="flex w-full items-start gap-2 text-sm">
        <div class="grid gap-2">
          <div class="flex items-center gap-2 leading-none font-medium">
            Trending up by 5.2% this month <Icon name="lucide:trending-up" class="inline size-4" />
          </div>
          <div class="flex items-center gap-2 leading-none text-muted-foreground">
            January - June 2024
          </div>
        </div>
      </div>
    </UiCardFooter>
  </UiCard>
</template>

<script lang="ts" setup>
  import type { ApexOptions } from "apexcharts";

  const series = ref<ApexOptions["series"]>([
    {
      name: "Desktop",
      data: [
        { x: "January", y: 186 },
        { x: "February", y: 305 },
        { x: "March", y: 237 },
        { x: "April", y: 73 },
        { x: "May", y: 209 },
        { x: "June", y: 214 },
      ],
    },
    {
      name: "Mobile",
      data: [
        { x: "January", y: 80 },
        { x: "February", y: 200 },
        { x: "March", y: 120 },
        { x: "April", y: 190 },
        { x: "May", y: 130 },
        { x: "June", y: 140 },
      ],
    },
  ]);

  const options = ref<ApexOptions>({
    stroke: { curve: "smooth", width: 1 },

    xaxis: {
      tooltip: { enabled: false },
      labels: {
        formatter(value) {
          return value?.slice(0, 3);
        },
      },
    },
  });
</script>
```

<!-- /automd -->

::

### Area Chart - Annotations

::ShowCase

:DocsApexChartsArea8

#code

<!-- automd:file src="../../app/components/content/Docs/ApexCharts/Area/DocsApexChartsArea8.vue" code lang="vue" -->

```vue [DocsApexChartsArea8.vue]
<template>
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>Area Chart</UiCardTitle>
      <UiCardDescription> Showing total visitors for the last 6 months </UiCardDescription>
    </UiCardHeader>
    <UiCardContent class="aspect-auto h-[350px] w-full">
      <UiApexchart type="area" :series :options />
    </UiCardContent>
    <UiCardFooter>
      <div class="flex w-full items-start gap-2 text-sm">
        <div class="grid gap-2">
          <div class="flex items-center gap-2 leading-none font-medium">
            Trending up by 5.2% this month <Icon name="lucide:trending-up" class="inline size-4" />
          </div>
          <div class="flex items-center gap-2 leading-none text-muted-foreground">
            January - June 2024
          </div>
        </div>
      </div>
    </UiCardFooter>
  </UiCard>
</template>

<script lang="ts" setup>
  import type { ApexOptions } from "apexcharts";

  const series = ref<ApexOptions["series"]>([
    {
      name: "Desktop",
      data: [
        { x: "January", y: 186 },
        { x: "February", y: 305 },
        { x: "March", y: 237 },
        { x: "April", y: 73 },
        { x: "May", y: 209 },
        { x: "June", y: 214 },
      ],
    },
    {
      name: "Mobile",
      data: [
        { x: "January", y: 80 },
        { x: "February", y: 200 },
        { x: "March", y: 120 },
        { x: "April", y: 190 },
        { x: "May", y: 130 },
        { x: "June", y: 140 },
      ],
    },
  ]);

  const options = ref<ApexOptions>({
    stroke: { curve: "smooth", width: 1 },
    annotations: {
      yaxis: [
        {
          y: 0,
          y2: 73,
          fillColor: "var(--color-red-500)",
          opacity: 1,
          strokeDashArray: 0,
          borderColor: "transparent",
          borderWidth: 0,
          label: {
            text: "Lowest",
            borderColor: "var(--color-border)",
            borderRadius: 6,
            offsetY: -5,
            offsetX: -10,
            style: {
              color: "var(--color-popover-foreground)",
              background: "var(--color-popover)",
              fontSize: "12px",
              padding: {
                bottom: 4,
                top: 4,
                left: 8,
                right: 8,
              },
            },
          },
        },
      ],
      points: [
        {
          x: "Feb",
          y: 305,
          // Do something when the point is clicked
          click() {
            useSonner("Most Visitors", {
              description: "February had the highest number of visitors.",
            });
          },
          marker: {
            size: 5,
            fillColor: "var(--color-emerald-500)",
            strokeColor: "var(--color-emerald-500)",
          },
          label: {
            text: "Most Visitors",
            borderColor: "var(--color-border)",
            borderRadius: 6,
            style: {
              background: "var(--color-popover)",
              color: "var(--color-popover-foreground)",
              padding: {
                bottom: 4,
                top: 4,
                left: 8,
                right: 8,
              },
            },
          },
        },
      ],
    },

    yaxis: { labels: { show: false } },
    xaxis: {
      tooltip: { enabled: false },
      labels: {
        formatter(value) {
          return value?.slice(0, 3);
        },
      },
    },
  });
</script>
```

<!-- /automd -->

::

### Area Chart - Custom Tooltip

::ShowCase

:DocsApexChartsArea9

#code

<!-- automd:file src="../../app/components/content/Docs/ApexCharts/Area/DocsApexChartsArea9.vue" code lang="vue" -->

```vue [DocsApexChartsArea9.vue]
<template>
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>Area Chart</UiCardTitle>
      <UiCardDescription> Showing total visitors for the last 6 months </UiCardDescription>
    </UiCardHeader>
    <UiCardContent class="aspect-auto h-[350px] w-full">
      <UiApexchart type="area" :series :options />
    </UiCardContent>
    <UiCardFooter>
      <div class="flex w-full items-start gap-2 text-sm">
        <div class="grid gap-2">
          <div class="flex items-center gap-2 leading-none font-medium">
            Trending up by 5.2% this month <Icon name="lucide:trending-up" class="inline size-4" />
          </div>
          <div class="flex items-center gap-2 leading-none text-muted-foreground">
            January - June 2024
          </div>
        </div>
      </div>
    </UiCardFooter>
  </UiCard>
</template>

<script lang="ts" setup>
  import type { ApexOptions } from "apexcharts";

  const series = ref<ApexOptions["series"]>([
    {
      name: "Desktop",
      data: [
        { x: "January", y: 186 },
        { x: "February", y: 305 },
        { x: "March", y: 237 },
        { x: "April", y: 73 },
        { x: "May", y: 209 },
        { x: "June", y: 214 },
      ],
    },
    {
      name: "Mobile",
      data: [
        { x: "January", y: 80 },
        { x: "February", y: 200 },
        { x: "March", y: 120 },
        { x: "April", y: 190 },
        { x: "May", y: 130 },
        { x: "June", y: 140 },
      ],
    },
  ]);

  const options = ref<ApexOptions>({
    stroke: { curve: "smooth", width: 1 },
    tooltip: {
      // Return an array of functions to customize the tooltip
      custom: (value) => {
        const dataDesktop = value.series[0][value.dataPointIndex];
        const dataMobile = value.series[1][value.dataPointIndex];
        const month = value.w.globals.initialSeries[0].data[value.dataPointIndex].x;
        const desktopColor = value.w.globals.colors[0];
        const mobileColor = value.w.globals.colors[1];
        return `
        <div class="p-3 bg-linear-to-b to-white from-zinc-100 dark:from-zinc-900 dark:to-zinc-800 w-full min-w-32 text-xs ring-1 ring-border/50 rounded-lg shadow-xl">
          <p class="font-semibold">${month} Visitors</p>
          <div class="flex flex-col mt-4 gap-2">
            <div class="flex items-center gap-2">
              <div class="w-1 h-[14px] block rounded-full" style="background-color: ${desktopColor};"></div>
              <span class="text-muted-foreground">Desktop</span>
              <span class="font-semibold">${dataDesktop}</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-1 h-[14px] block rounded-full" style="background-color: ${mobileColor};"></div>
              <span class="text-muted-foreground">Mobile</span>
              <span class="font-semibold">${dataMobile}</span>
            </div>
          </div>
        </div>
        `;
      },
    },

    yaxis: { labels: { show: false } },
    xaxis: {
      tooltip: { enabled: false },
      labels: {
        formatter(value) {
          return value?.slice(0, 3);
        },
      },
    },
  });
</script>
```

<!-- /automd -->

::

### Area Chart - Toolbar

::ShowCase

:DocsApexChartsArea10

#code

<!-- automd:file src="../../app/components/content/Docs/ApexCharts/Area/DocsApexChartsArea10.vue" code lang="vue" -->

```vue [DocsApexChartsArea10.vue]
<template>
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>Area Chart</UiCardTitle>
      <UiCardDescription> Showing total visitors for the last 6 months </UiCardDescription>
    </UiCardHeader>
    <UiCardContent class="aspect-auto h-[350px] w-full">
      <UiApexchart type="area" :series :options />
    </UiCardContent>
    <UiCardFooter>
      <div class="flex w-full items-start gap-2 text-sm">
        <div class="grid gap-2">
          <div class="flex items-center gap-2 leading-none font-medium">
            Trending up by 5.2% this month <Icon name="lucide:trending-up" class="inline size-4" />
          </div>
          <div class="flex items-center gap-2 leading-none text-muted-foreground">
            January - June 2024
          </div>
        </div>
      </div>
    </UiCardFooter>
  </UiCard>
</template>

<script lang="ts" setup>
  import type { ApexOptions } from "apexcharts";

  const series = ref<ApexOptions["series"]>([
    {
      name: "Desktop",
      data: [
        { x: "January", y: 186 },
        { x: "February", y: 305 },
        { x: "March", y: 237 },
        { x: "April", y: 73 },
        { x: "May", y: 209 },
        { x: "June", y: 214 },
      ],
    },
    {
      name: "Mobile",
      data: [
        { x: "January", y: 80 },
        { x: "February", y: 200 },
        { x: "March", y: 120 },
        { x: "April", y: 190 },
        { x: "May", y: 130 },
        { x: "June", y: 140 },
      ],
    },
  ]);

  const options = ref<ApexOptions>({
    stroke: { curve: "smooth", width: 1 },
    yaxis: { labels: { show: false } },
    chart: {
      zoom: { enabled: true },
      selection: { enabled: true },
      toolbar: { show: true },
    },
    xaxis: {
      tooltip: { enabled: false },
      labels: {
        formatter(value) {
          return value?.slice(0, 3);
        },
      },
    },
  });
</script>
```

<!-- /automd -->

::

### Area Chart - Sparkline

::ShowCase

:DocsApexChartsArea11

#code

<!-- automd:file src="../../app/components/content/Docs/ApexCharts/Area/DocsApexChartsArea11.vue" code lang="vue" -->

```vue [DocsApexChartsArea11.vue]
<template>
  <UiCard class="@container">
    <UiCardHeader>
      <UiCardTitle>Area Chart</UiCardTitle>
      <UiCardDescription> Showing total visitors for the last 6 months </UiCardDescription>
    </UiCardHeader>
    <UiCardContent class="grid aspect-auto w-full grid-cols-1 gap-4 @[450px]:grid-cols-2">
      <div class="@[700px]:h-[100px]">
        <UiApexchart type="area" :series :options />
      </div>
      <div class="@[700px]:h-[100px]">
        <UiApexchart type="area" :series="series2" :options />
      </div>
    </UiCardContent>
    <UiCardFooter>
      <div class="flex w-full items-start gap-2 text-sm">
        <div class="grid gap-2">
          <div class="flex items-center gap-2 leading-none font-medium">
            Trending up by 5.2% this month <Icon name="lucide:trending-up" class="inline size-4" />
          </div>
          <div class="flex items-center gap-2 leading-none text-muted-foreground">
            January - June 2024
          </div>
        </div>
      </div>
    </UiCardFooter>
  </UiCard>
</template>

<script lang="ts" setup>
  import type { ApexOptions } from "apexcharts";

  const series = ref<ApexOptions["series"]>([
    {
      name: "Desktop",
      data: [
        { x: "January", y: 30 },
        { x: "February", y: 250 },
        { x: "March", y: 110 },
        { x: "April", y: 200 },
        { x: "May", y: 400 },
        { x: "June", y: 440 },
      ],
    },
  ]);
  const series2 = ref<ApexOptions["series"]>([
    {
      name: "Mobile",
      data: [
        { x: "January", y: 80 },
        { x: "February", y: 200 },
        { x: "March", y: 120 },
        { x: "April", y: 190 },
        { x: "May", y: 130 },
        { x: "June", y: 140 },
      ],
    },
  ]);

  const options = ref<ApexOptions>({
    stroke: { width: 1 },
    yaxis: { labels: { show: false } },
    chart: {
      sparkline: { enabled: true },
    },
    xaxis: {
      tooltip: { enabled: false },
      labels: {
        formatter(value) {
          return value?.slice(0, 3);
        },
      },
    },
  });
</script>
```

<!-- /automd -->

::
