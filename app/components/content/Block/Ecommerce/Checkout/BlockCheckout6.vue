<template>
  <!--
    Address form that adapts to the selected country
    Features: Country select that changes the region and postal code labels, region options and validation pattern, a free text region for countries without a list, phone and delivery notes, save address option and a formatted confirmation
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-2xl">
      <div v-if="!saved">
        <h1 class="text-2xl font-bold tracking-tight">Shipping address</h1>
        <p class="text-muted-foreground mt-1 text-sm">
          Choose a country first and the form adjusts to match.
        </p>

        <form class="mt-8 grid gap-4 sm:grid-cols-2" novalidate @submit.prevent="submit">
          <div class="sm:col-span-2">
            <UiVeeSelect name="country" label="Country or region">
              <option v-for="(entry, code) in countries" :key="code" :value="code">
                {{ entry.name }}
              </option>
            </UiVeeSelect>
          </div>
          <UiVeeInput name="firstName" label="First name" autocomplete="given-name" />
          <UiVeeInput name="lastName" label="Last name" autocomplete="family-name" />
          <div class="sm:col-span-2">
            <UiVeeInput name="address" label="Address" autocomplete="address-line1" />
          </div>
          <div class="sm:col-span-2">
            <UiVeeInput
              name="address2"
              label="Apartment, suite or unit (optional)"
              autocomplete="address-line2"
            />
          </div>
          <UiVeeInput name="city" label="City" autocomplete="address-level2" />

          <UiVeeSelect
            v-if="config.regions.length"
            :key="`region-${country}`"
            name="region"
            :label="config.regionLabel"
          >
            <option value="" disabled>Select</option>
            <option v-for="region in config.regions" :key="region" :value="region">
              {{ region }}
            </option>
          </UiVeeSelect>
          <UiVeeInput
            v-else
            :key="`region-text-${country}`"
            name="region"
            :label="`${config.regionLabel} (optional)`"
            autocomplete="address-level1"
          />

          <UiVeeInput
            :key="`postal-${country}`"
            name="postal"
            :label="config.postalLabel"
            :placeholder="config.postalExample"
            autocomplete="postal-code"
          />
          <UiVeeInput
            name="phone"
            label="Phone (optional)"
            type="tel"
            placeholder="+1 555 123 4567"
            autocomplete="tel"
          />
          <div class="sm:col-span-2">
            <UiVeeTextarea
              name="notes"
              label="Delivery notes (optional)"
              placeholder="Leave it with the front desk"
              :rows="3"
            />
          </div>
          <UiVeeCheckbox
            name="save"
            label="Save this address for next time"
            class="sm:col-span-2"
          />
          <UiButton type="submit" size="lg" class="w-full sm:col-span-2" :loading="isSubmitting">
            Save and continue
          </UiButton>
        </form>
      </div>

      <div v-else role="status">
        <span
          class="grid size-12 place-items-center rounded-full bg-green-500/15 text-green-600 dark:text-green-400"
        >
          <Icon name="lucide:map-pin-check" class="size-6" />
        </span>
        <h1 class="mt-4 text-2xl font-bold tracking-tight">Address saved</h1>
        <address class="text-muted-foreground mt-3 text-sm leading-relaxed not-italic">
          {{ values.firstName }} {{ values.lastName }}<br />
          {{ values.address }}<template v-if="values.address2">, {{ values.address2 }}</template
          ><br />
          {{ values.city }}<template v-if="values.region">, {{ values.region }}</template>
          {{ values.postal }}<br />
          {{ config.name }}
        </address>
        <UiButton variant="outline" class="mt-6" @click="saved = false">Edit address</UiButton>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  import { object, string } from "yup";

  type CountryConfig = {
    name: string;
    regionLabel: string;
    /** Leave empty to show a free text field instead of a select. */
    regions: string[];
    postalLabel: string;
    postalExample: string;
    postalPattern: RegExp;
    postalMessage: string;
  };

  const props = withDefaults(
    defineProps<{
      /** Country configs keyed by ISO code. Add your own markets. */
      countries?: Record<string, CountryConfig>;
    }>(),
    {
      countries: () => ({
        US: {
          name: "United States",
          regionLabel: "State",
          regions: [
            "California",
            "Colorado",
            "Florida",
            "Illinois",
            "New York",
            "Texas",
            "Washington",
          ],
          postalLabel: "ZIP code",
          postalExample: "94103",
          postalPattern: /^\d{5}(-\d{4})?$/,
          postalMessage: "Enter a valid ZIP code, like 94103",
        },
        CA: {
          name: "Canada",
          regionLabel: "Province",
          regions: ["Alberta", "British Columbia", "Manitoba", "Ontario", "Quebec"],
          postalLabel: "Postal code",
          postalExample: "M5V 2T6",
          postalPattern: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
          postalMessage: "Enter a valid postal code, like M5V 2T6",
        },
        GB: {
          name: "United Kingdom",
          regionLabel: "County",
          regions: [],
          postalLabel: "Postcode",
          postalExample: "SW1A 1AA",
          postalPattern: /^[A-Za-z]{1,2}\d[A-Za-z\d]? ?\d[A-Za-z]{2}$/,
          postalMessage: "Enter a valid postcode, like SW1A 1AA",
        },
        AU: {
          name: "Australia",
          regionLabel: "State or territory",
          regions: [
            "New South Wales",
            "Queensland",
            "South Australia",
            "Victoria",
            "Western Australia",
          ],
          postalLabel: "Postcode",
          postalExample: "2000",
          postalPattern: /^\d{4}$/,
          postalMessage: "Enter a 4 digit postcode",
        },
      }),
    }
  );

  const saved = ref(false);
  const country = ref(Object.keys(props.countries)[0]!);
  const config = computed(() => props.countries[country.value]!);

  // The schema is rebuilt for the chosen country.
  const schema = computed(() =>
    object({
      country: string().required(),
      firstName: string().required().label("First name"),
      lastName: string().required().label("Last name"),
      address: string().required().label("Address"),
      city: string().required().label("City"),
      region: config.value.regions.length
        ? string().required(`Select a ${config.value.regionLabel.toLowerCase()}`)
        : string().optional(),
      postal: string()
        .required()
        .matches(config.value.postalPattern, config.value.postalMessage)
        .label(config.value.postalLabel),
    })
  );

  const { handleSubmit, isSubmitting, values, setFieldValue, resetField } = useForm({
    validationSchema: schema,
    initialValues: { country: country.value, region: "" },
  });

  watch(
    () => values.country,
    (next) => {
      if (!next || next === country.value) return;
      country.value = next;
      setFieldValue("region", "");
      resetField("postal");
    }
  );

  // Replace the timeout with a request that saves the address.
  const submit = handleSubmit(async () => {
    await new Promise((resolve) => setTimeout(resolve, 700));
    saved.value = true;
  });
</script>
