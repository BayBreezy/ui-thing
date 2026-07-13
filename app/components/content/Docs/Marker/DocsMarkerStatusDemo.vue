<template>
  <div class="flex w-full max-w-sm flex-col gap-8 py-12">
    <UiMarker role="status">
      <UiMarkerIcon>
        <Icon name="lucide:loader-circle" class="animate-spin" data-slot="spinner" />
      </UiMarkerIcon>
      <UiMarkerContent>Compacting conversation</UiMarkerContent>
    </UiMarker>
    <UiMarker variant="separator" role="status">
      <UiMarkerIcon>
        <Icon name="lucide:loader-circle" class="animate-spin" data-slot="spinner" />
      </UiMarkerIcon>
      <UiMarkerContent>Running tests</UiMarkerContent>
    </UiMarker>
  </div>
</template>

<script lang="ts" setup></script>
