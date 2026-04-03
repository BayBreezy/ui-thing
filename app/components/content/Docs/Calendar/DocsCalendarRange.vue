<template>
  <div class="flex flex-wrap justify-center gap-5">
    <UiCalendar :attributes />
  </div>
</template>

<script lang="ts" setup>
  import dayjs from "dayjs";

  import type { AttributeConfig } from "~/components/Ui/Calendar.vue";

  const attributes = ref<AttributeConfig[]>([
    {
      highlight: true,
      dates: [[dayjs().toDate(), dayjs().add(1.5, "w").toDate()]],
    },
  ]);
</script>
