<template>
  <UiAlert
    icon="lucide:circle-alert"
    icon-class="mt-0.5 size-4 shrink-0 text-red-500 opacity-60"
    class="rounded-lg border border-border px-4 py-3"
  >
    <div class="grow space-y-1">
      <p class="text-sm font-medium">Password does not meet requirements:</p>
      <ul class="list-inside list-disc text-sm text-muted-foreground">
        <li>Minimum 8 characters</li>
        <li>Include a special character</li>
      </ul>
    </div>
  </UiAlert>
</template>
