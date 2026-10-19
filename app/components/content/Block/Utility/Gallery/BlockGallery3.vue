<template>
  <!--
    Portfolio grid
    Features: Category tabs with counts, project cards with year and tags, image zoom with a view project overlay, empty tab handling
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-5xl">
      <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 class="text-3xl font-bold lg:text-4xl">Selected work</h2>
          <p class="text-muted-foreground mt-2 max-w-md">
            Brand, product and spatial projects from the last three years.
          </p>
        </div>
        <UiTabs v-model="tab">
          <UiTabsList class="flex-wrap">
            <UiTabsTrigger v-for="item in tabs" :key="item.value" :value="item.value">
              {{ item.label }}
              <span class="text-muted-foreground ml-1 text-xs">{{ item.count }}</span>
            </UiTabsTrigger>
          </UiTabsList>
        </UiTabs>
      </div>

      <ul class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
        <li v-for="project in visible" :key="project.title">
          <article class="group">
            <div class="relative overflow-hidden rounded-xl">
              <img
                :src="project.image"
                :alt="project.alt"
                class="aspect-4/3 w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                loading="lazy"
              />
              <div
                class="absolute inset-0 grid place-items-center bg-black/40 opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100 motion-reduce:transition-none"
              >
                <UiButton variant="secondary" size="sm">
                  View project<Icon name="lucide:arrow-up-right" class="size-4" />
                </UiButton>
              </div>
            </div>
            <div class="mt-3 flex items-start justify-between gap-3">
              <div>
                <h3 class="font-semibold">{{ project.title }}</h3>
                <p class="text-muted-foreground text-sm">{{ project.category }}</p>
              </div>
              <span class="text-muted-foreground text-sm tabular-nums">{{ project.year }}</span>
            </div>
            <ul class="mt-2 flex flex-wrap gap-1.5">
              <li v-for="tag in project.tags" :key="tag">
                <UiBadge variant="secondary" size="sm">{{ tag }}</UiBadge>
              </li>
            </ul>
          </article>
        </li>
      </ul>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Project = {
    title: string;
    category: string;
    year: number;
    image: string;
    alt: string;
    tags: string[];
  };

  const props = withDefaults(
    defineProps<{
      projects?: Project[];
    }>(),
    {
      projects: () => [
        {
          title: "Fernwood identity",
          category: "Branding",
          year: 2026,
          image:
            "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
          alt: "Paper tote bag with a simple mark",
          tags: ["Logo", "Packaging"],
        },
        {
          title: "Tilework app",
          category: "Product",
          year: 2026,
          image:
            "https://images.unsplash.com/photo-1626908013351-800ddd734b8a?auto=format&fit=crop&w=800&q=80",
          alt: "Neon light streaks on a dark background",
          tags: ["iOS", "Design system"],
        },
        {
          title: "Harbour Loft",
          category: "Spaces",
          year: 2025,
          image:
            "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
          alt: "Bright living room with a grey sofa",
          tags: ["Interior", "Lighting"],
        },
        {
          title: "Paperboat studio",
          category: "Branding",
          year: 2025,
          image:
            "https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=800&q=80",
          alt: "Green suede shoe on a pastel backdrop",
          tags: ["Identity", "Campaign"],
        },
        {
          title: "Orbit dashboard",
          category: "Product",
          year: 2025,
          image:
            "https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&w=800&q=80",
          alt: "Flowing blue abstract shapes",
          tags: ["Web", "Data viz"],
        },
        {
          title: "North office",
          category: "Spaces",
          year: 2024,
          image:
            "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80",
          alt: "Open plan office with large windows",
          tags: ["Workplace", "Wayfinding"],
        },
      ],
    }
  );

  const tab = ref("all");

  const slug = (value: string) => value.toLowerCase();
  const tabs = computed(() => [
    { value: "all", label: "All", count: props.projects.length },
    ...[...new Set(props.projects.map((project) => project.category))].map((category) => ({
      value: slug(category),
      label: category,
      count: props.projects.filter((project) => project.category === category).length,
    })),
  ]);

  const visible = computed(() =>
    tab.value === "all"
      ? props.projects
      : props.projects.filter((project) => slug(project.category) === tab.value)
  );
</script>
