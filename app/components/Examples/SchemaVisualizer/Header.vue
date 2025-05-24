<template>
  <header class="fixed top-16 z-50 w-full px-2 md:px-5">
    <div
      class="flex h-14 items-center justify-between gap-2 rounded-xl border border-border/80 bg-card/80 px-4 shadow-lg backdrop-blur-md md:h-16"
    >
      <div class="flex flex-1 items-center">
        <NuxtLink class="inline-flex" href="#">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="29"
            height="32"
            aria-label="Schema Visualizer"
          >
            <path
              fill="currentColor"
              d="M0 12v12.8h4.028a3.242 3.242 0 0 1 2.278.937A3.199 3.199 0 0 1 7.25 28v4h9.667L29 20V7.2h-4.028a3.242 3.242 0 0 1-2.278-.937A3.2 3.2 0 0 1 21.75 4V0h-9.667L0 12Zm13.694 12H8.056v-8.8l7.25-7.2h5.638v8.8l-7.25 7.2Z"
            />
          </svg>
        </NuxtLink>
      </div>
      <div class="hidden grow justify-center sm:flex">
        <ExamplesSchemaVisualizerTemplateSwitcher />
      </div>
      <!-- Right area -->
      <div class="flex flex-1 items-center justify-end gap-4">
        <ExamplesSchemaVisualizerParticipants />
        <UiButton
          @click="handleShare()"
          v-tippy.bottom="'Share with someone new'"
          size="sm"
          class="rounded-lg text-sm"
        >
          Share
        </UiButton>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
  const { share, isSupported } = useShare();

  const handleShare = () => {
    if (!isSupported.value) return;
    share({
      title: "Schema Visualizer",
      text: "Check out this schema visualizer I found on UI Thing!",
      url: location.href,
    });
  };
</script>
