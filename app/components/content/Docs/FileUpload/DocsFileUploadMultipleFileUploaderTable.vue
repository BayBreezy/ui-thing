<template>
  <Motion
    :variants="lvl1Variants"
    initial="hidden"
    while-in-view="visible"
    exit="exit"
    :in-view-options="{ once: true }"
    class="mx-auto flex max-w-md flex-col gap-2"
  >
    <!-- Drop area -->
    <AnimatePresence mode="wait">
      <Motion
        v-if="files.length > 0"
        :variants="lvl2Variants"
        initial="hidden"
        animate="visible"
        class="flex flex-col gap-2"
      >
        <!-- Table header with actions -->
        <div class="flex items-center justify-between gap-2">
          <h3 class="text-sm font-medium">Files ({{ files.length }})</h3>
          <div class="flex gap-2">
            <UiButton size="sm" variant="outline" @click="openFileDialog">
              <Icon name="lucide:file-up" class="-ms-0.5 size-3.5 opacity-60" aria-hidden="true" />
              Add files
            </UiButton>
            <UiButton size="sm" variant="outline" @click="clearFiles">
              <Icon name="lucide:trash-2" class="-ms-0.5 size-3.5 opacity-60" aria-hidden="true" />
              Remove all
            </UiButton>
          </div>
        </div>

        <!-- Table -->
        <div class="bg-background overflow-hidden rounded-md border">
          <UiTable class="w-full">
            <UiTableHeader class="text-xs">
              <UiTableRow class="bg-muted/50">
                <UiTableHead class="h-9 py-2 text-left">Name</UiTableHead>
                <UiTableHead class="h-9 py-2 text-left">Type</UiTableHead>
                <UiTableHead class="h-9 py-2 text-left">Size</UiTableHead>
                <UiTableHead class="h-9 w-0 py-2 text-right">Actions</UiTableHead>
              </UiTableRow>
            </UiTableHeader>
            <UiTableBody class="text-[13px]">
              <UiTableRow v-for="file in files" :key="file.id">
                <UiTableCell class="max-w-48 py-2 font-medium">
                  <span class="flex items-center gap-2">
                    <span class="shrink-0">
                      <component :is="getFileIcon(file)" class="size-4 opacity-60" />
                    </span>
                    <span class="truncate">{{ file.file.name }}</span>
                  </span>
                </UiTableCell>
                <UiTableCell class="text-muted-foreground py-2">
                  {{ file.file.type.split("/")[1]?.toUpperCase() || "UNKNOWN" }}
                </UiTableCell>
                <UiTableCell class="text-muted-foreground py-2">
                  {{ formatBytes(file.file.size) }}
                </UiTableCell>
                <UiTableCell class="py-2 text-right whitespace-nowrap">
                  <UiButton
                    size="icon"
                    variant="ghost"
                    class="text-muted-foreground/80 hover:text-foreground size-8 hover:bg-transparent"
                    aria-label="Download file"
                  >
                    <Icon name="lucide:download" class="size-4" />
                  </UiButton>
                  <UiButton
                    size="icon"
                    variant="ghost"
                    class="text-muted-foreground/80 hover:text-foreground size-8 hover:bg-transparent"
                    aria-label="Remove file"
                    @click="removeFile(file.id)"
                  >
                    <Icon name="lucide:trash-2" class="size-4" />
                  </UiButton>
                </UiTableCell>
              </UiTableRow>
            </UiTableBody>
          </UiTable>
        </div>
      </Motion>

      <Motion v-else :variants="lvl2Variants" initial="hidden" animate="visible">
        <div
          ref="dropzoneRef"
          :data-files="files.length > 0 || undefined"
          class="border-input has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 data-[dragging=true]:bg-accent/50 flex min-h-56 flex-col items-center rounded-xl border border-dashed p-4 transition-colors not-data-[files]:justify-center has-[input:focus]:ring-[3px] data-[files]:hidden"
        >
          <div class="flex flex-col items-center justify-center text-center">
            <Motion
              :variants="lvl2EmptyItemVariants"
              class="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
              aria-hidden="true"
            >
              <Icon name="lucide:file" class="size-4 opacity-60" />
            </Motion>
            <Motion as="p" :variants="lvl2EmptyItemVariants" class="mb-1.5 text-sm font-medium"
              >Upload files</Motion
            >
            <Motion as="p" :variants="lvl2EmptyItemVariants" class="text-muted-foreground text-xs">
              Max {{ maxFiles }} files ∙ Up to {{ formatBytes(maxSize) }}
            </Motion>
            <Motion :variants="lvl2EmptyItemVariants">
              <UiButton size="sm" variant="outline" class="mt-4" @click="openFileDialog">
                <Icon name="lucide:file-up" class="-ms-1 opacity-60" aria-hidden="true" />
                Select files
              </UiButton>
            </Motion>
          </div>
        </div>
      </Motion>
    </AnimatePresence>

    <Motion
      v-if="errors.length > 0"
      :variants="lvl2Variants"
      initial="hidden"
      animate="visible"
      class="text-destructive flex items-center gap-1 text-xs"
      role="alert"
    >
      <Icon name="lucide:circle-alert" class="size-3 shrink-0" />
      <span>{{ errors[0] }}</span>
    </Motion>

    <Motion
      :variants="lvl2Variants"
      as="p"
      aria-live="polite"
      role="region"
      class="text-muted-foreground mt-2 text-center text-xs"
    >
      Multiple files uploader w/ table
    </Motion>

    <input ref="inputRef" hidden aria-label="Upload files" />
  </Motion>
