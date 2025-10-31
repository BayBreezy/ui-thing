<script setup lang="ts">
  const open = ref(false);
  const showDeleteDialog = ref(false);
</script>

<template>
  <UiDropdownMenu>
    <UiDropdownMenuTrigger as-child>
      <UiButton variant="secondary">
        <span class="sr-only">Actions</span>
        <Icon name="lucide:ellipsis" class="h-4 w-4" />
      </UiButton>
    </UiDropdownMenuTrigger>
    <UiDropdownMenuContent align="end">
      <UiDropdownMenuItem @select="open = true"> Content filter preferences </UiDropdownMenuItem>
      <UiDropdownMenuSeparator />
      <UiDropdownMenuItem variant="destructive" @select="showDeleteDialog = true">
        Delete preset
      </UiDropdownMenuItem>
    </UiDropdownMenuContent>
  </UiDropdownMenu>
  <UiDialog v-model:open="open">
    <UiDialogContent>
      <UiDialogHeader>
        <UiDialogTitle>Content filter preferences</UiDialogTitle>
        <UiDialogDescription>
          The content filter flags text that may violate our content policy. It's powered by our
          moderation endpoint which is free to use to moderate your OpenAI API traffic. Learn more.
        </UiDialogDescription>
      </UiDialogHeader>
      <div class="">
        <h4 class="text-sm text-muted-foreground">Playground Warnings</h4>
        <div class="flex items-start justify-between space-x-4 pt-3">
          <UiSwitch id="show" name="show" :default-checked="true" />
          <UiLabel class="grid gap-1 font-normal" for="show">
            <span class="font-semibold"> Show a warning when content is flagged </span>
            <span class="text-sm text-muted-foreground">
              A warning will be shown when sexual, hateful, violent or self-harm content is
              detected.
            </span>
          </UiLabel>
        </div>
      </div>
      <UiDialogFooter>
        <UiButton variant="secondary" @click="open = false"> Close </UiButton>
      </UiDialogFooter>
    </UiDialogContent>
  </UiDialog>
  <UiAlertDialog v-model:open="showDeleteDialog">
    <UiAlertDialogContent>
      <UiAlertDialogHeader>
        <UiAlertDialogTitle>Are you absolutely sure?</UiAlertDialogTitle>
        <UiAlertDialogDescription>
          This action cannot be undone. This preset will no longer be accessible by you or others
          you've shared it with.
        </UiAlertDialogDescription>
      </UiAlertDialogHeader>
      <UiAlertDialogFooter>
        <UiAlertDialogCancel>Cancel</UiAlertDialogCancel>
        <UiButton variant="destructive" @click="showDeleteDialog = false"> Delete </UiButton>
      </UiAlertDialogFooter>
    </UiAlertDialogContent>
  </UiAlertDialog>
</template>
