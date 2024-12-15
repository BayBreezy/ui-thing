<template>
  <UiAccordion :default-value="[accordionItems[1].value]" type="multiple" :items="accordionItems">
    <template v-for="(i, k) in accordionItems" :key="k">
      <UiAccordionItem v-slot="{ open }" class="border-b-0" :value="i.value">
        <UiAccordionHeader>
          <UiAccordionTrigger
            :class="[open ? 'bg-muted underline hover:!underline' : 'bg-muted/50 no-underline']"
            class="mb-2 rounded-md px-3 text-left text-sm underline-offset-2 hover:bg-muted hover:no-underline"
            >{{ i.title }}</UiAccordionTrigger
          >
        </UiAccordionHeader>
        <UiAccordionContent>
          <div class="px-3 py-2 leading-8" v-html="i.content" />
        </UiAccordionContent>
      </UiAccordionItem>
    </template>
  </UiAccordion>
</template>

<script lang="ts" setup>
  const accordionItems = [
    {
      value: "item-1",
      title: "What is a Javascript framework?",
      content:
        "A JavaScript framework is an application framework written in JavaScript. It differs from a JavaScript library in its control flow: a library offers functions to be called by its parent code, whereas a framework defines the entire application design.",
    },
    {
      value: "item-2",
      title: "Is it easy to create a design system with Radix-Vue?",
      content:
        "Yes! Radix-Vue is a collection of low-level UI components that you can use to create a design system.",
    },
    {
      value: "item-3",
      title: "Can I customize the animation of the accordion?",
      content:
        "Of course! You can customize the animation of the accordion by updating the animation that is in the tailwind.config file.",
    },
  ];
</script>
