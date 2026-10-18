<template>
  <!--
    Multi step sign up with a horizontal progress indicator
    Features: Three steps (account, about you, done) with numbered progress, per step validation, back button, team size choice cards, success state
  -->
  <div class="flex min-h-screen items-center justify-center px-5 py-12">
    <div class="w-full max-w-md">
      <ol class="mb-10 flex items-center" aria-label="Sign up progress">
        <li
          v-for="(item, i) in steps"
          :key="item.id"
          class="flex items-center"
          :class="i < steps.length - 1 && 'flex-1'"
          :aria-current="step === item.id ? 'step' : undefined"
        >
          <div class="flex items-center gap-2.5">
            <span
              class="flex size-8 shrink-0 items-center justify-center rounded-full border text-sm font-semibold transition-colors"
              :class="
                step > item.id || step === steps.length
                  ? 'bg-primary text-primary-foreground border-primary'
                  : step === item.id
                    ? 'border-primary text-primary'
                    : 'text-muted-foreground'
              "
            >
              <Icon
                v-if="step > item.id || step === steps.length"
                name="lucide:check"
                class="size-4"
              />
              <template v-else>{{ item.id }}</template>
            </span>
            <span
              class="hidden text-sm font-medium sm:block"
              :class="step >= item.id ? 'text-foreground' : 'text-muted-foreground'"
            >
              {{ item.title }}
            </span>
          </div>
          <div
            v-if="i < steps.length - 1"
            class="mx-3 h-px flex-1 transition-colors"
            :class="step > item.id ? 'bg-primary' : 'bg-border'"
          />
        </li>
      </ol>

      <template v-if="step === 1">
        <div class="space-y-1.5">
          <h1 class="text-2xl font-bold tracking-tight lg:text-3xl">Create your account</h1>
          <p class="text-muted-foreground">Step 1 of 2. Tell us how to sign you in.</p>
        </div>
        <form class="mt-8" @submit="next">
          <fieldset :disabled="isSubmitting" class="grid gap-5">
            <UiVeeInput required label="Name" name="name" placeholder="Jane Doe" />
            <UiVeeInput
              required
              label="Email"
              type="email"
              name="email"
              placeholder="you@example.com"
            />
            <UiVeePasswordInput
              required
              label="Password"
              name="password"
              placeholder="Create a password"
              hint="Must be at least 8 characters."
            />
            <UiButton class="w-full" type="submit">
              Continue
              <Icon name="lucide:arrow-right" class="size-4" />
            </UiButton>
          </fieldset>
        </form>
        <p class="text-muted-foreground mt-8 text-center text-sm">
          Already have an account?
          <NuxtLink class="text-foreground font-semibold underline-offset-4 hover:underline" to="#">
            Log in
          </NuxtLink>
        </p>
      </template>

      <template v-else-if="step === 2">
        <div class="space-y-1.5">
          <h1 class="text-2xl font-bold tracking-tight lg:text-3xl">About you</h1>
          <p class="text-muted-foreground">Step 2 of 2. This helps us tailor your workspace.</p>
        </div>
        <form class="mt-8" @submit="next">
          <fieldset :disabled="isSubmitting" class="grid gap-5">
            <UiVeeInput required label="Company" name="company" placeholder="Acme Inc." />
            <UiVeeSelect required label="Your role" name="role">
              <option value="" disabled selected>Select a role</option>
              <option>Founder</option>
              <option>Engineer</option>
              <option>Designer</option>
              <option>Product manager</option>
              <option>Other</option>
            </UiVeeSelect>
            <div class="grid gap-2">
              <UiLabel>Team size</UiLabel>
              <UiRadioGroup v-model="teamSize" class="grid grid-cols-3 gap-3">
                <label
                  v-for="option in sizes"
                  :key="option"
                  class="flex cursor-pointer items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-sm transition-colors"
                  :class="
                    teamSize === option ? 'border-primary bg-primary/5' : 'hover:bg-accent/50'
                  "
                >
                  <UiRadioGroupItem :value="option" class="sr-only" />
                  {{ option }}
                </label>
              </UiRadioGroup>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <UiButton type="button" variant="outline" @click="step = 1">
                <Icon name="lucide:arrow-left" class="size-4" />
                Back
              </UiButton>
              <UiButton type="submit">Create account</UiButton>
            </div>
          </fieldset>
        </form>
      </template>

      <div v-else class="text-center">
        <div
          class="bg-primary/10 mx-auto mb-5 flex size-14 items-center justify-center rounded-full"
        >
          <Icon name="lucide:party-popper" class="text-primary size-7" />
        </div>
        <h1 class="text-2xl font-bold tracking-tight lg:text-3xl">You're all set</h1>
        <p class="text-muted-foreground mt-2">
          Your account is ready. We sent a confirmation link to your email.
        </p>
        <UiButton class="mt-8 w-full" @click="useSonner.info('Take them to your dashboard here')">
          Go to dashboard
        </UiButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { object, string } from "yup";

  const steps = [
    { id: 1, title: "Account" },
    { id: 2, title: "About you" },
    { id: 3, title: "Done" },
  ];
  const sizes = ["Just me", "2-10", "11+"];

  const step = ref(1);
  const teamSize = ref("2-10");

  const accountSchema = object({
    name: string().required().label("Name").min(3).max(50),
    email: string().email().required().label("Email"),
    password: string().required().label("Password").min(8),
  });
  const profileSchema = object({
    company: string().required().label("Company"),
    role: string().required().label("Role"),
  });

  // Each step validates only its own fields, and values survive the step changing.
  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: computed(() => (step.value === 1 ? accountSchema : profileSchema)),
    keepValuesOnUnmount: true,
  });

  const next = handleSubmit(async (values) => {
    if (step.value === 2) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      useSonner.success("Account created!", { description: `Welcome, ${values.name}.` });
    }
    step.value += 1;
  });
</script>
