<template>
  <div class="flex w-full max-w-sm flex-col gap-3 py-12">
    <UiMarker variant="border">
      <UiMarkerIcon>
        <Icon name="lucide:git-branch" />
      </UiMarkerIcon>
      <UiMarkerContent>Switched to release-candidate</UiMarkerContent>
    </UiMarker>
    <UiMarker variant="border">
      <UiMarkerIcon>
        <Icon name="lucide:search" />
      </UiMarkerIcon>
      <UiMarkerContent>Reviewed 8 related files</UiMarkerContent>
    </UiMarker>
    <UiMarker variant="border">
      <UiMarkerIcon>
        <Icon name="lucide:file-text" />
      </UiMarkerIcon>
      <UiMarkerContent>Opened implementation notes</UiMarkerContent>
    </UiMarker>
  </div>
</template>

<script lang="ts" setup></script>
