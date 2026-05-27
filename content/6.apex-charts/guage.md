---
title: Gauge
description: Gauge charts display a single value within a defined range, making them ideal for KPIs, dashboards, and real-time monitoring.
---

## Installation

:prose-pm-x{command="ui-thing@latest add apexcharts"}

## Usage

### Gauge Chart

::prose-show-case

:DocsApexChartsGuage1

#code

<!-- automd:file src="../../app/components/content/Docs/ApexCharts/Guage/DocsApexChartsGuage1.vue" code lang="vue" -->

```vue [DocsApexChartsGuage1.vue]
<template>
  <div>
    <UiCard class="flex flex-col">
      <UiCardHeader class="items-center pb-0">
        <UiCardTitle>Performance Score</UiCardTitle>
        <UiCardDescription>Overall system health</UiCardDescription>
      </UiCardHeader>
      <UiCardContent class="h-[300px]">
        <UiApexchart type="gauge" :series :options />
      </UiCardContent>
      <UiCardFooter class="flex-col gap-2 text-sm">
        <div class="flex items-center gap-2 leading-none font-medium">
          Performing well this month <Icon name="lucide:trending-up" class="size-4" />
        </div>
        <div class="text-muted-foreground leading-none">Based on the last 30 days of metrics</div>
      </UiCardFooter>
    </UiCard>
  </div>
</template>

<script lang="ts" setup>
  import type { ApexOptions } from "apexcharts";

  const series = ref<ApexOptions["series"]>([72]);

  const options = ref<ApexOptions>({
    labels: ["Score"],
    colors: ["var(--color-primary)"],
    plotOptions: {
      radialBar: {
        startAngle: -125,
        endAngle: 125,
        dataLabels: {
          name: {
            show: true,
            fontSize: "14px",
            fontWeight: "600",
            color: "var(--color-muted-foreground)",
            offsetY: 30,
          },
          value: {
            fontSize: "40px",
            fontWeight: "bold",
            color: "var(--color-primary)",
            offsetY: -5,
          },
        },
        hollow: { size: "70%", background: "transparent" },
      },
    },
    states: { hover: { filter: { type: "lighten" } } },
  });
</script>
```

<!-- /automd -->

::

### Gauge Chart - Color Bands

::prose-show-case

:DocsApexChartsGuage2

#code

<!-- automd:file src="../../app/components/content/Docs/ApexCharts/Guage/DocsApexChartsGuage2.vue" code lang="vue" -->

```vue [DocsApexChartsGuage2.vue]
<template>
  <div>
    <UiCard class="flex flex-col">
      <UiCardHeader class="items-center pb-0">
        <UiCardTitle>Risk Level</UiCardTitle>
        <UiCardDescription>Portfolio risk assessment</UiCardDescription>
      </UiCardHeader>
      <UiCardContent class="h-[300px]">
        <UiApexchart type="gauge" :series :options />
      </UiCardContent>
      <UiCardFooter class="flex-col gap-2 text-sm">
        <div class="flex items-center gap-2 leading-none font-medium">
          Moderate risk detected <Icon name="lucide:shield-alert" class="size-4" />
        </div>
        <div class="text-muted-foreground leading-none">Review your portfolio allocations</div>
      </UiCardFooter>
    </UiCard>
  </div>
</template>

<script lang="ts" setup>
  import type { ApexOptions } from "apexcharts";

  const series = ref<ApexOptions["series"]>([55]);

  const options = ref<ApexOptions>({
    labels: ["Risk"],
    colors: [
      typeof series.value?.[0] === "number" && series.value[0] > 66
        ? "var(--color-red-500)"
        : typeof series.value?.[0] === "number" && series.value[0] > 33
          ? "var(--color-yellow-500)"
          : "var(--color-emerald-500)",
    ],
    plotOptions: {
      radialBar: {
        bands: [
          { from: 0, to: 33, color: "var(--color-emerald-500)", label: "Low" },
          { from: 33, to: 66, color: "var(--color-yellow-500)", label: "Medium" },
          { from: 66, to: 100, color: "var(--color-red-500)", label: "High" },
        ],
        bandsStyle: { strokeWidth: "40%", gap: 2, hideTrackWhenPresent: true, linecap: "round" },
        dataLabels: {
          name: {
            show: true,
            fontSize: "14px",
            fontWeight: "600",
            color: "var(--color-muted-foreground)",
            offsetY: 35,
          },
          value: {
            fontSize: "40px",
            fontWeight: "bold",
            offsetY: -5,
            formatter(val) {
              return val + "%";
            },
          },
        },
        hollow: { size: "60%" },
      },
    },
    states: { hover: { filter: { type: "none" } } },
  });
</script>
```

<!-- /automd -->

::

### Gauge Chart - Needle

::prose-show-case

:DocsApexChartsGuage3

#code

<!-- automd:file src="../../app/components/content/Docs/ApexCharts/Guage/DocsApexChartsGuage3.vue" code lang="vue" -->

