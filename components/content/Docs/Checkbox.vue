<template>
  <div>
    <Heading
      title="Checkbox"
      subtext="A control that allows the user to toggle between checked and not checked."
      radix-link="https://www.radix-vue.com/components/checkbox.html"
    />
    <div class="flex items-center gap-2">
      <UICheckbox v-model="terms" id="checkbox-terms" />
      <UILabel for="checkbox-terms">
        <span class="ml-2"
          >I agree to the <a href="#" class="text-primary underline">terms and conditions</a></span
        >
      </UILabel>
    </div>

    <div class="items-top mt-5 flex space-x-2">
      <UICheckbox id="terms1" v-model="terms1" />
      <div class="grid gap-1.5 leading-none">
        <UILabel for="terms1"> Accept terms and conditions </UILabel>
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
