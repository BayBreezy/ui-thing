<!-- eslint-disable vue/html-self-closing -->
<template>
  <div class="flex justify-center">
    <UiDialog v-model:open="open">
      <UiDialogTrigger as-child>
        <UiButton variant="outline">Edit profile</UiButton>
      </UiDialogTrigger>
      <UiDialogContent
        class="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5"
      >
        <UiDialogHeader class="contents space-y-0 text-left">
          <UiDialogTitle class="border-b border-border px-6 py-4 text-base">
            Edit profile
          </UiDialogTitle>
        </UiDialogHeader>
        <UiDialogDescription class="sr-only">
          Make changes to your profile here. You can change your photo and set a username.
        </UiDialogDescription>
        <div class="overflow-y-auto">
          <!-- Profile BG -->
          <div class="h-32">
            <div
              class="relative flex h-full w-full items-center justify-center overflow-hidden bg-muted"
            >
              <img
                v-if="currentImage"
                class="h-full w-full object-cover"
                :src="currentImage"
                alt="Profile banner"
                width="512"
                height="96"
              />
              <div class="absolute inset-0 flex items-center justify-center gap-2">
                <button
                  type="button"
                  class="z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-offset-2 transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70"
                  :aria-label="currentImage ? 'Change image' : 'Upload image'"
                  @click="handleBannerClick()"
                >
                  <Icon name="lucide:image-plus" class="size-4" aria-hidden="true" />
                </button>
                <button
                  v-if="currentImage"
                  type="button"
                  class="z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-offset-2 transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70"
                  aria-label="Remove image"
                  @click="currentImage = defaultBanner"
                >
                  <Icon name="lucide:x" class="size-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
          <!-- Avatar -->
          <div class="-mt-10 px-6">
            <div
              class="relative flex size-20 items-center justify-center overflow-hidden rounded-full border-4 border-background bg-muted shadow-sm shadow-black/10"
            >
              <img
                v-if="currentAvatarImage"
                :src="currentAvatarImage"
                class="h-full w-full object-cover"
                width="80"
                height="80"
                alt="Profile image"
              />

              <button
                type="button"
                class="absolute flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-offset-2 transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70"
                aria-label="Change profile picture"
                @click="handleAvatarClick()"
              >
                <Icon name="lucide:image-plus" class="size-4" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div class="px-6 pb-6 pt-4">
            <form @submit="submit">
              <fieldset class="space-y-4" :disabled="isSubmitting">
                <div class="flex flex-col gap-4 sm:flex-row">
                  <UiVeeInput label="First name" placeholder="James" required name="firstName" />
                  <UiVeeInput label="Last name" placeholder="Bond" required name="lastName" />
                </div>
                <UiVeeInput label="Username" placeholder="agent-007" required name="username">
                  <template #trailingIcon>
                    <div class="absolute inset-y-0 right-3 flex items-center justify-center">
                      <Icon name="lucide:check" class="text-emerald-500" />
                    </div>
                  </template>
                </UiVeeInput>
                <UiVeeInput
                  label="Website"
                  class="peer ps-20"
                  placeholder="your-website.com"
                  type="text"
                  name="website"
                >
                  <template #icon>
                    <span
                      class="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center border-r px-3 text-base text-muted-foreground peer-disabled:opacity-50 sm:text-sm"
                    >
                      https://
                    </span>
                  </template>
                </UiVeeInput>
                <div class="space-y-2">
                  <UiVeeTextarea
                    v-model="bio"
                    label="Biography"
                    placeholder="Write a few sentences about yourself"
                    name="bio"
                    :hint="`${characterCount} characters left of ${maxBioLength}`"
                  />
                </div>
              </fieldset>
            </form>
          </div>
        </div>
        <UiDialogFooter class="border-t border-border px-6 py-4">
          <UiDialogClose as-child>
            <UiButton type="button" variant="outline"> Cancel </UiButton>
          </UiDialogClose>
          <UiButton @click="submit()">Save changes</UiButton>
        </UiDialogFooter>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>

<script lang="ts" setup>
  import { z } from "zod";

  const defaultBanner =
    "https://images.unsplash.com/photo-1474779751981-5d6bb8cb0a35?q=80&w=2969&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const defaultAvatar =
    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const bio = ref("The name is Bond, James Bond.");
  const maxBioLength = 200;
  const characterCount = computed(() => maxBioLength - bio.value?.length || 0);
  const open = defineModel<boolean>({ default: false });

  // Image state
  const currentImage = ref<string | null>(defaultBanner);
  const currentAvatarImage = ref<string | null>(defaultAvatar);

  // File dialog
  const { open: handleBannerClick, onChange: onBannerChange } = useFileDialog({
    accept: "image/*",
    multiple: false,
    reset: true,
  });
  const { open: handleAvatarClick, onChange: onAvatarChange } = useFileDialog({
    accept: "image/*",
    multiple: false,
    reset: true,
  });

  // Handle file change for Banner
  onBannerChange(async (files) => {
    if (!files || files.length === 0) {
      currentImage.value = defaultBanner;
      return;
    }
    const file = files[0];
    const { execute } = useBase64(file);
    currentImage.value = await execute();
  });
  // Handle file change for Avatar
  onAvatarChange(async (files) => {
    if (!files || files.length === 0) {
      currentAvatarImage.value = defaultAvatar;
      return;
    }
    const file = files[0];
    const { execute } = useBase64(file);
    currentAvatarImage.value = await execute();
  });

  // Form state
  const { handleSubmit, isSubmitting } = useForm({
    name: "dialog-edit-profile",
    validationSchema: toTypedSchema(
      z.object({
        firstName: z
          .string()
          .nonempty("First name too short")
          .max(50, "Too long")
          .default("James")
          .describe("First name"),
        lastName: z.string().nonempty("Last name too short").max(50, "Too long").default("Bond"),
        username: z
          .string()
          .nonempty("Username too short")
          .max(30, "Too long")
          .default("agent-007"),
        website: z
          .string()
          .nonempty("Website invalid")
          .default("www.007.com")
          .refine(
            (v) => {
              // regex to check if a website is valid
              return /^(https?:\/\/)?([\da-z\\.-]+)\.([a-z\\.]{2,6})([\\/\w \\.-]*)*\/?$/.test(v);
            },
            { message: "Invalid URL" }
          ),
        bio: z.string().nonempty().max(200).default("The name is Bond, James Bond."),
      })
    ),
  });

  // Submit form
  const submit = handleSubmit(async (values) => {
    try {
      useSonner.success("Profile updated successfully.", {
        description: `Your profile has been updated successfully, ${values.firstName}!`,
      });
      open.value = false;
    } catch (error: any) {
      useSonner.error("An error occurred. Please try again.", {
        description: error.message,
      });
    }
  });
</script>
