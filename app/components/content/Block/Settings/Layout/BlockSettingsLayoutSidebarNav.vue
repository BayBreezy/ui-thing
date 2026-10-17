<template>
  <!--
    Settings page with a vertical sidebar navigation
    Features: Sidebar nav with icons and active state, profile form with avatar upload, responsive (nav collapses to a scrollable row on mobile)
  -->
  <div class="bg-background text-foreground min-h-screen">
    <UiContainer class="px-4 py-8 md:px-6 lg:py-12">
      <div class="mb-8">
        <h1 class="text-2xl font-bold tracking-tight" v-html="props.title" />
        <p class="text-muted-foreground mt-1 text-sm" v-html="props.description" />
      </div>
      <div class="flex flex-col gap-8 lg:flex-row lg:gap-12">
        <nav
          class="-mx-4 flex gap-1 overflow-x-auto px-4 lg:mx-0 lg:w-56 lg:shrink-0 lg:flex-col lg:overflow-visible lg:px-0"
          aria-label="Settings"
        >
          <button
            v-for="item in props.items"
            :key="item.id"
            type="button"
            class="hover:bg-accent flex shrink-0 items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors"
            :class="
              active === item.id ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
            "
            :aria-current="active === item.id ? 'page' : undefined"
            @click="active = item.id"
          >
            <Icon :name="item.icon" class="size-4" />
            {{ item.label }}
            <UiBadge v-if="item.badge" variant="secondary" class="ml-auto">{{
              item.badge
            }}</UiBadge>
          </button>
        </nav>

        <main class="min-w-0 flex-1">
          <slot :active="active">
            <form class="space-y-8" @submit.prevent="save">
              <div>
                <h2 class="text-lg font-semibold">{{ activeItem?.label }}</h2>
                <p class="text-muted-foreground text-sm">
                  Update your photo and personal details here.
                </p>
              </div>
              <UiDivider />

              <div class="flex items-center gap-5">
                <UiAvatar
                  class="size-20"
                  :src="avatarPreview || 'https://i.pravatar.cc/200?img=47'"
                  fallback="MC"
                />
                <div class="flex flex-col gap-2">
                  <div class="flex gap-2">
                    <UiButton type="button" variant="outline" size="sm" @click="fileInput?.click()">
                      Upload new
                    </UiButton>
                    <UiButton
                      type="button"
                      variant="ghost"
                      size="sm"
                      @click="avatarPreview = undefined"
                    >
                      Remove
                    </UiButton>
                  </div>
                  <p class="text-muted-foreground text-xs">JPG, PNG or GIF. 2MB max.</p>
                  <input
                    ref="fileInput"
                    type="file"
                    accept="image/*"
                    class="sr-only"
                    @change="onFile"
                  />
                </div>
              </div>

              <div class="grid gap-5 sm:grid-cols-2">
                <div class="grid gap-2">
                  <UiLabel for="layout-first">First name</UiLabel>
                  <UiInput id="layout-first" v-model="form.firstName" />
                </div>
                <div class="grid gap-2">
                  <UiLabel for="layout-last">Last name</UiLabel>
                  <UiInput id="layout-last" v-model="form.lastName" />
                </div>
                <div class="grid gap-2 sm:col-span-2">
                  <UiLabel for="layout-email">Email</UiLabel>
                  <UiInput id="layout-email" v-model="form.email" type="email" />
                </div>
                <div class="grid gap-2 sm:col-span-2">
                  <UiLabel for="layout-bio">Bio</UiLabel>
                  <UiTextarea id="layout-bio" v-model="form.bio" :rows="4" />
                  <p class="text-muted-foreground text-xs">
                    {{ 275 - form.bio.length }} characters left
                  </p>
                </div>
              </div>

              <div class="flex justify-end gap-2">
                <UiButton type="button" variant="outline">Cancel</UiButton>
                <UiButton type="submit">Save changes</UiButton>
              </div>
            </form>
          </slot>
        </main>
      </div>
    </UiContainer>
  </div>
</template>

<script lang="ts" setup>
  type NavItem = { id: string; label: string; icon: string; badge?: string };

  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      items?: NavItem[];
    }>(),
    {
      title: "Settings",
      description: "Manage your account, team and billing preferences.",
      items: () => [
        { id: "profile", label: "My profile", icon: "lucide:user" },
        { id: "security", label: "Password & security", icon: "lucide:lock" },
        { id: "team", label: "Team", icon: "lucide:users" },
        { id: "billing", label: "Billing", icon: "lucide:credit-card" },
        { id: "notifications", label: "Notifications", icon: "lucide:bell", badge: "3" },
        { id: "integrations", label: "Integrations", icon: "lucide:plug" },
      ],
    }
  );

  const active = ref(props.items[0]?.id ?? "profile");
  const activeItem = computed(() => props.items.find((item) => item.id === active.value));

  const form = reactive({
    firstName: "Maya",
    lastName: "Chen",
    email: "maya@uithing.com",
    bio: "Product designer based in Melbourne. I like systems, spreadsheets and strong coffee.",
  });

  const fileInput = ref<HTMLInputElement>();
  const avatarPreview = ref<string>();

  function onFile(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) avatarPreview.value = URL.createObjectURL(file);
  }

  function save() {
    useSonner.success("Profile updated", {
      description: "Your changes have been saved.",
    });
  }
</script>
