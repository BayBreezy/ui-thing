---
title: Donut
description: A donut chart visually represents data in a circular form, similar to a pie chart but with a central void, emphasizing proportions within categories.
---

## Source code

Click :SourceCodeLink{component="Chart/Donut.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add chart
```

## Usage

### Basic

::ShowCase

:DocsDonutChart

#code

<!-- automd:file src="../../app/components/content/Docs/Chart/Donut/DocsDonutChart.vue" code lang="vue" -->

```vue [DocsDonutChart.vue]
<template>
  <UiChartDonut index="name" :category="'Total'" :data="data" />
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
        };
      });
    },
    { default: () => [] }
  );
</script>
```

<!-- /automd -->

::

### Pie Chart

If you want to render pie chart instead, pass `type` as `pie`.

::ShowCase

:DocsPieChart

#code

<!-- automd:file src="../../app/components/content/Docs/Chart/Donut/DocsPieChart.vue" code lang="vue" -->

```vue [DocsPieChart.vue]
<template>
  <UiChartDonut index="name" :category="'Total'" :data="data" type="pie" />
</template>

<script setup lang="ts">
  import { faker } from "@faker-js/faker";
  import dayjs from "dayjs";

  const { data } = await useAsyncData(
    async () => {
      return Array.from({ length: 6 }, (_, i) => {
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

### Color

We generate colors automatically based on the primary and secondary color and assigned them accordingly. Feel free to pass in your own array of colors.

::ShowCase

:DocsDonutChartColor

#code

<!-- automd:file src="../../app/components/content/Docs/Chart/Donut/DocsDonutChartColor.vue" code lang="vue" -->

```vue [DocsDonutChartColor.vue]
<template>
  <UiChartDonut
    index="name"
    :category="'Total'"
    :data="data"
    :value-formatter="valueFormatter"
    :colors="['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'purple']"
  />
</template>

<script setup lang="ts">
  import { faker } from "@faker-js/faker";
  import dayjs from "dayjs";

  const valueFormatter = (tick: number | Date) =>
    typeof tick === "number" ? `$ ${new Intl.NumberFormat("us").format(tick).toString()}` : "";

  const { data } = await useAsyncData(
    async () => {
      return Array.from({ length: 7 }, (_, i) => {
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

:DocsDonutChartCustomTooltip

#code

<!-- automd:file src="../../app/components/content/Docs/Chart/Donut/DocsDonutChartCustomTooltip.vue" code lang="vue" -->

```vue [DocsDonutChartCustomTooltip.vue]
<template>
  <UiChartDonut
    index="name"
    :category="'Total'"
    :data="data"
    :custom-tooltip="CustomChartTooltip"
  />
</template>

<script setup lang="ts">
  import { faker } from "@faker-js/faker";
  import { CustomChartTooltip } from "#components";
  import dayjs from "dayjs";

  const { data } = await useAsyncData(
    async () => {
      return Array.from({ length: 7 }, (_, i) => {
        const month = dayjs().month(i).format("MMM");
        return {
          name: month,
          Total: faker.number.int({ min: 500, max: 2500 }),
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
