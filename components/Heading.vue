<template>
  <div :class="headingStyles({ class: props.class })">
    <slot name="title">
      <h3 class="text-2xl font-semibold">
        {{ title }}
      </h3>
    </slot>
    <slot name="subtext">
      <p class="mt-1 text-muted-foreground">{{ subtext }}</p>
    </slot>

    <slot name="actions">
      <div class="flex flex-wrap items-center gap-2">
        <a
          v-if="radixLink"
          class="mt-5 inline-flex items-center gap-1 rounded-md bg-muted p-1 px-2 text-xs font-medium"
          target="_blank"
          :href="radixLink"
          ><Icon name="simple-icons:radixui" size="12" /> Radix Vue</a
        >
      </div>
    </slot>
    <slot />
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    title?: string;
    subtext?: string;
    class?: any;
    radixLink?: string;
  }>();

  const headingStyles = tv({
    base: "mb-6 border-b pb-5",
  });
</script>
