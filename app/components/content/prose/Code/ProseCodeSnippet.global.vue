<template>
  <MDC v-if="loadedCode" :value="md" class="not-first:mt-5" />
  <ProseCallout v-else variant="error" title="Code Snippet Error">
    Cannot load code: <code>{{ file || url }}</code>
  </ProseCallout>
</template>

<script setup lang="ts">
  /**
   * ProseCodeSnippet - Dynamically import and display code from files or URLs
   *
   * This component allows you to import code snippets from your project files or external URLs
   * and display them with syntax highlighting. Useful for documentation where you want to show
   * actual source code without duplicating content.
   *
   * @example
   * ```mdc
   * ::code-snippet{file="/app/components/Button.vue" language="vue" title="Button Component"}
   * ::
   *
   * ::code-snippet{url="https://example.com/code.js" language="javascript" start="10" offset="5"}
   * ::
   * ```
   */

  const props = withDefaults(
    defineProps<{
      /**
       * Relative path to a file in your project to import
       * Must match a pattern in the import.meta.glob array
       * @example "/app/components/Button.vue"
       */
      file?: string;
      /**
       * External URL to fetch code from
       * @example "https://raw.githubusercontent.com/user/repo/main/file.js"
       */
      url?: string;
      /**
       * Programming language for syntax highlighting
       * @example "vue", "typescript", "javascript"
       */
      language: string;
      /**
       * Optional title displayed above the code block
       * @example "Button Component"
       */
      title?: string;
      /**
       * Line numbers or ranges to highlight (comma-separated)
       * @example "1,3-5,10"
       */
      highlights?: string;
      /**
       * Additional metadata for the code block (passed to ProsePre)
       * @example "icon=vue noFormat"
       */
      meta?: string;
      /**
       * Starting line number to extract from the file (1-indexed)
       * @example 10
       */
      start?: number | string;
      /**
       * Number of lines to extract from the starting line
       * @example 5
       */
      offset?: number | string;
    }>(),
    {
      file: undefined,
      url: undefined,
      title: undefined,
      highlights: undefined,
      meta: undefined,
      start: undefined,
      offset: undefined,
    }
  );

  const loadedCode = ref("");

  /**
   * Import all files matching the glob patterns
   *
   * ⚠️ PERFORMANCE WARNING:
   * Using broad patterns like '/app/**' will bundle ALL matching files into your build,
   * significantly increasing bundle size. Be as specific as possible with your patterns.
   *
   * For a large app, consider:
   * 1. Only glob specific directories you need (e.g., '/app/components/**' instead of '/app/**')
   * 2. Use specific file extensions (e.g., '*.vue' instead of '*')
   * 3. Exclude unnecessary paths with negative patterns
   * 4. Consider lazy-loading via URL fetching for large files
   *
   * @example
   * // ❌ BAD - Bundles entire app folder
   * import.meta.glob('/app/**')
   *
   * // ✅ GOOD - Specific directory and file types
   * import.meta.glob([
   *   '/app/components/**\/*.{vue,ts}',
   *   '/app/composables/**\/*.ts',
   *   '!/app/**\/*.test.ts', // Exclude test files
   * ])
   */
  const rawFiles = import.meta.glob(
    [
      // Add your specific patterns here
      "~/**/*.{vue,ts,css,json}",
      "!~/**/*.{test,spec}.{vue,ts}",
    ],
    {
      query: "?raw",
      import: "default",
      eager: false, // Lazy load to reduce initial bundle
    }
  );

  /**
   * Load code from file or URL
   */
  async function loadCode() {
    if (props.file) {
      const importer = rawFiles[props.file];
      if (importer) {
        try {
          loadedCode.value = (await importer()) as string;
        } catch (error) {
          console.error(`Failed to load file: ${props.file}`, error);
        }
      } else {
        console.warn(`File not found in glob patterns: ${props.file}`);
      }
    } else if (props.url) {
      try {
        const data = await $fetch(props.url, { parseResponse: (txt) => txt });
        if (data) {
          loadedCode.value = data as string;
        }
      } catch (error) {
        console.error(`Failed to fetch URL: ${props.url}`, error);
      }
    }
  }

  /**
   * Extract specific lines from the loaded code if start and offset are provided
   */
  function extractLines() {
    if (loadedCode.value && props.start !== undefined && props.offset !== undefined) {
      const lines = loadedCode.value.split("\n");
      const startIndex = Number(props.start) - 1; // Convert to 0-indexed
      const endIndex = startIndex + Number(props.offset);
      loadedCode.value = lines.slice(startIndex, endIndex).join("\n");
    }
  }

  /**
   * Generate markdown for MDC to render
   */
  const md = computed(() => {
    const titlePart = props.title ? `[${props.title}]` : "";
    const highlightsPart = props.highlights ? `{${props.highlights}}` : "";
    const metaPart = props.meta || "";

    return `
::div
\`\`\`\`${props.language} ${titlePart} ${highlightsPart} ${metaPart}
${loadedCode.value}
\`\`\`\`
::
`.trim();
  });

  // Load code on mount
  await loadCode();
  extractLines();
</script>
