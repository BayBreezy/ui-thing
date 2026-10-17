<template>
  <!--
    Settings page with label and description on the left and inputs on the right
    Features: Divided rows, photo upload area, per-section help text, save and cancel actions
  -->
  <div class="bg-background text-foreground min-h-screen">
    <UiContainer class="max-w-4xl px-4 py-8 md:px-6 lg:py-12">
      <div class="flex items-end justify-between gap-4 border-b pb-5">
        <div>
          <h1 class="text-2xl font-bold tracking-tight" v-html="props.title" />
          <p class="text-muted-foreground mt-1 text-sm" v-html="props.description" />
        </div>
        <div class="hidden gap-2 sm:flex">
          <UiButton variant="outline" @click="reset">Cancel</UiButton>
          <UiButton @click="save">Save</UiButton>
        </div>
      </div>

      <div class="divide-y">
        <section class="grid gap-4 py-6 md:grid-cols-[minmax(0,1fr)_2fr] md:gap-8">
          <div>
            <h2 class="text-sm font-semibold">Name</h2>
            <p class="text-muted-foreground text-sm">This is how you appear across the app.</p>
          </div>
          <div class="grid gap-4 sm:grid-cols-2">
            <UiInput v-model="form.firstName" aria-label="First name" />
            <UiInput v-model="form.lastName" aria-label="Last name" />
          </div>
        </section>

        <section class="grid gap-4 py-6 md:grid-cols-[minmax(0,1fr)_2fr] md:gap-8">
          <div>
            <h2 class="text-sm font-semibold">Email address</h2>
            <p class="text-muted-foreground text-sm">Used for sign in and notifications.</p>
          </div>
          <div class="relative">
            <Icon
              name="lucide:mail"
              class="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2"
            />
            <UiInput v-model="form.email" type="email" class="pl-9" aria-label="Email address" />
          </div>
        </section>

        <section class="grid gap-4 py-6 md:grid-cols-[minmax(0,1fr)_2fr] md:gap-8">
          <div>
            <h2 class="text-sm font-semibold">Your photo</h2>
            <p class="text-muted-foreground text-sm">This will be displayed on your profile.</p>
          </div>
          <div class="flex items-start gap-5">
            <UiAvatar class="size-16" src="https://i.pravatar.cc/200?img=32" fallback="MC" />
            <button
              type="button"
              class="hover:bg-accent/50 text-muted-foreground flex flex-1 flex-col items-center gap-2 rounded-lg border border-dashed px-6 py-5 text-center text-sm transition-colors"
              @click="useSonner.info('Open your file picker here')"
            >
              <span class="bg-muted flex size-9 items-center justify-center rounded-full border">
                <Icon name="lucide:upload-cloud" class="size-4" />
              </span>
              <span>
                <span class="text-primary font-semibold">Click to upload</span>
                or drag and drop
              </span>
              <span class="text-xs">SVG, PNG, JPG or GIF (max. 800x400px)</span>
            </button>
          </div>
        </section>

        <section class="grid gap-4 py-6 md:grid-cols-[minmax(0,1fr)_2fr] md:gap-8">
          <div>
            <h2 class="text-sm font-semibold">Role</h2>
            <p class="text-muted-foreground text-sm">Helps teammates know who you are.</p>
          </div>
          <UiInput v-model="form.role" aria-label="Role" />
        </section>

        <section class="grid gap-4 py-6 md:grid-cols-[minmax(0,1fr)_2fr] md:gap-8">
          <div>
            <h2 class="text-sm font-semibold">Timezone</h2>
            <p class="text-muted-foreground text-sm">Used to show times in your local zone.</p>
          </div>
          <UiNativeSelect v-model="form.timezone" aria-label="Timezone">
            <option value="Pacific Standard Time (PST)">Pacific Standard Time (PST)</option>
            <option value="Eastern Standard Time (EST)">Eastern Standard Time (EST)</option>
            <option value="Central European Time (CET)">Central European Time (CET)</option>
            <option value="Australian Eastern Time (AEST)">Australian Eastern Time (AEST)</option>
          </UiNativeSelect>
        </section>

        <section class="grid gap-4 py-6 md:grid-cols-[minmax(0,1fr)_2fr] md:gap-8">
          <div>
            <h2 class="text-sm font-semibold">Bio</h2>
            <p class="text-muted-foreground text-sm">A short introduction for your profile.</p>
          </div>
          <UiTextarea v-model="form.bio" :rows="5" aria-label="Bio" />
        </section>
      </div>

      <div class="flex justify-end gap-2 border-t pt-5 sm:hidden">
        <UiButton variant="outline" @click="reset">Cancel</UiButton>
        <UiButton @click="save">Save</UiButton>
      </div>
    </UiContainer>
  </div>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
    }>(),
    {
      title: "Personal info",
      description: "Update your photo and personal details.",
    }
  );

  const initial = {
    firstName: "Maya",
    lastName: "Chen",
    email: "maya@uithing.com",
    role: "Product designer",
    timezone: "Pacific Standard Time (PST)",
    bio: "I'm a product designer based in Melbourne. I care about calm interfaces and good defaults.",
  };

  const form = reactive({ ...initial });

  function reset() {
    Object.assign(form, initial);
  }

  function save() {
    useSonner.success("Changes saved", { description: "Your profile is up to date." });
  }
</script>
