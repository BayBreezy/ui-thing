<template>
  <!--
    Chat thread with images and file attachments
    Features: Image attachments with captions, file cards with type icon and size, an upload in progress with a cancel action, attachment group layout and a composer with an attach button
  -->
  <UiContainer class="py-12 lg:py-20">
    <UiCard class="mx-auto h-[44rem] w-full max-w-lg gap-0 py-0">
      <UiCardHeader class="border-b py-3">
        <UiCardTitle class="text-base">Project files</UiCardTitle>
        <UiCardDescription>Shared with Sofia and Liam</UiCardDescription>
      </UiCardHeader>

      <UiCardContent class="min-h-0 flex-1 overflow-hidden p-0">
        <UiMessageScrollerProvider>
          <UiMessageScroller>
            <UiMessageScrollerViewport>
              <UiMessageScrollerContent class="gap-5 p-4">
                <UiMessageScrollerItem message-id="a1">
                  <UiMessage>
                    <UiMessageAvatar
                      ><UiAvatar src="https://i.pravatar.cc/80?img=32" fallback="S"
                    /></UiMessageAvatar>
                    <UiMessageContent>
                      <UiBubble variant="muted">
                        <UiBubbleContent>Here are the three directions I explored.</UiBubbleContent>
                      </UiBubble>
                      <UiAttachmentGroup>
                        <UiAttachment
                          v-for="image in images"
                          :key="image.name"
                          orientation="vertical"
                        >
                          <UiAttachmentMedia variant="image">
                            <img :src="image.src" :alt="image.alt" />
                          </UiAttachmentMedia>
                          <UiAttachmentContent>
                            <UiAttachmentTitle>{{ image.name }}</UiAttachmentTitle>
                            <UiAttachmentDescription>{{ image.meta }}</UiAttachmentDescription>
                          </UiAttachmentContent>
                        </UiAttachment>
                      </UiAttachmentGroup>
                    </UiMessageContent>
                  </UiMessage>
                </UiMessageScrollerItem>

                <UiMessageScrollerItem message-id="a2">
                  <UiMessage align="end">
                    <UiMessageContent>
                      <UiBubble>
                        <UiBubbleContent
                          >Love the second one. Sending the brief now.</UiBubbleContent
                        >
                      </UiBubble>
                      <UiAttachment v-for="file in files" :key="file.name" class="w-full">
                        <UiAttachmentMedia><Icon :name="file.icon" /></UiAttachmentMedia>
                        <UiAttachmentContent>
                          <UiAttachmentTitle>{{ file.name }}</UiAttachmentTitle>
                          <UiAttachmentDescription>{{ file.meta }}</UiAttachmentDescription>
                        </UiAttachmentContent>
                        <UiAttachmentActions>
                          <UiAttachmentAction
                            :aria-label="`Download ${file.name}`"
                            @click="useSonner.success(`Downloading ${file.name}`)"
                          >
                            <Icon name="lucide:download" />
                          </UiAttachmentAction>
                        </UiAttachmentActions>
                      </UiAttachment>
                      <UiAttachment v-if="uploading" state="uploading" class="w-full">
                        <UiAttachmentMedia>
                          <Icon name="lucide:loader-circle" class="animate-spin" />
                        </UiAttachmentMedia>
                        <UiAttachmentContent>
                          <UiAttachmentTitle>brand-guidelines.pdf</UiAttachmentTitle>
                          <UiAttachmentDescription
                            >Uploading · {{ progress }}%</UiAttachmentDescription
                          >
                        </UiAttachmentContent>
                        <UiAttachmentActions>
                          <UiAttachmentAction aria-label="Cancel upload" @click="cancel">
                            <Icon name="lucide:x" />
                          </UiAttachmentAction>
                        </UiAttachmentActions>
                      </UiAttachment>
                    </UiMessageContent>
                  </UiMessage>
                </UiMessageScrollerItem>
              </UiMessageScrollerContent>
            </UiMessageScrollerViewport>
          </UiMessageScroller>
        </UiMessageScrollerProvider>
      </UiCardContent>

      <UiCardFooter class="border-t py-3">
        <div class="flex w-full items-center gap-2">
          <UiButton
            variant="outline"
            size="icon"
            aria-label="Attach a file"
            :disabled="uploading"
            @click="upload"
          >
            <Icon name="lucide:paperclip" class="size-4" />
          </UiButton>
          <UiLabel for="thread3-input" class="sr-only">Message</UiLabel>
          <UiInput id="thread3-input" placeholder="Write a message" />
        </div>
      </UiCardFooter>
    </UiCard>
  </UiContainer>
</template>

<script lang="ts" setup>
  withDefaults(
    defineProps<{
      images?: { name: string; meta: string; alt: string; src: string }[];
      files?: { name: string; meta: string; icon: string }[];
    }>(),
    {
      images: () => [
        {
          name: "direction-a.jpg",
          meta: "JPG · 1.2 MB",
          alt: "Warm toned interior",
          src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=300&q=80",
        },
        {
          name: "direction-b.jpg",
          meta: "JPG · 980 KB",
          alt: "Minimal desk setup",
          src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=300&q=80",
        },
      ],
      files: () => [
        { name: "project-brief.pdf", meta: "PDF · 2.4 MB", icon: "lucide:file-text" },
        { name: "budget.xlsx", meta: "Spreadsheet · 86 KB", icon: "lucide:file-spreadsheet" },
      ],
    }
  );

  const uploading = ref(false);
  const progress = ref(0);
  let timer: ReturnType<typeof setInterval> | undefined;

  function upload() {
    uploading.value = true;
    progress.value = 0;
    timer = setInterval(() => {
      progress.value = Math.min(progress.value + 12, 100);
      if (progress.value >= 100) {
        clearInterval(timer);
        uploading.value = false;
        useSonner.success("Upload complete");
      }
    }, 250);
  }

  function cancel() {
    clearInterval(timer);
    uploading.value = false;
  }

  onBeforeUnmount(() => clearInterval(timer));
</script>
