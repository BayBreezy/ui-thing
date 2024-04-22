<template>
  <UiContextMenu>
    <UiContextMenuTrigger as-child>
      <div
        class="mx-auto flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm"
      >
        Right click for check items menu
      </div>
    </UiContextMenuTrigger>
    <UiContextMenuContent class="w-52">
      <UiContextMenuLabel class="my-1" label="Choose your hero(s)" />
      <UiContextMenuSeparator />
      <UiContextMenuGroup>
        <UiContextMenuCheckboxItem
          v-for="hero in heroList"
          :key="hero.id"
          inset
          class="mb-1"
          :checked="selectedHeros.includes(hero.id)"
          @select="(e) => e.preventDefault()"
          @click="
            selectedHeros.includes(hero.id)
              ? selectedHeros.splice(selectedHeros.indexOf(hero.id), 1)
              : selectedHeros.push(hero.id)
          "
        >
          <div class="flex items-center gap-4">
            <UiAvatar :src="hero.image" class="h-6 w-6" :alt="hero.name" />
            <span>{{ hero.name }}</span>
          </div>
        </UiContextMenuCheckboxItem>
      </UiContextMenuGroup>
    </UiContextMenuContent>
  </UiContextMenu>
</template>

<script lang="ts" setup>
  const heroList = [
    {
      name: "Batman",
      id: "1",
      image:
        "https://static.dc.com/dc/files/default_images/Char_Profile_Batman_20190116_5c3fc4b40faec2.47318964.jpg",
    },
    {
      name: "Superman",
      id: "2",
      image: "https://s26162.pcdn.co/wp-content/uploads/2023/02/superman-1240x692.jpeg",
    },
    {
      name: "Hulk",
      id: "3",
      image:
        "https://a1cf74336522e87f135f-2f21ace9a6cf0052456644b80fa06d4f.ssl.cf2.rackcdn.com/images/characters/large/800/The-Hulk.The-Incredible-Hulk.webp",
    },
  ];
  const selectedHeros = ref<string[]>([]);
</script>
