<template>
  <div class="relative overflow-hidden bg-muted/50 py-16 lg:py-24">
    <div
      class="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"
    ></div>
    <Motion
      initial="initial"
      in-view="animate"
      :in-view-options="{ once: true }"
      as-child
      :variants="containerVariant"
    >
      <UiContainer>
        <div class="mx-auto max-w-2xl">
          <Motion as-child :variants="childVariant">
            <div class="mb-8 text-center">
              <h2 class="mb-4 text-3xl font-bold tracking-tight lg:text-4xl">
                Subscribe to our newsletter
              </h2>
              <p class="text-lg text-muted-foreground">
                Get the latest news, articles, and resources delivered to your inbox weekly.
              </p>
            </div>
          </Motion>
          <Motion as-child :variants="childVariant">
            <UiCard class="p-6 lg:p-8">
              <form class="space-y-4">
                <div class="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label for="firstName" class="mb-2 block text-sm font-medium">
                      First name
                    </label>
                    <UiVeeInput
                      id="firstName"
                      type="text"
                      required
                      placeholder="John"
                      aria-label="First name"
                    />
                  </div>
                  <div>
                    <label for="lastName" class="mb-2 block text-sm font-medium">Last name</label>
                    <UiVeeInput
                      id="lastName"
                      type="text"
                      required
                      placeholder="Doe"
                      aria-label="Last name"
                    />
                  </div>
                </div>
                <div>
                  <label for="email" class="mb-2 block text-sm font-medium">Email address</label>
                  <UiVeeInput
                    id="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    aria-label="Email address"
                  />
                </div>
                <div class="flex items-start gap-2">
                  <UiCheckbox id="terms" required />
                  <label for="terms" class="text-sm text-muted-foreground">
                    I agree to receive marketing emails and accept the privacy policy
                  </label>
                </div>
                <UiButton type="submit" class="w-full">Subscribe to Newsletter</UiButton>
              </form>
            </UiCard>
          </Motion>
        </div>
      </UiContainer>
    </Motion>
  </div>
</template>

<script lang="ts" setup>
  import { stagger } from "motion-v";
  import type { MotionProps } from "motion-v";

  const containerVariant: MotionProps["variants"] = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        delayChildren: stagger(0.1),
      },
    },
  };

  const childVariant: MotionProps["variants"] = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  };
</script>
