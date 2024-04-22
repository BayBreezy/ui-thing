<template>
  <UiContainer
    class="grid grid-cols-1 items-center py-10 lg:min-h-[800px] lg:grid-cols-2 lg:gap-20"
  >
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

    useSonner.success("Message sent", {
      description: "We'll get back to you as soon as possible.",
    });
  });
</script>
