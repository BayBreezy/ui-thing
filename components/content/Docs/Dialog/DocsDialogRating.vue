<template>
  <div class="flex justify-center">
    <UiDialog>
      <UiDialogTrigger as-child>
        <UiButton variant="outline">Rating</UiButton>
      </UiDialogTrigger>
      <UiDialogContent
        class="flex flex-col gap-0 p-0 sm:max-w-[400px] [&>button:last-child]:top-3.5"
      >
        <UiDialogHeader class="contents space-y-0 text-left">
          <UiDialogTitle class="border-b border-border px-6 py-4 text-base">
            Help us improve
          </UiDialogTitle>
          <UiDialogDescription class="sr-only">
            Rate your experience with UI Thing
          </UiDialogDescription>
        </UiDialogHeader>
        <div class="px-6 py-4">
          <form class="space-y-5">
            <div class="space-y-4">
              <div>
                <fieldset class="space-y-4">
                  <legend class="text-lg font-semibold leading-none text-foreground">
                    How hard was it to set up your account?
                  </legend>
                  <UiRadioGroup
                    orientation="horizontal"
                    class="flex gap-0 -space-x-px rounded-lg shadow-sm shadow-black/5"
                  >
                    <label
                      v-for="number in 8"
                      :key="number"
                      :for="`radio-17-r${number}`"
                      class="relative flex size-9 flex-1 cursor-pointer flex-col items-center justify-center gap-3 border border-input text-center text-sm outline-offset-2 transition-colors first:rounded-s-lg last:rounded-e-lg has-[[data-state=checked]]:z-10 has-[[data-disabled]]:cursor-not-allowed has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent has-[[data-disabled]]:opacity-50 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70"
                    >
                      <RadioGroupItem
                        :id="`radio-17-r${number}`"
                        :value="number.toString()"
                        class="sr-only after:absolute after:inset-0"
                      />
                      {{ number }}
                    </label>
                  </UiRadioGroup>
                </fieldset>
                <div class="mt-2 flex justify-between text-xs text-muted-foreground">
                  <p>Very easy</p>
                  <p>Very difficult</p>
                </div>
              </div>

              <UiVeeTextarea
                id="feedback"
                label="Why did you give this rating?"
                placeholder="How can we improve UI Thing?"
                aria-label="Send feedback"
              />
            </div>
            <UiButton type="button" class="w-full"> Send feedback </UiButton>
          </form>
        </div>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>
