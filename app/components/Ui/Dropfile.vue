<template>
  <div
    ref="dropZoneRef"
    data-slot="dropfile"
    :class="styles({ isOverDropZone, class: normalizeClass(props.class) || undefined })"
    @click="open()"
  >
    <slot>
      <slot name="message">
        <div data-slot="dropfile-message" class="py-10 text-center">
          <slot name="icon">
            <div
              v-if="icon"
              data-slot="dropfile-icon-wrapper"
              class="inline-flex items-center justify-center rounded-md border p-2 transition"
              :class="[isOverDropZone && 'animate-bounce border-primary']"
            >
              <Icon
                data-slot="dropfile-icon"
                :name="icon"
                class="h-7 w-7 opacity-70"
                :class="[isOverDropZone && 'text-primary']"
              />
            </div>
          </slot>
          <slot name="title">
            <p
              v-if="title"
              data-slot="dropfile-title"
              class="mt-5 text-sm font-medium"
              v-html="title"
            />
          </slot>
          <slot name="subtext">
            <p
              v-if="subtext"
              data-slot="dropfile-subtext"
              class="mt-1 text-sm text-muted-foreground/60"
              v-html="subtext"
            />
          </slot>
        </div>
      </slot>
    </slot>
  </div>
</template>

<script setup lang="ts">
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = withDefaults(
    defineProps<{
      /**
       * The text to display as the title of the dropzone.
       *
       * @default "Click to upload or drag & drop files."
       */
      title?: string;
      /**
       * The text to display as the subtext of the dropzone.
       *
       * @default "All file types accepted"
       */
      subtext?: string;
      /**
       * The icon to display in the dropzone.
       *
       * @default "lucide:cloud-upload"
       */
      icon?: string;
      /**
       * The function to call when files are dropped.
       */
      // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
      onDrop?: Function;
      /**
       * Whether or not to allow multiple files to be picked. Does not affect drag and drop.
       *
       * @default true
       */
      multiple?: boolean;
      /**
       * The file types to accept. Does not affect drag and drop.
       *
       * @default "*"
       */
      accept?: string;
      /**
       * Any additional class that should be added to the dropzone.
       */
      class?: HTMLAttributes["class"];
    }>(),
    {
      title: "Click to upload or drag & drop files.",
      subtext: "All file types accepted",
      icon: "lucide:cloud-upload",
      multiple: true,
      accept: "*",
    }
  );

  const { open, reset, onChange } = useFileDialog({
    multiple: props.multiple,
    accept: props.accept,
  });

  onChange((files: FileList | null) => {
    if (files?.length) {
      handleDrop(Array.from(files || []));
      reset();
    }
  });

  const dropZoneRef = useTemplateRef("dropZoneRef");
  const emits = defineEmits<{
    dropped: [any];
  }>();

  const handleDrop = (files: File[] | null) => {
    if (!files) return;
    if (props.onDrop) props.onDrop(files);
    emits("dropped", files);
  };

  const { isOverDropZone } = useDropZone(dropZoneRef, handleDrop);

  const styles = tv({
    base: "flex w-full cursor-pointer items-center justify-center rounded-md border border-dashed transition hover:border-primary",
    variants: {
      isOverDropZone: { true: "border-primary bg-primary/10" },
    },
  });

  defineExpose({ dropZoneRef });
</script>
