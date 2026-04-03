<template>
  <!-- 
    Contact form with Google Maps integration
    Features: Two-column layout, form with map embed, animated entrance
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
      class="grid grid-cols-1 items-center overflow-x-hidden py-10 lg:min-h-[800px] lg:grid-cols-2 lg:gap-20"
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
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60706.4783868638!2d-76.84185590241378!3d18.01801356612945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8edb3e4e09940847%3A0xbcee137f153b407f!2sMegaMart%20Kingston!5e0!3m2!1sen!2sjm!4v1705346784307!5m2!1sen!2sjm"
          width="800"
          height="800"
          class="h-full w-full"
          style="border: 0"
          allowfullscreen="true"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        />
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
</script>
