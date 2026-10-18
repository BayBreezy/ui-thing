<template>
  <!--
    Newsletter preferences form
    Features: Name and email fields with validation, selectable topic chips, frequency choice, terms checkbox that must be accepted, loading and success states on a grid background
  -->
  <section class="relative overflow-hidden">
    <div
      class="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] mask-[radial-gradient(ellipse_at_center,black_20%,transparent_70%)] bg-size-[48px_48px]"
      aria-hidden="true"
    />
    <UiContainer class="relative py-14 lg:py-20">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          {{ props.title }}
        </h2>
        <p class="text-muted-foreground mt-3 text-lg text-balance">{{ props.description }}</p>
      </div>

      <UiCard class="mx-auto mt-10 max-w-xl shadow-sm">
        <UiCardContent>
          <form v-if="!done" class="grid gap-6" novalidate @submit="submit">
            <fieldset :disabled="isSubmitting" class="grid gap-6">
              <div class="grid gap-4 sm:grid-cols-2">
                <UiVeeInput name="firstName" label="First name" placeholder="Jane" />
                <UiVeeInput name="lastName" label="Last name" placeholder="Doe" />
              </div>
              <UiVeeInput
                name="email"
                type="email"
                label="Email address"
                placeholder="you@example.com"
              />

              <div class="grid gap-3">
                <UiLabel>What are you interested in?</UiLabel>
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="topic in topics"
                    :key="topic.value"
                    type="button"
                    class="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors"
                    :class="
                      selected.includes(topic.value)
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'hover:bg-muted'
                    "
                    :aria-pressed="selected.includes(topic.value)"
                    @click="toggle(topic.value)"
                  >
                    <Icon
                      :name="selected.includes(topic.value) ? 'lucide:check' : topic.icon"
                      class="size-4"
                    />
                    {{ topic.label }}
                  </button>
                </div>
              </div>

              <div class="grid gap-3">
                <UiLabel>How often?</UiLabel>
                <UiRadioGroup v-model="frequency" class="grid grid-cols-3 gap-3">
                  <label
                    v-for="option in frequencies"
                    :key="option"
                    class="flex cursor-pointer items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors"
                    :class="
                      frequency === option ? 'border-primary bg-primary/5' : 'hover:bg-accent/50'
                    "
                  >
                    <UiRadioGroupItem :value="option" class="sr-only" />
                    {{ option }}
                  </label>
                </UiRadioGroup>
              </div>

              <UiVeeCheckbox
                name="terms"
                label="I agree to receive marketing emails and accept the privacy policy"
              />
              <UiButton type="submit" size="lg" class="w-full">
                <Icon v-if="isSubmitting" name="lucide:loader-circle" class="size-4 animate-spin" />
                Subscribe to newsletter
              </UiButton>
            </fieldset>
          </form>

          <div v-else class="py-6 text-center" role="status">
            <div
              class="mx-auto flex size-14 items-center justify-center rounded-full bg-green-500/10"
            >
              <Icon name="lucide:circle-check" class="size-7 text-green-600 dark:text-green-400" />
            </div>
            <h3 class="mt-4 text-xl font-semibold">You're all set, {{ name }}</h3>
            <p class="text-muted-foreground mt-1 text-sm">
              We'll send {{ frequency.toLowerCase() }} emails about
              {{ selected.length ? selected.join(", ") : "everything we publish" }}.
            </p>
            <UiButton variant="ghost" size="sm" class="mt-4" @click="done = false"
              >Change preferences</UiButton
            >
          </div>
        </UiCardContent>
      </UiCard>
    </UiContainer>
  </section>
</template>

<script lang="ts" setup>
  import { boolean, object, string } from "yup";
  import type { InferType } from "yup";

  const props = withDefaults(defineProps<{ title?: string; description?: string }>(), {
    title: "Subscribe to our newsletter",
    description: "Tell us what you care about and we'll only send what's relevant.",
  });

  const topics = [
    { value: "product", label: "Product news", icon: "lucide:rocket" },
    { value: "design", label: "Design", icon: "lucide:palette" },
    { value: "engineering", label: "Engineering", icon: "lucide:code" },
    { value: "company", label: "Company", icon: "lucide:building-2" },
  ];
  const frequencies = ["Weekly", "Monthly", "Quarterly"];

  const selected = ref<string[]>(["product"]);
  const frequency = ref("Weekly");
  const done = ref(false);
  const name = ref("");

  function toggle(value: string) {
    selected.value = selected.value.includes(value)
      ? selected.value.filter((item) => item !== value)
      : [...selected.value, value];
  }

  const schema = object({
    firstName: string().required().label("First name"),
    lastName: string().required().label("Last name"),
    email: string().email().required().label("Email address"),
    terms: boolean().oneOf([true], "Please accept to continue").label("Terms"),
  });

  const { handleSubmit, isSubmitting } = useForm<InferType<typeof schema>>({
    validationSchema: schema,
  });

  const submit = handleSubmit(async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 700));
    name.value = values.firstName;
    done.value = true;
  });
</script>
