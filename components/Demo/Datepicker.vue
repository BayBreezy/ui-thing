<template>
  <div>
    <Heading title="Datepicker" subtext="A date picker component." />

    <div class="flex flex-wrap gap-5">
      <UIDatepicker v-model="today" mode="dateTime" title-position="right" />
      <UIDatepicker show-weeknumbers>
        <template #header-title="{ title }">
          <div class="flex items-center gap-2">
            <p>{{ title }}</p>
            <Icon class="h-4 w-4 text-muted-foreground" name="lucide:chevron-down" />
          </div>
        </template>
      </UIDatepicker>

      <VDatePicker v-model="date">
        <template #default="{ togglePopover }">
          <UIButton
            variant="outline"
            :class="[!date && 'text-muted-foreground', 'w-[260px] justify-start text-left']"
            @click="togglePopover"
          >
            <Icon name="lucide:calendar" class="h-4 w-4" />
            {{ date ? format(date, "MMMM dd, yyyy") : "Select a date" }}
          </UIButton>
        </template>
      </VDatePicker>

      <VDatePicker v-model="date">
        <template #default="{ inputValue, inputEvents }">
          <UIInput placeholder="DD/MM/YYYY" :value="inputValue" v-on="inputEvents" />
        </template>
      </VDatePicker>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { addDays, format } from "date-fns";

  const today = addDays(new Date(), 3);

  const date = ref();
</script>
