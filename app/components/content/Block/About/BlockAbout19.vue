<template>
  <!-- 
    Contact Integrated About Section
    Features: About info with integrated contact form
  -->
  <div class="container py-16 md:py-24">
    <div class="grid gap-12 lg:grid-cols-2 lg:gap-16">
      <div>
        <h2 class="text-3xl font-bold tracking-tight md:text-4xl">Let's Work Together</h2>
        <p class="text-muted-foreground mt-4 text-lg">
          We're passionate about helping businesses succeed. Get in touch to learn how we can
          support your goals.
        </p>

        <div class="mt-8 space-y-6">
          <div class="flex gap-4">
            <div class="bg-primary/10 flex size-12 shrink-0 items-center justify-center rounded-xl">
              <Icon name="lucide:mail" class="text-primary size-6" />
            </div>
            <div>
              <h3 class="font-semibold">Email Us</h3>
              <p class="text-muted-foreground text-sm">hello@company.com</p>
              <p class="text-muted-foreground text-sm">support@company.com</p>
            </div>
          </div>

          <div class="flex gap-4">
            <div class="bg-primary/10 flex size-12 shrink-0 items-center justify-center rounded-xl">
              <Icon name="lucide:phone" class="text-primary size-6" />
            </div>
            <div>
              <h3 class="font-semibold">Call Us</h3>
              <p class="text-muted-foreground text-sm">+1 (415) 555-0100</p>
              <p class="text-muted-foreground text-sm">Mon-Fri 9am-6pm PST</p>
            </div>
          </div>

          <div class="flex gap-4">
            <div class="bg-primary/10 flex size-12 shrink-0 items-center justify-center rounded-xl">
              <Icon name="lucide:map-pin" class="text-primary size-6" />
            </div>
            <div>
              <h3 class="font-semibold">Visit Us</h3>
              <p class="text-muted-foreground text-sm">123 Market Street, Suite 500</p>
              <p class="text-muted-foreground text-sm">San Francisco, CA 94103</p>
            </div>
          </div>
        </div>

        <div class="mt-8">
          <h3 class="font-semibold">Follow Us</h3>
          <div class="mt-3 flex gap-1">
            <UiButton v-for="social in socials" :key="social.name" variant="ghost" size="icon">
              <Icon :name="social.icon" class="size-4" />
            </UiButton>
          </div>
        </div>
      </div>

      <UiCard>
        <UiCardContent>
          <h3 class="text-xl font-bold">Send us a message</h3>
          <p class="text-muted-foreground mt-2 text-sm">
            Fill out the form below and we'll get back to you within 24 hours.
          </p>

          <form class="mt-6 space-y-4" @submit="onSubmit">
            <div class="grid gap-4 sm:grid-cols-2">
              <UiVeeInput label="First Name" name="firstName" placeholder="John" />
              <UiVeeInput label="Last Name" name="lastName" placeholder="Doe" />
            </div>
            <UiVeeInput label="Email" name="email" type="email" placeholder="john@example.com" />
            <UiVeeInput label="Company" name="company" placeholder="Acme Inc." />
            <UiVeeInput label="Subject" name="subject" placeholder="How can we help?" />
            <UiVeeTextarea
              label="Message"
              name="message"
              placeholder="Tell us more about your inquiry..."
              :rows="4"
            />

            <UiButton :loading="isSubmitting" type="submit" class="w-full">
              <Icon name="lucide:send" class="mr-2 size-4" />
              Send Message
            </UiButton>
          </form>
        </UiCardContent>
      </UiCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { object, string } from "yup";

  const socials = [
    { name: "Twitter", icon: "logos:twitter" },
    { name: "LinkedIn", icon: "logos:linkedin-icon" },
    { name: "GitHub", icon: "simple-icons:github" },
    { name: "Facebook", icon: "logos:facebook" },
  ];

  const { handleSubmit, isSubmitting } = useForm({
    name: "about-contact-integrated",
    validationSchema: toTypedSchema(
      object({
        firstName: string().label("First Name").required(),
        lastName: string().label("Last Name").required(),
        email: string().label("Email").email().required(),
        company: string().label("Company").required(),
        subject: string().label("Subject").required(),
        message: string().label("Message").required(),
      })
    ),
  });

  const onSubmit = handleSubmit(async (_, { resetForm }) => {
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));
    useSonner("Message sent successfully!", {
      description: "Thank you for reaching out. We will get back to you soon.",
    });
    resetForm();
  });
</script>
