<template>
  <p
    :id="formDescriptionId"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
    v-bind="$attrs"
  >
    <slot>
      <ClientOnly>
        <p v-html="description" />
      </ClientOnly>
    </slot>
  </p>
</template>
<script lang="ts" setup>
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  defineOptions({ inheritAttrs: false });

  const { formDescriptionId } = useFormField();
  const props = defineProps<{ class?: HTMLAttributes["class"]; description?: string }>();
  const styles = tv({ base: "text-sm text-muted-foreground" });
</script>
