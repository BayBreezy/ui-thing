<template>
  <div class="grid gap-8 py-10 @4xl:grid-cols-3">
    <div class="flex justify-center">
      <UiPointerHighlight container-class="rounded-[2rem] bg-muted/40 ">
        <UiButton variant="outline" class="m-4! rounded-xl">Container spacing</UiButton>
      </UiPointerHighlight>
    </div>

    <div class="flex justify-center">
      <UiPointerHighlight
        rectangle-class="rounded-2xl border-dashed border-emerald-500/70 shadow-[0_0_0_1px_rgba(16,185,129,0.2)]"
      >
        <div class="bg-card rounded-2xl border px-6 py-4 text-sm font-medium">Custom rectangle</div>
      </UiPointerHighlight>
    </div>

    <div class="flex justify-center">
      <UiPointerHighlight
        pointer-class="text-rose-500 size-6 drop-shadow-[0_0_12px_rgba(244,63,94,0.45)]"
      >
        <div class="bg-primary/10 text-primary rounded-2xl px-6 py-4 text-sm font-medium">
          Custom pointer
        </div>
      </UiPointerHighlight>
    </div>
  </div>
</template>
