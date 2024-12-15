<template>
  <CheckboxRoot v-bind="forwarded" :class="styles({ class: props.class })">
    <slot>
      <Transition enter-active-class="transition" enter-from-class="opacity-0 scale-0">
        <UiCheckboxIndicator :checked="checked" :icon="icon" />
      </Transition>
    </slot>
  </CheckboxRoot>
</template>

<script lang="ts" setup>
  import { CheckboxRoot, useForwardPropsEmits } from "radix-vue";
  import type { CheckboxRootEmits, CheckboxRootProps } from "radix-vue";

  const props = defineProps<
    CheckboxRootProps & {
      /** Custom class(es) to add to the element */
      class?: any;
      /**
       * ID of the checkbox
       */
      id?: string;
      /**
       * Icon to display when the checkbox is checked
       * @default lucide:check
       */
      icon?: string;
    }
  >();

  const emit = defineEmits<CheckboxRootEmits>();
  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "icon"), emit);

  const styles = tv({
    base: "peer h-[18px] w-[18px] shrink-0 rounded-sm border border-primary ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
  });
</script>
