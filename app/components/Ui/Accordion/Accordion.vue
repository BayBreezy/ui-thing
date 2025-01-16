<template>
  <AccordionRoot v-slot="rootSlotProps" v-bind="forwarded">
    <slot v-bind="rootSlotProps" :items="items">
      <template v-for="(item, i) in items" :key="i">
        <UiAccordionItem v-slot="itemSlotProps" :disabled="item.disabled" :value="item.value">
          <slot v-bind="{ ...itemSlotProps, ...rootSlotProps, items, item }" name="header">
            <UiAccordionHeader>
              <slot v-bind="{ ...itemSlotProps, ...rootSlotProps, items, item }" name="trigger">
                <UiAccordionTrigger :title="item.title" :icon="item.icon" />
              </slot>
            </UiAccordionHeader>
          </slot>
          <slot name="content" v-bind="{ ...itemSlotProps, ...rootSlotProps, items, item }">
            <UiAccordionContent :content="item.content" />
          </slot>
        </UiAccordionItem>
      </template>
    </slot>
  </AccordionRoot>
</template>

<script setup lang="ts">
  import { AccordionRoot, useForwardPropsEmits } from "radix-vue";
  import type { AccordionRootEmits, AccordionRootProps } from "radix-vue";

  export interface AccordionItem {
    title?: string;
    content?: string;
    value: string;
    disabled?: boolean;
    icon?: string;
    [key: string]: any;
  }

  const props = withDefaults(
    defineProps<
      AccordionRootProps & {
        items?: AccordionItem[];
      }
    >(),
    { type: "single", collapsible: true, items: () => [] }
  );

  const emits = defineEmits<AccordionRootEmits>();
  const forwarded = useForwardPropsEmits(reactiveOmit(props, "items"), emits);
</script>