</template>

<script lang="ts" setup>
  import { stagger } from "motion-v";
  import type { MotionProps } from "motion-v";

  const initialFiles = [
    {
      name: "document.pdf",
      size: 528737,
      type: "application/pdf",
      url: "https://example.com/document.pdf",
      id: useId(),
    },
    {
      name: "intro.zip",
      size: 252873,
      type: "application/zip",
      url: "https://example.com/intro.zip",
      id: useId(),
    },
    {
      name: "conclusion.xlsx",
      size: 352873,
      type: "application/xlsx",
      url: "https://example.com/conclusion.xlsx",
      id: useId(),
    },
  ];
  const getFileIcon = (file: { file: File | { type: string; name: string } }) => {
    const fileType = file.file instanceof File ? file.file.type : file.file.type;
    const fileName = file.file instanceof File ? file.file.name : file.file.name;

    if (
      fileType.includes("pdf") ||
      fileName.endsWith(".pdf") ||
      fileType.includes("word") ||
      fileName.endsWith(".doc") ||
      fileName.endsWith(".docx")
    ) {
      return "lucide:file-text";
    } else if (
      fileType.includes("zip") ||
      fileType.includes("archive") ||
      fileName.endsWith(".zip") ||
      fileName.endsWith(".rar")
    ) {
      return "lucide:file-archive";
    } else if (
      fileType.includes("excel") ||
      fileName.endsWith(".xls") ||
      fileName.endsWith(".xlsx")
    ) {
      return "lucide:file-spreadsheet";
    } else if (fileType.includes("video/")) {
      return "lucide:video";
    } else if (fileType.includes("audio/")) {
      return "lucide:headphones";
    } else if (fileType.startsWith("image/")) {
      return "lucide:image";
    }
    return "lucide:file";
  };

  const maxSize = 7 * 1024 * 1024; // 10MB default
  const maxFiles = 7;

  const { files, errors, openFileDialog, removeFile, clearFiles, dropzoneRef, inputRef } =
    useFileUpload({
      multiple: true,
      maxFiles,
      maxSize,
      initialFiles,
    });

  const lvl1Variants: MotionProps["variants"] = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delayChildren: stagger(0.2), when: "beforeChildren" },
    },
  };

  const lvl2Variants: MotionProps["variants"] = {
    hidden: { opacity: 0, y: 5, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { staggerChildren: 0.1, when: "beforeChildren" },
    },
    exit: { opacity: 0, y: 5, scale: 0.95, transition: { duration: 0.2 } },
  };

  const lvl2EmptyItemVariants: MotionProps["variants"] = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };
</script>
