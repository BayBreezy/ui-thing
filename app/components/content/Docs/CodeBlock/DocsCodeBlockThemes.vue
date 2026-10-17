<template>
  <div class="mx-auto grid w-full max-w-lg gap-4">
    <UiCodeBlock
      :code="code"
      language="ts"
      :themes="{ light: 'vitesse-light', dark: 'vitesse-dark' }"
    >
      <UiCodeBlockHeader>
        <UiCodeBlockTitle text="vitesse" />
      </UiCodeBlockHeader>
      <UiCodeBlockContent />
    </UiCodeBlock>

    <UiCodeBlock
      :code="code"
      language="ts"
      :themes="{ light: 'catppuccin-latte', dark: 'catppuccin-mocha' }"
    >
      <UiCodeBlockHeader>
        <UiCodeBlockTitle text="catppuccin" />
      </UiCodeBlockHeader>
      <UiCodeBlockContent />
    </UiCodeBlock>
  </div>
</template>

<script lang="ts" setup>
  const code = `export function useDebounce<T>(value: Ref<T>, delay = 300) {
  const debounced = shallowRef(value.value);

  watch(value, (next, _, onCleanup) => {
    const timeout = setTimeout(() => (debounced.value = next), delay);
    onCleanup(() => clearTimeout(timeout));
  });

  return debounced;
}`;
</script>
