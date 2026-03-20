<template>
  <LayoutGroup>
    <Motion
      layout="position"
      :variants="parentVariants"
      initial="hidden"
      while-in-view="visible"
      exit="exit"
      class="mx-auto flex max-w-md flex-col gap-2"
    >
      <!-- Drop area -->
      <Motion as-child layout="position" :variants="dropZoneContainer">
        <div
          ref="dropzoneRef"
          :data-files="files.length > 0 || undefined"
          class="flex min-h-56 flex-col items-center rounded-xl border border-dashed border-input p-4 transition-colors not-data-[files]:justify-center has-[input:focus]:border-ring has-[input:focus]:ring-[3px] has-[input:focus]:ring-ring/50 data-[dragging=true]:bg-accent/50"
        >
          <input ref="inputRef" hidden aria-label="Upload files" />

          <AnimatePresence mode="wait">
            <Motion
              v-if="files.length > 0"
              key="file-list"
              :variants="fileListContainer"
              layout="position"
              class="flex w-full flex-col gap-3"
            >
              <div class="flex items-center justify-between gap-2">
                <Motion as="h3" :variants="fileListItem" class="truncate text-sm font-medium"
                  >Uploaded Files ({{ files.length }})</Motion
                >
                <Motion :variants="fileListItem">
                  <UiButton size="sm" variant="outline" @click="clearFiles">
                    <Icon
                      name="lucide:trash-2"
                      class="-ms-0.5 size-3.5 opacity-60"
                      aria-hidden="true"
                    />
                    Remove all
                  </UiButton>
                </Motion>
              </div>
              <Motion :variants="fileListItem" class="w-full space-y-2">
                <AnimatePresence>
                  <Motion
                    v-for="file in files"
                    :key="file.id"
                    layout="position"
                    :variants="fileListItemChild"
                    class="flex items-center justify-between gap-2 rounded-lg border bg-background p-2 pe-3"
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
                        <p class="text-xs text-muted-foreground">
                          {{ formatBytes(file.file.size) }}
                        </p>
                      </div>
                    </div>

                    <UiButton
                      size="icon"
                      variant="ghost"
                      class="-me-2 size-8 text-muted-foreground/80 hover:bg-transparent hover:text-foreground"
                      aria-label="Remove file"
                      @click="removeFile(file.id)"
                    >
                      <Icon name="lucide:x" class="size-4" aria-hidden="true" />
                    </UiButton>
                  </Motion>
                </AnimatePresence>

                <UiButton
                  v-if="files.length < maxFiles"
                  size="sm"
                  variant="outline"
                  @click="openFileDialog"
                >
                  <Icon name="lucide:file-up" class="-ms-1 opacity-60" aria-hidden="true" />
                  Add more
                </UiButton>
              </Motion>
            </Motion>

            <Motion
              v-else
              key="empty-state"
              layout="position"
              :variants="emptyContainer"
              class="flex flex-col items-center justify-center text-center"
            >
              <Motion
                layout="position"
                :variants="emptyItem"
                class="mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border bg-background"
                aria-hidden="true"
              >
                <Icon name="lucide:file" class="size-4 opacity-60" />
              </Motion>
              <Motion as="p" :variants="emptyItem" class="mb-1.5 text-sm font-medium"
                >Upload files</Motion
              >
              <Motion as="p" :variants="emptyItem" class="text-xs text-muted-foreground">
                Max {{ maxFiles }} files ∙ Up to {{ formatBytes(maxSize) }}
              </Motion>
              <Motion :variants="emptyItem">
                <UiButton size="sm" variant="outline" class="mt-4" @click="openFileDialog">
                  <Icon name="lucide:file-up" class="-ms-1 opacity-60" aria-hidden="true" />
                  Select files
                </UiButton>
              </Motion>
            </Motion>
          </AnimatePresence>
        </div>
      </Motion>

      <AnimatePresence>
        <Motion
          v-if="errors.length > 0"
          class="flex items-center gap-1 text-xs text-destructive"
          role="alert"
        >
          <Icon name="lucide:circle-alert" class="size-3 shrink-0" />
          <span>{{ errors[0] }}</span>
        </Motion>
      </AnimatePresence>

      <Motion
        as="p"
        aria-live="polite"
        role="region"
        class="mt-2 text-center text-xs text-muted-foreground"
      >
        Multiple files uploader w/ list inside
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

  const maxSize = 7 * 1024 * 1024; // 10MB default
  const maxFiles = 7;

  const { files, errors, openFileDialog, removeFile, clearFiles, dropzoneRef, inputRef } =
    useFileUpload({
      multiple: true,
      maxFiles,
      maxSize,
      initialFiles,
    });

  const parentVariants: MotionProps["variants"] = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { staggerChildren: 0.2, when: "beforeChildren" },
    },
  };

  const dropZoneContainer: MotionProps["variants"] = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { staggerChildren: 0.1, when: "beforeChildren" },
    },
  };

  const emptyContainer: MotionProps["variants"] = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, when: "beforeChildren" },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.15,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1, // Reverse stagger for exit
      },
    },
  };

  const emptyItem: MotionProps["variants"] = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
    exit: {
      opacity: 0,
      y: -10, // Exit upward (opposite of enter)
      transition: {
        duration: 0.15,
        ease: "easeInOut",
      },
    },
  };

  const fileListContainer: MotionProps["variants"] = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        staggerChildren: 0.1,
        delayChildren: 0.1, // Small delay to let empty state exit first
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
        staggerChildren: 0.05,
        when: "afterChildren",
      },
    },
  };

  const fileListItem: MotionProps["variants"] = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 15 },
    },
    // Add exit animation that matches hidden state
    exit: {
      opacity: 0,
      y: 10,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
        when: "afterChildren",
      },
    },
  };
  const fileListItemChild: MotionProps["variants"] = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };
</script>
