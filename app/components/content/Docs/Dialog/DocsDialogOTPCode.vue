<template>
  <div class="flex justify-center">
    <UiDialog>
      <UiDialogTrigger as-child>
        <UiButton variant="outline">OTP code</UiButton>
      </UiDialogTrigger>
      <UiDialogContent class="max-w-[400px]">
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
          <UiDialogHeader class="mt-4">
            <UiDialogTitle class="sm:text-center">
              {{ hasGuessed ? "Code verified!" : "Enter confirmation code" }}
            </UiDialogTitle>
            <UiDialogDescription class="sm:text-center">
              {{
                hasGuessed
                  ? "Your code has been successfully verified."
                  : `Check your email and enter the code - Try ${CORRECT_CODE}`
              }}
            </UiDialogDescription>
          </UiDialogHeader>
        </div>

        <TransitionFade mode="out-in">
          <div v-if="hasGuessed" class="text-center">
            <UiDialogClose as-child>
              <UiButton type="button" @click="close"> Close </UiButton>
            </UiDialogClose>
          </div>
          <div v-else class="space-y-4">
            <div class="flex justify-center">
              <div>
                <UiVeePinInput v-model="value" otp :input-count="4" @complete="checkCode" />
              </div>
            </div>

            <TransitionSlide>
              <p
                v-if="hasGuessed === false"
                class="text-center text-xs text-muted-foreground"
                role="alert"
                aria-live="polite"
              >
                Invalid code. Please try again.
              </p>
            </TransitionSlide>

            <p class="text-center text-sm">
              <a class="underline hover:no-underline" href="#"> Resend code </a>
            </p>
          </div>
        </TransitionFade>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>

<script lang="ts" setup>
  const CORRECT_CODE = "6548";
  const value = ref([]);
  const hasGuessed = ref<boolean | undefined>(undefined);
  const checkCode = (code: string[]) => {
    const enteredCode = code.join("");
    if (enteredCode === CORRECT_CODE) {
      hasGuessed.value = true;
      value.value = [];
    } else {
      hasGuessed.value = false;
    }
  };
  const close = () => {
    hasGuessed.value = undefined;
    value.value = [];
  };
</script>
