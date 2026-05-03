<template>
  <div class="flex justify-center">
    <div class="flex flex-wrap justify-center gap-2">
      <UiBadge>
        <Icon name="lucide:zap" class="-ms-0.5 size-3 opacity-60" aria-hidden="true" />
        Badge
      </UiBadge>
      <UiBadge class="items-baseline gap-1.5">
        Badge
        <span class="text-primary-foreground/60 text-[0.625rem] font-medium"> 73 </span>
      </UiBadge>
      <UiBadge variant="outline" class="gap-1">
        <Icon name="lucide:check" class="size-3 text-emerald-500" aria-hidden="true" />
        Badge
      </UiBadge>
      <UiBadge variant="outline" class="gap-1.5">
        <span class="size-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
        Badge
      </UiBadge>
      <UiBadge variant="outline" class="gap-1.5">
        <span class="size-1.5 rounded-full bg-amber-500" aria-hidden="true" />
        Badge
      </UiBadge>
      <UiBadge variant="outline" class="gap-1.5">
        <span class="size-1.5 rounded-full bg-red-500" aria-hidden="true" />
        Badge
      </UiBadge>
      <UiBadge
        class="has-focus-visible:border-ring has-focus-visible:ring-ring/50 has-data-[state=unchecked]:bg-muted has-data-[state=unchecked]:text-muted-foreground relative outline-none has-focus-visible:ring-[3px]"
      >
        <UiCheckbox :id class="peer sr-only after:absolute after:inset-0" default-checked />
        <div class="hidden items-center justify-center peer-data-[state=checked]:flex">
          <Icon name="lucide:check" class="size-2.5" aria-hidden="true" />
        </div>
        <label :for="id" class="cursor-pointer select-none after:absolute after:inset-0">
          Selectable
        </label>
      </UiBadge>

      <UiBadge v-if="open" class="gap-0 rounded-full">
        Removable
        <button
          class="text-primary-foreground/60 hover:text-primary-foreground focus-visible:border-ring focus-visible:ring-ring/50 -my-px -ms-px -me-1.5 inline-flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-[inherit] p-0 transition-[color,box-shadow] outline-none focus-visible:ring-[3px]"
          @click="open = false"
        >
          <Icon name="lucide:x" class="size-3" aria-hidden="true" />
        </button>
      </UiBadge>

      <UiBadge v-if="tagActive" variant="outline" class="gap-0 rounded-md px-2">
        Tag
        <button
          class="text-foreground/60 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 -my-[5px] -ms-0.5 -me-2 inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-[inherit] p-0 transition-[color,box-shadow] outline-none focus-visible:ring-[3px]"
          aria-label="Delete"
          @click="tagActive = false"
        >
          <Icon name="lucide:x" class="size-3" aria-hidden="true" />
        </button>
      </UiBadge>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const id = useId();

  const open = ref(true);
  const tagActive = ref(true);

  watch(open, (value) => {
    if (!value) {
      setTimeout(() => {
        open.value = true;
      }, 1000);
    }
  });
  watch(tagActive, (value) => {
    if (!value) {
      setTimeout(() => {
        tagActive.value = true;
      }, 1000);
    }
  });
</script>
