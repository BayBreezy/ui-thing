<template>
  <div>
    <Heading title="Buttons" subtext="Displays a button or a component that looks like a button." />

    <div class="flex flex-wrap gap-5">
      <UIButton>Default</UIButton>
      <UIButton variant="secondary">Secondary</UIButton>
      <UIButton><Icon class="h-4 w-4" name="lucide:mail" /> Login with Email</UIButton>
      <UIButton loading
        ><Icon class="h-4 w-4 animate-spin" name="lucide:loader-2" /> Please wait</UIButton
      >
      <UIButton variant="outline">Outline</UIButton>
      <UIButton variant="destructive">Destructive</UIButton>
      <UIButton variant="ghost">Ghost</UIButton>
      <UIButton variant="link">Link Btn</UIButton>
      <UIButton @click="toggleMode()" variant="outline" size="icon"
        ><Icon name="lucide:sun"
      /></UIButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const isDark = useDark();
  const toggleMode = useToggle(isDark);
</script>
