<template>
  <div class="hidden w-88 flex-col items-start gap-3 xl:flex 2xl:w-104">
    <div
      class="bg-background ring-foreground/10 isolate flex max-h-[calc(100vh-16rem)] w-full flex-col overflow-hidden rounded-2xl ring-1"
    >
      <TypesetDocsContent />
    </div>
    <UiButton variant="link" size="sm" to="/goodies/typeset" class="text-muted-foreground">
      Read the docs
    </UiButton>
  </div>
</template>
