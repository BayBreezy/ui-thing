<template>
  <div class="flex items-center border-b px-3" cmdk-input-wrapper>
    <Icon :name="icon || 'lucide:search'" class="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <ComboboxInput
      v-bind="$attrs"
      :type="type ?? 'text'"
      :disabled="disabled"
      auto-focus
      :class="styles({ class: props.class })"
    />
  </div>
</template>

<script lang="ts" setup>
  defineOptions({ inheritAttrs: false });

  const props = defineProps<{
    class?: any;
    icon?: string;
    type?: string;
    disabled?: boolean;
    autoFocus?: boolean;
  }>();

  const styles = tv({
    base: "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
  });
</script>
