<template>
  <div class="h-[550px] w-full">
    <apexchart width="100%" height="100%" type="line" :options="options" :series="series" />
  </div>
</template>

<script lang="ts" setup>
  import type { ApexOptions } from "apexcharts";

  const series: ApexOptions["series"] = [
    {
      name: "Series 1",
      data: [500, 1200, 250, 750, 900, 1800, 350, 650, 2100, 300, 800, 1600],
      color: "var(--color-violet-400)", // Example color
    },
    {
      name: "Series 2",
      data: [50, 25, 70, 10, 2000, 100, 5, 150, 180, 3000, 120, 800],
      color: "var(--color-violet-700)", // Example color
    },
    {
      name: "Series 3",
      data: [3000, 150, 2500, 50, 800, 200, 400, 1000, 1200, 10, 5000, 300],
      color: "var(--color-violet-900)", // Example color
    },
  ];

  const options: ApexOptions = {
    stroke: {
      width: 3,
      curve: "smooth",
      lineCap: "round",
    },
    legend: {
      fontFamily: "inherit",
      fontWeight: 500,
      offsetY: 5,
      labels: {
        colors: "var(--color-muted-foreground)",
      },
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
      title: {
        text: window.innerWidth > 768 ? "Active users" : "",
        offsetX: 5,
        style: {
          fontWeight: 600,
          fontSize: "13px",
          color: "var(--color-muted-foreground)",
          fontFamily: "inherit",
        },
      },
      labels: {
        style: {
          colors: "var(--color-muted-foreground)",
          fontFamily: "inherit",
        },
      },
    },
    xaxis: {
      title: {
        text: window.innerWidth > 768 ? "Months" : "",
        offsetY: -2,
        style: {
          fontWeight: 600,
          fontSize: "13px",
          color: "var(--color-muted-foreground)",
          fontFamily: "inherit",
        },
      },
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
