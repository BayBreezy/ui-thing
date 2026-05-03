<template>
  <div class="@container">
    <div class="mx-auto grid max-w-md grid-cols-1 gap-x-6 gap-y-10 @[450px]:grid-cols-2">
      <div class="*:not-first:mt-2">
        <UiLabel>Simple select</UiLabel>
        <UiNativeSelect>
          <option value="1">React</option>
          <option value="2">Next.js</option>
          <option value="3">Astro</option>
          <option value="4">Gatsby</option>
        </UiNativeSelect>
      </div>
      <div class="*:not-first:mt-2">
        <UiLabel>Select with placeholder</UiLabel>
        <UiNativeSelect model-value="">
          <option value="" disabled>Please select a value</option>
          <option value="1">1 to 5</option>
          <option value="2">5 to 10</option>
          <option value="3">More than 10</option>
        </UiNativeSelect>
      </div>
      <div class="col-span-full *:not-first:mt-2">
        <UiLabel>Select with icon</UiLabel>
        <div class="group relative">
          <UiNativeSelect class="ps-9">
            <option value="1">00:00 AM - 11:59 PM</option>
            <option value="2">01:00 AM - 12:59 PM</option>
            <option value="3">02:00 AM - 01:59 PM</option>
            <option value="4">03:00 AM - 02:59 PM</option>
          </UiNativeSelect>
          <div
            class="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 group-has-[select[disabled]]:opacity-50"
          >
            <Icon name="lucide:clock" class="size-4" aria-hidden="true" />
          </div>
        </div>
      </div>
      <div class="col-span-full *:not-first:mt-2">
        <UiLabel>Select with helper text </UiLabel>
        <UiNativeSelect>
          <option value="1">React</option>
          <option value="2">Next.js</option>
          <option value="3">Astro</option>
          <option value="4">Gatsby</option>
        </UiNativeSelect>
        <p class="text-muted-foreground mt-2 text-xs" role="region" aria-live="polite">
          Tell us what's your favorite Select framework
        </p>
      </div>
      <div
        class="[--ring:var(--color-indigo-300)] *:not-first:mt-2 in-[.dark]:[--ring:var(--color-indigo-900)]"
      >
        <UiLabel>Select with colored border</UiLabel>
        <UiNativeSelect>
          <option value="1">React</option>
          <option value="2">Next.js</option>
          <option value="3">Astro</option>
          <option value="4">Gatsby</option>
        </UiNativeSelect>
      </div>

      <div class="*:not-first:mt-2">
        <UiLabel>Select with error (native)</UiLabel>
        <UiNativeSelect aria-invalid="true">
          <option value="1">React</option>
          <option value="2">Next.js</option>
          <option value="3">Astro</option>
          <option value="4">Gatsby</option>
        </UiNativeSelect>
        <p class="text-destructive mt-2 text-xs" role="alert" aria-live="polite">
          Selected option is invalid
        </p>
      </div>

      <div class="*:not-first:mt-2">
        <UiLabel>Gray background</UiLabel>
        <UiNativeSelect class="bg-muted border-transparent shadow-none">
          <option value="1">React</option>
          <option value="2">Next.js</option>
          <option value="3">Astro</option>
          <option value="4">Gatsby</option>
        </UiNativeSelect>
      </div>

      <div class="*:not-first:mt-2">
        <UiLabel>Disabled select</UiLabel>
        <UiNativeSelect disabled model-value="1">
          <option value="1">React</option>
          <option value="2">Next.js</option>
          <option value="3">Astro</option>
          <option value="4">Gatsby</option>
        </UiNativeSelect>
      </div>

      <div class="*:not-first:mt-2">
        <UiLabel>Select with auto-width</UiLabel>
        <div class="w-fit">
          <UiNativeSelect model-value="2">
            <option value="1">React</option>
            <option value="2">Next.js</option>
            <option value="3">Astro</option>
            <option value="4">Gatsby</option>
          </UiNativeSelect>
        </div>
      </div>

      <div class="*:not-first:mt-2">
        <UiLabel>Select with option groups</UiLabel>
        <UiNativeSelect>
          <optgroup label="Frontend">
            <option value="1">React</option>
            <option value="2">Vue</option>
            <option value="3">Angular</option>
          </optgroup>
          <optgroup label="Backend">
            <option value="4">Node.js</option>
            <option value="5">Python</option>
            <option value="6">Java</option>
          </optgroup>
        </UiNativeSelect>
      </div>

      <div class="col-span-full *:not-first:mt-2">
        <UiLabel>Timezone select</UiLabel>
        <ClientOnly>
          <UiNativeSelect model-value="America/Jamaica">
            <template v-for="({ value, label }, index) in formattedTimezones" :key="index">
              <option :value>{{ label }}</option>
            </template>
          </UiNativeSelect>
        </ClientOnly>
      </div>

      <div class="group relative">
        <label
          class="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-[select:disabled]:opacity-50"
        >
          Select with overlapping label
        </label>
        <UiNativeSelect model-value="">
          <option value="" disabled>Select framework</option>
          <option value="1">React</option>
          <option value="2">Next.js</option>
          <option value="3">Astro</option>
          <option value="4">Gatsby</option>
        </UiNativeSelect>
      </div>

      <div
        class="border-input bg-background focus-within:border-ring focus-within:ring-ring/50 has-aria-invalid:border-destructive has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/40 relative rounded-md border shadow-xs transition-[color,box-shadow] outline-none focus-within:ring-[3px] has-[select:disabled]:cursor-not-allowed has-[select:disabled]:opacity-50 has-[select:is(:disabled)_*]:pointer-events-none"
      >
        <label class="text-foreground block px-3 pt-2 text-xs font-medium">
          Select with inset label
        </label>
        <UiNativeSelect
          model-value=""
          class="border-none bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <option value="" disabled>Select framework</option>
          <option value="1">React</option>
          <option value="2">Next.js</option>
          <option value="3">Astro</option>
          <option value="4">Gatsby</option>
        </UiNativeSelect>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const timezones = Intl.supportedValuesOf("timeZone");

  const getTimeZones = useMemoize(() => {
    return timezones
      .map((timezone) => {
        const formatter = new Intl.DateTimeFormat("en", {
          timeZone: timezone,
          timeZoneName: "shortOffset",
        });
        const parts = formatter.formatToParts(new Date());
        const offset = parts.find((part) => part.type === "timeZoneName")?.value || "";
        const modifiedOffset = offset === "GMT" ? "GMT+0" : offset;

        return {
          value: timezone,
          label: `(${modifiedOffset}) ${timezone.replace(/_/g, " ")}`,
          numericOffset: parseInt(offset.replace("GMT", "").replace("+", "") || "0"),
        };
      })
      .sort((a, b) => a.numericOffset - b.numericOffset);
  });

  const formattedTimezones = getTimeZones();
</script>
