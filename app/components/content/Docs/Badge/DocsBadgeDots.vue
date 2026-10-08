<template>
  <div class="mx-auto max-w-md space-y-4">
    <!-- The `modern` variant is neutral and uses the color for its dot -->
    <div class="flex flex-wrap items-center justify-center gap-2">
      <UiBadge variant="modern" color="green" size="md">Online</UiBadge>
      <UiBadge variant="modern" color="amber" size="md">Away</UiBadge>
      <UiBadge variant="modern" color="red" size="md">Busy</UiBadge>
      <UiBadge variant="modern" color="gray" size="md">Offline</UiBadge>
    </div>

    <!-- Add `dot` to any other variant -->
    <div class="flex flex-wrap items-center justify-center gap-2">
      <UiBadge variant="soft" color="emerald" size="lg" dot>Production</UiBadge>
      <UiBadge variant="soft" color="orange" size="lg" dot>Staging</UiBadge>
      <UiBadge variant="soft" color="sky" size="lg" dot>Development</UiBadge>
    </div>
  </div>
</template>
