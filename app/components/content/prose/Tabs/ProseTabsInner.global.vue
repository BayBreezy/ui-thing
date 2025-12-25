<template>
  <UiTabs v-if="variant === 'separate'" v-model="activeTabIndex" class="not-first:mt-5">
    <UiTabsList>
      <UiTabsTrigger
        v-for="(slot, i) in defaultSlots"
        :key="slot.key"
        :value="i"
        class="items-center gap-2"
      >
        <ProseSmartIcon v-if="icon(slot)" :name="icon(slot)!" :size="14" class="self-center" />
        {{ label(slot) }}
      </UiTabsTrigger>
    </UiTabsList>

    <div
      v-for="(slot, i) in defaultSlots"
      v-show="activeTabIndex === i"
      :key="slot.key"
      class="mt-2"
    >
      <component :is="slot.vnode" class="[&>*:first-child]:mt-0" />
    </div>
  </UiTabs>

  <UiTabs
    v-else-if="variant === 'line'"
    v-model="activeTabIndex"
    class="relative mr-auto w-full not-first:mt-5"
  >
    <div class="flex items-center justify-between overflow-x-auto pb-3">
      <UiTabsList :pill="false" class="relative h-9 w-full justify-start rounded-none border-b p-0">
        <UiTabsTrigger
          v-for="(slot, i) in defaultSlots"
          :key="slot.key"
          class="gap-2"
          :pill="false"
          :value="i"
        >
          <ProseSmartIcon v-if="icon(slot)" :name="icon(slot)!" :size="14" class="self-center" />
          {{ label(slot) }}
        </UiTabsTrigger>
        <UiTabsIndicator />
      </UiTabsList>
    </div>

    <div
      v-for="(slot, i) in defaultSlots"
      v-show="activeTabIndex === i"
      :key="slot.key"
      class="relative space-y-10"
    >
      <component :is="slot.vnode" class="mt-0 [&>*:first-child]:mt-0" />
    </div>
  </UiTabs>

  <UiCard
    v-else-if="variant === 'card'"
    class="gap-0 rounded-lg py-0 not-first:mt-5"
    :class="[inStack && 'mb-0 rounded-none border-none shadow-none']"
  >
    <TabsRoot v-model="activeTabIndex">
      <UiScrollArea orientation="horizontal" class="**:data-[slot='scroll-area-scrollbar']:h-1.5">
        <TabsList class="relative flex w-full p-1">
          <TabsTrigger
            v-for="(slot, i) in defaultSlots"
            :key="slot.key"
            :value="i"
            class="relative z-20 flex cursor-pointer items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium whitespace-nowrap text-muted-foreground transition-all duration-75 hover:text-foreground focus-visible:outline-none data-active:text-foreground"
          >
            <ProseSmartIcon v-if="icon(slot)" :name="icon(slot)!" :size="14" class="shrink-0" />
            <span class="truncate">{{ label(slot) }}</span>
          </TabsTrigger>
          <UiTabsIndicator class="inset-0 size-full px-0 py-1 [&>div]:bg-muted" />
        </TabsList>
      </UiScrollArea>

      <div
        v-for="(slot, i) in defaultSlots"
        v-show="activeTabIndex === i"
        :key="slot.key"
        :value="label(slot)"
        class="mt-0"
        :class="[
          padded && ($slots.default?.()[activeTabIndex]?.type as any).tag !== 'pre' && 'p-3',
        ]"
      >
        <component
          :is="slot.vnode"
          :in-group="true"
          class="mt-0 border-none [&>*:first-child]:mt-0"
        />
      </div>
    </TabsRoot>
  </UiCard>

  <div v-else-if="variant === 'combobox'">
    <UiPopover v-model:open="dropDownOpen">
      <UiPopoverTrigger as-child>
        <UiButton
          variant="outline"
          role="combobox"
          :aria-expanded="dropDownOpen"
          class="justify-between"
          :class="[comboBoxFullWidth ? 'w-full' : 'w-[250px]']"
        >
          <div class="flex items-center gap-2">
            <ProseSmartIcon
              v-if="icon(defaultSlots?.[activeTabIndex])"
              :name="icon(defaultSlots?.[activeTabIndex])!"
              :size="14"
            />
            <span>
              {{ label(defaultSlots?.[activeTabIndex]) }}
            </span>
          </div>
          <Icon class="text-muted-foreground" name="lucide:chevrons-up-down" />
        </UiButton>
      </UiPopoverTrigger>
      <UiPopoverContent class="w-(--reka-popover-trigger-width) p-0">
        <UiCommand>
          <UiCommandInput v-if="!disableSearch" class="h-9" :placeholder="searchPlaceholder" />
          <UiCommandEmpty>{{ searchEmpty }}</UiCommandEmpty>
          <UiCommandList>
            <UiCommandGroup>
              <UiCommandItem
                v-for="(slot, i) in defaultSlots"
                :key="slot.key"
                :value="label(slot)"
                @select="
                  () => {
                    activeTabIndex = i;
                    dropDownOpen = false;
                  }
                "
              >
                <ProseSmartIcon
                  v-if="icon(slot)"
                  :name="icon(slot)!"
                  :size="14"
                  class="mr-2 self-center"
                />
                {{ label(slot) }}
                <Icon
                  name="lucide:check"
                  :class="['ml-auto h-4 w-4', activeTabIndex === i ? 'opacity-100' : 'opacity-0']"
                />
              </UiCommandItem>
            </UiCommandGroup>
          </UiCommandList>
        </UiCommand>
      </UiPopoverContent>
    </UiPopover>

    <div
      v-for="(slot, i) in defaultSlots"
      v-show="activeTabIndex === i"
      :key="slot.key"
      :value="label(slot)"
      class="mt-4"
    >
      <component :is="slot.vnode" :in-group="true" class="[&>*:first-child]:mt-0" />
    </div>
  </div>
