---
title: Radial
description: Radial charts are used to display multivariate data in a two-dimensional chart of three or more quantitative variables represented on axes starting from the same point.
---

## Installation

:prose-pm-x{command="ui-thing@latest add apexcharts"}

## Usage

### Radial Chart

::prose-show-case

:DocsApexChartsRadial1

#code

<!-- automd:file src="../../app/components/content/Docs/ApexCharts/Radial/DocsApexChartsRadial1.vue" code lang="vue" -->

```vue [DocsApexChartsRadial1.vue]
<template>
  <div>
    <UiCard class="flex flex-col">
      <UiCardHeader class="items-center pb-0">
        <UiCardTitle>Radial Chart</UiCardTitle>
        <UiCardDescription>January - June 2024</UiCardDescription>
      </UiCardHeader>
      <UiCardContent class="h-[300px]">
        <UiApexchart type="radialBar" :series :options />
      </UiCardContent>
      <UiCardFooter class="flex-col gap-2 text-sm">
        <div class="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <Icon name="lucide:trending-up" class="size-4" />
        </div>
        <div class="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </UiCardFooter>
    </UiCard>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { ApexOptions } from "apexcharts";

  const series = ref<ApexOptions["series"]>(
    Array.from({ length: 5 }, () => faker.number.int({ min: 20, max: 100 }))
  );

  const options = ref<ApexOptions>({
    stroke: { lineCap: "butt" },
    labels: ["Chrome", "Safari", "Firefox", "Edge", "Other"],
    states: { hover: { filter: { type: "none" } }, active: { filter: { type: "none" } } },
  });
</script>
```

<!-- /automd -->

::

### Radial Chart - Bar Labels

::prose-show-case

:DocsApexChartsRadial2

#code

<!-- automd:file src="../../app/components/content/Docs/ApexCharts/Radial/DocsApexChartsRadial2.vue" code lang="vue" -->

```vue [DocsApexChartsRadial2.vue]
<template>
  <div>
    <UiCard class="flex flex-col">
      <UiCardHeader class="items-center pb-0">
        <UiCardTitle>Radial Chart</UiCardTitle>
        <UiCardDescription>January - June 2024</UiCardDescription>
      </UiCardHeader>
      <UiCardContent class="h-[300px]">
        <UiApexchart type="radialBar" :series :options />
      </UiCardContent>
      <UiCardFooter class="flex-col gap-2 text-sm">
        <div class="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <Icon name="lucide:trending-up" class="size-4" />
        </div>
        <div class="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </UiCardFooter>
    </UiCard>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { ApexOptions } from "apexcharts";

  const series = ref<ApexOptions["series"]>(
    Array.from({ length: 5 }, () => faker.number.int({ min: 20, max: 80 }))
  );

  const options = ref<ApexOptions>({
    plotOptions: {
      radialBar: {
        barLabels: {
          enabled: true,
          fontSize: "10px",
          offsetX: -7,
          formatter: function (seriesName, opts) {
            return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex] + "%";
          },
        },
      },
    },
    legend: { show: true, position: "bottom" },
    labels: ["Chrome", "Safari", "Firefox", "Edge", "Other"],
    states: { hover: { filter: { type: "none" } }, active: { filter: { type: "none" } } },
  });
</script>
```

<!-- /automd -->

::

### Radial Chart - Custom Text

::prose-show-case

:DocsApexChartsRadial3

#code

<!-- automd:file src="../../app/components/content/Docs/ApexCharts/Radial/DocsApexChartsRadial3.vue" code lang="vue" -->

```vue [DocsApexChartsRadial3.vue]
<template>
  <div>
    <UiCard class="flex flex-col">
      <UiCardHeader class="items-center pb-0">
        <UiCardTitle>Radial Chart</UiCardTitle>
        <UiCardDescription>January - June 2024</UiCardDescription>
      </UiCardHeader>
      <UiCardContent class="h-[300px]">
        <UiApexchart type="radialBar" :series :options />
      </UiCardContent>
      <UiCardFooter class="flex-col gap-2 text-sm">
        <div class="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <Icon name="lucide:trending-up" class="size-4" />
        </div>
        <div class="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </UiCardFooter>
    </UiCard>
  </div>
</template>

<script lang="ts" setup>
  import type { ApexOptions } from "apexcharts";

  const series = ref<ApexOptions["series"]>([80]);

  const options = ref<ApexOptions>({
    colors: ["var(--color-blue-500)"],
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            color: "var(--color-muted-foreground)",
            fontSize: "14px",
            fontWeight: "600",
            offsetY: 28,
          },
          value: {
            color: "var(--color-blue-500)",
            fontSize: "40px",
            fontWeight: "bold",
            offsetY: -15,
          },
        },
        hollow: { size: "60%", background: "var(--color-background)", margin: 0 },
      },
    },
    labels: ["Chrome"],
    states: { hover: { filter: { type: "none" } } },
  });
</script>
```

<!-- /automd -->

::

### Radial Chart - Expanded Section

::prose-show-case

:DocsApexChartsRadial4

#code

<!-- automd:file src="../../app/components/content/Docs/ApexCharts/Radial/DocsApexChartsRadial4.vue" code lang="vue" -->

```vue [DocsApexChartsRadial4.vue]
<template>
  <div>
    <UiCard class="flex flex-col">
      <UiCardHeader class="items-center pb-0">
        <UiCardTitle>Radial Chart</UiCardTitle>
        <UiCardDescription>January - June 2024</UiCardDescription>
      </UiCardHeader>
      <UiCardContent class="h-[300px]">
        <UiApexchart type="radialBar" :series :options />
      </UiCardContent>
      <UiCardFooter class="flex-col gap-2 text-sm">
        <div class="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <Icon name="lucide:trending-up" class="size-4" />
        </div>
        <div class="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </UiCardFooter>
    </UiCard>
  </div>
</template>

<script lang="ts" setup>
  import type { ApexOptions } from "apexcharts";

  const series = ref<ApexOptions["series"]>([76]);

  const options = ref<ApexOptions>({
    colors: ["var(--color-blue-500)"],
    stroke: { lineCap: "butt" },
    plotOptions: {
      radialBar: {
        track: { strokeWidth: "40%" },
        dataLabels: {
          name: {
            color: "var(--color-muted-foreground)",
            fontSize: "14px",
            fontWeight: "600",
            offsetY: 28,
          },
          value: {
            color: "var(--color-blue-500)",
            fontSize: "40px",
            fontWeight: "bold",
            offsetY: -15,
            formatter() {
              return "1,260";
            },
          },
        },
        hollow: { size: "65%" },
      },
    },
    labels: ["Visitors"],
    states: { hover: { filter: { type: "none" } } },
  });
</script>
```

<!-- /automd -->

::
