<template>
  <UiTrace class="mx-auto max-w-sm">
    <UiTraceLine>
      <UiTraceIcon>
        <Icon name="lucide:circle-check" class="size-4" />
      </UiTraceIcon>
      <UiTraceTitle>Ran pnpm install</UiTraceTitle>
    </UiTraceLine>
    <UiTraceLine status="error">
      <UiTraceIcon>
        <Icon name="lucide:circle-alert" class="size-4" />
      </UiTraceIcon>
      <UiTraceTitle>Failed to run pnpm lint</UiTraceTitle>
    </UiTraceLine>
    <UiTraceLine status="running">
      <UiTraceIcon>
        <Icon name="lucide:loader-circle" class="size-4 animate-spin" />
      </UiTraceIcon>
      <UiTraceTitle>Running pnpm build</UiTraceTitle>
    </UiTraceLine>
    <UiTraceLine status="pending">
      <UiTraceIcon>
        <Icon name="lucide:circle" class="size-4" />
      </UiTraceIcon>
      <UiTraceTitle>Run pnpm test</UiTraceTitle>
    </UiTraceLine>
  </UiTrace>
</template>

<script lang="ts" setup></script>
