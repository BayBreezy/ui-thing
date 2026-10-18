<template>
  <!--
    File detail panel
    Features: A preview, the name and type, tabs for details, activity and sharing, editable tags that can be added and removed, a metadata list, an activity list, avatars of who has access and download, share and delete actions
  -->
  <UiContainer class="py-12 lg:py-20">
    <UiCard class="mx-auto w-full max-w-sm gap-0 overflow-hidden py-0">
      <div class="bg-muted relative">
        <img
          :src="file.preview"
          :alt="file.name"
          class="aspect-[4/3] w-full object-cover"
          loading="lazy"
        />
      </div>
      <div class="space-y-1 px-5 pt-4">
        <h1 class="truncate font-semibold">{{ file.name }}</h1>
        <p class="text-muted-foreground text-sm">{{ file.type }} · {{ file.size }}</p>
      </div>

      <UiTabs v-model="tab" class="px-5 pt-4 pb-5">
        <UiTabsList class="w-full">
          <UiTabsTrigger value="details" class="flex-1">Details</UiTabsTrigger>
          <UiTabsTrigger value="activity" class="flex-1">Activity</UiTabsTrigger>
          <UiTabsTrigger value="sharing" class="flex-1">Sharing</UiTabsTrigger>
        </UiTabsList>

        <UiTabsContent value="details" class="space-y-4">
          <dl class="grid grid-cols-[6rem_1fr] gap-x-3 gap-y-2 text-sm">
            <template v-for="row in file.meta" :key="row.label">
              <dt class="text-muted-foreground">{{ row.label }}</dt>
              <dd class="truncate">{{ row.value }}</dd>
            </template>
          </dl>
          <div>
            <p class="mb-2 text-sm font-medium">Tags</p>
            <div class="flex flex-wrap gap-1.5">
              <UiBadge v-for="tag in tags" :key="tag" variant="soft" shape="pill" class="gap-1">
                {{ tag }}
                <button
                  type="button"
                  :aria-label="`Remove tag ${tag}`"
                  @click="tags = tags.filter((item) => item !== tag)"
                >
                  <Icon name="lucide:x" class="size-3" />
                </button>
              </UiBadge>
              <span v-if="!tags.length" class="text-muted-foreground text-sm">No tags yet.</span>
            </div>
            <form class="mt-2 flex gap-2" @submit.prevent="addTag">
              <UiInput v-model="newTag" class="h-8" placeholder="Add a tag" aria-label="New tag" />
              <UiButton type="submit" size="sm" variant="outline" :disabled="!newTag.trim()"
                >Add</UiButton
              >
            </form>
          </div>
        </UiTabsContent>

        <UiTabsContent value="activity">
          <ol class="space-y-3 text-sm">
            <li v-for="item in file.activity" :key="item.text" class="flex gap-3">
              <UiAvatar
                :src="`https://i.pravatar.cc/80?img=${item.avatar}`"
                :fallback="item.who.slice(0, 1)"
                class="size-7"
              />
              <div>
                <p>
                  <span class="font-medium">{{ item.who }}</span> {{ item.text }}
                </p>
                <p class="text-muted-foreground text-xs">{{ item.when }}</p>
              </div>
            </li>
          </ol>
        </UiTabsContent>

        <UiTabsContent value="sharing" class="space-y-3">
          <ul class="space-y-2">
            <li
              v-for="person in file.people"
              :key="person.name"
              class="flex items-center gap-3 text-sm"
            >
              <UiAvatar
                :src="`https://i.pravatar.cc/80?img=${person.avatar}`"
                :fallback="person.name.slice(0, 1)"
                class="size-8"
              />
              <span class="flex-1 truncate">{{ person.name }}</span>
              <span class="text-muted-foreground capitalize">{{ person.role }}</span>
            </li>
          </ul>
        </UiTabsContent>
      </UiTabs>

      <div class="flex gap-2 border-t px-5 py-4">
        <UiButton
          class="flex-1"
          variant="outline"
          size="sm"
          @click="useSonner.success(`Downloading ${file.name}`)"
          ><Icon name="lucide:download" class="size-4" />Download</UiButton
        >
        <UiButton class="flex-1" variant="outline" size="sm" @click="tab = 'sharing'"
          ><Icon name="lucide:share-2" class="size-4" />Share</UiButton
        >
        <UiButton
          variant="outline"
          size="icon-sm"
          class="text-destructive"
          aria-label="Delete file"
          @click="useSonner.success(`Moved ${file.name} to trash`)"
          ><Icon name="lucide:trash-2" class="size-4"
        /></UiButton>
      </div>
    </UiCard>
  </UiContainer>
</template>

<script lang="ts" setup>
  type FileInfo = {
    name: string;
    type: string;
    size: string;
    preview: string;
    meta: { label: string; value: string }[];
    tags: string[];
    activity: { who: string; avatar: number; text: string; when: string }[];
    people: { name: string; avatar: number; role: string }[];
  };

  const props = withDefaults(
    defineProps<{
      file?: FileInfo;
    }>(),
    {
      file: () => ({
        name: "Mountain lake.jpg",
        type: "JPEG image",
        size: "3.4 MB",
        preview: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=640&q=70",
        meta: [
          { label: "Owner", value: "Maya Patel" },
          { label: "Location", value: "My files / Photos" },
          { label: "Modified", value: "Oct 16, 2026, 11:20 AM" },
          { label: "Created", value: "Oct 16, 2026, 11:18 AM" },
          { label: "Dimensions", value: "4032 x 3024" },
        ],
        tags: ["landscape", "brand"],
        activity: [
          { who: "Maya Patel", avatar: 32, text: "renamed the file", when: "Oct 16, 11:20 AM" },
          { who: "Leo Fischer", avatar: 12, text: "viewed the file", when: "Oct 16, 1:05 PM" },
          { who: "Maya Patel", avatar: 32, text: "uploaded the file", when: "Oct 16, 11:18 AM" },
        ],
        people: [
          { name: "Maya Patel", avatar: 32, role: "owner" },
          { name: "Leo Fischer", avatar: 12, role: "editor" },
          { name: "Sofia Alvarez", avatar: 45, role: "viewer" },
        ],
      }),
    }
  );

  const tab = ref("details");
  const tags = ref([...props.file.tags]);
  const newTag = ref("");

  function addTag() {
    const value = newTag.value.trim().toLowerCase();
    if (value && !tags.value.includes(value)) tags.value.push(value);
    newTag.value = "";
  }
</script>
