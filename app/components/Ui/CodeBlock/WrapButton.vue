<template>
  <UiButton
    v-bind="$attrs"
    data-slot="code-block-wrap-button"
    :data-state="isWrap ? 'on' : 'off'"
    :as="as"
    :variant="variant"
    :size="size"
    :aria-label="label"
    :aria-pressed="isWrap"
    :class="normalizeClass(props.class) || undefined"
    @click="toggle"
  >
    <slot :wrap="isWrap">
      <Icon name="lucide:text-wrap" />
    </slot>
  </UiButton>
</template>

<script lang="ts">
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  import type { ButtonVariants } from "~/components/Ui/Button.vue";

  import { codeBlockInjectionKey } from "./CodeBlock.vue";

  export type CodeBlockWrapButtonProps = {
    /** The element to render the button as. */
    as?: string;
    /** The variant of the button. */
    variant?: ButtonVariants["variant"];
    /** The size of the button. */
    size?: ButtonVariants["size"];
    /** The accessible label of the button. */
    label?: string;
    /** Custom class(es) to add to the button. */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  defineOptions({ inheritAttrs: false });

  const props = withDefaults(defineProps<CodeBlockWrapButtonProps>(), {
    as: "button",
    variant: "ghost",
    size: "icon-xs",
    label: "Toggle line wrapping",
  });

  defineSlots<{
    /** Replaces the icon. */
    default(props: { wrap: boolean }): any;
  }>();

  // Toggles the `wrap` state of the surrounding `UiCodeBlock`
  const context = inject(codeBlockInjectionKey, null);
  const isWrap = computed(() => context?.wrap.value ?? false);

  function toggle() {
    if (context) context.wrap.value = !context.wrap.value;
  }
</script>
