---
title: Draggable
description: A wrapper component around Vue Draggable that makes any list of items sortable via drag and drop.
label: New
links:
  - title: Vue Draggable
    href: https://github.com/SortableJS/vue.draggable.next/tree/master
---

## Source code

Click :SourceCodeLink{component="Draggable.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add draggable"}

## Usage

### Simple

::ShowCase

:DocsDraggableSimple

#code

<!-- automd:file src="../../app/components/content/Docs/Draggable/DocsDraggableSimple.vue" code lang="vue" -->

```vue [DocsDraggableSimple.vue]
<template>
  <div class="mx-auto flex max-w-lg flex-col gap-5">
    <div class="grid grid-cols-3 gap-2 md:flex md:items-center">
      <ui-button :disabled="names.length >= 6" size="sm" @click="addName">Add</ui-button>

      <ui-button variant="ghost" size="sm" @click="toggledState = !toggledState">
        {{ toggledState ? "Disable" : "Enable" }}
      </ui-button>
    </div>

    <ui-draggable
      :disabled="!toggledState"
      :list="names"
      item-key="id"
      class="grid grid-cols-1 gap-2"
    >
      <template #item="{ element }">
        <div
          :class="[
            'flex cursor-grab items-center justify-between gap-3 rounded-md border bg-background p-3 shadow-xs',
            toggledState ? '' : 'cursor-not-allowed opacity-50',
          ]"
        >
          <span class="text-sm font-medium">{{ element.name }}</span>
          <ui-button
            v-tippy="'Remove item'"
            :disabled="!toggledState"
            size="icon-sm"
            variant="ghost"
            @click="removeItem(element.id)"
          >
            <icon name="lucide:trash-2" class="size-4 text-destructive" />
            <span class="sr-only">Remove item</span>
          </ui-button>
        </div>
      </template>
    </ui-draggable>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";

  const toggledState = ref(true);

  const { data } = await useAsyncData(async () =>
    Array.from({ length: 3 }, () => ({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
    }))
  );
  const names = ref(data.value || []);
  const addName = () => {
    if (!names.value) names.value = [];
    if (names.value.length >= 6) return;
    names.value?.push({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
    });
  };
  const removeItem = (id: string) => {
    names.value = names.value?.filter((n) => n.id !== id);
  };
</script>
```

<!-- /automd -->

::

### Two Lists

::ShowCase

:DocsDraggableTwoLists

#code

<!-- automd:file src="../../app/components/content/Docs/Draggable/DocsDraggableTwoLists.vue" code lang="vue" -->

```vue [DocsDraggableTwoLists.vue]
<template>
  <div class="mx-auto flex max-w-lg items-start gap-6">
    <ui-draggable
      group="two-lists"
      :list="names1"
      item-key="id"
      class="grid w-full grid-cols-1 gap-2"
      :class="[
        'min-h-5',
        names1.length === 0 ? 'rounded-md border-2 border-dashed border-muted p-4' : '',
      ]"
    >
      <template #item="{ element }">
        <div class="cursor-grab rounded-md border bg-background p-3 shadow-xs">
          <span class="text-sm font-medium">{{ element.name }}</span>
        </div>
      </template>
    </ui-draggable>
    <ui-draggable
      group="two-lists"
      :list="names2"
      item-key="id"
      class="grid w-full grid-cols-1 gap-2"
      :class="[
        'min-h-5',
        names2.length === 0 ? 'rounded-md border-2 border-dashed border-muted p-4' : '',
      ]"
    >
      <template #item="{ element }">
        <div class="cursor-grab rounded-md border bg-background p-3 shadow-xs">
          <span class="text-sm font-medium">{{ element.name }}</span>
        </div>
      </template>
    </ui-draggable>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";

  const { data } = await useAsyncData(async () => {
    const list1 = Array.from({ length: 3 }, () => ({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
    }));
    const list2 = Array.from({ length: 3 }, () => ({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
    }));
    return { list1, list2 };
  });
  const names1 = ref(data.value?.list1 || []);
  const names2 = ref(data.value?.list2 || []);
</script>
```

<!-- /automd -->

::

### Clone

::ShowCase

:DocsDraggableClone

#code

<!-- automd:file src="../../app/components/content/Docs/Draggable/DocsDraggableClone.vue" code lang="vue" -->

