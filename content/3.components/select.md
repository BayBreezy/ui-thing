---
title: Select
description: Displays a list of options for the user to pick from—triggered by a button.
links:
  - title: Reka UI
    href: https://reka-ui.com/docs/components/select.html
    icon: "simple-icons:radixui"
  - title: API Reference
    href: https://reka-ui.com/docs/components/select.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="Select"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add select"}

## Usage

### Basic example

::ShowCase

:DocsSelect

#code

<!-- automd:file src="../../app/components/content/Docs/Select/DocsSelect.vue" code lang="vue" -->

```vue [DocsSelect.vue]
<template>
  <div class="mx-auto flex w-full max-w-xs justify-center">
    <UiSelect v-model="option">
      <UiSelectTrigger placeholder="Select an option" />
      <UiSelectContent>
        <UiSelectLabel>Fruits</UiSelectLabel>
        <UiSelectSeparator />
        <UiSelectGroup>
          <UiSelectItem v-for="(fruit, i) in fruits" :key="i" :value="fruit" :text="fruit" />
        </UiSelectGroup>
        <UiSelectSeparator />
        <UiSelectLabel>Vegetables</UiSelectLabel>
        <UiSelectSeparator />
        <UiSelectGroup>
          <UiSelectItem v-for="(veg, i) in vegetables" :key="i" :value="veg" :text="veg" />
        </UiSelectGroup>
      </UiSelectContent>
    </UiSelect>
  </div>
</template>

<script lang="ts" setup>
  const option = ref();
  const fruits = ["Apple", "Banana", "Blueberry", "Grapes", "Pineapple"];
  const vegetables = ["Aubergine", "Broccoli", "Carrot", "Courgette", "Leek"];
</script>
```

<!-- /automd -->

::

### Scrollable

::ShowCase

:DocsSelectScrollable

#code

<!-- automd:file src="../../app/components/content/Docs/Select/DocsSelectScrollable.vue" code lang="vue" -->

```vue [DocsSelectScrollable.vue]
<template>
  <div class="flex w-full justify-center">
    <UiSelect>
      <UiSelectTrigger class="w-[280px]">
        <UiSelectValue placeholder="Select a timezone" />
      </UiSelectTrigger>
      <UiSelectContent>
        <UiSelectGroup>
          <UiSelectLabel>North America</UiSelectLabel>
          <UiSelectItem value="est">Eastern Standard Time (EST)</UiSelectItem>
          <UiSelectItem value="cst">Central Standard Time (CST)</UiSelectItem>
          <UiSelectItem value="mst">Mountain Standard Time (MST)</UiSelectItem>
          <UiSelectItem value="pst">Pacific Standard Time (PST)</UiSelectItem>
          <UiSelectItem value="akst">Alaska Standard Time (AKST)</UiSelectItem>
          <UiSelectItem value="hst">Hawaii Standard Time (HST)</UiSelectItem>
        </UiSelectGroup>
        <UiSelectGroup>
          <UiSelectLabel>Europe & Africa</UiSelectLabel>
          <UiSelectItem value="gmt">Greenwich Mean Time (GMT)</UiSelectItem>
          <UiSelectItem value="cet">Central European Time (CET)</UiSelectItem>
          <UiSelectItem value="eet">Eastern European Time (EET)</UiSelectItem>
          <UiSelectItem value="west"> Western European Summer Time (WEST) </UiSelectItem>
          <UiSelectItem value="cat">Central Africa Time (CAT)</UiSelectItem>
          <UiSelectItem value="eat">East Africa Time (EAT)</UiSelectItem>
        </UiSelectGroup>
        <UiSelectGroup>
          <UiSelectLabel>Asia</UiSelectLabel>
          <UiSelectItem value="msk">Moscow Time (MSK)</UiSelectItem>
          <UiSelectItem value="ist">India Standard Time (IST)</UiSelectItem>
          <UiSelectItem value="cst_china">China Standard Time (CST)</UiSelectItem>
          <UiSelectItem value="jst">Japan Standard Time (JST)</UiSelectItem>
          <UiSelectItem value="kst">Korea Standard Time (KST)</UiSelectItem>
          <UiSelectItem value="ist_indonesia">
            Indonesia Central Standard Time (WITA)
          </UiSelectItem>
        </UiSelectGroup>
        <UiSelectGroup>
          <UiSelectLabel>Australia & Pacific</UiSelectLabel>
          <UiSelectItem value="awst"> Australian Western Standard Time (AWST) </UiSelectItem>
          <UiSelectItem value="acst"> Australian Central Standard Time (ACST) </UiSelectItem>
          <UiSelectItem value="aest"> Australian Eastern Standard Time (AEST) </UiSelectItem>
          <UiSelectItem value="nzst">New Zealand Standard Time (NZST)</UiSelectItem>
          <UiSelectItem value="fjt">Fiji Time (FJT)</UiSelectItem>
        </UiSelectGroup>
        <UiSelectGroup>
          <UiSelectLabel>South America</UiSelectLabel>
          <UiSelectItem value="art">Argentina Time (ART)</UiSelectItem>
          <UiSelectItem value="bot">Bolivia Time (BOT)</UiSelectItem>
          <UiSelectItem value="brt">Brasilia Time (BRT)</UiSelectItem>
          <UiSelectItem value="clt">Chile Standard Time (CLT)</UiSelectItem>
        </UiSelectGroup>
      </UiSelectContent>
    </UiSelect>
  </div>
</template>

<script lang="ts" setup></script>
```

