<template>
  <div class="flex w-full justify-center">
    <UiSelect default-value="standard">
      <UiSelectTrigger class="w-48">
        <UiSelectValue placeholder="Choose a plan" />
      </UiSelectTrigger>
      <UiSelectContent loop>
        <UiSelectItem v-slot="{ selected }" value="standard" text-value="Standard">
          <span :class="{ 'font-semibold': selected }">Standard</span>
        </UiSelectItem>
        <UiSelectItem v-slot="{ selected }" value="plus" text-value="Plus">
          <span :class="{ 'font-semibold': selected }">Plus</span>
        </UiSelectItem>
      </UiSelectContent>
    </UiSelect>
  </div>
</template>
