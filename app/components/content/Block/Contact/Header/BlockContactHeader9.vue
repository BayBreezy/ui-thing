<template>
  <!-- 
    Department selection contact form
    Features: Department chips, priority badge, estimated response time
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
      <div class="mx-auto max-w-[700px]">
        <div class="text-center">
          <Motion as="p" :variants="childVariant" class="font-semibold text-primary"
            >Contact us</Motion
          >
          <Motion
            as="h2"
            :variants="childVariant"
            class="mt-2 mb-4 text-4xl font-bold lg:mt-3 lg:mb-6 lg:text-5xl"
          >
            We're here to help
          </Motion>
          <Motion
            as="p"
            :variants="childVariant"
            class="mb-10 text-lg text-muted-foreground lg:text-xl"
          >
            Choose a department and we'll route your message to the right team.
          </Motion>
        </div>

        <Motion :variants="childVariant" as-child>
          <UiCard class="p-8">
            <form @submit="submit">
              <fieldset :disabled="isSubmitting" class="grid gap-6">
                <div>
                  <label class="mb-3 block text-sm font-medium">Select Department</label>
                  <div class="flex flex-wrap gap-2">
                    <UiBadge
                      v-for="dept in departments"
                      :key="dept.value"
                      :variant="selectedDepartment === dept.value ? 'default' : 'outline'"
                      class="cursor-pointer"
                      type="button"
                      @click="selectedDepartment = dept.value"
                    >
                      <Icon :name="dept.icon" class="mr-1.5 h-4 w-4" />
                      {{ dept.label }}
                    </UiBadge>
                  </div>
                  <p
                    v-if="selectedDepartment"
                    class="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground"
                  >
                    <Icon name="heroicons:clock" class="h-4 w-4" />
                    Typical response time: {{ getResponseTime(selectedDepartment) }}
                  </p>
                </div>

                <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <UiVeeInput label="First name" placeholder="First name" name="firstName" />
                  <UiVeeInput label="Last name" placeholder="Last name" name="lastName" />
                </div>

                <UiVeeInput label="Email" placeholder="me@example.com" type="email" name="email" />
                <UiVeeInput label="Subject" placeholder="Brief description" name="subject" />

                <UiVeeTextarea
                  :rows="5"
                  label="Message"
                  placeholder="Tell us more..."
                  name="message"
                />
                <UiVeeCheckbox id="urgent" name="isUrgent" label="This is a very urgent matter" />

                <UiButton class="w-full" type="submit">
                  Send to
                  {{
                    selectedDepartment
                      ? departments.find((d) => d.value === selectedDepartment)?.label
                      : "support"
                  }}
                  <Icon name="lucide:send" class="ml-2 h-4 w-4" />
                </UiButton>
              </fieldset>
            </form>
          </UiCard>
        </Motion>
      </div>
    </UiContainer>
  </Motion>
</template>

<script lang="ts" setup>
  import { stagger } from "motion-v";
  import type { MotionProps } from "motion-v";
  import { ref } from "vue";
  import { bool, object, string } from "yup";
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

  const selectedDepartment = ref("sales");
  const isUrgent = ref(false);

  const departments = [
    { label: "Sales", value: "sales", icon: "lucide:shopping-cart", responseTime: "1-2 hours" },
    { label: "Support", value: "support", icon: "lucide:headphones", responseTime: "2-4 hours" },
    { label: "Billing", value: "billing", icon: "lucide:credit-card", responseTime: "1-3 hours" },
    { label: "Technical", value: "technical", icon: "lucide:code", responseTime: "3-6 hours" },
    { label: "General", value: "general", icon: "lucide:mail", responseTime: "4-8 hours" },
  ];

  const getResponseTime = (dept: string) => {
    return departments.find((d) => d.value === dept)?.responseTime || "4-8 hours";
  };

  const schema = object({
    firstName: string().required().label("First name"),
    lastName: string().required().label("Last name"),
    email: string().email().required().label("Email"),
    subject: string().required().label("Subject"),
    message: string().required().label("Message"),
    isUrgent: bool().label("Is Urgent"),
  });

  const { handleSubmit, isSubmitting } = useForm<InferType<typeof schema>>({
    validationSchema: schema,
  });

  const submit = handleSubmit(async (values) => {
    console.log({ ...values, department: selectedDepartment.value, urgent: isUrgent.value });
    useSonner.success("Message sent", {
      description: `Your ${isUrgent.value ? "urgent " : ""}message has been sent to ${selectedDepartment.value}.`,
    });
  });
</script>
