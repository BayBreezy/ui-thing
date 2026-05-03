---
title: Pie / Donut
description: Pie and Donut charts are used to represent data in a circular format, showing the proportion of each category relative to the whole.
---

## Installation

:prose-pm-x{command="ui-thing@latest add apexcharts"}

## Usage

### Pie Chart

::prose-show-case

:DocsApexChartsPieDonut1

#code

<!-- automd:file src="../../app/components/content/Docs/ApexCharts/PieDonut/DocsApexChartsPieDonut1.vue" code lang="vue" -->

```vue [DocsApexChartsPieDonut1.vue]
<template>
  <div>
    <UiCard class="flex flex-col">
      <UiCardHeader class="items-center pb-0">
        <UiCardTitle>Pie Chart</UiCardTitle>
        <UiCardDescription>January - June 2024</UiCardDescription>
      </UiCardHeader>
      <UiCardContent class="h-[250px]">
        <UiApexchart type="pie" :series :options />
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
    Array.from({ length: 6 }, () => faker.number.int({ min: 1000, max: 5000 }))
  );

  const options = ref<ApexOptions>({
    stroke: { width: 0 },
    theme: { monochrome: { enabled: true, shadeTo: "dark", color: "#34d399" } },
    labels: ["January", "February", "March", "April", "May", "June"],
    states: { hover: { filter: { type: "none" } }, active: { filter: { type: "none" } } },
    tooltip: { followCursor: true },
  });
</script>
```

<!-- /automd -->

::

### Pie Chart - Labels

::prose-show-case

:DocsApexChartsPieDonut2

#code

<!-- automd:file src="../../app/components/content/Docs/ApexCharts/PieDonut/DocsApexChartsPieDonut2.vue" code lang="vue" -->

```vue [DocsApexChartsPieDonut2.vue]
<template>
  <div>
    <UiCard class="flex flex-col">
      <UiCardHeader class="items-center pb-0">
        <UiCardTitle>Pie Chart</UiCardTitle>
        <UiCardDescription>January - June 2024</UiCardDescription>
      </UiCardHeader>
      <UiCardContent class="h-[250px]">
        <UiApexchart type="pie" :series :options />
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
    Array.from({ length: 6 }, () => faker.number.int({ min: 200, max: 400 }))
  );

  const options = ref<ApexOptions>({
    stroke: { width: 0 },
    plotOptions: {
      pie: { expandOnClick: false },
    },
    theme: { monochrome: { enabled: true, shadeTo: "dark", color: "#3b82f6" } },
    dataLabels: {
      enabled: true,
      style: { fontWeight: 600, fontSize: "10px" },
      dropShadow: { enabled: false },
    },
    labels: ["January", "February", "March", "April", "May", "June"],
    states: { hover: { filter: { type: "none" } }, active: { filter: { type: "none" } } },
    tooltip: { followCursor: true },
  });
</script>
```

<!-- /automd -->

::

### Pie Chart - Legend

::prose-show-case

:DocsApexChartsPieDonut3

#code

<!-- automd:file src="../../app/components/content/Docs/ApexCharts/PieDonut/DocsApexChartsPieDonut3.vue" code lang="vue" -->

```vue [DocsApexChartsPieDonut3.vue]
<template>
  <div>
    <UiCard class="flex flex-col">
      <UiCardHeader class="items-center pb-0">
        <UiCardTitle>Pie Chart</UiCardTitle>
        <UiCardDescription>January - June 2024</UiCardDescription>
      </UiCardHeader>
      <UiCardContent class="h-[250px]">
        <UiApexchart type="pie" :series :options />
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
    Array.from({ length: 6 }, () => faker.number.int({ min: 1000, max: 5000 }))
  );

  const options = ref<ApexOptions>({
    stroke: { width: 0 },
    legend: { show: true, position: "bottom", horizontalAlign: "center" },
    theme: { monochrome: { enabled: true, shadeTo: "dark", color: "#34d399" } },
    labels: ["January", "February", "March", "April", "May", "June"],
    states: { hover: { filter: { type: "none" } }, active: { filter: { type: "none" } } },
    tooltip: { followCursor: true },
  });
</script>
```

<!-- /automd -->

::

### Donut Chart - Labels

