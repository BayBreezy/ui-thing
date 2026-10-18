<template>
  <!--
    Choose how to get started with selectable option cards
    Features: Two large cards with icons and feature lists, recommended badge, selected state with check, continue button enabled after a choice
  -->
  <div class="flex items-center justify-center px-4 py-12 sm:px-6">
    <div class="w-full max-w-2xl">
      <div class="text-center">
        <slot name="title">
          <h2 class="text-xl font-bold tracking-tight">{{ props.title }}</h2>
        </slot>
        <slot name="description">
          <p class="text-muted-foreground mt-1.5 text-sm text-balance">{{ props.description }}</p>
        </slot>
      </div>

      <div class="mt-8 grid gap-4 sm:grid-cols-2" role="radiogroup" :aria-label="props.title">
        <button
          v-for="option in props.options"
          :key="option.id"
          type="button"
          role="radio"
          :aria-checked="selected === option.id"
          class="focus-visible:ring-ring/50 relative flex flex-col rounded-2xl border-2 p-5 text-left transition-all outline-none focus-visible:ring-[3px]"
          :class="
            selected === option.id
              ? 'border-primary bg-primary/5 shadow-sm'
              : 'border-border hover:border-ring hover:shadow-sm'
          "
          @click="selected = option.id"
        >
          <UiBadge v-if="option.recommended" class="absolute -top-2.5 left-5">Recommended</UiBadge>
          <span
            class="absolute top-4 right-4 flex size-5 items-center justify-center rounded-full border transition-colors"
            :class="
              selected === option.id ? 'bg-primary text-primary-foreground border-primary' : ''
            "
          >
            <Icon v-if="selected === option.id" name="lucide:check" class="size-3" />
          </span>
          <span
            class="flex size-12 items-center justify-center rounded-xl transition-colors"
            :class="selected === option.id ? 'bg-primary text-primary-foreground' : 'bg-muted'"
          >
            <Icon :name="option.icon" class="size-6" />
          </span>
          <span class="mt-4 text-base font-semibold">{{ option.title }}</span>
          <span class="text-muted-foreground mt-1 text-sm">{{ option.description }}</span>
          <ul class="text-muted-foreground mt-4 space-y-1.5 text-sm">
            <li v-for="point in option.points" :key="point" class="flex items-center gap-2">
              <Icon name="lucide:check" class="text-primary size-4 shrink-0" />
              {{ point }}
            </li>
          </ul>
        </button>
      </div>

      <div class="mt-6 flex flex-col items-center gap-3">
        <slot>
          <UiButton :disabled="!selected" size="lg" class="min-w-48" @click="confirm">
            Continue
            <Icon name="lucide:arrow-right" class="size-4" />
          </UiButton>
        </slot>
        <p class="text-muted-foreground flex items-center gap-1.5 text-xs">
          <Icon name="lucide:info" class="size-3.5" />
          You can change this later in your settings.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  type Option = {
    id: string;
    title: string;
    description: string;
    icon: string;
    points: string[];
    recommended?: boolean;
  };

  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      options?: Option[];
    }>(),
    {
      title: "Choose how to get started",
      description: "Pick a starting point. Both options lead to the same workspace.",
      options: () => [
        {
          id: "scratch",
          title: "Start from scratch",
          description: "A blank project you shape yourself.",
          icon: "lucide:file-plus-2",
          points: ["Full control over structure", "Add only what you need"],
        },
        {
          id: "template",
          title: "Use a template",
          description: "A ready-made setup you can tweak.",
          icon: "lucide:layout-template",
          points: ["Sample data included", "Live in under a minute"],
          recommended: true,
        },
      ],
    }
  );

  const selected = ref<string>();

  function confirm() {
    const option = props.options.find((item) => item.id === selected.value);
    useSonner.success(`${option?.title} selected`);
  }
</script>
