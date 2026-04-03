<template>
  <!-- 
    Contact form with team support cards
    Features: Form with support team info, avatar cards, badge indicators
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
    <UiContainer class="py-16">
      <div class="mx-auto max-w-[900px]">
        <div class="text-center">
          <Motion as="p" :variants="childVariant" class="font-semibold text-primary"
            >Contact support</Motion
          >
          <Motion
            as="h2"
            :variants="childVariant"
            class="mt-2 mb-4 text-4xl font-bold lg:mt-3 lg:mb-6 lg:text-5xl"
          >
            Get help from our team
          </Motion>
          <Motion
            as="p"
            :variants="childVariant"
            class="mx-auto mb-12 max-w-[600px] text-lg text-muted-foreground lg:text-xl"
          >
            Our dedicated support team is here to assist you with any questions or concerns.
          </Motion>
        </div>

        <div class="grid gap-5 lg:grid-cols-[1fr_300px] lg:gap-10 xl:grid-cols-[1fr_380px]">
          <Motion :variants="childVariant" as="form" @submit="submit">
            <fieldset :disabled="isSubmitting" class="grid gap-6">
              <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                <UiVeeInput label="First name" placeholder="First name" name="firstName" />
                <UiVeeInput label="Last name" placeholder="Last name" name="lastName" />
              </div>
              <UiVeeInput label="Email" placeholder="me@example.com" type="email" name="email" />
              <UiVeeInput label="Subject" placeholder="How can we help?" name="subject" />
              <UiVeeTextarea
                :rows="5"
                label="Message"
                placeholder="Tell us more..."
                name="message"
              />
              <UiButton class="w-full" type="submit">
                Send message
                <Icon name="lucide:send" class="ml-2 h-4 w-4" />
              </UiButton>
            </fieldset>
          </Motion>

          <Motion :variants="childVariant" class="space-y-4">
            <UiCard class="py-4">
              <UiCardContent>
                <h3 class="mb-4 text-lg font-semibold">Support Team</h3>
                <div class="space-y-4">
                  <div v-for="member in team" :key="member.name" class="flex items-start gap-3">
                    <UiAvatar class="h-10 w-10">
                      <UiAvatarImage :src="member.avatar" :alt="member.name" />
                      <UiAvatarFallback>{{ member.initials }}</UiAvatarFallback>
                    </UiAvatar>
                    <div class="flex min-w-0 flex-1 flex-col">
                      <div class="flex items-center gap-1">
                        <p class="font-medium">{{ member.name }}</p>
                        <UiBadge variant="outline" class="text-xs md:hidden xl:block">{{
                          member.role
                        }}</UiBadge>
                      </div>
                      <p class="text-sm text-muted-foreground">{{ member.specialty }}</p>
                    </div>
                  </div>
                </div>
              </UiCardContent>
            </UiCard>

            <UiCard class="py-4">
              <UiCardContent>
                <h3 class="mb-3 text-lg font-semibold">Quick Info</h3>
                <div class="space-y-3 text-sm">
                  <div class="flex items-center gap-2">
                    <Icon name="heroicons:clock" class="h-5 w-5 text-muted-foreground" />
                    <span class="text-muted-foreground">Response time: ~2 hours</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <Icon name="heroicons:envelope" class="h-5 w-5 text-muted-foreground" />
                    <span class="text-muted-foreground">support@company.com</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <Icon
                      name="heroicons:chat-bubble-left-right"
                      class="h-5 w-5 text-muted-foreground"
                    />
                    <span class="text-muted-foreground">24/7 Live chat available</span>
                  </div>
                </div>
              </UiCardContent>
            </UiCard>
          </Motion>
        </div>
      </div>
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
    subject: string().required().label("Subject"),
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

  const team = [
    {
      name: "Sarah Johnson",
      role: "Lead Support",
      specialty: "Technical issues",
      avatar: "https://i.pravatar.cc/150?img=1",
      initials: "SJ",
    },
    {
      name: "Mike Chen",
      role: "Support Agent",
      specialty: "Account & billing",
      avatar: "https://i.pravatar.cc/150?img=13",
      initials: "MC",
    },
    {
      name: "Emily Davis",
      role: "Support Agent",
      specialty: "General inquiries",
      avatar: "https://i.pravatar.cc/150?img=5",
      initials: "ED",
    },
  ];
</script>
