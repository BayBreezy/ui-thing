---
title: Listbox
description: A control that allows the user to toggle between checked and not checked from a list of options.
links:
  - title: Reka UI
    href: https://reka-ui.com/docs/components/listbox.html
    icon: "simple-icons:rekaui"
  - title: API Reference
    href: https://reka-ui.com/docs/components/listbox.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="Listbox"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add listbox"}

## Usage

### Basic

::prose-show-case

:DocsListboxBasic

#code

<!-- automd:file src="../../app/components/content/Docs/Listbox/DocsListboxBasic.vue" code lang="vue" -->

```vue [DocsListboxBasic.vue]
<template>
  <div>
    <UiListbox v-model="selected">
      <UiListboxFilter v-model="searchTerm" placeholder="Search..." />
      <UiListboxContent class="max-h-full px-0">
        <UiScrollArea class="h-[300px]">
          <UiListboxGroup class="px-3">
            <template v-if="filteredPeople.length === 0">
              <div class="flex items-center justify-center py-5 text-sm font-medium">
                <span>No results found</span>
              </div>
            </template>
            <template v-else>
              <UiListboxGroupLabel>People</UiListboxGroupLabel>
              <template v-for="p in filteredPeople" :key="p">
                <UiListboxItem :value="p">
                  <span>{{ p }}</span>
                </UiListboxItem>
              </template>
            </template>
          </UiListboxGroup>
        </UiScrollArea>
      </UiListboxContent>
    </UiListbox>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import { useFilter } from "reka-ui";

  const genPeople = async () => {
    return Array.from({ length: 20 }, () => faker.person.fullName());
  };

  const { data: people } = await useAsyncData("listOfPeopleBasic", async () => genPeople(), {
    default: () => [],
  });

  const selected = ref(people.value?.[3]);
  const searchTerm = ref("");

  const { contains } = useFilter({ sensitivity: "base" });
  const filteredPeople = computed(() => people.value.filter((p) => contains(p, searchTerm.value)));
</script>
```

<!-- /automd -->

::

### Objects

::prose-show-case

:DocsListboxObjects

#code

<!-- automd:file src="../../app/components/content/Docs/Listbox/DocsListboxObjects.vue" code lang="vue" -->

```vue [DocsListboxObjects.vue]
<template>
  <div>
    <UiListbox v-model="selected">
      <UiListboxFilter v-model="search" placeholder="Search..." />
      <UiListboxContent>
        <UiListboxGroup>
          <template v-if="filteredPeople?.length > 0">
            <UiListboxGroupLabel>People</UiListboxGroupLabel>
            <template v-for="p in filteredPeople" :key="p.id">
              <UiListboxItem :value="p">
                <div class="flex items-center gap-5">
                  <UiAvatar class="size-8" :src="p.avatar" />
                  <div class="text-sm">
                    <p class="font-medium">{{ p.name }}</p>
                    <p class="text-muted-foreground text-xs">{{ p.email }}</p>
                  </div>
                </div>
              </UiListboxItem>
            </template>
          </template>
          <template v-else>
            <div class="flex items-center justify-center py-5 text-sm font-medium">
              <p>No results found</p>
            </div>
          </template>
        </UiListboxGroup>
      </UiListboxContent>
    </UiListbox>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import { useFilter } from "reka-ui";

  const genPeople = async () => {
    return Array.from({ length: 10 }, () => ({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
    }));
  };

  const { data: people } = await useAsyncData("listOfPeopleObjects", async () => genPeople(), {
    default: () => [],
  });

  const search = ref("");
  const selected = ref(people.value?.[3]);
  const { contains } = useFilter({ sensitivity: "base" });

  const filteredPeople = computed(() =>
    people.value.filter((p) => contains(p.name, search.value) || contains(p.email, search.value))
  );
</script>
```

<!-- /automd -->

::

### Multiple - Strings

::prose-show-case

:DocsListboxStringMultiple

#code

<!-- automd:file src="../../app/components/content/Docs/Listbox/DocsListboxStringMultiple.vue" code lang="vue" -->

```vue [DocsListboxStringMultiple.vue]
<template>
  <div>
    <UiListbox v-model="selected" multiple>
      <UiListboxFilter v-model="search" placeholder="Search..." />
      <UiListboxContent>
        <UiListboxGroup>
          <template v-if="filteredPeople?.length > 0">
            <UiListboxGroupLabel>People</UiListboxGroupLabel>
            <template v-for="p in filteredPeople" :key="p.id">
              <UiListboxItem :value="p">
                <span>{{ p }}</span>
              </UiListboxItem>
            </template>
          </template>
          <template v-else>
            <div class="flex items-center justify-center py-5 text-sm font-medium">
              <p>No results found</p>
            </div>
          </template>
        </UiListboxGroup>
      </UiListboxContent>
    </UiListbox>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";

  const genPeople = async () => {
    return Array.from({ length: 30 }, () => faker.person.fullName());
  };

  const { data: people } = await useAsyncData("multipleString", async () => genPeople(), {
    default: () => [],
  });

  const search = ref("");
  const selected = ref([people.value?.[3]]);

  const filteredPeople = ref<string[]>([]);
  watchDebounced(
    search,
    (v) => {
      if (!v) {
        filteredPeople.value = useCloned(people).cloned.value;
      }
      filteredPeople.value = people.value.filter((p) => p.toLowerCase().includes(v.toLowerCase()));
    },
    { debounce: 300, maxWait: 2000, immediate: true }
  );
</script>
```

<!-- /automd -->

::

### Multiple - Objects

::prose-show-case

:DocsListboxObjectsMultiple

