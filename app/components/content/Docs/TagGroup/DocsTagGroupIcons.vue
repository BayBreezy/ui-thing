<template>
  <div class="mx-auto max-w-md space-y-4">
    <UiTagGroup aria-label="Leading icons">
      <UiTagGroupItem value="verified" color="green" icon="lucide:badge-check"
        >Verified</UiTagGroupItem
      >
      <UiTagGroupItem value="pending" color="amber" icon="lucide:clock">Pending</UiTagGroupItem>
      <UiTagGroupItem value="failed" color="red" icon="lucide:circle-alert">Failed</UiTagGroupItem>
      <UiTagGroupItem value="new" color="purple" icon="lucide:sparkles">New</UiTagGroupItem>
    </UiTagGroup>

    <UiTagGroup aria-label="Trailing icons" variant="outline">
      <UiTagGroupItem value="docs" color="blue" trailing-icon="lucide:arrow-up-right">
        Docs
      </UiTagGroupItem>
      <UiTagGroupItem value="pro" color="amber" trailing-icon="lucide:crown">Pro</UiTagGroupItem>
      <UiTagGroupItem
        value="beta"
        color="pink"
        icon="lucide:flask-conical"
        trailing-icon="lucide:chevron-down"
      >
        Beta
      </UiTagGroupItem>
    </UiTagGroup>
  </div>
</template>
