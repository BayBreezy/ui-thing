<template>
  <div>
    <Heading
      title="Radio Group"
      subtext="A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time."
      radix-link="https://www.radix-vue.com/components/radio-group.html"
    />

    <UIRadioGroup v-model="state" defaultValue="comfortable">
      <div class="flex items-center space-x-2">
        <UIRadioGroupItem value="default" id="r1" />
        <UILabel for="r1">Default</UILabel>
      </div>
      <div class="flex items-center space-x-2">
        <UIRadioGroupItem value="comfortable" id="r2" />
        <UILabel for="r2">Comfortable</UILabel>
      </div>
      <div class="flex items-center space-x-2">
        <UIRadioGroupItem value="compact" id="r3" />
        <UILabel for="r3">Compact</UILabel>
      </div>
    </UIRadioGroup>
  </div>
</template>

<script lang="ts" setup>
  const state = ref("comfortable");
</script>
