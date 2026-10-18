<template>
  <!--
    SaaS footer with a status pill, language picker and theme switcher
    Features: Link columns, bottom bar with system status, version, a language select and a three way theme toggle wired to color mode
  -->
  <UiContainer as="footer" class="py-12 lg:py-16">
    <div class="grid gap-10 lg:grid-cols-[1.2fr_2.4fr]">
      <div class="max-w-xs space-y-4">
        <NuxtLink to="#" class="flex items-center gap-2.5 text-lg font-semibold">
          <svg
            class="fill-primary h-7"
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
        <p class="text-muted-foreground text-sm">
          Everything your team needs to ship, in one workspace.
        </p>
      </div>
      <nav class="grid grid-cols-2 gap-8 sm:grid-cols-4" aria-label="Footer">
        <div v-for="column in columns" :key="column.title">
          <p class="text-sm font-semibold">{{ column.title }}</p>
          <ul class="mt-4 space-y-3">
            <li v-for="link in column.links" :key="link">
              <NuxtLink
                to="#"
                class="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                {{ link }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>

    <div
      class="mt-12 flex flex-col gap-5 border-t pt-6 lg:flex-row lg:items-center lg:justify-between"
    >
      <div class="text-muted-foreground flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
        <p>&copy; {{ new Date().getFullYear() }} {{ props.name }}</p>
        <NuxtLink to="#" class="hover:text-foreground flex items-center gap-2 transition-colors">
          <span class="size-2 rounded-full bg-green-500" />
          All systems normal
        </NuxtLink>
        <NuxtLink to="#" class="hover:text-foreground transition-colors">v2.4.0</NuxtLink>
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <div class="relative">
          <Icon
            name="lucide:globe"
            class="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2"
          />
          <UiNativeSelect v-model="language" class="h-9 w-40 pl-8" aria-label="Language">
            <option v-for="lang in languages" :key="lang">{{ lang }}</option>
          </UiNativeSelect>
        </div>
        <UiToggleGroup
          :model-value="colorMode.preference"
          type="single"
          variant="outline"
          aria-label="Theme"
          @update:model-value="(value) => value && (colorMode.preference = value as string)"
        >
          <UiToggleGroupItem
            v-for="mode in modes"
            :key="mode.value"
            :value="mode.value"
            :aria-label="mode.label"
          >
            <Icon :name="mode.icon" class="size-4" />
          </UiToggleGroupItem>
        </UiToggleGroup>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  const props = withDefaults(defineProps<{ name?: string }>(), { name: "UI Thing" });

  const colorMode = useColorMode();
  const language = ref("English (US)");
  const languages = ["English (US)", "English (UK)", "Deutsch", "Français", "Español", "日本語"];
  const modes = [
    { value: "light", label: "Light", icon: "lucide:sun" },
    { value: "dark", label: "Dark", icon: "lucide:moon" },
    { value: "system", label: "System", icon: "lucide:monitor" },
  ];

  const columns = [
    { title: "Product", links: ["Features", "Pricing", "Changelog", "Roadmap"] },
    { title: "Developers", links: ["Docs", "API", "Status", "SDKs"] },
    { title: "Company", links: ["About", "Careers", "Blog", "Contact"] },
    { title: "Legal", links: ["Privacy", "Terms", "Security", "DPA"] },
  ];
</script>
