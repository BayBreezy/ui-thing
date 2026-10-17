<template>
  <!--
    Appearance settings with theme preview cards
    Features: Light, dark and system cards with a mini preview wired to color mode, accent colour swatches, interface density radio
  -->
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>{{ props.title }}</UiCardTitle>
      <UiCardDescription>{{ props.description }}</UiCardDescription>
    </UiCardHeader>
    <UiCardContent class="space-y-8">
      <div class="space-y-3">
        <UiLabel>Theme</UiLabel>
        <UiRadioGroup v-model="theme" class="grid gap-4 sm:grid-cols-3">
          <label
            v-for="option in themes"
            :key="option.value"
            class="group cursor-pointer space-y-2"
          >
            <div
              class="overflow-hidden rounded-lg border-2 p-1 transition-colors"
              :class="theme === option.value ? 'border-primary' : 'border-border hover:border-ring'"
            >
              <div class="flex h-20 overflow-hidden rounded-md" :class="option.preview.bg">
                <template v-if="option.value === 'system'">
                  <div class="flex-1 bg-white p-2">
                    <div class="h-2 w-10 rounded bg-slate-200" />
                    <div class="mt-1.5 h-2 w-14 rounded bg-slate-200" />
                  </div>
                  <div class="flex-1 bg-slate-900 p-2">
                    <div class="h-2 w-10 rounded bg-slate-700" />
                    <div class="mt-1.5 h-2 w-14 rounded bg-slate-700" />
                  </div>
                </template>
                <div v-else class="w-full space-y-1.5 p-2">
                  <div class="h-2 w-10 rounded" :class="option.preview.bar" />
                  <div class="h-2 w-16 rounded" :class="option.preview.bar" />
                  <div class="h-2 w-12 rounded" :class="option.preview.bar" />
                </div>
              </div>
            </div>
            <div class="flex items-center gap-2 text-sm font-medium">
              <UiRadioGroupItem :value="option.value" />
              {{ option.label }}
            </div>
          </label>
        </UiRadioGroup>
      </div>

      <div class="space-y-3">
        <UiLabel>Accent colour</UiLabel>
        <div class="flex flex-wrap gap-3">
          <button
            v-for="swatch in accents"
            :key="swatch.name"
            type="button"
            :aria-label="swatch.name"
            :aria-pressed="accent === swatch.name"
            class="flex size-8 items-center justify-center rounded-full ring-offset-2 transition-shadow"
            :class="[swatch.class, accent === swatch.name && 'ring-ring ring-2']"
            @click="accent = swatch.name"
          >
            <Icon v-if="accent === swatch.name" name="lucide:check" class="size-4 text-white" />
          </button>
        </div>
      </div>

      <div class="space-y-3">
        <UiLabel>Interface density</UiLabel>
        <UiRadioGroup v-model="density" class="grid gap-3">
          <label
            v-for="option in densities"
            :key="option.value"
            class="hover:bg-accent/50 flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors"
          >
            <UiRadioGroupItem :value="option.value" class="mt-0.5" />
            <span>
              <span class="block text-sm font-medium">{{ option.label }}</span>
              <span class="text-muted-foreground block text-sm">{{ option.hint }}</span>
            </span>
          </label>
        </UiRadioGroup>
      </div>
    </UiCardContent>
    <UiCardFooter class="justify-end gap-2 border-t">
      <UiButton variant="outline">Cancel</UiButton>
      <UiButton @click="useSonner.success('Appearance saved')">Save changes</UiButton>
    </UiCardFooter>
  </UiCard>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
    }>(),
    {
      title: "Appearance",
      description: "Customise how the app looks on this device.",
    }
  );

  const colorMode = useColorMode();

  // Reads and writes the real color mode, so the preview cards change the page too.
  const theme = computed({
    get: () => colorMode.preference,
    set: (value: string) => {
      colorMode.preference = value;
    },
  });

  const themes = [
    {
      value: "light",
      label: "Light",
      preview: { bg: "bg-white", bar: "bg-slate-200" },
    },
    {
      value: "dark",
      label: "Dark",
      preview: { bg: "bg-slate-900", bar: "bg-slate-700" },
    },
    {
      value: "system",
      label: "System",
      preview: { bg: "", bar: "" },
    },
  ];

  const accents = [
    { name: "Violet", class: "bg-violet-500" },
    { name: "Blue", class: "bg-blue-500" },
    { name: "Emerald", class: "bg-emerald-500" },
    { name: "Amber", class: "bg-amber-500" },
    { name: "Rose", class: "bg-rose-500" },
    { name: "Slate", class: "bg-slate-500" },
  ];

  const densities = [
    { value: "comfortable", label: "Comfortable", hint: "More breathing room between elements." },
    { value: "compact", label: "Compact", hint: "Fit more on screen with tighter spacing." },
  ];

  const accent = ref("Violet");
  const density = ref("comfortable");
</script>
