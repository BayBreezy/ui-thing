---
title: Area
description: An area chart visually represents data over time, displaying trends and patterns through filled-in areas under a line graph.
---

## Source code

Click :SourceCodeLink{component="Chart/Area.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add chart
```

## Usage

### Basic

::ShowCase

:DocsAreaChart

#code

<!-- automd:file src="../../app/components/content/Docs/Chart/Area/DocsAreaChart.vue" code lang="vue" -->

```vue [DocsAreaChart.vue]
<template>
  <UiChartArea :data="data" index="name" :categories="['Total', 'Predicted', 'Actual']" />
</template>

<script setup lang="ts">
  import { faker } from "@faker-js/faker";
  import dayjs from "dayjs";

  const { data } = await useAsyncData(
    async () => {
      return Array.from({ length: 12 }, (_, i) => {
        const month = dayjs().month(i).format("MMM");
        return {
          name: month,
          Total: faker.number.float({ min: 500, max: 2500, fractionDigits: 2 }),
          Predicted: faker.number.float({ min: 500, max: 2500, fractionDigits: 2 }),
          Actual: faker.number.float({ min: 500, max: 2500, fractionDigits: 2 }),
        };
      });
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

:DocsAreaChartSparkline

#code

<!-- automd:file src="../../app/components/content/Docs/Chart/Area/DocsAreaChartSparkline.vue" code lang="vue" -->

```vue [DocsAreaChartSparkline.vue]
<template>
  <div class="flex items-center justify-center">
    <UiChartArea
      class="h-[100px] w-[400px]"
      index="name"
      :data="data"
      :categories="['Total']"
      :show-grid-line="false"
      :show-legend="false"
      :show-x-axis="false"
      :show-y-axis="false"
      :curve-type="CurveType.Linear"
    />
  </div>
</template>

<script setup lang="ts">
  import { faker } from "@faker-js/faker";
  import { CurveType } from "@unovis/ts";
  import dayjs from "dayjs";

  const { data } = await useAsyncData(
    async () => {
      return Array.from({ length: 12 }, (_, i) => {
        const month = dayjs().month(i).format("MMM");
        return {
          name: month,
          Total: faker.number.float({ min: 500, max: 2500, fractionDigits: 2 }),
        };
      });
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

:DocsAreaChartCustomTooltip

#code

<!-- automd:file src="../../app/components/content/Docs/Chart/Area/DocsAreaChartCustomTooltip.vue" code lang="vue" -->

```vue [DocsAreaChartCustomTooltip.vue]
<template>
  <UiChartArea
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
      return Array.from({ length: 12 }, (_, i) => {
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
