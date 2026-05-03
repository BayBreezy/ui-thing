<template>
  <div>
    <UiCard class="flex flex-col">
      <UiCardHeader class="items-center pb-0">
        <UiCardTitle>Radar Chart</UiCardTitle>
        <UiCardDescription>Showing total visitors for the last 6 months</UiCardDescription>
      </UiCardHeader>
      <UiCardContent class="h-[350px]">
        <UiApexchart type="radar" :series :options />
      </UiCardContent>
      <UiCardFooter class="flex-col gap-2 text-sm">
        <div class="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <Icon name="lucide:trending-up" class="size-4" />
        </div>
        <div class="text-muted-foreground leading-none">January - June 2024</div>
      </UiCardFooter>
    </UiCard>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { ApexOptions } from "apexcharts";
  import dayjs from "dayjs";

  const series = ref<ApexOptions["series"]>([
    {
      name: "Visitors",
      data: Array.from({ length: 6 }, (_, i) => ({
        x: dayjs()
          .subtract(5 - i, "month")
          .format("MMMM"),
        y: faker.number.int({ min: 2000, max: 5000 }),
      })),
    },
  ]);

  const options = ref<ApexOptions>({
    fill: { opacity: 0.6 },
    stroke: { width: 0 },
    yaxis: { show: false },
  });
</script>
