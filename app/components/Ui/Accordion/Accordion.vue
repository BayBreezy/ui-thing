<template>
  <AccordionRoot v-slot="rootSlotProps" data-slot="accordion" v-bind="forwarded">
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

<script lang="ts">
  import { AccordionRoot, useForwardPropsEmits } from "reka-ui";
  import type { AcceptableValue, AccordionRootEmits, AccordionRootProps } from "reka-ui";

  /** Interface that represents a single item in the accordion. */
  export interface AccordionItem {
    /** The title of the accordion item. */
    title?: string;
    /** The content of the accordion item. */
    content?: string;
    /** The value of the accordion item. */
    value: string;
    /** Whether the accordion item is disabled. */
    disabled?: boolean;
    /** The icon of the accordion item. */
    icon?: string;
    [key: string]: any;
  }
</script>

<script setup lang="ts">
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

  defineSlots<{
    /** Default slot for the accordion. */
    default: (props: {
      items: AccordionItem[];
      modelValue: AcceptableValue | AcceptableValue[] | undefined;
    }) => any;
    /** Slot for the accordion header. */
    header: (props: {
      items: AccordionItem[];
      item: AccordionItem;
      modelValue: AcceptableValue | AcceptableValue[] | undefined;
      open: boolean;
    }) => any;
    /** Slot for the accordion trigger. */
    trigger: (props: {
      items: AccordionItem[];
      item: AccordionItem;
      modelValue: AcceptableValue | AcceptableValue[] | undefined;
      open: boolean;
    }) => any;
    /** Slot for the accordion content. */
    content: (props: {
      items: AccordionItem[];
      item: AccordionItem;
      modelValue: AcceptableValue | AcceptableValue[] | undefined;
      open: boolean;
    }) => any;
  }>();
</script>
