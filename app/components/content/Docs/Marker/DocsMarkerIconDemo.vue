<template>
  <div class="flex w-full max-w-sm flex-col gap-12 py-12">
    <UiMarker>
      <UiMarkerIcon>
        <Icon name="lucide:git-branch" />
      </UiMarkerIcon>
      <UiMarkerContent>Switched to a new branch</UiMarkerContent>
    </UiMarker>
    <UiMarker variant="separator">
      <UiMarkerIcon>
        <Icon name="lucide:search" />
      </UiMarkerIcon>
      <UiMarkerContent>Explored 4 files</UiMarkerContent>
    </UiMarker>
    <UiMarker class="flex-col">
      <UiMarkerIcon>
        <Icon name="lucide:book-open-check" />
      </UiMarkerIcon>
      <UiMarkerContent>Syncing completed</UiMarkerContent>
    </UiMarker>
  </div>
</template>

<script lang="ts" setup></script>
