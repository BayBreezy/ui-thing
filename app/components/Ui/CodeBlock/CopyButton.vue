<template>
  <UiButton
    v-bind="$attrs"
    data-slot="code-block-copy-button"
    :data-copied="copied || undefined"
    :as="as"
    :variant="variant"
    :size="size"
    :aria-label="copied ? copiedLabel : label"
    :class="normalizeClass(props.class) || undefined"
    @click="onCopy"
  >
    <slot :copied="copied">
      <Icon :name="copied ? 'lucide:check' : 'lucide:copy'" />
    </slot>
  </UiButton>
  <span aria-live="polite" class="sr-only">{{ copied ? copiedLabel : "" }}</span>
</template>

<script lang="ts">
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  import type { ButtonVariants } from "~/components/Ui/Button.vue";

  import { codeBlockInjectionKey } from "./CodeBlock.vue";

  export type CodeBlockCopyButtonProps = {
    /** The element to render the button as. */
    as?: string;
    /** The text to copy. Falls back to the `code` set on `UiCodeBlock`. */
    value?: string;
    /** The variant of the button. */
    variant?: ButtonVariants["variant"];
    /** The size of the button. */
    size?: ButtonVariants["size"];
    /** How long, in milliseconds, the copied state lasts. */
    timeout?: number;
    /** The accessible label of the button. */
    label?: string;
    /** The accessible label while the copied state is showing. */
    copiedLabel?: string;
    /** Custom class(es) to add to the button. */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  defineOptions({ inheritAttrs: false });

  const props = withDefaults(defineProps<CodeBlockCopyButtonProps>(), {
    as: "button",
    variant: "ghost",
    size: "icon-xs",
    timeout: 2000,
    label: "Copy",
    copiedLabel: "Copied",
  });

  const emit = defineEmits<{
    /** Fired after the text was copied. */
    copy: [text: string];
  }>();

  defineSlots<{
    /** Replaces the icon. */
    default(props: { copied: boolean }): any;
  }>();

  const context = inject(codeBlockInjectionKey, null);
  const { copy, copied } = useClipboard({ copiedDuring: props.timeout, legacy: true });

  async function onCopy() {
    const text = props.value ?? context?.code.value;
    if (text === undefined) return;
    await copy(text);
    emit("copy", text);
  }
</script>
