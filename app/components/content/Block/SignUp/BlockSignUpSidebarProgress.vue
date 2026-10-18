<template>
  <!--
    Multi step sign up with a vertical progress sidebar
    Features: Brand sidebar listing every step with completed state, compact progress bar on mobile, per step validation, invite teammates step, success state
  -->
  <div class="grid min-h-screen lg:grid-cols-[22rem_minmax(0,1fr)]">
    <aside
      class="bg-primary text-primary-foreground relative hidden flex-col justify-between overflow-hidden p-10 lg:flex"
    >
      <div
        class="bg-primary-foreground/10 absolute -right-24 -bottom-24 size-80 rounded-full blur-3xl"
      />
      <div class="relative">
        <div class="flex items-center gap-2 font-semibold">
          <svg
            class="fill-primary-foreground h-6"
            viewBox="0 0 53 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.2997 0L52.0461 28.6301V44H38.6311V34.1553L17.7522 13.3607L13.415 13.3607L13.415 44H0L0 0L23.2997 0ZM38.6311 15.2694V0L52.0461 0V15.2694L38.6311 15.2694Z"
            />
          </svg>
          UI Thing
        </div>

        <ol class="mt-14" aria-label="Sign up progress">
          <li
            v-for="(item, i) in steps"
            :key="item.id"
            class="relative flex gap-4 pb-10 last:pb-0"
            :aria-current="step === item.id ? 'step' : undefined"
          >
            <div
              v-if="i < steps.length - 1"
              class="absolute top-9 bottom-1 left-4 w-px"
              :class="step > item.id ? 'bg-primary-foreground' : 'bg-primary-foreground/25'"
            />
            <span
              class="relative flex size-8 shrink-0 items-center justify-center rounded-full border text-sm font-semibold transition-colors"
              :class="
                step > item.id
                  ? 'bg-primary-foreground text-primary border-primary-foreground'
                  : step === item.id
                    ? 'border-primary-foreground'
                    : 'border-primary-foreground/40 text-primary-foreground/60'
              "
            >
              <Icon v-if="step > item.id" name="lucide:check" class="size-4" />
              <template v-else>{{ item.id }}</template>
            </span>
            <div>
              <p
                class="text-sm font-semibold"
                :class="step >= item.id ? '' : 'text-primary-foreground/60'"
              >
                {{ item.title }}
              </p>
              <p class="text-primary-foreground/60 text-sm">{{ item.description }}</p>
            </div>
          </li>
        </ol>
      </div>

      <p class="text-primary-foreground/60 relative text-sm">
        Need help? Email support@uithing.com
      </p>
    </aside>

    <div class="flex flex-col">
      <div class="border-b p-5 lg:hidden">
        <div class="flex items-center justify-between text-sm">
          <span class="font-semibold">{{ steps[Math.min(step, steps.length) - 1]?.title }}</span>
          <span class="text-muted-foreground"
            >Step {{ Math.min(step, steps.length) }} of {{ steps.length }}</span
          >
        </div>
        <UiProgress
          :model-value="(Math.min(step, steps.length) / steps.length) * 100"
          class="mt-3 h-1.5"
        />
      </div>

      <div class="flex flex-1 items-center justify-center px-5 py-12">
        <div class="w-full max-w-md">
          <template v-if="step === 1">
            <div class="space-y-1.5">
              <h1 class="text-2xl font-bold tracking-tight lg:text-3xl">Your details</h1>
              <p class="text-muted-foreground">
                Start with the basics. You can change these later.
              </p>
            </div>
            <form class="mt-8" @submit="next">
              <fieldset :disabled="isSubmitting" class="grid gap-5">
                <UiVeeInput required label="Name" name="name" placeholder="Jane Doe" />
                <UiVeeInput
                  required
                  label="Work email"
                  type="email"
                  name="email"
                  placeholder="you@company.com"
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
              <NuxtLink
                class="text-foreground font-semibold underline-offset-4 hover:underline"
                to="#"
              >
                Log in
              </NuxtLink>
            </p>
          </template>

          <template v-else-if="step === 2">
            <div class="space-y-1.5">
              <h1 class="text-2xl font-bold tracking-tight lg:text-3xl">Your workspace</h1>
              <p class="text-muted-foreground">This is where your team will collaborate.</p>
            </div>
            <form class="mt-8" @submit="next">
              <fieldset :disabled="isSubmitting" class="grid gap-5">
                <UiVeeInput
                  required
                  label="Workspace name"
                  name="workspace"
                  placeholder="Acme Inc."
                />
                <UiVeeInput
                  required
                  label="Workspace URL"
                  name="slug"
                  placeholder="acme"
                  hint="uithing.com/your-workspace"
                />
                <div class="grid grid-cols-2 gap-3">
                  <UiButton type="button" variant="outline" @click="step = 1">
                    <Icon name="lucide:arrow-left" class="size-4" />
                    Back
                  </UiButton>
                  <UiButton type="submit">Continue</UiButton>
                </div>
              </fieldset>
            </form>
          </template>

          <template v-else-if="step === 3">
            <div class="space-y-1.5">
              <h1 class="text-2xl font-bold tracking-tight lg:text-3xl">Invite your team</h1>
              <p class="text-muted-foreground">Work is better together. You can also skip this.</p>
            </div>
            <form class="mt-8" @submit="next">
              <fieldset :disabled="isSubmitting" class="grid gap-5">
                <UiVeeTextarea
                  label="Email addresses"
                  name="invites"
                  :rows="4"
                  placeholder="jane@company.com, sam@company.com"
                  hint="Separate addresses with commas."
                />
                <div class="grid grid-cols-2 gap-3">
                  <UiButton type="button" variant="outline" @click="step = 2">
                    <Icon name="lucide:arrow-left" class="size-4" />
                    Back
                  </UiButton>
                  <UiButton type="submit">Finish</UiButton>
                </div>
                <UiButton type="button" variant="ghost" @click="skip()">Skip for now</UiButton>
              </fieldset>
            </form>
          </template>

          <div v-else class="text-center">
            <div
              class="bg-primary/10 mx-auto mb-5 flex size-14 items-center justify-center rounded-full"
            >
              <Icon name="lucide:party-popper" class="text-primary size-7" />
            </div>
            <h1 class="text-2xl font-bold tracking-tight lg:text-3xl">Welcome aboard</h1>
            <p class="text-muted-foreground mt-2">
              Your workspace is ready. We sent a confirmation link to your email.
            </p>
            <UiButton
              class="mt-8 w-full"
              @click="useSonner.info('Take them to your dashboard here')"
            >
              Go to dashboard
            </UiButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { object, string } from "yup";

  const steps = [
    { id: 1, title: "Your details", description: "Name, email and password" },
    { id: 2, title: "Your workspace", description: "Name and URL" },
    { id: 3, title: "Invite your team", description: "Optional" },
  ];

  const step = ref(1);

  const schemas = [
    object({
      name: string().required().label("Name").min(3).max(50),
      email: string().email().required().label("Work email"),
      password: string().required().label("Password").min(8),
    }),
    object({
      workspace: string().required().label("Workspace name"),
      slug: string()
        .matches(/^[a-z0-9-]+$/, "Use lowercase letters, numbers and dashes")
        .required()
        .label("Workspace URL"),
    }),
    object({ invites: string().label("Email addresses") }),
  ];

  // Each step validates only its own fields, and values survive the step changing.
  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: computed(() => schemas[Math.min(step.value, 3) - 1]),
    keepValuesOnUnmount: true,
  });

  const next = handleSubmit(async () => {
    if (step.value === 3) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      useSonner.success("Workspace created!");
    }
    step.value += 1;
  });

  const skip = () => {
    step.value = 4;
  };
</script>
