<template>
  <div class="grid grid-cols-1 gap-10">
    <div class="mx-auto w-full max-w-xs">
      <UiTree
        v-slot="{ flattenItems }"
        :default-expanded="['Design System', 'Frontend', 'Engineering']"
        :items="items"
        :get-key="(v) => v.name"
        class="flex flex-col"
      >
        <template v-for="item in flattenItems" :key="item._id">
          <UiTreeItem
            v-slot="{ isExpanded, isSelected }"
            :data-folder="item.hasChildren == true || undefined"
            :data-level="item.level"
            v-bind="item.bind"
            :style="{ 'padding-left': `${item.level * 20}px` }"
            class="z-10 outline-hidden select-none not-last:pb-0.5 focus:z-20 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
          >
            <div
              :class="[isSelected ? 'bg-accent' : 'bg-background']"
              class="hover:bg-accent focus-visible:ring-ring/50 flex items-center gap-1 rounded-sm px-2 py-1.5 text-sm transition-colors not-in-data-[folder=true]:ps-7 focus-visible:ring-[3px] [&_svg]:pointer-events-none [&_svg]:shrink-0"
            >
              <template v-if="item.hasChildren">
                <Icon
                  name="lucide:chevron-right"
                  class="text-muted-foreground size-3.5"
                  :class="[
                    isExpanded ? 'rotate-90' : '',
                    'transition-transform duration-200 ease-in-out',
                  ]"
                />
              </template>
              <span class="capitalize">{{ item.value.name }}</span>
            </div>
          </UiTreeItem>
        </template>
      </UiTree>
    </div>

    <div class="mx-auto w-full max-w-xs">
      <UiTree
        v-slot="{ flattenItems }"
        :default-expanded="['Design System', 'Frontend', 'Engineering']"
        :items="items"
        :get-key="(v) => v.name"
        class="flex flex-col"
      >
        <template v-for="item in flattenItems" :key="item._id">
          <UiTreeItem
            v-slot="{ isExpanded, isSelected }"
            :data-folder="item.hasChildren == true || undefined"
            :data-level="item.level"
            v-bind="item.bind"
            :style="{ 'padding-left': `${item.level * 20}px` }"
            class="z-10 outline-hidden select-none not-last:pb-0.5 focus:z-20 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
          >
            <div
              :class="[isSelected ? 'bg-accent' : 'bg-background']"
              class="hover:bg-accent focus-visible:ring-ring/50 flex items-center gap-1 rounded-sm px-2 py-1.5 text-sm transition-colors not-in-data-[folder=true]:ps-7 focus-visible:ring-[3px] [&_svg]:pointer-events-none [&_svg]:shrink-0"
            >
              <template v-if="item.hasChildren">
                <Icon
                  name="lucide:chevron-right"
                  class="text-muted-foreground size-3.5"
                  :class="[
                    isExpanded ? 'rotate-90' : '',
                    'transition-transform duration-200 ease-in-out',
                  ]"
                />
              </template>
              <template v-if="item.hasChildren">
                <Icon v-if="isExpanded" class="text-muted-foreground" name="lucide:folder-open" />
                <Icon v-if="!isExpanded" class="text-muted-foreground" name="lucide:folder" />
              </template>
              <template v-else>
                <Icon class="text-muted-foreground" name="lucide:file" />
              </template>
              <span class="capitalize">{{ item.value.name }}</span>
            </div>
          </UiTreeItem>
        </template>
      </UiTree>
    </div>

    <div class="mx-auto w-full max-w-xs">
      <UiTree
        v-slot="{ flattenItems }"
        :default-expanded="['Design System', 'Frontend', 'Engineering']"
        :items="items"
        :get-key="(v) => v.name"
        class="flex flex-col"
      >
        <template v-for="item in flattenItems" :key="item._id">
          <UiTreeItem
            v-slot="{ isExpanded, isSelected }"
            :data-folder="item.hasChildren == true || undefined"
            :data-level="item.level"
            v-bind="item.bind"
            :style="{ 'padding-left': `${item.level * 20}px` }"
            class="z-10 outline-hidden select-none not-last:pb-0.5 focus:z-20 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
          >
            <div
              :class="[isSelected ? 'bg-accent' : 'bg-background']"
              class="hover:bg-accent focus-visible:ring-ring/50 flex items-center gap-1 rounded-sm px-2 py-1.5 text-sm transition-colors not-in-data-[folder=true]:ps-7 focus-visible:ring-[3px] [&_svg]:pointer-events-none [&_svg]:shrink-0"
            >
              <template v-if="item.hasChildren">
                <Icon v-if="isExpanded" class="text-muted-foreground" name="lucide:folder-open" />
                <Icon v-if="!isExpanded" class="text-muted-foreground" name="lucide:folder" />
              </template>
              <template v-else>
                <Icon class="text-muted-foreground" name="lucide:file" />
              </template>
              <span class="capitalize">{{ item.value.name }}</span>

              <template v-if="item.hasChildren">
                <Icon
                  name="lucide:chevron-right"
                  class="text-muted-foreground ml-auto size-3.5"
                  :class="[
                    isExpanded ? 'rotate-90' : '',
                    'transition-transform duration-200 ease-in-out',
                  ]"
                />
              </template>
            </div>
          </UiTreeItem>
        </template>
      </UiTree>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const designId = useId();
  type Item = {
    id: string;
    name: string;
    children?: Item[];
  };
  const items: Item[] = [
    {
      id: useId(),
      name: "Engineering",
      children: [
        {
          id: useId(),
          name: "Frontend",
          children: [
            {
              id: designId,
              name: "Design System",
              children: [
                { id: useId(), name: "Components" },
                { id: useId(), name: "Tokens" },
                { id: useId(), name: "Guidelines" },
              ],
            },
            { id: useId(), name: "Web Platform" },
          ],
        },
        {
          id: useId(),
          name: "Backend",
          children: [
            { id: useId(), name: "APIs" },
            { id: useId(), name: "Infrastructure" },
          ],
        },
        { id: useId(), name: "Platform Team" },
      ],
    },
    {
      id: useId(),
      name: "Marketing",
      children: [
        { id: useId(), name: "Content" },
        { id: useId(), name: "SEO" },
      ],
    },
    {
      id: useId(),
      name: "Operations",
      children: [
        { id: useId(), name: "HR" },
        { id: useId(), name: "Finance" },
      ],
    },
  ];
</script>
