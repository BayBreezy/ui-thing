<template>
  <header class="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
    <div class="container flex h-14 items-center justify-between">
      <div class="flex items-center gap-10">
        <NuxtLink to="/" class="text-lg font-bold">UI Thing</NuxtLink>
        <nav class="flex items-center space-x-6 text-sm font-medium">
          <NuxtLink
            to="/components/accordion"
            class="text-foreground/60 transition-colors hover:text-foreground"
            >Components</NuxtLink
          >
          <UIDropdownMenu>
            <UIDropdownMenuTrigger>
              <div
                class="inline-flex items-center gap-1 text-foreground/60 transition-colors hover:text-foreground"
              >
                <span>Examples</span>
                <Icon name="heroicons:chevron-down" class="h-3 w-3" />
              </div>
            </UIDropdownMenuTrigger>
            <UIDropdownMenuContent align="start" :side-offset="5">
              <UIDropdownMenuItem as-child>
                <NuxtLink class="cursor-pointer hover:bg-muted" to="/examples/cards"
                  >Cards</NuxtLink
                >
              </UIDropdownMenuItem>
              <UIDropdownMenuItem as-child>
                <NuxtLink class="cursor-pointer hover:bg-muted" to="/examples/dashboard"
                  >Dashboard</NuxtLink
                >
              </UIDropdownMenuItem>
            </UIDropdownMenuContent>
          </UIDropdownMenu>
        </nav>
      </div>

      <div class="flex items-center">
        <UIButton
          size="sm"
          class="mr-2 min-w-[200px] font-normal text-muted-foreground"
          @click="isOpen = true"
          variant="outline"
        >
          <Icon name="lucide:search" />
          Search...
          <UIKbd class="ml-auto">{{ metaSymbol }}+K</UIKbd>
        </UIButton>
        <UIButton
          to="https://github.com/BayBreezy/ui-thing"
          target="_blank"
          class="h-9 w-9"
          variant="ghost"
          size="icon"
          ><Icon name="radix-icons:github-logo" class="h-[18px] w-[18px]"
        /></UIButton>
        <CommandSearch v-model="isOpen" />
        <UIDropdownMenu>
          <UIDropdownMenuTrigger as-child>
            <UIButton class="h-9 w-9" variant="ghost" size="icon"
              ><Icon :name="currentIcon || 'lucide:sun'" class="h-[18px] w-[18px]"
            /></UIButton>
          </UIDropdownMenuTrigger>
          <UIDropdownMenuContent align="end" :side-offset="5">
            <UIDropdownMenuItem
              class="cursor-pointer"
              v-for="(m, i) in modes"
              :key="i"
              :icon="m.icon"
              :title="m.title"
              @click="setTheme(m.value)"
            />
          </UIDropdownMenuContent>
        </UIDropdownMenu>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
  const modes = [
    { icon: "lucide:sun", title: "Light", value: "light" },
    { icon: "lucide:moon", title: "Dark", value: "dark" },
    { icon: "lucide:laptop", title: "System", value: "system" },
  ];

  const colorMode = useColorMode();
  const setTheme = (val: string) => {
    colorMode.preference = val;
  };

  const currentIcon = computed(() => {
    return modes.find((m) => m.value === colorMode.preference)?.icon;
  });

  const isOpen = ref(false);

  const { metaSymbol } = useShortcuts();

  defineShortcuts({
    meta_k: () => {
      isOpen.value = !isOpen.value;
    },
  });
</script>
