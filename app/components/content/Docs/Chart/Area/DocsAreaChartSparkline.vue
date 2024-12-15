<template>
  <div class="flex items-center justify-center">
    <UiChartArea
      class="h-[100px] w-[400px]"
      index="name"
      :data="data"
      :categories="['Total']"
      :show-grid-line="false"
      :show-legend="false"
      :show-x-axis="false"
      :show-y-axis="false"
      :curve-type="CurveType.Linear"
    />
  </div>
</template>

<script setup lang="ts">
  import { faker } from "@faker-js/faker";
  import { CurveType } from "@unovis/ts";
  import dayjs from "dayjs";

  const { data } = await useAsyncData(
    async () => {
      return Array.from({ length: 12 }, (_, i) => {
        const month = dayjs().month(i).format("MMM");
        return {
          name: month,
          Total: faker.number.float({ min: 500, max: 2500, fractionDigits: 2 }),
        };
      });
    },
    { default: () => [] }
  );
</script>
