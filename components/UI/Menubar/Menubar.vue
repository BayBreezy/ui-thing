<template>
  <MenubarRoot
    :class="styles({ class: props.class })"
    v-model="localModel"
    :default-value="defaultValue"
    :dir="dir"
    :loop="loop"
  >
    <slot></slot>
  </MenubarRoot>
</template>

<script lang="ts" setup>
  import { type MenubarRootProps, type MenubarRootEmits } from "radix-vue/dist/Menubar/MenubarRoot";
  const props = withDefaults(
    defineProps<{
      defaultValue?: MenubarRootProps["defaultValue"];
      modelValue?: MenubarRootProps["modelValue"];
      dir?: MenubarRootProps["dir"];
      loop?: MenubarRootProps["loop"];
      class?: any;
    }>(),
    {
      loop: true,
    }
  );

  const emits = defineEmits<{
    "update:modelValue": [value: MenubarRootEmits["update:modelValue"]];
  }>();

  const localModel = useVModel(props, "modelValue", emits);

  const styles = tv({
    base: "inline-flex h-10 items-center space-x-1 rounded-md border bg-background p-1",
  });
</script>
