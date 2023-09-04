<template>
  <Command.Item
    @select="emits('select', $event)"
    :data-value="label"
    :class="styles({ class: props.class })"
    @click="perform?.()"
  >
    <slot>
      <Icon :name="icon" class="h-4 w-4" v-if="icon" />
      <span>{{ label }}</span>
      <UICommandShortcut :shortcut="shortcut" />
    </slot>
  </Command.Item>
</template>

<script lang="ts" setup>
  import { Command } from "vue-command-palette";
  const props = defineProps<{
    label: string;
    shortcut?: string;
    perform?: () => void;
    icon?: string;
    class?: any;
  }>();

  const emits = defineEmits<{
    select: [any];
  }>();

  const styles = tv({
    base: "relative flex cursor-default select-none items-center gap-3 rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground aria-selected:bg-accent aria-selected:text-accent-foreground",
  });
</script>
