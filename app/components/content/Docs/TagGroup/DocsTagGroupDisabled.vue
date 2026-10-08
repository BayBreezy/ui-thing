<template>
  <div class="mx-auto max-w-md space-y-4">
    <!-- Disable the whole group -->
    <UiTagGroup aria-label="Locked tags" disabled color="blue" @remove="() => {}">
      <UiTagGroupItem value="a" removable>Locked</UiTagGroupItem>
      <UiTagGroupItem value="b" color="green" removable>Locked</UiTagGroupItem>
    </UiTagGroup>

    <!-- Or only some tags. Disabled tags are skipped by the keyboard. -->
    <UiTagGroup
      v-model="selected"
      aria-label="Options"
      selection-mode="multiple"
      variant="outline"
      color="purple"
    >
      <UiTagGroupItem value="a">Available</UiTagGroupItem>
      <UiTagGroupItem value="b" disabled>Sold out</UiTagGroupItem>
      <UiTagGroupItem value="c">Available</UiTagGroupItem>
      <UiTagGroupItem value="d" disabled>Coming soon</UiTagGroupItem>
    </UiTagGroup>
  </div>
</template>

<script lang="ts" setup>
  const selected = ref<string[]>(["a"]);
</script>
