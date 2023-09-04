<template>
  <div>
    <Heading
      title="Alert Dialog"
      subtext="A modal dialog that interrupts the user with important content and expects a response."
      radix-link="https://www.radix-vue.com/components/alert-dialog.html"
    />

    <UIAlertDialog>
      <UIAlertDialogTrigger as-child>
        <UIButton variant="outline">Show Dialog</UIButton>
      </UIAlertDialogTrigger>
      <UIAlertDialogContent @escape-key-down="showMessage('Escape key pressed')">
        <UIAlertDialogHeader>
          <UIAlertDialogTitle>Are you absolutely sure?</UIAlertDialogTitle>
          <UIAlertDialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </UIAlertDialogDescription>
        </UIAlertDialogHeader>
        <UIAlertDialogFooter>
          <UIAlertDialogCancel @click="showMessage('Action cancelled')" />
          <UIAlertDialogAction @click="showMessage('Action confirmed!')" />
        </UIAlertDialogFooter>
      </UIAlertDialogContent>
    </UIAlertDialog>
  </div>
</template>

<script lang="ts" setup>
  const showMessage = (message: string) => {
    alert(message);
  };
</script>
