<template>
  <!--
    Referral waitlist
    Features: Join form, queue position after signing up, personal referral link with copy button, share actions, reward tiers that unlock as invites are counted
  -->
  <UiContainer class="py-12 lg:py-20">
    <UiCard class="mx-auto w-full max-w-xl">
      <UiCardHeader class="text-center">
        <UiCardTitle class="text-2xl">{{
          joined ? "You are in line" : "Join the waitlist"
        }}</UiCardTitle>
        <UiCardDescription>
          {{
            joined
              ? "Invite friends to move up. Every signup through your link counts."
              : `${total.toLocaleString("en-US")} people are already waiting.`
          }}
        </UiCardDescription>
      </UiCardHeader>

      <UiCardContent>
        <form v-if="!joined" class="grid gap-3" novalidate @submit.prevent="join">
          <UiLabel for="ref-email" class="sr-only">Email address</UiLabel>
          <UiInput
            id="ref-email"
            v-model="email"
            type="email"
            autocomplete="email"
            placeholder="you@example.com"
            class="h-10"
            :aria-invalid="!!error"
          />
          <p v-if="error" class="text-destructive text-sm">{{ error }}</p>
          <UiButton type="submit" size="lg">Get my spot</UiButton>
        </form>

        <div v-else class="grid gap-6">
          <div class="bg-muted/50 rounded-xl p-5 text-center" role="status">
            <p class="text-muted-foreground text-sm">Your position</p>
            <p class="text-5xl font-bold tabular-nums">#{{ position.toLocaleString("en-US") }}</p>
            <p class="text-muted-foreground mt-1 text-sm">
              {{ invites }} {{ invites === 1 ? "friend" : "friends" }} joined with your link
            </p>
          </div>

          <div class="grid gap-2">
            <UiLabel for="ref-link">Your referral link</UiLabel>
            <div class="flex gap-2">
              <UiInput id="ref-link" :model-value="link" readonly class="font-mono text-sm" />
              <UiButton variant="outline" @click="copy(link)">
                <Icon :name="copied ? 'lucide:check' : 'lucide:copy'" class="size-4" />
                {{ copied ? "Copied" : "Copy" }}
              </UiButton>
            </div>
            <div class="flex flex-wrap gap-2">
              <UiButton variant="outline" size="sm" @click="shareVia('email')"
                ><Icon name="lucide:mail" class="size-4" />Email</UiButton
              >
              <UiButton variant="outline" size="sm" @click="shareVia('post')"
                ><Icon name="lucide:send" class="size-4" />Post</UiButton
              >
            </div>
          </div>

          <div>
            <p class="text-sm font-medium">Rewards</p>
            <ul class="mt-3 grid gap-2">
              <li
                v-for="tier in tiers"
                :key="tier.invites"
                class="flex items-center gap-3 rounded-lg border p-3"
                :class="invites >= tier.invites ? 'border-primary/50 bg-primary/5' : ''"
              >
                <Icon
                  :name="invites >= tier.invites ? 'lucide:circle-check' : 'lucide:lock'"
                  class="size-5 shrink-0"
                  :class="invites >= tier.invites ? 'text-primary' : 'text-muted-foreground'"
                />
                <span class="min-w-0 flex-1 text-sm">
                  <span class="block font-medium">{{ tier.reward }}</span>
                  <span class="text-muted-foreground block text-xs"
                    >{{ tier.invites }} {{ tier.invites === 1 ? "invite" : "invites" }}</span
                  >
                </span>
                <UiBadge v-if="invites >= tier.invites" variant="soft" color="primary" size="sm"
                  >Unlocked</UiBadge
                >
              </li>
            </ul>
          </div>

          <UiButton variant="outline" size="sm" class="justify-self-center" @click="simulate">
            Simulate a friend joining
          </UiButton>
        </div>
      </UiCardContent>
    </UiCard>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Tier = { invites: number; reward: string };

  const props = withDefaults(
    defineProps<{
      total?: number;
      baseUrl?: string;
      tiers?: Tier[];
    }>(),
    {
      total: 4280,
      baseUrl: "https://orbit.example.com/join",
      tiers: () => [
        { invites: 1, reward: "Skip 100 places" },
        { invites: 3, reward: "Early access to the beta" },
        { invites: 5, reward: "Lifetime 30% discount" },
      ],
    }
  );

  const email = ref("");
  const error = ref("");
  const joined = ref(false);
  const invites = ref(0);
  const { copy, copied } = useClipboard({ copiedDuring: 1500 });

  const code = computed(() => {
    const local = email.value.trim().split("@")[0] ?? "";
    return (
      local
        .replace(/[^a-z0-9]/gi, "")
        .toLowerCase()
        .slice(0, 12) || "friend"
    );
  });
  const link = computed(() => `${props.baseUrl}?ref=${code.value}`);
  const position = computed(() => Math.max(1, props.total + 1 - invites.value * 100));

  function join() {
    if (!/^\S+@\S+\.\S+$/.test(email.value.trim())) {
      error.value = "Enter a valid email address.";
      return;
    }
    error.value = "";
    joined.value = true;
  }

  function simulate() {
    invites.value += 1;
  }

  function shareVia(channel: "email" | "post") {
    useSonner(channel === "email" ? "Opening your email app" : "Opening the share dialog", {
      description: link.value,
    });
  }
</script>
