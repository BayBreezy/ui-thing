<template>
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>Revenue Before and After Campaign</UiCardTitle>
      <UiCardDescription> {{ dayjs().format("MMMM DD YYYY") }}</UiCardDescription>
    </UiCardHeader>
    <UiCardContent class="h-[320px]">
      <UiApexchart type="line" :series :options />
    </UiCardContent>
    <UiCardFooter>
      <div class="flex w-full items-start gap-2 text-sm">
        <div class="grid gap-2">
          <div class="flex items-center gap-2 leading-none font-medium">
            Want to learn more about slope charts?
          </div>
          <div class="text-muted-foreground flex items-center gap-2 leading-none">
            <span>Check out</span>
            <NuxtLink
              target="_blank"
              href="https://apexcharts.com/vue-chart-demos/slope-charts/basic/"
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
  import { faker } from "@faker-js/faker";
  import type { ApexOptions } from "apexcharts";
  import dayjs from "dayjs";

  const series = ref<ApexOptions["series"]>([
    {
      name: faker.commerce.product(),
      data: Array.from({ length: 2 }, (_, i) => ({
        x: i === 0 ? "Before Campaign" : "After Campaign",
        y: faker.number.int({ min: 10, max: 100 }),
      })),
    },
    {
      name: faker.commerce.product(),
      data: Array.from({ length: 2 }, (_, i) => ({
        x: i === 0 ? "Before Campaign" : "After Campaign",
        y: faker.number.int({ min: 10, max: 100 }),
      })),
    },
    {
      name: faker.commerce.product(),
      data: Array.from({ length: 2 }, (_, i) => ({
        x: i === 0 ? "Before Campaign" : "After Campaign",
        y: faker.number.int({ min: 10, max: 100 }),
      })),
    },
  ]);

  const options = ref<ApexOptions>({
    plotOptions: {
      line: { isSlopeChart: true },
    },
  });
</script>
