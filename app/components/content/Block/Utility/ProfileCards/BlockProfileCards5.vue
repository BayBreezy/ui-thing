<template>
  <!--
    Contact card
    Features: Avatar with name and company, phone, email, website and address rows with per row copy buttons, copy all details, download as a vCard file
  -->
  <UiContainer class="py-12 lg:py-20">
    <UiCard class="mx-auto w-full max-w-md">
      <UiCardHeader class="items-center text-center">
        <UiAvatar class="mx-auto size-20">
          <UiAvatarImage :src="contact.avatar" :alt="contact.name" />
          <UiAvatarFallback>{{ contact.name.slice(0, 1) }}</UiAvatarFallback>
        </UiAvatar>
        <UiCardTitle class="mt-3 text-xl">{{ contact.name }}</UiCardTitle>
        <UiCardDescription>{{ contact.title }} at {{ contact.company }}</UiCardDescription>
      </UiCardHeader>

      <UiCardContent>
        <ul class="divide-y rounded-lg border">
          <li v-for="row in rows" :key="row.label" class="flex items-center gap-3 p-3">
            <Icon :name="row.icon" class="text-muted-foreground size-4 shrink-0" />
            <div class="min-w-0 flex-1">
              <p class="text-muted-foreground text-xs">{{ row.label }}</p>
              <p class="truncate text-sm font-medium">{{ row.value }}</p>
            </div>
            <UiButton
              variant="ghost"
              size="icon-sm"
              :aria-label="
                copiedKey === row.label ? `${row.label} copied` : `Copy ${row.label.toLowerCase()}`
              "
              @click="copyRow(row)"
            >
              <Icon
                :name="copiedKey === row.label ? 'lucide:check' : 'lucide:copy'"
                class="size-4"
              />
            </UiButton>
          </li>
        </ul>
        <p class="sr-only" role="status">{{ copiedKey ? `${copiedKey} copied` : "" }}</p>
      </UiCardContent>

      <UiCardFooter class="flex-col gap-2 sm:flex-row">
        <UiButton class="w-full sm:flex-1" @click="download">
          <Icon name="lucide:download" class="size-4" />Save contact
        </UiButton>
        <UiButton variant="outline" class="w-full sm:flex-1" @click="copyAll">
          <Icon :name="copiedKey === 'all' ? 'lucide:check' : 'lucide:copy'" class="size-4" />
          {{ copiedKey === "all" ? "Copied" : "Copy all" }}
        </UiButton>
      </UiCardFooter>
    </UiCard>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Contact = {
    name: string;
    title: string;
    company: string;
    avatar: string;
    phone: string;
    email: string;
    website: string;
    address: string;
  };

  const props = withDefaults(
    defineProps<{
      contact?: Contact;
    }>(),
    {
      contact: () => ({
        name: "Sana Ali",
        title: "Head of Partnerships",
        company: "Fernwood",
        avatar: "https://i.pravatar.cc/160?img=32",
        phone: "+1 555 010 4477",
        email: "sana@fernwood.example.com",
        website: "fernwood.example.com",
        address: "21 Harbour Street, Toronto, ON",
      }),
    }
  );

  const rows = computed(() => [
    { label: "Phone", icon: "lucide:phone", value: props.contact.phone },
    { label: "Email", icon: "lucide:mail", value: props.contact.email },
    { label: "Website", icon: "lucide:globe", value: props.contact.website },
    { label: "Address", icon: "lucide:map-pin", value: props.contact.address },
  ]);

  const copiedKey = ref("");
  const { copy } = useClipboard();
  let timer: ReturnType<typeof setTimeout> | undefined;

  async function flash(key: string, text: string) {
    await copy(text);
    copiedKey.value = key;
    clearTimeout(timer);
    timer = setTimeout(() => (copiedKey.value = ""), 1500);
  }

  const copyRow = (row: { label: string; value: string }) => flash(row.label, row.value);
  const copyAll = () =>
    flash("all", [props.contact.name, ...rows.value.map((row) => row.value)].join("\n"));

  function download() {
    const { name, company, title, phone, email, website, address } = props.contact;
    const card = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${name}`,
      `ORG:${company}`,
      `TITLE:${title}`,
      `TEL:${phone}`,
      `EMAIL:${email}`,
      `URL:https://${website}`,
      `ADR:;;${address};;;;`,
      "END:VCARD",
    ].join("\r\n");
    const url = URL.createObjectURL(new Blob([card], { type: "text/vcard" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `${name.toLowerCase().replace(/\s+/g, "-")}.vcf`;
    link.click();
    URL.revokeObjectURL(url);
    useSonner.success("Contact saved", { description: link.download });
  }

  onBeforeUnmount(() => clearTimeout(timer));
</script>