```vue [DocsApexChartsGuage3.vue]
<template>
  <div>
    <UiCard class="flex flex-col">
      <UiCardHeader class="items-center pb-0">
        <UiCardTitle>CPU Usage</UiCardTitle>
        <UiCardDescription>Current processor load</UiCardDescription>
      </UiCardHeader>
      <UiCardContent class="h-[300px]">
        <UiApexchart type="gauge" :series :options />
      </UiCardContent>
      <UiCardFooter class="flex-col gap-2 text-sm">
        <div class="flex items-center gap-2 leading-none font-medium">
          Usage is within
          <span
            class="font-semibold"
            :class="[
              getStateRangeText === 'high'
                ? 'text-red-500'
                : getStateRangeText === 'elevated'
                  ? 'text-yellow-500'
                  : 'text-emerald-500',
            ]"
            >{{ getStateRangeText }}</span
          >range <Icon name="lucide:cpu" class="size-4" />
        </div>
        <div class="text-muted-foreground leading-none">
          Monitor for spikes during intensive tasks
        </div>
      </UiCardFooter>
    </UiCard>
  </div>
</template>

<script lang="ts" setup>
  import type { ApexOptions } from "apexcharts";

  const series = ref<ApexOptions["series"]>([68]);

  const getColor = () => {
    const value = series.value?.[0];
    if (typeof value === "number") {
      if (value > 80) return "var(--color-red-500)";
      if (value > 50) return "var(--color-yellow-500)";
    }
    return "var(--color-emerald-500)";
  };

  const getStateRangeText = computed(() => {
    const value = series.value?.[0];
    if (typeof value === "number") {
      if (value > 80) return "high";
      if (value > 50) return "elevated";
    }
    return "normal";
  });

  const options = computed<ApexOptions>(() => {
    const color = getColor();
    return {
      labels: ["CPU"],
      colors: [color],
      plotOptions: {
        radialBar: {
          min: 0,
          max: 100,
          shape: "needle",
          bands: [
            { from: 0, to: 50, color: "var(--color-emerald-500)", label: "Normal" },
            { from: 50, to: 80, color: "var(--color-yellow-500)", label: "Elevated" },
            { from: 80, to: 100, color: "var(--color-red-500)", label: "High" },
          ],
          bandsStyle: { strokeWidth: "40%", gap: 2, hideTrackWhenPresent: true, linecap: "round" },
          needle: {
            showValueArc: true,
            color: "var(--color-foreground)",
            length: "70%",
            baseWidth: 8,
            tipWidth: 1,
            animation: { enabled: true, duration: 800, easing: "ease-out" },
          },
          track: { background: "var(--color-muted)", strokeWidth: "100%", margin: 5 },
          dataLabels: {
            name: {
              show: true,
              fontSize: "14px",
              fontWeight: "600",
              color: "var(--color-muted-foreground)",
              offsetY: 65,
            },
            value: {
              fontSize: "40px",
              fontWeight: "bold",
              color,
              offsetY: 30,
            },
          },
          hollow: { size: "60%" },
        },
      },
      states: { hover: { filter: { type: "none" } } },
    };
  });

  let interval: ReturnType<typeof setInterval>;

  onMounted(() => {
    interval = setInterval(() => {
      series.value = [Math.floor(Math.random() * 101)];
    }, 5000);
  });
  onUnmounted(() => {
    clearInterval(interval);
  });
</script>
```

<!-- /automd -->

::

### Gauge Chart - Semi Circle

::prose-show-case

:DocsApexChartsGuage4

#code

<!-- automd:file src="../../app/components/content/Docs/ApexCharts/Guage/DocsApexChartsGuage4.vue" code lang="vue" -->

```vue [DocsApexChartsGuage4.vue]
<template>
  <div>
    <UiCard class="flex flex-col">
      <UiCardHeader class="items-center pb-0">
        <UiCardTitle>Storage Usage</UiCardTitle>
        <UiCardDescription>Disk capacity overview</UiCardDescription>
      </UiCardHeader>
      <UiCardContent class="h-[260px]">
        <UiApexchart type="gauge" :series :options />
      </UiCardContent>
      <UiCardFooter class="flex-col gap-2 text-sm">
        <div class="flex items-center gap-2 leading-none font-medium">
          Consider expanding storage soon <Icon name="lucide:hard-drive" class="size-4" />
        </div>
        <div class="text-muted-foreground leading-none">237 GB of 512 GB used</div>
      </UiCardFooter>
    </UiCard>
  </div>
</template>

<script lang="ts" setup>
  import type { ApexOptions } from "apexcharts";

  const series = ref<ApexOptions["series"]>([46]);

  const options = ref<ApexOptions>({
    labels: ["Used"],
    colors: ["var(--color-primary)"],
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        dataLabels: {
          name: {
            show: true,
            fontSize: "14px",
            fontWeight: "600",
            color: "var(--color-muted-foreground)",
            offsetY: 0,
          },
          value: {
            fontSize: "36px",
            fontWeight: "bold",
            color: "var(--color-primary)",
            offsetY: -40,
          },
        },
        hollow: { size: "65%" },
      },
    },
    states: { hover: { filter: { type: "none" } } },
  });
</script>
```

<!-- /automd -->

::
