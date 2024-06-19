<template>
  <div class="flex items-center justify-center">
    <div
      v-wave="{
        color: 'no-repeat url(/icon.png) 0 0 / cover',
        initialOpacity: 0.7,
        duration: 1,
      }"
      class="flex size-[250px] cursor-pointer items-center justify-center rounded-md border shadow-sm"
    />
  </div>
</template>