```vue [DocsDraggableClone.vue]
<template>
  <div class="mx-auto flex max-w-lg items-start gap-6">
    <ui-draggable
      :group="{
        name: groupeName,
        pull: 'clone',
        put: false,
      }"
      :list="names1"
      item-key="id"
      class="grid w-full grid-cols-1 gap-2"
      :class="[
        'min-h-5',
        names1.length === 0 ? 'rounded-md border-2 border-dashed border-muted p-4' : '',
      ]"
    >
      <template #item="{ element }">
        <div class="cursor-grab rounded-md border bg-background p-3 shadow-xs">
          <span class="text-sm font-medium">{{ element.name }}</span>
        </div>
      </template>
    </ui-draggable>
    <ui-draggable
      :group="groupeName"
      :list="names2"
      item-key="id"
      class="grid w-full grid-cols-1 gap-2"
      :class="[
        'min-h-5',
        names2.length === 0 ? 'rounded-md border-2 border-dashed border-muted p-4' : '',
      ]"
    >
      <template #item="{ element }">
        <div class="cursor-grab rounded-md border bg-background p-3 shadow-xs">
          <span class="text-sm font-medium">{{ element.name }}</span>
        </div>
      </template>
    </ui-draggable>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";

  const groupeName = "clone-list";

  const { data } = await useAsyncData(async () => {
    const list1 = Array.from({ length: 3 }, () => ({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
    }));
    const list2 = Array.from({ length: 3 }, () => ({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
    }));
    return { list1, list2 };
  });
  const names1 = ref(data.value?.list1 || []);
  const names2 = ref(data.value?.list2 || []);
</script>
```

<!-- /automd -->

::

### Custom Clone

::ShowCase

:DocsDraggableCustomClone

#code

<!-- automd:file src="../../app/components/content/Docs/Draggable/DocsDraggableCustomClone.vue" code lang="vue" -->

```vue [DocsDraggableCustomClone.vue]
<template>
  <div class="mx-auto flex max-w-lg items-start gap-6">
    <ui-draggable
      :group="{
        name: groupeName,
        pull: 'clone',
        put: false,
      }"
      :clone="(o) => ({ name: `${o.name} (copy)`, id: faker.string.uuid() })"
      :list="names1"
      item-key="id"
      class="grid w-full grid-cols-1 gap-2"
      :class="[
        'min-h-5',
        names1.length === 0 ? 'rounded-md border-2 border-dashed border-muted p-4' : '',
      ]"
    >
      <template #item="{ element }">
        <div class="cursor-grab rounded-md border bg-background p-3 shadow-xs">
          <span class="text-sm font-medium">{{ element.name }}</span>
        </div>
      </template>
    </ui-draggable>
    <ui-draggable
      :group="groupeName"
      :list="names2"
      item-key="id"
      class="grid w-full grid-cols-1 gap-2"
      :class="[
        'min-h-5',
        names2.length === 0 ? 'rounded-md border-2 border-dashed border-muted p-4' : '',
      ]"
    >
      <template #item="{ element }">
        <div class="cursor-grab rounded-md border bg-background p-3 shadow-xs">
          <span class="text-sm font-medium">{{ element.name }}</span>
        </div>
      </template>
    </ui-draggable>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";

  const groupeName = "custom-clone-list";

  const { data } = await useAsyncData(async () => {
    const list1 = Array.from({ length: 3 }, () => ({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
    }));
    const list2 = Array.from({ length: 3 }, () => ({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
    }));
    return { list1, list2 };
  });
  const names1 = ref(data.value?.list1 || []);
  const names2 = ref(data.value?.list2 || []);
</script>
```

<!-- /automd -->

::

### Clone on `Meta` key

Press the `Meta` key (Command on Mac, Windows key on Windows) while dragging to clone an item.

::ShowCase

:DocsDraggableCloneOnMeta

#code

<!-- automd:file src="../../app/components/content/Docs/Draggable/DocsDraggableCloneOnMeta.vue" code lang="vue" -->

