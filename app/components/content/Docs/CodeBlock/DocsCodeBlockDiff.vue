<template>
  <div class="mx-auto w-full max-w-md">
    <UiCodeBlock>
      <UiCodeBlockHeader>
        <UiCodeBlockTitle>components/Greeting.vue</UiCodeBlockTitle>
        <UiCodeBlockActions>
          <UiCodeBlockCopyButton :value="patch" />
        </UiCodeBlockActions>
      </UiCodeBlockHeader>
      <UiCodeBlockContent>
        <UiCodeBlockLine
          v-for="(line, index) in patch.split('\n')"
          :key="index"
          :variant="getVariant(line)"
        >
          {{ line.slice(1) }}
        </UiCodeBlockLine>
      </UiCodeBlockContent>
    </UiCodeBlock>
  </div>
</template>

<script lang="ts" setup>
  const patch = ` <template>
-  <p>Hello, {{ name }}</p>
+  <p class="text-sm text-muted-foreground">
+    Hello, {{ name }}!
+  </p>
 </template>`;

  function getVariant(line: string) {
    if (line.startsWith("+")) return "added";

    if (line.startsWith("-")) return "removed";

    return "default";
  }
</script>
