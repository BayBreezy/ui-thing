<template>
  <div :class="styles({ class: props.class })" v-bind="$attrs">
    <slot name="label">
      <UiFormLabel v-if="label || hint" :label="label" :hint="hint" />
    </slot>
    <UiFormControl>
      <slot />
    </UiFormControl>
    <slot name="description">
      <UiFormDescription v-if="description" :description="description" />
    </slot>
    <slot name="errorMessage">
      <TransitionSlide tag="p">
        <UiFormMessage v-if="!hideMessage" />
      </TransitionSlide>
    </slot>
  </div>
</template>

<script lang="ts">
  import type { InjectionKey } from "vue";

  export const FORM_ITEM_INJECTION_KEY = Symbol() as InjectionKey<string>;
</script>

<script lang="ts" setup>
  defineOptions({ inheritAttrs: false });

  const id = useId();
  provide(FORM_ITEM_INJECTION_KEY, id);

  const props = defineProps<{
    class?: any;
    label?: string;
    description?: string;
    hint?: string;
    hideMessage?: boolean;
  }>();

  const styles = tv({ base: "space-y-1.5" });
</script>
