<template>
  <div class="flex justify-center">
    <UiSelect v-model="option">
      <UiSelectTrigger placeholder="Select an option" />
      <UiSelectContent>
        <UiSelectLabel>Fruits</UiSelectLabel>
        <UiSelectSeparator />
        <UiSelectGroup>
          <UiSelectItem v-for="(fruit, i) in fruits" :key="i" :value="fruit" :text="fruit" />
        </UiSelectGroup>
        <UiSelectSeparator />
        <UiSelectLabel>Vegetables</UiSelectLabel>
        <UiSelectSeparator />
        <UiSelectGroup>
          <UiSelectItem v-for="(veg, i) in vegetables" :key="i" :value="veg" :text="veg" />
        </UiSelectGroup>
      </UiSelectContent>
    </UiSelect>
  </div>
</template>

<script lang="ts" setup>
  const option = ref();
  const fruits = ["Apple", "Banana", "Blueberry", "Grapes", "Pineapple"];
  const vegetables = ["Aubergine", "Broccoli", "Carrot", "Courgette", "Leek"];
</script>
