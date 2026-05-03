<template>
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>Line Chart</UiCardTitle>
      <UiCardDescription>January - June 2024</UiCardDescription>
    </UiCardHeader>
    <UiCardContent class="aspect-auto h-[300px] w-full">
      <UiApexchart type="line" :series :options />
    </UiCardContent>
    <UiCardFooter>
      <div class="flex w-full items-start gap-2 text-sm">
        <div class="grid gap-2">
          <div class="flex items-center gap-2 leading-none font-medium">
            Trending up by 5.2% this month <Icon name="lucide:trending-up" class="inline size-4" />
          </div>
          <div class="text-muted-foreground flex items-center gap-2 leading-none">
            Showing total visitors for the last 6 months
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
      name: "Desktop",
      data: Array.from({ length: 6 }, (_, i) => ({
        x: dayjs()
          .subtract(5 - i, "month")
          .format("MMM"),
        y: faker.number.int({ min: 250, max: 260 }),
      })),
    },
  ]);

  const options = ref<ApexOptions>({
    yaxis: { labels: { show: false } },
    tooltip: { followCursor: true },
    stroke: { width: 2, curve: "smooth" },
  });
</script>
