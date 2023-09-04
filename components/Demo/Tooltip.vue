<template>
  <div>
    <Heading
      title="Tooltip"
      subtext="A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it."
      radix-link="https://www.radix-vue.com/components/tooltip.html"
    />

    <UITooltip>
      <template #trigger>
        <UITooltipTrigger as-child>
          <UIButton variant="outline">Hover me</UIButton>
        </UITooltipTrigger>
      </template>
      <template #content>
        <UITooltipContent>
          <p>Add to library</p>
        </UITooltipContent>
      </template>
    </UITooltip>
  </div>
</template>

<script lang="ts" setup></script>