<!-- /automd -->

::

### Form

::ShowCase

:DocsSelectForm

#code

<!-- automd:file src="../../app/components/content/Docs/Select/DocsSelectForm.vue" code lang="vue" -->

```vue [DocsSelectForm.vue]
<template>
  <div class="flex w-full justify-center">
    <form @submit="onSubmit">
      <Field v-slot="{ componentField }" name="email">
        <UiFormItem label="Primary email" description="This will be shown to the public">
          <UiSelect v-bind="componentField">
            <UiSelectTrigger placeholder="Select primary email" />
            <UiSelectContent>
              <UiSelectGroup>
                <UiSelectItem v-for="(e, i) in emails" :key="i" :value="e" :text="e" />
              </UiSelectGroup>
            </UiSelectContent>
          </UiSelect>
        </UiFormItem>
      </Field>
      <div class="mt-4">
        <UiButton type="submit"> Update profile </UiButton>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
  import { object, string } from "yup";

  const emails = ["m@support.com", "m@google.com", "m@example.com"];

  const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(
      object({
        email: string()
          .label("Email")
          .oneOf(emails, "Please select a valid email")
          .required()
          .email(),
      })
    ),
  });

  const onSubmit = handleSubmit((data) => {
    useSonner("Profile updated", {
      description: h("pre", { class: "p-2" }, JSON.stringify(data, null, 2)),
    });
  });
</script>
```

<!-- /automd -->

::

### Origin UI

::ShowCase

:DocsSelectOrigin

#code

<!-- automd:file src="../../app/components/content/Docs/Select/DocsSelectOrigin.vue" code lang="vue" -->

