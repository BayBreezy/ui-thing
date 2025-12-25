<template>
  <MDC :value="md" class="not-first:mt-5" />
</template>

<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      /**
       * Whether to render in a stack layout
       * @default false
       */
      inStack?: boolean;
      /**
       * Command to execute (e.g., "create-vue@latest", "nuxi init")
       */
      command: string;
      /**
       * Sync identifier for syncing with other code groups
       * @default "_pm"
       */
      sync?: string;
      /**
       * Disable syncing between code groups
       * @default false
       */
      noSync?: boolean;
    }>(),
    {
      inStack: false,
      sync: "_pm",
      noSync: false,
    }
  );

  const { packageManagers } = usePm();

  const md = computed(() => {
    const codeBlocks = packageManagers
      .map((pm) => {
        const command = `${pm.x}${props.command}`;
        return `\`\`\`bash icon="${pm.icon}" noFormat hideHeader [${pm.name}]\n${command}\n\`\`\``;
      })
      .join("\n\n");

    const attributes = [
      props.inStack && "in-stack",
      !props.noSync && `sync="${props.sync}"`,
      `noFormat`,
      "hideHeaderMeta",
    ]
      .filter(Boolean)
      .join(" ");

    return `::prose-code-group${attributes ? `{${attributes}}` : ""}\n${codeBlocks}\n::`;
  });
</script>
