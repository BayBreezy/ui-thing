<template>
  <div class="flex w-full max-w-sm flex-col gap-8 py-12">
    <UiMarker as-child>
      <a href="#links-and-buttons">
        <UiMarkerIcon>
          <Icon name="lucide:git-branch" />
        </UiMarkerIcon>
        <UiMarkerContent>View the pull request</UiMarkerContent>
      </a>
    </UiMarker>
    <UiMarker as-child>
      <button
        type="button"
        class="hover:text-foreground transition-colors"
        @click="() => useSonner('You clicked the revert button')"
      >
        <UiMarkerIcon>
          <Icon name="lucide:rotate-ccw" />
        </UiMarkerIcon>
        <UiMarkerContent>Revert this change</UiMarkerContent>
      </button>
    </UiMarker>
  </div>
</template>

<script lang="ts" setup></script>
