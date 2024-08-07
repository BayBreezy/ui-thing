<template>
  <div class="h-[550px] w-full">
    <apexchart width="100%" height="100%" type="radar" :options="options" :series="series" />
  </div>
</template>

<script lang="ts" setup>
  import { _border, _muted, _violet } from "#tailwind-config/theme/colors";
  import type { ApexOptions } from "apexcharts";

  const series: ApexOptions["series"] = [
    {
      name: "Series 2",
      data: [50, 25, 70, 10, 20, 100, 5, 150, 180, 300, 120, 200],
      color: _violet["700"], // Example color
    },
    {
      name: "Series 3",
      data: [300, 150, 250, 50, 80, 200, 400, 100, 120, 10, 500, 300],
      color: _violet["900"], // Example color
    },
  ];

  const options: ApexOptions = {
    plotOptions: {
      radar: {
        polygons: {
          connectorColors: _border,
          strokeColors: _border,
        },
      },
    },
    legend: {
      fontFamily: "inherit",
      fontWeight: 500,
      offsetY: 5,
      labels: {
        colors: _muted.foreground,
      },
    },
    stroke: { show: false },
    markers: {
      strokeWidth: 1,
      strokeColors: [_border],
    },
    chart: {
      toolbar: {
        show: window.innerWidth > 768,
      },
    },
    tooltip: {
      intersect: false,
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
          colors: _muted.foreground,
          fontFamily: "inherit",
        },
      },
    },
    xaxis: {
      labels: {
        style: {
          colors: _muted.foreground,
          fontFamily: "inherit",
        },
      },
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
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
