<template>
  <UiTrace class="mx-auto max-w-sm">
    <UiTraceCollapsible default-open :unmount-on-hide="false">
      <UiTraceCollapsibleTrigger>
        <UiTraceLine :status="summary.failed > 0 ? 'error' : undefined">
          <UiTraceIcon>
            <Icon name="lucide:flask-conical" class="size-4" />
          </UiTraceIcon>
          <UiTraceTitle>Ran {{ formatCounts(summary) }}</UiTraceTitle>
        </UiTraceLine>
      </UiTraceCollapsibleTrigger>
      <UiTraceCollapsibleContent>
        <UiTrace>
          <UiTraceCollapsible
            v-for="suite in suites"
            :key="suite.name"
            :default-open="countTests(suite.tests).failed > 0"
            :unmount-on-hide="false"
          >
            <UiTraceCollapsibleTrigger>
              <UiTraceLine :status="countTests(suite.tests).failed > 0 ? 'error' : undefined">
                <UiTraceIcon>
                  <Icon name="lucide:file-code" class="size-4" />
                </UiTraceIcon>
                <UiTraceTitle>
                  {{ suite.name }}, {{ formatCounts(countTests(suite.tests)) }}
                </UiTraceTitle>
              </UiTraceLine>
            </UiTraceCollapsibleTrigger>
            <UiTraceCollapsibleContent>
              <UiTrace>
                <template v-for="test in suite.tests" :key="test.name">
                  <UiTraceCollapsible v-if="test.status === 'failed'">
                    <UiTraceCollapsibleTrigger>
                      <UiTraceLine status="error">
                        <UiTraceIcon>
                          <Icon name="lucide:x" class="size-4" />
                        </UiTraceIcon>
                        <UiTraceTitle>{{ test.name }}</UiTraceTitle>
                      </UiTraceLine>
                    </UiTraceCollapsibleTrigger>
                    <UiTraceCollapsibleContent>
                      <UiCodeBlock size="sm">
                        <UiCodeBlockContent wrap class="max-h-64">
                          {{ test.error }}
                        </UiCodeBlockContent>
                      </UiCodeBlock>
                    </UiTraceCollapsibleContent>
                  </UiTraceCollapsible>
                  <UiTraceLine v-else>
                    <UiTraceIcon>
                      <Icon
                        v-if="test.status === 'skipped'"
                        name="lucide:circle-dashed"
                        class="size-4"
                      />
                      <Icon v-else name="lucide:check" class="size-4" />
                    </UiTraceIcon>
                    <UiTraceTitle>
                      {{ test.status === "skipped" ? `Skipped ${test.name}` : test.name }}
                    </UiTraceTitle>
                  </UiTraceLine>
                </template>
              </UiTrace>
            </UiTraceCollapsibleContent>
          </UiTraceCollapsible>
        </UiTrace>
      </UiTraceCollapsibleContent>
    </UiTraceCollapsible>
  </UiTrace>
</template>

<script lang="ts" setup>
  interface Test {
    name: string;
    status: "passed" | "failed" | "skipped";
    error?: string;
  }

  const suites: { name: string; tests: Test[] }[] = [
    {
      name: "auth.test.ts",
      tests: [
        { name: "logs in with valid credentials", status: "passed" },
        { name: "rejects an invalid password", status: "passed" },
        { name: "refreshes an expired token", status: "passed" },
      ],
    },
    {
      name: "user-api.test.ts",
      tests: [
        { name: "creates a user", status: "passed" },
        {
          name: "updates a user profile",
          status: "failed",
          error: `Expected status 200, received 500

  at Object.<anonymous> (src/user-api.test.ts:45:12)`,
        },
        { name: "deletes a user", status: "skipped" },
      ],
    },
    {
      name: "db.test.ts",
      tests: [
        { name: "connects to the database", status: "passed" },
        {
          name: "times out a slow query",
          status: "failed",
          error: `Exceeded timeout of 5000 ms for a test.

  at Object.<anonymous> (src/db.test.ts:22:3)`,
        },
      ],
    },
  ];

  function countTests(tests: Test[]) {
    return {
      total: tests.length,
      failed: tests.filter((test) => test.status === "failed").length,
      skipped: tests.filter((test) => test.status === "skipped").length,
    };
  }

  function formatCounts({ total, failed, skipped }: ReturnType<typeof countTests>) {
    return [`${total} tests`, failed > 0 && `${failed} failed`, skipped > 0 && `${skipped} skipped`]
      .filter(Boolean)
      .join(", ");
  }

  const summary = countTests(suites.flatMap((suite) => suite.tests));
</script>
