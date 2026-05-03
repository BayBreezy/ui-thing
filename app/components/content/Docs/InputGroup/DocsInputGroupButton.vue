<template>
  <div class="mx-auto grid w-full max-w-sm gap-6">
    <UiInputGroup>
      <UiInputGroupInput placeholder="https://behonbaker.com" readonly />
      <UiInputGroupAddon align="inline-end">
        <UiInputGroupButton
          aria-label="Copy"
          :disabled="copied"
          title="Copy"
          size="icon-xs"
          @click="copy('https://behonbaker.com')"
        >
          <Icon :name="copied ? 'lucide:check' : 'lucide:copy'" />
        </UiInputGroupButton>
      </UiInputGroupAddon>
    </UiInputGroup>
    <UiInputGroup class="[--radius:9999px]">
      <UiPopover>
        <UiPopoverTrigger as-child>
          <UiInputGroupAddon>
            <UiInputGroupButton variant="secondary" size="icon-xs">
              <Icon name="lucide:info" />
            </UiInputGroupButton>
          </UiInputGroupAddon>
        </UiPopoverTrigger>
        <UiPopoverContent align="start" class="flex flex-col gap-1 rounded-xl text-sm">
          <p class="font-medium">Your connection is not secure.</p>
          <p>You should not enter any sensitive information on this site.</p>
        </UiPopoverContent>
      </UiPopover>
      <UiInputGroupAddon class="text-muted-foreground pl-1.5"> https:// </UiInputGroupAddon>
      <UiInputGroupInput id="input-secure-19" />
      <UiInputGroupAddon align="inline-end">
        <UiInputGroupButton size="icon-xs" @click="isFavorite = !isFavorite">
          <Icon
            name="lucide:star"
            :data-favorite="isFavorite"
            class="data-[favorite=true]:text-blue-600"
          />
        </UiInputGroupButton>
      </UiInputGroupAddon>
    </UiInputGroup>
    <UiInputGroup>
      <UiInputGroupInput placeholder="Type to search..." />
      <UiInputGroupAddon align="inline-end">
        <UiInputGroupButton variant="secondary">Search</UiInputGroupButton>
      </UiInputGroupAddon>
    </UiInputGroup>
  </div>
</template>

<script lang="ts" setup>
  const { copied, copy } = useClipboard({ legacy: true });
  const isFavorite = ref(false);
</script>
