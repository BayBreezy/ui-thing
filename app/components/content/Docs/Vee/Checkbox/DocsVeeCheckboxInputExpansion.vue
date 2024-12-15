<template>
  <div class="mx-auto flex max-w-sm flex-col items-start">
    <div>
      <UiVeeCheckbox
        id="checkbox-11"
        v-model="open"
        label="Checkbox with expansion"
        aria-controls="checkbox-input-11"
      />
      <p class="ml-[30px] text-xs text-muted-foreground">
        Check the <span class="font-semibold">Checkbox</span> to expand the input field.
      </p>
    </div>
    <TransitionExpand>
      <UiVeeInput v-if="open" class="mt-5" placeholder="Enter your text here" />
    </TransitionExpand>
  </div>
</template>

<script lang="ts" setup>
  const open = ref(false);
</script>
