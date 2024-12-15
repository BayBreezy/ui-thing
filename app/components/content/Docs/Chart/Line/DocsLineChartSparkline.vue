<template>
  <div class="flex items-center justify-center">
    <UiChartLine
      index="year"
      class="h-[100px] w-[400px]"
      :data="data"
      :categories="['Export Growth Rate']"
      :y-formatter="
        (tick, i) => {
          return typeof tick === 'number'
            ? `$ ${new Intl.NumberFormat('us').format(tick).toString()}`
            : '';
        }
      "
      :show-tooltip="false"
      :show-grid-line="false"
      :show-legend="false"
      :show-x-axis="false"
      :show-y-axis="false"
    />
  </div>
</template>

<script setup lang="ts">
  import { faker } from "@faker-js/faker";
  import dayjs from "dayjs";

  const { data } = await useAsyncData(
    async () => {
      return Array.from({ length: 40 }, (_, i) => {
        const year = dayjs().subtract(i, "year").format("YYYY");
        return {
          year,
          "Export Growth Rate": faker.number.float({ min: 0.8, max: 2.5, fractionDigits: 2 }),
          "Import Growth Rate": faker.number.float({ min: 0.8, max: 2.5, fractionDigits: 2 }),
        };
      }).reverse();
    },
    { default: () => [] }
  );
</script>
