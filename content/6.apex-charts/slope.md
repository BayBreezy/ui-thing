---
title: Slope
description: Slope charts are used to compare two or more data points across different categories, showing the change in value over time or between two variables.
---

## Installation

:prose-pm-x{command="ui-thing@latest add apexcharts"}

## Usage

### Slope Chart

::ShowCase

:DocsApexChartsSlope1

#code

<!-- automd:file src="../../app/components/content/Docs/ApexCharts/Slope/DocsApexChartsSlope1.vue" code lang="vue" -->

```vue [DocsApexChartsSlope1.vue]
<template>
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>Revenue Before and After Campaign</UiCardTitle>
      <UiCardDescription> {{ dayjs().format("MMMM DD YYYY") }}</UiCardDescription>
    </UiCardHeader>
    <UiCardContent class="h-[320px]">
      <UiApexchart type="line" :series :options />
    </UiCardContent>
    <UiCardFooter>
      <div class="flex w-full items-start gap-2 text-sm">
        <div class="grid gap-2">
          <div class="flex items-center gap-2 leading-none font-medium">
            Want to learn more about slope charts?
          </div>
          <div class="flex items-center gap-2 leading-none text-muted-foreground">
            <span>Check out</span>
            <NuxtLink
              target="_blank"
              href="https://apexcharts.com/vue-chart-demos/slope-charts/basic/"
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

  const series = ref<ApexOptions["series"]>([
    {
      name: faker.commerce.product(),
      data: Array.from({ length: 2 }, (_, i) => ({
        x: i === 0 ? "Before Campaign" : "After Campaign",
        y: faker.number.int({ min: 10, max: 100 }),
      })),
    },
    {
      name: faker.commerce.product(),
      data: Array.from({ length: 2 }, (_, i) => ({
        x: i === 0 ? "Before Campaign" : "After Campaign",
        y: faker.number.int({ min: 10, max: 100 }),
      })),
    },
    {
      name: faker.commerce.product(),
      data: Array.from({ length: 2 }, (_, i) => ({
        x: i === 0 ? "Before Campaign" : "After Campaign",
        y: faker.number.int({ min: 10, max: 100 }),
      })),
    },
  ]);

  const options = ref<ApexOptions>({
    plotOptions: {
      line: { isSlopeChart: true },
    },
  });
</script>
```

<!-- /automd -->

::
