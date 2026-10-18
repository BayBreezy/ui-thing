<template>
  <!--
    Booking page settings
    Features: Page title and link with a copy button, duration, buffer and minimum notice selects, a booking window in days, an approval switch, accent color swatches and a live preview card that follows every change
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_20rem]">
      <form class="space-y-6" @submit.prevent="save">
        <div>
          <h1 class="text-2xl font-bold tracking-tight">Booking page</h1>
          <p class="text-muted-foreground text-sm">Control how people book time with you.</p>
        </div>

        <div class="space-y-2">
          <UiLabel for="page-title">Title</UiLabel>
          <UiInput id="page-title" v-model="form.title" />
        </div>
        <div class="space-y-2">
          <UiLabel for="page-slug">Link</UiLabel>
          <div class="flex gap-2">
            <div class="flex flex-1 items-center overflow-hidden rounded-md border">
              <span class="bg-muted text-muted-foreground px-3 py-2 text-sm">{{ baseUrl }}/</span>
              <input
                id="page-slug"
                v-model="form.slug"
                class="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm outline-none"
                @input="form.slug = slugify(form.slug)"
              />
            </div>
            <UiButton
              type="button"
              variant="outline"
              size="icon"
              aria-label="Copy link"
              @click="copy(link)"
              ><Icon :name="copied ? 'lucide:check' : 'lucide:copy'" class="size-4"
            /></UiButton>
          </div>
        </div>
        <div class="space-y-2">
          <UiLabel for="page-about">Description</UiLabel>
          <UiTextarea id="page-about" v-model="form.about" :rows="3" />
        </div>

        <div class="grid gap-4 sm:grid-cols-3">
          <div class="space-y-2">
            <UiLabel for="page-duration">Duration</UiLabel>
            <UiSelect v-model="form.duration">
              <UiSelectTrigger id="page-duration"><UiSelectValue /></UiSelectTrigger>
              <UiSelectContent>
                <UiSelectItem v-for="value in durations" :key="value" :value="value"
                  >{{ value }} minutes</UiSelectItem
                >
              </UiSelectContent>
            </UiSelect>
          </div>
          <div class="space-y-2">
            <UiLabel for="page-buffer">Buffer after</UiLabel>
            <UiSelect v-model="form.buffer">
              <UiSelectTrigger id="page-buffer"><UiSelectValue /></UiSelectTrigger>
              <UiSelectContent>
                <UiSelectItem value="0">No buffer</UiSelectItem>
                <UiSelectItem value="10">10 minutes</UiSelectItem>
                <UiSelectItem value="15">15 minutes</UiSelectItem>
                <UiSelectItem value="30">30 minutes</UiSelectItem>
              </UiSelectContent>
            </UiSelect>
          </div>
          <div class="space-y-2">
            <UiLabel for="page-notice">Minimum notice</UiLabel>
            <UiSelect v-model="form.notice">
              <UiSelectTrigger id="page-notice"><UiSelectValue /></UiSelectTrigger>
              <UiSelectContent>
                <UiSelectItem value="1">1 hour</UiSelectItem>
                <UiSelectItem value="4">4 hours</UiSelectItem>
                <UiSelectItem value="24">1 day</UiSelectItem>
                <UiSelectItem value="48">2 days</UiSelectItem>
              </UiSelectContent>
            </UiSelect>
          </div>
        </div>

        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <UiLabel for="page-window">Book up to</UiLabel>
            <span class="text-sm tabular-nums" aria-live="polite"
              >{{ form.window }} days ahead</span
            >
          </div>
          <input
            id="page-window"
            v-model.number="form.window"
            type="range"
            min="7"
            max="90"
            step="1"
            class="accent-primary w-full"
          />
        </div>

        <div class="flex items-start justify-between gap-4 rounded-lg border p-4">
          <div>
            <UiLabel for="page-approval">Require approval</UiLabel>
            <p class="text-muted-foreground text-sm">
              Each booking stays pending until you confirm it.
            </p>
          </div>
          <UiSwitch id="page-approval" v-model="form.approval" />
        </div>

        <div class="space-y-2">
          <p id="page-accent" class="text-sm font-medium">Accent color</p>
          <UiRadioGroup v-model="form.accent" class="flex gap-2" aria-labelledby="page-accent">
            <label v-for="item in accents" :key="item.name" class="relative cursor-pointer">
              <UiRadioGroupItem
                :value="item.name"
                :aria-label="item.name"
                class="peer absolute inset-0 size-full cursor-pointer opacity-0"
              />
              <span
                class="ring-offset-background peer-data-[state=checked]:ring-foreground peer-focus-visible:ring-ring block size-7 rounded-full ring-2 ring-transparent ring-offset-2"
                :class="item.swatch"
              />
            </label>
          </UiRadioGroup>
        </div>

        <UiButton type="submit">Save changes</UiButton>
      </form>

      <aside class="lg:sticky lg:top-6 lg:self-start">
        <p class="text-muted-foreground mb-2 text-xs font-medium tracking-wide uppercase">
          Preview
        </p>
        <UiCard class="gap-3 overflow-hidden pt-0">
          <div class="h-2" :class="accentOf.swatch" />
          <UiCardHeader>
            <UiCardTitle>{{ form.title || "Untitled" }}</UiCardTitle>
            <UiCardDescription>{{ form.about }}</UiCardDescription>
          </UiCardHeader>
          <UiCardContent class="space-y-2 text-sm">
            <p class="flex items-center gap-2">
              <Icon name="lucide:clock" class="size-4" />{{ form.duration }} minutes
            </p>
            <p class="text-muted-foreground flex items-center gap-2">
              <Icon name="lucide:calendar-range" class="size-4" />Up to {{ form.window }} days ahead
            </p>
            <p class="text-muted-foreground flex items-center gap-2">
              <Icon name="lucide:hourglass" class="size-4" />{{ noticeLabel }} notice
            </p>
            <p v-if="form.approval" class="text-muted-foreground flex items-center gap-2">
              <Icon name="lucide:shield-check" class="size-4" />Needs your approval
            </p>
          </UiCardContent>
          <UiCardFooter>
            <UiButton class="w-full text-white" :class="accentOf.swatch" tabindex="-1"
              >Pick a time</UiButton
            >
          </UiCardFooter>
        </UiCard>
        <p class="text-muted-foreground mt-2 truncate text-xs">{{ link }}</p>
      </aside>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      baseUrl?: string;
      initial?: {
        title: string;
        slug: string;
        about: string;
        duration: string;
        buffer: string;
        notice: string;
        window: number;
        approval: boolean;
        accent: string;
      };
    }>(),
    {
      baseUrl: "cal.example.com",
      initial: () => ({
        title: "Intro call with Alex",
        slug: "alex/intro",
        about: "A short call to talk about your project and see if we are a fit.",
        duration: "30",
        buffer: "10",
        notice: "4",
        window: 30,
        approval: false,
        accent: "blue",
      }),
    }
  );

  const durations = ["15", "30", "45", "60", "90"];
  const accents = [
    { name: "blue", swatch: "bg-blue-500" },
    { name: "green", swatch: "bg-green-500" },
    { name: "amber", swatch: "bg-amber-500" },
    { name: "rose", swatch: "bg-rose-500" },
    { name: "violet", swatch: "bg-violet-500" },
  ];
  const noticeLabels: Record<string, string> = {
    "1": "1 hour",
    "4": "4 hours",
    "24": "1 day",
    "48": "2 days",
  };

  const form = reactive({ ...props.initial });
  const accentOf = computed(() => accents.find((item) => item.name === form.accent) ?? accents[0]!);
  const noticeLabel = computed(() => noticeLabels[form.notice] ?? `${form.notice} hours`);
  const link = computed(() => `https://${props.baseUrl}/${form.slug}`);

  const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9/-]+/g, "-");

  const { copy, copied } = useClipboard({ copiedDuring: 2000 });

  function save() {
    useSonner.success("Booking page saved");
  }
</script>
