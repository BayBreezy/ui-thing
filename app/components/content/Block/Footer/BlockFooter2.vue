<template>
  <!--
    Footer with a validated newsletter signup beside the brand
    Features: Brand on the left, newsletter form with validation and a success state, three link columns, social icons and copyright bar
  -->
  <UiContainer as="footer" class="py-14 lg:py-20">
    <div class="grid gap-12 lg:grid-cols-2 lg:gap-16">
      <div class="space-y-6">
        <NuxtLink to="#" class="flex items-center gap-2.5 text-lg font-semibold">
          <svg
            class="fill-primary h-7"
            viewBox="0 0 53 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.2997 0L52.0461 28.6301V44H38.6311V34.1553L17.7522 13.3607L13.415 13.3607L13.415 44H0L0 0L23.2997 0ZM38.6311 15.2694V0L52.0461 0V15.2694L38.6311 15.2694Z"
            />
          </svg>
          {{ props.name }}
        </NuxtLink>
        <div class="max-w-md space-y-3">
          <h3 class="text-xl font-semibold tracking-tight">Get product news in your inbox</h3>
          <p class="text-muted-foreground text-sm">
            One short email a month. Unsubscribe whenever you like.
          </p>
          <form v-if="!done" class="flex gap-2" novalidate @submit="submit">
            <fieldset :disabled="isSubmitting" class="flex flex-1 gap-2">
              <div class="flex-1">
                <UiVeeInput
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  aria-label="Email address"
                />
              </div>
              <UiButton type="submit">
                <Icon v-if="isSubmitting" name="lucide:loader-circle" class="size-4 animate-spin" />
                Subscribe
              </UiButton>
            </fieldset>
          </form>
          <p
            v-else
            class="flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400"
          >
            <Icon name="lucide:circle-check" class="size-5" />
            Thanks! Check your inbox to confirm.
          </p>
        </div>
      </div>

      <nav class="grid grid-cols-3 gap-8" aria-label="Footer">
        <div v-for="column in columns" :key="column.title">
          <p class="text-sm font-semibold">{{ column.title }}</p>
          <ul class="mt-4 space-y-3">
            <li v-for="link in column.links" :key="link">
              <NuxtLink
                to="#"
                class="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                {{ link }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>

    <div
      class="mt-12 flex flex-col gap-4 border-t pt-8 sm:flex-row sm:items-center sm:justify-between"
    >
      <p class="text-muted-foreground text-sm">
        &copy; {{ new Date().getFullYear() }} {{ props.name }}. All rights reserved.
      </p>
      <ul class="flex items-center gap-1">
        <li v-for="social in socials" :key="social.name">
          <NuxtLink
            to="#"
            :aria-label="social.name"
            class="text-muted-foreground hover:bg-muted hover:text-foreground flex size-9 items-center justify-center rounded-full transition-colors"
          >
            <Icon :name="social.icon" class="size-[18px]" />
          </NuxtLink>
        </li>
      </ul>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  import { object, string } from "yup";
  import type { InferType } from "yup";

  const props = withDefaults(defineProps<{ name?: string }>(), { name: "UI Thing" });

  const columns = [
    { title: "Product", links: ["Features", "Pricing", "Changelog", "Roadmap"] },
    { title: "Resources", links: ["Docs", "Guides", "Blog", "Support"] },
    { title: "Company", links: ["About", "Careers", "Press", "Contact"] },
  ];
  const socials = [
    { name: "X", icon: "simple-icons:x" },
    { name: "GitHub", icon: "mdi:github" },
    { name: "LinkedIn", icon: "mdi:linkedin" },
  ];

  const done = ref(false);
  const schema = object({ email: string().email().required().label("Email") });
  const { handleSubmit, isSubmitting } = useForm<InferType<typeof schema>>({
    validationSchema: schema,
  });
  const submit = handleSubmit(async () => {
    await new Promise((resolve) => setTimeout(resolve, 700));
    done.value = true;
  });
</script>
