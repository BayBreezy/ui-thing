<template>
  <div class="mx-auto grid gap-8 py-1 md:grid-cols-2 xl:grid-cols-4 xl:gap-6 2xl:gap-8">
    <div class="flex flex-col gap-6 *:w-full *:max-w-full">
      <DocsFieldBasic />
      <DocsButtonGroup />
    </div>
    <div class="flex flex-col gap-6 *:[div]:w-full *:[div]:max-w-full">
      <DocsEmptyAvatarGroup class="rounded-lg border border-dashed **:data-[slot=empty]:py-6" />
      <div class="flex items-center gap-2 *:rounded-full">
        <UiBadge>
          <UiLoader icon="svg-spinners:270-ring-with-bg" class="size-3" />
          Syncing
        </UiBadge>
        <UiBadge variant="secondary">
          <UiLoader class="size-3" />
          Updating
        </UiBadge>
        <UiBadge variant="outline">
          <UiLoader icon="svg-spinners:blocks-shuffle-2" class="size-3" />
          Loading
        </UiBadge>
      </div>
      <DocsButtonGroupInputGroup
        class="justify-start! [&>div]:w-full [&>div>div:nth-child(2)]:w-full"
      />
      <DocsFieldSlider />
      <DocsInputGroup />
    </div>
    <div class="flex flex-col gap-6 *:[div]:w-full *:[div]:max-w-full">
      <DocsInputGroupButton />
      <DocsItem />
      <UiFieldSeparator class="my-4">Appearance Settings</UiFieldSeparator>
      <DocsFieldChoiceCard />
    </div>
    <div class="flex flex-col gap-6 *:[div]:w-full *:[div]:max-w-full">
      <DocsFieldNotionPrompt />
      <DocsFieldCheckbox />
      <DocsButtonGroupNested class="justify-start" />
      <DocsButtonGroupPopover class="justify-start" />
      <DocsFieldHear class="max-w-full" />
    </div>
  </div>
</template>
