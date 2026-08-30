<template>
  <Primitive
    aria-label="Questionnaire progress"
    aria-live="polite"
    data-slot="questionnaire-progress"
    role="progressbar"
    :aria-valuemax="root.total.value || undefined"
    :aria-valuemin="root.total.value ? 1 : undefined"
    :aria-valuenow="root.total.value ? root.current.value : undefined"
    :aria-valuetext="label"
    :as
    :as-child
    :data-current="root.current.value"
    :data-first="root.first.value ? '' : undefined"
    :data-last="root.last.value ? '' : undefined"
    :data-total="root.total.value"
    :class="questionnaireProgressStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot
      :current="root.current.value"
      :first="root.first.value"
      :last="root.last.value"
      :total="root.total.value"
    >
      {{ label }}
    </slot>
  </Primitive>
</template>

<script lang="ts">
  import { Primitive } from "reka-ui";
  import type { PrimitiveProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  import { injectQuestionnaireRootContext } from "~/utils/questionnaire";

  export const questionnaireProgressStyles = tv({
    base: "text-muted-foreground min-h-lh w-fit min-w-[14ch] text-xs font-medium tabular-nums",
  });

  export type QuestionnaireProgressProps = PrimitiveProps & {
    /** Additional classes to apply to the progress bar. */
    class?: HTMLAttributes["class"];
  };
</script>

<script setup lang="ts">
  const props = withDefaults(defineProps<QuestionnaireProgressProps>(), {
    as: "div",
  });

  const root = injectQuestionnaireRootContext();

  const label = computed(() =>
    root.total.value ? `Question ${root.current.value} of ${root.total.value}` : undefined
  );
</script>
