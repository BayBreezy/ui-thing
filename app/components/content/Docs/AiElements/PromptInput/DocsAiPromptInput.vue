<template>
  <div class="mx-auto w-full max-w-lg py-6">
    <form ref="formRef" @submit.prevent="onSubmit">
      <UiInputGroup>
        <UiInputGroupAddon v-if="files.length > 0" align="block-start" class="flex-wrap">
          <UiAttachment v-for="file in files" :key="file.id" size="sm">
            <UiAttachmentMedia>
              <Icon name="lucide:file-text" class="size-4" />
            </UiAttachmentMedia>
            <UiAttachmentContent>
              <UiAttachmentTitle>{{ file.name }}</UiAttachmentTitle>
            </UiAttachmentContent>
            <UiAttachmentActions>
              <UiAttachmentAction :aria-label="`Remove ${file.name}`" @click="removeFile(file.id)">
                <Icon name="lucide:x" class="size-4" />
              </UiAttachmentAction>
            </UiAttachmentActions>
          </UiAttachment>
        </UiInputGroupAddon>
        <UiInputGroupTextarea
          v-model="text"
          placeholder="Ask the agent to change your code..."
          class="p-3"
          @keydown="onKeydown"
        />
        <UiInputGroupAddon align="block-end">
          <UiInputGroupButton
            size="icon-sm"
            variant="outline"
            class="rounded-full"
            aria-label="Attach files"
            @click="fileDialog.open()"
          >
            <Icon name="lucide:plus" class="size-4" />
          </UiInputGroupButton>
          <UiDropdownMenu>
            <UiDropdownMenuTrigger as-child>
              <UiInputGroupButton
                size="sm"
                variant="outline"
                :aria-label="`Model: ${currentModel.name}`"
                class="ml-auto"
              >
                {{ currentModel.name }}
                <Icon name="lucide:chevron-down" class="size-4" />
              </UiInputGroupButton>
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent align="start" class="w-48">
              <UiDropdownMenuRadioGroup v-model="model">
                <template v-for="(provider, index) in providers" :key="provider.name">
                  <UiDropdownMenuSeparator v-if="index > 0" />
                  <UiDropdownMenuGroup>
                    <UiDropdownMenuLabel>{{ provider.name }}</UiDropdownMenuLabel>
                    <UiDropdownMenuRadioItem
                      v-for="item in provider.models"
                      :key="item.id"
                      :value="item.id"
                    >
                      {{ item.name }}
                    </UiDropdownMenuRadioItem>
                  </UiDropdownMenuGroup>
                </template>
              </UiDropdownMenuRadioGroup>
            </UiDropdownMenuContent>
          </UiDropdownMenu>
          <UiDropdownMenu>
            <UiDropdownMenuTrigger as-child>
              <UiInputGroupButton
                size="sm"
                variant="outline"
                :aria-label="`Effort: ${currentEffort.name}`"
              >
                <span class="text-muted-foreground">Effort</span>
                {{ currentEffort.name }}
                <Icon name="lucide:chevron-down" class="size-4" />
              </UiInputGroupButton>
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent align="start" class="w-36">
              <UiDropdownMenuGroup>
                <UiDropdownMenuLabel>Effort</UiDropdownMenuLabel>
                <UiDropdownMenuRadioGroup v-model="effort">
                  <UiDropdownMenuRadioItem v-for="item in efforts" :key="item.id" :value="item.id">
                    {{ item.name }}
                  </UiDropdownMenuRadioItem>
                </UiDropdownMenuRadioGroup>
              </UiDropdownMenuGroup>
            </UiDropdownMenuContent>
          </UiDropdownMenu>
          <UiInputGroupButton
            type="submit"
            size="icon-sm"
            variant="default"
            class="rounded-full"
            :disabled="!canSend"
            aria-label="Send"
          >
            <Icon name="lucide:arrow-up" class="size-4" />
          </UiInputGroupButton>
        </UiInputGroupAddon>
      </UiInputGroup>
    </form>
  </div>
</template>

<script lang="ts" setup>
  interface AttachmentFile {
    id: string;
    name: string;
  }

  const providers = [
    {
      name: "OpenAI",
      models: [
        { id: "gpt-5", name: "GPT-5" },
        { id: "gpt-5-mini", name: "GPT-5 mini" },
      ],
    },
    {
      name: "Anthropic",
      models: [
        { id: "claude-sonnet-4-5", name: "Claude Sonnet 4.5" },
        { id: "claude-haiku-4-5", name: "Claude Haiku 4.5" },
      ],
    },
  ];

  const models = providers.flatMap((provider) => provider.models);

  const efforts = [
    { id: "low", name: "Low" },
    { id: "medium", name: "Medium" },
    { id: "high", name: "High" },
  ];

  const text = ref("");
  const files = ref<AttachmentFile[]>([]);
  const model = ref(models[0]!.id);
  const effort = ref(efforts[1]!.id);
  const formRef = ref<HTMLFormElement | null>(null);
  const currentModel = computed(() => models.find((item) => item.id === model.value) ?? models[0]!);
  const currentEffort = computed(
    () => efforts.find((item) => item.id === effort.value) ?? efforts[1]!
  );
  const canSend = computed(() => text.value.trim().length > 0);

  function onSubmit() {
    if (!canSend.value) return;

    text.value = "";
    files.value = [];
  }

  // `reset` clears the dialog's input on open, so the same file can be picked again.
  const fileDialog = useFileDialog({ multiple: true, reset: true });

  fileDialog.onChange((selected) => {
    if (!selected) return;

    files.value = [
      ...files.value,
      ...Array.from(selected, (file) => ({
        id: crypto.randomUUID(),
        name: file.name,
      })),
    ];
  });

  function removeFile(id: string) {
    files.value = files.value.filter((item) => item.id !== id);
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      formRef.value?.requestSubmit();
    }
  }
</script>
