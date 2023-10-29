<template>
  <div>
    <Heading title="Alert" subtext="Displays a callout for user attention." />

    <UIAlert title="Heads up" description="You have 23 new messages" icon="lucide:mail" />
    <UIAlert
      class="mt-5"
      variant="destructive"
      title="Error"
      description="Your session has expired. Please log in again.
"
      icon="lucide:alert-circle"
    />
  </div>
</template>

<script lang="ts" setup></script>
