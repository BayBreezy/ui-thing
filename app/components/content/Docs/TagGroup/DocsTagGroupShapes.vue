<template>
  <div class="mx-auto max-w-md space-y-4">
    <UiTagGroup aria-label="Pill tags" shape="pill" color="violet">
      <UiTagGroupItem value="a">Pill</UiTagGroupItem>
      <UiTagGroupItem value="b" color="pink">Pill</UiTagGroupItem>
      <UiTagGroupItem value="c" color="sky">Pill</UiTagGroupItem>
    </UiTagGroup>

    <UiTagGroup aria-label="Rounded tags" shape="rounded" color="violet">
      <UiTagGroupItem value="a">Rounded</UiTagGroupItem>
      <UiTagGroupItem value="b" color="pink">Rounded</UiTagGroupItem>
      <UiTagGroupItem value="c" color="sky">Rounded</UiTagGroupItem>
    </UiTagGroup>

    <!-- A tag can override the shape of the group -->
    <UiTagGroup aria-label="Mixed tags" shape="rounded" variant="outline" color="emerald">
      <UiTagGroupItem value="a">Rounded</UiTagGroupItem>
      <UiTagGroupItem value="b" shape="pill">Pill</UiTagGroupItem>
    </UiTagGroup>
  </div>
</template>
