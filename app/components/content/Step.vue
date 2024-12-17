<template>
  <div
    class="before:absolute before:-left-4 before:flex before:h-8 before:w-8 before:items-center before:justify-center before:rounded-full before:bg-secondary before:text-sm before:text-secondary-foreground before:content-[counter(step)] before:[counter-increment:_step]"
  >
    <slot />
  </div>
</template>
