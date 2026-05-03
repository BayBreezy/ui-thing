<template>
  <div class="flex items-center justify-center">
    <UiEmpty>
      <UiEmptyHeader>
        <UiEmptyMedia variant="icon">
          <Icon name="lucide:folder-code" />
        </UiEmptyMedia>
        <UiEmptyTitle>No Projects Yet</UiEmptyTitle>
        <UiEmptyDescription>
          You haven't created any projects yet. Get started by creating your first project.
        </UiEmptyDescription>
      </UiEmptyHeader>
      <UiEmptyContent>
        <div className="flex gap-2">
          <UiButton>Create Project</UiButton>
          <UiButton variant="outline">Import Project</UiButton>
        </div>
      </UiEmptyContent>
      <UiButton variant="link" as-child size="sm">
        <a href="#" class="text-muted-foreground flex items-center gap-2">
          Learn More <Icon name="lucide:arrow-up-right" />
        </a>
      </UiButton>
    </UiEmpty>
  </div>
</template>
