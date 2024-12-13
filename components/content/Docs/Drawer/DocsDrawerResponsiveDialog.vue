<template>
  <div class="flex justify-center">
    <DefinedForm>
      <form class="">
        <fieldset class="grid items-start gap-4">
          <UiVeeInput name="email" label="Email" type="email" model-value="baybreezy@example.com" />
          <UiVeeInput name="username" label="Username" model-value="baybreezy" />
          <UiButton type="submit"> Save changes </UiButton>
        </fieldset>
      </form>
    </DefinedForm>

    <UiDialog v-if="isDesktop" v-model:open="isOpen">
      <UiDialogTrigger as-child>
        <UiButton variant="outline" text="Edit Profile" />
      </UiDialogTrigger>
      <UiDialogContent class="sm:max-w-[400px]">
        <UiDialogHeader>
          <UiDialogTitle>Edit profile</UiDialogTitle>
          <UiDialogDescription>
            Make changes to your profile here. Click save when you're done.
          </UiDialogDescription>
        </UiDialogHeader>
        <ReusableForm />
      </UiDialogContent>
    </UiDialog>

    <UiDrawer v-else v-model:open="isOpen" should-scale-background>
      <UiDrawerTrigger as-child>
        <UiButton variant="outline" text="Edit Profile" />
      </UiDrawerTrigger>
      <UiDrawerContent class="mx-2">
        <UiDrawerHeader class="text-left">
          <UiDrawerTitle>Edit profile</UiDrawerTitle>
          <UiDrawerDescription>
            Make changes to your profile here. Click save when you're done.
          </UiDrawerDescription>
        </UiDrawerHeader>
        <div class="px-4">
          <ReusableForm />
        </div>
        <UiDrawerFooter class="pt-2">
          <UiDrawerClose as-child>
            <UiButton variant="outline"> Cancel </UiButton>
          </UiDrawerClose>
        </UiDrawerFooter>
      </UiDrawerContent>
    </UiDrawer>
  </div>
</template>

<script lang="ts" setup>
  // Reuse `form` section
  const [DefinedForm, ReusableForm] = createReusableTemplate();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const isOpen = ref(false);
</script>
