<template>
  <TabsRoot v-model="tab">
    <TabsList class="relative inline-flex items-center">
      <UiTabsTrigger aria-label="Preview" :pill="false" value="preview"> Preview </UiTabsTrigger>
      <UiTabsTrigger aria-label="Code" :pill="false" value="code"> Code </UiTabsTrigger>
      <UiTabsIndicator class="px-3" />
    </TabsList>
    <LayoutGroup>
      <AnimatePresence mode="wait">
        <Motion
          v-if="tab == 'preview'"
          layout="position"
          :initial="false"
          :animate="{ opacity: 1 }"
          :exit="{ opacity: 0 }"
          :transition="{ duration: 0.2 }"
        >
          <TabsContent force-mount value="preview">
            <div
              class="mt-4 flex min-h-[300px] items-center justify-center rounded-lg border p-3 lg:p-10"
            >
              <div class="mx-auto w-full" :class="[!props.prose ? 'not-prose' : '']">
                <slot />
              </div>
            </div>
          </TabsContent>
        </Motion>
        <Motion
          v-else
          layout="position"
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :exit="{ opacity: 0 }"
          :transition="{ duration: 0.2 }"
        >
          <TabsContent force-mount value="code">
            <slot name="code" mdc-unwrap="p" />
          </TabsContent>
        </Motion>
      </AnimatePresence>
    </LayoutGroup>
  </TabsRoot>
</template>

<script lang="ts" setup>
  import { TabsContent, TabsList, TabsRoot } from "reka-ui";

  const tab = ref("preview");

  const props = defineProps<{
    prose?: boolean;
  }>();
</script>
