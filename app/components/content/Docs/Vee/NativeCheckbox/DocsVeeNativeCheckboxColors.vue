<template>
  <div class="flex flex-wrap justify-center gap-3">
    <UiVeeNativeCheckbox v-for="color in badgeColors" :key="color" :color="color" indeterminate />
  </div>
</template>

<script lang="ts" setup>
  import { badgeColors } from "~/utils/badge-colors";
</script>
