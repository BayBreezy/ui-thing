<template>
  <form class="mx-auto max-w-md" @submit="onSubmit">
    <fieldset class="space-y-5">
      <!-- `single` stores one value (or `undefined`). Add `disallow-empty-selection` to force a choice. -->
      <UiVeeTagGroup
        name="size"
        label="T-shirt size"
        selection-mode="single"
        :options="sizes"
        variant="solid"
        color="primary"
        disallow-empty-selection
        required
      />
      <UiButton type="submit">Add to cart</UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { object, string } from "yup";

  const sizes = ["XS", "S", "M", "L", "XL"];

  const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(
      object({ size: string().label("Size").required("Pick a size") })
    ),
    initialValues: { size: "M" },
  });

  const onSubmit = handleSubmit((values) => {
    useSonner.success("Added to cart", { description: `Size ${values.size}` });
  });
</script>
