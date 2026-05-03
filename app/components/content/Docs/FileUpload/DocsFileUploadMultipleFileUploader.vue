<template>
  <LayoutGroup>
    <Motion
      layout="position"
      :variants="parentVariants"
      while-in-view="visible"
      initial="hidden"
      exit="exit"
      :in-view-options="{ once: true }"
      class="mx-auto flex max-w-md flex-col gap-2"
    >
      <!-- Drop area -->
      <Motion layout="position" as-child :variants="dropAreaContainer">
        <div
          ref="dropzoneRef"
          role="button"
          class="border-input hover:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 data-[dragging=true]:bg-accent/50 flex min-h-40 flex-col items-center justify-center rounded-xl border border-dashed p-4 transition-colors has-disabled:pointer-events-none has-disabled:opacity-50 has-[input:focus]:ring-[3px]"
          @click="openFileDialog"
        >
          <input ref="inputRef" hidden aria-label="Upload files" />

          <div class="flex flex-col items-center justify-center text-center">
            <Motion
              :variants="dropAreaItem"
              class="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
              aria-hidden="true"
            >
              <Icon name="lucide:file-up" class="size-4 opacity-60" />
            </Motion>
            <Motion :variants="dropAreaItem" as="p" class="mb-1.5 text-sm font-medium"
              >Upload files</Motion
            >
            <Motion :variants="dropAreaItem" as="p" class="text-muted-foreground mb-2 text-xs"
              >Drag & drop or click to browse</Motion
            >
            <Motion
              :variants="dropAreaItem"
              class="text-muted-foreground/70 flex flex-wrap justify-center gap-1 text-xs"
            >
              <span>All files</span>
              <span>∙</span>
              <span>Max {{ maxFiles }} files</span>
              <span>∙</span>
              <span>Up to {{ formatBytes(maxSize) }}</span>
            </Motion>
          </div>
        </div>
      </Motion>

      <div
        v-if="errors.length > 0"
        class="text-destructive flex items-center gap-1 text-xs"
        role="alert"
      >
        <Icon name="lucide:circle-alert" class="size-3 shrink-0" />
        <span>{{ errors[0] }}</span>
      </div>

      <!-- File list -->
      <LayoutGroup id="file-list">
        <AnimatePresence>
          <Motion
            v-if="files.length > 0"
            layout="position"
            :variants="fileListContainer"
            initial="hidden"
            animate="visible"
            class="space-y-2"
          >
            <AnimatePresence>
              <Motion
                v-for="file in files"
                :key="file.id"
                layout="position"
                :variants="fileListItem"
                class="bg-background flex items-center justify-between gap-2 rounded-lg border p-2 pe-3"
              >
                <div class="flex items-center gap-3 overflow-hidden">
                  <div
                    class="flex aspect-square size-10 shrink-0 items-center justify-center rounded border"
                  >
                    <Icon :name="getFileIcon(file)" class="size-4 opacity-60" />
                  </div>
                  <div class="flex min-w-0 flex-col gap-0.5">
                    <p class="truncate text-[13px] font-medium">
                      {{ file.file.name }}
                    </p>
                    <p class="text-muted-foreground text-xs">
                      {{ formatBytes(file.file.size) }}
                    </p>
                  </div>
                </div>

                <UiButton
                  size="icon"
                  variant="ghost"
                  class="text-muted-foreground/80 hover:text-foreground -me-2 size-8 hover:bg-transparent"
                  aria-label="Remove file"
                  @click="removeFile(file.id)"
                >
                  <Icon name="lucide:x" class="size-4" aria-hidden="true" />
                </UiButton>
              </Motion>
            </AnimatePresence>

            <!-- Remove all files button -->
            <AnimatePresence>
              <Motion v-if="files.length > 1" layout="position" :variants="fileListItem">
                <UiButton size="sm" variant="outline" @click="clearFiles">
                  Remove all files
                </UiButton>
              </Motion>
            </AnimatePresence>
          </Motion>
        </AnimatePresence>
      </LayoutGroup>

      <Motion
        as="p"
        layout="position"
        :variants="dropAreaItem"
        aria-live="polite"
        role="region"
        class="text-muted-foreground mt-2 text-center text-xs"
      >
        Multiple files uploader w/ list
      </Motion>
    </Motion>
  </LayoutGroup>
</template>

<script lang="ts" setup>
  import type { MotionProps } from "motion-v";

  const initialFiles = [
    {
      name: "document.pdf",
      size: 528737,
      type: "application/pdf",
      url: "https://example.com/document.pdf",
      id: "document.pdf-1744638436563-8u5xuls",
    },
    {
      name: "intro.zip",
      size: 252873,
      type: "application/zip",
      url: "https://example.com/intro.zip",
      id: "intro.zip-1744638436563-8u5xuls",
    },
    {
      name: "conclusion.xlsx",
      size: 352873,
      type: "application/xlsx",
      url: "https://example.com/conclusion.xlsx",
      id: "conclusion.xlsx-1744638436563-8u5xuls",
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

  const maxSize = 100 * 1024 * 1024; // 100MB default
  const maxFiles = 10;

  const { files, errors, openFileDialog, removeFile, clearFiles, dropzoneRef, inputRef } =
    useFileUpload({
      multiple: true,
      maxFiles,
      maxSize,
      initialFiles,
    });

  const parentVariants: MotionProps["variants"] = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.4, when: "beforeChildren" },
    },
  };

  const dropAreaContainer: MotionProps["variants"] = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.2, when: "beforeChildren" },
    },
  };

  const dropAreaItem: MotionProps["variants"] = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const fileListContainer: MotionProps["variants"] = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1, when: "beforeChildren" },
    },
  };

  const fileListItem: MotionProps["variants"] = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
    exit: { opacity: 0, y: 5, transition: { duration: 0.2, ease: "easeInOut" } },
  };
</script>
