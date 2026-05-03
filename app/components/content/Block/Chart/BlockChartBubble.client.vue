<template>
  <div class="h-[550px] w-full">
    <apexchart width="100%" height="100%" type="bubble" :options="options" :series="series" />
  </div>
</template>

<script lang="ts" setup>
  import type { ApexOptions } from "apexcharts";

  function generateData(baseval: number, count: number, yrange: { min: number; max: number }) {
    let i = 0;
    const series = [];
    while (i < count) {
      const x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
      const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
      const z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

      series.push([x, y, z]);
      baseval += 86400000;
      i++;
    }
    return series;
  }
  const series: ApexOptions["series"] = [
    {
      name: "Series 1",
      data: generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
        min: 10,
        max: 60,
      }),
      color: "var(--color-violet-400)", // Example color
    },
    {
      name: "Series 2",
      data: generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
        min: 10,
        max: 60,
      }),
      color: "var(--color-violet-700)", // Example color
    },
    {
      name: "Series 3",
      data: generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
        min: 10,
        max: 60,
      }),
      color: "var(--color-violet-900)", // Example color
    },
  ];

  const options: ApexOptions = {
    legend: {
      fontFamily: "inherit",
      fontWeight: 500,
      offsetY: 5,
      labels: {
        colors: "var(--color-muted-foreground)",
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "gradient",
    },
    grid: {
      borderColor: "var(--color-border)",
    },
    chart: {
      toolbar: {
        show: window.innerWidth > 768,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "var(--color-muted-foreground)",
          fontFamily: "inherit",
        },
      },
    },
    markers: {
      strokeWidth: 0,
    },
    xaxis: {
      title: {
        style: {
          fontWeight: 600,
          fontFamily: "inherit",
          color: "var(--color-muted-foreground)",
        },
      },
      labels: {
        style: {
          colors: "var(--color-muted-foreground)",
          fontFamily: "inherit",
        },
      },
      axisBorder: {
        show: true,
        color: "var(--color-border)",
      },
      axisTicks: {
        show: true,
        color: "var(--color-border)",
      },
    },
  };
</script>

<style>
  .apexcharts-menu {
    border-color: var(--color-border);
    background-color: var(--color-background);
    color: var(--color-foreground);

    .apexcharts-menu-item {
      &:hover {
        background-color: var(--color-primary) !important;
        color: var(--color-primary-foreground) !important;
      }
    }
  }

  .apexcharts-tooltip {
    background: var(--color-background) !important;
    color: var(--color-foreground) !important;
    border: 1px solid var(--color-border) !important;
    box-shadow: var(--shadow) !important;

    .apexcharts-tooltip-title {
      color: var(--color-foreground) !important;
      background-color: var(--color-muted) !important;
      font-family: var(--font-sans) !important;
      border-bottom: 1px solid var(--color-border) !important;
    }
  }
</style>
