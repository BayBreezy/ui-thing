<template>
  <!-- 
    FAQ-focused contact section
    Features: Accordion FAQ with contact form, two-column layout, animated elements
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
      <div class="mx-auto max-w-[1100px]">
        <div class="text-center">
          <Motion as="p" :variants="childVariant" class="font-semibold text-primary"
            >Support</Motion
          >
          <Motion
            as="h2"
            :variants="childVariant"
            class="mt-2 mb-4 text-4xl font-bold lg:mt-3 lg:mb-6 lg:text-5xl"
          >
            How can we help?
          </Motion>
          <Motion
            as="p"
            :variants="childVariant"
            class="mx-auto mb-12 max-w-[700px] text-lg text-muted-foreground lg:text-xl"
          >
            Check out our frequently asked questions or reach out to us directly.
          </Motion>
        </div>

        <div class="grid gap-10 lg:grid-cols-2">
          <Motion :variants="childVariant" class="space-y-4">
            <h3 class="text-xl font-semibold">Frequently Asked Questions</h3>
            <UiAccordion type="single" collapsible>
              <UiAccordionItem v-for="(faq, idx) in faqs" :key="idx" :value="`item-${idx}`">
                <UiAccordionTrigger>{{ faq.question }}</UiAccordionTrigger>
                <UiAccordionContent>{{ faq.answer }}</UiAccordionContent>
              </UiAccordionItem>
            </UiAccordion>
          </Motion>

          <Motion :variants="childVariant">
            <UiCard class="">
              <UiCardContent>
                <h3 class="mb-5 text-xl font-semibold">Still have questions?</h3>
                <form @submit="submit">
                  <fieldset :disabled="isSubmitting" class="grid gap-5">
                    <UiVeeInput label="Name" placeholder="Your name" name="name" />
                    <UiVeeInput
                      label="Email"
                      placeholder="me@example.com"
                      type="email"
                      name="email"
                    />
                    <UiVeeTextarea
                      :rows="4"
                      label="Question"
                      placeholder="Ask us anything..."
                      name="question"
                    />
                    <UiButton class="w-full" type="submit">
                      Submit question
                      <Icon name="lucide:arrow-right" class="ml-2 h-4 w-4" />
                    </UiButton>
                  </fieldset>
                </form>
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
    name: string().required().label("Name"),
    email: string().email().required().label("Email"),
    question: string().required().label("Question"),
  });

  const { handleSubmit, isSubmitting } = useForm<InferType<typeof schema>>({
    validationSchema: schema,
  });

  const submit = handleSubmit(async (values) => {
    console.log(values);
    useSonner.success("Question submitted", {
      description: "We'll respond to your email shortly.",
    });
  });

  const faqs = [
    {
      question: "What are your business hours?",
      answer:
        "We're available Monday through Friday, 9 AM to 6 PM EST. Our support team responds to emails within 24 hours.",
    },
    {
      question: "How do I track my order?",
      answer:
        "Once your order ships, you'll receive a tracking number via email. You can also check your order status in your account dashboard.",
    },
    {
      question: "What's your return policy?",
      answer:
        "We offer a 30-day return policy for most items. Products must be in original condition with tags attached. Contact us to initiate a return.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by location.",
    },
    {
      question: "How can I change my account information?",
      answer:
        "You can update your account details by logging in and navigating to Settings. For email changes, contact our support team for verification.",
    },
  ];
</script>
