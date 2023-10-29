<template>
  <div>
    <Heading
      title="Textarea"
      subtext="Displays a form textarea or a component that looks like a textarea."
    />

    <UITextarea placeholder="Bio" />

    <div class="mt-7 grid w-full items-center gap-2.5">
      <UILabel for="contact-message">Why are yiu here today?</UILabel>
      <UITextarea id="contact-message" />
    </div>
  </div>
</template>

<script lang="ts" setup></script>