::prose-show-case

:DocsApexChartsPieDonut4

#code

<!-- automd:file src="../../app/components/content/Docs/ApexCharts/PieDonut/DocsApexChartsPieDonut4.vue" code lang="vue" -->

```vue [DocsApexChartsPieDonut4.vue]
<template>
  <div>
    <UiCard class="flex flex-col">
      <UiCardHeader class="items-center pb-0">
        <UiCardTitle>Donut Chart</UiCardTitle>
        <UiCardDescription>January - June 2024</UiCardDescription>
      </UiCardHeader>
      <UiCardContent class="h-[250px]">
        <UiApexchart type="donut" :series :options />
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
    Array.from({ length: 6 }, () => faker.number.int({ min: 200, max: 400 }))
  );

  const options = ref<ApexOptions>({
    stroke: { width: 0 },
    theme: { monochrome: { enabled: true, shadeTo: "dark", color: "#3b82f6" } },
    dataLabels: {
      enabled: true,
      style: { fontWeight: 600, fontSize: "10px" },
      dropShadow: { enabled: false },
    },
    labels: ["January", "February", "March", "April", "May", "June"],
    states: { hover: { filter: { type: "none" } }, active: { filter: { type: "none" } } },
    tooltip: { followCursor: true },
  });
</script>
```

<!-- /automd -->

::

### Donut Chart - Inner Text

::prose-show-case

:DocsApexChartsPieDonut5

#code

<!-- automd:file src="../../app/components/content/Docs/ApexCharts/PieDonut/DocsApexChartsPieDonut5.vue" code lang="vue" -->

```vue [DocsApexChartsPieDonut5.vue]
<template>
  <div>
    <UiCard class="flex flex-col">
      <UiCardHeader class="items-center pb-0">
        <UiCardTitle>Donut Chart</UiCardTitle>
        <UiCardDescription>January - June 2024</UiCardDescription>
      </UiCardHeader>
      <UiCardContent class="h-[250px]">
        <UiApexchart type="donut" :series :options />
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
    Array.from({ length: 6 }, () => faker.number.int({ min: 200, max: 400 }))
  );

  const options = ref<ApexOptions>({
    stroke: { width: 0 },
    plotOptions: {
      pie: {
        donut: {
          size: "60%",
          labels: {
            show: true,
            name: {
              show: true,
              offsetY: 20,
              fontSize: "16px",
              fontWeight: 500,
            },
            value: {
              show: true,
              offsetY: -20,
              fontSize: "24px",
              fontWeight: 900,
              color: undefined,
              formatter: (val) => val.toLocaleString(),
            },
            total: {
              show: true,
              label: "Visitors",
              fontSize: "13px",
              color: "var(--color-muted-foreground)",
            },
          },
        },
      },
    },
    theme: { monochrome: { enabled: true, shadeTo: "dark", color: "#34d399" } },
    labels: ["January", "February", "March", "April", "May", "June"],
    states: { hover: { filter: { type: "none" } }, active: { filter: { type: "none" } } },
    tooltip: { followCursor: true },
  });
</script>
```

<!-- /automd -->

::

### Donut Chart - Semi

::prose-show-case

:DocsApexChartsPieDonut6

#code

<!-- automd:file src="../../app/components/content/Docs/ApexCharts/PieDonut/DocsApexChartsPieDonut6.vue" code lang="vue" -->

```vue [DocsApexChartsPieDonut6.vue]
<template>
  <div>
    <UiCard class="flex flex-col">
      <UiCardHeader class="items-center pb-0">
        <UiCardTitle>Donut Chart</UiCardTitle>
        <UiCardDescription>January - June 2024</UiCardDescription>
      </UiCardHeader>
      <UiCardContent class="h-[250px]">
        <UiApexchart type="donut" :series :options />
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
    Array.from({ length: 6 }, () => faker.number.int({ min: 200, max: 400 }))
  );

  const options = ref<ApexOptions>({
    stroke: { width: 0 },
    plotOptions: {
      pie: {
        donut: { size: "40%" },
        startAngle: -90,
        endAngle: 90,
        offsetY: 50,
      },
    },
    theme: { monochrome: { enabled: true, shadeTo: "dark", color: "#3b82f6" } },
    labels: ["January", "February", "March", "April", "May", "June"],
    states: { hover: { filter: { type: "none" } }, active: { filter: { type: "none" } } },
    tooltip: { followCursor: true },
  });
</script>
```

