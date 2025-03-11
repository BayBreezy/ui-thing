<template>
  <div class="text-center">
    <UiDrawer v-model:open="isOpen" should-scale-background>
      <UiDrawerTrigger as-child>
        <UiButton variant="outline">Open Drawer</UiButton>
      </UiDrawerTrigger>
      <UiDrawerContent>
        <div class="mx-auto w-full max-w-sm rounded-t-lg p-4 pb-10">
          <UiDrawerTitle class="mb-1.5">Drawer Title</UiDrawerTitle>
          <UiDrawerDescription>
            This is a basic drawer with a title and description.
            <!-- eslint-disable-next-line vue/html-self-closing -->
            <br />
            For some strange reason the Vaul won't pull to close when a form is present inside it
          </UiDrawerDescription>

          <div class="relative">
            <form class="mt-7" @submit="submit">
              <fieldset :disabled="isSubmitting" class="grid gap-6">
                <UiVeeInput
                  name="email"
                  label="Email"
                  type="email"
                  model-value="baybreezy@example.com"
                />
                <UiVeeInput name="username" label="Username" model-value="baybreezy" />
                <UiDrawerClose as-child>
                  <UiButton type="submit">Update</UiButton>
                </UiDrawerClose>
              </fieldset>
            </form>
          </div>

          <UiDrawerClose class="absolute right-4 top-3 h-7 w-7" as-child>
            <UiButton variant="ghost" size="icon-sm" class="opacity-50 hover:opacity-100">
              <Icon name="lucide:x" />
            </UiButton>
          </UiDrawerClose>
        </div>
      </UiDrawerContent>
    </UiDrawer>
  </div>
</template>

<script lang="ts" setup>
  import { z } from "zod";

  const isOpen = defineModel<boolean>();

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(
      z.object({
        email: z.string().email(),
        username: z.string().min(3),
      })
    ),
  });
  const submit = handleSubmit((_) => {
    useSonner.success("Updated", {
      description: "Your account has been updated",
    });
  });
</script>