```vue [DocsDraggableCloneOnMeta.vue]
<template>
  <div class="mx-auto flex max-w-lg flex-col gap-6">
    <div class="text-sm font-medium">
      <p v-if="meta" class="text-emerald-500">Items will be cloned</p>
      <p v-else class="text-muted-foreground">Items will be moved</p>
    </div>
    <div class="flex items-start gap-6">
      <ui-draggable
        :group="{
          name: groupeName,
          pull: customCloneFn(),
        }"
        :list="names1"
        item-key="id"
        class="grid w-full grid-cols-1 gap-2"
        :class="[
          'min-h-5',
          names1.length === 0 ? 'rounded-md border-2 border-dashed border-muted p-4' : '',
        ]"
      >
        <template #item="{ element }">
          <div class="cursor-grab rounded-md border bg-background p-3 shadow-xs">
            <span class="text-sm font-medium">{{ element.name }}</span>
          </div>
        </template>
      </ui-draggable>
      <ui-draggable
        :group="groupeName"
        :list="names2"
        item-key="id"
        class="grid w-full grid-cols-1 gap-2"
        :class="[
          'min-h-5',
          names2.length === 0 ? 'rounded-md border-2 border-dashed border-muted p-4' : '',
        ]"
      >
        <template #item="{ element }">
          <div class="cursor-grab rounded-md border bg-background p-3 shadow-xs">
            <span class="text-sm font-medium">{{ element.name }}</span>
          </div>
        </template>
      </ui-draggable>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";

  const groupeName = "clone-on-control-lists";

  const { data } = await useAsyncData(async () => {
    const list1 = Array.from({ length: 3 }, () => ({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
    }));
    const list2 = Array.from({ length: 3 }, () => ({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
    }));
    return { list1, list2 };
  });
  const names1 = ref(data.value?.list1 || []);
  const names2 = ref(data.value?.list2 || []);

  const { meta } = useMagicKeys();
  const customCloneFn = () => {
    return meta?.value ? "clone" : true;
  };
</script>
```

<!-- /automd -->

::

### Handle

::ShowCase

:DocsDraggableHandle

#code

<!-- automd:file src="../../app/components/content/Docs/Draggable/DocsDraggableHandle.vue" code lang="vue" -->

```vue [DocsDraggableHandle.vue]
<template>
  <div class="mx-auto flex max-w-lg flex-col gap-5">
    <div class="grid grid-cols-3 gap-2 md:flex md:items-center">
      <ui-button :disabled="names.length >= 6" size="sm" @click="addName">Add</ui-button>

      <ui-button variant="ghost" size="sm" @click="toggledState = !toggledState">
        {{ toggledState ? "Disable" : "Enable" }}
      </ui-button>
    </div>

    <ui-draggable
      :disabled="!toggledState"
      :list="names"
      handle=".handle"
      item-key="id"
      class="grid grid-cols-1 gap-2"
    >
      <template #item="{ element }">
        <div
          :class="[
            'flex items-center justify-between gap-3 rounded-md border bg-background p-3 shadow-xs',
            toggledState ? '' : 'cursor-not-allowed opacity-50',
          ]"
        >
          <div class="flex items-center gap-3">
            <ui-fancy-icon
              icon="lucide:grip-vertical"
              size="sm"
              class="handle rounded-md border-none"
              :class="toggledState ? 'cursor-move' : 'cursor-not-allowed'"
              aria-hidden="true"
              aria-label="Drag handle"
            />
            <span class="text-sm font-medium">{{ element.name }}</span>
          </div>
          <ui-button
            v-tippy="'Remove item'"
            :disabled="!toggledState"
            size="icon-sm"
            variant="ghost"
            @click="removeItem(element.id)"
          >
            <icon name="lucide:trash-2" class="size-4 text-destructive" />
            <span class="sr-only">Remove item</span>
          </ui-button>
        </div>
      </template>
    </ui-draggable>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";

  const toggledState = ref(true);

  const { data } = await useAsyncData(async () =>
    Array.from({ length: 3 }, () => ({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
    }))
  );
  const names = ref(data.value || []);
  const addName = () => {
    if (!names.value) names.value = [];
    if (names.value.length >= 6) return;
    names.value?.push({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
    });
  };
  const removeItem = (id: string) => {
    names.value = names.value?.filter((n) => n.id !== id);
  };
</script>
```

<!-- /automd -->

::

### Table

::ShowCase

:DocsDraggableTable

#code

<!-- automd:file src="../../app/components/content/Docs/Draggable/DocsDraggableTable.vue" code lang="vue" -->

