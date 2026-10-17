<template>
  <UiButton
    v-bind="$attrs"
    data-slot="code-block-download-button"
    :as="as"
    :variant="variant"
    :size="size"
    :aria-label="label"
    :class="normalizeClass(props.class) || undefined"
    @click="onDownload"
  >
    <slot>
      <Icon name="lucide:download" />
    </slot>
  </UiButton>
</template>

<script lang="ts">
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  import type { ButtonVariants } from "~/components/Ui/Button.vue";

  import { codeBlockInjectionKey } from "./CodeBlock.vue";

  export type CodeBlockDownloadButtonProps = {
    /** The element to render the button as. */
    as?: string;
    /** The text to download. Falls back to the `code` set on `UiCodeBlock`. */
    value?: string;
    /** The name of the downloaded file. Falls back to the `filename` set on `UiCodeBlock`. */
    filename?: string;
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

  const props = withDefaults(defineProps<CodeBlockDownloadButtonProps>(), {
    as: "button",
    variant: "ghost",
    size: "icon-xs",
    label: "Download",
  });

  const emit = defineEmits<{
    /** Fired after the download was started. */
    download: [filename: string];
  }>();

  defineSlots<{
    /** Replaces the icon. */
    default(): any;
  }>();

  const context = inject(codeBlockInjectionKey, null);

  function onDownload() {
    const text = props.value ?? context?.code.value;
    if (text === undefined) return;

    const filename = props.filename ?? context?.filename.value ?? "code.txt";
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
    emit("download", filename);
  }
</script>