<!-- /automd -->

::

### Donut Chart - Gradient

::prose-show-case

:DocsApexChartsPieDonut7

#code

<!-- automd:file src="../../app/components/content/Docs/ApexCharts/PieDonut/DocsApexChartsPieDonut7.vue" code lang="vue" -->

```vue [DocsApexChartsPieDonut7.vue]
<template>
  <div>
    <UiCard class="flex flex-col">
      <UiCardHeader class="items-center pb-0">
        <UiCardTitle>Donut Chart</UiCardTitle>
        <UiCardDescription>January - June 2024</UiCardDescription>
      </UiCardHeader>
      <UiCardContent class="h-[250px]">
        <UiApexchart type="donut" :series :options />
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
    Array.from({ length: 6 }, () => faker.number.int({ min: 200, max: 400 }))
  );

  const options = ref<ApexOptions>({
    stroke: { width: 0 },
    plotOptions: {
      pie: {
        donut: {
          size: "60%",
          labels: {
            show: true,
            name: {
              show: true,
              offsetY: 20,
              fontSize: "16px",
              fontWeight: 500,
            },
            value: {
              show: true,
              offsetY: -20,
              fontSize: "24px",
              fontWeight: 900,
              color: undefined,
              formatter: (val) => val.toLocaleString(),
            },
            total: {
              show: true,
              label: "Visitors",
              fontSize: "13px",
              color: "var(--color-muted-foreground)",
            },
          },
        },
      },
    },
    fill: { type: "gradient" },
    theme: { monochrome: { enabled: true, shadeTo: "dark", color: "#8b5cf6" } },
    labels: ["January", "February", "March", "April", "May", "June"],
    states: { hover: { filter: { type: "none" } }, active: { filter: { type: "none" } } },
    tooltip: { followCursor: true },
  });
</script>
```

<!-- /automd -->

::

### Pie Chart - Images

::prose-show-case

:DocsApexChartsPieDonut8

#code

<!-- automd:file src="../../app/components/content/Docs/ApexCharts/PieDonut/DocsApexChartsPieDonut8.vue" code lang="vue" -->

```vue [DocsApexChartsPieDonut8.vue]
<template>
  <div>
    <UiCard class="flex flex-col">
      <UiCardHeader class="items-center pb-0">
        <UiCardTitle>Pie Chart</UiCardTitle>
        <UiCardDescription>January - June 2024</UiCardDescription>
      </UiCardHeader>
      <UiCardContent class="h-[250px]">
        <UiApexchart type="pie" :series :options />
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
    Array.from({ length: 4 }, () => faker.number.int({ min: 200, max: 400 }))
  );

  const options = ref<ApexOptions>({
    stroke: { width: 2, colors: ["var(--color-background)"] },
    fill: {
      type: "image",
      opacity: 1,
      image: {
        src: [
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=50&w=500&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1513346940221-6f673d962e97?q=50&w=500&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=50&w=500&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=50&w=500&auto=format&fit=crop",
        ],
      },
    },
    colors: [
      "var(--color-violet-500)",
      "var(--color-amber-500)",
      "var(--color-blue-500)",
      "var(--color-sky-500)",
    ],
    chart: {
      toolbar: { show: true },
      events: {
        dataPointSelection(e, chart, opts) {
          const images = opts.w.config.fill.image.src;
          const selectedImage = images[opts.dataPointIndex];
          useSonner.info("Open Image", {
            description: "Would you like to view the selected image?",
            icon: h(resolveComponent("Icon"), {
              name: "lucide:image",
              class: "size-4 text-muted-foreground",
            }),
            action: {
              label: "Yes, Open",
              onClick: () => {
                window.open(selectedImage, "_blank");
              },
            },
          });
        },
      },
    },
    labels: ["January", "February", "March", "April"],
    states: { hover: { filter: { type: "none" } }, active: { filter: { type: "none" } } },
    tooltip: { followCursor: true },
  });
</script>
```

<!-- /automd -->

::
