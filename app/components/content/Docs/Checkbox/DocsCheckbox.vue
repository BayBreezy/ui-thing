<template>
  <div class="flex flex-col items-center justify-center">
    <div class="flex items-center gap-2">
      <UiCheckbox id="checkbox-terms" v-model:checked="terms" />
      <UiLabel for="checkbox-terms">
        <span class="ml-2"
          >I agree to the <a href="#" class="text-primary underline">terms and conditions</a></span
        >
      </UiLabel>
    </div>

    <div class="items-top mt-5 flex space-x-2">
      <UiCheckbox id="terms1" v-model:checked="terms1" />
      <div class="grid gap-1.5 leading-none">
        <UiLabel for="terms1"> Accept terms and conditions </UiLabel>
        <p class="text-sm text-muted-foreground">
          You agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const terms = ref(false);
  const terms1 = ref(false);
</script>
