<template>
  <form class="mx-auto max-w-md" @submit="onSubmit">
    <fieldset :disabled="isSubmitting" class="space-y-5">
      <UiVeeFileInput multiple label="Certificates" name="certs" hint="Add at least 2 files" />
      <UiButton type="submit"> Upload files </UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { z } from "zod";

  const ACCEPTED_DOC_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/plain",
  ];
  const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

  const schema = z.object({
    certs: z
      .array(z.custom<File>())
      .refine(
        (files) => {
          // Check if all items in the array are instances of the File object
          return files.every((file) => file instanceof File);
        },
        {
          // If the refinement fails, throw an error with this message
          message: "Expected a file",
        }
      )
      .refine(
        (files) => files.every((file) => file.size <= 1024 * 1024),
        `File size should be less than 1mb.`
      )
      .refine(
        (files) =>
          files.every((file) =>
            ACCEPTED_IMAGE_TYPES.concat(ACCEPTED_DOC_TYPES).includes(file.type)
          ),
        "Invalid file type."
      )
      .refine((files) => files.length >= 2, "Please upload at least 2 files."),
  });

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(schema),
  });

  const onSubmit = handleSubmit(async (values) => {
    console.log(values);

    const promise = () => new Promise((resolve) => setTimeout(resolve, 3000));
    useSonner.promise(promise, {
      loading: "We are updating your information...",
      success: (_) => "We updated your information.",
      error: (_) => "Error! Your information could not be sent to our servers!",
    });
  });
</script>
