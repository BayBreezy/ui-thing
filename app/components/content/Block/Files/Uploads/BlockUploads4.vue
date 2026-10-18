<template>
  <!--
    Image upload with preview grid
    Features: A compact dropzone, a grid of thumbnails made from the chosen images, a cover badge on the first image with a set as cover action, remove buttons, a limit with a counter and checks for type and size
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-2xl">
      <div class="flex items-end justify-between gap-3">
        <div>
          <h1 class="text-2xl font-bold tracking-tight">Gallery</h1>
          <p class="text-muted-foreground text-sm" aria-live="polite">
            {{ images.length }} of {{ limit }} images
          </p>
        </div>
        <UiButton :disabled="images.length >= limit" @click="browse()"
          ><Icon name="lucide:image-plus" class="size-4" />Add images</UiButton
        >
      </div>

      <UiDropfile
        v-if="images.length < limit"
        class="mt-4"
        icon="lucide:images"
        title="Drop images here"
        subtext="JPG, PNG or WebP"
        accept="image/*"
        @dropped="add"
      />
      <p v-if="error" class="text-destructive mt-2 text-sm" role="alert">{{ error }}</p>

      <ul v-if="images.length" class="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <li
          v-for="(image, index) in images"
          :key="image.id"
          class="group relative overflow-hidden rounded-xl border"
        >
          <img :src="image.url" :alt="image.name" class="aspect-square w-full object-cover" />
          <UiBadge v-if="index === 0" class="absolute top-2 left-2" variant="solid" color="blue"
            >Cover</UiBadge
          >
          <div
            class="absolute inset-x-0 bottom-0 flex items-center gap-1 bg-linear-to-t from-black/70 to-transparent p-2 text-white"
          >
            <span class="min-w-0 flex-1 truncate text-xs">{{ image.name }}</span>
            <UiButton
              v-if="index > 0"
              variant="ghost"
              size="icon-sm"
              class="size-7 text-white hover:bg-white/20 hover:text-white"
              :aria-label="`Set ${image.name} as cover`"
              @click="makeCover(index)"
              ><Icon name="lucide:star" class="size-4"
            /></UiButton>
            <UiButton
              variant="ghost"
              size="icon-sm"
              class="size-7 text-white hover:bg-white/20 hover:text-white"
              :aria-label="`Remove ${image.name}`"
              @click="remove(image.id)"
              ><Icon name="lucide:trash-2" class="size-4"
            /></UiButton>
          </div>
        </li>
      </ul>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Img = { id: string; name: string; url: string; owned: boolean };

  const props = withDefaults(
    defineProps<{
      limit?: number;
      maxMb?: number;
      initial?: { name: string; url: string }[];
    }>(),
    {
      limit: 8,
      maxMb: 5,
      initial: () => [
        {
          name: "mountain-lake.jpg",
          url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=480&q=70",
        },
        {
          name: "forest-trail.jpg",
          url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=480&q=70",
        },
        {
          name: "valley-view.jpg",
          url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=480&q=70",
        },
      ],
    }
  );

  const images = ref<Img[]>(
    props.initial.map((item, index) => ({ id: `i${index}`, ...item, owned: false }))
  );
  const error = ref("");
  let counter = 0;

  const { open: browse, onChange, reset } = useFileDialog({ accept: "image/*", multiple: true });
  onChange((files) => {
    if (files?.length) {
      add(Array.from(files));
      reset();
    }
  });

  function add(files: File[]) {
    const problems: string[] = [];
    for (const file of files) {
      if (images.value.length >= props.limit) {
        problems.push(`Only ${props.limit} images fit. ${file.name} was skipped.`);
        continue;
      }
      if (!file.type.startsWith("image/")) {
        problems.push(`${file.name} is not an image.`);
        continue;
      }
      if (file.size > props.maxMb * 1024 * 1024) {
        problems.push(`${file.name} is larger than ${props.maxMb} MB.`);
        continue;
      }
      images.value.push({
        id: `n${counter++}`,
        name: file.name,
        url: URL.createObjectURL(file),
        owned: true,
      });
    }
    error.value = problems.join(" ");
  }

  function remove(id: string) {
    const image = images.value.find((item) => item.id === id);
    if (image?.owned) URL.revokeObjectURL(image.url);
    images.value = images.value.filter((item) => item.id !== id);
  }

  function makeCover(index: number) {
    const [image] = images.value.splice(index, 1);
    if (image) images.value.unshift(image);
  }

  onBeforeUnmount(() =>
    images.value.forEach((image) => image.owned && URL.revokeObjectURL(image.url))
  );
</script>
