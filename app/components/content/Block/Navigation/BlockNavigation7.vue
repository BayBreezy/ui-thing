<template>
  <!--
    Floating pill header that condenses as you scroll
    Features: Detached rounded bar with a blurred background, shrinks and gains a shadow after scrolling, theme toggle, sheet menu on small screens, includes a scrollable demo area
  -->
  <div class="relative h-[28rem] overflow-y-auto rounded-xl border" @scroll.passive="onScroll">
    <div class="sticky top-0 z-20 px-4 pt-4">
      <header
        class="bg-background/80 mx-auto flex items-center justify-between rounded-full border px-4 backdrop-blur-md transition-all duration-300"
        :class="condensed ? 'h-12 max-w-2xl shadow-lg' : 'h-16 max-w-5xl'"
      >
        <NuxtLink to="#" class="flex items-center gap-2 font-semibold">
          <svg
            class="fill-primary h-5"
            viewBox="0 0 53 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.2997 0L52.0461 28.6301V44H38.6311V34.1553L17.7522 13.3607L13.415 13.3607L13.415 44H0L0 0L23.2997 0ZM38.6311 15.2694V0L52.0461 0V15.2694L38.6311 15.2694Z"
            />
          </svg>
          <span :class="condensed && 'hidden sm:inline'">{{ props.name }}</span>
        </NuxtLink>

        <nav class="hidden items-center gap-1 md:flex" aria-label="Main">
          <NuxtLink
            v-for="link in links"
            :key="link"
            to="#"
            class="text-muted-foreground hover:bg-muted hover:text-foreground rounded-full px-3 py-1.5 text-sm font-medium transition-colors"
          >
            {{ link }}
          </NuxtLink>
        </nav>

        <div class="flex items-center gap-1">
          <UiButton
            variant="ghost"
            size="icon-sm"
            class="rounded-full"
            :aria-label="dark ? 'Switch to light mode' : 'Switch to dark mode'"
            @click="colorMode.preference = dark ? 'light' : 'dark'"
          >
            <Icon :name="dark ? 'lucide:sun' : 'lucide:moon'" class="size-4" />
          </UiButton>
          <UiButton size="sm" class="hidden rounded-full sm:inline-flex">Get started</UiButton>
          <UiSheet v-model:open="open">
            <UiSheetTrigger as-child>
              <UiButton
                variant="ghost"
                size="icon-sm"
                class="rounded-full md:hidden"
                aria-label="Open menu"
              >
                <Icon name="lucide:menu" class="size-5" />
              </UiButton>
            </UiSheetTrigger>
            <UiSheetContent side="top" class="p-0">
              <UiSheetTitle class="sr-only" title="Menu" />
              <UiSheetDescription class="sr-only" description="Site navigation" />
              <UiSheetX class="z-20" />
              <nav class="p-4 pt-12" aria-label="Mobile">
                <NuxtLink
                  v-for="link in links"
                  :key="link"
                  to="#"
                  class="hover:bg-muted block rounded-md px-3 py-3 text-sm font-semibold"
                  @click="open = false"
                >
                  {{ link }}
                </NuxtLink>
                <UiButton class="mt-3 w-full">Get started</UiButton>
              </nav>
            </UiSheetContent>
          </UiSheet>
        </div>
      </header>
    </div>

    <div class="mx-auto max-w-3xl space-y-6 px-6 py-10">
      <h1 class="text-3xl font-bold tracking-tight">Scroll the page</h1>
      <p class="text-muted-foreground">
        The header floats above your content and condenses once you start scrolling.
      </p>
      <div v-for="n in 8" :key="n" class="space-y-2">
        <div class="bg-muted h-4 w-1/3 rounded-full" />
        <div class="bg-muted/70 h-3 rounded-full" />
        <div class="bg-muted/70 h-3 w-5/6 rounded-full" />
        <div class="bg-muted/70 h-3 w-2/3 rounded-full" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const props = withDefaults(defineProps<{ name?: string }>(), { name: "UI Thing" });

  const links = ["Product", "Pricing", "Docs", "Blog"];
  const open = ref(false);
  const condensed = ref(false);
  const colorMode = useColorMode();
  const dark = computed(() => colorMode.value === "dark");

  // A small hysteresis stops the bar flickering when the scroll position hovers at the edge.
  function onScroll(event: Event) {
    const top = (event.currentTarget as HTMLElement).scrollTop;
    if (!condensed.value && top > 32) condensed.value = true;
    else if (condensed.value && top < 16) condensed.value = false;
  }
</script>
