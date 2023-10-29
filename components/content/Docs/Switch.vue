<template>
  <div>
    <Heading
      title="Switch"
      subtext="A control that allows the user to toggle between checked and not checked."
      radix-link="https://www.radix-vue.com/components/switch.html"
    />

    <div class="flex items-center space-x-2">
      <UISwitch id="airplane-mode" />
      <UILabel for="airplane-mode">Airplane Mode</UILabel>
    </div>
  </div>
</template>

<script lang="ts" setup></script>
