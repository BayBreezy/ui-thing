<template>
  <button
    type="button"
    :title="locked ? 'Unlock' : 'Lock'"
    :aria-label="locked ? 'Unlock' : 'Lock'"
    :data-locked="locked"
    :class="lockButtonStyles({ class: normalizeClass(props.class) || undefined })"
    @click="toggleLock(param)"
  >
    <Icon :name="locked ? 'lucide:lock' : 'lucide:lock-open'" class="text-foreground size-3.5" />
  </button>
</template>

<script lang="ts">
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  import type { TypesetLockableParam } from "~/utils/typeset/params";

  const lockButtonStyles = tv({
    base: "ring-foreground/60 flex size-4 cursor-pointer items-center justify-center rounded opacity-0 transition-opacity outline-none group-focus-within/picker:opacity-100 group-hover/picker:opacity-100 focus:opacity-100 focus-visible:ring-1 data-[locked=true]:opacity-100 max-md:hidden pointer-coarse:hidden",
  });

  export type TypesetLockButtonProps = {
    param: TypesetLockableParam;
    /** Additional classes to apply to the button. */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = defineProps<TypesetLockButtonProps>();

  const { isLocked, toggleLock } = useTypesetLocks();
  const locked = computed(() => isLocked(props.param));
</script>
