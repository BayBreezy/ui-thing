<template>
  <div class="mx-auto grid max-w-sm grid-cols-1 gap-10 divide-y *:pb-10 *:last:pb-0">
    <div class="*:not-first:mt-2">
      <UiLabel :for="id">Input with tags</UiLabel>
      <!-- Take note of raw tags input usage -->
      <TagsInputRoot v-model="tags" class="flex flex-col gap-2">
        <!-- Take note of raw tags input usage -->
        <TagsInputInput :id="id" placeholder="Add a tag" as-child type="text">
          <UiInput />
        </TagsInputInput>
        <div class="flex flex-wrap gap-1">
          <UiTagsInputItem v-for="tag in tags" :key="tag" :value="tag" />
        </div>
      </TagsInputRoot>
    </div>

    <div class="*:not-first:mt-2">
      <UiLabel :for="id + 'some-other'">Input with inner tags</UiLabel>
      <UiTagsInput
        v-model="tags2"
        class="focus-within:border-ring focus-within:ring-ring/50 h-auto p-1 shadow-xs outline-none focus-within:ring-[3px]"
      >
        <UiTagsInputItem v-for="tag in tags2" :key="tag" :value="tag" />

        <UiTagsInputInput
          :id="id + 'some-other'"
          placeholder="Add a tag"
          class="h-7 min-w-[80px] px-2 dark:bg-transparent"
          type="text"
        />
      </UiTagsInput>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const tags = ref(["Cars", "House", "Dogs"]);
  const tags2 = ref(["Cars", "House", "Dogs"]);
  const id = useId();
</script>
