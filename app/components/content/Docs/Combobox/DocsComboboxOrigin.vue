<template>
  <div class="mx-auto grid max-w-xs grid-cols-1 gap-8">
    <div class="grid gap-2">
      <UiLabel>Combobox with search</UiLabel>
      <UiPopover v-model:open="open">
        <UiPopoverTrigger as-child>
          <UiButton variant="outline" role="combobox" class="w-full justify-between">
            <span :class="['truncate', selectedFramework ? '' : 'text-muted-foreground']">{{
              selectedFramework || "Select a framework"
            }}</span>
            <Icon name="lucide:chevron-down" class="size-4 shrink-0 text-muted-foreground/50" />
          </UiButton>
        </UiPopoverTrigger>
        <UiPopoverContent class="w-(--reka-popover-trigger-width) border-input p-0">
          <UiCommand v-model="value" by="label">
            <UiCommandInput placeholder="Search framework..." />
            <UiCommandList>
              <UiCommandEmpty>No framework found.</UiCommandEmpty>
              <UiCommandGroup>
                <UiCommandItem
                  v-for="framework in frameworks"
                  :key="framework.value"
                  :value="framework.value"
                  @select="open = false"
                >
                  {{ framework.label }}
                  <Icon
                    v-if="value === framework.value"
                    name="lucide:check"
                    :size="16"
                    class="ml-auto"
                  />
                </UiCommandItem>
              </UiCommandGroup>
            </UiCommandList>
          </UiCommand>
        </UiPopoverContent>
      </UiPopover>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const frameworks = [
    { value: "next.js", label: "Next.js" },
    { value: "sveltekit", label: "SvelteKit" },
    { value: "nuxt.js", label: "Nuxt.js" },
    { value: "remix", label: "Remix" },
    { value: "astro", label: "Astro" },
    { value: "angular", label: "Angular" },
    { value: "vue", label: "Vue.js" },
    { value: "react", label: "React" },
    { value: "ember", label: "Ember.js" },
    { value: "gatsby", label: "Gatsby" },
    { value: "eleventy", label: "Eleventy" },
    { value: "solid", label: "SolidJS" },
    { value: "preact", label: "Preact" },
    { value: "qwik", label: "Qwik" },
    { value: "alpine", label: "Alpine.js" },
    { value: "lit", label: "Lit" },
  ];

  const open = ref(false);
  const value = ref("nuxt.js");
  const selectedFramework = computed(
    () => frameworks.find((framework) => framework.value === value?.value)?.label
  );
</script>
