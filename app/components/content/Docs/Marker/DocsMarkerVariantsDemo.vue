<template>
  <div class="flex w-full max-w-sm flex-col gap-8 py-12">
    <UiMarker>
      <UiMarkerContent>A default marker for inline notes.</UiMarkerContent>
    </UiMarker>
    <UiMarker variant="separator">
      <UiMarkerContent>A separator marker</UiMarkerContent>
    </UiMarker>
    <UiMarker variant="border">
      <UiMarkerContent>A border marker for row boundaries.</UiMarkerContent>
    </UiMarker>
  </div>
</template>

<script lang="ts" setup></script>
