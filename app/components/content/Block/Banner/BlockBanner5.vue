<template>
  <!--
    Newsletter banner with a validated email form
    Features: Icon, copy and an inline form with validation, loading state, success message that replaces the form, dismiss with a collapse animation
  -->
  <div class="px-4 py-6">
    <AnimatePresence>
      <Motion
        v-if="visible"
        class="overflow-hidden"
        :initial="{ height: 0, opacity: 0 }"
        :animate="{ height: 'auto', opacity: 1 }"
        :exit="{ height: 0, opacity: 0 }"
        :transition="{ duration: 0.3, ease: 'easeInOut' }"
      >
        <div
          class="bg-card relative mx-auto flex max-w-4xl flex-col gap-5 rounded-xl border p-5 shadow-sm lg:flex-row lg:items-center lg:gap-8 lg:p-6"
        >
          <div class="flex items-start gap-4 lg:flex-1">
            <slot name="icon">
              <UiFancyIcon :icon="props.icon" theme="modern" color="gray" />
            </slot>
            <div class="pr-8 lg:pr-0">
              <slot name="title">
                <h3 class="font-semibold">{{ props.title }}</h3>
              </slot>
              <slot name="description">
                <p class="text-muted-foreground mt-0.5 text-sm">{{ props.description }}</p>
              </slot>
            </div>
          </div>

          <div class="lg:w-96 lg:pr-8">
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
                <UiButton type="submit" class="shrink-0">
                  <Icon
                    v-if="isSubmitting"
                    name="lucide:loader-circle"
                    class="size-4 animate-spin"
                  />
                  Subscribe
                </UiButton>
              </fieldset>
            </form>
            <p
              v-else
              class="flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400"
            >
              <Icon name="lucide:circle-check" class="size-5" />
              You're subscribed. Check your inbox to confirm.
            </p>
            <p v-if="!done" class="text-muted-foreground mt-2 text-xs">
              No spam. Unsubscribe at any time.
            </p>
          </div>

          <button
            type="button"
            class="text-muted-foreground hover:bg-muted hover:text-foreground absolute top-3 right-3 flex size-7 items-center justify-center rounded-md transition-colors"
            aria-label="Dismiss newsletter banner"
            @click="visible = false"
          >
            <Icon name="lucide:x" class="size-4" />
          </button>
        </div>
      </Motion>
    </AnimatePresence>
    <div v-if="!visible" class="text-center">
      <UiButton variant="ghost" size="sm" @click="visible = true">Show banner again</UiButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { object, string } from "yup";
  import type { InferType } from "yup";

  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      icon?: string;
    }>(),
    {
      title: "Stay up to date",
      description: "Product news and tips, once a month.",
      icon: "lucide:mail",
    }
  );

  const visible = ref(true);
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
