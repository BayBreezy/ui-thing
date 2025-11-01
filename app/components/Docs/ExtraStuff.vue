<template>
  <nav class="flex flex-col gap-2 text-sm">
    <template v-for="(link, i) in links" :key="i">
      <NuxtLink
        :title="link.label"
        :href="link.href"
        :target="link.external ? '_blank' : '_self'"
        :external="link.external"
        class="flex items-center gap-2 text-muted-foreground transition-all hover:text-foreground"
      >
        <Icon :name="link.icon" />
        {{ link.label }}</NuxtLink
      >
    </template>
  </nav>
</template>

<script lang="ts" setup>
  const { contentPage: page } = await useDocPage();
  const repoBase = "https://github.com/BayBreezy/ui-thing";
  const links = computed(() => [
    {
      icon: "lucide:pen",
      label: "Edit this page",
      external: true,
      href: `${repoBase}/edit/v2/content/${page?.stem}.md`,
    },
    { icon: "lucide:star", label: "Star on Github", external: true, href: repoBase },
    {
      icon: "lucide:bug",
      label: "Report an issue",
      external: true,
      href: `${repoBase}/issues/new?template=bug_report.yml`,
    },
    {
      icon: "lucide:lightbulb",
      label: "Feature request",
      external: true,
      href: `${repoBase}/issues/new?template=feature-request.yml`,
    },
    {
      icon: "lucide:coffee",
      label: "Buy me coffee",
      external: true,
      href: "https://buymeacoffee.com/llehXIrI8g",
    },
  ]);
</script>
