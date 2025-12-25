<template>
  <div class="h-[550px] w-full">
    <apexchart width="100%" height="100%" type="radar" :options="options" :series="series" />
  </div>
</template>

<script lang="ts" setup>
  import type { ApexOptions } from "apexcharts";

  const series: ApexOptions["series"] = [
    {
      name: "Series 2",
      data: [50, 25, 70, 10, 20, 100, 5, 150, 180, 300, 120, 200],
      color: "var(--color-violet-700)", // Example color
    },
    {
      name: "Series 3",
      data: [300, 150, 250, 50, 80, 200, 400, 100, 120, 10, 500, 300],
      color: "var(--color-violet-900)", // Example color
    },
  ];

  const options: ApexOptions = {
    plotOptions: {
      radar: {
        polygons: {
          connectorColors: "var(--color-border)",
          strokeColors: "var(--color-border)",
        },
      },
    },
    legend: {
      fontFamily: "inherit",
      fontWeight: 500,
      offsetY: 5,
      labels: {
        colors: "var(--color-muted-foreground)",
      },
    },
    stroke: { show: false },
    markers: {
      strokeWidth: 1,
      strokeColors: ["var(--color-border)"],
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
          colors: "var(--color-muted-foreground)",
          fontFamily: "inherit",
        },
      },
    },
    xaxis: {
      labels: {
        style: {
          colors: "var(--color-muted-foreground)",
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
  @reference "~/assets/css/tailwind.css";

  .apexcharts-menu {
    @apply border-border bg-background text-foreground;
    .apexcharts-menu-item {
      @apply hover:bg-primary! hover:text-primary-foreground!;
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
