<template>
  <div class="flex items-center justify-center">
    <form class="mx-auto max-w-md">
      <p class="font-semibold">On by default</p>
      <p class="text-muted-foreground mt-2 mb-4 text-sm">This checkbox will be true by default.</p>
      <fieldset class="space-y-5">
        <UiVeeCheckbox v-model="someVariable" name="terms" label="I will be on by default" />
      </fieldset>
    </form>
  </div>
</template>

<script lang="ts" setup>
  const someVariable = ref(true);
</script>
