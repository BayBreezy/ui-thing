<template>
  <div class="mx-auto grid w-full max-w-md gap-3">
    <UiCodeBlock v-for="v in variants" :key="v.variant" :variant="v.variant" size="sm">
      <UiCodeBlockHeader>
        <UiCodeBlockTitle :icon="v.icon" :text="v.title" />
      </UiCodeBlockHeader>
      <UiCodeBlockContent>{{ v.output }}</UiCodeBlockContent>
    </UiCodeBlock>
  </div>
</template>

<script lang="ts" setup>
  import type { CodeBlockVariant } from "~/components/Ui/CodeBlock/CodeBlock.vue";

  const variants: { variant: CodeBlockVariant; title: string; icon: string; output: string }[] = [
    { variant: "default", title: "Output", icon: "lucide:terminal", output: "Done in 2.8s" },
    {
      variant: "success",
      title: "Passed",
      icon: "lucide:circle-check",
      output: "Tests  42 passed (42)",
    },
    {
      variant: "warning",
      title: "Warnings",
      icon: "lucide:triangle-alert",
      output: "2 warnings: unused variable `props`",
    },
    {
      variant: "destructive",
      title: "Failed",
      icon: "lucide:circle-alert",
      output: "ERR_PNPM_OUTDATED_LOCKFILE  Cannot install with frozen-lockfile",
    },
  ];
</script>
