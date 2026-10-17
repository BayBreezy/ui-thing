<template>
  <!--
    Danger zone for destructive account actions
    Features: Export data, deactivate and delete rows, delete requires typing the account name inside an alert dialog
  -->
  <UiCard class="border-destructive/40">
    <UiCardHeader>
      <UiCardTitle class="text-destructive">{{ props.title }}</UiCardTitle>
      <UiCardDescription>{{ props.description }}</UiCardDescription>
    </UiCardHeader>
    <UiCardContent class="divide-y p-0">
      <div class="flex flex-wrap items-center justify-between gap-4 px-6 py-4">
        <div>
          <p class="text-sm font-medium">Export your data</p>
          <p class="text-muted-foreground text-sm">Download a copy of everything we store.</p>
        </div>
        <UiButton variant="outline" size="sm" @click="useSonner.info('Export started')">
          <Icon name="lucide:download" class="size-4" />
          Export
        </UiButton>
      </div>
      <div class="flex flex-wrap items-center justify-between gap-4 px-6 py-4">
        <div>
          <p class="text-sm font-medium">Deactivate account</p>
          <p class="text-muted-foreground text-sm">Hide your profile. You can come back anytime.</p>
        </div>
        <UiButton variant="outline" size="sm" @click="useSonner.info('Account deactivated')">
          Deactivate
        </UiButton>
      </div>
      <div class="flex flex-wrap items-center justify-between gap-4 px-6 py-4">
        <div>
          <p class="text-sm font-medium">Delete account</p>
          <p class="text-muted-foreground text-sm">
            Permanently remove your account and all of its data.
          </p>
        </div>
        <UiAlertDialog v-model:open="open">
          <UiAlertDialogTrigger as-child>
            <UiButton variant="destructive" size="sm">Delete account</UiButton>
          </UiAlertDialogTrigger>
          <UiAlertDialogContent>
            <UiAlertDialogHeader>
              <UiAlertDialogTitle>Are you absolutely sure?</UiAlertDialogTitle>
              <UiAlertDialogDescription>
                This permanently deletes your account. Type
                <span class="text-foreground font-semibold">{{ props.confirmText }}</span>
                to confirm.
              </UiAlertDialogDescription>
            </UiAlertDialogHeader>
            <UiInput v-model="typed" :placeholder="props.confirmText" aria-label="Confirmation" />
            <UiAlertDialogFooter>
              <UiAlertDialogCancel @click="typed = ''">Cancel</UiAlertDialogCancel>
              <UiAlertDialogAction
                :disabled="typed !== props.confirmText"
                class="bg-destructive hover:bg-destructive/90 text-white"
                @click="remove"
              >
                Delete account
              </UiAlertDialogAction>
            </UiAlertDialogFooter>
          </UiAlertDialogContent>
        </UiAlertDialog>
      </div>
    </UiCardContent>
  </UiCard>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      confirmText?: string;
    }>(),
    {
      title: "Danger zone",
      description: "These actions are permanent or hard to undo.",
      confirmText: "delete my account",
    }
  );

  const open = ref(false);
  const typed = ref("");

  function remove() {
    typed.value = "";
    useSonner.error("Account deleted");
  }
</script>
