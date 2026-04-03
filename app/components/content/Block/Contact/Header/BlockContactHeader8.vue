<template>
  <!-- 
    Gradient hero contact section
    Features: Full-width gradient background, centered form, social links, animated blobs
  -->
  <div
    class="relative overflow-hidden bg-linear-to-br from-primary/10 via-background to-primary/5 py-20"
  >
    <!-- Animated background blobs -->
    <div class="absolute inset-0 overflow-hidden">
      <Motion
        :variants="{
          initial: { scale: 0.8, opacity: 0.3 },
          animate: {
            scale: [0.8, 1, 0.8],
            opacity: [0.3, 0.5, 0.3],
            transition: {
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          },
        }"
        initial="initial"
        animate="animate"
        class="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-primary/20 blur-3xl"
      />
      <Motion
        :variants="{
          initial: { scale: 0.8, opacity: 0.3 },
          animate: {
            scale: [0.8, 1.2, 0.8],
            opacity: [0.3, 0.4, 0.3],
            transition: {
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            },
          },
        }"
        initial="initial"
        animate="animate"
        class="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-primary/15 blur-3xl"
      />
    </div>

    <Motion
      initial="initial"
      while-in-view="animate"
      :in-view-options="{ once: true }"
      as-child
      :variants="{
        initial: { opacity: 0 },
        animate: {
          opacity: 1,
          transition: {
            when: 'beforeChildren',
            delayChildren: stagger(0.1),
          },
        },
      }"
    >
      <UiContainer class="relative z-10">
        <div class="mx-auto max-w-[600px] text-center">
          <Motion
            as="h2"
            :variants="childVariant"
            class="mb-4 text-4xl font-bold lg:mb-6 lg:text-5xl"
          >
            Let's start a conversation
          </Motion>
          <Motion
            as="p"
            :variants="childVariant"
            class="mb-10 text-lg text-muted-foreground lg:text-xl"
          >
            We're always happy to hear from you. Send us a message and we'll respond as soon as
            possible.
          </Motion>

          <Motion :variants="childVariant" as-child>
            <UiCard class="shadow-xs">
              <UiCardContent class="flex flex-col gap-6">
                <form @submit="submit">
                  <fieldset :disabled="isSubmitting" class="grid gap-5">
                    <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
                      <UiVeeInput label="First name" placeholder="John" name="firstName" />
                      <UiVeeInput label="Last name" placeholder="Doe" name="lastName" />
                    </div>
                    <UiVeeInput
                      label="Email"
                      placeholder="john@example.com"
                      type="email"
                      name="email"
                    />
                    <UiVeeInput label="Phone (optional)" type="tel" name="phone" />
                    <UiVeeTextarea
                      :rows="4"
                      label="Message"
                      placeholder="Your message..."
                      name="message"
                    />
                    <UiButton class="w-full" size="lg" type="submit">
                      Send message
                      <Icon name="lucide:send" class="ml-2 h-4 w-4" />
                    </UiButton>
                  </fieldset>
                </form>

                <UiDivider label="Or connect with us on" />

                <div class="flex items-center justify-center gap-4">
                  <UiButton variant="outline" size="icon-sm" as-child>
                    <a href="#" target="_blank" aria-label="Twitter">
                      <Icon name="logos:twitter" class="h-4 w-4" />
                    </a>
                  </UiButton>
                  <UiButton variant="outline" size="icon-sm" as-child>
                    <a href="#" target="_blank" aria-label="LinkedIn">
                      <Icon name="logos:linkedin-icon" class="h-4 w-4" />
                    </a>
                  </UiButton>
                  <UiButton variant="outline" size="icon-sm" as-child>
                    <a href="#" target="_blank" aria-label="Facebook">
                      <Icon name="logos:facebook" class="h-4 w-4" />
                    </a>
                  </UiButton>
                  <UiButton variant="outline" size="icon-sm" as-child>
                    <a href="#" target="_blank" aria-label="Instagram">
                      <Icon name="skill-icons:instagram" class="h-4 w-4" />
                    </a>
                  </UiButton>
                </div>
              </UiCardContent>
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
  import { object, string } from "yup";
  import type { InferType } from "yup";

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

  const schema = object({
    firstName: string().required().label("First name"),
    lastName: string().required().label("Last name"),
    email: string().email().required().label("Email"),
    phone: string().label("Phone"),
    message: string().required().label("Message"),
  });

  const { handleSubmit, isSubmitting } = useForm<InferType<typeof schema>>({
    validationSchema: schema,
  });

  const submit = handleSubmit(async (values) => {
    console.log(values);
    useSonner.success("Message sent", {
      description: "We'll get back to you soon!",
    });
  });
</script>
