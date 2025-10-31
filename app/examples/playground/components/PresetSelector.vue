<template>
  <UiPopover v-model:open="open">
    <UiPopoverTrigger as-child>
      <UiButton
        variant="outline"
        role="combobox"
        aria-label="Load a preset..."
        :aria-expanded="open"
        class="flex-1 justify-between md:max-w-[200px] lg:max-w-[300px]"
      >
        {{ selectedPreset ? selectedPreset.name : "Load a preset..." }}
        <Icon name="lucide:chevrons-up-down" class="opacity-50" />
      </UiButton>
    </UiPopoverTrigger>
    <UiPopoverContent class="w-[300px] p-0">
      <UiCommand v-model="selectedPreset">
        <UiCommandInput placeholder="Search presets..." />
        <UiCommandList>
          <UiCommandEmpty>No presets found.</UiCommandEmpty>
          <UiCommandGroup heading="Examples">
            <UiCommandItem
              v-for="preset in presets"
              :key="preset.id"
              :value="preset"
              class="group"
              @select="open = false"
            >
              {{ preset.name }}
              <Icon name="lucide:check" class="ml-auto opacity-0 group-aria-selected:opacity-100" />
            </UiCommandItem>
          </UiCommandGroup>
          <UiCommandSeparator />
          <UiCommandGroup>
            <UiCommandItem
              :value="{
                id: 'more-examples',
                name: 'More examples',
              }"
              @select="open = false"
              >More examples</UiCommandItem
            >
          </UiCommandGroup>
        </UiCommandList>
      </UiCommand>
    </UiPopoverContent>
  </UiPopover>
</template>

<script lang="ts" setup>
  import type { Preset } from "../data/presets";

  import { presets } from "../data/presets";

  const open = ref(false);
  const selectedPreset = ref<Preset | undefined>(presets[0]);
</script>
