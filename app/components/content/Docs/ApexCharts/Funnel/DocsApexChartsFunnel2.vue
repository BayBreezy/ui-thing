<template>
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>Content Distribution</UiCardTitle>
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
            Want to learn more about funnel charts?
          </div>
          <div class="text-muted-foreground flex items-center gap-2 leading-none">
            <span>Check out</span>
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
      name: "Content Flow",
      data: [
        { x: "Original Posts", y: 30 },
        { x: "Shares by Influencers", y: 40 },
        { x: "Shares by Followers", y: 50 },
        { x: "Comments", y: 70 },
        { x: "Likes", y: 100 },
        { x: "Views", y: 200 },
      ],
    },
  ]);

  const options = ref<ApexOptions>({
    states: { hover: { filter: { type: "none" } } },
    plotOptions: {
      bar: {
        borderRadius: 0,
        horizontal: true,
        barHeight: "90%",
        isFunnel: true,
      },
    },
    colors: ["#FF4560"],
    legend: { show: true },
  });
</script>
