<template>
  <!--
    Import your data
    Features: Source cards for CSV, spreadsheet and another app, a dropzone for CSV files that parses the header row, a preview table of the first rows, column mapping selects and an import button with a loading state
  -->
  <UiContainer class="py-16 lg:py-24">
    <div class="mx-auto max-w-3xl">
      <h1 class="text-3xl font-bold tracking-tight">Import your data</h1>
      <p class="text-muted-foreground mt-2">
        Start with a CSV file. Nothing leaves your browser until you import.
      </p>

      <div v-if="!rows.length" class="mt-8 grid gap-4">
        <UiDropfile
          :multiple="false"
          accept=".csv,text/csv"
          title="Click to upload or drag a CSV file here"
          subtext="First row should contain column names"
          @dropped="onFiles"
        />
        <UiButton variant="outline" class="w-fit" @click="loadSample">
          <Icon name="lucide:file-spreadsheet" class="size-4" />
          Use a sample file
        </UiButton>
      </div>

      <template v-else>
        <div
          class="bg-muted/50 mt-8 flex items-center justify-between gap-3 rounded-lg border p-3 text-sm"
        >
          <span class="flex items-center gap-2">
            <Icon name="lucide:file-spreadsheet" class="size-4" />
            {{ fileName }} · {{ rows.length }} rows
          </span>
          <UiButton variant="ghost" size="sm" @click="clear">Choose another</UiButton>
        </div>

        <h2 class="mt-8 font-semibold">Match your columns</h2>
        <div class="mt-3 grid gap-3 sm:grid-cols-2">
          <div v-for="field in fields" :key="field" class="grid gap-1.5">
            <UiLabel :for="`map-${field}`">{{ field }}</UiLabel>
            <UiNativeSelect :id="`map-${field}`" v-model="mapping[field]">
              <option value="">Do not import</option>
              <option v-for="column in headers" :key="column" :value="column">{{ column }}</option>
            </UiNativeSelect>
          </div>
        </div>

        <h2 class="mt-8 font-semibold">Preview</h2>
        <div class="mt-3 overflow-hidden rounded-xl border">
          <UiTable>
            <UiTableHeader>
              <UiTableRow>
                <UiTableHead v-for="field in mappedFields" :key="field">{{ field }}</UiTableHead>
              </UiTableRow>
            </UiTableHeader>
            <UiTableBody>
              <UiTableRow v-for="(row, index) in rows.slice(0, 3)" :key="index">
                <UiTableCell v-for="field in mappedFields" :key="field">
                  {{ row[headers.indexOf(mapping[field]!)] }}
                </UiTableCell>
              </UiTableRow>
              <UiTableEmpty v-if="!mappedFields.length" :colspan="1"
                >Map at least one column.</UiTableEmpty
              >
            </UiTableBody>
          </UiTable>
        </div>

        <div class="mt-8 flex justify-end">
          <UiButton :disabled="!mappedFields.length || loading" @click="runImport">
            <UiLoader v-if="loading" />
            Import {{ rows.length }} rows
          </UiButton>
        </div>
      </template>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  const fields = ["Name", "Email", "Company"];
  const sample = `Full name,Work email,Organisation,Notes
Hannah Lee,hannah@globex.example,Globex,VIP
Marco Rossi,marco@initech.example,Initech,Trial
Priya Nair,priya@umbrella.example,Umbrella Labs,
Lukas Meyer,lukas@hooli.example,Hooli,Referral`;

  const fileName = ref("");
  const headers = ref<string[]>([]);
  const rows = ref<string[][]>([]);
  const mapping = reactive<Record<string, string>>({ Name: "", Email: "", Company: "" });
  const loading = ref(false);

  function parse(text: string, name: string) {
    const lines = text.split(/\r?\n/).filter((line) => line.trim());
    if (lines.length < 2) {
      useSonner.error("That file needs a header row and at least one row of data");
      return;
    }
    headers.value = lines[0]!.split(",").map((cell) => cell.trim());
    rows.value = lines.slice(1).map((line) => line.split(",").map((cell) => cell.trim()));
    fileName.value = name;
    // Guess a sensible mapping from the header names.
    for (const field of fields) {
      const guess = headers.value.find((column) =>
        column.toLowerCase().includes(field.toLowerCase())
      );
      mapping[field] = guess ?? "";
    }
    mapping.Company ||= headers.value.find((column) => /org|company/i.test(column)) ?? "";
  }

  async function onFiles(files: File[]) {
    const file = files[0];
    if (!file) return;
    parse(await file.text(), file.name);
  }

  function loadSample() {
    parse(sample, "contacts-sample.csv");
  }

  function clear() {
    rows.value = [];
    headers.value = [];
    fileName.value = "";
  }

  const mappedFields = computed(() => fields.filter((field) => mapping[field]));

  async function runImport() {
    loading.value = true;
    await new Promise((resolve) => setTimeout(resolve, 700));
    loading.value = false;
    useSonner.success(`Imported ${rows.value.length} rows`);
    clear();
  }
</script>
