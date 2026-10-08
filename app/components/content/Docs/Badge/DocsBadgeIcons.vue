<template>
  <div class="mx-auto max-w-md space-y-4">
    <div class="flex flex-wrap items-center justify-center gap-2">
      <UiBadge variant="soft" color="green" size="md" icon="lucide:badge-check">Verified</UiBadge>
      <UiBadge variant="soft" color="amber" size="md" icon="lucide:clock">Pending</UiBadge>
      <UiBadge variant="soft" color="red" size="md" icon="lucide:circle-alert">Failed</UiBadge>
      <UiBadge variant="soft" color="purple" size="md" icon="lucide:sparkles">New</UiBadge>
    </div>

    <div class="flex flex-wrap items-center justify-center gap-2">
      <UiBadge variant="outline" color="blue" size="md" trailing-icon="lucide:arrow-up-right">
        Docs
      </UiBadge>
      <UiBadge variant="solid" color="amber" size="md" trailing-icon="lucide:crown">Pro</UiBadge>
      <!-- The `leading` and `trailing` slots replace the icons -->
      <UiBadge variant="modern" color="pink" size="md">
        <template #leading><Icon name="lucide:flask-conical" class="size-3" /></template>
        Beta
        <template #trailing><Icon name="lucide:chevron-down" class="size-3" /></template>
      </UiBadge>
    </div>
  </div>
</template>
