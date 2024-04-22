<template>
  <AccordionRoot v-bind="forwarded">
    <slot :items="items">
      <template v-for="(item, i) in items" :key="i">
        <UiAccordionItem :disabled="item.disabled" :value="item.value">
          <slot name="header" :items="items">
            <UiAccordionHeader>
              <slot name="trigger" :items="items">
                <UiAccordionTrigger :title="item.title" :icon="item.icon" />
              </slot>
            </UiAccordionHeader>
          </slot>
          <slot name="content" :items="items">
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
