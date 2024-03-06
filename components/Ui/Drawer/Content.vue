<template>
  <UiDrawerPortal>
    <slot name="overlay">
      <UiDrawerOverlay />
    </slot>
    <slot name="content">
      <DrawerContent v-bind="{ ...props, ...$attrs }" :class="styles({ class: props.class })">
        <slot name="knob">
          <div
            className="mx-auto shrink-0 cursor-grab active:cursor-grabbing my-5 h-2 w-[60px] rounded-full bg-muted"
          />
        </slot>
        <slot />
      </DrawerContent>
    </slot>
  </UiDrawerPortal>
</template>

<script lang="ts" setup>
  import { DrawerContent } from "vaul-vue";

  defineOptions({ inheritAttrs: false });

  interface Props
    extends /* @vue-ignore */ Partial<Pick<InstanceType<typeof DrawerContent>, "$props">> {}

  const props = defineProps<Props & { class?: any }>();
  const styles = tv({
    base: "fixed bottom-0 left-0 right-0 z-50 mt-24 flex h-auto max-h-[95%] flex-col rounded-t-[10px] border bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/40",
  });
</script>
