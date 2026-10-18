<template>
  <!--
    Product page with a photo mosaic and tabs
    Features: Header with price and rating, a four photo mosaic, tabs for details, fit and reviews, and a sticky purchase card with a size select and add to cart
  -->
  <UiContainer class="py-10 lg:py-16">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="text-muted-foreground text-sm tracking-wide uppercase">{{ product.category }}</p>
        <h1 class="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">{{ product.name }}</h1>
        <div class="mt-3 flex items-center gap-2">
          <UiRating
            :model-value="product.rating"
            size="sm"
            icon="mdi:star"
            filled-icon-class-name="text-amber-400"
          />
          <span class="text-muted-foreground text-sm">{{ product.reviews }} reviews</span>
        </div>
      </div>
      <p class="flex items-baseline gap-3">
        <span class="text-3xl font-semibold">{{ money.format(product.price) }}</span>
        <span v-if="product.compareAt" class="text-muted-foreground text-lg line-through">
          {{ money.format(product.compareAt) }}
        </span>
      </p>
    </div>

    <div
      class="mt-8 grid h-[360px] grid-cols-4 grid-rows-2 gap-3 sm:h-[460px] lg:h-[560px] lg:gap-4"
    >
      <div class="bg-muted col-span-2 row-span-2 overflow-hidden rounded-2xl">
        <img
          :src="product.images[0]!.src"
          :alt="product.images[0]!.alt"
          class="size-full object-cover"
        />
      </div>
      <div class="bg-muted col-span-2 overflow-hidden rounded-2xl">
        <img
          :src="product.images[1]!.src"
          :alt="product.images[1]!.alt"
          class="size-full object-cover"
        />
      </div>
      <div class="bg-muted overflow-hidden rounded-2xl">
        <img
          :src="product.images[2]!.src"
          :alt="product.images[2]!.alt"
          class="size-full object-cover"
        />
      </div>
      <div class="bg-muted overflow-hidden rounded-2xl">
        <img
          :src="product.images[3]!.src"
          :alt="product.images[3]!.alt"
          class="size-full object-cover"
        />
      </div>
    </div>

    <div class="mt-12 grid gap-10 lg:grid-cols-[1fr_22rem] lg:gap-14">
      <UiTabs default-value="details">
        <UiTabsList class="grid w-full grid-cols-3 sm:inline-flex sm:w-auto">
          <UiTabsTrigger value="details">Details</UiTabsTrigger>
          <UiTabsTrigger value="care">Fit and care</UiTabsTrigger>
          <UiTabsTrigger value="reviews">Reviews</UiTabsTrigger>
        </UiTabsList>

        <UiTabsContent value="details" class="pt-4">
          <p class="text-muted-foreground">{{ product.description }}</p>
          <ul class="mt-6 space-y-3">
            <li v-for="item in product.highlights" :key="item" class="flex items-start gap-3">
              <Icon name="lucide:check" class="text-primary mt-0.5 size-4 shrink-0" />
              {{ item }}
            </li>
          </ul>
        </UiTabsContent>

        <UiTabsContent value="care" class="pt-4">
          <dl class="divide-y">
            <div v-for="detail in product.details" :key="detail.title" class="py-4">
              <dt class="font-medium">{{ detail.title }}</dt>
              <dd class="text-muted-foreground mt-1 text-sm">{{ detail.content }}</dd>
            </div>
          </dl>
        </UiTabsContent>

        <UiTabsContent value="reviews" class="pt-4">
          <ul class="divide-y">
            <li v-for="review in reviews.slice(0, 3)" :key="review.id" class="py-5">
              <div class="flex items-center gap-3">
                <UiAvatar :src="review.avatar" :fallback="review.name[0]" class="size-9" />
                <div>
                  <p class="text-sm font-medium">{{ review.name }}</p>
                  <p class="text-muted-foreground text-xs">{{ review.date }}</p>
                </div>
                <UiRating
                  :model-value="review.rating"
                  size="sm"
                  icon="mdi:star"
                  filled-icon-class-name="text-amber-400"
                  class="ml-auto"
                />
              </div>
              <p class="mt-3 text-sm font-medium">{{ review.title }}</p>
              <p class="text-muted-foreground mt-1 text-sm">{{ review.body }}</p>
            </li>
          </ul>
          <UiButton variant="outline" class="mt-2">Read all {{ product.reviews }} reviews</UiButton>
        </UiTabsContent>
      </UiTabs>

      <aside class="lg:sticky lg:top-8 lg:self-start">
        <UiCard>
          <UiCardContent class="space-y-5">
            <fieldset>
              <legend class="mb-2 text-sm font-medium">
                Color: <span class="text-muted-foreground font-normal">{{ color.name }}</span>
              </legend>
              <div class="flex gap-2.5">
                <button
                  v-for="c in product.colors"
                  :key="c.hex"
                  type="button"
                  class="focus-visible:ring-ring size-8 rounded-full border transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                  :class="color.hex === c.hex ? 'ring-primary ring-2 ring-offset-2' : ''"
                  :style="{ backgroundColor: c.hex }"
                  :aria-label="c.name"
                  :aria-pressed="color.hex === c.hex"
                  @click="color = c"
                />
              </div>
            </fieldset>

            <div>
              <UiLabel for="size-select" class="mb-2">Size</UiLabel>
              <UiSelect v-model="size">
                <UiSelectTrigger id="size-select" class="w-full">
                  <UiSelectValue placeholder="Select a size" />
                </UiSelectTrigger>
                <UiSelectContent>
                  <UiSelectItem
                    v-for="s in product.sizes"
                    :key="s.label"
                    :value="s.label"
                    :disabled="!s.inStock"
                  >
                    {{ s.label }}{{ s.inStock ? "" : " · out of stock" }}
                  </UiSelectItem>
                </UiSelectContent>
              </UiSelect>
            </div>

            <UiButton class="w-full" size="lg" :disabled="!size" @click="addToCart">
              <Icon :name="added ? 'lucide:check' : 'lucide:shopping-bag'" />
              {{ added ? "Added to cart" : "Add to cart" }}
            </UiButton>
            <ul class="text-muted-foreground space-y-2 text-sm">
              <li class="flex items-center gap-2.5">
                <Icon name="lucide:truck" class="size-4" />
                Free shipping over $75
              </li>
              <li class="flex items-center gap-2.5">
                <Icon name="lucide:rotate-ccw" class="size-4" />
                Free returns for 30 days
              </li>
            </ul>
          </UiCardContent>
        </UiCard>
      </aside>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Product = {
    name: string;
    category: string;
    price: number;
    compareAt?: number;
    rating: number;
    reviews: number;
    description: string;
    colors: { name: string; hex: string }[];
    sizes: { label: string; inStock: boolean }[];
    images: { src: string; alt: string }[];
    highlights: string[];
    details: { title: string; content: string }[];
  };

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
      product?: Product;
      reviews?: Review[];
    }>(),
    {
      product: () => ({
        name: "Bomber Jacket",
        category: "Outerwear",
        price: 138,
        compareAt: 168,
        rating: 4.6,
        reviews: 59,
        description:
          "A lightweight bomber in a soft, water repellent shell with ribbed trims and a zip sleeve pocket. Cut relaxed so it layers easily over knits.",
        colors: [
          { name: "Rust", hex: "#b4532a" },
          { name: "Olive", hex: "#4d5d3a" },
        ],
        sizes: [
          { label: "XS", inStock: false },
          { label: "S", inStock: true },
          { label: "M", inStock: true },
          { label: "L", inStock: true },
          { label: "XL", inStock: false },
        ],
        images: [
          {
            src: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1200&h=1500&q=80",
            alt: "Rust bomber jacket on a hanger",
          },
          {
            src: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1200&h=1500&q=80&crop=focalpoint&fp-x=0.5&fp-y=0.22&fp-z=2.6",
            alt: "Ribbed collar and neck label",
          },
          {
            src: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1200&h=1500&q=80&crop=focalpoint&fp-x=0.78&fp-y=0.48&fp-z=2.6",
            alt: "Zip pocket on the sleeve",
          },
          {
            src: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1200&h=1500&q=80&crop=focalpoint&fp-x=0.4&fp-y=0.85&fp-z=2.4",
            alt: "Ribbed hem and hand pocket",
          },
        ],
        highlights: [
          "Water repellent recycled nylon shell",
          "Ribbed collar, cuffs and hem",
          "Zip sleeve pocket and two hand pockets",
          "Relaxed fit, true to size",
        ],
        details: [
          {
            title: "Materials and care",
            content:
              "Shell and lining are 100% recycled nylon. Machine wash cold on a gentle cycle and hang to dry. Do not tumble dry or iron.",
          },
          {
            title: "Fit",
            content:
              "Relaxed fit that sits at the hip. The model is 6 feet tall and wears a medium. Size down if you prefer a closer fit.",
          },
          {
            title: "Shipping and returns",
            content:
              "Free standard shipping on orders over $75, delivered in 2 to 4 business days. Returns are free for 30 days.",
          },
        ],
      }),
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

  const money = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  const color = ref(props.product.colors[0]!);
  const size = ref("");
  const added = ref(false);

  // Replace this with a call to your cart store or API.
  function addToCart() {
    added.value = true;
    setTimeout(() => (added.value = false), 1800);
  }
</script>
