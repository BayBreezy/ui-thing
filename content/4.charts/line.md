---
title: Line
description: A line chart visually displays data points connected by straight lines, illustrating trends or relationships over a continuous axis.
---

## Source code

Click :SourceCodeLink{component="Chart/Line.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add chart
```

## Usage

### Basic

::ShowCase

:DocsLineChart

#code

<!-- automd:file src="../../app/components/content/Docs/Chart/Line/DocsLineChart.vue" code lang="vue" -->

```vue [DocsLineChart.vue]
<template>
  <UiChartLine
    :data="data"
    index="year"
    :categories="['Export Growth Rate', 'Import Growth Rate']"
    :y-formatter="
      (tick, i) => {
        return typeof tick === 'number'
          ? `$ ${new Intl.NumberFormat('us').format(tick).toString()}`
          : '';
      }
    "
  />
</template>

<script setup lang="ts">
  import { faker } from "@faker-js/faker";
  import dayjs from "dayjs";

  const { data } = await useAsyncData(
    async () => {
      return Array.from({ length: 40 }, (_, i) => {
        const year = dayjs().subtract(i, "year").format("YYYY");
        return {
          year,
          "Export Growth Rate": faker.number.float({ min: 0.8, max: 2.5, fractionDigits: 2 }),
          "Import Growth Rate": faker.number.float({ min: 0.8, max: 2.5, fractionDigits: 2 }),
        };
      }).reverse();
    },
    { default: () => [] }
  );
</script>
```

<!-- /automd -->

::

### Sparkline

We can turn the chart into sparkline chart by hiding axis, gridline and legends.

::ShowCase

:DocsLineChartSparkline

#code

<!-- automd:file src="../../app/components/content/Docs/Chart/Line/DocsLineChartSparkline.vue" code lang="vue" -->

```vue [DocsLineChartSparkline.vue]
<template>
  <div class="flex items-center justify-center">
    <UiChartLine
      index="year"
      class="h-[100px] w-[400px]"
      :data="data"
      :categories="['Export Growth Rate']"
      :y-formatter="
        (tick, i) => {
          return typeof tick === 'number'
            ? `$ ${new Intl.NumberFormat('us').format(tick).toString()}`
            : '';
        }
      "
      :show-tooltip="false"
      :show-grid-line="false"
      :show-legend="false"
      :show-x-axis="false"
      :show-y-axis="false"
    />
  </div>
</template>

<script setup lang="ts">
  import { faker } from "@faker-js/faker";
  import dayjs from "dayjs";

  const { data } = await useAsyncData(
    async () => {
      return Array.from({ length: 40 }, (_, i) => {
        const year = dayjs().subtract(i, "year").format("YYYY");
        return {
          year,
          "Export Growth Rate": faker.number.float({ min: 0.8, max: 2.5, fractionDigits: 2 }),
          "Import Growth Rate": faker.number.float({ min: 0.8, max: 2.5, fractionDigits: 2 }),
        };
      }).reverse();
    },
    { default: () => [] }
  );
</script>
```

<!-- /automd -->

::

### Custom Tooltip

If you want to render custom tooltip, you can easily pass in a custom component. Refer to prop definition [here](/charts#custom-tooltip).

::ShowCase

:DocsLineChartCustomTooltip

#code

<!-- automd:file src="../../app/components/content/Docs/Chart/Line/DocsLineChartCustomTooltip.vue" code lang="vue" -->

```vue [DocsLineChartCustomTooltip.vue]
<template>
  <UiChartLine
    index="name"
    :data="data"
    :categories="['Total', 'Predicted']"
    :custom-tooltip="CustomChartTooltip"
  />
</template>

<script setup lang="ts">
  import { faker } from "@faker-js/faker";
  import { CustomChartTooltip } from "#components";
  import dayjs from "dayjs";

  const { data } = await useAsyncData(
    async () => {
      return Array.from({ length: 40 }, (_, i) => {
        const month = dayjs().month(i).format("MMM");
        return {
          name: month,
          Total: faker.number.float({ min: 500, max: 2500, fractionDigits: 2 }),
          Predicted: faker.number.float({ min: 500, max: 2500, fractionDigits: 2 }),
        };
      });
    },
    { default: () => [] }
  );
</script>
```

<!-- /automd -->

::

#### Custom Tooltip Component

This is what the `CustomChartTooltip` component looks like:

<!-- automd:file src="../../app/components/CustomChartTooltip.vue" code lang="vue" -->

```vue [CustomChartTooltip.vue]
<template>
  <UiCard class="text-sm">
    <UiCardContent class="flex min-w-[180px] flex-col gap-2 p-3">
      <div v-for="(item, key) in data" :key="key" class="flex items-center justify-between">
        <div class="flex items-center">
          <span class="mr-4 h-7 w-1 rounded-full" :style="{ background: item.color }" />
          <span>{{ item.name }}</span>
        </div>
        <span class="ml-4 font-semibold">{{ item.value }}</span>
      </div>
    </UiCardContent>
  </UiCard>
</template>

<script setup lang="ts">
  defineProps<{
    title?: string;
    data: {
      name: string;
      color: string;
      value: any;
    }[];
  }>();
</script>
```

<!-- /automd -->
