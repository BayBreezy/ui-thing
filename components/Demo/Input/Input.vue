<template>
  <div>
    <Heading
      title="Input"
      subtext="Displays a form input field or a component that looks like an input field."
    />

    <UIInput type="email" placeholder="Email" />

    <div class="mt-7 grid w-full max-w-sm items-center gap-1.5">
      <UILabel for="picture">Picture</UILabel>
      <UIInput id="picture" type="file" />
    </div>
  </div>
</template>

<script lang="ts" setup></script>
