<template>
  <div>
    <UICommandDialog v-model:open="localModel">
      <UIDialogTitle class="sr-only">Doumnetation search modal</UIDialogTitle>
      <UIDialogDescription class="sr-only">
        Search the documentation for components, utilities, and more.
      </UIDialogDescription>

      <UICommandInput placeholder="Search..." />

      <UICommandList>
        <UIScrollArea class="h-[300px] w-full">
          <UICommandEmpty>No results found.</UICommandEmpty>
          <template v-for="(nav, i) in navigation" :key="i">
            <UICommandGroup :heading="nav.title">
              <UICommandItem
                v-for="(child, k) in nav.children"
                :key="k"
                class="px-4 py-2 first:mt-2"
                @select="
                  $event.preventDefault();
                  navigateTo(child._path);
                  localModel = false;
                "
                :value="child.title"
              >
                <Icon :name="nav.icon" class="h-4 w-4 text-muted-foreground/80" />
                <span>{{ child.title }}</span>
              </UICommandItem>
            </UICommandGroup>
          </template>
          <UICommandGroup heading="Theme">
            <UICommandItem
              v-for="(mode, i) in modes"
              :key="i"
              class="px-4 py-2 first:mt-2"
              :value="mode.value"
              @select="setTheme($event, mode.value)"
            >
              <Icon :name="mode.icon" class="h-4 w-4 text-muted-foreground/80" />
              <span>{{ mode.title }}</span>
            </UICommandItem>
          </UICommandGroup>
        </UIScrollArea>
      </UICommandList>
    </UICommandDialog>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    modelValue?: boolean;
  }>();
  const modes = [
    { icon: "lucide:sun", title: "Light", value: "light" },
    { icon: "lucide:moon", title: "Dark", value: "dark" },
    { icon: "lucide:laptop", title: "System", value: "system" },
  ];

  const emits = defineEmits<{
    "update:modelValue": [value: boolean];
  }>();
  const localModel = useVModel(props, "modelValue", emits, { passive: true });

  const { navigation } = useContent();

  const colorMode = useColorMode();
  const setTheme = (e: Event, val: string) => {
    e.preventDefault();
    colorMode.preference = val;
    localModel.value = false;
  };
</script>
