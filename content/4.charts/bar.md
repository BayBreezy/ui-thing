---
title: Bar
description: A bar chart visually represents data using rectangular bars of varying lengths to compare quantities across different categories or groups.
---

## Source code

Click :SourceCodeLink{component="Chart/Bar.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add chart
```

## Usage

### Basic

::ShowCase

:DocsBarChart

#code

<!-- automd:file src="../../app/components/content/Docs/Chart/Bar/DocsBarChart.vue" code lang="vue" -->

```vue [DocsBarChart.vue]
<template>
  <UiChartBar
    :data="data"
    index="name"
    :categories="['Total', 'Predicted']"
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

### Stacked

You can stack the bar chart by settings prop `type` to `stacked`.

::ShowCase

:DocsBarChartStacked

#code

<!-- automd:file src="../../app/components/content/Docs/Chart/Bar/DocsBarChartStacked.vue" code lang="vue" -->

```vue [DocsBarChartStacked.vue]
<template>
  <UiChartBar
    index="name"
    :data="data"
    :categories="['Total', 'Predicted']"
    :y-formatter="
      (tick, i) => {
        return typeof tick === 'number'
          ? `$ ${new Intl.NumberFormat('us').format(tick).toString()}`
          : '';
      }
    "
    :type="'stacked'"
  />
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
        };
      });
    },
    { default: () => [] }
  );
</script>
```

<!-- /automd -->

::

### Rounded Corners

::ShowCase

:DocsBarChartRounded

#code

<!-- automd:file src="../../app/components/content/Docs/Chart/Bar/DocsBarChartRounded.vue" code lang="vue" -->

```vue [DocsBarChartRounded.vue]
<template>
  <UiChartBar
    :data="data"
    index="name"
    :categories="['Total', 'Predicted']"
    :rounded-corners="4"
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

### Custom Tooltip

If you want to render custom tooltip, you can easily pass in a custom component. Refer to prop definition [here](/charts#custom-tooltip).

::ShowCase

:DocsBarChartCustomTooltip

#code

<!-- automd:file src="../../app/components/content/Docs/Chart/Bar/DocsBarChartCustomTooltip.vue" code lang="vue" -->

```vue [DocsBarChartCustomTooltip.vue]
<template>
  <UiChartBar
    :data="data"
    index="name"
    :categories="['Total', 'Predicted']"
    :rounded-corners="4"
    :custom-tooltip="CustomChartTooltip"
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
