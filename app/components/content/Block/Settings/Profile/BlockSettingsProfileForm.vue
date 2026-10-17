<template>
  <!--
    Profile settings card with avatar upload and validated fields
    Features: Avatar preview with upload and remove, vee-validate and yup validation, bio character counter, success toast
  -->
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>{{ props.title }}</UiCardTitle>
      <UiCardDescription>{{ props.description }}</UiCardDescription>
    </UiCardHeader>
    <form @submit.prevent="onSubmit">
      <UiCardContent class="space-y-6">
        <div class="flex items-center gap-5">
          <UiAvatar
            class="size-20"
            :src="preview || 'https://i.pravatar.cc/200?img=44'"
            fallback="MC"
          />
          <div class="space-y-2">
            <div class="flex gap-2">
              <UiButton type="button" variant="outline" size="sm" @click="fileInput?.click()">
                Change photo
              </UiButton>
              <UiButton type="button" variant="ghost" size="sm" @click="preview = undefined">
                Remove
              </UiButton>
            </div>
            <p class="text-muted-foreground text-xs">JPG, GIF or PNG. 1MB max.</p>
            <input ref="fileInput" type="file" accept="image/*" class="sr-only" @change="onFile" />
          </div>
        </div>

        <fieldset :disabled="isSubmitting" class="grid gap-5 sm:grid-cols-2">
          <UiVeeInput name="firstName" label="First name" />
          <UiVeeInput name="lastName" label="Last name" />
          <div class="sm:col-span-2">
            <UiVeeInput
              name="email"
              type="email"
              label="Email"
              hint="We'll send a confirmation if you change this."
            />
          </div>
          <div class="sm:col-span-2">
            <UiVeeInput name="username" label="Username" icon="lucide:at-sign" />
          </div>
          <div class="sm:col-span-2">
            <UiVeeTextarea
              name="bio"
              label="Bio"
              :rows="4"
              :hint="`${275 - (values.bio?.length ?? 0)} characters left`"
            />
          </div>
        </fieldset>
      </UiCardContent>
      <UiCardFooter class="justify-end gap-2 border-t">
        <UiButton type="button" variant="outline" @click="resetForm()">Reset</UiButton>
        <UiButton type="submit" :disabled="isSubmitting">
          <Icon v-if="isSubmitting" name="lucide:loader-circle" class="size-4 animate-spin" />
          Save changes
        </UiButton>
      </UiCardFooter>
    </form>
  </UiCard>
</template>

<script lang="ts" setup>
  import { object, string } from "yup";
  import type { InferType } from "yup";

  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
    }>(),
    {
      title: "Profile",
      description: "This information is shown on your public profile.",
    }
  );

  const schema = object({
    firstName: string().required().label("First name"),
    lastName: string().required().label("Last name"),
    email: string().email().required().label("Email"),
    username: string()
      .matches(/^[a-z0-9_-]+$/i, "Use letters, numbers, dashes and underscores only")
      .min(3)
      .required()
      .label("Username"),
    bio: string().max(275).label("Bio"),
  });

  const initialValues = {
    firstName: "Maya",
    lastName: "Chen",
    email: "maya@uithing.com",
    username: "mayachen",
    bio: "Product designer based in Melbourne.",
  };

  const { handleSubmit, isSubmitting, resetForm, values } = useForm<InferType<typeof schema>>({
    validationSchema: schema,
    initialValues,
  });

  const fileInput = ref<HTMLInputElement>();
  const preview = ref<string>();

  function onFile(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) preview.value = URL.createObjectURL(file);
  }

  const onSubmit = handleSubmit(async () => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    useSonner.success("Profile updated", { description: "Your changes have been saved." });
  });
</script>
