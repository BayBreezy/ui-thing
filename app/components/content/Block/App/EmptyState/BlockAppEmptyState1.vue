<template>
  <!--
    No search results with a faded ghost list
    Features: Skeleton rows that fade out behind a search badge, suggested searches as chips, clear search and create actions
  -->
  <div class="flex items-center justify-center px-4 py-12 sm:px-6">
    <div class="flex w-full max-w-md flex-col items-center text-center">
      <div class="relative w-full max-w-xs">
        <div
          class="space-y-2.5 mask-[linear-gradient(to_bottom,black_20%,transparent)] opacity-70"
          aria-hidden="true"
        >
          <div
            v-for="row in 4"
            :key="row"
            class="bg-card flex items-center gap-3 rounded-lg border p-3 shadow-xs"
          >
            <div class="bg-muted size-9 shrink-0 rounded-full" />
            <div class="flex-1 space-y-2">
              <div class="bg-muted h-2.5 rounded-full" :style="{ width: `${85 - row * 12}%` }" />
              <div class="bg-muted/70 h-2 w-1/2 rounded-full" />
            </div>
          </div>
        </div>
        <div class="absolute inset-x-0 bottom-0 flex translate-y-1/2 justify-center">
          <div
            class="bg-background flex size-16 items-center justify-center rounded-full border shadow-md"
          >
            <Icon :name="props.icon" class="text-muted-foreground size-7" />
          </div>
        </div>
      </div>

      <div class="mt-14 flex flex-col gap-2">
        <slot name="title">
          <h2 class="text-xl font-bold tracking-tight">{{ props.title }}</h2>
        </slot>
        <slot name="description">
          <p class="text-muted-foreground text-sm text-balance">{{ props.description }}</p>
        </slot>
      </div>

      <div v-if="props.suggestions.length" class="mt-5 flex flex-wrap justify-center gap-2">
        <span class="text-muted-foreground self-center text-xs">Try</span>
        <button
          v-for="term in props.suggestions"
          :key="term"
          type="button"
          class="bg-muted hover:bg-accent rounded-full px-3 py-1 text-xs font-medium transition-colors"
        >
          {{ term }}
        </button>
      </div>

      <slot>
        <div class="mt-7 flex flex-wrap items-center justify-center gap-3">
          <UiButton variant="outline">
            <Icon name="lucide:rotate-ccw" class="size-4" />
            Clear search
          </UiButton>
          <UiButton>
            <Icon name="lucide:plus" class="size-4" />
            Create record
          </UiButton>
        </div>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      icon?: string;
      suggestions?: string[];
    }>(),
    {
      title: "No results found",
      description:
        "We couldn't find anything matching your search. Check the spelling or try a broader term.",
      icon: "lucide:search-x",
      suggestions: () => ["invoices", "customers", "reports"],
    }
  );
</script>
