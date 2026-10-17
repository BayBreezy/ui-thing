<template>
  <div class="mx-auto w-full max-w-md space-y-3 py-6">
    <UiInputGroup>
      <UiInputGroupAddon>
        <UiInputGroupText class="font-mono">$</UiInputGroupText>
      </UiInputGroupAddon>
      <UiInputGroupInput readonly :model-value="command" class="font-mono" aria-label="Command" />
      <UiInputGroupAddon align="inline-end">
        <UiInputGroupButton
          size="icon-xs"
          :aria-label="copied ? 'Copied' : 'Copy command'"
          @click="copy(command)"
        >
          <Icon :name="copied ? 'lucide:check' : 'lucide:copy'" class="size-4" />
        </UiInputGroupButton>
      </UiInputGroupAddon>
    </UiInputGroup>
    <span aria-live="polite" class="sr-only">{{ copied ? "Copied" : "" }}</span>

    <!-- Let the reader pick their package manager -->
    <UiTabs v-model="manager">
      <UiTabsList class="w-full">
        <UiTabsTrigger v-for="m in managers" :key="m.name" :value="m.name">
          {{ m.name }}
        </UiTabsTrigger>
      </UiTabsList>
    </UiTabs>
  </div>
</template>

<script lang="ts" setup>
  const managers = [
    { name: "bun", run: "bunx" },
    { name: "npm", run: "npx" },
    { name: "pnpm", run: "pnpm dlx" },
    { name: "yarn", run: "yarn dlx" },
  ];

  const manager = ref("bun");
  const command = computed(
    () => `${managers.find((m) => m.name === manager.value)!.run} ui-thing@latest add trace`
  );

  const { copy, copied } = useClipboard({ copiedDuring: 2000, legacy: true });
</script>
