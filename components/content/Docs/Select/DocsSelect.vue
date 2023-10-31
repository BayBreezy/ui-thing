<template>
  <div class="flex justify-center">
    <UISelect v-model="option">
      <UISelectTrigger placeholder="Select an option" />
      <UISelectContent>
        <UISelectLabel>Fruits</UISelectLabel>
        <UISelectSeparator />
        <UISelectGroup>
          <UISelectItem v-for="(fruit, i) in fruits" :key="i" :value="fruit" :text="fruit" />
        </UISelectGroup>
        <UISelectSeparator />
        <UISelectLabel>Vegetables</UISelectLabel>
        <UISelectSeparator />
        <UISelectGroup>
          <UISelectItem v-for="(veg, i) in vegetables" :key="i" :value="veg" :text="veg" />
        </UISelectGroup>
      </UISelectContent>
    </UISelect>
  </div>
</template>

<script lang="ts" setup>
  const option = ref();
  const fruits = ["Apple", "Banana", "Blueberry", "Grapes", "Pineapple"];
  const vegetables = ["Aubergine", "Broccoli", "Carrot", "Courgette", "Leek"];
</script>
