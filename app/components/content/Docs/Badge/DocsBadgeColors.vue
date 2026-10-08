<template>
  <div class="mx-auto flex max-w-2xl flex-wrap justify-center gap-2">
    <UiBadge v-for="c in badgeColors" :key="c" variant="soft" :color="c" size="md" dot>
      {{ c }}
    </UiBadge>
  </div>
</template>

<script lang="ts" setup>
  import { badgeColors } from "~/utils/badge-colors";
</script>
