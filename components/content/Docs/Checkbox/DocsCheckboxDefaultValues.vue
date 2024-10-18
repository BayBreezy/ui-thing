<template>
  <div class="flex flex-col items-center justify-center">
    <div class="items-top mt-5 flex space-x-2">
      <UiCheckbox id="terms1" v-model:checked="someVariable" />
      <div class="grid gap-1.5 leading-none">
        <UiLabel for="terms1"> I will be on by default </UiLabel>
        <p class="text-sm text-muted-foreground">This checkbox will be true by default.</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const someVariable = ref(true);
</script>
