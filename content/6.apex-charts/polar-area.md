---
title: Polar Area
description: Polar area charts are used to display multivariate data in a two-dimensional chart of three or more quantitative variables represented on axes starting from the same point.
---

## Installation

:prose-pm-x{command="ui-thing@latest add apexcharts"}

## Usage

### Polar Area Chart

::prose-show-case

:DocsApexChartsPolarArea1

#code

<!-- automd:file src="../../app/components/content/Docs/ApexCharts/PolarArea/DocsApexChartsPolarArea1.vue" code lang="vue" -->

```vue [DocsApexChartsPolarArea1.vue]
<template>
  <div>
    <UiCard class="flex flex-col">
      <UiCardHeader class="items-center pb-0">
        <UiCardTitle>Polar Area Chart</UiCardTitle>
        <UiCardDescription> Showing total visitors for the last 6 months</UiCardDescription>
      </UiCardHeader>
      <UiCardContent class="h-[300px]">
        <UiApexchart type="polarArea" :series :options />
      </UiCardContent>
      <UiCardFooter class="flex-col gap-2 text-sm">
        <div class="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <Icon name="lucide:trending-up" class="size-4" />
        </div>
        <div class="text-muted-foreground leading-none">January - June 2024</div>
      </UiCardFooter>
    </UiCard>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { ApexOptions } from "apexcharts";

  const series = ref<ApexOptions["series"]>(
    Array.from({ length: 5 }, () => faker.number.int({ min: 1000, max: 2400 }))
  );

  const options = ref<ApexOptions>({
    stroke: { width: 0 },
    labels: ["Chrome", "Safari", "Firefox", "Edge", "Other"],
    states: { hover: { filter: { type: "none" } }, active: { filter: { type: "none" } } },
  });
</script>
```

<!-- /automd -->

::

### Polar Area Chart - No Lines

::prose-show-case

:DocsApexChartsPolarArea2

#code

<!-- automd:file src="../../app/components/content/Docs/ApexCharts/PolarArea/DocsApexChartsPolarArea2.vue" code lang="vue" -->

```vue [DocsApexChartsPolarArea2.vue]
<template>
  <div>
    <UiCard class="flex flex-col">
      <UiCardHeader class="items-center pb-0">
        <UiCardTitle>Polar Area Chart</UiCardTitle>
        <UiCardDescription> Showing total visitors for the last 6 months</UiCardDescription>
      </UiCardHeader>
      <UiCardContent class="h-[300px]">
        <UiApexchart type="polarArea" :series :options />
      </UiCardContent>
      <UiCardFooter class="flex-col gap-2 text-sm">
        <div class="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <Icon name="lucide:trending-up" class="size-4" />
        </div>
        <div class="text-muted-foreground leading-none">January - June 2024</div>
      </UiCardFooter>
    </UiCard>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { ApexOptions } from "apexcharts";

  const series = ref<ApexOptions["series"]>(
    Array.from({ length: 5 }, () => faker.number.int({ min: 1000, max: 2400 }))
  );

  const options = ref<ApexOptions>({
    stroke: { width: 0 },
    plotOptions: {
      polarArea: {
        rings: { strokeWidth: 0 },
        spokes: { strokeWidth: 0 },
      },
    },
    yaxis: { show: false },
    fill: { opacity: 1 },
    labels: ["Chrome", "Safari", "Firefox", "Edge", "Other"],
    states: { hover: { filter: { type: "none" } }, active: { filter: { type: "none" } } },
  });
</script>
```

<!-- /automd -->

::

### Polar Area Chart - Rings

::prose-show-case

:DocsApexChartsPolarArea3

#code

<!-- automd:file src="../../app/components/content/Docs/ApexCharts/PolarArea/DocsApexChartsPolarArea3.vue" code lang="vue" -->

