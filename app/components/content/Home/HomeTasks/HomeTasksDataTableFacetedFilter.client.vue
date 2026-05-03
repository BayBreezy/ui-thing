<script setup lang="ts">
  import type { Column } from "@tanstack/vue-table";
  import { twMerge } from "tailwind-merge";
  import type { Component } from "vue";

  interface DataTableFacetedFilter {
    column?: Column<HomeTask, any>;
    title?: string;
    options: {
      label: string;
      value: string;
      icon?: Component;
    }[];
  }

  const props = defineProps<DataTableFacetedFilter>();

  const facets = computed(() => props.column?.getFacetedUniqueValues());
  const selectedValues = computed(() => new Set(props.column?.getFilterValue() as string[]));
</script>

<template>
  <UiPopover>
    <UiPopoverTrigger as-child>
      <UiButton variant="outline" size="sm" class="h-8 border-dashed">
        <Icon name="lucide:circle-plus" class="mr-2 size-4" />
        {{ title }}
        <template v-if="selectedValues.size > 0">
          <UiSeparator orientation="vertical" class="mx-2 h-4" />
          <UiBadge variant="secondary" class="rounded-sm px-1 font-normal lg:hidden">
            {{ selectedValues.size }}
          </UiBadge>
          <div class="hidden space-x-1 lg:flex">
            <UiBadge
              v-if="selectedValues.size > 2"
              variant="secondary"
              class="rounded-sm px-1 font-normal"
            >
              {{ selectedValues.size }} selected
            </UiBadge>

            <template v-else>
              <UiBadge
                v-for="option in options.filter((option) => selectedValues.has(option.value))"
                :key="option.value"
                variant="secondary"
                class="rounded-sm px-1 font-normal"
              >
                {{ option.label }}
              </UiBadge>
            </template>
          </div>
        </template>
      </UiButton>
    </UiPopoverTrigger>
    <UiPopoverContent class="w-[220px] p-0" align="start">
      <UiCommand>
        <UiCommandInput :placeholder="title" />
        <UiCommandList>
          <UiCommandEmpty>No results found.</UiCommandEmpty>
          <UiCommandGroup>
            <UiCommandItem
              v-for="option in options"
              :key="option.value"
              :value="option"
              @select="
                (e) => {
                  const isSelected = selectedValues.has(option.value);
                  if (isSelected) {
                    selectedValues.delete(option.value);
                  } else {
                    selectedValues.add(option.value);
                  }
                  const filterValues = Array.from(selectedValues);
                  column?.setFilterValue(filterValues.length ? filterValues : undefined);
                }
              "
            >
              <div
                :class="
                  twMerge(
                    'border-primary mr-2 flex size-4 items-center justify-center rounded-sm border',
                    selectedValues.has(option.value)
                      ? 'bg-primary text-primary-foreground'
                      : 'opacity-50 [&_svg]:invisible'
                  )
                "
              >
                <Icon name="lucide:check" class="size-4" />
              </div>
              <component
                :is="option.icon"
                v-if="option.icon"
                class="text-muted-foreground mr-2 size-4"
              />
              <span>{{ option.label }}</span>
              <span
                v-if="facets?.get(option.value)"
                class="ml-auto flex size-4 items-center justify-center font-mono text-xs"
              >
                {{ facets.get(option.value) }}
              </span>
            </UiCommandItem>
          </UiCommandGroup>

          <template v-if="selectedValues.size > 0">
            <UiCommandSeparator />
            <UiCommandGroup>
              <UiCommandItem
                :value="{ label: 'Clear filters' }"
                class="justify-center text-center"
                @select="column?.setFilterValue(undefined)"
              >
                Clear filters
              </UiCommandItem>
            </UiCommandGroup>
          </template>
        </UiCommandList>
      </UiCommand>
    </UiPopoverContent>
  </UiPopover>
</template>