```vue [DocsDraggableTable.vue]
<template>
  <div class="rounded-md border border-border/50">
    <ui-table>
      <ui-table-header>
        <ui-table-row>
          <ui-table-head class="sticky left-0 w-10 bg-background/50 backdrop-blur-md">
            <span class="sr-only">Drag handle</span>
          </ui-table-head>
          <ui-table-head>Name</ui-table-head>
          <ui-table-head>Country</ui-table-head>
          <ui-table-head>Phone</ui-table-head>
          <ui-table-head>Email</ui-table-head>
          <ui-table-head>
            <span class="sr-only">Table actions</span>
          </ui-table-head>
        </ui-table-row>
      </ui-table-header>
      <ui-draggable handle=".handle" tag="tbody" :list="people" item-key="id">
        <template #item="{ element }">
          <ui-table-row>
            <ui-table-cell class="sticky left-0 w-10 bg-background/50 backdrop-blur-md">
              <ui-fancy-icon
                size="sm"
                class="handle size-7 cursor-grab rounded-md border-none"
                icon="lucide:grip-vertical"
                aria-hidden="true"
                aria-label="Drag handle"
              />
            </ui-table-cell>
            <ui-table-cell>{{ element.name }}</ui-table-cell>
            <ui-table-cell>{{ element.country }}</ui-table-cell>
            <ui-table-cell>{{ element.phone }}</ui-table-cell>
            <ui-table-cell>{{ element.email }}</ui-table-cell>
          </ui-table-row>
        </template>
      </ui-draggable>
    </ui-table>
    <p class="py-4 text-center text-sm text-muted-foreground">Drag and drop to reorder rows</p>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";

  const { data } = await useAsyncData(async () =>
    Array.from({ length: 5 }, () => ({
      id: useId(),
      name: faker.person.fullName(),
      country: faker.location.country(),
      phone: faker.phone.number({ style: "national" }),
      email: faker.internet.email().toLowerCase(),
    }))
  );

  const people = ref(data.value || []);
</script>
```

<!-- /automd -->

::

### Slots

::ShowCase

:DocsDraggableSlots

#code

<!-- automd:file src="../../app/components/content/Docs/Draggable/DocsDraggableSlots.vue" code lang="vue" -->

```vue [DocsDraggableSlots.vue]
<template>
  <div class="mx-auto flex max-w-lg flex-col gap-5">
    <ui-draggable :list="names" item-key="id" class="grid grid-cols-1 gap-2">
      <template #header>
        <div class="py-4">
          <p class="mb-3 text-sm text-muted-foreground">Drag and drop to reorder items</p>
          <ui-gradient-divider />
        </div>
      </template>
      <template #footer>
        <div class="py-4">
          <ui-gradient-divider />
          <p class="mt-3 text-sm text-muted-foreground">Drag and drop to reorder items</p>
        </div>
      </template>
      <template #item="{ element }">
        <div
          :class="[
            'flex cursor-grab items-center justify-between gap-3 rounded-md border bg-background p-3 shadow-xs',
          ]"
        >
          <span class="text-sm font-medium">{{ element.name }}</span>
        </div>
      </template>
    </ui-draggable>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";

  const { data } = await useAsyncData(async () =>
    Array.from({ length: 5 }, () => ({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
    }))
  );
  const names = ref(data.value || []);
</script>
```

<!-- /automd -->

::

### Nested

::ShowCase

:DocsDraggableNested

#code

<!-- automd:file src="../../app/components/content/Docs/Draggable/DocsDraggableNested.vue" code lang="vue" -->

```vue [DocsDraggableNested.vue]
<template>
  <div>
    <DefineNestedDraggable v-slot="{ items }">
      <ui-draggable
        class="min-h-12 border border-dashed p-4 pb-0"
        :list="items"
        item-key="id"
        tag="ul"
        :group="{ name: 'nested' }"
      >
        <template #item="{ element }">
          <li>
            {{ element.name }}
            <nested-draggable :items="element.children || []" />
          </li>
        </template>
      </ui-draggable>
    </DefineNestedDraggable>
    <nested-draggable :items="familyTree" />
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";

  type Items = {
    id: string;
    name: string;
    children?: Items[];
  };
  const [DefineNestedDraggable, NestedDraggable] = createReusableTemplate<{ items: Items[] }>();

  const familyTree = useState(() => [
    {
      id: useId(),
      name: faker.person.fullName(),
      children: [
        { id: useId(), name: faker.person.fullName(), children: [] },
        {
          id: useId(),
          name: faker.person.fullName(),
          children: [
            { id: useId(), name: faker.person.fullName(), children: [] },
            { id: useId(), name: faker.person.fullName(), children: [] },
          ],
        },
      ],
    },
    { id: useId(), name: faker.person.fullName(), children: [] },
    {
      id: useId(),
      name: faker.person.fullName(),
      children: [{ id: useId(), name: faker.person.fullName(), children: [] }],
    },
  ]);
</script>
```

<!-- /automd -->

::
