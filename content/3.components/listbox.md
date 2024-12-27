---
title: Listbox
description: A control that allows the user to toggle between checked and not checked from a list of options.
links:
  - title: Radix-Vue
    href: https://www.radix-vue.com/components/listbox.html
    icon: "simple-icons:radixui"
  - title: API Reference
    href: https://www.radix-vue.com/components/listbox.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="Listbox"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add listbox
```

## Usage

### Basic

::ShowCase

:DocsListboxBasic

#code

<!-- automd:file src="../../app/components/content/Docs/Listbox/DocsListboxBasic.vue" code lang="vue" -->

```vue [DocsListboxBasic.vue]
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
    return Array.from({ length: 20 }, () => faker.person.fullName());
  };

  const { data: people } = await useAsyncData("listOfPeopleBasic", async () => genPeople(), {
    default: () => [],
  });

  const search = ref("");
  const selected = ref(people.value?.[3]);

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

### Objects

::ShowCase

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
                    <p class="text-xs text-muted-foreground">{{ p.email }}</p>
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

  const filteredPeople = computed(() => {
    return people.value?.filter((p) => p.name.toLowerCase().includes(search.value.toLowerCase()));
  });
</script>
```

<!-- /automd -->

::

### Multiple - Strings

::ShowCase

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

::ShowCase

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
                    <p class="text-xs text-muted-foreground">{{ p.email }}</p>
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

::ShowCase

:DocsListboxStringVirtualizer

#code

<!-- automd:file src="../../app/components/content/Docs/Listbox/DocsListboxStringVirtualizer.vue" code lang="vue" -->

```vue [DocsListboxStringVirtualizer.vue]
<template>
  <div>
    <UiListbox>
      <UiListboxContent>
        <UiListboxVirtualizer v-slot="{ option }" :options="people">
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
