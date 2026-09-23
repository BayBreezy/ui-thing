<template>
  <div class="mx-auto max-w-xs">
    <UiVeePasswordInput
      label="Password"
      name="customPassword"
      placeholder="Password"
      :requirements
      show-strength
      show-requirements
    />
  </div>
</template>

<script lang="ts" setup>
  import type {
    PasswordRequirement,
    PasswordRequirementKey,
  } from "@/components/Ui/Vee/PasswordInput.vue";

  // Mix built-in keys with your own criteria
  const requirements: (PasswordRequirementKey | PasswordRequirement)[] = [
    "length",
    "number",
    { text: "No spaces", test: (v) => v.length > 0 && !/\s/.test(v) },
    {
      text: "Not a common password",
      test: (v) => v.length > 0 && !/^(password|12345678)/i.test(v),
    },
  ];
</script>
