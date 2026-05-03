---
title: Funnel
description: Funnel charts are ideal for visualizing progressive stages in a linear process—typically where there's drop-off at each stage. They're perfect for showing conversion or attrition.
---

## Installation

:prose-pm-x{command="ui-thing@latest add apexcharts"}

## Usage

### Funnel Chart

::prose-show-case

:DocsApexChartsFunnel1

#code

<!-- automd:file src="../../app/components/content/Docs/ApexCharts/Funnel/DocsApexChartsFunnel1.vue" code lang="vue" -->

```vue [DocsApexChartsFunnel1.vue]
<template>
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>Sales Funnel</UiCardTitle>
      <UiCardDescription>
        {{ dayjs().subtract(1, "month").format("MMMM YYYY") }} -
        {{ dayjs().format("MMMM YYYY") }}</UiCardDescription
      >
    </UiCardHeader>
    <UiCardContent class="h-[320px]">
      <UiApexchart type="bar" :series :options />
    </UiCardContent>
    <UiCardFooter>
      <div class="flex w-full items-start gap-2 text-sm">
        <div class="grid gap-2">
          <div class="flex items-center gap-2 leading-none font-medium">
            Looking for a way to improve your sales funnel?
          </div>
          <div class="text-muted-foreground flex items-center gap-2 leading-none">
            <span>Check out our</span>
            <NuxtLink
              target="_blank"
              href="https://apexcharts.com/vue-chart-demos/funnel-charts/funnel/"
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
  import type { ApexOptions } from "apexcharts";
  import dayjs from "dayjs";

  const series = ref<ApexOptions["series"]>([
    {
      name: "Leads",
      data: [
        { x: "Lead", y: 9500 },
        { x: "Email Campaign", y: 6500 },
        { x: "Website Visit", y: 4390 },
        { x: "Contact Form", y: 2390 },
        { x: "Quoted", y: 978 },
        { x: "Deal Closed", y: 540 },
        { x: "Repeat Customer", y: 120 },
      ],
    },
  ]);

  const options = ref<ApexOptions>({
    states: { hover: { filter: { type: "none" } } },
    plotOptions: {
      bar: {
        borderRadius: 0,
        horizontal: true,
        barHeight: "80%",
        isFunnel: true,
      },
    },
    theme: {
      monochrome: { enabled: true, color: "#4F46E5", shadeTo: "light", shadeIntensity: 0.6 },
    },
    dataLabels: {
      enabled: true,
      formatter(val, opts) {
        console.log(val, opts);
        if (Number(val) > 2250) return `${val} (${Math.round((Number(val) / 9500) * 100)}%)`;
        return "";
      },
    },
  });
</script>
```

<!-- /automd -->

::

### Funnel Chart - Inverted

::prose-show-case

:DocsApexChartsFunnel2

#code

<!-- automd:file src="../../app/components/content/Docs/ApexCharts/Funnel/DocsApexChartsFunnel2.vue" code lang="vue" -->

```vue [DocsApexChartsFunnel2.vue]
<template>
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>Content Distribution</UiCardTitle>
      <UiCardDescription>
        {{ dayjs().subtract(1, "month").format("MMMM YYYY") }} -
        {{ dayjs().format("MMMM YYYY") }}</UiCardDescription
      >
    </UiCardHeader>
    <UiCardContent class="h-[320px]">
      <UiApexchart type="bar" :series :options />
    </UiCardContent>
    <UiCardFooter>
      <div class="flex w-full items-start gap-2 text-sm">
        <div class="grid gap-2">
          <div class="flex items-center gap-2 leading-none font-medium">
            Want to learn more about funnel charts?
          </div>
          <div class="text-muted-foreground flex items-center gap-2 leading-none">
            <span>Check out</span>
            <NuxtLink
              target="_blank"
              href="https://apexcharts.com/vue-chart-demos/funnel-charts/funnel/"
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
  import type { ApexOptions } from "apexcharts";
  import dayjs from "dayjs";

  const series = ref<ApexOptions["series"]>([
    {
      name: "Content Flow",
      data: [
        { x: "Original Posts", y: 30 },
        { x: "Shares by Influencers", y: 40 },
        { x: "Shares by Followers", y: 50 },
        { x: "Comments", y: 70 },
        { x: "Likes", y: 100 },
        { x: "Views", y: 200 },
      ],
    },
  ]);

  const options = ref<ApexOptions>({
    states: { hover: { filter: { type: "none" } } },
    plotOptions: {
      bar: {
        borderRadius: 0,
        horizontal: true,
        barHeight: "90%",
        isFunnel: true,
      },
    },
    colors: ["#FF4560"],
    legend: { show: true },
  });
</script>
```

<!-- /automd -->

::
