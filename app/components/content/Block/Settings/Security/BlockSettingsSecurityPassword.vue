<template>
  <!--
    Change password card with a live requirements checklist
    Features: Password inputs with show and hide, strength meter, requirement checklist that updates as you type, confirm match validation
  -->
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>{{ props.title }}</UiCardTitle>
      <UiCardDescription>{{ props.description }}</UiCardDescription>
    </UiCardHeader>
    <form @submit.prevent="onSubmit">
      <UiCardContent class="space-y-6">
        <fieldset :disabled="isSubmitting" class="grid gap-5">
          <UiVeePasswordInput name="current" label="Current password" />
          <UiVeePasswordInput name="password" label="New password" />
          <UiVeePasswordInput name="confirm" label="Confirm new password" />
        </fieldset>

        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <UiProgress :model-value="(score / requirements.length) * 100" class="h-1.5" />
            <span class="text-muted-foreground w-16 text-right text-xs font-medium">
              {{ strengthLabel }}
            </span>
          </div>
          <ul class="grid gap-2 text-sm sm:grid-cols-2">
            <li v-for="req in checks" :key="req.label" class="flex items-center gap-2">
              <span
                class="flex size-4 items-center justify-center rounded-full"
                :class="req.passed ? 'bg-primary text-primary-foreground' : 'bg-muted'"
              >
                <Icon v-if="req.passed" name="lucide:check" class="size-3" />
              </span>
              <span :class="req.passed ? 'text-foreground' : 'text-muted-foreground'">
                {{ req.label }}
              </span>
            </li>
          </ul>
        </div>
      </UiCardContent>
      <UiCardFooter class="justify-end gap-2 border-t">
        <UiButton type="button" variant="outline" @click="resetForm()">Cancel</UiButton>
        <UiButton type="submit" :disabled="isSubmitting">Update password</UiButton>
      </UiCardFooter>
    </form>
  </UiCard>
</template>

<script lang="ts" setup>
  import { object, ref as yupRef, string } from "yup";
  import type { InferType } from "yup";

  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
    }>(),
    {
      title: "Password",
      description: "Choose a strong password you don't use anywhere else.",
    }
  );

  const requirements = [
    { label: "At least 8 characters", test: (v: string) => v.length >= 8 },
    { label: "One uppercase letter", test: (v: string) => /[A-Z]/.test(v) },
    { label: "One number", test: (v: string) => /\d/.test(v) },
    { label: "One special character", test: (v: string) => /[^A-Za-z0-9]/.test(v) },
  ];

  const schema = object({
    current: string().required().label("Current password"),
    password: string()
      .required()
      .test("strong", "Password does not meet all requirements", (v) =>
        requirements.every((req) => req.test(v ?? ""))
      )
      .label("New password"),
    confirm: string()
      .oneOf([yupRef("password")], "Passwords must match")
      .required()
      .label("Confirmation"),
  });

  const { handleSubmit, isSubmitting, resetForm, values } = useForm<InferType<typeof schema>>({
    validationSchema: schema,
  });

  const checks = computed(() =>
    requirements.map((req) => ({ label: req.label, passed: req.test(values.password ?? "") }))
  );
  const score = computed(() => checks.value.filter((req) => req.passed).length);
  const strengthLabel = computed(
    () => ["Too weak", "Weak", "Fair", "Good", "Strong"][score.value] ?? "Too weak"
  );

  const onSubmit = handleSubmit(async () => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    resetForm();
    useSonner.success("Password updated", {
      description: "You'll be asked to sign in again on your other devices.",
    });
  });
</script>
