<template>
  <Primitive
    data-slot="questionnaire-submit"
    type="submit"
    :aria-hidden="!visible || undefined"
    :aria-disabled="props.disabled || undefined"
    :aria-keyshortcuts="shortcut ?? undefined"
    :as
    :as-child
    :data-disabled="props.disabled ? '' : undefined"
    :data-hidden="visible ? undefined : ''"
    :data-shortcut="shortcut ?? undefined"
    :data-size="props.size"
    :data-status="root.activeItemStatus.value ?? undefined"
    :data-variant="props.variant"
    :data-visible="visible ? '' : undefined"
    :disabled="props.disabled"
    :hidden="!visible"
    :inert="!visible"
    :tabindex="visible ? undefined : -1"
    :class="
      buttonStyles({
        size,
        variant,
        class: normalizeClass([
          'col-start-3 row-start-1 min-h-11 justify-self-end sm:min-h-0',
          props.class,
        ]),
      })
    "
  >
    <slot>Submit</slot>
  </Primitive>
</template>

<script lang="ts">
  import { Primitive } from "reka-ui";
  import type { PrimitiveProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  import { buttonStyles } from "~/components/Ui/Button.vue";
  import { injectQuestionnaireRootContext } from "~/utils/questionnaire";

  export type QuestionnaireSubmitProps = PrimitiveProps & {
    /** Additional classes to apply to the button. */
    class?: HTMLAttributes["class"];
    /** @default false */
    disabled?: boolean;
    /** @default "default" */
    size?: VariantProps<typeof buttonStyles>["size"];
    /** @default "default" */
    variant?: VariantProps<typeof buttonStyles>["variant"];
  };
</script>

<script setup lang="ts">
  const props = withDefaults(defineProps<QuestionnaireSubmitProps>(), {
    as: "button",
    disabled: false,
    size: "default",
    variant: "default",
  });

  const root = injectQuestionnaireRootContext();

  const visible = computed(() => root.total.value > 0 && root.last.value);
  const shortcut = computed(() => (visible.value && !props.disabled ? "Enter" : null));
</script>
