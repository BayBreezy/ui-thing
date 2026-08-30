<template>
  <span
    data-slot="questionnaire-choice-description"
    :class="
      questionnaireChoiceDescriptionStyles({ class: normalizeClass(props.class) || undefined })
    "
  >
    <slot />
  </span>
</template>

<script lang="ts">
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export const questionnaireChoiceDescriptionStyles = tv({
    base: "text-muted-foreground",
  });

  export type QuestionnaireChoiceDescriptionProps = {
    /** Additional classes to apply to the description. */
    class?: HTMLAttributes["class"];
  };
</script>

<script setup lang="ts">
  const props = defineProps<QuestionnaireChoiceDescriptionProps>();
</script>
