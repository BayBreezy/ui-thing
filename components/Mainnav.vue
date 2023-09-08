<template>
  <header class="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
    <div class="container flex h-14 items-center justify-between">
      <div class="flex items-center gap-10">
        <NuxtLink to="/" class="text-lg font-bold">UI Thing</NuxtLink>
        <nav class="flex items-center space-x-6 text-sm font-medium">
          <NuxtLink to="/" class="text-foreground/60 transition-colors hover:text-foreground"
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
            </UIDropdownMenuContent>
          </UIDropdownMenu>
        </nav>
      </div>

      <div class="flex items-center gap-5">
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
  const mode = useColorMode();

  const modes = [
    { icon: "lucide:sun", title: "Light", value: "light" },
    { icon: "lucide:moon", title: "Dark", value: "dark" },
    { icon: "lucide:laptop", title: "System", value: "auto" },
  ];

  const setTheme = (val: string) => {
    mode.value = val as "light" | "dark" | "auto";
  };

  const currentIcon = computed(() => {
    return modes.find((m) => m.value === mode.value)?.icon;
  });
</script>
