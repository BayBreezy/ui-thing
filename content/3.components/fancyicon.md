---
title: Fancy Icon
description: An icon with a nice background color.
---

## Source code

Click :SourceCodeLink{component="FancyIcon"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add fancy-icon"}

## Usage

### Basic

::ShowCase

:DocsFancyIcon

#code

<!-- automd:file src="../../app/components/content/Docs/FancyIcon/DocsFancyIcon.vue" code lang="vue" -->

```vue [DocsFancyIcon.vue]
<template>
  <div class="flex items-center justify-center gap-3">
    <UiFancyIcon theme="light" color="primary" :icon />
    <UiFancyIcon theme="gradient" color="primary" :icon />
    <UiFancyIcon theme="dark" color="primary" :icon />
    <UiFancyIcon theme="modern" color="gray" :icon />
    <UiFancyIcon theme="modern-neue" color="gray" :icon />
    <UiFancyIcon theme="outline" color="primary" :icon />
  </div>
</template>
<script lang="ts" setup>
  const icon = "lucide:circle-check";
</script>
```

<!-- /automd -->

::

### Light Theme

::ShowCase

:DocsFancyIconLight

#code

<!-- automd:file src="../../app/components/content/Docs/FancyIcon/DocsFancyIconLight.vue" code lang="vue" -->

```vue [DocsFancyIconLight.vue]
<template>
  <div class="flex flex-col gap-6">
    <template v-for="c in colors" :key="c">
      <div class="flex items-start justify-center gap-3">
        <template v-for="s in sizes" :key="s">
          <UiFancyIcon theme="light" :color="c" :size="s" :icon />
        </template>
      </div>
    </template>
  </div>
</template>
<script lang="ts" setup>
  const icon = "lucide:circle-check";
  const sizes = ["sm", "md", "lg", "xl"] as const;
  const colors = ["gray", "primary", "error", "warning", "success", "info"] as const;
</script>
```

<!-- /automd -->

::

### Dark Theme

::ShowCase

:DocsFancyIconDark

#code

<!-- automd:file src="../../app/components/content/Docs/FancyIcon/DocsFancyIconDark.vue" code lang="vue" -->

```vue [DocsFancyIconDark.vue]
<template>
  <div class="flex flex-col gap-6">
    <template v-for="c in colors" :key="c">
      <div class="flex items-start justify-center gap-3">
        <template v-for="s in sizes" :key="s">
          <UiFancyIcon theme="dark" :color="c" :size="s" :icon />
        </template>
      </div>
    </template>
  </div>
</template>
<script lang="ts" setup>
  const icon = "lucide:circle-check";
  const sizes = ["sm", "md", "lg", "xl"] as const;
  const colors = ["gray", "primary", "error", "warning", "success", "info"] as const;
</script>
```

<!-- /automd -->

::

### Outline Theme

::ShowCase

:DocsFancyIconOutline

#code

<!-- automd:file src="../../app/components/content/Docs/FancyIcon/DocsFancyIconOutline.vue" code lang="vue" -->

```vue [DocsFancyIconOutline.vue]
<template>
  <div class="flex flex-col gap-6">
    <template v-for="c in colors" :key="c">
      <div class="flex items-start justify-center gap-8">
        <template v-for="s in sizes" :key="s">
          <UiFancyIcon theme="outline" :color="c" :size="s" :icon />
        </template>
      </div>
    </template>
  </div>
</template>
<script lang="ts" setup>
  const icon = "lucide:circle-check";
  const sizes = ["sm", "md", "lg", "xl"] as const;
  const colors = ["gray", "primary", "error", "warning", "success", "info"] as const;
</script>
```

<!-- /automd -->

::

### Modern Theme

::ShowCase

:DocsFancyIconModern

#code

<!-- automd:file src="../../app/components/content/Docs/FancyIcon/DocsFancyIconModern.vue" code lang="vue" -->

```vue [DocsFancyIconModern.vue]
<template>
  <div class="flex items-start justify-center gap-3">
    <template v-for="s in sizes" :key="s">
      <UiFancyIcon theme="modern" :size="s" :icon />
    </template>
  </div>
</template>
<script lang="ts" setup>
  const icon = "lucide:circle-check";
  const sizes = ["sm", "md", "lg", "xl"] as const;
</script>
```

<!-- /automd -->

::

### Modern Neue Theme

::ShowCase

:DocsFancyIconModernNeue

#code

<!-- automd:file src="../../app/components/content/Docs/FancyIcon/DocsFancyIconModernNeue.vue" code lang="vue" -->

```vue [DocsFancyIconModernNeue.vue]
<template>
  <div class="flex items-start justify-center gap-3">
    <template v-for="s in sizes" :key="s">
      <UiFancyIcon theme="modern-neue" :size="s" :icon />
    </template>
  </div>
</template>
<script lang="ts" setup>
  const icon = "lucide:circle-check";
  const sizes = ["sm", "md", "lg", "xl"] as const;
</script>
```

<!-- /automd -->

::

### Gradient Theme

::ShowCase

:DocsFancyIconGradient

#code

<!-- automd:file src="../../app/components/content/Docs/FancyIcon/DocsFancyIconGradient.vue" code lang="vue" -->

```vue [DocsFancyIconGradient.vue]
<template>
  <div class="flex flex-col gap-6">
    <template v-for="c in colors" :key="c">
      <div class="flex items-start justify-center gap-3">
        <template v-for="s in sizes" :key="s">
          <UiFancyIcon theme="gradient" :color="c" :size="s" :icon />
        </template>
      </div>
    </template>
  </div>
</template>
<script lang="ts" setup>
  const icon = "lucide:circle-check";
  const sizes = ["sm", "md", "lg", "xl"] as const;
  const colors = ["gray", "primary", "error", "warning", "success", "info"] as const;
</script>
```

<!-- /automd -->

::
