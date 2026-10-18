<template>
  <!--
    One time code in a dialog
    Features: A security card that opens a dialog to confirm a sensitive action, six digit input that checks the code, an error message, a resend link and a verified badge on the page after success
  -->
  <div class="bg-muted/30 relative flex min-h-screen items-center justify-center p-4">
    <UiCard class="w-full max-w-md">
      <UiCardHeader>
        <UiCardTitle>Security</UiCardTitle>
        <UiCardDescription
          >Confirm it is you before you change sensitive settings.</UiCardDescription
        >
      </UiCardHeader>
      <UiCardContent class="space-y-4">
        <div class="flex items-center justify-between gap-3 rounded-lg border p-4">
          <div class="min-w-0">
            <p class="text-sm font-medium">Account email</p>
            <p class="text-muted-foreground truncate text-sm">{{ email }}</p>
          </div>
          <UiBadge v-if="verifiedAt" variant="soft" color="green" shape="pill"
            >Verified {{ verifiedAt }}</UiBadge
          >
          <UiBadge v-else variant="soft" color="amber" shape="pill">Not verified</UiBadge>
        </div>
        <UiDialog v-model:open="open">
          <UiDialogTrigger as-child>
            <UiButton class="w-full">{{
              verifiedAt ? "Verify again" : "Verify to continue"
            }}</UiButton>
          </UiDialogTrigger>
          <UiDialogContent class="sm:max-w-sm">
            <UiDialogHeader class="items-center text-center">
              <div class="bg-primary/10 mb-2 flex size-12 items-center justify-center rounded-full">
                <Icon class="text-primary size-6" name="lucide:lock-keyhole" />
              </div>
              <UiDialogTitle>Confirm it is you</UiDialogTitle>
              <UiDialogDescription
                >Enter the 6 digit code we sent to {{ email }}.</UiDialogDescription
              >
            </UiDialogHeader>
            <div ref="pinWrap" class="flex justify-center">
              <UiPinInput
                :key="pinKey"
                v-model="code"
                :input-count="6"
                otp
                type="number"
                placeholder="0"
                :aria-invalid="!!error"
                aria-label="Verification code"
                @complete="verify"
              />
            </div>
            <p class="text-destructive min-h-5 text-center text-sm" aria-live="polite">
              {{ error }}
            </p>
            <UiDialogFooter class="sm:flex-col sm:space-x-0">
              <UiButton class="w-full" :disabled="code.join('').length < 6" @click="verify"
                >Verify</UiButton
              >
              <UiButton variant="ghost" class="w-full" @click="resend">Send a new code</UiButton>
            </UiDialogFooter>
            <p class="text-muted-foreground border-t pt-3 text-center text-xs">
              Demo: the correct code is {{ validCode }}.
            </p>
          </UiDialogContent>
        </UiDialog>
      </UiCardContent>
    </UiCard>
  </div>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      email?: string;
      validCode?: string;
    }>(),
    {
      email: "john@example.com",
      validCode: "123456",
    }
  );

  const title = "Confirm it is you";
  useSeoMeta({ title });

  const open = ref(false);
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
  const verifiedAt = ref("");

  watch(open, (value) => {
    if (!value) {
      clearCode();
      error.value = "";
    }
  });

  function verify() {
    if (code.value.join("").length < 6) return;
    if (code.value.join("") !== props.validCode) {
      error.value = "That code is not right. Check it and try again.";
      clearCode();
      return;
    }
    verifiedAt.value = "just now";
    open.value = false;
    useSonner.success("Verified", { description: "You can change your settings now." });
  }

  function resend() {
    clearCode();
    error.value = "";
    useSonner.success("A new code is on its way");
  }
</script>
