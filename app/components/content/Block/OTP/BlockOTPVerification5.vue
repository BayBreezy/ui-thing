<template>
  <!--
    Phone number verification in two steps
    Features: A phone step with a country code select and number validation, a code step that shows the number with a change number link, resend with a countdown, a wrong code message and a verified state
  -->
  <div class="bg-muted/30 relative flex min-h-screen items-center justify-center p-4">
    <UiCard class="w-full max-w-md">
      <div class="p-6 lg:p-8">
        <div class="mb-6 flex justify-center">
          <div class="bg-primary/10 flex size-14 items-center justify-center rounded-full">
            <Icon
              class="text-primary size-7"
              :name="step === 'done' ? 'lucide:circle-check' : 'lucide:smartphone'"
            />
          </div>
        </div>

        <form v-if="step === 'phone'" class="grid gap-5" novalidate @submit.prevent="sendCode">
          <div class="text-center">
            <h1 class="mb-2 text-2xl font-bold tracking-tight">Verify your phone</h1>
            <p class="text-muted-foreground text-sm">
              We will text you a 6 digit code. Message and data rates may apply.
            </p>
          </div>
          <div class="grid gap-2">
            <UiLabel for="phone-number">Phone number</UiLabel>
            <div class="flex gap-2">
              <UiSelect v-model="country">
                <UiSelectTrigger class="w-28" aria-label="Country code"
                  ><UiSelectValue
                /></UiSelectTrigger>
                <UiSelectContent>
                  <UiSelectItem v-for="item in countries" :key="item.code" :value="item.code"
                    >{{ item.flag }} {{ item.code }}</UiSelectItem
                  >
                </UiSelectContent>
              </UiSelect>
              <UiInput
                id="phone-number"
                v-model="phone"
                type="tel"
                inputmode="tel"
                autocomplete="tel-national"
                placeholder="555 010 2030"
                :aria-invalid="!!phoneError"
              />
            </div>
            <p v-if="phoneError" class="text-destructive text-sm">{{ phoneError }}</p>
          </div>
          <UiButton type="submit" size="lg" class="w-full">Send code</UiButton>
        </form>

        <div v-else-if="step === 'code'" class="grid gap-5">
          <div class="text-center">
            <h1 class="mb-2 text-2xl font-bold tracking-tight">Enter the code</h1>
            <p class="text-muted-foreground text-sm">
              Sent to <strong class="text-foreground">{{ country }} {{ phone }}</strong>
              <button
                type="button"
                class="text-primary ml-2 font-medium underline-offset-2 hover:underline"
                @click="changeNumber"
              >
                Change number
              </button>
            </p>
          </div>
          <div ref="pinWrap" class="flex justify-center">
            <UiPinInput
              :key="pinKey"
              v-model="code"
              :input-count="6"
              otp
              type="number"
              placeholder="0"
              :aria-invalid="!!codeError"
              aria-label="Verification code"
              @complete="verify"
            />
          </div>
          <p class="text-destructive min-h-5 text-center text-sm" aria-live="polite">
            {{ codeError }}
          </p>
          <UiButton size="lg" class="w-full" :disabled="code.join('').length < 6" @click="verify"
            >Verify phone</UiButton
          >
          <p class="text-muted-foreground text-center text-sm">
            <button
              v-if="seconds === 0"
              type="button"
              class="text-primary font-semibold underline-offset-2 hover:underline"
              @click="resend"
            >
              Text me a new code
            </button>
            <span v-else class="tabular-nums">Text me a new code in {{ seconds }}s</span>
          </p>
          <p class="text-muted-foreground rounded-md border border-dashed p-2 text-center text-xs">
            Demo: the correct code is {{ validCode }}.
          </p>
        </div>

        <div v-else class="text-center" role="status">
          <h1 class="mb-2 text-2xl font-bold tracking-tight">Phone verified</h1>
          <p class="text-muted-foreground text-sm">
            {{ country }} {{ phone }} is now linked to your account.
          </p>
          <UiButton variant="outline" class="mt-6 w-full" @click="changeNumber"
            >Use a different number</UiButton
          >
        </div>
      </div>
    </UiCard>
  </div>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      validCode?: string;
      resendSeconds?: number;
    }>(),
    {
      validCode: "123456",
      resendSeconds: 30,
    }
  );

  const title = "Verify your phone";
  useSeoMeta({ title });

  const countries = [
    { code: "+1", flag: "🇺🇸" },
    { code: "+44", flag: "🇬🇧" },
    { code: "+49", flag: "🇩🇪" },
    { code: "+61", flag: "🇦🇺" },
  ];

  const step = ref<"phone" | "code" | "done">("phone");
  const country = ref("+1");
  const phone = ref("");
  const phoneError = ref("");
  const code = ref<string[]>([]);
  const pinKey = ref(0);
  const pinWrap = useTemplateRef<HTMLElement>("pinWrap");

  /** The pin input keeps what was typed, so remount it to empty the boxes and focus the first one. */
  function clearCode() {
    code.value = [];
    pinKey.value++;
    nextTick(() => pinWrap.value?.querySelector<HTMLInputElement>("input")?.focus());
  }
  const codeError = ref("");
  const seconds = ref(0);

  const { pause, resume } = useIntervalFn(
    () => {
      if (seconds.value > 0) seconds.value--;
      else pause();
    },
    1000,
    { immediate: false }
  );

  function startTimer() {
    seconds.value = props.resendSeconds;
    resume();
  }

  function sendCode() {
    const digits = phone.value.replace(/[\s()-]/g, "");
    if (!/^\d{7,12}$/.test(digits)) {
      phoneError.value = "Enter a phone number with 7 to 12 digits.";
      return;
    }
    phoneError.value = "";
    step.value = "code";
    startTimer();
  }

  function verify() {
    if (code.value.join("").length < 6) return;
    if (code.value.join("") === props.validCode) {
      step.value = "done";
      codeError.value = "";
      pause();
      return;
    }
    codeError.value = "That code is not right. Check the text and try again.";
    clearCode();
  }

  function resend() {
    clearCode();
    codeError.value = "";
    startTimer();
    useSonner.success("A new code is on its way");
  }

  function changeNumber() {
    step.value = "phone";
    clearCode();
    codeError.value = "";
    pause();
  }
</script>
