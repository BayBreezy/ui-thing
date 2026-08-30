<template>
  <Primitive
    :id="errorId"
    :as
    :as-child
    data-slot="questionnaire-error"
    :data-invalid="item.invalid.value ? '' : undefined"
    :hidden="!item.invalid.value"
    :role="item.invalid.value ? 'alert' : undefined"
    :class="questionnaireErrorStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot :invalid="item.invalid.value">
      {{ fallback }}
    </slot>
  </Primitive>
</template>

<script lang="ts">
  import { Primitive } from "reka-ui";
  import type { PrimitiveProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  import { injectQuestionnaireItemContext } from "~/utils/questionnaire";

  export const questionnaireErrorStyles = tv({
    base: "text-destructive mt-2 text-sm",
  });

  export type QuestionnaireErrorProps = PrimitiveProps & {
    /** Additional classes to apply to the error. */
    class?: HTMLAttributes["class"];
    /** Overrides the generated id. */
    id?: string;
  };
</script>

<script setup lang="ts">
  const props = withDefaults(defineProps<QuestionnaireErrorProps>(), {
    as: "p",
  });

  const item = injectQuestionnaireItemContext();

  const errorId = props.id ?? useId();
  const unregisterError = item.registerError(errorId);

  const fallback = computed(() =>
    item.required.value
      ? "Choose an answer to continue."
      : "Choose an answer or skip this question."
  );

  onBeforeUnmount(unregisterError);
</script>
