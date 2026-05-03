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
      <UiNav>
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
          <UiNavItem class="@max-[768px]/nav-provider:hidden" href="#">Orders</UiNavItem>
          <UiDropdownMenu>
            <UiDropdownMenuTrigger as-child>
              <UiNavItem>
                Categories
                <Icon name="lucide:chevron-down" class="col-start-3" />
              </UiNavItem>
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent class="min-w-(--reka-dropdown-menu-trigger-width) sm:min-w-56">
              <UiDropdownMenuGroup>
                <UiDropdownMenuItem
                  v-for="(item, i) in categories"
                  :key="i"
                  :text-value="item.label"
                  as-child
                >
                  <NuxtLink :to="item.url">
                    {{ item.label }}
                  </NuxtLink>
                </UiDropdownMenuItem>
              </UiDropdownMenuGroup>
            </UiDropdownMenuContent>
          </UiDropdownMenu>
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
      <UiHeading>Default Nav</UiHeading>
    </UiContainer>
  </div>
</template>

<script lang="ts" setup>
  const route = useRoute();
  const [DefineUserMenu, UserMenu] = createReusableTemplate();

  const categories = [
    {
      id: 1,
      label: "Electronics",
      url: "#",
    },
    {
      id: 2,
      label: "Fashion",
      url: "#",
    },
    {
      id: 3,
      label: "Home & Kitchen",
      url: "#",
    },
    {
      id: 4,
      label: "Sports",
      url: "#",
    },
    {
      id: 5,
      label: "Books",
      url: "#",
    },
    {
      id: 6,
      label: "Beauty & Personal Care",
      url: "#",
    },
    {
      id: 7,
      label: "Grocery",
      url: "#",
    },
    {
      id: 8,
      label: "Toys & Games",
      url: "#",
    },
    {
      id: 9,
      label: "Automotive",
      url: "#",
    },
    {
      id: 10,
      label: "Health & Wellness",
      url: "#",
    },
  ];
</script>
