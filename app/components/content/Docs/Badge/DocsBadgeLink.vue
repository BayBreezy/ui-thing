<template>
  <div class="mx-auto flex max-w-md flex-wrap items-center justify-center gap-2">
    <!-- Badges with a `to`/`href` render a link and badges with `@click` render a button -->
    <UiBadge to="/components/tag-group" variant="soft" color="indigo" size="md" icon="lucide:tags">
      Tag Group
    </UiBadge>
    <UiBadge variant="solid" color="emerald" size="md" icon="lucide:copy" @click="copy">
      {{ copied ? "Copied" : "Copy" }}
    </UiBadge>
  </div>
</template>

<script lang="ts" setup>
  const copied = ref(false);

  const copy = () => {
    copied.value = true;
    setTimeout(() => (copied.value = false), 1500);
  };
</script>
