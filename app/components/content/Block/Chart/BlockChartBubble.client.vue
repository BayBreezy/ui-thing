<template>
  <div class="h-[550px] w-full">
    <apexchart width="100%" height="100%" type="bubble" :options="options" :series="series" />
  </div>
</template>

<script lang="ts" setup>
  import { _border, _gray, _muted, _violet } from "#tailwind-config/theme/colors";
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
      color: _violet["400"], // Example color
    },
    {
      name: "Series 2",
      data: generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
        min: 10,
        max: 60,
      }),
      color: _violet["700"], // Example color
    },
    {
      name: "Series 3",
      data: generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
        min: 10,
        max: 60,
      }),
      color: _violet["900"], // Example color
    },
  ];

  const options: ApexOptions = {
    legend: {
      fontFamily: "inherit",
      fontWeight: 500,
      offsetY: 5,
      labels: {
        colors: _muted.foreground,
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "gradient",
    },
    grid: {
      borderColor: _border,
    },
    chart: {
      toolbar: {
        show: window.innerWidth > 768,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: _muted.foreground,
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
          color: _muted.foreground,
        },
      },
      labels: {
        style: {
          colors: _muted.foreground,
          fontFamily: "inherit",
        },
      },
      axisBorder: {
        show: true,
        color: _border,
      },
      axisTicks: {
        show: true,
        color: _border,
      },
    },
  };
</script>

<style>
  .apexcharts-menu {
    @apply border-border bg-background text-foreground;
    .apexcharts-menu-item {
      @apply hover:!bg-primary hover:!text-primary-foreground;
    }
  }

  .apexcharts-tooltip {
    background: theme("colors.background") !important;
    color: theme("colors.foreground") !important;
    border: 1px solid theme("colors.border") !important;
    box-shadow: theme("boxShadow.DEFAULT") !important;

    .apexcharts-tooltip-title {
      color: theme("colors.foreground") !important;
      background-color: theme("colors.muted.DEFAULT") !important;
      font-family: theme("fontFamily.sans") !important;
      border-bottom: 1px solid theme("colors.border") !important;
    }
  }
</style>
