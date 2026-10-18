<template>
  <!--
    Brand setup with logo upload and accent color
    Features: Dropzone with image preview that reads the file locally, remove button, accent color swatches, a live preview card that updates as you type and a save action
  -->
  <UiContainer class="py-16 lg:py-24">
    <div class="mx-auto grid max-w-4xl gap-10 md:grid-cols-2">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Make it yours</h1>
        <p class="text-muted-foreground mt-2">
          Add a logo and pick an accent color for your workspace.
        </p>

        <div class="mt-8 grid gap-6">
          <div class="grid gap-2">
            <UiLabel for="brand-name">Display name</UiLabel>
            <UiInput id="brand-name" v-model="name" placeholder="Acme Inc." />
          </div>

          <div class="grid gap-2">
            <UiLabel>Logo</UiLabel>
            <div v-if="logo" class="flex items-center gap-4 rounded-lg border p-3">
              <img :src="logo" alt="Logo preview" class="size-14 rounded-lg object-cover" />
              <div class="min-w-0 flex-1 text-sm">
                <p class="truncate font-medium">{{ fileName }}</p>
                <p class="text-muted-foreground">Ready to upload</p>
              </div>
              <UiButton variant="ghost" size="sm" @click="removeLogo">Remove</UiButton>
            </div>
            <UiDropfile
              v-else
              :multiple="false"
              accept="image/*"
              title="Click to upload or drag a logo here"
              subtext="PNG, JPG or SVG, up to 2 MB"
              @dropped="onFiles"
            />
          </div>

          <fieldset class="grid gap-2">
            <legend class="text-sm leading-none font-medium">Accent color</legend>
            <div class="mt-2 flex flex-wrap gap-3">
              <button
                v-for="color in colors"
                :key="color.value"
                type="button"
                class="focus-visible:ring-ring/50 grid size-9 place-items-center rounded-full ring-offset-2 transition outline-none focus-visible:ring-[3px]"
                :class="accent === color.value ? 'ring-offset-background ring-2' : ''"
                :style="{ backgroundColor: color.value, '--tw-ring-color': color.value }"
                :aria-label="color.label"
                :aria-pressed="accent === color.value"
                @click="accent = color.value"
              >
                <Icon v-if="accent === color.value" name="lucide:check" class="size-4 text-white" />
              </button>
            </div>
          </fieldset>

          <UiButton class="w-fit" @click="useSonner.success('Brand saved')">Save brand</UiButton>
        </div>
      </div>

      <div>
        <p class="text-muted-foreground mb-3 text-sm font-medium">Preview</p>
        <UiCard class="overflow-hidden">
          <div class="h-2" :style="{ backgroundColor: accent }" />
          <UiCardContent class="flex items-center gap-3 pt-6">
            <img v-if="logo" :src="logo" alt="" class="size-12 rounded-lg object-cover" />
            <span
              v-else
              class="grid size-12 place-items-center rounded-lg text-lg font-bold text-white"
              :style="{ backgroundColor: accent }"
            >
              {{ (name || "A")[0]!.toUpperCase() }}
            </span>
            <div>
              <p class="font-semibold">{{ name || "Your workspace" }}</p>
              <p class="text-muted-foreground text-sm">3 members · Free plan</p>
            </div>
          </UiCardContent>
          <UiCardFooter>
            <span
              class="inline-flex h-9 items-center rounded-md px-4 text-sm font-medium text-white"
              :style="{ backgroundColor: accent }"
            >
              New project
            </span>
          </UiCardFooter>
        </UiCard>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  const colors = [
    { label: "Indigo", value: "#4f46e5" },
    { label: "Emerald", value: "#059669" },
    { label: "Rose", value: "#e11d48" },
    { label: "Amber", value: "#d97706" },
    { label: "Sky", value: "#0284c7" },
    { label: "Slate", value: "#334155" },
  ];

  const name = ref("Acme Inc.");
  const accent = ref(colors[0]!.value);
  const logo = ref("");
  const fileName = ref("");

  function onFiles(files: File[]) {
    const file = files[0];
    if (!file || !file.type.startsWith("image/")) {
      useSonner.error("Please choose an image file");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      useSonner.error("That image is larger than 2 MB");
      return;
    }
    removeLogo();
    logo.value = URL.createObjectURL(file);
    fileName.value = file.name;
  }

  function removeLogo() {
    if (logo.value) URL.revokeObjectURL(logo.value);
    logo.value = "";
    fileName.value = "";
  }

  onBeforeUnmount(removeLogo);
</script>
