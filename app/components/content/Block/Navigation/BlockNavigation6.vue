<template>
  <!--
    Centered logo header for stores
    Features: Links on the left, logo in the middle, search, account and a cart with a count that updates on the right, expandable search field, sheet menu on small screens
  -->
  <header class="bg-background/90 sticky top-0 z-20 border-b backdrop-blur">
    <UiContainer class="grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-4">
      <nav class="hidden items-center gap-6 lg:flex" aria-label="Main">
        <NuxtLink
          v-for="link in links"
          :key="link"
          to="#"
          class="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
        >
          {{ link }}
        </NuxtLink>
      </nav>
      <UiSheet v-model:open="open">
        <UiSheetTrigger as-child>
          <UiButton
            variant="ghost"
            size="icon"
            class="justify-self-start lg:hidden"
            aria-label="Open menu"
          >
            <Icon name="lucide:menu" class="size-5" />
          </UiButton>
        </UiSheetTrigger>
        <UiSheetContent side="left" class="w-[88%] p-0 sm:max-w-sm">
          <UiSheetTitle class="sr-only" title="Menu" />
          <UiSheetDescription class="sr-only" description="Store navigation" />
          <UiSheetX class="z-20" />
          <div class="border-b p-5 text-lg font-semibold">{{ props.name }}</div>
          <nav class="p-3" aria-label="Mobile">
            <NuxtLink
              v-for="link in links"
              :key="link"
              to="#"
              class="hover:bg-muted block rounded-md px-3 py-3 text-sm font-semibold"
              @click="open = false"
            >
              {{ link }}
            </NuxtLink>
          </nav>
        </UiSheetContent>
      </UiSheet>

      <NuxtLink to="#" class="flex items-center gap-2.5 text-xl font-semibold tracking-tight">
        <svg
          class="fill-primary h-6"
          viewBox="0 0 53 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23.2997 0L52.0461 28.6301V44H38.6311V34.1553L17.7522 13.3607L13.415 13.3607L13.415 44H0L0 0L23.2997 0ZM38.6311 15.2694V0L52.0461 0V15.2694L38.6311 15.2694Z"
          />
        </svg>
        {{ props.name }}
      </NuxtLink>

      <div class="flex items-center justify-end gap-1">
        <div class="flex items-center">
          <Transition
            enter-active-class="transition-all duration-200"
            enter-from-class="w-0 opacity-0"
            enter-to-class="w-40 opacity-100 sm:w-56"
            leave-active-class="transition-all duration-200"
            leave-from-class="w-40 opacity-100 sm:w-56"
            leave-to-class="w-0 opacity-0"
          >
            <UiInput
              v-if="searching"
              v-model="query"
              placeholder="Search products"
              aria-label="Search products"
              class="h-9 overflow-hidden"
              autofocus
              @keydown.esc="searching = false"
            />
          </Transition>
          <UiButton
            variant="ghost"
            size="icon"
            :aria-label="searching ? 'Close search' : 'Search'"
            @click="searching = !searching"
          >
            <Icon :name="searching ? 'lucide:x' : 'lucide:search'" class="size-5" />
          </UiButton>
        </div>
        <UiButton variant="ghost" size="icon" class="hidden sm:inline-flex" aria-label="Account">
          <Icon name="lucide:user" class="size-5" />
        </UiButton>
        <UiButton variant="ghost" size="icon" class="relative" aria-label="Cart" @click="cart++">
          <Icon name="lucide:shopping-bag" class="size-5" />
          <Transition
            enter-active-class="transition duration-200"
            enter-from-class="scale-50 opacity-0"
          >
            <span
              v-if="cart"
              :key="cart"
              class="bg-primary text-primary-foreground absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full text-[10px] font-semibold"
            >
              {{ cart }}
            </span>
          </Transition>
        </UiButton>
      </div>
    </UiContainer>
  </header>
</template>

<script lang="ts" setup>
  const props = withDefaults(defineProps<{ name?: string }>(), { name: "Northwind" });

  const links = ["New in", "Women", "Men", "Accessories", "Sale"];
  const open = ref(false);
  const searching = ref(false);
  const query = ref("");
  // Clicking the bag adds an item so you can see the count change.
  const cart = ref(2);
</script>
