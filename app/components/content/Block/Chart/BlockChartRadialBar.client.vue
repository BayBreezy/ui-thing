<template>
  <div class="h-[550px] w-full">
    <apexchart width="100%" height="100%" type="radialBar" :options="options" :series="series" />
  </div>
</template>

<script lang="ts" setup>
  import type { ApexOptions } from "apexcharts";

  const series: ApexOptions["series"] = [70, 30, 60];

  const options: ApexOptions = {
    plotOptions: {
      radialBar: {
        track: {
          background: "rgba(var(--gray100),1)",
        },
        dataLabels: {
          name: {
            fontFamily: "inherit",
            fontWeight: 600,
            fontSize: "24px",
          },
          total: {
            show: true,
            label: "Total",
            fontFamily: "inherit",
            fontWeight: 600,
            fontSize: "24px",
            formatter(opts) {
              const total = opts.config?.series?.reduce((acc: number, cur: number) => acc + cur, 0);
              if (!total) return "0";
              return Number(total / opts.config?.series?.length).toFixed(2) + "%";
            },
          },
          value: {
            fontFamily: "inherit",
            fontSize: "16px",
            color: "var(--color-muted-foreground)",
            formatter(val) {
              return Number(val).toFixed(0) + "%";
            },
          },
        },
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
      lineCap: "round",
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
</style>
