<template>
  <div>
    <Heading
      title="Popover"
      subtext="Displays rich content in a portal, triggered by a button."
      radix-link="https://www.radix-vue.com/components/popover.html"
    />

    <UIPopover>
      <UIPopoverTrigger as-child>
        <UIButton variant="outline">Open popover</UIButton>
      </UIPopoverTrigger>
      <UIPopoverContent class="h-80 w-80 p-3">
        <UIPopoverClose />
        <div class="flex h-full flex-col gap-1.5">
          <p class="font-semibold leading-none">Dimensions</p>
          <p class="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
          <div class="h-full w-full grow rounded-md bg-muted"></div>
        </div>
      </UIPopoverContent>
    </UIPopover>
  </div>
</template>

<script lang="ts" setup></script>
