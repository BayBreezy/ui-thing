<template>
  <SwitchRoot
    v-slot="slotProps"
    data-slot="switch"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <UiSwitchThumb>
      <slot v-bind="slotProps" />
    </UiSwitchThumb>
  </SwitchRoot>
</template>

<script lang="ts" setup>
  import { SwitchRoot, useForwardPropsEmits } from "reka-ui";
  import type { SwitchRootEmits, SwitchRootProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = withDefaults(
    defineProps<
      SwitchRootProps & {
        /** Custom class(es) to add to parent element. */
        class?: HTMLAttributes["class"];
        id?: HTMLAttributes["id"];
      }
    >(),
    {
      as: "button",
    }
  );
  const emits = defineEmits<SwitchRootEmits>();
  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);

  const styles = tv({
    base: "peer focus-visible:border-ring focus-visible:ring-ring/50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
  });
</script>
