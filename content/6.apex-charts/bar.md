---
title: Bar
description: Bar charts are used to compare different categories of data.
---

## Installation

:prose-pm-x{command="ui-thing@latest add apexcharts"}

## Usage

### Interactive

::prose-show-case

:DocsApexChartsBar1

#code

<!-- automd:file src="../../app/components/content/Docs/ApexCharts/Bar/DocsApexChartsBar1.vue" code lang="vue" -->

```vue [DocsApexChartsBar1.vue]
<template>
  <div>
    <UiCard class="py-0">
      <UiCardHeader class="flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div class="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-0">
          <UiCardTitle>Bar Chart - Interactive</UiCardTitle>
          <UiCardDescription> Showing total visitors for the last 3 months </UiCardDescription>
        </div>
        <div class="flex">
          <button
            v-for="(chart, key) in ['desktop', 'mobile']"
            :key="key"
            :data-active="activeSeries === chart"
            class="data-[active=true]:bg-muted/50 relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
            @click="activeSeries = chart"
          >
            <span class="text-muted-foreground text-xs">
              {{ chart.charAt(0).toUpperCase() + chart.slice(1) }} Visitors
            </span>
            <span class="text-lg leading-none font-bold sm:text-3xl">
              {{
                chart === "desktop"
                  ? Intl.NumberFormat().format(desktopTotal)
                  : Intl.NumberFormat().format(mobileTotal)
              }}
            </span>
          </button>
        </div>
      </UiCardHeader>
      <UiCardContent class="h-[250px] w-full px-2 sm:p-6">
        <UiApexchart type="bar" :series :options />
      </UiCardContent>
    </UiCard>
  </div>
</template>

<script lang="ts" setup>
  import type { ApexOptions } from "apexcharts";
  import dayjs from "dayjs";

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

  const getDesktopTotal = useMemoize(() => {
    return chartData.reduce((acc, item) => acc + item.desktop, 0);
  });
  const getMobileTotal = useMemoize(() => {
    return chartData.reduce((acc, item) => acc + item.mobile, 0);
  });

  const desktopTotal = getDesktopTotal();
  const mobileTotal = getMobileTotal();

  const activeSeries = ref("desktop");

  const series = ref<ApexOptions["series"]>([
    {
      name: "Desktop",
      data: chartData.map((item) => ({
        x: new Date(item.date),
        y: item.desktop,
      })),
    },
  ]);

  watchImmediate(activeSeries, (newValue) => {
    series.value = [
      {
        name: newValue.charAt(0).toUpperCase() + newValue.slice(1),
        data: chartData.map((item) => ({
          x: new Date(item.date),
          y: newValue === "desktop" ? item.desktop : item.mobile,
        })),
      },
    ];
  });

  const options = ref<ApexOptions>({
    plotOptions: {
      bar: {
        columnWidth: "55%",
      },
    },
    colors: ["var(--color-blue-500)"],
    xaxis: {
      type: "datetime",
      crosshairs: { show: false },
      labels: {
        formatter: (value) => {
          return dayjs(value).format("MMM D");
        },
      },
      tickAmount: 6,
    },
    yaxis: { show: false },
  });
</script>
```

<!-- /automd -->

::

### Bar Chart

::prose-show-case

:DocsApexChartsBar2

#code

<!-- automd:file src="../../app/components/content/Docs/ApexCharts/Bar/DocsApexChartsBar2.vue" code lang="vue" -->

```vue [DocsApexChartsBar2.vue]
<template>
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>Bar Chart</UiCardTitle>
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
    plotOptions: { bar: { borderRadius: 8 } },
    fill: { opacity: 1 },
    states: { hover: { filter: { type: "none" } } },
    yaxis: { labels: { show: false } },
    xaxis: { labels: { formatter: (value) => value?.slice(0, 3) } },
  });
</script>
```

<!-- /automd -->

::

### Bar Chart - Horizontal

::prose-show-case

:DocsApexChartsBar3

#code

<!-- automd:file src="../../app/components/content/Docs/ApexCharts/Bar/DocsApexChartsBar3.vue" code lang="vue" -->

```vue [DocsApexChartsBar3.vue]
<template>
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>Bar Chart</UiCardTitle>
      <UiCardDescription>January - June 2024</UiCardDescription>
    </UiCardHeader>
    <UiCardContent class="aspect-auto h-[350px] w-full">
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
    plotOptions: { bar: { borderRadius: 5, horizontal: true } },
    fill: { opacity: 1 },
    grid: { show: false },
    states: { hover: { filter: { type: "none" } } },
    xaxis: {
      type: "category",
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
  });
</script>
```

<!-- /automd -->

::

### Bar Chart - Multiple

::prose-show-case

:DocsApexChartsBar4

#code

<!-- automd:file src="../../app/components/content/Docs/ApexCharts/Bar/DocsApexChartsBar4.vue" code lang="vue" -->

