---
title: VeeFileInput
description: An input component that allows the user to upload files to your application.
links:
  - title: Input Source
    href: /components/input
    icon: ph:paperclip
---

## Source code

Click :SourceCodeLink{component="Vee/FileInput.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add vee-file-input"}

## Usage

### File upload

Why not use the `VeeInput` to accept file uploads? Well, we cannot force select a file from a user's device so the way how data binding works with file inputs and `vee-validate` is a bit different. According to the [docs](https://vee-validate.logaretm.com/v4/api/field#rendering-complex-fields-with-scoped-slots) it is better to use the `handleChange` and `handleBlur` methods to handle the file input changes.

::ShowCase

:DocsVeeInputFiles

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Input/DocsVeeInputFiles.vue" code lang="vue" -->

```vue [DocsVeeInputFiles.vue]
<template>
  <form class="mx-auto max-w-md" @submit="onSubmit">
    <fieldset :disabled="isSubmitting" class="space-y-5">
      <UiVeeFileInput multiple label="Certificates" name="certs" hint="Add at least 2 files" />
      <UiButton :loading="isSubmitting" type="submit"> Upload files </UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { promiseTimeout } from "@vueuse/core";
  import { array, mixed, object } from "yup";

  const ACCEPTED_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/plain",
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  const schema = object({
    certs: array()
      .of(
        mixed()
          .required()
          .label("Certificate")
          .test({
            message: "Ensure that the select file(s) are valid",
            name: "is-valid",
            test(v: any) {
              return ACCEPTED_TYPES.includes(v.type?.toLowerCase());
            },
          })
      )
      .min(2, "Upload at least 2 files")
      .label("Certificates")
      .required(),
  });

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(schema),
  });

  const onSubmit = handleSubmit(async (_, ctx) => {
    await promiseTimeout(3000);

    useSonner.success("Updated Successfully", {
      description: "We updated your information.",
    });
    ctx.resetForm();
  });
</script>
```

<!-- /automd -->

::
