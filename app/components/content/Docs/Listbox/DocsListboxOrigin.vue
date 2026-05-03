<template>
  <div class="mx-auto grid max-w-xs grid-cols-1 gap-10">
    <div class="flex flex-col gap-2">
      <UiLabel>Listbox with single option</UiLabel>
      <UiListbox highlight-on-hover default-value="react" selection-behavior="replace">
        <UiListboxContent class="bg-background p-1">
          <UiListboxItem
            v-for="(item, index) in frameworks"
            :key="index"
            :value="item.id"
            :disabled="item.disabled"
          >
            {{ item.name }}
          </UiListboxItem>
        </UiListboxContent>
      </UiListbox>
    </div>
    <div class="flex flex-col gap-2">
      <UiLabel>Listbox with multiple option</UiLabel>
      <UiListbox multiple highlight-on-hover :default-value="['react', 'vue']">
        <UiListboxContent class="bg-background p-1">
          <UiListboxItem v-for="(item, index) in frameworks" :key="index" :value="item.id">
            {{ item.name }}
          </UiListboxItem>
        </UiListboxContent>
      </UiListbox>
    </div>
    <div class="flex flex-col gap-2">
      <UiLabel>Listbox with option groups</UiLabel>
      <UiListbox multiple highlight-on-hover :default-value="['react', 'vue']">
        <UiListboxContent class="bg-background p-1">
          <template v-for="(group, index) in groups" :key="index">
            <UiListboxGroup>
              <UiListboxGroupLabel class="text-muted-foreground px-2 py-1.5 text-xs font-medium">{{
                group.title
              }}</UiListboxGroupLabel>
              <UiListboxItem v-for="(item, k) in group.items" :key="k" :value="item.id">
                {{ item.name }}
              </UiListboxItem>
            </UiListboxGroup>
            <UiSeparator v-if="groups.length - 1 != index" class="my-2" />
          </template>
        </UiListboxContent>
      </UiListbox>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const frameworks = [
    { id: "react", name: "React" },
    { id: "vue", name: "Vue" },
    { id: "angular", name: "Angular", disabled: true },
    { id: "svelte", name: "Svelte" },
  ];

  const groups = [
    {
      title: "Veggies",
      items: [
        { id: "carrot", name: "Carrot" },
        { id: "broccoli", name: "Broccoli" },
        { id: "spinach", name: "Spinach" },
      ],
    },
    {
      title: "Proteins",
      items: [
        { id: "chicken", name: "Chicken" },
        { id: "tofu", name: "Tofu" },
        { id: "beans", name: "Beans" },
      ],
    },
    {
      title: "Condiments",
      items: [
        { id: "mayonaise", name: "Mayonaise" },
        { id: "mustard", name: "Mustard" },
      ],
    },
  ];
</script>
