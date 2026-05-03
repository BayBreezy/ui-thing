<template>
  <div class="flex flex-col items-center justify-center">
    <div class="items-top mt-5 flex space-x-2">
      <UiCheckbox id="default-value" default-value="indeterminate" />
      <div class="mt-0.5 grid gap-1.5 leading-none">
        <UiLabel for="default-value"> Waiting...</UiLabel>
        <p class="text-muted-foreground text-sm">
          This checkbox will be in the indeterminate state by default.
        </p>
      </div>
    </div>
  </div>
</template>
