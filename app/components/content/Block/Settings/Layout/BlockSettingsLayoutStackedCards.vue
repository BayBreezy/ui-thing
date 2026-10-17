<template>
  <!--
    Settings page made of stacked cards, one per concern
    Features: Independent save per card, switches with descriptions, danger zone confirmed with an alert dialog
  -->
  <div class="bg-muted/30 text-foreground min-h-screen">
    <UiContainer class="max-w-3xl px-4 py-8 md:px-6 lg:py-12">
      <div class="mb-8">
        <h1 class="text-2xl font-bold tracking-tight" v-html="props.title" />
        <p class="text-muted-foreground mt-1 text-sm" v-html="props.description" />
      </div>

      <div class="space-y-6">
        <UiCard>
          <UiCardHeader>
            <UiCardTitle>Workspace</UiCardTitle>
            <UiCardDescription>The name and URL your team uses to find you.</UiCardDescription>
          </UiCardHeader>
          <UiCardContent class="grid gap-5 sm:grid-cols-2">
            <div class="grid gap-2">
              <UiLabel for="stack-name">Workspace name</UiLabel>
              <UiInput id="stack-name" v-model="workspace.name" />
            </div>
            <div class="grid gap-2">
              <UiLabel for="stack-slug">Workspace URL</UiLabel>
              <div class="flex">
                <span
                  class="bg-muted text-muted-foreground flex items-center rounded-l-md border border-r-0 px-3 text-sm"
                >
                  uithing.com/
                </span>
                <UiInput id="stack-slug" v-model="workspace.slug" class="rounded-l-none" />
              </div>
            </div>
          </UiCardContent>
          <UiCardFooter class="justify-end border-t">
            <UiButton size="sm" @click="saveCard('Workspace')">Save workspace</UiButton>
          </UiCardFooter>
        </UiCard>

        <UiCard>
          <UiCardHeader>
            <UiCardTitle>Preferences</UiCardTitle>
            <UiCardDescription>Control how the product behaves for you.</UiCardDescription>
          </UiCardHeader>
          <UiCardContent class="divide-y">
            <div
              v-for="pref in preferences"
              :key="pref.id"
              class="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
            >
              <div>
                <p class="text-sm font-medium">{{ pref.label }}</p>
                <p class="text-muted-foreground text-sm">{{ pref.hint }}</p>
              </div>
              <UiSwitch v-model="pref.enabled" :aria-label="pref.label" />
            </div>
          </UiCardContent>
          <UiCardFooter class="justify-end border-t">
            <UiButton size="sm" @click="saveCard('Preferences')">Save preferences</UiButton>
          </UiCardFooter>
        </UiCard>

        <UiCard class="border-destructive/40">
          <UiCardHeader>
            <UiCardTitle class="text-destructive">Delete workspace</UiCardTitle>
            <UiCardDescription>
              Permanently remove this workspace and everything in it. This cannot be undone.
            </UiCardDescription>
          </UiCardHeader>
          <UiCardFooter class="justify-end">
            <UiAlertDialog>
              <UiAlertDialogTrigger as-child>
                <UiButton variant="destructive" size="sm">Delete workspace</UiButton>
              </UiAlertDialogTrigger>
              <UiAlertDialogContent>
                <UiAlertDialogHeader>
                  <UiAlertDialogTitle>Delete {{ workspace.name }}?</UiAlertDialogTitle>
                  <UiAlertDialogDescription>
                    All projects, members and data will be removed immediately.
                  </UiAlertDialogDescription>
                </UiAlertDialogHeader>
                <UiAlertDialogFooter>
                  <UiAlertDialogCancel>Cancel</UiAlertDialogCancel>
                  <UiAlertDialogAction @click="useSonner.error('Workspace deleted')">
                    Delete
                  </UiAlertDialogAction>
                </UiAlertDialogFooter>
              </UiAlertDialogContent>
            </UiAlertDialog>
          </UiCardFooter>
        </UiCard>
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
      title: "Workspace settings",
      description: "Each section saves on its own, so nothing is lost by switching around.",
    }
  );

  const workspace = reactive({ name: "UI Thing", slug: "uithing" });

  const preferences = reactive([
    {
      id: "invites",
      label: "Allow member invites",
      hint: "Members can invite teammates without admin approval.",
      enabled: true,
    },
    {
      id: "public",
      label: "Public profile page",
      hint: "Anyone with the link can see your workspace overview.",
      enabled: false,
    },
    {
      id: "sso",
      label: "Require single sign-on",
      hint: "Members must sign in through your identity provider.",
      enabled: false,
    },
  ]);

  function saveCard(name: string) {
    useSonner.success(`${name} saved`);
  }
</script>
