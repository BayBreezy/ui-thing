<template>
  <AccordionRoot v-bind="forwarded">
    <slot>
      <template v-for="(item, i) in items" :key="i">
        <UIAccordionItem :disabled="item.disabled" :value="item.value">
          <slot name="header">
            <UIAccordionHeader>
              <slot name="trigger">
                <UIAccordionTrigger :title="item.title" :icon="item.icon || icon" />
              </slot>
            </UIAccordionHeader>
          </slot>
          <slot name="content">
            <UIAccordionContent :content="item.content"></UIAccordionContent>
          </slot>
        </UIAccordionItem>
      </template>
    </slot>
  </AccordionRoot>
</template>

<script setup lang="ts">
  import { AccordionRoot, useForwardPropsEmits } from "radix-vue";
  import type { AccordionRootEmits, AccordionRootProps } from "radix-vue";

  type AccordionItem = {
    title?: string;
    content?: string;
    value: string;
    disabled?: boolean;
    icon?: string;
  };

  const props = withDefaults(
    defineProps<
      AccordionRootProps & {
        class?: any;
        items?: AccordionItem[];
        icon?: string;
      }
    >(),
    {
      type: "single",
      collapsible: true,
      disabled: false,
    }
  );

  const emits = defineEmits<AccordionRootEmits>();
  const forwarded = useForwardPropsEmits(useOmit(props, ["class", "items", "icon"]), emits);
</script>
