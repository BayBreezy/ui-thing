<template>
  <div class="flex justify-center">
    <UiScrollArea class="max-h-[500px] w-[300px] rounded-md border bg-background">
      <UiTree multiple :items="data" :get-key="(i) => i.email" class="p-2 pr-3">
        <p class="mb-3 font-semibold">Contact List</p>
        <UiTreeVirtualizer v-slot="{ item }" :text-content="(o) => o.email">
          <TreeItem
            v-slot="{ isSelected }"
            v-bind="item.bind"
            :style="{ 'padding-left': item.level > 1 ? `${item.level * 8}px` : '0px' }"
            class="group rounded px-2 py-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-border"
          >
            <div
              class="line-clamp-1 flex w-full cursor-pointer select-none items-center gap-2 px-2"
            >
              <UiAvatar class="size-6" :src="item.value.picture.thumbnail" />
              {{ item.value.name?.first }} {{ item.value.name?.last }}
            </div>
            <TransitionExpand>
              <div
                v-if="isSelected"
                class="ml-[18px] mt-1 flex flex-col gap-1 border-l p-2 pl-2 text-xs"
              >
                <p class="flex items-center gap-3">
                  <span>Email</span>
                  <span class="text-muted-foreground">{{ item.value.email }}</span>
                </p>
                <p class="flex items-center gap-3">
                  <span>Phone</span>
                  <span class="text-muted-foreground">{{ item.value.phone }}</span>
                </p>
              </div>
            </TransitionExpand>
          </TreeItem>
        </UiTreeVirtualizer>
      </UiTree>
    </UiScrollArea>
  </div>
</template>

<script lang="ts" setup>
  const { data } = await useAsyncData(
    "random-users",
    () =>
      $fetch<{ results: Array<any>; info: Record<string, any> }>(
        "https://randomuser.me/api/?results=100"
      ),
    {
      transform: (data) => data.results,
      default: () => [],
    }
  );
</script>
