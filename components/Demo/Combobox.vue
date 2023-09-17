<template>
  <div>
    <Heading
      title="Combobox"
      subtext="Choose from a list of suggested values with full keyboard support. The Combobox is built using a composition of the <Popover /> and the <Command /> components."
      radix-link="https://www.radix-vue.com/components/combobox.html"
    />

    <UIPopover v-model:open="open">
      <UIPopoverTrigger as-child>
        <UIButton
          variant="outline"
          role="combobox"
          :aria-expanded="open"
          class="w-[200px] justify-between"
        >
          <span v-if="value">{{ value.label }}</span>
          <span v-else class="text-muted-foreground">Select framework</span>
          <Icon name="lucide:chevrons-up-down" class="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </UIButton>
      </UIPopoverTrigger>
      <UIPopoverContent class="w-[200px] p-0">
        <UICommand v-model="value" :filter-function="filterFunction">
          <UICommandInput placeholder="Search framework..." />
          <UICommandEmpty>No framework found.</UICommandEmpty>
          <UICommandGroup>
            <UICommandItem
              v-for="framework in frameworks"
              :key="framework.value"
              :value="framework"
              @select="open = false"
            >
              <Icon
                name="lucide:check"
                class="mr-2 h-4 w-4"
                :class="[value?.value === framework.value ? 'opacity-100' : 'opacity-0']"
              />
              {{ framework.label }}
            </UICommandItem>
          </UICommandGroup>
        </UICommand>
      </UIPopoverContent>
    </UIPopover>

    <div class="mt-10">
      <UICombobox v-model="frame">
        <UIComboboxHeader>
          <div class="relative">
            <UIComboboxInput
              :value="frame ? frame.label : null"
              placeholder="Search framework..."
            />
            <UIComboboxTrigger class="absolute inset-y-0 right-3 flex items-center justify-center">
              <Icon name="lucide:chevrons-up-down" class="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </UIComboboxTrigger>
          </div>
        </UIComboboxHeader>

        <UIComboboxContent>
          <UIComboboxEmpty> No framework found </UIComboboxEmpty>

          <UIComboboxGroup>
            <UIComboboxItem v-for="(f, i) in frameworks" :key="i" :value="f">{{
              f.label
            }}</UIComboboxItem>
          </UIComboboxGroup>
        </UIComboboxContent>
      </UICombobox>
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
  ];

  const open = ref(false);
  const value = ref<(typeof frameworks)[number]>();

  const frame = ref();

  const filterFunction = (list: typeof frameworks, search: string) =>
    list.filter((i) => i.value.toLowerCase().includes(search.toLowerCase()));
</script>
