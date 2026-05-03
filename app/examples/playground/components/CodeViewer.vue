<template>
  <UiDialog>
    <UiDialogTrigger as-child>
      <UiButton variant="secondary"> View code </UiButton>
    </UiDialogTrigger>
    <UiDialogContent class="sm:max-w-[625px]">
      <UiDialogHeader>
        <UiDialogTitle>View code</UiDialogTitle>
        <UiDialogDescription>
          You can use the following code to start integrating your current prompt and settings into
          your application.
        </UiDialogDescription>
      </UiDialogHeader>
      <div class="grid gap-4">
        <MDC :value="code" class="text-sm" />
        <div>
          <p class="text-muted-foreground text-sm">
            Your API Key can be found here. You should use environment variables or a secret
            management tool to expose your key to your applications.
          </p>
        </div>
      </div>
    </UiDialogContent>
  </UiDialog>
</template>

<script lang="ts" setup>
  const code = `
\`\`\`python
import os
import openai

openai.api_key = os.getenv("OPENAI_API_KEY")

response = openai.Completion.create(
  model="davinci",
  prompt="",
  temperature=0.9,
  max_tokens=5,
  top_p=1,
  frequency_penalty=0,
  presence_penalty=0,
)
\`\`\`
`;
</script>
