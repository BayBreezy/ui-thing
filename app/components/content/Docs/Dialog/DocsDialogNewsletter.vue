<template>
  <div class="flex justify-center">
    <UiDialog>
      <UiDialogTrigger as-child>
        <UiButton variant="outline">Newsletter</UiButton>
      </UiDialogTrigger>
      <UiDialogContent class="sm:max-w-[400px]">
        <div class="mb-2 flex flex-col items-center gap-2">
          <div
            class="flex size-11 shrink-0 items-center justify-center rounded-full border border-border"
            aria-hidden="true"
          >
            <svg
              class="stroke-foreground"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 32 32"
              aria-hidden="true"
            >
              <circle cx="16" cy="16" r="12" class="fill-background" strokeWidth="8" />
            </svg>
          </div>
          <UiDialogHeader>
            <UiDialogTitle class="sm:text-center">Never miss an update</UiDialogTitle>
            <UiDialogDescription class="sm:text-center">
              Subscribe to receive news and special offers.
            </UiDialogDescription>
          </UiDialogHeader>
        </div>

        <form class="space-y-5">
          <div class="space-y-2">
            <UiVeeInput
              icon="lucide:mail"
              placeholder="hi@yourcompany.com"
              type="email"
              aria-label="Email"
            />
          </div>
          <UiButton type="button" class="w-full"> Subscribe </UiButton>
        </form>

        <p class="text-center text-xs text-muted-foreground">
          By subscribing you agree to our
          <a class="underline hover:no-underline" href="#"> Privacy Policy </a>
          .
        </p>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>