```vue [DocsApexChartsPolarArea3.vue]
<template>
  <div>
    <UiCard class="flex flex-col">
      <UiCardHeader class="items-center pb-0">
        <UiCardTitle>Polar Area Chart</UiCardTitle>
        <UiCardDescription> Showing total visitors for the last 6 months</UiCardDescription>
      </UiCardHeader>
      <UiCardContent class="h-[300px]">
        <UiApexchart type="polarArea" :series :options />
      </UiCardContent>
      <UiCardFooter class="flex-col gap-2 text-sm">
        <div class="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <Icon name="lucide:trending-up" class="size-4" />
        </div>
        <div class="text-muted-foreground leading-none">January - June 2024</div>
      </UiCardFooter>
    </UiCard>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { ApexOptions } from "apexcharts";

  const series = ref<ApexOptions["series"]>(
    Array.from({ length: 5 }, () => faker.number.int({ min: 1000, max: 2400 }))
  );

  const options = ref<ApexOptions>({
    stroke: { width: 0 },
    plotOptions: {
      polarArea: {
        rings: { strokeWidth: 1 },
        spokes: { strokeWidth: 0 },
      },
    },
    yaxis: { show: false },
    fill: { opacity: 0.8 },
    theme: { monochrome: { enabled: true, shadeTo: "dark", color: "#34d399" } },
    labels: ["Chrome", "Safari", "Firefox", "Edge", "Other"],
  });
</script>
```

<!-- /automd -->

::

### Polar Area Chart - Legend

::prose-show-case

:DocsApexChartsPolarArea4

#code

<!-- automd:file src="../../app/components/content/Docs/ApexCharts/PolarArea/DocsApexChartsPolarArea4.vue" code lang="vue" -->

```vue [DocsApexChartsPolarArea4.vue]
<template>
  <div>
    <UiCard class="flex flex-col">
      <UiCardHeader class="items-center pb-0">
        <UiCardTitle>Polar Area Chart</UiCardTitle>
        <UiCardDescription> Showing total visitors for the last 6 months</UiCardDescription>
      </UiCardHeader>
      <UiCardContent class="h-[300px]">
        <UiApexchart type="polarArea" :series :options />
      </UiCardContent>
      <UiCardFooter class="flex-col gap-2 text-sm">
        <div class="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <Icon name="lucide:trending-up" class="size-4" />
        </div>
        <div class="text-muted-foreground leading-none">January - June 2024</div>
      </UiCardFooter>
    </UiCard>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { ApexOptions } from "apexcharts";

  const series = ref<ApexOptions["series"]>(
    Array.from({ length: 5 }, () => faker.number.int({ min: 1000, max: 2400 }))
  );

  const options = ref<ApexOptions>({
    stroke: { width: 0 },
    legend: { show: true, position: "bottom" },
    fill: { opacity: 1 },
    yaxis: { show: false },
    theme: { monochrome: { enabled: true, shadeTo: "light", color: "#5A00A4" } },
    labels: ["Chrome", "Safari", "Firefox", "Edge", "Other"],
  });
</script>
```

<!-- /automd -->

::

### Polar Area Chart - Labels

::prose-show-case

:DocsApexChartsPolarArea5

#code

<!-- automd:file src="../../app/components/content/Docs/ApexCharts/PolarArea/DocsApexChartsPolarArea5.vue" code lang="vue" -->

```vue [DocsApexChartsPolarArea5.vue]
<template>
  <div>
    <UiCard class="flex flex-col">
      <UiCardHeader class="items-center pb-0">
        <UiCardTitle>Polar Area Chart</UiCardTitle>
        <UiCardDescription> Showing total visitors for the last 6 months</UiCardDescription>
      </UiCardHeader>
      <UiCardContent class="h-[300px]">
        <UiApexchart type="polarArea" :series :options />
      </UiCardContent>
      <UiCardFooter class="flex-col gap-2 text-sm">
        <div class="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <Icon name="lucide:trending-up" class="size-4" />
        </div>
        <div class="text-muted-foreground leading-none">January - June 2024</div>
      </UiCardFooter>
    </UiCard>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { ApexOptions } from "apexcharts";

  const series = ref<ApexOptions["series"]>(
    Array.from({ length: 5 }, () => faker.number.int({ min: 1000, max: 2400 }))
  );

  const options = ref<ApexOptions>({
    fill: { opacity: 1 },
    dataLabels: {
      enabled: true,
      style: { fontWeight: 500, fontSize: "12px" },
      background: {
        backgroundColor: "#fff",
        foreColor: "#A40021",
        borderRadius: 6,
        borderWidth: 0,
        opacity: 1,
        padding: 8,
      },
    },
    yaxis: { show: false },
    theme: { monochrome: { enabled: true, shadeTo: "light", color: "#A40021" } },
    labels: ["Chrome", "Safari", "Firefox", "Edge", "Other"],
  });
</script>
```

<!-- /automd -->

::
