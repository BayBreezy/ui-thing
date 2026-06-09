<template>
  <div class="flex flex-col items-center gap-5">
    <UiCircularProgress
      :current-step="currentStep"
      :total-steps="totalSteps"
      size="xl"
      show-value
    />
    <p class="text-muted-foreground text-sm">Step {{ currentStep }} of {{ totalSteps }}</p>
    <div class="flex items-center gap-2">
      <UiButton size="sm" variant="outline" :disabled="currentStep <= 1" @click="currentStep--">
        Previous
      </UiButton>
      <UiButton
        size="sm"
        variant="outline"
        :disabled="currentStep >= totalSteps"
        @click="currentStep++"
      >
        Next
      </UiButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const currentStep = ref(2);
  const totalSteps = ref(5);
</script>
