<template>
  <div class="grid gap-3">
    <UiHoverCard :open-delay="200">
      <UiHoverCardTrigger as-child>
        <UiLabel for="model">Model</UiLabel>
      </UiHoverCardTrigger>
      <UiHoverCardContent align="start" class="w-[260px] text-sm" side="left">
        The model which will generate the completion. Some models are suitable for natural language
        tasks, others specialize in code. Learn more.
      </UiHoverCardContent>
    </UiHoverCard>
    <UiPopover v-model:open="open">
      <UiPopoverTrigger as-child>
        <UiButton
          variant="outline"
          role="combobox"
          aria-expanded="{open}"
          aria-label="Select a model"
          class="w-full justify-between"
        >
          {{ selectedModel ? selectedModel.name : "Select a model..." }}
          <Icon name="lucide:chevrons-up-down" class="text-muted-foreground" />
        </UiButton>
      </UiPopoverTrigger>
      <UiPopoverContent align="end" class="w-[250px] p-0">
        <UiHoverCard>
          <HoverCardContent
            v-if="open"
            side="left"
            align="start"
            :side-offset="8"
            force-mount
            class="bg-popover min-h-[200px] w-64 rounded-md border p-4 shadow-sm"
          >
            <div class="grid gap-2">
              <h4 class="leading-none font-medium">{{ peekedModel?.name }}</h4>
              <div class="text-muted-foreground text-sm">
                {{ peekedModel?.description }}
              </div>
              <div v-if="peekedModel?.strengths" class="mt-4 grid gap-2">
                <h5 class="text-sm leading-none font-medium">Strengths</h5>
                <ul class="text-muted-foreground text-sm">
                  {{
                    peekedModel.strengths
                  }}
                </ul>
              </div>
            </div>
          </HoverCardContent>
          <UiCommand v-model="selectedModel" loop>
            <UiCommandList class="h-(--cmdk-list-height) max-h-[400px]">
              <UiCommandInput placeholder="Search Models..." />
              <UiCommandEmpty>No Models found.</UiCommandEmpty>
              <UiHoverCardTrigger />
              <template v-for="type in types" :key="type">
                <UiCommandGroup :heading="type">
                  <template v-for="model in models.filter((m) => m.type === type)" :key="model.id">
                    <UiCommandItem
                      :value="model"
                      class="group"
                      @mouseenter="peekedModel = model"
                      @select="open = false"
                    >
                      {{ model.name }}
                      <Icon
                        name="lucide:check"
                        class="ml-auto opacity-0 group-aria-selected:opacity-100"
                      />
                    </UiCommandItem>
                  </template>
                </UiCommandGroup>
              </template>
            </UiCommandList>
          </UiCommand>
        </UiHoverCard>
      </UiPopoverContent>
    </UiPopover>
  </div>
</template>

<script lang="ts" setup>
  import type { Model } from "../data/models";
  import { models, types } from "../data/models";

  const open = ref(false);
  const selectedModel = ref<Model | undefined>(models[0]);
  const peekedModel = ref<Model | undefined>(models[0]);

  watch(selectedModel, (newModel) => {
    peekedModel.value = newModel;
  });
  watch(open, (isOpen) => {
    if (!isOpen) {
      peekedModel.value = selectedModel.value;
    }
  });
</script>
