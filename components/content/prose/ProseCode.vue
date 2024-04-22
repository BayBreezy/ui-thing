<template>
  <div class="relative">
    <div class="absolute right-3 top-2">
      <UiButton variant="outline" size="icon" class="h-7 w-7" @click="copyCode()">
        <Icon name="lucide:copy" />
      </UiButton>
    </div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    code?: string;
    language?: string;
    filename?: string;
    highlights?: Array<number>;
    meta?: string;
  }>();

  const copyCode = () => {
    const el = document.createElement("textarea");
    el.value = props.code || "";
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    useSonner.success("", {
      description: "Copied to clipboard",
      duration: 3000,
    });
  };
</script>
