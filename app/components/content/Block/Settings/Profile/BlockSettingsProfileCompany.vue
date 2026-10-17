<template>
  <!--
    Company profile settings with logo upload
    Features: Logo preview and upload, name and website fields, industry and size selects, brand colour input
  -->
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>{{ props.title }}</UiCardTitle>
      <UiCardDescription>{{ props.description }}</UiCardDescription>
    </UiCardHeader>
    <form @submit.prevent="save">
      <UiCardContent class="space-y-6">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div
            class="bg-muted flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border"
          >
            <img v-if="logo" :src="logo" alt="Company logo" class="size-full object-cover" />
            <Icon v-else name="lucide:building-2" class="text-muted-foreground size-8" />
          </div>
          <div class="space-y-2">
            <div class="flex gap-2">
              <UiButton type="button" variant="outline" size="sm" @click="fileInput?.click()">
                Upload logo
              </UiButton>
              <UiButton
                v-if="logo"
                type="button"
                variant="ghost"
                size="sm"
                @click="logo = undefined"
              >
                Remove
              </UiButton>
            </div>
            <p class="text-muted-foreground text-xs">SVG, PNG or JPG. Square works best.</p>
            <input ref="fileInput" type="file" accept="image/*" class="sr-only" @change="onFile" />
          </div>
        </div>

        <div class="grid gap-5 sm:grid-cols-2">
          <div class="grid gap-2">
            <UiLabel for="company-name">Company name</UiLabel>
            <UiInput id="company-name" v-model="form.name" />
          </div>
          <div class="grid gap-2">
            <UiLabel for="company-site">Website</UiLabel>
            <div class="flex">
              <span
                class="bg-muted text-muted-foreground flex items-center rounded-l-md border border-r-0 px-3 text-sm"
              >
                https://
              </span>
              <UiInput id="company-site" v-model="form.website" class="rounded-l-none" />
            </div>
          </div>
          <div class="grid gap-2">
            <UiLabel for="company-industry">Industry</UiLabel>
            <UiNativeSelect id="company-industry" v-model="form.industry">
              <option>Software</option>
              <option>Finance</option>
              <option>Healthcare</option>
              <option>Education</option>
              <option>Retail</option>
            </UiNativeSelect>
          </div>
          <div class="grid gap-2">
            <UiLabel for="company-size">Company size</UiLabel>
            <UiNativeSelect id="company-size" v-model="form.size">
              <option>1-10 people</option>
              <option>11-50 people</option>
              <option>51-200 people</option>
              <option>201+ people</option>
            </UiNativeSelect>
          </div>
          <div class="grid gap-2 sm:col-span-2">
            <UiLabel for="company-color">Brand colour</UiLabel>
            <div class="flex items-center gap-3">
              <input
                id="company-color"
                v-model="form.color"
                type="color"
                class="size-9 cursor-pointer rounded-md border bg-transparent p-1"
              />
              <UiInput
                v-model="form.color"
                class="max-w-40 font-mono"
                aria-label="Brand colour hex"
              />
            </div>
          </div>
          <div class="grid gap-2 sm:col-span-2">
            <UiLabel for="company-about">About</UiLabel>
            <UiTextarea id="company-about" v-model="form.about" :rows="3" />
          </div>
        </div>
      </UiCardContent>
      <UiCardFooter class="justify-end gap-2 border-t">
        <UiButton type="button" variant="outline">Cancel</UiButton>
        <UiButton type="submit">Save changes</UiButton>
      </UiCardFooter>
    </form>
  </UiCard>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
    }>(),
    {
      title: "Company profile",
      description: "Update your company's logo and details.",
    }
  );

  const form = reactive({
    name: "UI Thing",
    website: "uithing.com",
    industry: "Software",
    size: "11-50 people",
    color: "#7c3aed",
    about: "We build tools that help small teams ship faster.",
  });

  const fileInput = ref<HTMLInputElement>();
  const logo = ref<string>();

  function onFile(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) logo.value = URL.createObjectURL(file);
  }

  function save() {
    useSonner.success("Company profile saved");
  }
</script>
