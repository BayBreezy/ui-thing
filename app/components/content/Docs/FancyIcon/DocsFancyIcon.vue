<template>
  <div class="flex items-center justify-center gap-3">
    <UiFancyIcon theme="light" color="primary" :icon />
    <UiFancyIcon theme="gradient" color="primary" :icon />
    <UiFancyIcon theme="dark" color="primary" :icon />
    <UiFancyIcon theme="modern" color="gray" :icon />
    <UiFancyIcon theme="modern-neue" color="gray" :icon />
    <UiFancyIcon theme="outline" color="primary" :icon />
  </div>
</template>
<script lang="ts" setup>
  const icon = "lucide:circle-check";
</script>
