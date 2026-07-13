<template>
  <div class="flex w-full max-w-sm flex-col gap-8 py-12">
    <UiMarker>
      <UiMarkerIcon>
        <Icon name="lucide:git-branch" />
      </UiMarkerIcon>
      <UiMarkerContent>Switched to a new branch</UiMarkerContent>
    </UiMarker>
    <UiMarker role="status">
      <UiMarkerIcon>
        <Icon name="lucide:loader-circle" class="animate-spin" data-slot="spinner" />
      </UiMarkerIcon>
      <UiMarkerContent class="shimmer"> Thinking... </UiMarkerContent>
    </UiMarker>
    <UiMarker variant="separator">
      <UiMarkerContent>Conversation compacted</UiMarkerContent>
    </UiMarker>
    <UiMarker>
      <UiMarkerIcon>
        <Icon name="lucide:search" />
      </UiMarkerIcon>
      <UiMarkerContent>Explored 4 files</UiMarkerContent>
    </UiMarker>
  </div>
</template>

<script lang="ts" setup></script>
