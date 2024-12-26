<template>
  <TabsRoot default-value="preview">
    <TabsList class="flex items-center border-b">
      <TabsTrigger as-child value="preview">
        <UiButton
          class="-mb-px rounded-none border-b-2 border-transparent text-base hover:bg-transparent data-[state=active]:border-primary md:text-sm"
          variant="ghost"
        >
          Preview</UiButton
        >
      </TabsTrigger>
      <TabsTrigger value="code" as-child>
        <UiButton
          class="-mb-px rounded-none border-b-2 border-transparent text-base hover:bg-transparent data-[state=active]:border-primary md:text-sm"
          variant="ghost"
        >
          Code</UiButton
        >
      </TabsTrigger>
    </TabsList>
    <TabsContent value="preview">
      <div
        class="mt-3 flex min-h-[300px] items-center justify-center rounded-lg border p-5 lg:p-10"
      >
        <div class="not-prose mx-auto w-full">
          <slot />
        </div>
      </div>
    </TabsContent>
    <TabsContent value="code">
      <div v-if="$slots?.code">
        <slot name="code" mdc-unwrap="p" />
      </div>
    </TabsContent>
  </TabsRoot>
</template>

<script lang="ts" setup>
  import { TabsContent, TabsList, TabsRoot, TabsTrigger } from "radix-vue";
</script>
