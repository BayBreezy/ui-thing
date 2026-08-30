<template>
  <Primitive
    :as
    :as-child
    data-slot="questionnaire-actions"
    :class="questionnaireActionsStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts">
  import { Primitive } from "reka-ui";
  import type { PrimitiveProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export const questionnaireActionsStyles = tv({
    base: "grid min-h-11 w-full grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-2 sm:min-h-8",
  });

  export type QuestionnaireActionsProps = PrimitiveProps & {
    /** Additional classes to apply to the row. */
    class?: HTMLAttributes["class"];
  };
</script>

<script setup lang="ts">
  const props = withDefaults(defineProps<QuestionnaireActionsProps>(), {
    as: "div",
  });
</script>
