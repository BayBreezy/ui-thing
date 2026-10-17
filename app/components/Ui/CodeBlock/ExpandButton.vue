<template>
  <UiButton
    v-if="visible"
    v-bind="$attrs"
    data-slot="code-block-expand-button"
    :data-state="isExpanded ? 'expanded' : 'collapsed'"
    :as="as"
    :variant="variant"
    :size="size"
    :aria-expanded="isExpanded"
    :class="normalizeClass(props.class) || undefined"
    @click="toggle"
  >
    <slot :expanded="isExpanded">
      {{ isExpanded ? collapseText : expandText }}
      <Icon :name="isExpanded ? 'lucide:chevron-up' : 'lucide:chevron-down'" />
    </slot>
  </UiButton>
</template>

<script lang="ts">
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  import type { ButtonVariants } from "~/components/Ui/Button.vue";

  import { codeBlockInjectionKey } from "./CodeBlock.vue";

  export type CodeBlockExpandButtonProps = {
    /** The element to render the button as. */
    as?: string;
    /** The variant of the button. */
    variant?: ButtonVariants["variant"];
    /** The size of the button. */
    size?: ButtonVariants["size"];
    /** The text shown while collapsed. */
    expandText?: string;
    /** The text shown while expanded. */
    collapseText?: string;
    /** Custom class(es) to add to the button. */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  defineOptions({ inheritAttrs: false });

  const props = withDefaults(defineProps<CodeBlockExpandButtonProps>(), {
    as: "button",
    variant: "ghost",
    size: "xs",
    expandText: "Show more",
    collapseText: "Show less",
  });

  defineSlots<{
    /** Replaces the text and icon. */
    default(props: { expanded: boolean }): any;
  }>();

  // Toggles the `expanded` state of the surrounding `UiCodeBlock`. It is only rendered when the
  // code has more lines than `maxLines`.
  const context = inject(codeBlockInjectionKey, null);
  const isExpanded = computed(() => context?.expanded.value ?? false);
  const visible = computed(
    () => !!context?.maxLines.value && context.lineCount.value > context.maxLines.value
  );

  function toggle() {
    if (context) context.expanded.value = !context.expanded.value;
  }
</script>
