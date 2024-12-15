<template>
  <div>
    <Heading
      title="Label"
      subtext="Renders an accessible label associated with controls."
      radix-link="https://www.radix-vue.com/components/label.html"
    />

    <div class="flex items-center space-x-2">
      <UiCheckbox id="label-terms" v-model="terms" />
      <UiLabel for="label-terms">Accept terms and conditions</UiLabel>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const terms = ref(false);
</script>
