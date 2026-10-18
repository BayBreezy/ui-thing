<template>
  <!--
    One time code with a resend timer and attempt limit
    Features: Six digit input that verifies as soon as it is complete, a countdown before you can ask for a new code, a count of attempts left with an error message, a lock after too many wrong codes and a verified state
  -->
  <div class="bg-muted/30 relative flex min-h-screen items-center justify-center p-4">
    <UiCard class="w-full max-w-md">
      <div class="p-6 lg:p-8">
        <div class="mb-6 flex justify-center">
          <div class="bg-primary/10 flex size-14 items-center justify-center rounded-full">
            <Icon
              class="text-primary size-7"
              :name="verified ? 'lucide:shield-check' : 'lucide:mail-check'"
            />
          </div>
        </div>

        <div v-if="verified" class="text-center" role="status">
          <h1 class="mb-2 text-2xl font-bold tracking-tight">You are verified</h1>
          <p class="text-muted-foreground text-sm">Thanks. You can continue to your account.</p>
          <UiButton class="mt-6 w-full" size="lg" @click="reset">Start over</UiButton>
        </div>

        <template v-else>
          <div class="mb-6 text-center">
            <h1 class="mb-2 text-2xl font-bold tracking-tight">Enter your code</h1>
            <p class="text-muted-foreground text-sm">
              We sent a 6 digit code to <strong class="text-foreground">{{ email }}</strong>
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
              :disabled="locked"
              :aria-invalid="!!error"
              class="**:data-[slot=pin-input-input]:size-12"
              aria-label="Verification code"
              @complete="verify"
            />
          </div>

          <p
            class="mt-3 min-h-5 text-center text-sm"
            :class="error ? 'text-destructive' : 'text-muted-foreground'"
            aria-live="polite"
          >
            {{ locked ? "Too many wrong codes. Try again in 15 minutes." : error }}
          </p>

          <UiButton
            class="mt-4 w-full"
            size="lg"
            :disabled="locked || code.join('').length < 6"
            @click="verify"
            >Verify</UiButton
          >

          <p class="text-muted-foreground mt-6 text-center text-sm">
            Did not get a code?
            <button
              v-if="seconds === 0 && !locked"
              type="button"
              class="text-primary font-semibold underline-offset-2 hover:underline"
              @click="resend"
            >
              Send a new code
            </button>
            <span v-else-if="!locked" class="tabular-nums" aria-live="off"
              >Resend in {{ seconds }}s</span
            >
          </p>
          <p
            class="text-muted-foreground mt-4 rounded-md border border-dashed p-2 text-center text-xs"
          >
            Demo: the correct code is {{ validCode }}.
          </p>
        </template>
      </div>
    </UiCard>
  </div>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      email?: string;
      validCode?: string;
      resendSeconds?: number;
      maxAttempts?: number;
    }>(),
    {
      email: "john@example.com",
      validCode: "123456",
      resendSeconds: 30,
      maxAttempts: 5,
    }
  );

  const title = "Verify your code";
  useSeoMeta({ title });

  const code = ref<string[]>([]);
  const pinKey = ref(0);
  const pinWrap = useTemplateRef<HTMLElement>("pinWrap");

  /** The pin input keeps what was typed, so remount it to empty the boxes and focus the first one. */
  function clearCode() {
    code.value = [];
    pinKey.value++;
    nextTick(() => pinWrap.value?.querySelector<HTMLInputElement>("input")?.focus());
  }
  const error = ref("");
  const attempts = ref(0);
  const verified = ref(false);
  const seconds = ref(props.resendSeconds);

  const locked = computed(() => attempts.value >= props.maxAttempts);

  const { pause, resume } = useIntervalFn(() => {
    if (seconds.value > 0) seconds.value--;
    else pause();
  }, 1000);

  function verify() {
    if (locked.value || code.value.join("").length < 6) return;
    if (code.value.join("") === props.validCode) {
      verified.value = true;
      error.value = "";
      return;
    }
    attempts.value++;
    const left = props.maxAttempts - attempts.value;
    error.value =
      left > 0
        ? `That code is not right. ${left} ${left === 1 ? "attempt" : "attempts"} left.`
        : "";
    clearCode();
  }

  function resend() {
    seconds.value = props.resendSeconds;
    clearCode();
    error.value = "";
    resume();
    useSonner.success("A new code is on its way");
  }

  function reset() {
    verified.value = false;
    attempts.value = 0;
    clearCode();
    error.value = "";
    seconds.value = props.resendSeconds;
    resume();
  }
</script>
