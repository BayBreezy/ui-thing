<template>
  <UiTrace class="mx-auto max-w-sm">
    <!-- Another icon -->
    <UiTraceCollapsible>
      <UiTraceCollapsibleTrigger chevron-icon="lucide:plus">
        <UiTraceLine>
          <UiTraceIcon name="lucide:file-text" />
          <UiTraceTitle>Read package.json</UiTraceTitle>
        </UiTraceLine>
      </UiTraceCollapsibleTrigger>
      <UiTraceCollapsibleContent>
        Found 3 dependencies that are out of date.
      </UiTraceCollapsibleContent>
    </UiTraceCollapsible>

    <!-- No chevron, and no rule on the content -->
    <UiTraceCollapsible>
      <UiTraceCollapsibleTrigger :chevron="false">
        <UiTraceLine>
          <UiTraceIcon name="lucide:file-text" />
          <UiTraceTitle>Read pnpm-lock.yaml</UiTraceTitle>
        </UiTraceLine>
      </UiTraceCollapsibleTrigger>
      <UiTraceCollapsibleContent :bordered="false">
        The lockfile is up to date.
      </UiTraceCollapsibleContent>
    </UiTraceCollapsible>

    <!-- Your own chevron, driven by the open state -->
    <UiTraceCollapsible v-slot="{ open }">
      <UiTraceCollapsibleTrigger>
        <UiTraceLine>
          <UiTraceIcon name="lucide:file-text" />
          <UiTraceTitle>Read tsconfig.json</UiTraceTitle>
        </UiTraceLine>
        <template #chevron>
          <span class="text-xs">{{ open ? "Hide" : "Show" }}</span>
        </template>
      </UiTraceCollapsibleTrigger>
      <UiTraceCollapsibleContent>Strict mode is on.</UiTraceCollapsibleContent>
    </UiTraceCollapsible>
  </UiTrace>
</template>
