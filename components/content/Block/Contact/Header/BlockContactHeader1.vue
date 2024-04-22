<template>
  <UiContainer class="pb-16">
    <UiContainer class="py-16 text-center">
      <slot name="headline">
        <p v-if="headline" class="font-semibold text-primary">{{ headline }}</p>
      </slot>
      <slot name="title">
        <h2 class="mb-4 mt-2 text-4xl font-bold lg:mb-6 lg:mt-3 lg:text-5xl">{{ title }}</h2>
      </slot>
      <slot name="description">
        <p class="mx-auto max-w-[800px] text-lg text-muted-foreground lg:text-xl">
          {{ description }}
        </p>
      </slot>
    </UiContainer>
    <form class="mx-auto max-w-[480px]" @submit="submit">
      <fieldset :disabled="isSubmitting" class="grid gap-6">
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div><UiVeeInput label="First name" placeholder="First name" name="firstName" /></div>
          <div><UiVeeInput label="Last name" placeholder="Last name" name="lastName" /></div>
        </div>
        <div>
          <UiVeeInput label="Email" placeholder="me@example.com" type="email" name="email" />
        </div>
        <div>
          <UiVeeInput label="Phone" type="tel" name="phone" />
        </div>
        <div>
          <UiVeeTextarea
            :rows="4"
            label="Message"
            placeholder="Leave us a message..."
            name="message"
          />
        </div>
        <div>
          <UiButton class="w-full" type="submit">Send message</UiButton>
        </div>
      </fieldset>
    </form>
  </UiContainer>
</template>

<script lang="ts" setup>
  import { object, string } from "yup";
  import type { InferType } from "yup";

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
