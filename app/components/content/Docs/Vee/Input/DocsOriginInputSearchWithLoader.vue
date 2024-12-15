<template>
  <div class="flex items-center justify-center">
    <UiVeeInput
      v-model.trim="search"
      label="Search input with loader"
      class="peer pe-9"
      placeholder="Search..."
      type="search"
      :icon="!loading ? 'lucide:search' : 'svg-spinners:6-dots-rotate'"
    >
      <template #trailingIcon>
        <button
          type="button"
          aria-label="Start/Stop recording"
          class="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md border border-transparent text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          @click="useSonner.success('Recording started!')"
        >
          <Icon name="lucide:mic" class="size-4" />
        </button>
      </template>
    </UiVeeInput>
  </div>
</template>

<script lang="ts" setup>
  const search = ref("");
  const dSearch = refDebounced(search, 300);
  const loading = ref(false);

  const fakeApiCall = async () => {
    loading.value = true;
    await new Promise((resolve) => setTimeout(resolve, 2000));
    loading.value = false;
  };

  watch(dSearch, () => {
    fakeApiCall();
  });
</script>
