<template>
  <div class="flex w-full items-center justify-center">
    <UiDropdownMenu>
      <UiDropdownMenuTrigger as-child>
        <UiButton variant="outline">Checbox items</UiButton>
      </UiDropdownMenuTrigger>
      <UiDropdownMenuContent class="w-48">
        <UiDropdownMenuLabel label="Choose heros" />
        <UiDropdownMenuSeparator />
        <template v-for="h in heroList" :key="h.id">
          <UiDropdownMenuCheckboxItem
            :checked="selectedHeros.includes(h.id)"
            class="mb-1"
            @select="(e) => e.preventDefault()"
            @update:checked="
              selectedHeros.includes(h.id)
                ? selectedHeros.splice(selectedHeros.indexOf(h.id), 1)
                : selectedHeros.push(h.id)
            "
          >
            <div class="flex items-center gap-4">
              <UiAvatar :src="h.image" class="h-6 w-6" :alt="h.name" />
              <span>{{ h.name }}</span>
            </div>
          </UiDropdownMenuCheckboxItem>
        </template>
      </UiDropdownMenuContent>
    </UiDropdownMenu>
  </div>
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
