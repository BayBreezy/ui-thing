<template>
  <div :class="styles({ class: props.class })">
    <slot name="label" :error-message="errorMessage" :value="value">
      <UiLabel v-if="label" class="mb-5 leading-none" :class="[errorMessage && 'text-destructive']"
        ><span>{{ label }} <span v-if="required" class="text-destructive">*</span></span></UiLabel
      >
    </slot>
    <UiRadioGroup v-bind="{ ...forwarded, ...$attrs }" v-model="value">
      <slot />
    </UiRadioGroup>
    <div class="flex flex-col gap-1.5">
      <TransitionSlide tag="div" group>
        <slot name="hint" :error-message="errorMessage" :value="value">
          <p
            v-if="hint && !errorMessage"
            key="hint"
            class="mt-1.5 text-sm leading-none text-muted-foreground"
          >
            {{ hint }}
          </p>
        </slot>
        <slot name="errorMessage" :error-message="errorMessage" :value="value">
          <p
            v-if="errorMessage"
            key="errorMessage"
            class="mt-1.5 text-sm leading-none text-destructive"
          >
            {{ errorMessage }}
          </p>
        </slot>
      </TransitionSlide>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useForwardProps } from "radix-vue";
  import type { RadioGroupRootProps } from "radix-vue";

  const props = defineProps<
    RadioGroupRootProps & {
      label?: string;
      hint?: string;
      id?: string;
      rules?: any;
      validateOnMount?: boolean;
      class?: any;
      name: string;
    }
  >();

  const forwarded = useForwardProps(props);
  const styles = tv({
    base: "flex flex-col",
  });

  defineOptions({ inheritAttrs: false });

  const { errorMessage, value } = useField(() => props.name, props.rules, {
    initialValue: props.modelValue,
    label: props.label,
    validateOnMount: props.validateOnMount,
    type: "radio",
    syncVModel: true,
  });
</script>
