<template>
  <div>
    <!-- Reusable User Menu -->
    <DefineUserMenu>
      <UiDropdownMenu>
        <UiDropdownMenuTrigger as-child>
          <UiButton variant="ghost" size="icon-sm">
            <UiAvatar>
              <UiAvatarImage src="https://behonbaker.com/icon.png" alt="Behon Baker" />
              <UiAvatarFallback>BB</UiAvatarFallback>
            </UiAvatar>
          </UiButton>
        </UiDropdownMenuTrigger>
        <UiDropdownMenuContent class="w-52" align="end">
          <UiDropdownMenuLabel class="flex font-normal">
            <div class="flex flex-col space-y-1">
              <p class="text-sm leading-none font-medium">Behon Baker</p>
              <p class="text-muted-foreground text-xs leading-none">behon.baker.com</p>
            </div>
          </UiDropdownMenuLabel>
          <UiDropdownMenuSeparator />
          <UiDropdownMenuGroup>
            <UiDropdownMenuItem title="Profile" shortcut="⇧⌘P" />
            <UiDropdownMenuItem title="Billing" shortcut="⌘B" />
            <UiDropdownMenuItem title="Settings" shortcut="⌘S" />
            <UiDropdownMenuItem title="New Team" />
          </UiDropdownMenuGroup>
          <UiDropdownMenuSeparator />
          <UiDropdownMenuItem title="Help" shortcut="?" />
          <UiDropdownMenuItem title="Keyboard Shortcuts" shortcut="⇧?" />
          <UiDropdownMenuSeparator />
          <UiDropdownMenuItem title="Log out" shortcut="⇧⌘Q" variant="destructive" />
        </UiDropdownMenuContent>
      </UiDropdownMenu>
    </DefineUserMenu>
    <UiNavProvider>
      <UiNav intent="float">
        <UiNavStart>
          <NuxtLink
            class="flex items-center gap-x-2 text-base font-black"
            aria-label="Goto documentation of Nav"
            to="/components/nav"
          >
            <NuxtImg src="/icon.png" class="size-6 rounded sm:size-5" />
            <span> UI Thing </span>
          </NuxtLink>
        </UiNavStart>
        <UiNavGap />
        <UiNavSection>
          <UiNavItem :to="route.path">Home</UiNavItem>
          <UiNavItem class="@max-[768px]/nav-provider:hidden" href="#">Shop</UiNavItem>
          <UiNavItem class="@max-[768px]/nav-provider:hidden" href="#">Offers</UiNavItem>
          <UiNavItem href="#">Orders</UiNavItem>
        </UiNavSection>
        <UiNavSpacer />
        <UiNavSection class="max-md:hidden">
          <UiButton variant="ghost" size="icon-sm" aria-label="Search for products">
            <Icon name="lucide:search" />
          </UiButton>
          <UiButton variant="ghost" size="icon-sm" aria-label="Your Bag">
            <Icon name="lucide:shopping-bag" />
          </UiButton>
          <UiNavSeparator class="mr-2.5" />
          <UserMenu />
        </UiNavSection>
      </UiNav>
      <UiNavMobile>
        <UiNavTrigger />
        <UiNavSpacer />
        <UiButton variant="ghost" size="icon-sm" aria-label="Search for products">
          <Icon name="lucide:search" />
        </UiButton>
        <UiButton variant="ghost" size="icon-sm" aria-label="Your Bag">
          <Icon name="lucide:shopping-bag" />
        </UiButton>
        <UiNavSeparator class="mr-2.5" />
        <UserMenu />
      </UiNavMobile>
    </UiNavProvider>

    <UiContainer class="py-6 sm:py-12">
      <UiHeading>Floating Nav</UiHeading>
    </UiContainer>
  </div>
</template>

<script lang="ts" setup>
  const route = useRoute();
  const [DefineUserMenu, UserMenu] = createReusableTemplate();
</script>
