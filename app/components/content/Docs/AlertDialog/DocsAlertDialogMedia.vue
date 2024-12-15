<template>
  <div class="flex justify-center">
    <UiAlertDialog>
      <UiAlertDialogTrigger as-child>
        <UiButton variant="outline">Post Blog</UiButton>
      </UiAlertDialogTrigger>
      <UiAlertDialogContent class="max-w-[400px]">
        <!-- eslint-disable-next-line vue/html-self-closing -->
        <img
          src="https://images.unsplash.com/photo-1515865404355-ddb5b0910878?q=60&w=2969&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          class="h-[200px] w-full rounded-lg object-cover shadow-sm"
        />
        <UiAlertDialogHeader>
          <UiAlertDialogTitle class="text-center">Blog post published</UiAlertDialogTitle>
          <UiAlertDialogDescription class="text-center">
            This blog post has been published. Team members will be able to edit this post and
            republish changes.
          </UiAlertDialogDescription>
        </UiAlertDialogHeader>
        <UiAlertDialogFooter class="grid grid-cols-2">
          <UiAlertDialogCancel> <Icon name="lucide:copy" /> Copy Link </UiAlertDialogCancel>
          <UiAlertDialogAction>Finish</UiAlertDialogAction>
        </UiAlertDialogFooter>
      </UiAlertDialogContent>
    </UiAlertDialog>
  </div>
</template>
