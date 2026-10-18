<template>
  <!--
    Featured product spotlight hero
    Features: Large product photo with a product of the week badge and discount tag, rating, compare at price, color swatches, add to cart with confirmation, wishlist toggle and delivery perks
  -->
  <UiContainer class="py-16 lg:py-24">
    <div class="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <Motion
        class="bg-muted relative overflow-hidden rounded-3xl"
        :initial="{ opacity: 0, scale: 0.97 }"
        :animate="{ opacity: 1, scale: 1 }"
        :transition="{ duration: 0.5 }"
      >
        <UiAspectRatio :ratio="1">
          <img :src="product.image" :alt="product.name" class="size-full object-cover" />
        </UiAspectRatio>
        <UiBadge class="absolute top-5 left-5" size="md">{{ eyebrow }}</UiBadge>
        <UiBadge v-if="discount" variant="destructive" size="md" class="absolute top-5 right-5">
          -{{ discount }}%
        </UiBadge>
      </Motion>

      <Motion
        :initial="{ opacity: 0, x: 24 }"
        :animate="{ opacity: 1, x: 0 }"
        :transition="{ duration: 0.5, delay: 0.1 }"
      >
        <p class="text-muted-foreground text-sm tracking-wide uppercase">{{ product.category }}</p>
        <h1 class="mt-2 text-4xl font-bold tracking-tight text-balance sm:text-5xl">
          {{ product.name }}
        </h1>
        <div class="mt-4 flex items-center gap-2">
          <UiRating
            :model-value="product.rating"
            size="sm"
            icon="mdi:star"
            filled-icon-class-name="text-amber-400"
          />
          <span class="text-muted-foreground text-sm">
            {{ product.rating }} · {{ product.reviews }} reviews
          </span>
        </div>
        <p class="mt-6 flex items-baseline gap-3">
          <span class="text-3xl font-semibold">{{ money.format(product.price) }}</span>
          <span v-if="product.compareAt" class="text-muted-foreground text-lg line-through">
            {{ money.format(product.compareAt) }}
          </span>
        </p>
        <p class="text-muted-foreground mt-6 max-w-lg">{{ product.description }}</p>

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

        <div class="mt-8 flex gap-3">
          <UiButton size="lg" class="flex-1 sm:flex-none sm:px-10" @click="addToCart">
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
          <li v-for="perk in perks" :key="perk.label" class="flex items-center gap-3">
            <Icon :name="perk.icon" class="text-muted-foreground size-4" />
            {{ perk.label }}
          </li>
        </ul>
      </Motion>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Product = {
    name: string;
    category: string;
    description: string;
    price: number;
    compareAt?: number;
    rating: number;
    reviews: number;
    colors: { name: string; hex: string }[];
    image: string;
  };

  const props = withDefaults(
    defineProps<{
      eyebrow?: string;
      product?: Product;
      perks?: { icon: string; label: string }[];
    }>(),
    {
      eyebrow: "Product of the week",
      product: () => ({
        name: "Minimal Watch",
        category: "Accessories",
        description:
          "A quiet, sapphire glass watch with a soft silicone strap. Water resistant to 50 meters and light enough to forget you are wearing it.",
        price: 149,
        compareAt: 189,
        rating: 4.6,
        reviews: 132,
        colors: [
          { name: "White", hex: "#f4f4f5" },
          { name: "Black", hex: "#18181b" },
        ],
        image:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
      }),
      perks: () => [
        { icon: "lucide:truck", label: "Free delivery in 2 to 4 days" },
        { icon: "lucide:rotate-ccw", label: "Free 30 day returns" },
        { icon: "lucide:shield-check", label: "2 year warranty included" },
      ],
    }
  );

  const money = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  const color = ref(props.product.colors[0]!);
  const added = ref(false);
  const wishlisted = ref(false);

  const discount = computed(() =>
    props.product.compareAt
      ? Math.round((1 - props.product.price / props.product.compareAt) * 100)
      : 0
  );

  // Replace this with a call to your cart store or API.
  function addToCart() {
    added.value = true;
    setTimeout(() => (added.value = false), 1800);
  }
</script>
