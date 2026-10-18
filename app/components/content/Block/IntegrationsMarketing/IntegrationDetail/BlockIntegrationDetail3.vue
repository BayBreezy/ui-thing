<template>
  <!--
    Permissions list
    Features: What the integration can access, split into required and optional permissions, a switch for each optional one, a risk label with text, a summary that counts what you allow, an allow all optional shortcut and a note on how to revoke access
  -->
  <UiContainer class="py-12 lg:py-20">
    <UiCard class="mx-auto w-full max-w-xl gap-0 py-0">
      <div class="flex items-center gap-4 border-b px-6 py-5">
        <span class="bg-muted grid size-12 shrink-0 place-items-center rounded-xl"
          ><Icon :name="icon" class="size-7"
        /></span>
        <div class="min-w-0 flex-1">
          <h1 class="font-semibold">{{ name }} wants to access your account</h1>
          <p class="text-muted-foreground text-sm" aria-live="polite">
            Allowing {{ allowed }} of {{ permissions.length }} permissions
          </p>
        </div>
      </div>

      <section class="px-6 py-5" aria-label="Required permissions">
        <h2 class="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
          Required
        </h2>
        <ul class="mt-3 space-y-3">
          <li v-for="permission in required" :key="permission.id" class="flex items-start gap-3">
            <Icon name="lucide:lock" class="text-muted-foreground mt-0.5 size-4 shrink-0" />
            <div class="min-w-0 flex-1">
              <p class="text-sm font-medium">{{ permission.title }}</p>
              <p class="text-muted-foreground text-sm">{{ permission.body }}</p>
            </div>
            <UiBadge variant="soft" shape="pill" :color="risk[permission.risk]"
              >{{ permission.risk }} risk</UiBadge
            >
          </li>
        </ul>
      </section>

      <section class="border-t px-6 py-5" aria-label="Optional permissions">
        <div class="flex items-center justify-between gap-3">
          <h2 class="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
            Optional
          </h2>
          <UiButton variant="ghost" size="sm" class="h-7" @click="setAll(!allOptional)">{{
            allOptional ? "Turn all off" : "Allow all optional"
          }}</UiButton>
        </div>
        <ul class="mt-3 space-y-4">
          <li v-for="permission in optional" :key="permission.id" class="flex items-start gap-3">
            <div class="min-w-0 flex-1">
              <UiLabel :for="`perm-${permission.id}`" class="text-sm font-medium">{{
                permission.title
              }}</UiLabel>
              <p class="text-muted-foreground text-sm">{{ permission.body }}</p>
              <UiBadge variant="soft" shape="pill" :color="risk[permission.risk]" class="mt-1.5"
                >{{ permission.risk }} risk</UiBadge
              >
            </div>
            <UiSwitch
              :id="`perm-${permission.id}`"
              :model-value="granted.has(permission.id)"
              @update:model-value="toggle(permission.id)"
            />
          </li>
        </ul>
      </section>

      <div class="bg-muted/40 flex items-start gap-3 border-t px-6 py-4 text-sm">
        <Icon name="lucide:shield-check" class="text-muted-foreground mt-0.5 size-4 shrink-0" />
        <p class="text-muted-foreground">
          You can change or revoke access at any time in Settings, then Integrations.
        </p>
      </div>

      <div class="flex justify-end gap-2 border-t px-6 py-4">
        <UiButton variant="outline" @click="useSonner.info('Access denied')">Cancel</UiButton>
        <UiButton @click="useSonner.success(`Allowed ${allowed} permissions`)"
          >Allow access</UiButton
        >
      </div>
    </UiCard>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Risk = "low" | "medium" | "high";
  type Permission = { id: string; title: string; body: string; risk: Risk; required?: boolean };

  const props = withDefaults(
    defineProps<{
      name?: string;
      icon?: string;
      permissions?: Permission[];
    }>(),
    {
      name: "Slack",
      icon: "logos:slack-icon",
      permissions: () => [
        {
          id: "profile",
          title: "See your name and email",
          body: "Used to match your Acme account.",
          risk: "low",
          required: true,
        },
        {
          id: "channels",
          title: "See channel names",
          body: "So you can pick where alerts post.",
          risk: "low",
          required: true,
        },
        {
          id: "post",
          title: "Post messages as Acme",
          body: "Send alerts and summaries to the channels you choose.",
          risk: "medium",
          required: true,
        },
        {
          id: "history",
          title: "Read message history",
          body: "Lets Acme link a message to a task. Only in channels where it is added.",
          risk: "high",
        },
        {
          id: "files",
          title: "Upload files",
          body: "Attach exports and reports to messages.",
          risk: "medium",
        },
        {
          id: "users",
          title: "See the member list",
          body: "Lets you mention people by name.",
          risk: "low",
        },
      ],
    }
  );

  const risk: Record<Risk, string> = { low: "green", medium: "amber", high: "red" };
  const required = computed(() => props.permissions.filter((permission) => permission.required));
  const optional = computed(() => props.permissions.filter((permission) => !permission.required));
  const granted = ref(new Set<string>(["users"]));

  const allowed = computed(() => required.value.length + granted.value.size);
  const allOptional = computed(
    () =>
      optional.value.length > 0 &&
      optional.value.every((permission) => granted.value.has(permission.id))
  );

  function toggle(id: string) {
    const next = new Set(granted.value);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    granted.value = next;
  }

  function setAll(on: boolean) {
    granted.value = on ? new Set(optional.value.map((permission) => permission.id)) : new Set();
  }
</script>
