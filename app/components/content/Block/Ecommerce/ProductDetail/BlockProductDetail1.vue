<template>
  <!--
    Product page with a thumbnail gallery and variant pickers
    Features: Swipeable gallery with thumbnails that stay in sync, breadcrumbs, color swatches, size picker with out of stock sizes, validation when no size is chosen, add to cart with confirmation and a wishlist toggle
  -->
  <UiContainer class="py-10 lg:py-16">
    <UiBreadcrumbs :items="breadcrumbs" class="mb-8" />

    <div class="grid gap-10 lg:grid-cols-2 lg:gap-16">
      <div class="lg:sticky lg:top-8 lg:self-start">
        <UiCarousel
          v-slot="{ scrollPrev, scrollNext, canScrollPrev, canScrollNext }"
          class="relative"
          @init-api="onInit"
        >
          <UiCarouselContent>
            <UiCarouselItem v-for="image in product.images" :key="image.src" class="pl-4">
              <div class="bg-muted overflow-hidden rounded-2xl">
                <UiAspectRatio :ratio="4 / 5">
                  <img
                    :src="image.src"
                    :alt="image.alt"
                    draggable="false"
                    class="size-full object-cover"
                  />
                </UiAspectRatio>
              </div>
            </UiCarouselItem>
          </UiCarouselContent>
          <UiButton
            variant="secondary"
            size="icon"
            class="absolute top-1/2 left-3 -translate-y-1/2 rounded-full shadow-md"
            :disabled="!canScrollPrev"
            aria-label="Previous image"
            @click="scrollPrev"
          >
            <Icon name="lucide:chevron-left" />
          </UiButton>
          <UiButton
            variant="secondary"
            size="icon"
            class="absolute top-1/2 right-3 -translate-y-1/2 rounded-full shadow-md"
            :disabled="!canScrollNext"
            aria-label="Next image"
            @click="scrollNext"
          >
            <Icon name="lucide:chevron-right" />
          </UiButton>
        </UiCarousel>

        <ul class="mt-4 grid grid-cols-4 gap-3">
          <li v-for="(image, i) in product.images" :key="image.src">
            <button
              type="button"
              class="bg-muted focus-visible:ring-ring block w-full overflow-hidden rounded-lg border-2 transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              :class="
                i === current ? 'border-primary' : 'border-transparent opacity-70 hover:opacity-100'
              "
              :aria-label="`Show image ${i + 1}`"
              :aria-current="i === current"
              @click="api?.scrollTo(i)"
            >
              <UiAspectRatio :ratio="1">
                <img :src="image.src" :alt="image.alt" class="size-full object-cover" />
              </UiAspectRatio>
            </button>
          </li>
        </ul>
      </div>

      <div>
        <p class="text-muted-foreground text-sm tracking-wide uppercase">{{ product.category }}</p>
        <h1 class="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{{ product.name }}</h1>
        <div class="mt-4 flex items-center gap-2">
          <UiRating
            :model-value="product.rating"
            size="sm"
            icon="mdi:star"
            filled-icon-class-name="text-amber-400"
          />
          <a href="#reviews" class="text-muted-foreground text-sm hover:underline">
            {{ product.rating }} · {{ product.reviews }} reviews
          </a>
        </div>
        <p class="mt-6 flex items-center gap-3">
          <span class="text-3xl font-semibold">{{ money.format(product.price) }}</span>
          <template v-if="product.compareAt">
            <span class="text-muted-foreground text-lg line-through">
              {{ money.format(product.compareAt) }}
            </span>
            <UiBadge variant="destructive"
              >Save {{ money.format(product.compareAt - product.price) }}</UiBadge
            >
          </template>
        </p>
        <p class="text-muted-foreground mt-6">{{ product.description }}</p>

        <fieldset class="mt-8">
          <legend class="mb-3 text-sm font-medium">
            Color: <span class="text-muted-foreground font-normal">{{ color.name }}</span>
          </legend>
          <div class="flex gap-3">
            <button
              v-for="c in product.colors"
              :key="c.hex"
              type="button"
              class="focus-visible:ring-ring size-9 rounded-full border transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              :class="color.hex === c.hex ? 'ring-primary ring-2 ring-offset-2' : ''"
              :style="{ backgroundColor: c.hex }"
              :aria-label="c.name"
              :aria-pressed="color.hex === c.hex"
              @click="color = c"
            />
          </div>
        </fieldset>

        <fieldset class="mt-6">
          <legend class="mb-3 flex w-full items-center justify-between text-sm font-medium">
            Size
            <a href="#" class="text-muted-foreground font-normal underline underline-offset-4">
              Size guide
            </a>
          </legend>
          <UiToggleGroup
            type="single"
            class="grid grid-cols-5 gap-2"
            :model-value="size"
            @update:model-value="
              (v) => {
                size = (v as string) || '';
                sizeError = false;
              }
            "
          >
            <UiToggleGroupItem
              v-for="s in product.sizes"
              :key="s.label"
              variant="outline"
              :value="s.label"
              :disabled="!s.inStock"
              class="data-[state=on]:border-primary data-[state=on]:bg-primary data-[state=on]:text-primary-foreground h-11 data-[disabled]:line-through"
              :aria-label="s.inStock ? `Size ${s.label}` : `Size ${s.label}, out of stock`"
            >
              {{ s.label }}
            </UiToggleGroupItem>
          </UiToggleGroup>
          <p v-if="sizeError" class="text-destructive mt-2 text-sm" role="alert">
            Please choose a size.
          </p>
        </fieldset>

        <div class="mt-8 flex gap-3">
          <UiButton size="lg" class="flex-1" @click="addToCart">
            <Icon :name="added ? 'lucide:check' : 'lucide:shopping-bag'" />
            {{ added ? "Added to cart" : "Add to cart" }}
          </UiButton>
          <UiButton
            variant="outline"
            size="icon-lg"
            :aria-pressed="wishlisted"
            :aria-label="wishlisted ? 'Remove from wishlist' : 'Add to wishlist'"
            @click="wishlisted = !wishlisted"
          >
            <Icon name="lucide:heart" :class="wishlisted ? 'fill-red-500 text-red-500' : ''" />
          </UiButton>
        </div>

        <ul class="mt-8 space-y-3 border-t pt-6 text-sm">
          <li v-for="item in product.highlights" :key="item" class="flex items-start gap-3">
            <Icon name="lucide:check" class="text-primary mt-0.5 size-4 shrink-0" />
            {{ item }}
          </li>
        </ul>
      </div>
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

  type EmblaLike = {
    scrollTo: (index: number) => void;
    selectedScrollSnap: () => number;
    on: (event: "select", callback: () => void) => void;
  };

  const props = withDefaults(
    defineProps<{
      product?: Product;
      breadcrumbs?: { label: string; link: string }[];
    }>(),
    {
      breadcrumbs: () => [
        { label: "Home", link: "#" },
        { label: "Outerwear", link: "#" },
        { label: "Bomber Jacket", link: "#" },
      ],
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
    }
  );

  const money = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  const api = shallowRef<EmblaLike>();
  const current = ref(0);
  const color = ref(props.product.colors[0]!);
  const size = ref("");
  const sizeError = ref(false);
  const added = ref(false);
  const wishlisted = ref(false);

  function onInit(embla: EmblaLike) {
    api.value = embla;
    embla.on("select", () => (current.value = embla.selectedScrollSnap()));
  }

  // Replace this with a call to your cart store or API.
  function addToCart() {
    if (!size.value) {
      sizeError.value = true;
      return;
    }
    added.value = true;
    setTimeout(() => (added.value = false), 1800);
  }
</script>
