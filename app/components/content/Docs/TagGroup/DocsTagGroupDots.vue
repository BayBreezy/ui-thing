<template>
  <div class="mx-auto max-w-md space-y-4">
    <UiTagGroup aria-label="Status" variant="modern">
      <UiTagGroupItem value="online" color="green">Online</UiTagGroupItem>
      <UiTagGroupItem value="away" color="amber">Away</UiTagGroupItem>
      <UiTagGroupItem value="busy" color="red">Busy</UiTagGroupItem>
      <UiTagGroupItem value="offline" color="gray">Offline</UiTagGroupItem>
    </UiTagGroup>

    <!-- The `dot` prop adds a dot to any variant -->
    <UiTagGroup aria-label="Environments" size="lg">
      <UiTagGroupItem value="prod" color="emerald" dot>Production</UiTagGroupItem>
      <UiTagGroupItem value="staging" color="orange" dot>Staging</UiTagGroupItem>
      <UiTagGroupItem value="dev" color="sky" dot>Development</UiTagGroupItem>
    </UiTagGroup>
  </div>
</template>