#code

<!-- automd:file src="../../app/components/content/Docs/Listbox/DocsListboxObjectsMultiple.vue" code lang="vue" -->

```vue [DocsListboxObjectsMultiple.vue]
<template>
  <div>
    <UiListbox v-model="selected" multiple>
      <UiListboxFilter v-model="search" placeholder="Search..." />
      <UiListboxContent>
        <UiListboxGroup>
          <template v-if="filteredPeople?.length > 0">
            <UiListboxGroupLabel>People</UiListboxGroupLabel>
            <template v-for="p in filteredPeople" :key="p.id">
              <UiListboxItem :value="p">
                <div class="flex items-center gap-5">
                  <UiAvatar class="size-8" :src="p.avatar" />
                  <div class="text-sm">
                    <p class="font-medium">{{ p.name }}</p>
                    <p class="text-muted-foreground text-xs">{{ p.email }}</p>
                  </div>
                </div>
              </UiListboxItem>
            </template>
          </template>
          <template v-else>
            <div class="flex items-center justify-center py-5 text-sm font-medium">
              <p>No results found</p>
            </div>
          </template>
        </UiListboxGroup>
      </UiListboxContent>
    </UiListbox>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";

  const genPeople = async () => {
    return Array.from({ length: 30 }, () => ({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
    }));
  };

  const { data: people } = await useAsyncData("multipleObjectList", async () => genPeople(), {
    default: () => [],
  });

  const search = ref("");
  const selected = ref([people.value?.[3]]);

  const filteredPeople = computed(() => {
    return people.value?.filter((p) => p.name.toLowerCase().includes(search.value.toLowerCase()));
  });
</script>
```

<!-- /automd -->

::

### Virtualizer - Strings

::prose-show-case

:DocsListboxStringVirtualizer

#code

<!-- automd:file src="../../app/components/content/Docs/Listbox/DocsListboxStringVirtualizer.vue" code lang="vue" -->

```vue [DocsListboxStringVirtualizer.vue]
<template>
  <div>
    <UiListbox>
      <UiListboxContent>
        <UiListboxVirtualizer v-slot="{ option }" :estimate-size="36" :options="people">
          <UiListboxItem :value="option">
            <span>{{ option }}</span>
          </UiListboxItem>
        </UiListboxVirtualizer>
      </UiListboxContent>
    </UiListbox>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";

  const genPeople = async () => {
    return Array.from({ length: 2000 }, () => faker.person.fullName());
  };

  const { data: people } = await useAsyncData("virtualListOfStrings", async () => genPeople(), {
    default: () => [],
  });
</script>
```

<!-- /automd -->

::

### Origin UI

::prose-show-case

:DocsListboxOrigin

#code

<!-- automd:file src="../../app/components/content/Docs/Listbox/DocsListboxOrigin.vue" code lang="vue" -->

```vue [DocsListboxOrigin.vue]
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
```

<!-- /automd -->

::

### Transfer

::prose-show-case

:DocsListboxTransfer

#code

<!-- automd:file src="../../app/components/content/Docs/Listbox/DocsListboxTransfer.vue" code lang="vue" -->

```vue [DocsListboxTransfer.vue]
<template>
  <div class="flex h-[310px] w-full gap-5">
    <UiListbox v-model="selectedList1" class="w-full" multiple highlight-on-hover>
      <UiListboxContent class="h-full max-h-full">
        <UiListboxGroup>
          <UiListboxGroupLabel>List 1</UiListboxGroupLabel>
          <UiGradientDivider class="mt-1 mb-2" />
          <template v-for="(item, i) in list1" :key="i">
            <UiListboxItem :value="item">{{ item }}</UiListboxItem>
          </template>
        </UiListboxGroup>
      </UiListboxContent>
    </UiListbox>
    <div class="flex shrink-0 items-center gap-2">
      <UiButton
        :disabled="!selectedList2.length"
        size="icon"
        variant="outline"
        @click="transferAction('2to1')"
      >
        <Icon name="lucide:chevron-left" class="size-4" />
      </UiButton>
      <UiButton
        :disabled="!selectedList1.length"
        size="icon"
        variant="outline"
        @click="transferAction('1to2')"
      >
        <Icon name="lucide:chevron-right" class="size-4" />
      </UiButton>
    </div>

    <UiListbox v-model="selectedList2" class="w-full" multiple highlight-on-hover>
      <UiListboxContent class="h-full max-h-full">
        <UiListboxGroup>
          <UiListboxGroupLabel>List 2</UiListboxGroupLabel>
          <UiGradientDivider class="mt-1 mb-2" />
          <template v-for="(item, i) in list2" :key="i">
            <UiListboxItem :value="item">{{ item }}</UiListboxItem>
          </template>
        </UiListboxGroup>
      </UiListboxContent>
    </UiListbox>
  </div>
</template>

<script lang="ts" setup>
  const states = [
    "California",
    "Illinois",
    "Maryland",
    "Texas",
    "Florida",
    "Colorado",
    "Connecticut ",
  ];

  const list1 = ref([...states]);
  const list2 = ref<string[]>([]);

  const selectedList1 = ref<string[]>([]);
  const selectedList2 = ref<string[]>([]);

  function transferAction(action: "1to2" | "2to1") {
    const [fromList, toList, selectedList] =
      action === "1to2" ? [list1, list2, selectedList1] : [list2, list1, selectedList2];

    fromList.value = fromList.value.filter((item) => !selectedList.value.includes(item));
    toList.value.push(...selectedList.value);
    selectedList.value = [];
  }
</script>
```

<!-- /automd -->

::
