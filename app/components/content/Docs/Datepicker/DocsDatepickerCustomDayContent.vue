<template>
  <div class="flex w-full items-center justify-center">
    <UiDatepicker v-model="today" is-required :min-date="new Date()">
      <template #day-content="{ day, dayEvents, dayProps }">
        <div :class="[day.classes]" v-bind="dayProps" v-on="dayEvents">
          <div class="flex flex-col items-center justify-center gap-0.5 text-xs">
            <span class="font-medium">{{ day.label }} </span>
            <span
              class="text-[10px]"
              :class="[!faker.datatype.boolean(0.2) ? 'opacity-70' : 'text-green-500']"
              >{{ faker.commerce.price({ min: 80, max: 250, symbol: "$", dec: 0 }) }}</span
            >
          </div>
        </div>
      </template>
    </UiDatepicker>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import dayjs from "dayjs";

  const today = ref(dayjs().add(3, "days").toDate());
</script>

<style scoped>
  :deep(.vc-day) {
    width: 50px;
    height: 50px;
    .vc-day-content,
    .vc-highlight,
    .vc-highlights {
      width: 100%;
      height: 100%;
    }
  }
</style>
