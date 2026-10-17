<template>
  <!--
    Settings page with horizontal tab navigation under the page header
    Features: Page header with actions, scrollable tab bar, tab panels with a profile form and a notification list
  -->
  <div class="bg-background text-foreground min-h-screen">
    <UiContainer class="px-4 py-8 md:px-6 lg:py-12">
      <div class="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold tracking-tight" v-html="props.title" />
          <p class="text-muted-foreground mt-1 text-sm" v-html="props.description" />
        </div>
        <div class="flex items-center gap-2">
          <UiButton variant="outline" size="sm">
            <Icon name="lucide:book-open" class="size-4" />
            Docs
          </UiButton>
          <UiButton size="sm" @click="save">
            <Icon name="lucide:check" class="size-4" />
            Save changes
          </UiButton>
        </div>
      </div>

      <UiTabs v-model="tab" class="mt-6">
        <div class="-mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
          <UiTabsList
            class="h-auto w-max justify-start gap-6 rounded-none border-b bg-transparent p-0"
          >
            <UiTabsTrigger
              v-for="item in props.tabs"
              :key="item.value"
              :value="item.value"
              class="data-[state=active]:border-primary text-muted-foreground data-[state=active]:text-foreground -mb-px rounded-none border-b-2 border-transparent bg-transparent px-1 pb-3 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              {{ item.label }}
            </UiTabsTrigger>
          </UiTabsList>
        </div>

        <UiTabsContent value="profile" class="mt-8 space-y-6">
          <div class="grid gap-5 sm:grid-cols-2">
            <div class="grid gap-2">
              <UiLabel for="top-first">First name</UiLabel>
              <UiInput id="top-first" v-model="form.firstName" />
            </div>
            <div class="grid gap-2">
              <UiLabel for="top-last">Last name</UiLabel>
              <UiInput id="top-last" v-model="form.lastName" />
            </div>
            <div class="grid gap-2 sm:col-span-2">
              <UiLabel for="top-email">Email</UiLabel>
              <UiInput id="top-email" v-model="form.email" type="email" />
            </div>
            <div class="grid gap-2 sm:col-span-2">
              <UiLabel for="top-role">Role</UiLabel>
              <UiNativeSelect id="top-role" v-model="form.role">
                <option>Product designer</option>
                <option>Engineer</option>
                <option>Product manager</option>
                <option>Founder</option>
              </UiNativeSelect>
            </div>
          </div>
        </UiTabsContent>

        <UiTabsContent value="notifications" class="mt-8">
          <div class="divide-y rounded-lg border">
            <div
              v-for="row in notifications"
              :key="row.id"
              class="flex items-center justify-between gap-4 p-4"
            >
              <div>
                <p class="text-sm font-medium">{{ row.label }}</p>
                <p class="text-muted-foreground text-sm">{{ row.hint }}</p>
              </div>
              <UiSwitch v-model="row.enabled" :aria-label="row.label" />
            </div>
          </div>
        </UiTabsContent>

        <UiTabsContent v-for="item in emptyTabs" :key="item.value" :value="item.value" class="mt-8">
          <slot :name="item.value">
            <div
              class="text-muted-foreground flex h-48 items-center justify-center rounded-lg border border-dashed text-sm"
            >
              {{ item.label }} settings go here
            </div>
          </slot>
        </UiTabsContent>
      </UiTabs>
    </UiContainer>
  </div>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      tabs?: { value: string; label: string }[];
    }>(),
    {
      title: "Account settings",
      description: "Manage your profile, notifications and workspace.",
      tabs: () => [
        { value: "profile", label: "My details" },
        { value: "notifications", label: "Notifications" },
        { value: "password", label: "Password" },
        { value: "team", label: "Team" },
        { value: "billing", label: "Billing" },
        { value: "integrations", label: "Integrations" },
      ],
    }
  );

  const tab = ref(props.tabs[0]?.value ?? "profile");
  const emptyTabs = computed(() =>
    props.tabs.filter((item) => !["profile", "notifications"].includes(item.value))
  );

  const form = reactive({
    firstName: "Maya",
    lastName: "Chen",
    email: "maya@uithing.com",
    role: "Product designer",
  });

  const notifications = reactive([
    {
      id: "comments",
      label: "Comments",
      hint: "Someone replies to or mentions you.",
      enabled: true,
    },
    {
      id: "invites",
      label: "Invites",
      hint: "You are invited to a new workspace.",
      enabled: true,
    },
    {
      id: "digest",
      label: "Weekly digest",
      hint: "A summary of what happened this week.",
      enabled: false,
    },
  ]);

  function save() {
    useSonner.success("Settings saved");
  }
</script>
