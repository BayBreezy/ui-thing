<template>
  <div class="text-center">
    <UiDrawer>
      <UiDrawerTrigger asChild>
        <UiButton variant="outline">Open Drawer</UiButton>
      </UiDrawerTrigger>
      <UiDrawerContent>
        <div class="mx-auto w-full max-w-sm rounded-t-lg p-4 pb-10">
          <UiDrawerTitle class="mb-1.5">Drawer Title</UiDrawerTitle>
          <UiDrawerDescription>
            This is a basic drawer with a title and description.
            <br />
            For some strange reason the Vaul won't pull to close when a form i s present inside it
          </UiDrawerDescription>

          <div class="relative">
            <form @submit="submit" class="mt-7">
              <fieldset :disabled="isSubmitting" class="grid gap-6">
                <UiVeeInput
                  name="email"
                  label="Email"
                  type="email"
                  modelValue="baybreezy@example.com"
                />
                <UiVeeInput name="username" label="Username" modelValue="baybreezy" />
                <UiDrawerClose asChild>
                  <UiButton type="submit">Update</UiButton>
                </UiDrawerClose>
              </fieldset>
            </form>
          </div>
        </div>
      </UiDrawerContent>
    </UiDrawer>
  </div>
</template>

<script lang="ts" setup>
  import { z } from "zod";

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(
      z.object({
        email: z.string().email(),
        username: z.string().min(3),
      })
    ),
  });
  const submit = handleSubmit((values) => {
    useSonner.success("Updated", {
      description: "Your account has been updated",
    });
  });
</script>
