<template>
  <div class="mx-auto flex max-w-[350px] flex-col items-center justify-center gap-10">
    <div class="flex items-start gap-2">
      <UiCheckbox :id="id" :aria-describedby="`${id}-description`" />
      <div class="grid grow gap-2">
        <UiLabel :for="id" hint="(Sublabel)" class="justify-start"> Label </UiLabel>
        <p :id="`${id}-description`" class="text-muted-foreground text-xs">
          You can use this checkbox with a label and a description.
        </p>
      </div>
    </div>

    <div class="flex items-start gap-2">
      <UiCheckbox :id="id2" :aria-describedby="`${id2}-description`" class="order-1" />
      <div class="grid grow gap-2">
        <UiLabel :for="id2" hint="(Sublabel)" class="justify-start"> Label </UiLabel>
        <p :id="`${id2}-description`" class="text-muted-foreground text-xs">
          You can use this checkbox with a label and a description.
        </p>
      </div>
    </div>

    <div
      class="border-input has-data-[state=checked]:border-primary/50 relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none"
    >
      <UiCheckbox
        :id="id3"
        :aria-describedby="`${id3}-description`"
        class="order-1 after:absolute after:inset-0"
      />
      <div class="grid grow gap-2">
        <UiLabel :for="id3" hint="(Sublabel)" class="justify-start"> Label </UiLabel>
        <p :id="`${id3}-description`" class="text-muted-foreground text-xs">
          A short description goes here
        </p>
      </div>
    </div>

    <div
      class="border-input has-data-[state=checked]:border-primary/50 relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none"
    >
      <UiCheckbox
        :id="id4"
        class="order-1 after:absolute after:inset-0"
        :aria-describedby="`${id4}-description`"
      />
      <div class="flex grow items-start gap-3">
        <Icon name="logos:mastercard" class="size-6" />
        <div class="grid gap-2">
          <UiLabel :for="id4" hint="(Sublabel)" class="justify-start"> Label </UiLabel>
          <p :id="`${id4}-description`" class="text-muted-foreground text-xs">
            A short description goes here.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const id = useId();
  const id2 = useId();
  const id3 = useId();
  const id4 = useId();
</script>
