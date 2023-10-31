<template>
  <Label
    :class="styles({ error: Boolean(error), class: props.class })"
    :for="formItemId"
    v-bind="$attrs"
  >
    <slot>{{ label }}</slot>
  </Label>
</template>

<script lang="ts" setup>
  import { Label } from "radix-vue";
  import type { LabelProps } from "radix-vue";

  defineOptions({ inheritAttrs: false });
  const props = defineProps<LabelProps & { class?: any; label?: string }>();

  const { error, formItemId } = useFormField();

  const styles = tv({
    base: "block text-left text-sm font-medium tracking-tight text-foreground",
    variants: {
      error: {
        true: "text-destructive",
      },
    },
  });
</script>
