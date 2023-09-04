<template>
  <div>
    <Heading
      title="Separator"
      subtext="Visually or semantically separates content."
      radix-link="https://www.radix-vue.com/components/separator.html"
    />

    <div>
      <div class="space-y-1">
        <h4 class="text-sm font-medium leading-none">Radix Vue</h4>
        <p class="text-sm text-muted-foreground">An open-source UI component library.</p>
      </div>
      <UISeparator class="my-4" />
      <div class="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <UISeparator orientation="vertical" />
        <div>Docs</div>
        <UISeparator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>
