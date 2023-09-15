<template>
  <div>
    <Heading
      title="Combobox"
      subtext="Choose from a list of suggested values with full keyboard support."
      radix-link="https://www.radix-vue.com/components/combobox.html"
    />

    <UICombobox v-model="v">
      <UIComboboxHeader class="relative">
        <UIComboboxInput placeholder="Select a team member" class="pr-9" />
        <UIComboboxTrigger class="absolute inset-y-0 right-3 flex items-center justify-center">
          <Icon name="ph:caret-down" class="h-4 w-4 text-muted-foreground" />
        </UIComboboxTrigger>
      </UIComboboxHeader>
      <UIComboboxContent>
        <UIComboboxEmpty />
        <UIComboboxGroup>
          <UIComboboxItem v-for="(f, i) in fruits" :key="i" :value="f">{{ f }}</UIComboboxItem>
        </UIComboboxGroup>
      </UIComboboxContent>
    </UICombobox>
  </div>
</template>

<script lang="ts" setup>
  const v = ref("");
  const fruits = ["Apple", "Banana", "Blueberry", "Grapes", "Pineapple"];
  const vegetables = ["Aubergine", "Broccoli", "Carrot", "Courgette", "Leek"];
</script>
