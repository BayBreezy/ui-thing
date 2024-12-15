<template>
  <div class="">
    <UiTagsInput v-model="tags">
      <UiTagsInputItem v-for="tag in tags" :key="tag" :value="tag" />
      <UiTagsInputField placeholder="Add a tag..." />
      <UiTagsInputClear />
    </UiTagsInput>
  </div>
</template>

<script lang="ts" setup>
  const tags = ref(["Cars", "House", "Dogs"]);
</script>
