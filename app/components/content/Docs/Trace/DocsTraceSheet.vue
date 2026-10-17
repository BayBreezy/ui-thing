<template>
  <UiTrace class="mx-auto max-w-sm">
    <UiSheet>
      <UiSheetTrigger as-child>
        <button type="button">
          <UiTraceLine>
            <UiTraceIcon>
              <Icon name="lucide:folder-search" class="size-4" />
            </UiTraceIcon>
            <UiTraceTitle>Explored 4 files</UiTraceTitle>
            <UiTraceIcon>
              <Icon name="lucide:chevron-right" class="size-4" />
            </UiTraceIcon>
          </UiTraceLine>
        </button>
      </UiSheetTrigger>
      <UiSheetContent>
        <UiSheetHeader>
          <UiSheetTitle>Explored 4 files</UiSheetTitle>
          <UiSheetDescription> Files read while preparing the response. </UiSheetDescription>
        </UiSheetHeader>
        <ul class="flex flex-col gap-2 px-6 font-mono text-xs">
          <li>apps/v4/lib/docs.ts</li>
          <li>apps/v4/lib/components.ts</li>
          <li>apps/v4/nuxt.config.ts</li>
          <li>apps/v4/package.json</li>
        </ul>
      </UiSheetContent>
    </UiSheet>
  </UiTrace>
</template>

<script lang="ts" setup></script>
