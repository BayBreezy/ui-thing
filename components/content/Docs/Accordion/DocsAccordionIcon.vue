<template>
  <UiAccordion type="single" default-value="item-2" :items="accordionItems">
    <template #trigger="{ open, item }">
      <UiAccordionTrigger
        class="text-left text-sm"
        :class="[open && 'underline underline-offset-2']"
        :title="item.title"
      >
        <template #icon>
          <Icon v-if="!open" name="lucide:plus" class="size-4 shrink-0" />
          <Icon v-else name="lucide:minus" class="size-4 shrink-0" />
        </template>
      </UiAccordionTrigger>
    </template>
  </UiAccordion>
</template>

<script lang="ts" setup>
  const accordionItems = [
    {
      value: "item-1",
      title: "What does it take to get a job at Apple?",
      content:
        "A lot of hard work and dedication. Apple is a great place to work, but it's not easy to get a job there. You need to be passionate about technology and willing to put in the time and effort to succeed.",
    },
    {
      value: "item-2",
      title: "How long does it take to learn a new programming language?",
      content:
        "It depends on the language and your level of experience. Some languages are easier to learn than others, but most people can learn the basics of a new language in a few weeks. To become proficient, it can take several months or even years of practice.",
    },
    {
      value: "item-3",
      title: "How many languages do I need to learn to become a software developer?",
      content:
        "You don't need to learn multiple languages to become a software developer, but it can be helpful. Most developers are proficient in at least one language, but knowing multiple languages can make you more versatile and marketable.",
    },
  ];
</script>
