<template>
  <div class="text-center">
    <div class="inline-flex items-center" role="group" aria-labelledby="volume-control">
      <span id="volume-control" class="sr-only"> Volume Control </span>
      <UiButton
        class="rounded-full"
        variant="outline"
        size="icon"
        aria-label="Decrease volume"
        :disabled="volume === 0"
        @click="decreaseVolume"
      >
        <Icon name="lucide:minus" size="16" aria-hidden="true" />
      </UiButton>
      <div class="flex items-center px-3 text-sm font-medium tabular-nums" aria-live="polite">
        <Icon :name="VolumeIcon" size="16" aria-hidden="true" />
        <span class="ms-2" :aria-label="`Current volume is ${volume}`">
          {{ volume }}
        </span>
      </div>
      <UiButton
        class="rounded-full"
        variant="outline"
        size="icon"
        aria-label="Increase volume"
        :disabled="volume === 6"
        @click="increaseVolume"
      >
        <Icon name="lucide:plus" size="16" aria-hidden="true" />
      </UiButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const volume = ref(3);
  const decreaseVolume = () => {
    if (volume.value === 0) return;
    volume.value--;
  };
  const increaseVolume = () => {
    if (volume.value === 6) return;
    volume.value++;
  };

  const VolumeIcon = computed(() =>
    volume.value === 0
      ? "lucide:volume-x"
      : volume.value < 3
        ? "lucide:volume"
        : volume.value < 5
          ? "lucide:volume-1"
          : "lucide:volume-2"
  );
</script>
