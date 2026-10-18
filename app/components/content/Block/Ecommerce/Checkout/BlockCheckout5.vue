<template>
  <!--
    Express checkout with guest and sign in tabs
    Features: Apple Pay, Google Pay and PayPal buttons, an or divider, tabs that switch between guest checkout and signing in with different validation, a password field with a show toggle and a continue confirmation
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-md">
      <h1 class="text-center text-2xl font-bold tracking-tight">Checkout</h1>
      <p class="text-muted-foreground mt-2 text-center text-sm">
        Pay in seconds with a saved wallet, or continue with your email.
      </p>

      <div class="mt-8">
        <p
          class="text-muted-foreground mb-3 text-center text-xs font-medium tracking-wide uppercase"
        >
          Express checkout
        </p>
        <div class="grid grid-cols-3 gap-3">
          <button
            v-for="wallet in wallets"
            :key="wallet.name"
            type="button"
            class="focus-visible:ring-ring flex h-11 items-center justify-center rounded-lg transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            :class="wallet.class"
            :aria-label="`Pay with ${wallet.name}`"
            @click="express(wallet.name)"
          >
            <Icon :name="wallet.icon" class="h-5 w-auto" />
          </button>
        </div>
        <p v-if="notice" class="text-muted-foreground mt-3 text-center text-xs" role="status">
          {{ notice }}
        </p>
      </div>

      <div class="my-8 flex items-center gap-4">
        <UiSeparator class="flex-1" />
        <span class="text-muted-foreground text-xs">or continue with email</span>
        <UiSeparator class="flex-1" />
      </div>

      <div v-if="!done">
        <UiTabs v-model="tab">
          <UiTabsList class="grid w-full grid-cols-2">
            <UiTabsTrigger value="guest">Guest checkout</UiTabsTrigger>
            <UiTabsTrigger value="signin">Sign in</UiTabsTrigger>
          </UiTabsList>

          <form class="mt-6" novalidate @submit.prevent="submit">
            <UiTabsContent value="guest" class="space-y-4">
              <UiVeeInput
                name="email"
                label="Email"
                type="email"
                placeholder="you@example.com"
                autocomplete="email"
              />
              <UiVeeCheckbox name="updates" label="Email me about new arrivals and offers" />
              <UiVeeCheckbox name="account" label="Save my details and create an account" />
            </UiTabsContent>

            <UiTabsContent value="signin" class="space-y-4">
              <UiVeeInput
                name="email"
                label="Email"
                type="email"
                placeholder="you@example.com"
                autocomplete="email"
              />
              <UiVeePasswordInput
                name="password"
                label="Password"
                autocomplete="current-password"
              />
              <a href="#" class="text-muted-foreground block text-sm underline underline-offset-4">
                Forgot your password?
              </a>
            </UiTabsContent>

            <UiButton type="submit" size="lg" class="mt-6 w-full" :loading="isSubmitting">
              {{ tab === "guest" ? "Continue as guest" : "Sign in and continue" }}
            </UiButton>
          </form>
        </UiTabs>
      </div>

      <div v-else class="text-center" role="status">
        <span
          class="mx-auto grid size-12 place-items-center rounded-full bg-green-500/15 text-green-600 dark:text-green-400"
        >
          <Icon name="lucide:check" class="size-6" />
        </span>
        <p class="mt-4 font-medium">
          {{ tab === "guest" ? "Continuing as guest" : "Signed in" }} as {{ values.email }}
        </p>
        <UiButton variant="ghost" class="mt-2" @click="done = false"
          >Use a different email</UiButton
        >
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  import { object, string } from "yup";

  type Wallet = { name: string; icon: string; class: string };

  withDefaults(
    defineProps<{
      wallets?: Wallet[];
    }>(),
    {
      wallets: () => [
        { name: "Apple Pay", icon: "logos:apple-pay", class: "bg-white text-black border" },
        { name: "Google Pay", icon: "logos:google-pay", class: "bg-white text-black border" },
        { name: "PayPal", icon: "logos:paypal", class: "bg-[#ffc439] text-black" },
      ],
    }
  );

  const tab = ref<"guest" | "signin">("guest");
  const done = ref(false);
  const notice = ref("");

  // The schema follows the active tab, so guests are never asked for a password.
  const schemas = {
    guest: object({
      email: string().email("Enter a valid email address").required().label("Email"),
    }),
    signin: object({
      email: string().email("Enter a valid email address").required().label("Email"),
      password: string().min(8, "Use at least 8 characters").required().label("Password"),
    }),
  };

  const { handleSubmit, isSubmitting, values, resetField } = useForm({
    validationSchema: computed(() => schemas[tab.value]),
    keepValuesOnUnmount: true,
  });

  watch(tab, () => resetField("password"));

  function express(name: string) {
    notice.value = `Connect ${name} here. This demo does not open a payment sheet.`;
  }

  // Replace the timeout with a request that signs the user in or starts a guest session.
  const submit = handleSubmit(async () => {
    await new Promise((resolve) => setTimeout(resolve, 700));
    done.value = true;
  });
</script>
