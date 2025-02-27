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

:::Steps
::Step

### Installation

To get started, you can install the package with the following command:

```bash
npm install @vueup/vue-quill@latest --save
```

::
::Step

## Create CSS File

In order to make the editor match the design of this website (and the whole shadcn/ui theme), I had to add this css file: You should copy this and add it to your project.

<!-- automd:file src="../../app/assets/css/quill.css" code lang="css -->

```"css [quill.css]
@import "@vueup/vue-quill/dist/vue-quill.snow.css";
@import "@vueup/vue-quill/dist/vue-quill.bubble.css";

.ql-toolbar {
  &.ql-snow {
    @apply rounded-t-md border-border font-sans;
  }
  &.ql-snow {
    .ql-stroke {
      @apply stroke-muted-foreground;
    }
    .ql-fill {
      @apply fill-muted-foreground;
    }
    button {
      @apply mx-0.5 rounded hover:bg-muted hover:text-foreground;
      &:hover {
        .ql-fill {
          @apply fill-foreground;
        }
        .ql-stroke {
          @apply stroke-foreground;
        }
      }
      .ql-stroke {
        @apply stroke-muted-foreground;
      }
      &.ql-active {
        @apply bg-primary text-primary-foreground;
        .ql-stroke {
          @apply stroke-primary-foreground;
        }
        .ql-fill {
          @apply fill-primary-foreground;
        }
      }
    }
    .ql-formats {
      svg,
      .ql-picker-label,
      .ql-picker {
        @apply text-muted-foreground;
      }
      button {
        @apply mx-0.5 rounded hover:bg-muted hover:text-foreground;
        &:hover {
          .ql-fill {
            @apply fill-foreground;
          }
          .ql-stroke {
            @apply stroke-foreground;
          }
        }
        .ql-fill {
          @apply fill-muted-foreground;
        }
        .ql-stroke {
          @apply stroke-muted-foreground;
        }
        &.ql-active {
          @apply bg-primary text-primary-foreground;
          .ql-fill {
            @apply fill-primary-foreground;
          }
          .ql-stroke {
            @apply stroke-primary-foreground;
          }
        }
      }
      .ql-picker {
        @apply rounded;
        .ql-picker-options {
          @apply mt-1 rounded border-border bg-card p-1;
          .ql-picker-item {
            @apply rounded hover:bg-muted hover:text-foreground;
            &.ql-selected {
              @apply bg-primary text-primary-foreground;
            }
          }
        }
      }
      .ql-align,
      .ql-color-picker {
        &:hover {
          .ql-fill {
            @apply fill-foreground;
          }
          .ql-stroke {
            @apply stroke-foreground;
          }
        }
        .ql-picker-options {
          @apply mt-1 rounded border-border bg-card p-1;
          .ql-picker-item {
            &.ql-selected {
              @apply bg-primary text-primary-foreground;
              .ql-stroke {
                @apply stroke-primary-foreground;
              }
            }
          }
        }
      }
      .ql-picker-label {
        @apply hover:rounded hover:bg-muted hover:text-foreground;
        &.ql-active {
          @apply rounded bg-primary text-primary-foreground;
          .ql-stroke {
            @apply stroke-primary-foreground;
          }
        }
      }
      .ql-stroke {
        @apply stroke-muted-foreground;
      }
      .ql-expanded {
        .ql-picker-label {
          @apply rounded border-border;
        }
      }
    }
  }
}

.ql-container {
  @apply min-h-[150px] font-sans text-sm;
  &.ql-snow {
    a {
      @apply text-sky-500 hover:text-sky-500;
    }
    @apply rounded-b-md border-border;
  }
  .ql-editor {
    @apply min-h-[150px];
    .ql-font-monospace {
      @apply font-mono;
    }
    &.ql-blank {
      &:before {
        @apply not-italic text-muted-foreground;
      }
    }
  }
  .ql-tooltip {
    @apply z-[9999] rounded border-border bg-card px-4 py-2 text-sm text-card-foreground shadow before:cursor-pointer before:font-medium;
    input[type="text"] {
      @apply h-8 w-[200px] rounded border-border bg-muted/30 p-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring;
    }
    .ql-preview {
      @apply text-sm leading-[26px] underline underline-offset-2;
    }
    .ql-remove {
      @apply text-destructive hover:text-destructive;
    }
  }
}

.ql-container.ql-bubble {
  @apply rounded-md border;
  .ql-tooltip {
    @apply z-[9999] rounded-lg border border-border bg-card px-4 py-2 text-sm text-card-foreground shadow before:cursor-pointer before:font-medium;
    input[type="text"] {
      @apply h-8 w-[200px] rounded border-border bg-muted/30 p-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring;
    }
    .ql-preview {
      @apply text-sm leading-[26px] underline underline-offset-2;
    }
    .ql-remove {
      @apply text-destructive hover:text-destructive;
    }
    &:not(.ql-flip) .ql-tooltip-arrow {
      @apply border-b-border;
    }
    .ql-toolbar {
      .ql-stroke {
        @apply stroke-muted-foreground;
      }
      .ql-fill {
        @apply fill-muted-foreground;
      }

      button {
        @apply mx-0.5 rounded hover:bg-muted hover:text-foreground;
        &:hover {
          .ql-fill {
            @apply fill-foreground;
          }
          .ql-stroke {
            @apply stroke-foreground;
          }
        }
        .ql-stroke {
          @apply stroke-muted-foreground;
        }
        &.ql-active {
          @apply bg-primary text-primary-foreground;
          .ql-stroke {
            @apply stroke-primary-foreground;
          }
          .ql-fill {
            @apply fill-primary-foreground;
          }
        }
      }
      .ql-formats {
        svg,
        .ql-picker-label,
        .ql-picker {
          @apply text-muted-foreground;
        }
        button {
          @apply mx-0.5 rounded hover:bg-muted hover:text-foreground;
          &:hover {
            .ql-fill {
              @apply fill-foreground;
            }
            .ql-stroke {
              @apply stroke-foreground;
            }
          }
          .ql-fill {
            @apply fill-muted-foreground;
          }
          .ql-stroke {
            @apply stroke-muted-foreground;
          }
          &.ql-active {
            @apply bg-primary text-primary-foreground;
            .ql-fill {
              @apply fill-primary-foreground;
            }
            .ql-stroke {
              @apply stroke-primary-foreground;
            }
          }
        }
        .ql-picker {
          @apply rounded;
          .ql-picker-options {
            @apply mt-1 rounded border border-border bg-card p-1;
            .ql-picker-item {
              @apply rounded px-1 hover:bg-muted hover:text-foreground;
              &.ql-selected {
                @apply bg-primary text-primary-foreground;
              }
            }
          }
        }
        .ql-align,
        .ql-color-picker {
          &:hover {
            .ql-fill {
              @apply fill-foreground;
            }
            .ql-stroke {
              @apply stroke-foreground;
            }
          }
          .ql-picker-options {
            @apply mt-1 rounded border border-border bg-card p-1;
            .ql-picker-item {
              &.ql-selected {
                @apply bg-primary text-primary-foreground;
                .ql-stroke {
                  @apply stroke-primary-foreground;
                }
              }
            }
          }
        }
        .ql-picker-label {
          @apply hover:rounded hover:bg-muted hover:text-foreground;
          &.ql-active {
            @apply rounded bg-primary text-primary-foreground;
            .ql-stroke {
              @apply stroke-primary-foreground;
            }
          }
        }
        .ql-stroke {
          @apply stroke-muted-foreground;
        }
        .ql-expanded {
          .ql-picker-label {
            @apply rounded border-border;
          }
        }
      }
    }
  }
}
```

