<template>
  <Label
    :class="styles({ error: Boolean(error), class: props.class })"
    :for="formItemId"
    v-bind="$attrs"
  >
    <slot
      >{{ label }}
      <span class="ml-auto font-normal text-muted-foreground/80">{{ hint }}</span></slot
    >
  </Label>
</template>

<script lang="ts" setup>
  import { Label } from "radix-vue";
  import type { LabelProps } from "radix-vue";

  defineOptions({ inheritAttrs: false });
  const props = defineProps<LabelProps & { class?: any; label?: string; hint?: string }>();

  const { error, formItemId } = useFormField();

  const styles = tv({
    base: "flex w-full items-center justify-between text-left text-sm font-medium tracking-tight text-foreground hover:cursor-pointer",
    variants: {
      error: {
        true: "text-destructive",
      },
    },
  });
</script>
