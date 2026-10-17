<template>
  <div class="mx-auto w-full max-w-lg">
    <!-- Numbers or ranges, using the line numbers you see (here they start at 12) -->
    <UiCodeBlock :code="code" language="ts">
      <UiCodeBlockContent line-numbers :start-line="12" :highlight-lines="[14, '17-18']" />
    </UiCodeBlock>
  </div>
</template>

<script lang="ts" setup>
  const code = `const result = streamText({
  model: "anthropic/claude-sonnet-4.5",
  messages: convertToModelMessages(messages),
  tools: {
    weather: tool({
      description: "Get the weather in a location",
      inputSchema: z.object({ location: z.string() }),
      execute: async ({ location }) => getWeather(location),
    }),
  },
});`;
</script>
