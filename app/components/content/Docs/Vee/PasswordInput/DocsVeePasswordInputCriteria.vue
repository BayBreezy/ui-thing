<template>
  <div class="mx-auto max-w-xs">
    <UiVeePasswordInput
      label="Password"
      name="criteriaPassword"
      placeholder="Password"
      :requirements="['length', 'special']"
      :min-length="12"
      show-requirements
    />
  </div>
</template>
