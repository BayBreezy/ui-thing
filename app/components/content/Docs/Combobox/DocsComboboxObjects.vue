<template>
  <div class="mx-auto max-w-sm space-y-3">
    <UiCombobox v-model="value" by="value">
      <UiComboboxAnchor>
        <UiComboboxInput
          placeholder="Select a framework"
          :display-value="(framework: Framework) => framework?.label ?? ''"
        />
        <UiComboboxTrigger>
          <Icon name="lucide:chevrons-up-down" class="text-muted-foreground size-4" />
        </UiComboboxTrigger>
      </UiComboboxAnchor>

      <UiComboboxContent>
        <UiComboboxEmpty
          class="flex items-center justify-center p-4 text-center text-sm font-medium text-pretty"
        >
          No framework found.
        </UiComboboxEmpty>
        <UiComboboxGroup>
          <UiComboboxItem
            v-for="framework in frameworks"
            :key="framework.value"
            :value="framework"
            :text-value="framework.label"
          >
            {{ framework.label }}
          </UiComboboxItem>
        </UiComboboxGroup>
      </UiComboboxContent>
    </UiCombobox>

    <p class="text-muted-foreground text-sm">
      Selected:
      <span class="text-foreground font-medium">{{ value ? value.value : "(none)" }}</span>
    </p>
  </div>
</template>

<script lang="ts" setup>
  type Framework = { value: string; label: string };

  const frameworks: Framework[] = [
    { value: "next.js", label: "Next.js" },
    { value: "sveltekit", label: "SvelteKit" },
    { value: "nuxt.js", label: "Nuxt.js" },
    { value: "remix", label: "Remix" },
    { value: "astro", label: "Astro" },
  ];

  const value = ref<Framework>(frameworks[2]!);
</script>
