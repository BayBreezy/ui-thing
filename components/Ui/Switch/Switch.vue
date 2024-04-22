<template>
  <SwitchRoot v-bind="forwarded" :class="styles({ class: props.class })">
    <UiSwitchThumb>
      <slot />
    </UiSwitchThumb>
  </SwitchRoot>
</template>

<script lang="ts" setup>
  import { SwitchRoot, useForwardPropsEmits } from "radix-vue";
  import type { SwitchRootEmits, SwitchRootProps } from "radix-vue";

  const props = withDefaults(
    defineProps<
      SwitchRootProps & {
        class?: any;
        id?: any;
      }
    >(),
    {
      as: "button",
    }
  );
  const emits = defineEmits<SwitchRootEmits>();
  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);

  const styles = tv({
    base: "peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
  });
</script>
