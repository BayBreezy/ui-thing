<template>
  <!--
    Job application form
    Features: Name, email, portfolio link, resume file picker and cover note with validation, character counter, privacy consent, confirmation state with a summary
  -->
  <UiContainer class="py-12 lg:py-20">
    <UiCard class="mx-auto w-full max-w-2xl">
      <template v-if="!submitted">
        <UiCardHeader>
          <UiCardTitle class="text-2xl">Apply for {{ role }}</UiCardTitle>
          <UiCardDescription
            >Takes about five minutes. A person reads every application.</UiCardDescription
          >
        </UiCardHeader>
        <UiCardContent>
          <form class="grid gap-5" novalidate @submit.prevent="submit">
            <div class="grid gap-5 sm:grid-cols-2">
              <div class="grid gap-2">
                <UiLabel for="apply-name">Full name</UiLabel>
                <UiInput
                  id="apply-name"
                  v-model="form.name"
                  autocomplete="name"
                  placeholder="Alex Rivera"
                  :aria-invalid="!!errors.name"
                />
                <p v-if="errors.name" class="text-destructive text-sm">{{ errors.name }}</p>
              </div>
              <div class="grid gap-2">
                <UiLabel for="apply-email">Email</UiLabel>
                <UiInput
                  id="apply-email"
                  v-model="form.email"
                  type="email"
                  autocomplete="email"
                  placeholder="alex@example.com"
                  :aria-invalid="!!errors.email"
                />
                <p v-if="errors.email" class="text-destructive text-sm">{{ errors.email }}</p>
              </div>
            </div>

            <div class="grid gap-2">
              <UiLabel for="apply-link">Portfolio or LinkedIn</UiLabel>
              <UiInput
                id="apply-link"
                v-model="form.link"
                type="url"
                placeholder="https://alexrivera.example.com"
                :aria-invalid="!!errors.link"
              />
              <p v-if="errors.link" class="text-destructive text-sm">{{ errors.link }}</p>
            </div>

            <div class="grid gap-2">
              <p id="apply-resume" class="text-sm leading-none font-medium">Resume</p>
              <div class="flex flex-wrap items-center gap-3 rounded-lg border border-dashed p-3">
                <UiButton
                  type="button"
                  variant="outline"
                  size="sm"
                  aria-describedby="apply-resume"
                  @click="open()"
                >
                  <Icon name="lucide:upload" class="size-4" />Choose file
                </UiButton>
                <p v-if="file" class="flex min-w-0 items-center gap-2 text-sm">
                  <Icon name="lucide:file-text" class="size-4 shrink-0" />
                  <span class="truncate">{{ file.name }}</span>
                  <UiButton
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    aria-label="Remove resume"
                    @click="file = null"
                    ><Icon name="lucide:x" class="size-4"
                  /></UiButton>
                </p>
                <p v-else class="text-muted-foreground text-sm">PDF or Word, up to 5 MB</p>
              </div>
              <p v-if="errors.file" class="text-destructive text-sm">{{ errors.file }}</p>
            </div>

            <div class="grid gap-2">
              <div class="flex items-center justify-between gap-2">
                <UiLabel for="apply-note">Cover note</UiLabel>
                <span class="text-muted-foreground text-xs"
                  >{{ form.note.length }} / {{ maxNote }}</span
                >
              </div>
              <UiTextarea
                id="apply-note"
                v-model="form.note"
                :rows="4"
                :maxlength="maxNote"
                placeholder="Tell us about a project you are proud of."
              />
            </div>

            <div class="grid gap-2">
              <div class="flex items-start gap-2">
                <UiCheckbox id="apply-consent" v-model="form.consent" class="mt-0.5" />
                <UiLabel for="apply-consent" class="leading-snug font-normal"
                  >I agree to the processing of my data for this application.</UiLabel
                >
              </div>
              <p v-if="errors.consent" class="text-destructive text-sm">{{ errors.consent }}</p>
            </div>

            <UiButton type="submit" size="lg">Submit application</UiButton>
          </form>
        </UiCardContent>
      </template>

      <UiCardContent v-else class="space-y-4 py-6 text-center" role="status">
        <span
          class="mx-auto grid size-14 place-items-center rounded-full bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300"
          ><Icon name="lucide:check" class="size-7"
        /></span>
        <h2 class="text-2xl font-semibold">Application sent</h2>
        <p class="text-muted-foreground mx-auto max-w-md">
          Thanks, {{ firstName }}. We sent a confirmation to
          <span class="text-foreground font-medium">{{ form.email.trim() }}</span
          >. Expect a reply within five working days.
        </p>
        <UiButton variant="outline" @click="reset">Apply for another role</UiButton>
      </UiCardContent>
    </UiCard>
  </UiContainer>
</template>

<script lang="ts" setup>
  withDefaults(
    defineProps<{
      role?: string;
    }>(),
    { role: "Senior Product Designer" }
  );

  const maxNote = 500;
  const maxBytes = 5 * 1024 * 1024;

  const form = reactive({
    name: "",
    email: "",
    link: "",
    note: "",
    consent: false as boolean | "indeterminate",
  });
  const errors = reactive({ name: "", email: "", link: "", file: "", consent: "" });
  const file = ref<File | null>(null);
  const submitted = ref(false);

  const {
    open,
    onChange,
    reset: resetFiles,
  } = useFileDialog({
    accept: ".pdf,.doc,.docx",
    multiple: false,
  });

  onChange((files) => {
    if (files?.[0]) setFile(files[0]);
  });

  function setFile(next: File) {
    if (next.size > maxBytes) {
      errors.file = "That file is larger than 5 MB.";
      file.value = null;
      return;
    }
    errors.file = "";
    file.value = next;
  }

  const firstName = computed(() => form.name.trim().split(/\s+/)[0] || "there");

  function submit() {
    errors.name = form.name.trim() ? "" : "Enter your full name.";
    errors.email = /^\S+@\S+\.\S+$/.test(form.email.trim()) ? "" : "Enter a valid email address.";
    errors.link =
      !form.link.trim() || /^https?:\/\/\S+\.\S+/.test(form.link.trim())
        ? ""
        : "Enter a full link starting with https://.";
    errors.file = file.value ? "" : errors.file || "Attach your resume.";
    errors.consent = form.consent === true ? "" : "Please accept to continue.";
    if (Object.values(errors).some(Boolean)) return;
    submitted.value = true;
  }

  function reset() {
    Object.assign(form, { name: "", email: "", link: "", note: "", consent: false });
    file.value = null;
    resetFiles();
    submitted.value = false;
  }
</script>
