<template>
  <div class="h-[550px] w-full">
    <UiApexchart width="100%" height="100%" type="donut" :options="options" :series="series" />
  </div>
</template>

<script lang="ts" setup>
  import type { ApexOptions } from "apexcharts";

  const series: ApexOptions["series"] = [70, 30, 60];

  const options: ApexOptions = {
    plotOptions: {
      pie: {
        dataLabels: {
          minAngleToShowLabel: 50,
        },
        donut: {
          labels: {},
          size: "50px",
        },
        expandOnClick: true,
      },
    },
    dataLabels: {
      style: {
        fontWeight: 400,
        fontFamily: "inherit",
      },
    },
    legend: {
      fontFamily: "inherit",
      fontWeight: 500,
      show: true,
      position: "bottom",
      labels: {
        colors: "var(--color-muted-foreground)",
      },
    },
    stroke: {
      colors: ["transparent"],
    },
    colors: ["var(--color-violet-400)", "var(--color-violet-700)", "var(--color-violet-900)"],
    chart: {
      toolbar: {
        show: window.innerWidth > 768,
      },
    },
    labels: ["Apples", "Oranges", "Bananas"],
  };
</script>
