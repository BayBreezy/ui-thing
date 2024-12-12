<template>
  <div class="flex justify-center">
    <UiDialog>
      <UiDialogTrigger as-child>
        <UiButton variant="outline">Feedback</UiButton>
      </UiDialogTrigger>
      <UiDialogContent class="max-w-[430px]">
        <UiDialogHeader>
          <UiDialogTitle>Send us feedback</UiDialogTitle>
          <UiDialogDescription>
            Watch <a class="text-foreground hover:underline" href="#">tutorials</a>, read Origin
            UI's <a class="text-foreground hover:underline" href="#">documentation</a>, or join our
            <a class="text-foreground hover:underline" href="#"> Discord </a> for community help.
          </UiDialogDescription>
        </UiDialogHeader>
        <form class="space-y-5">
          <UiTextarea
            id="feedback"
            placeholder="How can we improve Origin UI?"
            aria-label="Send feedback"
          />
          <div class="flex flex-col sm:flex-row sm:justify-end">
            <UiButton type="button">Send feedback</UiButton>
          </div>
        </form>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>
