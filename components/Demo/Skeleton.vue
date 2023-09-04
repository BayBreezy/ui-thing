<template>
  <div>
    <Heading title="Skeleton" subtext="Displays a callout for user attention." />

    <div class="flex items-center space-x-4">
      <UISkeleton class="h-12 w-12 rounded-full" />
      <div class="space-y-2">
        <UISkeleton class="h-4 w-[250px]" />
        <UISkeleton class="h-4 w-[200px]" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>
