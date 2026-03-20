<template>
  <!-- 
    Contact form with image showcase
    Features: Two-column layout, form with decorative image, animated elements
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
    <UiContainer
      class="grid grid-cols-1 items-center overflow-x-hidden py-10 lg:min-h-[800px] lg:grid-cols-2 lg:gap-5"
    >
      <Motion :variants="childVariant" class="mx-auto">
        <h1 class="mb-4 text-4xl font-semibold lg:mb-6 lg:text-5xl">Contact us</h1>
        <p class="mb-12 text-lg text-muted-foreground lg:text-xl">
          Our friendly team would love to hear from you.
        </p>
        <form class="max-w-[480px]" @submit="submit">
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
                :rows="5"
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
        </form>
      </Motion>
      <Motion
        :variants="{
          initial: { opacity: 0, x: 30 },
          animate: {
            opacity: 1,
            x: 0,
            transition: {
              type: 'spring',
              stiffness: 200,
              damping: 25,
            },
          },
        }"
        class="mt-10 h-[300px] w-full overflow-hidden rounded-lg shadow-lg lg:mt-0 lg:h-full lg:rounded-xl"
      >
        <img
          src="https://images.unsplash.com/photo-1587560699334-bea93391dcef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Contact us image"
          width="800"
          height="800"
          class="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </Motion>
    </UiContainer>
  </Motion>
</template>

<script lang="ts" setup>
  import { stagger } from "motion-v";
  import { object, string } from "yup";
  import type { MotionProps } from "motion-v";
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
    useSonner.success("Message Sent", {
      description: "We'll get back to you as soon as possible.",
    });
  });
</script>
