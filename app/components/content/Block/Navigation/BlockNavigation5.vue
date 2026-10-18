<template>
  <!--
    Simple header with a sliding active indicator
    Features: Plain links with an underline that slides to the hovered or active link, log in and sign up actions, sheet menu on small screens
  -->
  <header class="bg-background/90 sticky top-0 z-20 border-b backdrop-blur">
    <UiContainer class="flex h-16 items-center justify-between gap-6">
      <NuxtLink to="#" class="flex items-center gap-2.5 text-lg font-semibold">
        <svg
          class="fill-primary h-6"
          viewBox="0 0 53 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23.2997 0L52.0461 28.6301V44H38.6311V34.1553L17.7522 13.3607L13.415 13.3607L13.415 44H0L0 0L23.2997 0ZM38.6311 15.2694V0L52.0461 0V15.2694L38.6311 15.2694Z"
          />
        </svg>
        {{ props.name }}
      </NuxtLink>

      <nav
        ref="nav"
        class="relative hidden h-full items-center gap-1 lg:flex"
        aria-label="Main"
        @mouseleave="hovered = undefined"
      >
        <NuxtLink
          v-for="link in links"
          :key="link"
          :ref="(el) => setRef(link, el)"
          to="#"
          class="relative px-3.5 py-2 text-sm font-medium transition-colors"
          :class="
            current === link ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
          "
          :aria-current="active === link ? 'page' : undefined"
          @mouseenter="hovered = link"
          @click.prevent="active = link"
        >
          {{ link }}
        </NuxtLink>
        <span
          class="bg-primary absolute bottom-0 h-0.5 rounded-full transition-all duration-300 ease-out"
          :style="{
            left: `${indicator.left}px`,
            width: `${indicator.width}px`,
            opacity: indicator.width ? 1 : 0,
          }"
          aria-hidden="true"
        />
      </nav>

      <div class="flex items-center gap-2">
        <UiButton variant="ghost" size="sm" class="hidden sm:inline-flex">Log in</UiButton>
        <UiButton size="sm" class="hidden sm:inline-flex">Sign up</UiButton>
        <UiSheet v-model:open="open">
          <UiSheetTrigger as-child>
            <UiButton variant="outline" size="icon" class="lg:hidden" aria-label="Open menu">
              <Icon name="lucide:menu" class="size-5" />
            </UiButton>
          </UiSheetTrigger>
          <UiSheetContent side="right" class="w-[88%] p-0 sm:max-w-sm">
            <UiSheetTitle class="sr-only" title="Menu" />
            <UiSheetDescription class="sr-only" description="Site navigation" />
            <UiSheetX class="z-20" />
            <div class="border-b p-5 text-lg font-semibold">{{ props.name }}</div>
            <nav class="p-3" aria-label="Mobile">
              <NuxtLink
                v-for="link in links"
                :key="link"
                to="#"
                class="hover:bg-muted block rounded-md px-3 py-3 text-sm font-semibold"
                @click.prevent="((active = link), (open = false))"
              >
                {{ link }}
              </NuxtLink>
            </nav>
            <div class="grid grid-cols-2 gap-3 border-t p-5">
              <UiButton variant="outline">Log in</UiButton>
              <UiButton>Sign up</UiButton>
            </div>
          </UiSheetContent>
        </UiSheet>
      </div>
    </UiContainer>
  </header>
</template>

<script lang="ts" setup>
  const props = withDefaults(defineProps<{ name?: string }>(), { name: "UI Thing" });

  const links = ["Home", "Features", "Pricing", "Blog", "Contact"];
  const open = ref(false);
  const active = ref("Home");
  const hovered = ref<string>();
  const current = computed(() => hovered.value ?? active.value);

  const nav = ref<HTMLElement | null>(null);
  const els = reactive<Record<string, HTMLElement | undefined>>({});
  const indicator = reactive({ left: 0, width: 0 });

  function setRef(name: string, el: unknown) {
    els[name] = (el as { $el?: HTMLElement } | null)?.$el ?? (el as HTMLElement | undefined);
  }

  function measure() {
    const el = els[current.value];
    if (!el || !nav.value) return;
    const navBox = nav.value.getBoundingClientRect();
    const box = el.getBoundingClientRect();
    indicator.left = box.left - navBox.left + 14;
    indicator.width = box.width - 28;
  }

  watch(current, () => nextTick(measure));
  onMounted(() => nextTick(measure));
  useEventListener("resize", measure);
</script>
