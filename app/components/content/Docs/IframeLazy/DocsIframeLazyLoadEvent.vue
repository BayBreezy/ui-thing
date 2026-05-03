<template>
  <div class="space-y-4">
    <div class="flex items-center gap-2">
      <UiBadge :variant="loaded ? 'default' : 'secondary'">
        {{ loaded ? "Loaded" : "Loading..." }}
      </UiBadge>
      <p class="text-muted-foreground text-sm">
        {{ loaded ? "Content is ready" : "Waiting for content" }}
      </p>
    </div>
    <div class="h-[400px] w-full overflow-hidden rounded-lg border">
      <UiIframeLazy
        src="https://ui.nuxt.com/getting-started"
        iframe-class="h-full w-full rounded-lg"
        @load="handleLoad"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  const loaded = ref(false);

  const handleLoad = (event: Event) => {
    loaded.value = true;
    console.log("Iframe loaded:", event);
  };
</script>
