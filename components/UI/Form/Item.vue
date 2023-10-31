<template>
  <div :class="styles({ class: props.class })" v-bind="$attrs" v-auto-animate>
    <slot name="label">
      <UIFormLabel :label="label" :hint="hint" />
    </slot>
    <UIFormControl>
      <slot />
    </UIFormControl>
    <slot name="description">
      <UIFormDescription :description="description" />
    </slot>
    <slot name="errorMessage">
      <UIFormMessage />
    </slot>
  </div>
</template>

<script lang="ts">
  import { type InjectionKey } from "vue";

  export const FORM_ITEM_INJECTION_KEY = Symbol() as InjectionKey<string>;
</script>

<script lang="ts" setup>
  import { useId } from "radix-vue";

  defineOptions({ inheritAttrs: false });

  const id = useId();
  provide(FORM_ITEM_INJECTION_KEY, id);

  const props = defineProps<{ class?: any; label?: string; description?: string; hint?: string }>();

  const styles = tv({ base: "space-y-1.5" });
</script>
