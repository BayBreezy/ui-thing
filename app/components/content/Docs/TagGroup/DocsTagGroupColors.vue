<template>
  <UiTagGroup aria-label="Colors" class="mx-auto max-w-2xl justify-center">
    <UiTagGroupItem v-for="c in badgeColors" :key="c" :value="c" :color="c" dot>
      {{ c }}
    </UiTagGroupItem>
  </UiTagGroup>
</template>

<script lang="ts" setup>
  import { badgeColors } from "~/utils/badge-colors";
</script>
