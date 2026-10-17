<template>
  <div class="mx-auto grid max-w-sm gap-6">
    <UiTrace>
      <UiTraceLine>
        <UiTraceIcon name="lucide:search" />
        <UiTraceTitle>Searched for minimumReleaseAge</UiTraceTitle>
        <UiTraceDescription>default</UiTraceDescription>
      </UiTraceLine>
      <UiTraceLine status="success">
        <UiTraceIcon name="lucide:circle-check" />
        <UiTraceTitle>Ran pnpm install</UiTraceTitle>
      </UiTraceLine>
    </UiTrace>

    <UiTrace>
      <UiTraceLine size="sm">
        <UiTraceIcon name="lucide:search" />
        <UiTraceTitle>Searched for minimumReleaseAge</UiTraceTitle>
        <UiTraceDescription>sm</UiTraceDescription>
      </UiTraceLine>
      <UiTraceLine size="sm" status="warning">
        <UiTraceIcon name="lucide:triangle-alert" />
        <UiTraceTitle>Ran pnpm lint with 2 warnings</UiTraceTitle>
      </UiTraceLine>
    </UiTrace>
  </div>
</template>
