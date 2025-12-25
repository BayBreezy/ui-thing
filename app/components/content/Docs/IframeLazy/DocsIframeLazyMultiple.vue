<template>
  <div class="space-y-6">
    <p class="text-sm text-muted-foreground">
      Each iframe loads independently when scrolled into view. Scrolling is disabled within the
      iframes.
    </p>

    <div v-for="(site, index) in sites" :key="index" class="space-y-2">
      <div class="flex items-center gap-2">
        <UiBadge variant="outline">{{ site.name }}</UiBadge>
      </div>
      <div class="h-[350px] w-full rounded-lg border">
        <UiIframeLazy disable-scroll :src="site.url" iframe-class="rounded-lg">
          <template #placeholder>
            <div class="flex size-full items-center justify-center bg-muted/50">
              <div class="flex flex-col items-center gap-2">
                <Icon :name="site.icon" class="size-8 text-muted-foreground" />
                <p class="text-sm text-muted-foreground">Loading {{ site.name }}...</p>
              </div>
            </div>
          </template>
        </UiIframeLazy>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const sites = [
    {
      name: "Nuxt UI",
      url: "https://ui.nuxt.com",
      icon: "simple-icons:nuxtdotjs",
    },
    {
      name: "Origin UI",
      url: "https://originui.com",
      icon: "lucide:layout-template",
    },
    {
      name: "Reka UI",
      url: "https://reka-ui.com",
      icon: "lucide:layers",
    },
  ];
</script>
