<template>
  <div class="flex items-center justify-center">
    <div class="flex items-center gap-2 [--primary:var(--color-emerald-500)]">
      <UiCheckbox :id class="rounded-full" default-value />
      <UiLabel
        :for="id"
        class="peer-data-[state=checked]:text-muted-foreground after:bg-muted-foreground relative after:absolute after:top-1/2 after:left-0 after:h-px after:w-full after:origin-bottom after:-translate-y-1/2 after:scale-x-0 after:transition-transform after:duration-500 after:ease-in-out peer-data-[state=checked]:after:origin-bottom peer-data-[state=checked]:after:scale-x-100"
      >
        Fancy todo item
      </UiLabel>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const id = useId();
</script>
