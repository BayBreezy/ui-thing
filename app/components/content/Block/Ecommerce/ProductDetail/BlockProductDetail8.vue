<template>
  <!--
    Product page with a size guide dialog and sticky mobile bar
    Features: Size picker with a size guide dialog that switches between inches and centimeters, a measuring tips list, and a sticky add to cart bar that appears on small screens once the main button scrolls out of view
  -->
  <UiContainer class="py-10 lg:py-16">
    <div class="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
      <div class="bg-muted overflow-hidden rounded-2xl">
        <UiAspectRatio :ratio="4 / 5">
          <img
            :src="product.images[0]!.src"
            :alt="product.images[0]!.alt"
            class="size-full object-cover"
          />
        </UiAspectRatio>
      </div>

      <div>
        <p class="text-muted-foreground text-sm tracking-wide uppercase">{{ product.category }}</p>
        <h1 class="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{{ product.name }}</h1>
        <div class="mt-3 flex items-center gap-2">
          <UiRating
            :model-value="product.rating"
            size="sm"
            icon="mdi:star"
            filled-icon-class-name="text-amber-400"
          />
          <span class="text-muted-foreground text-sm">{{ product.reviews }} reviews</span>
        </div>
        <p class="mt-5 flex items-baseline gap-3">
          <span class="text-3xl font-semibold">{{ money.format(product.price) }}</span>
          <span v-if="product.compareAt" class="text-muted-foreground text-lg line-through">
            {{ money.format(product.compareAt) }}
          </span>
        </p>
        <p class="text-muted-foreground mt-5">{{ product.description }}</p>

        <fieldset class="mt-8">
          <legend class="mb-3 flex w-full items-center justify-between text-sm font-medium">
            Size
            <UiDialog v-model:open="guideOpen">
              <UiDialogTrigger as-child>
                <button
                  type="button"
                  class="text-muted-foreground hover:text-foreground flex items-center gap-1.5 font-normal underline underline-offset-4"
                >
                  <Icon name="lucide:ruler" class="size-4" />
                  Size guide
                </button>
              </UiDialogTrigger>
              <UiDialogContent class="sm:max-w-xl">
                <UiDialogHeader>
                  <UiDialogTitle>Size guide</UiDialogTitle>
                  <UiDialogDescription>
                    Body measurements for the {{ product.name }}. Find your closest match.
                  </UiDialogDescription>
                </UiDialogHeader>

                <UiToggleGroup
                  type="single"
                  size="sm"
                  class="justify-start"
                  :model-value="unit"
                  aria-label="Measurement unit"
                  @update:model-value="(v) => (unit = (v as 'in' | 'cm') || unit)"
                >
                  <UiToggleGroupItem variant="outline" size="sm" value="in" class="px-4"
                    >Inches</UiToggleGroupItem
                  >
                  <UiToggleGroupItem variant="outline" size="sm" value="cm" class="px-4"
                    >Centimeters</UiToggleGroupItem
                  >
                </UiToggleGroup>

                <UiTable>
                  <UiTableHeader>
                    <UiTableRow>
                      <UiTableHead>Size</UiTableHead>
                      <UiTableHead>Chest</UiTableHead>
                      <UiTableHead>Length</UiTableHead>
                      <UiTableHead>Sleeve</UiTableHead>
                    </UiTableRow>
                  </UiTableHeader>
                  <UiTableBody>
                    <UiTableRow v-for="row in guide" :key="row.size">
                      <UiTableCell class="font-medium">{{ row.size }}</UiTableCell>
                      <UiTableCell>{{ convert(row.chest) }}</UiTableCell>
                      <UiTableCell>{{ convert(row.length) }}</UiTableCell>
                      <UiTableCell>{{ convert(row.sleeve) }}</UiTableCell>
                    </UiTableRow>
                  </UiTableBody>
                </UiTable>

                <ul class="text-muted-foreground space-y-2 text-sm">
                  <li>
                    <strong class="text-foreground">Chest:</strong> measure around the fullest part,
                    under your arms.
                  </li>
                  <li>
                    <strong class="text-foreground">Length:</strong> from the base of your neck to
                    where you want the hem.
                  </li>
                  <li>
                    <strong class="text-foreground">Sleeve:</strong> from the center back of your
                    neck to your wrist.
                  </li>
                </ul>
              </UiDialogContent>
            </UiDialog>
          </legend>
          <UiToggleGroup
            type="single"
            class="grid grid-cols-5 gap-2"
            :model-value="size"
            @update:model-value="(v) => (size = (v as string) || '')"
          >
            <UiToggleGroupItem
              v-for="s in product.sizes"
              :key="s.label"
              variant="outline"
              :value="s.label"
              :disabled="!s.inStock"
              class="data-[state=on]:border-primary data-[state=on]:bg-primary data-[state=on]:text-primary-foreground h-11 data-[disabled]:line-through"
            >
              {{ s.label }}
            </UiToggleGroupItem>
          </UiToggleGroup>
        </fieldset>

        <UiButton ref="mainCta" class="mt-8 w-full" size="lg" :disabled="!size" @click="addToCart">
          <Icon :name="added ? 'lucide:check' : 'lucide:shopping-bag'" />
          {{ added ? "Added to cart" : size ? "Add to cart" : "Select a size" }}
        </UiButton>

        <ul class="mt-8 space-y-3 border-t pt-6 text-sm">
          <li v-for="item in product.highlights" :key="item" class="flex items-start gap-3">
            <Icon name="lucide:check" class="text-primary mt-0.5 size-4 shrink-0" />
            {{ item }}
          </li>
        </ul>
      </div>
    </div>

    <Transition
      enter-active-class="transition duration-300"
      enter-from-class="translate-y-full"
      leave-active-class="transition duration-200"
      leave-to-class="translate-y-full"
    >
      <div
        v-if="showBar"
        class="bg-background/95 fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t p-3 backdrop-blur lg:hidden"
      >
        <img
          :src="product.images[0]!.src"
          alt=""
          class="size-12 shrink-0 rounded-md object-cover"
        />
        <div class="min-w-0 flex-1">
          <p class="truncate text-sm font-medium">{{ product.name }}</p>
          <p class="text-muted-foreground text-sm">
            {{ money.format(product.price) }}{{ size ? ` · ${size}` : "" }}
          </p>
        </div>
        <UiButton :disabled="!size" @click="addToCart">
          {{ added ? "Added" : size ? "Add to cart" : "Pick size" }}
        </UiButton>
      </div>
    </Transition>
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

  type SizeRow = { size: string; chest: number; length: number; sleeve: number };

  withDefaults(
    defineProps<{
      product?: Product;
      /** Measurements in inches. They are converted when the unit is switched. */
      guide?: SizeRow[];
    }>(),
    {
      guide: () => [
        { size: "XS", chest: 36, length: 25.5, sleeve: 24.5 },
        { size: "S", chest: 38, length: 26, sleeve: 25 },
        { size: "M", chest: 40, length: 26.5, sleeve: 25.5 },
        { size: "L", chest: 42, length: 27, sleeve: 26 },
        { size: "XL", chest: 44, length: 27.5, sleeve: 26.5 },
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

  const size = ref("");
  const added = ref(false);
  const guideOpen = ref(false);
  const unit = ref<"in" | "cm">("in");
  const mainCta = ref<{ $el: HTMLElement } | null>(null);
  const ctaVisible = ref(true);

  // The sticky bar appears once the main button has scrolled out of view.
  useIntersectionObserver(
    () => mainCta.value?.$el,
    ([entry]) => (ctaVisible.value = entry?.isIntersecting ?? true)
  );
  const showBar = computed(() => !ctaVisible.value);

  function convert(inches: number) {
    return unit.value === "in" ? `${inches}"` : `${Math.round(inches * 2.54)} cm`;
  }

  // Replace this with a call to your cart store or API.
  function addToCart() {
    added.value = true;
    setTimeout(() => (added.value = false), 1800);
  }
</script>
