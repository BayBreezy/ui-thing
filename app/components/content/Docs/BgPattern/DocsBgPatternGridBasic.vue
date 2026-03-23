<template>
  <div
    class="relative mx-auto flex h-80 w-full items-center justify-center overflow-hidden rounded-lg border"
  >
    <span
      class="pointer-events-none relative z-10 bg-linear-to-b from-foreground to-foreground/30 bg-clip-text text-center text-5xl leading-none font-bold tracking-tight whitespace-pre-wrap text-transparent"
    >
      Background Pattern
    </span>
    <UiBgPatternGrid class="absolute inset-0" />
  </div>
</template>
