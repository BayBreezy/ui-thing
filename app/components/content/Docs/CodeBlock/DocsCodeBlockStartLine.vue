<template>
  <div class="mx-auto w-full max-w-md">
    <UiCodeBlock>
      <UiCodeBlockHeader>
        <UiCodeBlockTitle>server/api/projects.get.ts</UiCodeBlockTitle>
      </UiCodeBlockHeader>
      <UiCodeBlockContent line-numbers :start-line="995">
        <UiCodeBlockLine v-for="(line, index) in lines" :key="index">
          <UiCodeBlockToken v-for="(token, i) in line" :key="i" :token="token" />
        </UiCodeBlockLine>
      </UiCodeBlockContent>
    </UiCodeBlock>
  </div>
</template>

<script lang="ts" setup>
  const code = `  if (!session) {
    throw createError({ statusCode: 401 })
  }

  const projects = await db.project.findMany({
    where: { ownerId: session.user.id },
    orderBy: { updatedAt: "desc" },
  })

  return projects
})`;

  const lines = useHighlightedCode(code, "ts");
</script>
