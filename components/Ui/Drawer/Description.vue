<template>
  <DrawerDescription v-bind="props" :class="styles({ class: props.class })">
    <slot>
      {{ props.text }}
    </slot>
  </DrawerDescription>
</template>

<script lang="ts" setup>
  import { DrawerDescription } from "vaul-vue";

  interface Props
    extends /* @vue-ignore */ Partial<Pick<InstanceType<typeof DrawerDescription>, "$props">> {
    class?: any;
    text?: string;
  }

  const props = defineProps<Props>();

  const styles = tv({
    base: "text-sm text-muted-foreground",
  });
</script>
