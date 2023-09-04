<template>
  <AccordionRoot
    @update:model-value="emits('update:modelValue', $event)"
    :type="type"
    :collapsible="collapsible"
    :disabled="disabled"
    :as="as"
    :as-child="asChild"
    :default-value="defaultValue"
  >
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
  import { type AccordionRootProps, AccordionRootEmits } from "radix-vue";

  const props = withDefaults(
    defineProps<{
      class?: any;
      type?: AccordionRootProps["type"];
      collapsible?: AccordionRootProps["collapsible"];
      disabled?: AccordionRootProps["disabled"];
      dir?: AccordionRootProps["dir"];
      orientation?: AccordionRootProps["orientation"];
      as?: AccordionRootProps["as"];
      asChild?: AccordionRootProps["asChild"];
      defaultValue?: AccordionRootProps["defaultValue"];
      items?: AccordionItem[];
      icon?: string;
    }>(),
    {
      type: "single",
      collapsible: true,
      disabled: false,
      dir: "ltr",
      orientation: "vertical",
    }
  );

  const emits = defineEmits<{
    "update:modelValue": [value: any];
  }>();
</script>
