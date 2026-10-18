<template>
  <!--
    Create a workspace form
    Features: Workspace name that fills in the URL slug automatically, editable slug with a domain prefix, team size select, validation with helpful messages and a create button with a loading state
  -->
  <UiContainer class="py-16 lg:py-24">
    <div class="mx-auto max-w-md">
      <div class="bg-primary/10 text-primary grid size-12 place-items-center rounded-xl">
        <Icon name="lucide:building-2" class="size-6" />
      </div>
      <h1 class="mt-5 text-3xl font-bold tracking-tight">Create your workspace</h1>
      <p class="text-muted-foreground mt-2">
        A workspace is where your team keeps everything together.
      </p>

      <form class="mt-8 grid gap-5" novalidate @submit.prevent="submit">
        <div class="grid gap-2">
          <UiLabel for="ws-name">Workspace name</UiLabel>
          <UiInput
            id="ws-name"
            v-model="name"
            placeholder="Acme Inc."
            :aria-invalid="Boolean(errors.name)"
            aria-describedby="ws-name-error"
          />
          <p v-if="errors.name" id="ws-name-error" class="text-destructive text-sm">
            {{ errors.name }}
          </p>
        </div>

        <div class="grid gap-2">
          <UiLabel for="ws-slug">Workspace URL</UiLabel>
          <div class="flex">
            <span
              class="bg-muted text-muted-foreground flex items-center rounded-l-md border border-r-0 px-3 text-sm"
            >
              {{ domain }}/
            </span>
            <UiInput
              id="ws-slug"
              v-model="slug"
              class="rounded-l-none"
              placeholder="acme"
              :aria-invalid="Boolean(errors.slug)"
              aria-describedby="ws-slug-error"
              @input="touched = true"
            />
          </div>
          <p v-if="errors.slug" id="ws-slug-error" class="text-destructive text-sm">
            {{ errors.slug }}
          </p>
          <p v-else class="text-muted-foreground text-xs">
            Lowercase letters, numbers and dashes only.
          </p>
        </div>

        <div class="grid gap-2">
          <UiLabel for="ws-size">Team size</UiLabel>
          <UiNativeSelect id="ws-size" v-model="size">
            <option v-for="option in sizes" :key="option">{{ option }}</option>
          </UiNativeSelect>
        </div>

        <UiButton type="submit" size="lg" :disabled="loading">
          <UiLoader v-if="loading" />
          Create workspace
        </UiButton>
      </form>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  withDefaults(
    defineProps<{
      domain?: string;
    }>(),
    { domain: "acme.app" }
  );

  const sizes = ["Just me", "2 to 10", "11 to 50", "51 to 200", "201 or more"];

  const name = ref("");
  const slug = ref("");
  const size = ref(sizes[1]!);
  const touched = ref(false);
  const loading = ref(false);
  const errors = reactive<{ name?: string; slug?: string }>({});

  function slugify(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  // Follow the name until the user edits the URL by hand.
  watch(name, (value) => {
    if (!touched.value) slug.value = slugify(value);
  });

  async function submit() {
    errors.name = name.value.trim() ? undefined : "Give your workspace a name.";
    errors.slug = /^[a-z0-9-]+$/.test(slug.value)
      ? undefined
      : "Use lowercase letters, numbers and dashes.";
    if (errors.name || errors.slug) return;
    loading.value = true;
    await new Promise((resolve) => setTimeout(resolve, 600));
    loading.value = false;
    useSonner.success(`Created ${name.value}`);
  }
</script>