```vue [DocsApexChartsBar4.vue]
<template>
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>Bar Chart</UiCardTitle>
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
    plotOptions: { bar: { borderRadius: 6 } },
    stroke: { width: 4, colors: ["transparent"] },
    fill: { opacity: 1 },
    states: { hover: { filter: { type: "none" } } },
    yaxis: { labels: { show: false } },
    xaxis: {
      labels: { formatter: (value) => value?.slice(0, 3) },
      crosshairs: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
  });
</script>
```

<!-- /automd -->

::

### Bar Chart - Stacked

::prose-show-case

:DocsApexChartsBar5

#code

<!-- automd:file src="../../app/components/content/Docs/ApexCharts/Bar/DocsApexChartsBar5.vue" code lang="vue" -->

```vue [DocsApexChartsBar5.vue]
<template>
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>Bar Chart</UiCardTitle>
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
    plotOptions: { bar: { borderRadius: 6 } },
    chart: { stacked: true },
    fill: { opacity: 1 },
    states: { hover: { filter: { type: "none" } } },
    yaxis: { labels: { show: false } },
    legend: { show: true },
    xaxis: {
      labels: { formatter: (value) => value?.slice(0, 3) },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
  });
</script>
```

<!-- /automd -->

::

### Bar Chart - Label

::prose-show-case

:DocsApexChartsBar6

#code

<!-- automd:file src="../../app/components/content/Docs/ApexCharts/Bar/DocsApexChartsBar6.vue" code lang="vue" -->

```vue [DocsApexChartsBar6.vue]
<template>
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>Bar Chart</UiCardTitle>
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
    plotOptions: { bar: { borderRadius: 8, dataLabels: { position: "top" } } },
    dataLabels: {
      enabled: true,
      offsetY: -25,
      style: { colors: ["var(--color-foreground)"] },
    },
    colors: ["var(--color-blue-600)"],
    fill: { opacity: 1 },
    states: { hover: { filter: { type: "none" } } },
    yaxis: { labels: { show: false } },
    xaxis: { labels: { formatter: (value) => value?.slice(0, 3) } },
  });
</script>
```

<!-- /automd -->

::

### Bar Chart - Mixed

::prose-show-case

:DocsApexChartsBar7

#code

<!-- automd:file src="../../app/components/content/Docs/ApexCharts/Bar/DocsApexChartsBar7.vue" code lang="vue" -->

```vue [DocsApexChartsBar7.vue]
<template>
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>Bar Chart</UiCardTitle>
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
  import type { ApexOptions } from "apexcharts";

  const series = ref<ApexOptions["series"]>([
    {
      name: "Desktop",
      data: [
        { x: "Chrome", y: 275, fillColor: "var(--color-blue-300)" },
        { x: "Safari", y: 200, fillColor: "var(--color-blue-500)" },
        { x: "Firefox", y: 187, fillColor: "var(--color-blue-600)" },
        { x: "Edge", y: 173, fillColor: "var(--color-blue-700)" },
        { x: "Other", y: 90, fillColor: "var(--color-blue-800)" },
      ],
    },
  ]);

  const options = ref<ApexOptions>({
    plotOptions: { bar: { borderRadius: 5, horizontal: true } },
    fill: { opacity: 1 },
    grid: { show: false },
    states: { hover: { filter: { type: "none" } } },
    xaxis: {
      type: "category",
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
  });
</script>
```

<!-- /automd -->

::

### Bar Chart - Negative

::prose-show-case

:DocsApexChartsBar8

#code

<!-- automd:file src="../../app/components/content/Docs/ApexCharts/Bar/DocsApexChartsBar8.vue" code lang="vue" -->

```vue [DocsApexChartsBar8.vue]
<template>
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>Bar Chart</UiCardTitle>
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
  import type { ApexOptions } from "apexcharts";

  const series = ref<ApexOptions["series"]>([
    {
      name: "Visitors",
      data: [
        { x: "January", y: 186 },
        { x: "February", y: 205 },
        { x: "March", y: -207, fillColor: "var(--color-rose-600)" },
        { x: "April", y: 173 },
        { x: "May", y: -209, fillColor: "var(--color-rose-600)" },
        { x: "June", y: 214 },
      ],
    },
  ]);

  const options = ref<ApexOptions>({
    plotOptions: { bar: { borderRadius: 5 } },
    fill: { opacity: 1 },
    colors: ["var(--color-blue-600)"],
    states: { hover: { filter: { type: "none" } } },
    xaxis: {
      type: "category",
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
  });
</script>
```

<!-- /automd -->

::

### Bar Chart - Image

::prose-show-case

:DocsApexChartsBar9

#code

<!-- automd:file src="../../app/components/content/Docs/ApexCharts/Bar/DocsApexChartsBar9.vue" code lang="vue" -->

```vue [DocsApexChartsBar9.vue]
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
```

<!-- /automd -->

::
