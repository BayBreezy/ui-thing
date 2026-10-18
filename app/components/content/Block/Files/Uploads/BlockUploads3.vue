<template>
  <!--
    Avatar upload
    Features: A round preview of the current photo, a change photo button that opens the file picker, instant preview of the chosen image, checks for type and size, remove photo and a save button, with initials as a fallback
  -->
  <UiContainer class="py-12 lg:py-20">
    <UiCard class="mx-auto w-full max-w-md">
      <UiCardHeader>
        <UiCardTitle>Profile photo</UiCardTitle>
        <UiCardDescription>This is shown on your profile and in comments.</UiCardDescription>
      </UiCardHeader>
      <UiCardContent>
        <div class="flex items-center gap-5">
          <UiAvatar :src="preview || undefined" :fallback="initials" class="size-24 text-2xl" />
          <div class="space-y-2">
            <div class="flex flex-wrap gap-2">
              <UiButton variant="outline" size="sm" @click="browse()"
                ><Icon name="lucide:camera" class="size-4" />{{
                  preview ? "Change photo" : "Upload photo"
                }}</UiButton
              >
              <UiButton
                v-if="preview"
                variant="ghost"
                size="sm"
                class="text-destructive"
                @click="clear"
                >Remove</UiButton
              >
            </div>
            <p class="text-muted-foreground text-xs">JPG or PNG, up to {{ maxMb }} MB.</p>
          </div>
        </div>
        <p v-if="error" class="text-destructive mt-3 text-sm" role="alert">{{ error }}</p>
        <p v-else-if="name" class="text-muted-foreground mt-3 text-sm" aria-live="polite">
          Selected: {{ name }}
        </p>
      </UiCardContent>
      <UiCardFooter class="justify-end gap-2 border-t">
        <UiButton variant="outline" :disabled="!dirty" @click="reset">Cancel</UiButton>
        <UiButton :disabled="!dirty || !!error" @click="save">Save photo</UiButton>
      </UiCardFooter>
    </UiCard>
  </UiContainer>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      /** The photo the user has now. */
      current?: string;
      userName?: string;
      maxMb?: number;
    }>(),
    {
      current: "https://i.pravatar.cc/200?img=32",
      userName: "Maya Patel",
      maxMb: 2,
    }
  );

  const saved = ref(props.current);
  const preview = ref(props.current);
  const name = ref("");
  const error = ref("");
  const objectUrl = ref("");
  let savedUrl = "";

  const initials = computed(() =>
    props.userName
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
  );
  const dirty = computed(() => preview.value !== saved.value);

  const {
    open: browse,
    onChange,
    reset: resetDialog,
  } = useFileDialog({ accept: "image/png,image/jpeg", multiple: false });
  onChange((files) => {
    const file = files?.[0];
    if (!file) return;
    resetDialog();
    name.value = file.name;
    if (!["image/png", "image/jpeg"].includes(file.type)) {
      error.value = "Choose a JPG or PNG image.";
      return;
    }
    if (file.size > props.maxMb * 1024 * 1024) {
      error.value = `The image must be smaller than ${props.maxMb} MB.`;
      return;
    }
    error.value = "";
    revoke();
    objectUrl.value = URL.createObjectURL(file);
    preview.value = objectUrl.value;
  });

  function revoke() {
    if (objectUrl.value) URL.revokeObjectURL(objectUrl.value);
    objectUrl.value = "";
  }

  onBeforeUnmount(() => {
    revoke();
    if (savedUrl) URL.revokeObjectURL(savedUrl);
  });

  function clear() {
    revoke();
    preview.value = "";
    name.value = "";
    error.value = "";
  }

  function reset() {
    revoke();
    preview.value = saved.value;
    name.value = "";
    error.value = "";
  }

  function save() {
    // The saved photo now owns the object URL, so it is revoked on unmount.
    if (savedUrl && savedUrl !== objectUrl.value) URL.revokeObjectURL(savedUrl);
    savedUrl = objectUrl.value;
    objectUrl.value = "";
    saved.value = preview.value;
    name.value = "";
    useSonner.success("Profile photo updated");
  }
</script>
