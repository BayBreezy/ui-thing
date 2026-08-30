<template>
  <Primitive
    v-bind="props.id ? { id: props.id } : {}"
    ref="primitiveRef"
    :as
    :as-child
    data-slot="questionnaire-title"
    :class="questionnaireTitleStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts">
  import { Primitive } from "reka-ui";
  import type { PrimitiveProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { ComponentPublicInstance, HTMLAttributes } from "vue";

  import { injectQuestionnaireItemContext } from "~/utils/questionnaire";

  export const questionnaireTitleStyles = tv({
    base: "text-base leading-snug font-medium text-pretty [&:not(:has(~[data-slot=questionnaire-description]))]:mb-4",
  });

  export type QuestionnaireTitleProps = PrimitiveProps & {
    /** Additional classes to apply to the title. */
    class?: HTMLAttributes["class"];
    /** Overrides the generated id. */
    id?: string;
  };
</script>

<script setup lang="ts">
  const props = withDefaults(defineProps<QuestionnaireTitleProps>(), {
    as: "legend",
  });

  const item = injectQuestionnaireItemContext();

  const primitiveRef = ref<ComponentPublicInstance | null>(null);
  const fallbackId = props.id ?? useId();

  let unregisterTitle: (() => void) | null = null;

  onMounted(() => {
    const element = primitiveRef.value?.$el as HTMLElement | undefined;

    // A legend already names the fieldset. Anything else, for example a
    // DialogTitle rendered through `as-child`, has to name it explicitly.
    if (!element || element.tagName === "LEGEND") {
      return;
    }

    if (!element.id) {
      element.id = fallbackId;
    }

    unregisterTitle = item.registerTitle(element.id);
  });

  onBeforeUnmount(() => unregisterTitle?.());
</script>
