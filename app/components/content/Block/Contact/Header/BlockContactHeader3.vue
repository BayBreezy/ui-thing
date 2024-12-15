<template>
  <UiContainer class="grid grid-cols-1 items-center py-10 lg:min-h-[800px] lg:grid-cols-2 lg:gap-5">
    <div class="mx-auto">
      <h1 class="mb-4 text-4xl font-semibold lg:mb-6 lg:text-5xl">Contact us</h1>
      <p class="mb-12 text-lg text-muted-foreground lg:text-xl">
        Our friendly team would love to hear from you.
      </p>
      <form class="max-w-[480px]" @submit="submit">
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
              :rows="5"
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
    </div>
    <div
      class="mt-10 h-[300px] w-full overflow-hidden rounded-lg lg:mt-0 lg:h-full lg:rounded-none"
    >
      <!-- eslint-disable-next-line vue/html-self-closing -->
      <img
        src="https://images.unsplash.com/photo-1587560699334-bea93391dcef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Contact us image"
        width="800"
        height="800"
        class="h-full w-full object-cover"
      />
    </div>
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
    useSonner.success("Message Sent", {
      description: "We'll get back to you as soon as possible.",
    });
  });
</script>
