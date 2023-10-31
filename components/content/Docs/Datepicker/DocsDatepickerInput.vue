<template>
  <div class="flex w-full items-center justify-center">
    <UIDatepicker v-model="date">
      <template #default="{ inputValue, inputEvents }">
        <UIInput placeholder="DD/MM/YYYY" :value="inputValue" v-on="inputEvents" />
      </template>
    </UIDatepicker>
  </div>
</template>

<script lang="ts" setup>
  const date = ref();
</script>
