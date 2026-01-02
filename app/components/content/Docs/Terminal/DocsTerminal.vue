<template>
  <UiTerminal class="mx-auto">
    <UiTerminalItem :index="0">
      <UiTerminalTypingAnimation text="> npx ui-thing@latest init" />
    </UiTerminalItem>

    <UiTerminalItem v-for="(text, i) in texts" :key="i" :index="i + 1">
      <UiTerminalAnimatedSpan class="text-green-500">
        <span>{{ text }}</span>
      </UiTerminalAnimatedSpan>
    </UiTerminalItem>

    <UiTerminalItem :index="texts.length + 1">
      <UiTerminalTypingAnimation
        text="Success! Project initialization completed."
        class="text-muted-foreground"
      />
    </UiTerminalItem>

    <UiTerminalItem :index="texts.length + 2">
      <UiTerminalTypingAnimation text="You may now add components." class="text-muted-foreground" />
    </UiTerminalItem>
  </UiTerminal>
</template>

<script lang="ts" setup>
  const texts = [
    "✔ Which Nuxt version are you using? > Nuxt 4",
    "✔ Which theme do you want to start with? > Zinc",
    "✔ Where is your tailwind.css file located? ... app/assets/css/tailwind.css",
    "✔ Where is your tailwind.config file located? ... tailwind.config.js",
    "✔ Where should your components be stored? ... app/components/Ui",
    "✔ Where should your composables be stored? ... app/composables",
    "✔ Where should your plugins be stored? ... app/plugins",
    "✔ Where should your utils be stored? ... app/utils",
    "✔ Should we just replace component files if they already exist? ... yes",
    "✔ Would you like to use the default filename when adding components? ... yes",
    "✔ Which package manager do you use? > NPM",
  ];
</script>