</template>
<script lang="ts">
  import { getMaterialFileIcon } from "@baybreezy/file-extension-icon";
  import type { ProseTabsProps } from "./ProseTabs.global.vue";

  export type ProseTabsInnerSlotData = {
    label: string;
    index: number;
  };

  export type ProseTabsInnerProps = ProseTabsProps & {
    /**
     * Data to be used for rendering tabs
     */
    slotsData: ProseTabsInnerSlotData[];
  };
</script>

<script setup lang="ts">
  const { sync } = defineProps<ProseTabsInnerProps>();

  const syncState = useCookie<{ scope: string; value?: string }[]>("tabs-sync-state", {
    default: () => [],
  });

  const syncScopeIndex = computed(() => syncState.value.findIndex((x) => x.scope === sync));

  const activeTabIndexData = ref(0);

  const { items: slotItems } = useDefaultSlotItems({
    mapMeta: ({ props, index }) => {
      const filename = props.filename as string | undefined;
      const language = props.language as string | undefined;
      const meta = props.meta as string | undefined;

      const normalizedLabel = props.label ?? filename ?? `Tab ${index + 1}`;

      // Extract icon from multiple sources:
      // 1. Direct icon prop
      // 2. Icon in meta string (e.g., icon="lucide:terminal")
      // 3. Language-based icon
      let normalizedIcon = props.icon as string | undefined;

      if (!normalizedIcon && meta) {
        const iconMatch = meta.match(/icon="?([a-zA-Z0-9-_:]+)"?/);
        normalizedIcon = iconMatch ? iconMatch[1] : undefined;
      }

      if (!normalizedIcon && language) {
        normalizedIcon = getMaterialFileIcon(language);
      }

      return {
        label: normalizedLabel,
        icon: normalizedIcon,
      };
    },
  });

  const tabItems = computed(() =>
    slotItems.value.map((item) => ({
      key: item.key ?? `${item.index}${item.meta.label}`,
      index: item.index,
      vnode: item.vnode,
      props: item.props,
      label: item.meta.label,
      icon: item.meta.icon,
    }))
  );

  const activeTabIndex = computed<number>({
    get: () => {
      if (sync === undefined || syncScopeIndex.value === -1) return activeTabIndexData.value;

      return (
        tabItems.value.find((item) => item.label === syncState.value[syncScopeIndex.value]?.value)
          ?.index ?? activeTabIndexData.value
      );
    },
    set(index: number) {
      if (sync === undefined) {
        activeTabIndexData.value = index;
        return;
      }

      let scopeIndex = syncScopeIndex.value;

      if (scopeIndex === -1) {
        syncState.value.push({ scope: sync, value: undefined });
        scopeIndex = syncState.value.length - 1;
      }

      const label = tabItems.value[index]?.label;
      if (syncState.value[scopeIndex] !== undefined) {
        syncState.value[scopeIndex]!.value = label;
      }
      activeTabIndexData.value = index;
    },
  });

  const defaultSlots = computed(() => tabItems.value);
  function icon(slot?: (typeof tabItems.value)[number]) {
    return slot?.icon;
  }
  function label(slot?: (typeof tabItems.value)[number]) {
    return slot?.label ?? "";
  }

  const dropDownOpen = ref(false);
</script>
