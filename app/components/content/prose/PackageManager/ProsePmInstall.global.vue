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
       * Package name to install
       */
      name?: string;
      /**
       * Sync identifier for syncing with other code groups
       * @default "_pm"
       */
      sync?: string;
      /**
       * Add --save-dev flag for dev dependencies
       * @default false
       */
      saveDev?: boolean;
      /**
       * Disable syncing between code groups
       * @default false
       */
      noSync?: boolean;
    }>(),
    {
      inStack: false,
      sync: "_pm",
      saveDev: false,
      noSync: false,
    }
  );

  const { packageManagers } = usePm();

  const md = computed(() => {
    const codeBlocks = packageManagers
      .map((pm) => {
        const command = props.name
          ? `${pm.command}${pm.install}${props.saveDev ? pm.saveDev : ""}${props.name}`
          : `${pm.command}${pm.installEmpty}`;

        return `\`\`\`bash icon="${pm.icon}" noFormat hideHeader [${pm.name}]\n${command}\n\`\`\``;
      })
      .join("\n\n");

    const attributes = [props.inStack && "in-stack", !props.noSync && `sync="${props.sync}"`]
      .filter(Boolean)
      .join(" ");

    return `::prose-code-group${attributes ? `{${attributes}}` : ""}\n${codeBlocks}\n::`;
  });
</script>
