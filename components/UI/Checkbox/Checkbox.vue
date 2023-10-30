<template>
  <CheckboxRoot :id="checkboxId" v-bind="forwarded" :class="styles({ class: props.class })">
    <slot>
      <Transition enter-active-class="transition" enter-from-class="opacity-0 scale-0">
        <UICheckboxIndicator :icon="icon" />
      </Transition>
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
    base: "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
  });
</script>
