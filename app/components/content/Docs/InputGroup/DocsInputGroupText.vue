<template>
  <div class="mx-auto grid w-full max-w-sm gap-6">
    <UiInputGroup>
      <UiInputGroupAddon>
        <UiInputGroupText>$</UiInputGroupText>
      </UiInputGroupAddon>
      <UiInputGroupInput placeholder="0.00" />
      <UiInputGroupAddon align="inline-end">
        <UiInputGroupText>USD</UiInputGroupText>
      </UiInputGroupAddon>
    </UiInputGroup>
    <UiInputGroup>
      <UiInputGroupAddon>
        <UiInputGroupText>https://</UiInputGroupText>
      </UiInputGroupAddon>
      <UiInputGroupInput placeholder="example.com" class="!pl-0.5" />
      <UiInputGroupAddon align="inline-end">
        <UiInputGroupText>.com</UiInputGroupText>
      </UiInputGroupAddon>
    </UiInputGroup>
    <UiInputGroup>
      <UiInputGroupInput placeholder="Enter your username" />
      <UiInputGroupAddon align="inline-end">
        <UiInputGroupText>@company.com</UiInputGroupText>
      </UiInputGroupAddon>
    </UiInputGroup>
    <UiInputGroup>
      <UiInputGroupTextarea placeholder="Enter your message" />
      <UiInputGroupAddon align="block-end">
        <UiInputGroupText class="text-muted-foreground text-xs">
          120 characters left
        </UiInputGroupText>
      </UiInputGroupAddon>
    </UiInputGroup>
  </div>
</template>
