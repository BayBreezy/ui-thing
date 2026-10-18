<template>
  <!--
    Product page with a sticky buy box and accordion details
    Features: Stacked photo grid that scrolls while the buy box stays in view, color and size pickers, quantity stepper, running total, add to cart and accordion sections for materials, fit and shipping
  -->
  <UiContainer class="py-10 lg:py-16">
    <div class="grid gap-10 lg:grid-cols-[1fr_26rem] lg:gap-14">
      <div class="grid grid-cols-2 gap-3 sm:gap-4">
        <div
          v-for="(image, i) in product.images"
          :key="image.src"
          class="bg-muted overflow-hidden rounded-2xl"
          :class="i === 0 ? 'col-span-2' : ''"
        >
          <UiAspectRatio :ratio="i === 0 ? 1 : 4 / 5">
            <img
              :src="image.src"
              :alt="image.alt"
              :loading="i === 0 ? 'eager' : 'lazy'"
              class="size-full object-cover"
            />
          </UiAspectRatio>
        </div>
      </div>

      <div class="lg:sticky lg:top-8 lg:self-start">
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="text-muted-foreground text-sm tracking-wide uppercase">
              {{ product.category }}
            </p>
            <h1 class="mt-1 text-3xl font-bold tracking-tight">{{ product.name }}</h1>
          </div>
          <UiBadge v-if="product.compareAt" variant="destructive">Sale</UiBadge>
        </div>

        <div class="mt-3 flex items-center gap-2">
          <UiRating
            :model-value="product.rating"
            size="sm"
            icon="mdi:star"
            filled-icon-class-name="text-amber-400"
          />
          <span class="text-muted-foreground text-sm">({{ product.reviews }})</span>
        </div>

        <p class="mt-5 flex items-baseline gap-3">
          <span class="text-2xl font-semibold">{{ money.format(product.price) }}</span>
          <span v-if="product.compareAt" class="text-muted-foreground line-through">
            {{ money.format(product.compareAt) }}
          </span>
        </p>
        <p class="text-muted-foreground mt-4 text-sm">{{ product.description }}</p>

        <fieldset class="mt-6">
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

        <fieldset class="mt-5">
          <legend class="mb-2 text-sm font-medium">Size</legend>
          <div class="grid grid-cols-5 gap-2">
            <button
              v-for="s in product.sizes"
              :key="s.label"
              type="button"
              :disabled="!s.inStock"
              class="focus-visible:ring-ring h-10 rounded-md border text-sm font-medium transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:line-through disabled:opacity-40"
              :class="
                size === s.label
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'hover:bg-accent'
              "
              :aria-pressed="size === s.label"
              @click="size = s.label"
            >
              {{ s.label }}
            </button>
          </div>
        </fieldset>

        <div class="mt-6 flex items-center gap-3">
          <UiNumberField v-model="quantity" :min="1" :max="10" class="w-32">
            <UiNumberFieldDecrement />
            <UiNumberFieldInput class="text-center" aria-label="Quantity" />
            <UiNumberFieldIncrement />
          </UiNumberField>
          <UiButton class="flex-1" size="lg" :disabled="!size" @click="addToCart">
            <Icon :name="added ? 'lucide:check' : 'lucide:shopping-bag'" />
            {{ added ? "Added" : size ? `Add to cart · ${money.format(total)}` : "Select a size" }}
          </UiButton>
        </div>

        <UiAccordion type="single" collapsible default-value="item-0" class="mt-8 border-t">
          <UiAccordionItem
            v-for="(detail, i) in product.details"
            :key="detail.title"
            :value="`item-${i}`"
          >
            <UiAccordionHeader>
              <UiAccordionTrigger :title="detail.title" />
            </UiAccordionHeader>
            <UiAccordionContent :content="detail.content" />
          </UiAccordionItem>
        </UiAccordion>
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

  const props = withDefaults(
    defineProps<{
      product?: Product;
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
    }
  );

  const money = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  const color = ref(props.product.colors[0]!);
  const size = ref("");
  const quantity = ref(1);
  const added = ref(false);

  const total = computed(() => props.product.price * quantity.value);

  // Replace this with a call to your cart store or API.
  function addToCart() {
    added.value = true;
    setTimeout(() => (added.value = false), 1800);
  }
</script>