<!-- /automd -->

::
:::

## Usage

### Basic

Here is a basic example of how to use the Quill component. We are using a technique called `Slot Forwarding` so that if the developer wants to create a component and pass through the `toolbar` slot, they can do so.

::ShowCase

:DocsQuill

#code

<!-- automd:file src="../../app/components/content/Docs/Quill/DocsQuill.client.vue" code lang="vue" -->

```vue [DocsQuill.client.vue]
<template>
  <QuillEditor theme="snow" placeholder="Write something...">
    <template v-for="(_, name) of $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData" />
    </template>
  </QuillEditor>
</template>

<script lang="ts" setup>
  import { QuillEditor } from "@vueup/vue-quill";
</script>
```

<!-- /automd -->

::

### Toolbar

We can add our custom toolbar configuration by using the `toolbar` prop.

::ShowCase

:DocsQuillToolbar

#code

<!-- automd:file src="../../app/components/content/Docs/Quill/DocsQuillToolbar.client.vue" code lang="vue" -->

```vue [DocsQuillToolbar.client.vue]
<template>
  <QuillEditor
    v-model:content="model"
    :toolbar="toolbarOptions"
    theme="snow"
    placeholder="Write something..."
    content-type="html"
  />
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

::ShowCase

:DocsQuillToolbar2

#code

<!-- automd:file src="../../app/components/content/Docs/Quill/DocsQuillToolbar2.client.vue" code lang="vue" -->

```vue [DocsQuillToolbar2.client.vue]
<template>
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

::ShowCase

:DocsQuillBubble

#code

<!-- automd:file src="../../app/components/content/Docs/Quill/DocsQuillBubble.client.vue" code lang="vue" -->

```vue [DocsQuillBubble.client.vue]
<template>
  <QuillEditor
    v-model:content="model"
    theme="bubble"
    toolbar="full"
    placeholder="Write something..."
    content-type="html"
  />
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

```ts
import BlotFormatter from "quill-blot-formatter";

type SingleModule = {
  name: string;
  module: any;
  options?: any;
};
type ModuleObject = SingleModule | SingleModule[];

const modules: ModuleObject = {
  name: "blotFormatter",
  module: BlotFormatter,
  options: {
    /* options */
  },
};
```

Upload an image to see the module in action.

::ShowCase

:DocsQuillModule

#code

<!-- automd:file src="../../app/components/content/Docs/Quill/DocsQuillModule.client.vue" code lang="vue" -->

```vue [DocsQuillModule.client.vue]
<template>
  <QuillEditor toolbar="full" :modules theme="snow" placeholder="Write something..." />
</template>

<script lang="ts" setup>
  import { QuillEditor } from "@vueup/vue-quill";
  import BlotFormatter from "quill-blot-formatter";

  type SingleModule = {
    name: string;
    module: any;
    options?: any;
  };
  type ModuleObject = SingleModule | SingleModule[];

  const modules: ModuleObject = {
    name: "blotFormatter",
    module: BlotFormatter,
    options: {
      /* options */
    },
  };
</script>
```

<!-- /automd -->

::
