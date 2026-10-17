<template>
  <UiTrace class="mx-auto max-w-sm">
    <UiTraceCollapsible default-open>
      <UiTraceCollapsibleTrigger>
        <UiTraceLine>
          <UiTraceIcon>
            <Icon name="lucide:git-commit-horizontal" class="size-4" />
          </UiTraceIcon>
          <UiTraceTitle>Committed a1b2c3: Fix the login redirect</UiTraceTitle>
        </UiTraceLine>
      </UiTraceCollapsibleTrigger>
      <UiTraceCollapsibleContent>
        <UiTrace>
          <UiSheet v-for="file in files" :key="file.path">
            <UiSheetTrigger as-child>
              <button type="button">
                <UiTraceLine>
                  <UiTraceIcon>
                    <Icon v-if="file.added" name="lucide:file-plus" class="size-4" />
                    <Icon v-else name="lucide:file-pen" class="size-4" />
                  </UiTraceIcon>
                  <UiTraceTitle>
                    {{ file.added ? "Added" : "Edited" }} {{ file.path }}
                  </UiTraceTitle>
                  <UiTraceDescription class="font-mono">
                    +{{ file.additions }} −{{ file.deletions }}
                  </UiTraceDescription>
                  <UiTraceIcon>
                    <Icon name="lucide:chevron-right" class="size-4" />
                  </UiTraceIcon>
                </UiTraceLine>
              </button>
            </UiSheetTrigger>
            <UiSheetContent>
              <UiSheetHeader>
                <UiSheetTitle class="font-mono">
                  {{ file.path }}
                </UiSheetTitle>
                <UiSheetDescription>
                  {{ file.additions }} additions, {{ file.deletions }} deletions
                </UiSheetDescription>
              </UiSheetHeader>
              <UiCodeBlock class="mx-6 mb-6 w-auto">
                <UiCodeBlockContent>
                  <UiCodeBlockLine
                    v-for="(line, index) in diffLines(file.diff)"
                    :key="index"
                    :variant="line.variant"
                    :class="line.hunk ? 'text-muted-foreground' : undefined"
                  >
                    {{ line.text }}
                  </UiCodeBlockLine>
                </UiCodeBlockContent>
              </UiCodeBlock>
            </UiSheetContent>
          </UiSheet>
        </UiTrace>
      </UiTraceCollapsibleContent>
    </UiTraceCollapsible>
  </UiTrace>
</template>

<script lang="ts" setup>
  /* eslint-disable no-useless-escape */
  const files = [
    {
      path: "pages/login.vue",
      added: false,
      additions: 2,
      deletions: 2,
      diff: `@@ -1,6 +1,6 @@
 <script setup lang="ts">
 const route = useRoute()
 const next = route.query.next as string | undefined
-const redirectTo =
-  next && next.startsWith('/') ? next : '/'
+const redirectTo = safeRedirect(next)
+
 <\/script>`,
    },
    {
      path: "utils/redirect.ts",
      added: true,
      additions: 7,
      deletions: 0,
      diff: `@@ -0,0 +1,7 @@
+export function safeRedirect(next: string | undefined) {
+  if (!next || !next.startsWith('/') || next.startsWith('//')) {
+    return '/'
+  }
+
+  return next
+}`,
    },
  ];

  function diffLines(diff: string) {
    return diff.split("\n").map((line) => {
      if (line.startsWith("@@")) return { hunk: true, variant: "default" as const, text: line };

      return {
        hunk: false,
        variant: line.startsWith("+")
          ? ("added" as const)
          : line.startsWith("-")
            ? ("removed" as const)
            : ("default" as const),
        text: line.slice(1),
      };
    });
  }
</script>
