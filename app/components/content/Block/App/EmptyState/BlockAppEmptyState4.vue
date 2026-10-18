<template>
  <!--
    No projects with a ghost card grid
    Features: A dashed new project card that leads the grid, skeleton project cards that fade out, heading with description and secondary import action
  -->
  <div class="flex items-center justify-center px-4 py-12 sm:px-6">
    <div class="flex w-full max-w-2xl flex-col items-center text-center">
      <div class="flex flex-col gap-2">
        <slot name="title">
          <h2 class="text-xl font-bold tracking-tight">{{ props.title }}</h2>
        </slot>
        <slot name="description">
          <p class="text-muted-foreground mx-auto max-w-md text-sm text-balance">
            {{ props.description }}
          </p>
        </slot>
      </div>

      <div class="mt-8 grid w-full grid-cols-2 gap-4 sm:grid-cols-3">
        <slot name="action">
          <button
            type="button"
            class="group border-border hover:border-primary hover:bg-primary/5 flex min-h-36 flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-4 transition-colors"
          >
            <span
              class="bg-primary text-primary-foreground flex size-10 items-center justify-center rounded-full transition-transform group-hover:scale-110"
            >
              <Icon name="lucide:plus" class="size-5" />
            </span>
            <span class="text-sm font-semibold">New project</span>
          </button>
        </slot>

        <div
          v-for="(card, i) in 5"
          :key="card"
          class="bg-card flex min-h-36 flex-col justify-between rounded-xl border p-4 text-left"
          :class="[i > 1 && 'hidden sm:flex']"
          :style="{ opacity: 0.75 - i * 0.14 }"
          aria-hidden="true"
        >
          <div class="bg-muted size-8 rounded-lg" />
          <div class="space-y-2">
            <div class="bg-muted h-2.5 w-2/3 rounded-full" />
            <div class="bg-muted/70 h-2 w-1/2 rounded-full" />
          </div>
        </div>
      </div>

      <UiButton variant="ghost" class="mt-6">
        <Icon name="lucide:upload" class="size-4" />
        Import an existing project
      </UiButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
    }>(),
    {
      title: "Create your first project",
      description:
        "Projects keep your files, tasks and teammates in one place. Start from scratch or bring something you already have.",
    }
  );
</script>
