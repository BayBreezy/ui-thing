<template>
  <UiChartDonut index="name" :category="'Total'" :data="data" />
</template>

<script setup lang="ts">
  import { faker } from "@faker-js/faker";
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
