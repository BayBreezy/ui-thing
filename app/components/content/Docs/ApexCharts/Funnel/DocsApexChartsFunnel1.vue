<template>
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>Sales Funnel</UiCardTitle>
      <UiCardDescription>
        {{ dayjs().subtract(1, "month").format("MMMM YYYY") }} -
        {{ dayjs().format("MMMM YYYY") }}</UiCardDescription
      >
    </UiCardHeader>
    <UiCardContent class="h-[320px]">
      <UiApexchart type="bar" :series :options />
    </UiCardContent>
    <UiCardFooter>
      <div class="flex w-full items-start gap-2 text-sm">
        <div class="grid gap-2">
          <div class="flex items-center gap-2 leading-none font-medium">
            Looking for a way to improve your sales funnel?
          </div>
          <div class="flex items-center gap-2 leading-none text-muted-foreground">
            <span>Check out our</span>
            <NuxtLink
              target="_blank"
              href="https://apexcharts.com/vue-chart-demos/funnel-charts/funnel/"
              class="text-primary hover:underline"
            >
              ApexCharts documentation
            </NuxtLink>
            <span>for more examples and tips.</span>
          </div>
        </div>
      </div>
    </UiCardFooter>
  </UiCard>
</template>

<script lang="ts" setup>
  import type { ApexOptions } from "apexcharts";
  import dayjs from "dayjs";

  const series = ref<ApexOptions["series"]>([
    {
      name: "Leads",
      data: [
        { x: "Lead", y: 9500 },
        { x: "Email Campaign", y: 6500 },
        { x: "Website Visit", y: 4390 },
        { x: "Contact Form", y: 2390 },
        { x: "Quoted", y: 978 },
        { x: "Deal Closed", y: 540 },
        { x: "Repeat Customer", y: 120 },
      ],
    },
  ]);

  const options = ref<ApexOptions>({
    states: { hover: { filter: { type: "none" } } },
    plotOptions: {
      bar: {
        borderRadius: 0,
        horizontal: true,
        barHeight: "80%",
        isFunnel: true,
      },
    },
    theme: {
      monochrome: { enabled: true, color: "#4F46E5", shadeTo: "light", shadeIntensity: 0.6 },
    },
    dataLabels: {
      enabled: true,
      formatter(val, opts) {
        console.log(val, opts);
        if (Number(val) > 2250) return `${val} (${Math.round((Number(val) / 9500) * 100)}%)`;
        return "";
      },
    },
  });
</script>
