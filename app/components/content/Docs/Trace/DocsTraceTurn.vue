<template>
  <div class="mx-auto w-full max-w-sm">
    <UiTraceCollapsible default-open :unmount-on-hide="false">
      <UiTraceCollapsibleTrigger>
        <UiTraceLine status="error">
          <UiTraceTitle>Worked for 2m 4s, 1 command failed</UiTraceTitle>
        </UiTraceLine>
      </UiTraceCollapsibleTrigger>
      <UiTraceCollapsibleContent class="flex flex-col gap-2">
        <UiTrace>
          <UiTraceCollapsible>
            <UiTraceCollapsibleTrigger>
              <UiTraceLine>
                <UiTraceIcon>
                  <Icon name="lucide:brain" class="size-4" />
                </UiTraceIcon>
                <UiTraceTitle>Thought</UiTraceTitle>
                <UiTraceDescription>12s</UiTraceDescription>
              </UiTraceLine>
            </UiTraceCollapsibleTrigger>
            <UiTraceCollapsibleContent class="whitespace-pre-wrap">
              I should check which package managers are installed before I scaffold anything.
            </UiTraceCollapsibleContent>
          </UiTraceCollapsible>
          <UiTraceCollapsible default-open :unmount-on-hide="false">
            <UiTraceCollapsibleTrigger>
              <UiTraceLine status="error">
                <UiTraceIcon>
                  <Icon name="lucide:terminal" class="size-4" />
                </UiTraceIcon>
                <UiTraceTitle>Ran 2 commands, 1 failed</UiTraceTitle>
              </UiTraceLine>
            </UiTraceCollapsibleTrigger>
            <UiTraceCollapsibleContent>
              <UiTrace>
                <UiTraceLine>
                  <UiTraceIcon>
                    <Icon name="lucide:terminal" class="size-4" />
                  </UiTraceIcon>
                  <UiTraceTitle>Ran node --version</UiTraceTitle>
                </UiTraceLine>
                <UiTraceCollapsible>
                  <UiTraceCollapsibleTrigger>
                    <UiTraceLine status="error">
                      <UiTraceIcon>
                        <Icon name="lucide:terminal" class="size-4" />
                      </UiTraceIcon>
                      <UiTraceTitle>Failed to run pnpm --version</UiTraceTitle>
                    </UiTraceLine>
                  </UiTraceCollapsibleTrigger>
                  <UiTraceCollapsibleContent>
                    <UiCodeBlock size="sm" variant="destructive">
                      <UiCodeBlockContent wrap class="max-h-64">
                        command not found: pnpm
                      </UiCodeBlockContent>
                    </UiCodeBlock>
                  </UiTraceCollapsibleContent>
                </UiTraceCollapsible>
              </UiTrace>
            </UiTraceCollapsibleContent>
          </UiTraceCollapsible>
        </UiTrace>
        <p>Node is installed and pnpm is not. Reading the docs config.</p>
        <UiTrace>
          <a href="#turn">
            <UiTraceLine>
              <UiTraceIcon>
                <Icon name="lucide:file-text" class="size-4" />
              </UiTraceIcon>
              <UiTraceTitle>Read apps/v4/lib/docs.ts</UiTraceTitle>
              <UiTraceIcon>
                <Icon name="lucide:chevron-right" class="size-4" />
              </UiTraceIcon>
            </UiTraceLine>
          </a>
        </UiTrace>
      </UiTraceCollapsibleContent>
    </UiTraceCollapsible>
  </div>
</template>

<script lang="ts" setup></script>
