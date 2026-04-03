<template>
  <!-- 
    Centered contact form with simple layout
    Features: Centered header, inline form with validation, staggered animations
  -->
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
    <UiContainer class="pb-16">
      <UiContainer class="py-16 text-center">
        <slot name="headline">
          <Motion
            v-if="headline"
            as="p"
            :variants="childVariant"
            class="font-semibold text-primary"
          >
            {{ headline }}
          </Motion>
        </slot>
        <slot name="title">
          <Motion
            as="h2"
            :variants="childVariant"
            class="mt-2 mb-4 text-4xl font-bold lg:mt-3 lg:mb-6 lg:text-5xl"
          >
            {{ title }}
          </Motion>
        </slot>
        <slot name="description">
          <Motion
            as="p"
            :variants="childVariant"
            class="mx-auto max-w-[800px] text-lg text-muted-foreground lg:text-xl"
          >
            {{ description }}
          </Motion>
        </slot>
      </UiContainer>
      <Motion :variants="childVariant" as="form" class="mx-auto max-w-[480px]" @submit="submit">
        <fieldset :disabled="isSubmitting" class="grid gap-6">
          <Motion :variants="childVariant" class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div><UiVeeInput label="First name" placeholder="First name" name="firstName" /></div>
            <div><UiVeeInput label="Last name" placeholder="Last name" name="lastName" /></div>
          </Motion>
          <Motion :variants="childVariant">
            <UiVeeInput label="Email" placeholder="me@example.com" type="email" name="email" />
          </Motion>
          <Motion :variants="childVariant">
            <UiVeeInput label="Phone" type="tel" name="phone" />
          </Motion>
          <Motion :variants="childVariant">
            <UiVeeTextarea
              :rows="4"
              label="Message"
              placeholder="Leave us a message..."
              name="message"
            />
          </Motion>
          <Motion :variants="childVariant">
            <UiButton class="w-full" type="submit">
              Send message
              <Icon name="lucide:send" class="ml-2 h-4 w-4" />
            </UiButton>
          </Motion>
        </fieldset>
      </Motion>
    </UiContainer>
  </Motion>
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
    phone: string().required().label("Phone"),
    message: string().required().label("Message"),
  });

  const { handleSubmit, isSubmitting } = useForm<InferType<typeof schema>>({
    validationSchema: schema,
  });

  const submit = handleSubmit(async (values) => {
    console.log(values);

    useSonner.success("Message sent", {
      description: "We'll get back to you as soon as possible.",
    });
  });

  const headline = "Contact us";
  const title = "Get in touch";
  const description = "We'd love to hear from you. Please fill out this form.";
</script>
