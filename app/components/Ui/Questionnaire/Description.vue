<template>
  <Primitive
    v-bind="props.asChild ? {} : { id: descriptionId }"
    ref="primitiveRef"
    :as
    :as-child
    data-slot="questionnaire-description"
    :class="questionnaireDescriptionStyles({ class: normalizeClass(props.class) || undefined })"
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

  export const questionnaireDescriptionStyles = tv({
    base: "text-muted-foreground text-sm text-pretty",
  });

  export type QuestionnaireDescriptionProps = PrimitiveProps & {
    /** Additional classes to apply to the description. */
    class?: HTMLAttributes["class"];
    /** Overrides the generated id. */
    id?: string;
  };
</script>

<script setup lang="ts">
  const props = withDefaults(defineProps<QuestionnaireDescriptionProps>(), {
    as: "p",
  });

  const item = injectQuestionnaireItemContext();

  const primitiveRef = ref<ComponentPublicInstance | null>(null);
  const fallbackId = props.id ?? useId();
  const descriptionId = ref(fallbackId);

  let unregisterDescription = item.registerDescription(descriptionId.value);

  onMounted(() => {
    // With `as-child` the rendered child can bring its own id, for example a
    // DialogDescription. Adopt it so both descriptions point at one element.
    const element = primitiveRef.value?.$el as HTMLElement | undefined;
    const renderedId = element?.id;

    if (!renderedId) {
      if (element) {
        element.id = fallbackId;
      }

      return;
    }

    if (renderedId !== descriptionId.value) {
      unregisterDescription();
      descriptionId.value = renderedId;
      unregisterDescription = item.registerDescription(renderedId);
    }
  });

  onBeforeUnmount(() => unregisterDescription());
</script>
