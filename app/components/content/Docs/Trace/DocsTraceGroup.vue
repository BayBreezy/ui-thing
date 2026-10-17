<template>
  <UiTrace class="mx-auto max-w-sm">
    <UiTraceLine>
      <UiTraceIcon>
        <Icon name="lucide:search" class="size-4" />
      </UiTraceIcon>
      <UiTraceTitle>Searched for minimumReleaseAge</UiTraceTitle>
    </UiTraceLine>
    <UiTraceLine>
      <UiTraceIcon>
        <Icon name="lucide:file-text" class="size-4" />
      </UiTraceIcon>
      <UiTraceTitle>Read pnpm-workspace.yaml</UiTraceTitle>
    </UiTraceLine>
    <UiTraceLine>
      <UiTraceIcon>
        <Icon name="lucide:terminal" class="size-4" />
      </UiTraceIcon>
      <UiTraceTitle>Ran pnpm install</UiTraceTitle>
    </UiTraceLine>
  </UiTrace>
</template>

<script lang="ts" setup></script>
