---
title: Quill
description: Allow users to create rich text content with the Quill editor.
links:
  - title: Vue Quill
    href: https://vueup.github.io/vue-quill/
    icon: "lucide:keyboard"
  - title: API Reference
    href: https://vueup.github.io/vue-quill/api/
    icon: "icon-park-solid:api"
---

## Getting Started

:::prose-steps
::prose-step

### Installation

To get started, you can install the package with the following command:

:prose-pm-install{name="@vueup/vue-quill"}

::
::prose-step

### Create CSS File

In order to make the editor match the design of this website (and the whole shadcn/ui theme), I had to add this css file: You should copy this and add it to your project.

:prose-code-snippet{file="/assets/css/quill.css" language="css" title="Quill CSS Overrides"}

::
:::

## Usage

### Basic

Here is a basic example of how to use the Quill component. We are using a technique called `Slot Forwarding` so that if the developer wants to create a component and pass through the `toolbar` slot, they can do so.

::prose-show-case

:DocsQuill

#code

<!-- automd:file src="../../app/components/content/Docs/Quill/DocsQuill.vue" code lang="vue" -->

```vue [DocsQuill.vue]
<template>
  <ClientOnly>
    <QuillEditor theme="snow" placeholder="Write something...">
      <template v-for="(_, name) of $slots" #[name]="slotData">
        <slot :name="name" v-bind="slotData" />
      </template>
    </QuillEditor>
  </ClientOnly>
</template>

<script lang="ts" setup>
  import { QuillEditor } from "@vueup/vue-quill";
</script>
```

<!-- /automd -->

::

### Toolbar

We can add our custom toolbar configuration by using the `toolbar` prop.

::prose-show-case

:DocsQuillToolbar

#code

<!-- automd:file src="../../app/components/content/Docs/Quill/DocsQuillToolbar.vue" code lang="vue" -->

```vue [DocsQuillToolbar.vue]
<template>
  <ClientOnly>
    <QuillEditor
      v-model:content="model"
      :toolbar="toolbarOptions"
      theme="snow"
      placeholder="Write something..."
      content-type="html"
    />
  </ClientOnly>
</template>

<script lang="ts" setup>
  import { QuillEditor } from "@vueup/vue-quill";

  const toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike", { align: [] }],
    [{ align: [] }, { list: "ordered" }, { list: "bullet" }],
    ["blockquote", "code-block"],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ size: ["small", false, "large", "huge"] }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    ["link", "image", "video"],
    ["clean"],
  ];

  const model = ref(
    `<h3><b>Quill Editor</b></h3>
<p>Quill is a free, open source WYSIWYG editor built for the modern web. With its modular architecture and expressive API, it is completely customizable to fit any need.</p>
`
  );
</script>
```

<!-- /automd -->

::

### Slot - Toolbar

Another way of customizing the toolbar is by using the `toolbar` slot. This way, we can create a custom toolbar with our own components.

::prose-show-case

:DocsQuillToolbar2

#code

<!-- automd:file src="../../app/components/content/Docs/Quill/DocsQuillToolbar2.vue" code lang="vue" -->

```vue [DocsQuillToolbar2.vue]
<template>
  <ClientOnly>
    <QuillEditor
      v-model:content="model"
      toolbar="#my-toolbar"
      theme="snow"
      placeholder="Write something..."
      content-type="html"
    >
      <template #toolbar>
        <div id="my-toolbar">
          <!-- Add buttons as you would before -->
          <button class="ql-bold" />
          <button class="ql-header" value="1" aria-label="header: 1" />
          <button class="ql-header" value="2" aria-label="header: 2" />
          <button class="ql-italic" />
        </div>
      </template>
    </QuillEditor>
  </ClientOnly>
</template>

<script lang="ts" setup>
  import { QuillEditor } from "@vueup/vue-quill";

  const model = ref(
    `<h3><b>Quill Editor</b></h3>
<p>Quill is a free, open source WYSIWYG editor built for the modern web. With its modular architecture and expressive API, it is completely customizable to fit any need.</p>
`
  );
</script>
```

<!-- /automd -->

::

### Bubble Theme

We can pass the `bubble` value to the `theme` prop to use the snow theme.

You have to select something in the editor to see the toolbar.

::prose-show-case

:DocsQuillBubble

#code

<!-- automd:file src="../../app/components/content/Docs/Quill/DocsQuillBubble.vue" code lang="vue" -->

```vue [DocsQuillBubble.vue]
<template>
  <ClientOnly>
    <QuillEditor
      v-model:content="model"
      theme="bubble"
      toolbar="full"
      placeholder="Write something..."
      content-type="html"
    />
  </ClientOnly>
</template>

<script lang="ts" setup>
  import { QuillEditor } from "@vueup/vue-quill";

  const model = ref(
    `<h3><b>Quill Editor</b></h3>
<p>Quill is a free, open source WYSIWYG editor built for the modern web. With its modular architecture and expressive API, it is completely customizable to fit any need.</p>
`
  );
</script>
```

<!-- /automd -->

::

### Module

We can pass an object or an array of objects to the `module` prop to use any Quill module.

Something like this:

```vue
<script lang="ts" setup>
  import { QuillEditor } from "@vueup/vue-quill";

  type SingleModule = {
    name: string;
    module: any;
    options?: any;
  };
  type ModuleObject = SingleModule | SingleModule[];

  const modules = ref<ModuleObject | null>(null);

  onMounted(async () => {
    const BlotFormatter = (await import("quill-blot-formatter")).default;
    modules.value = {
      name: "blotFormatter",
      module: BlotFormatter,
      options: {
        /* options */
      },
    };
  });
</script>
```

Upload an image to see the module in action.

::prose-show-case

:DocsQuillModule

#code

<!-- automd:file src="../../app/components/content/Docs/Quill/DocsQuillModule.vue" code lang="vue" -->

```vue [DocsQuillModule.vue]
<template>
  <ClientOnly>
    <QuillEditor
      v-if="modules"
      toolbar="full"
      :modules
      theme="snow"
      placeholder="Write something..."
    />
  </ClientOnly>
</template>

<script lang="ts" setup>
  import { QuillEditor } from "@vueup/vue-quill";

  type SingleModule = {
    name: string;
    module: any;
    options?: any;
  };
  type ModuleObject = SingleModule | SingleModule[];

  const modules = ref<ModuleObject | null>(null);

  onMounted(async () => {
    const BlotFormatter = (await import("quill-blot-formatter")).default;
    modules.value = {
      name: "blotFormatter",
      module: BlotFormatter,
      options: {
        /* options */
      },
    };
  });
</script>
```

<!-- /automd -->

::
