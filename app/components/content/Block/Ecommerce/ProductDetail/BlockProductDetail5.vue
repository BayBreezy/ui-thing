<template>
  <!--
    Customer reviews with rating breakdown and a review form
    Features: Average score with star distribution bars that double as filters, sort select, verified purchase badges, helpful votes, show more, and a write a review dialog validated with vee-validate that adds your review to the list
  -->
  <UiContainer class="py-16 lg:py-24">
    <div class="grid gap-12 lg:grid-cols-[20rem_1fr] lg:gap-16">
      <div class="lg:sticky lg:top-8 lg:self-start">
        <h2 class="text-2xl font-bold tracking-tight">Customer reviews</h2>
        <div class="mt-4 flex items-center gap-3">
          <span class="text-5xl font-bold tabular-nums">{{ average }}</span>
          <div>
            <UiRating
              :model-value="Number(average)"
              icon="mdi:star"
              filled-icon-class-name="text-amber-400"
            />
            <p class="text-muted-foreground mt-1 text-sm">Based on {{ total }} reviews</p>
          </div>
        </div>

        <ul class="mt-6 space-y-2" aria-label="Filter reviews by rating">
          <li v-for="row in distribution" :key="row.stars">
            <button
              type="button"
              class="hover:bg-accent focus-visible:ring-ring group flex w-full items-center gap-3 rounded-md px-2 py-1 text-sm transition focus-visible:ring-2 focus-visible:outline-none"
              :class="starFilter === row.stars ? 'bg-accent' : ''"
              :aria-pressed="starFilter === row.stars"
              :aria-label="`${row.count} reviews with ${row.stars} stars`"
              @click="starFilter = starFilter === row.stars ? null : row.stars"
            >
              <span class="flex w-8 items-center gap-1 tabular-nums">
                {{ row.stars }}
                <Icon name="mdi:star" class="size-3.5 text-amber-400" />
              </span>
              <UiProgress :model-value="(row.count / total) * 100" class="h-2 flex-1" />
              <span class="text-muted-foreground w-7 text-right tabular-nums">{{ row.count }}</span>
            </button>
          </li>
        </ul>

        <UiDialog v-model:open="formOpen">
          <UiDialogTrigger as-child>
            <UiButton class="mt-8 w-full">
              <Icon name="lucide:pen-line" />
              Write a review
            </UiButton>
          </UiDialogTrigger>
          <UiDialogContent class="sm:max-w-lg">
            <UiDialogHeader>
              <UiDialogTitle>Write a review</UiDialogTitle>
              <UiDialogDescription>
                Tell other shoppers what you think of the {{ productName }}.
              </UiDialogDescription>
            </UiDialogHeader>
            <form class="space-y-4" novalidate @submit.prevent="submit">
              <UiVeeRating name="rating" label="Your rating" icon="mdi:star" required />
              <UiVeeInput name="title" label="Headline" placeholder="Sum it up in a few words" />
              <UiVeeTextarea
                name="body"
                label="Your review"
                placeholder="What did you like or dislike? How was the fit?"
                :rows="4"
              />
              <UiDialogFooter>
                <UiButton type="button" variant="outline" @click="formOpen = false">
                  Cancel
                </UiButton>
                <UiButton type="submit" :loading="isSubmitting">Submit review</UiButton>
              </UiDialogFooter>
            </form>
          </UiDialogContent>
        </UiDialog>
      </div>

      <div>
        <div class="flex flex-wrap items-center justify-between gap-3 border-b pb-4">
          <p class="text-muted-foreground text-sm" role="status" aria-live="polite">
            Showing {{ visible.length }} of {{ sorted.length }} reviews
            <button
              v-if="starFilter"
              type="button"
              class="text-foreground ml-2 underline underline-offset-4"
              @click="starFilter = null"
            >
              Clear {{ starFilter }} star filter
            </button>
          </p>
          <UiSelect v-model="sort">
            <UiSelectTrigger class="w-44" size="sm" aria-label="Sort reviews">
              <UiSelectValue />
            </UiSelectTrigger>
            <UiSelectContent>
              <UiSelectItem value="recent">Most recent</UiSelectItem>
              <UiSelectItem value="helpful">Most helpful</UiSelectItem>
              <UiSelectItem value="high">Highest rated</UiSelectItem>
              <UiSelectItem value="low">Lowest rated</UiSelectItem>
            </UiSelectContent>
          </UiSelect>
        </div>

        <ul class="divide-y">
          <li v-for="review in visible" :key="review.id" class="py-6">
            <div class="flex items-center gap-3">
              <UiAvatar :src="review.avatar" :fallback="review.name[0]" class="size-10" />
              <div>
                <p class="text-sm font-medium">{{ review.name }}</p>
                <p class="text-muted-foreground text-xs">{{ review.date }}</p>
              </div>
              <UiBadge v-if="review.verified" variant="outline" class="ml-auto gap-1">
                <Icon name="lucide:badge-check" />
                Verified purchase
              </UiBadge>
            </div>
            <div class="mt-4 flex items-center gap-2">
              <UiRating
                :model-value="review.rating"
                size="sm"
                icon="mdi:star"
                filled-icon-class-name="text-amber-400"
              />
              <h3 class="text-sm font-semibold">{{ review.title }}</h3>
            </div>
            <p class="text-muted-foreground mt-2 text-sm leading-relaxed">{{ review.body }}</p>
            <div class="mt-4 flex items-center justify-between text-xs">
              <span class="text-muted-foreground">Size purchased: {{ review.size }}</span>
              <UiButton
                variant="ghost"
                size="xs"
                :aria-pressed="voted.includes(review.id)"
                @click="toggleHelpful(review.id)"
              >
                <Icon name="lucide:thumbs-up" />
                Helpful ({{ review.helpful + (voted.includes(review.id) ? 1 : 0) }})
              </UiButton>
            </div>
          </li>
        </ul>

        <p v-if="!sorted.length" class="text-muted-foreground py-12 text-center">
          No reviews with that rating yet.
        </p>
        <UiButton
          v-if="shown < sorted.length"
          variant="outline"
          class="mt-4 w-full"
          @click="shown += 3"
        >
          Show more reviews
        </UiButton>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  import { number, object, string } from "yup";
  import type { InferType } from "yup";

  type Review = {
    id: number;
    name: string;
    avatar: string;
    rating: number;
    title: string;
    body: string;
    date: string;
    size: string;
    verified: boolean;
    helpful: number;
  };

  const props = withDefaults(
    defineProps<{
      productName?: string;
      reviews?: Review[];
      /** Review counts per star rating. Pass your real totals. */
      distribution?: { stars: number; count: number }[];
    }>(),
    {
      productName: "Bomber Jacket",
      distribution: () => [
        { stars: 5, count: 44 },
        { stars: 4, count: 9 },
        { stars: 3, count: 3 },
        { stars: 2, count: 2 },
        { stars: 1, count: 1 },
      ],
      reviews: () => [
        {
          id: 1,
          name: "Sarah Johnson",
          avatar: "https://i.pravatar.cc/120?img=47",
          rating: 5,
          title: "Fits exactly like the photos",
          body: "The color is richer in person and the shell feels much more expensive than the price. I wear it almost every day.",
          date: "Oct 2, 2026",
          size: "M",
          verified: true,
          helpful: 12,
        },
        {
          id: 2,
          name: "Michael Chen",
          avatar: "https://i.pravatar.cc/120?img=12",
          rating: 5,
          title: "Great layering piece",
          body: "Light enough for early autumn and roomy enough for a knit underneath. The sleeve pocket is surprisingly useful.",
          date: "Sep 24, 2026",
          size: "L",
          verified: true,
          helpful: 8,
        },
        {
          id: 3,
          name: "Emily Rodriguez",
          avatar: "https://i.pravatar.cc/120?img=32",
          rating: 4,
          title: "Lovely, runs a little roomy",
          body: "I would size down if you are between sizes. The finish and the ribbing are excellent and it held up in light rain.",
          date: "Sep 19, 2026",
          size: "S",
          verified: true,
          helpful: 5,
        },
        {
          id: 4,
          name: "Priya Nair",
          avatar: "https://i.pravatar.cc/120?img=45",
          rating: 5,
          title: "Bought a second one",
          body: "Ordered the olive after wearing the rust for a month. Shipping took two days and returns were never needed.",
          date: "Sep 11, 2026",
          size: "M",
          verified: true,
          helpful: 4,
        },
        {
          id: 5,
          name: "Noah Fischer",
          avatar: "https://i.pravatar.cc/120?img=53",
          rating: 3,
          title: "Good jacket, sleeves are long",
          body: "The quality is there but the sleeves run long on me. Customer support was quick and offered an exchange.",
          date: "Aug 30, 2026",
          size: "L",
          verified: false,
          helpful: 3,
        },
        {
          id: 6,
          name: "Hannah Lee",
          avatar: "https://i.pravatar.cc/120?img=49",
          rating: 5,
          title: "My new favorite",
          body: "Soft, light and it goes with everything. Easily the best jacket I have bought this year.",
          date: "Aug 21, 2026",
          size: "S",
          verified: true,
          helpful: 2,
        },
      ],
    }
  );

  const list = ref<Review[]>([...props.reviews]);
  const sort = ref("recent");
  const starFilter = ref<number | null>(null);
  const shown = ref(4);
  const voted = ref<number[]>([]);
  const formOpen = ref(false);

  const total = computed(() => props.distribution.reduce((sum, row) => sum + row.count, 0));
  const average = computed(() =>
    (props.distribution.reduce((sum, row) => sum + row.stars * row.count, 0) / total.value).toFixed(
      1
    )
  );

  const sorted = computed(() => {
    const filtered = starFilter.value
      ? list.value.filter((r) => r.rating === starFilter.value)
      : [...list.value];
    if (sort.value === "helpful") return filtered.sort((a, b) => b.helpful - a.helpful);
    if (sort.value === "high") return filtered.sort((a, b) => b.rating - a.rating);
    if (sort.value === "low") return filtered.sort((a, b) => a.rating - b.rating);
    return filtered.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  });
  const visible = computed(() => sorted.value.slice(0, shown.value));

  watch([sort, starFilter], () => (shown.value = 4));

  function toggleHelpful(id: number) {
    voted.value = voted.value.includes(id)
      ? voted.value.filter((v) => v !== id)
      : [...voted.value, id];
  }

  const schema = object({
    rating: number().min(1, "Please choose a rating").required().label("Rating"),
    title: string().required().min(3).label("Headline"),
    body: string()
      .required()
      .min(20, "Tell us a little more, at least 20 characters")
      .label("Review"),
  });

  const { handleSubmit, isSubmitting, resetForm } = useForm<InferType<typeof schema>>({
    validationSchema: schema,
    initialValues: { rating: 0, title: "", body: "" },
  });

  // Replace the timeout with a request that saves the review.
  const submit = handleSubmit(async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 700));
    list.value.unshift({
      id: Date.now(),
      name: "You",
      avatar: "https://i.pravatar.cc/120?img=5",
      rating: values.rating,
      title: values.title,
      body: values.body,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      size: "M",
      verified: false,
      helpful: 0,
    });
    resetForm();
    formOpen.value = false;
  });
</script>
