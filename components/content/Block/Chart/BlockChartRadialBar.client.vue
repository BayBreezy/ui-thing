<template>
  <div class="h-[550px] w-full">
    <apexchart width="100%" height="100%" type="radialBar" :options="options" :series="series" />
  </div>
</template>

<script lang="ts" setup>
  import { _muted, _violet } from "#tailwind-config/theme/colors";
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
            color: _muted.foreground,
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
        colors: _muted.foreground,
      },
    },
    stroke: {
      lineCap: "round",
    },
    colors: [_violet["400"], _violet["700"], _violet["900"]],
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
    @apply border-border bg-background text-foreground;
    .apexcharts-menu-item {
      @apply hover:!bg-primary hover:!text-primary-foreground;
    }
  }
</style>
