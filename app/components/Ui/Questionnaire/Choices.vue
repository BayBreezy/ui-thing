<template>
  <Primitive
    :as
    :as-child
    data-slot="questionnaire-choices"
    :data-shortcuts="item.shortcuts.value ?? undefined"
    :class="questionnaireChoicesStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot :shortcuts="item.shortcuts.value" />
  </Primitive>
</template>

<script lang="ts">
  import { Primitive } from "reka-ui";
  import type { PrimitiveProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  import { injectQuestionnaireItemContext } from "~/utils/questionnaire";

  export const questionnaireChoicesStyles = tv({
    base: "group/questionnaire-choices grid min-w-0 gap-2",
  });

  export type QuestionnaireChoicesProps = PrimitiveProps & {
    /** Additional classes to apply to the list. */
    class?: HTMLAttributes["class"];
  };
</script>

<script setup lang="ts">
  const props = withDefaults(defineProps<QuestionnaireChoicesProps>(), {
    as: "div",
  });

  const item = injectQuestionnaireItemContext();
</script>