```vue [DocsSelectOrigin.vue]
<template>
  <div class="mx-auto grid w-full max-w-xs grid-cols-1 gap-8 *:data-[slot=select-trigger]:w-full">
    <div class="*:not-first:mt-2">
      <UiLabel>Simple select with default value</UiLabel>
      <UiSelect default-value="1">
        <UiSelectTrigger>
          <UiSelectValue placeholder="Select framework" />
        </UiSelectTrigger>
        <UiSelectContent>
          <UiSelectItem v-for="(item, i) in frameworks" :key="i" :value="item.value">{{
            item.label
          }}</UiSelectItem>
        </UiSelectContent>
      </UiSelect>
    </div>

    <div class="*:not-first:mt-2">
      <UiLabel>Status select</UiLabel>
      <UiSelect v-model="selectedStatus">
        <UiSelectTrigger>
          <UiSelectValue placeholder="Select status">
            <span class="flex items-center gap-2">
              <span
                v-if="selectedStatus"
                class="size-2 rounded-full"
                :class="[selectedStatus?.color]"
              />
              <span>{{ selectedStatus?.label || "Select a status" }}</span>
            </span>
          </UiSelectValue>
        </UiSelectTrigger>
        <UiSelectContent>
          <UiSelectItem v-for="(item, i) in status" :key="i" :value="item">
            <span class="flex items-center gap-2">
              <span class="size-2 rounded-full" :class="item.color" />
              <span>{{ item.label }}</span>
            </span>
          </UiSelectItem>
        </UiSelectContent>
      </UiSelect>
    </div>

    <div class="*:not-first:mt-2">
      <UiLabel>Select with icon</UiLabel>
      <UiSelect default-value="1">
        <UiSelectTrigger class="relative ps-9">
          <div
            class="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 group-has-[select[disabled]]:opacity-50"
          >
            <Icon name="lucide:clock" class="size-4" aria-hidden="true" />
          </div>
          <UiSelectValue placeholder="Select time" />
        </UiSelectTrigger>
        <UiSelectContent>
          <UiSelectItem value="1">00:00 AM - 11:59 PM</UiSelectItem>
          <UiSelectItem value="2">01:00 AM - 12:59 PM</UiSelectItem>
          <UiSelectItem value="3">02:00 AM - 01:59 PM</UiSelectItem>
          <UiSelectItem value="4">03:00 AM - 02:59 PM</UiSelectItem>
        </UiSelectContent>
      </UiSelect>
    </div>

    <div class="*:not-first:mt-2">
      <UiLabel>Select with helper text</UiLabel>
      <UiSelect default-value="3">
        <UiSelectTrigger>
          <UiSelectValue placeholder="Select framework" />
        </UiSelectTrigger>
        <UiSelectContent>
          <UiSelectItem v-for="(item, index) in frameworks" :key="index" :value="item.value">{{
            item.label
          }}</UiSelectItem>
        </UiSelectContent>
      </UiSelect>
      <p class="text-xs text-muted-foreground" role="region" aria-live="polite">
        Tell us what's your favorite Select framework
      </p>
    </div>

    <div
      class="[--ring:var(--color-indigo-300)] *:not-first:mt-2 in-[.dark]:[--ring:var(--color-indigo-900)]"
    >
      <UiLabel>Select with colored border and ring</UiLabel>
      <UiSelect default-value="2">
        <UiSelectTrigger>
          <UiSelectValue placeholder="Select framework" />
        </UiSelectTrigger>
        <UiSelectContent>
          <UiSelectItem v-for="(item, index) in frameworks" :key="index" :value="item.value">{{
            item.label
          }}</UiSelectItem>
        </UiSelectContent>
      </UiSelect>
    </div>

    <div class="*:not-first:mt-2">
      <UiLabel>Select with error</UiLabel>
      <UiSelect default-value="2">
        <UiSelectTrigger aria-invalid="true">
          <UiSelectValue placeholder="Select framework" />
        </UiSelectTrigger>
        <UiSelectContent>
          <UiSelectItem v-for="(item, index) in frameworks" :key="index" :value="item.value">{{
            item.label
          }}</UiSelectItem>
        </UiSelectContent>
      </UiSelect>
      <p class="mt-2 text-xs text-destructive" role="alert" aria-live="polite">
        Selected option is invalid
      </p>
    </div>

    <div class="*:not-first:mt-2">
      <UiLabel>Select with gray background</UiLabel>
      <UiSelect default-value="2">
        <UiSelectTrigger class="w-full border-transparent bg-muted shadow-none">
          <UiSelectValue placeholder="Select framework" />
        </UiSelectTrigger>
        <UiSelectContent>
          <UiSelectItem v-for="(item, index) in frameworks" :key="index" :value="item.value">{{
            item.label
          }}</UiSelectItem>
        </UiSelectContent>
      </UiSelect>
    </div>

    <div class="*:not-first:mt-2">
      <UiLabel>Select with options groups</UiLabel>
      <UiSelect default-value="1">
        <UiSelectTrigger>
          <UiSelectValue placeholder="Select framework" />
        </UiSelectTrigger>
        <UiSelectContent>
          <UiSelectGroup>
            <UiSelectLabel>Frontend</UiSelectLabel>
            <UiSelectItem value="1">Vue</UiSelectItem>
            <UiSelectItem value="2">Nuxt</UiSelectItem>
            <UiSelectItem value="3">Svelte</UiSelectItem>
          </UiSelectGroup>
          <UiSelectGroup>
            <UiSelectLabel>Backend</UiSelectLabel>
            <UiSelectItem value="4">Node.js</UiSelectItem>
            <UiSelectItem value="5">Python</UiSelectItem>
            <UiSelectItem value="6">Java</UiSelectItem>
          </UiSelectGroup>
        </UiSelectContent>
      </UiSelect>
    </div>

    <div class="*:not-first:mt-2">
      <UiLabel>Select with separator</UiLabel>
      <UiSelect default-value="1">
        <UiSelectTrigger>
          <UiSelectValue placeholder="Select framework" />
        </UiSelectTrigger>
        <UiSelectContent>
          <UiSelectGroup>
            <UiSelectLabel>Frontend</UiSelectLabel>
            <UiSelectItem value="1">Vue</UiSelectItem>
            <UiSelectItem value="2">Nuxt</UiSelectItem>
            <UiSelectItem value="3">Svelte</UiSelectItem>
          </UiSelectGroup>
          <UiSelectSeparator />
          <UiSelectGroup>
            <UiSelectLabel>Backend</UiSelectLabel>
            <UiSelectItem value="4">Node.js</UiSelectItem>
            <UiSelectItem value="5">Python</UiSelectItem>
            <UiSelectItem value="6">Java</UiSelectItem>
          </UiSelectGroup>
        </UiSelectContent>
      </UiSelect>
    </div>

    <div class="*:not-first:mt-2">
      <UiLabel>Select with disabled options</UiLabel>
      <UiSelect default-value="1">
        <UiSelectTrigger>
          <UiSelectValue placeholder="Select framework" />
        </UiSelectTrigger>
        <UiSelectContent>
          <UiSelectItem
            v-for="(item, i) in frameworks"
            :key="i"
            :disabled="item.value == '1' || item.value == '3'"
            :value="item.value"
            >{{ item.label }}</UiSelectItem
          >
        </UiSelectContent>
      </UiSelect>
    </div>

    <div class="group relative">
      <label
        class="absolute start-1 top-0 z-10 block -translate-y-1/2 bg-background px-2 text-xs font-medium text-foreground group-has-disabled:opacity-50"
      >
        Select with overlapping label
      </label>
      <UiSelect>
        <UiSelectTrigger
          class="bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent"
        >
          <UiSelectValue placeholder="Select framework" />
        </UiSelectTrigger>
        <UiSelectContent>
          <UiSelectItem
            v-for="(item, i) in frameworks"
            :key="i"
            :value="item.value"
            :text="item.label"
          />
        </UiSelectContent>
      </UiSelect>
    </div>

    <div class="*:not-first:mt-2">
      <UiLabel>Timezone select</UiLabel>
      <UiSelect default-value="America/Jamaica">
        <UiSelectTrigger>
          <UiSelectValue placeholder="Select timezone" />
        </UiSelectTrigger>
        <UiSelectContent>
          <UiSelectItem
            v-for="{ value, label } in formattedTimezones"
            :key="value"
            :value="value"
            :text="label"
          />
        </UiSelectContent>
      </UiSelect>
    </div>

    <div class="*:not-first:mt-2">
      <UiLabel>Options with flag</UiLabel>
      <UiSelect v-model="selectedOption">
        <UiSelectTrigger
          class="[&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0 [&>span_svg]:text-muted-foreground/80"
        >
          <UiSelectValue placeholder="Select country">
            <template v-if="selectedOption">
              <span class="text-lg leading-none">{{ selectedOption.flag }}</span>
              <span class="truncate">{{ selectedOption.label }}</span>
            </template>
          </UiSelectValue>
        </UiSelectTrigger>
        <UiSelectContent
          class="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]>span>svg]:shrink-0 [&_*[role=option]>span>svg]:text-muted-foreground/80"
        >
          <UiSelectGroup v-for="continent in options" :key="continent.continent">
            <UiSelectLabel class="ps-2">{{ continent.continent }}</UiSelectLabel>
            <UiSelectItem v-for="country in continent.items" :key="country.value" :value="country">
              <span class="text-lg leading-none">{{ country.flag }}</span>
              <span class="truncate">{{ country.label }}</span>
            </UiSelectItem>
          </UiSelectGroup>
        </UiSelectContent>
      </UiSelect>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const frameworks = [
    { value: "1", label: "Vue" },
    { value: "2", label: "Nuxt" },
    { value: "3", label: "Astro" },
    { value: "5", label: "Vitesse" },
  ];

  const status = [
    { value: "1", label: "Completed", color: "bg-green-500" },
    { value: "2", label: "In Progress", color: "bg-yellow-500" },
    { value: "3", label: "Pending", color: "bg-gray-500" },
    { value: "4", label: "Cancelled", color: "bg-red-500" },
    { value: "5", label: "On Hold", color: "bg-blue-500" },
    { value: "6", label: "Archived", color: "bg-purple-500" },
  ] as const;

  const selectedStatus = ref();

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

  interface Option {
    continent: string;
    items: Country[];
  }

  interface Country {
    value: string;
    label: string;
    flag: string;
  }

  const options: Option[] = [
    {
      continent: "America",
      items: [
        { value: "1", label: "United States", flag: "🇺🇸" },
        { value: "2", label: "Canada", flag: "🇨🇦" },
        { value: "3", label: "Mexico", flag: "🇲🇽" },
      ],
    },
    {
      continent: "Africa",
      items: [
        { value: "4", label: "South Africa", flag: "🇿🇦" },
        { value: "5", label: "Nigeria", flag: "🇳🇬" },
        { value: "6", label: "Morocco", flag: "🇲🇦" },
      ],
    },
    {
      continent: "Asia",
      items: [
        { value: "7", label: "China", flag: "🇨🇳" },
        { value: "8", label: "Japan", flag: "🇯🇵" },
        { value: "9", label: "India", flag: "🇮🇳" },
      ],
    },
    {
      continent: "Europe",
      items: [
        { value: "10", label: "United Kingdom", flag: "🇬🇧" },
        { value: "11", label: "France", flag: "🇫🇷" },
        { value: "12", label: "Germany", flag: "🇩🇪" },
      ],
    },
    {
      continent: "Oceania",
      items: [
        { value: "13", label: "Australia", flag: "🇦🇺" },
        { value: "14", label: "New Zealand", flag: "🇳🇿" },
      ],
    },
  ];

  const selectedOption = ref<Country | undefined>(options[0]?.items[0]);
</script>
```

<!-- /automd -->

::
