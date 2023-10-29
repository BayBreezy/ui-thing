<template>
  <CheckboxRoot :id="checkboxId" v-bind="forwarded" :class="styles({ class: props.class })">
    <slot>
      <UICheckboxIndicator :icon="icon" />
    </slot>
  </CheckboxRoot>
</template>

<script lang="ts" setup>
  import { CheckboxRoot, useForwardPropsEmits, useId } from "radix-vue";
  import type { CheckboxRootEmits, CheckboxRootProps } from "radix-vue";

  const props = defineProps<
    CheckboxRootProps & {
      class?: any;
      id?: string;
      icon?: string;
    }
  >();

  const checkboxId = computed(() => props.id || useId());
  const emit = defineEmits<CheckboxRootEmits>();
  const forwarded = useForwardPropsEmits(useOmit(props, ["class", "id", "icon"]), emit);

  const styles = tv({
    base: "peer h-4 w-4 shrink-0 rounded-sm border border-primary aria-[checked=true]:bg-primary aria-[checked=true]:text-primary-foreground data-[disabled]:cursor-not-allowed data-[disabled]:border-primary/50 data-[disabled]:opacity-50 [&>input:disabled]:cursor-not-allowed [&>input]:cursor-pointer",
  });
</script>
