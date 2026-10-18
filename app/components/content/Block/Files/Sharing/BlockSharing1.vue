<template>
  <!--
    Share dialog
    Features: A dialog with an invite field that adds people by email, a role select for each person, a general access select for anyone with the link, a copy link button and a done button that shows who the file is shared with
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-xl">
      <UiCard class="gap-4">
        <div class="flex items-center gap-3 px-6">
          <span class="bg-muted grid size-12 place-items-center rounded-lg"
            ><Icon name="lucide:file-text" class="size-6 text-blue-500"
          /></span>
          <div class="min-w-0 flex-1">
            <UiCardTitle class="truncate">{{ file }}</UiCardTitle>
            <UiCardDescription
              >Shared with {{ shared.length }}
              {{ shared.length === 1 ? "person" : "people" }}</UiCardDescription
            >
          </div>
          <UiDialog v-model:open="open">
            <UiDialogTrigger as-child>
              <UiButton><Icon name="lucide:share-2" class="size-4" />Share</UiButton>
            </UiDialogTrigger>
            <UiDialogContent class="sm:max-w-lg">
              <UiDialogHeader>
                <UiDialogTitle>Share "{{ file }}"</UiDialogTitle>
                <UiDialogDescription>Invite people or share a link.</UiDialogDescription>
              </UiDialogHeader>
              <form class="flex gap-2" novalidate @submit.prevent="invite">
                <UiInput
                  v-model="email"
                  type="email"
                  placeholder="Add people by email"
                  aria-label="Email address"
                  :aria-invalid="!!error"
                />
                <UiButton type="submit">Invite</UiButton>
              </form>
              <p v-if="error" class="text-destructive -mt-2 text-sm">{{ error }}</p>

              <ul class="max-h-52 space-y-3 overflow-y-auto" aria-label="People with access">
                <li v-for="person in people" :key="person.email" class="flex items-center gap-3">
                  <UiAvatar
                    :src="
                      person.avatar ? `https://i.pravatar.cc/80?img=${person.avatar}` : undefined
                    "
                    :fallback="person.name.slice(0, 1).toUpperCase()"
                    class="size-8"
                  />
                  <div class="min-w-0 flex-1">
                    <p class="truncate text-sm font-medium">{{ person.name }}</p>
                    <p class="text-muted-foreground truncate text-xs">{{ person.email }}</p>
                  </div>
                  <span v-if="person.owner" class="text-muted-foreground text-sm">Owner</span>
                  <UiSelect v-else v-model="person.role">
                    <UiSelectTrigger class="h-8 w-28" :aria-label="`Role for ${person.name}`"
                      ><UiSelectValue
                    /></UiSelectTrigger>
                    <UiSelectContent>
                      <UiSelectItem value="viewer">Viewer</UiSelectItem>
                      <UiSelectItem value="commenter">Commenter</UiSelectItem>
                      <UiSelectItem value="editor">Editor</UiSelectItem>
                    </UiSelectContent>
                  </UiSelect>
                </li>
              </ul>

              <div class="space-y-2 border-t pt-4">
                <UiLabel for="general-access">General access</UiLabel>
                <div class="flex items-center gap-2">
                  <UiSelect v-model="access">
                    <UiSelectTrigger id="general-access" class="flex-1"
                      ><UiSelectValue
                    /></UiSelectTrigger>
                    <UiSelectContent>
                      <UiSelectItem value="restricted"
                        >Restricted. Only people added can open</UiSelectItem
                      >
                      <UiSelectItem value="link">Anyone with the link can view</UiSelectItem>
                    </UiSelectContent>
                  </UiSelect>
                </div>
              </div>
              <UiDialogFooter class="sm:justify-between">
                <UiButton type="button" variant="outline" @click="copy(link)"
                  ><Icon :name="copied ? 'lucide:check' : 'lucide:link'" class="size-4" />{{
                    copied ? "Link copied" : "Copy link"
                  }}</UiButton
                >
                <UiButton type="button" @click="done">Done</UiButton>
              </UiDialogFooter>
            </UiDialogContent>
          </UiDialog>
        </div>
        <UiCardContent>
          <div class="flex items-center gap-2">
            <div class="flex -space-x-2">
              <UiAvatar
                v-for="person in shared"
                :key="person.email"
                :src="person.avatar ? `https://i.pravatar.cc/80?img=${person.avatar}` : undefined"
                :fallback="person.name.slice(0, 1).toUpperCase()"
                class="ring-background size-8 ring-2"
              />
            </div>
            <p class="text-muted-foreground text-sm" aria-live="polite">
              {{ access === "link" ? "Anyone with the link can view" : "Restricted" }}
            </p>
          </div>
        </UiCardContent>
      </UiCard>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Role = "viewer" | "commenter" | "editor";
  type Person = { name: string; email: string; avatar?: number; role: Role; owner?: boolean };

  const props = withDefaults(
    defineProps<{
      file?: string;
      link?: string;
      people?: Person[];
    }>(),
    {
      file: "Q3 report.pdf",
      link: "https://files.example.com/s/q3-report-8f2a",
      people: () => [
        { name: "You", email: "alex@example.com", avatar: 32, role: "editor", owner: true },
        { name: "Sofia Alvarez", email: "sofia@example.com", avatar: 45, role: "editor" },
        { name: "Noah Kim", email: "noah@example.com", avatar: 15, role: "viewer" },
      ],
    }
  );

  const open = ref(false);
  const people = ref<Person[]>(props.people.map((person) => ({ ...person })));
  const shared = ref<Person[]>(people.value.map((person) => ({ ...person })));
  const email = ref("");
  const error = ref("");
  const access = ref("restricted");
  const { copy, copied } = useClipboard({ copiedDuring: 1500 });

  function invite() {
    const value = email.value.trim().toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(value)) {
      error.value = "Enter a valid email address.";
      return;
    }
    if (people.value.some((person) => person.email === value)) {
      error.value = "This person already has access.";
      return;
    }
    error.value = "";
    people.value.push({ name: value.split("@")[0]!, email: value, role: "viewer" });
    email.value = "";
  }

  function done() {
    shared.value = people.value.map((person) => ({ ...person }));
    open.value = false;
    useSonner.success("Sharing settings saved");
  }
</script>
