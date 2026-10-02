import { queryCollection } from "@nuxt/content/server";
import Fuse from "fuse.js";
import blockRegistry from "~~/server/utils/block-examples";
import componentRegistry from "~~/server/utils/comp";

export type PackageManager = "npm" | "pnpm" | "yarn" | "bun";
export type LibraryKind = "component" | "block";

type ComponentRecord = (typeof componentRegistry)[number];
type BlockRecord = (typeof blockRegistry)[number];

export type DependencySummary = {
  uiThingComponents: number;
  npmDependencies: number;
  devDependencies: number;
  nuxtModules: number;
  composables: number;
  plugins: number;
  utils: number;
};

export type LibrarySummary = {
  kind: LibraryKind;
  name: string;
  value: string;
  description: string | null;
  docsPath: string | null;
  category: string;
  dependencySummary: DependencySummary;
  sourcePath: string | null;
};

export type DocumentationPageSummary = {
  title: string;
  description: string | null;
  path: string;
  section: string;
  label: string | null;
};

export type InstallPlan = {
  packageManager: PackageManager;
  requestedItems: string[];
  resolvedItems: Array<{
    kind: LibraryKind;
    name: string;
    value: string;
    docsPath: string | null;
  }>;
  missingItems: string[];
  uiThingComponents: string[];
  npmDependencies: string[];
  devDependencies: string[];
  nuxtModules: string[];
  composables: string[];
  plugins: string[];
  utils: string[];
  commands: {
    installDependencies: string | null;
    installDevDependencies: string | null;
    addNuxtModules: string | null;
    addComponents: string | null;
  };
};

type DependencyAccumulator = {
  uiThingComponents: Set<string>;
  npmDependencies: Set<string>;
  devDependencies: Set<string>;
  nuxtModules: Set<string>;
  composables: Set<string>;
  plugins: Set<string>;
  utils: Set<string>;
  processedComponents: Set<string>;
  unresolvedComponents: Set<string>;
};

type PageSectionPlan = {
  id: string;
  title: string;
  query: string;
  categories?: string[];
  componentValues?: string[];
};

type FormPreset = {
  title: string;
  description: string;
  fields: string[];
  componentValues: string[];
};

const EMPTY_DEPENDENCY_SUMMARY: DependencySummary = {
  uiThingComponents: 0,
  npmDependencies: 0,
  devDependencies: 0,
  nuxtModules: 0,
  composables: 0,
  plugins: 0,
  utils: 0,
};

const PACKAGE_MANAGER_COMMANDS: Record<
  PackageManager,
  {
    install: string;
    installDev: string;
    dlx: string;
    moduleAdd: string;
  }
> = {
  npm: {
    install: "npm install",
    installDev: "npm install -D",
    dlx: "npx",
    moduleAdd: "npx nuxi@latest module add",
  },
  pnpm: {
    install: "pnpm add",
    installDev: "pnpm add -D",
    dlx: "pnpm dlx",
    moduleAdd: "pnpm dlx nuxi@latest module add",
  },
  yarn: {
    install: "yarn add",
    installDev: "yarn add -D",
    dlx: "yarn dlx",
    moduleAdd: "yarn dlx nuxi@latest module add",
  },
  bun: {
    install: "bun add",
    installDev: "bun add -d",
    dlx: "bunx",
    moduleAdd: "bunx nuxi@latest module add",
  },
};

const COMPONENT_CATEGORY_GROUPS: Array<{ category: string; values: string[] }> = [
  {
    category: "forms",
    values: [
      "autocomplete",
      "checkbox",
      "combobox",
      "currency-input",
      "date-field",
      "datepicker",
      "dropfile",
      "field",
      "form",
      "input",
      "input-group",
      "label",
      "listbox",
      "number-field",
      "pin-input",
      "radio-group",
      "rating",
      "select",
      "native-select",
      "slider",
      "switch",
      "tags-input",
      "textarea",
      "vee-checkbox",
      "vee-native-checkbox",
      "vee-currency-input",
      "vee-date-field",
      "vee-datepicker",
      "vee-file-input",
      "vee-input",
      "vee-multi-select",
      "vee-number-field",
      "vee-pin-input",
      "vee-radio-group",
      "vee-select",
      "vee-tags-input",
      "vee-textarea",
      "vee-vue-form-slider",
    ],
  },
  {
    category: "navigation",
    values: [
      "breadcrumbs",
      "command",
      "context-menu",
      "dropdown-menu",
      "item",
      "menubar",
      "nav",
      "navbar",
      "navigation-menu",
      "pagination",
      "scrollspy",
      "sidebar",
      "stepper",
      "tabs",
      "timeline",
      "tree",
    ],
  },
  {
    category: "overlay",
    values: [
      "alert-dialog",
      "dialog",
      "drawer",
      "hover-card",
      "popover",
      "sheet",
      "sonner",
      "tooltip",
    ],
  },
  {
    category: "data-display",
    values: [
      "accordion",
      "alert",
      "animated-tooltip",
      "apexcharts",
      "aspect-ratio",
      "avatar",
      "badge",
      "calendar",
      "card",
      "carousel",
      "chip",
      "collapsible",
      "datatable",
      "description-list",
      "divider",
      "empty",
      "heading",
      "icon",
      "kbd",
      "list",
      "loader",
      "placeholder",
      "progress",
      "qrcode",
      "scroll-area",
      "separator",
      "skeleton",
      "splitter",
      "table",
      "toggle",
      "toggle-group",
    ],
  },
  {
    category: "goodies",
    values: ["color-picker", "draggable", "editable", "fancy-icon", "flip-clock", "iframe-lazy"],
  },
];

const BLOCK_DOC_PATHS: Array<{ test: (path: string) => boolean; docsPath: string | null }> = [
  { test: (path) => path.startsWith("App/EmptyState/"), docsPath: "/blocks/app-empty-state" },
  { test: (path) => path.startsWith("App/Header/"), docsPath: "/blocks/app-header" },
  { test: (path) => path.startsWith("App/Sidebar/"), docsPath: "/blocks/app-sidebar" },
  { test: (path) => path.startsWith("App/Stats/"), docsPath: "/blocks/app-stats" },
  { test: (path) => path.startsWith("Blog/Page/"), docsPath: "/blocks/blog-page" },
  { test: (path) => path.startsWith("Blog/Post/"), docsPath: "/blocks/blog-post-card" },
  { test: (path) => path.startsWith("Blog/Section/"), docsPath: "/blocks/blog-section" },
  { test: (path) => path.startsWith("Blog/Subscribe/"), docsPath: "/blocks/blog-subscribe" },
  { test: (path) => path.startsWith("Contact/Header/"), docsPath: "/blocks/contact-header" },
  { test: (path) => path.startsWith("ForgotPassword/"), docsPath: "/blocks/forgot-reset-password" },
  { test: (path) => path.startsWith("OTP/"), docsPath: "/blocks/forgot-reset-password" },
  { test: (path) => path.startsWith("ResetPassword/"), docsPath: "/blocks/forgot-reset-password" },
  { test: (path) => path.startsWith("Sidebar/"), docsPath: "/blocks/sidebar" },
];

const CHART_DOC_PATHS: Array<{ keyword: string; docsPath: string }> = [
  { keyword: "bar", docsPath: "/apex-charts/bar" },
  { keyword: "line", docsPath: "/apex-charts/line" },
  { keyword: "donut", docsPath: "/apex-charts/pie-donut" },
  { keyword: "pie", docsPath: "/apex-charts/pie-donut" },
  { keyword: "radar", docsPath: "/apex-charts/radar" },
  { keyword: "radial", docsPath: "/apex-charts/radial" },
];

const PAGE_PRESETS: Record<
  string,
  { title: string; description: string; sections: PageSectionPlan[] }
> = {
  landing: {
    title: "Landing page",
    description: "Marketing page with a strong narrative arc from hero to conversion.",
    sections: [
      { id: "hero", title: "Hero", query: "hero", categories: ["Hero", "HeaderSection"] },
      { id: "features", title: "Features", query: "features", categories: ["Feature"] },
      {
        id: "social-proof",
        title: "Social proof",
        query: "social proof",
        categories: ["SocialProof", "Testimony"],
      },
      { id: "pricing", title: "Pricing", query: "pricing", categories: ["Pricing"] },
      { id: "cta", title: "CTA", query: "call to action", categories: ["CTA"] },
      { id: "footer", title: "Footer", query: "footer", categories: ["Footer"] },
    ],
  },
  dashboard: {
    title: "Dashboard",
    description: "Application shell with navigation, app chrome, stats, and data-heavy content.",
    sections: [
      { id: "sidebar", title: "Sidebar", query: "app sidebar" },
      { id: "header", title: "Header", query: "app header" },
      { id: "stats", title: "Stats", query: "app stats", categories: ["Stats", "Metric"] },
      {
        id: "data",
        title: "Data views",
        query: "datatable chart",
        componentValues: ["datatable", "apexcharts", "tabs", "card", "button"],
      },
    ],
  },
  auth: {
    title: "Authentication",
    description: "Entry, recovery, and account creation flows for product access.",
    sections: [
      { id: "login", title: "Login", query: "login", categories: ["Login"] },
      { id: "signup", title: "Sign up", query: "sign up", categories: ["SignUp"] },
      {
        id: "recovery",
        title: "Recovery",
        query: "forgot password otp reset password",
        categories: ["ForgotPassword", "OTP", "ResetPassword"],
      },
    ],
  },
  docs: {
    title: "Documentation",
    description: "Docs layout with sidebar navigation and right-rail TOC.",
    sections: [
      {
        id: "shell",
        title: "Docs shell",
        query: "sidebar navigation header",
        componentValues: ["sidebar", "scrollspy", "breadcrumbs", "container", "card"],
      },
      {
        id: "content",
        title: "Content components",
        query: "docs content",
        componentValues: ["heading", "separator"],
      },
    ],
  },
  pricing: {
    title: "Pricing page",
    description: "Commercial pricing narrative with plans, FAQ, and conversion CTA.",
    sections: [
      { id: "header", title: "Header", query: "pricing hero", categories: ["HeaderSection"] },
      { id: "plans", title: "Plans", query: "pricing", categories: ["Pricing"] },
      { id: "faq", title: "FAQ", query: "faq", categories: ["FAQ"] },
      { id: "cta", title: "CTA", query: "cta", categories: ["CTA"] },
    ],
  },
  about: {
    title: "About page",
    description: "Company story, team, values, and supporting proof.",
    sections: [
      { id: "story", title: "Story", query: "about story", categories: ["About"] },
      { id: "team", title: "Team", query: "team", categories: ["Team"] },
      { id: "proof", title: "Proof", query: "social proof", categories: ["SocialProof"] },
      { id: "footer", title: "Footer", query: "footer", categories: ["Footer"] },
    ],
  },
  contact: {
    title: "Contact page",
    description: "Contact details, office context, and a clean form path.",
    sections: [
      { id: "header", title: "Contact header", query: "contact header" },
      {
        id: "form",
        title: "Contact form",
        query: "contact form",
        componentValues: ["form", "vee-input", "vee-textarea", "button", "card"],
      },
      { id: "faq", title: "FAQ", query: "faq", categories: ["FAQ"] },
    ],
  },
  custom: {
    title: "Custom page",
    description: "Flexible starting point driven by the requested sections.",
    sections: [],
  },
};

const FORM_PRESETS: Record<string, FormPreset> = {
  login: {
    title: "Login form",
    description: "Simple sign-in flow with strong validation and clear recovery path.",
    fields: ["email", "password"],
    componentValues: ["form", "vee-input", "button", "card", "alert"],
  },
  signup: {
    title: "Sign up form",
    description: "Account creation with identity fields, consent, and password confirmation.",
    fields: ["name", "email", "password", "confirm-password", "checkbox"],
    componentValues: ["form", "vee-input", "vee-checkbox", "button", "card", "alert"],
  },
  contact: {
    title: "Contact form",
    description: "Lead capture or support flow with concise inputs and message body.",
    fields: ["name", "email", "message"],
    componentValues: ["form", "vee-input", "vee-textarea", "button", "card", "alert"],
  },
  settings: {
    title: "Settings form",
    description: "Profile or account settings with mixed field types and save feedback.",
    fields: ["name", "email", "select", "switch"],
    componentValues: ["form", "vee-input", "vee-select", "switch", "button", "card", "alert"],
  },
  checkout: {
    title: "Checkout form",
    description: "Purchase flow with contact, address, and payment-related fields.",
    fields: ["name", "email", "select", "textarea", "checkbox"],
    componentValues: ["form", "vee-input", "vee-select", "vee-textarea", "button", "card", "alert"],
  },
  survey: {
    title: "Survey form",
    description: "Response-heavy form with ratings, choice inputs, and freeform answers.",
    fields: ["radio", "checkbox", "textarea", "rating"],
    componentValues: [
      "form",
      "vee-radio-group",
      "vee-checkbox",
      "vee-textarea",
      "rating",
      "button",
    ],
  },
  custom: {
    title: "Custom form",
    description: "Flexible form plan shaped around the requested field list.",
    fields: [],
    componentValues: ["form", "button", "alert"],
  },
};

export const PAGE_TEMPLATE_INDEX = [
  {
    id: "landing-marketing",
    name: "Landing / Marketing",
    category: "marketing",
    description: "Hero-led marketing page with features, proof, pricing, and CTA.",
    blockCount: 6,
    componentCount: 4,
  },
  {
    id: "dashboard-app",
    name: "Dashboard / App Shell",
    category: "application",
    description: "Sidebar + header + stats + data views for an authenticated app.",
    blockCount: 3,
    componentCount: 5,
  },
  {
    id: "contact-page",
    name: "Contact Page",
    category: "content",
    description: "Contact route with form, support details, and FAQ support.",
    blockCount: 2,
    componentCount: 5,
  },
  {
    id: "pricing-page",
    name: "Pricing Page",
    category: "marketing",
    description: "Plan comparison with FAQ and CTA close.",
    blockCount: 4,
    componentCount: 4,
  },
  {
    id: "about-page",
    name: "About Page",
    category: "content",
    description: "Company story with team and proof sections.",
    blockCount: 4,
    componentCount: 4,
  },
  {
    id: "documentation-page",
    name: "Documentation Page",
    category: "docs",
    description: "Sidebar docs shell with TOC patterns.",
    blockCount: 0,
    componentCount: 5,
  },
  {
    id: "auth-flow",
    name: "Authentication Flow",
    category: "application",
    description: "Login, sign-up, and password recovery surfaces.",
    blockCount: 3,
    componentCount: 5,
  },
];

function slugify(value: string) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[_\s]+/g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

function normalizeQuery(value: string) {
  return value.trim().toLowerCase();
}

function normalizePath(path?: string | null) {
  if (!path) return null;
  return path.startsWith("/") ? path : `/${path}`;
}

function uniqueSorted(values: Iterable<string>) {
  return [...new Set([...values].filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

function toDependencySummary(partial?: Partial<DependencySummary>) {
  return {
    ...EMPTY_DEPENDENCY_SUMMARY,
    ...partial,
  };
}

function getComponentCategory(value: string) {
  const match = COMPONENT_CATEGORY_GROUPS.find((group) => group.values.includes(value));
  return match?.category ?? "general";
}

export function getBlockDocsPath(block: BlockRecord) {
  const path = block.path.replace(/\.vue$/, "");

  for (const entry of BLOCK_DOC_PATHS) {
    if (entry.test(path)) {
      return entry.docsPath;
    }
  }

  if (path.startsWith("Chart/")) {
    const lower = block.fileName.toLowerCase();
    const chartMatch = CHART_DOC_PATHS.find((entry) => lower.includes(entry.keyword));
    return chartMatch?.docsPath ?? null;
  }

  const [segment] = path.split("/");
  const docSlugMap: Record<string, string> = {
    About: "about",
    Banner: "banner",
    CTA: "cta",
    Career: "career",
    Error: "error",
    FAQ: "faq",
    Feature: "features",
    Footer: "footer",
    HeaderSection: "header-section",
    Hero: "hero",
    Login: "login",
    Metric: "metric",
    Navigation: "navigation",
    Newsletter: "newsletter",
    Pricing: "pricing",
    SignUp: "sign-up",
    SocialProof: "social-proof",
    Team: "team",
    Testimony: "testimony",
    Tiptap: "tip-tap",
  };

  const slug = docSlugMap[segment];
  return slug ? `/blocks/${slug}` : null;
}

export function summarizeComponent(component: ComponentRecord): LibrarySummary {
  return {
    kind: "component",
    name: component.name,
    value: component.value,
    description: component.description ?? null,
    docsPath: normalizePath(component.docsPath),
    category: getComponentCategory(component.value),
    dependencySummary: toDependencySummary({
      npmDependencies: component.deps?.filter((dep: string) => dep.startsWith("npm:")).length ?? 0,
      devDependencies: component.devDeps?.length ?? 0,
      nuxtModules: component.nuxtModules?.length ?? 0,
      composables: component.composables?.length ?? 0,
      plugins: component.plugins?.length ?? 0,
      utils: component.utils?.length ?? 0,
    }),
    sourcePath: component.files?.[0]?.fileName ?? null,
  };
}

export function summarizeBlock(block: BlockRecord): LibrarySummary {
  return {
    kind: "block",
    name: block.name,
    value: block.fileName.replace(/\.vue$/, ""),
    description: `${block.category} block`,
    docsPath: getBlockDocsPath(block),
    category: slugify(block.category),
    dependencySummary: toDependencySummary({
      uiThingComponents: block.components?.length ?? 0,
    }),
    sourcePath: block.path ?? null,
  };
}

export function listComponentSummaries() {
  return componentRegistry.map(summarizeComponent);
}

export function listBlockSummaries() {
  return blockRegistry.map(summarizeBlock);
}

/**
 * Collapses a component identifier so `vee-input`, `veeinput`, `VeeInput` and `Vee Input` all
 * compare equal. Current block metadata stores canonical registry values, while this normalization
 * keeps lookup compatible with older generated metadata and user input.
 */
function collapseIdentifier(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

/** Tag names that do not collapse to a registry value. */
const COMPONENT_TAG_ALIASES: Record<string, string> = {
  apexchart: "apexcharts",
};

const componentsByIdentifier = new Map<string, ComponentRecord>(
  componentRegistry.flatMap((component) =>
    [component.value, component.name].map(
      (identifier) => [collapseIdentifier(identifier), component] as const
    )
  )
);

export function findComponent(query: string) {
  const normalized = collapseIdentifier(normalizeQuery(query).replace(/^u[-_]*i[-_]*/i, ""));

  return componentsByIdentifier.get(COMPONENT_TAG_ALIASES[normalized] ?? normalized);
}

/**
 * Resolves canonical block metadata and remains compatible with older metadata that stored raw
 * `Ui*` tag names. Sub-parts such as `UiCardContent` or `UiDropdownMenuItem` ship with their parent
 * component, so fall back to the longest registry value the tag starts with.
 */
function findComponentForTag(tag: string) {
  const exact = findComponent(tag);

  if (exact) {
    return exact;
  }

  const normalized = collapseIdentifier(tag);
  let match: ComponentRecord | undefined;
  let matchLength = 0;

  for (const [identifier, component] of componentsByIdentifier) {
    if (identifier.length > matchLength && normalized.startsWith(identifier)) {
      match = component;
      matchLength = identifier.length;
    }
  }

  return match;
}

export function findBlock(query: string) {
  const normalized = normalizeQuery(query);

  return blockRegistry.find((block) => {
    const fileName = block.fileName.replace(/\.vue$/, "");
    return (
      normalizeQuery(block.name) === normalized ||
      normalizeQuery(fileName) === normalized ||
      normalizeQuery(block.path.replace(/\.vue$/, "")) === normalized
    );
  });
}

function createDependencyAccumulator(): DependencyAccumulator {
  return {
    uiThingComponents: new Set<string>(),
    npmDependencies: new Set<string>(),
    devDependencies: new Set<string>(),
    nuxtModules: new Set<string>(),
    composables: new Set<string>(),
    plugins: new Set<string>(),
    utils: new Set<string>(),
    processedComponents: new Set<string>(),
    unresolvedComponents: new Set<string>(),
  };
}

function addStringDependencies(target: Set<string>, values?: Array<string | null | undefined>) {
  values?.filter(Boolean).forEach((value) => target.add(value as string));
}

function collectComponentDependencies(component: ComponentRecord, acc: DependencyAccumulator) {
  const key = collapseIdentifier(component.value);

  if (acc.processedComponents.has(key)) {
    return;
  }

  acc.processedComponents.add(key);
  acc.uiThingComponents.add(component.value);

  // `deps` holds npm packages. Nuxt modules are listed here too, but they are installed with the
  // module command, so keep them out of the npm install command.
  component.deps?.forEach((dep: string) => {
    if (!component.nuxtModules?.includes(dep)) {
      acc.npmDependencies.add(dep.replace(/^npm:/, ""));
    }
  });

  // `components` holds other UI Thing components this one imports.
  component.components?.forEach((value: string) => {
    const dependencyComponent = findComponent(value);

    if (dependencyComponent) {
      collectComponentDependencies(dependencyComponent, acc);
      return;
    }

    acc.unresolvedComponents.add(value);
  });

  addStringDependencies(acc.devDependencies, component.devDeps);
  addStringDependencies(acc.nuxtModules, component.nuxtModules);
  component.composables?.forEach(
    (entry: any) => entry?.fileName && acc.composables.add(entry.fileName)
  );
  component.plugins?.forEach((entry: any) => entry?.fileName && acc.plugins.add(entry.fileName));
  component.utils?.forEach((entry: any) => entry?.fileName && acc.utils.add(entry.fileName));
}

function collectBlockDependencies(block: BlockRecord, acc: DependencyAccumulator) {
  block.components?.forEach((tag) => {
    const component = findComponentForTag(tag);

    if (component) {
      collectComponentDependencies(component, acc);
      return;
    }

    acc.unresolvedComponents.add(tag);
  });
}

export function buildInstallPlan(
  requestedItems: string[],
  packageManager: PackageManager = "npm"
): InstallPlan {
  const commands = PACKAGE_MANAGER_COMMANDS[packageManager];
  const acc = createDependencyAccumulator();
  const missingItems: string[] = [];
  const resolvedItems: InstallPlan["resolvedItems"] = [];

  requestedItems.forEach((item) => {
    const component = findComponent(item);

    if (component) {
      collectComponentDependencies(component, acc);
      resolvedItems.push({
        kind: "component",
        name: component.name,
        value: component.value,
        docsPath: normalizePath(component.docsPath),
      });
      return;
    }

    const block = findBlock(item);

    if (block) {
      collectBlockDependencies(block, acc);
      resolvedItems.push({
        kind: "block",
        name: block.name,
        value: block.fileName.replace(/\.vue$/, ""),
        docsPath: getBlockDocsPath(block),
      });
      return;
    }

    missingItems.push(item);
  });

  // Dependencies that could not be mapped to a registry component are reported instead of being
  // emitted into the add command, where the CLI would reject them.
  missingItems.push(...uniqueSorted(acc.unresolvedComponents));

  const npmDependencies = uniqueSorted(acc.npmDependencies);
  const devDependencies = uniqueSorted(acc.devDependencies);
  const nuxtModules = uniqueSorted(acc.nuxtModules);
  const uiThingComponents = uniqueSorted(acc.uiThingComponents);

  return {
    packageManager,
    requestedItems,
    resolvedItems,
    missingItems,
    uiThingComponents,
    npmDependencies,
    devDependencies,
    nuxtModules,
    composables: uniqueSorted(acc.composables),
    plugins: uniqueSorted(acc.plugins),
    utils: uniqueSorted(acc.utils),
    commands: {
      installDependencies:
        npmDependencies.length > 0 ? `${commands.install} ${npmDependencies.join(" ")}` : null,
      installDevDependencies:
        devDependencies.length > 0 ? `${commands.installDev} ${devDependencies.join(" ")}` : null,
      addNuxtModules:
        nuxtModules.length > 0 ? `${commands.moduleAdd} ${nuxtModules.join(" ")}` : null,
      addComponents:
        uiThingComponents.length > 0
          ? `${commands.dlx} ui-thing@latest add ${uiThingComponents.join(" ")}`
          : null,
    },
  };
}

export function searchLibrary(
  query: string,
  type: "all" | LibraryKind = "all",
  limit = 10
): Array<
  LibrarySummary & {
    relevance: number;
  }
> {
  const indexes = [
    ...(type === "all" || type === "component" ? listComponentSummaries() : []),
    ...(type === "all" || type === "block" ? listBlockSummaries() : []),
  ];

  const fuse = new Fuse(indexes, {
    keys: ["name", "value", "description", "docsPath", "category", "sourcePath"],
    threshold: 0.35,
    includeScore: true,
  });

  return fuse
    .search(query)
    .slice(0, limit)
    .map((result) => ({
      ...result.item,
      relevance: result.score ? 1 - result.score : 1,
    }));
}

export function resolveLibraryItem(query: string, type: "all" | LibraryKind = "all") {
  const exact =
    (type === "all" || type === "component" ? findComponent(query) : null) ??
    (type === "all" || type === "block" ? findBlock(query) : null);

  if (exact) {
    if ("docsPath" in exact && "value" in exact && "files" in exact) {
      return {
        query,
        exact: true,
        match: summarizeComponent(exact),
        candidates: [summarizeComponent(exact)],
      };
    }

    if ("file" in exact && "category" in exact) {
      return {
        query,
        exact: true,
        match: summarizeBlock(exact),
        candidates: [summarizeBlock(exact)],
      };
    }

    return {
      query,
      exact: true,
    };
  }

  const candidates = searchLibrary(query, type, 5);

  return {
    query,
    exact: false,
    match: candidates[0] ?? null,
    candidates,
  };
}

export async function listDocumentationPages(event: any): Promise<DocumentationPageSummary[]> {
  const pages = await queryCollection(event, "docs")
    .where("extension", "=", "md")
    .select("title", "description", "path", "label")
    .all();

  return pages
    .map((page: any) => ({
      title: page.title,
      description: page.description ?? null,
      path: page.path,
      section: page.path?.split("/")[1] ?? "other",
      label: page.label ?? null,
    }))
    .sort((a, b) => a.path.localeCompare(b.path));
}

export async function searchDocumentationPages(event: any, query: string, limit = 10) {
  const pages = await listDocumentationPages(event);
  const fuse = new Fuse(pages, {
    keys: ["title", "description", "path", "section", "label"],
    threshold: 0.35,
    includeScore: true,
  });

  return fuse
    .search(query)
    .slice(0, limit)
    .map((result) => ({
      ...result.item,
      relevance: result.score ? 1 - result.score : 1,
    }));
}

export async function getDocumentationContext(event: any, docsPath?: string | null) {
  const normalizedPath = normalizePath(docsPath);

  if (!normalizedPath) {
    return null;
  }

  const page = await queryCollection(event, "docs")
    .path(normalizedPath)
    .where("extension", "=", "md")
    .select("title", "description", "path", "label")
    .first();

  if (!page) {
    return null;
  }

  // The raw markdown is served by Nuxt Content's llms feature at `/raw/<path>.md`.
  const documentation = await $fetch<string>(`/raw${normalizedPath}.md`).catch(() => null);

  return {
    page: {
      title: page.title,
      description: page.description ?? null,
      path: page.path,
      label: page.label ?? null,
      section: page.path?.split("/")[1] ?? "other",
    },
    markdown: documentation,
  };
}

export async function buildComponentDetail(event: any, component: ComponentRecord) {
  const docsPath = normalizePath(component.docsPath);
  const documentation = await getDocumentationContext(event, docsPath);
  const installPlan = buildInstallPlan([component.value]);

  return {
    kind: "component" as const,
    name: component.name,
    value: component.value,
    docsPath,
    documentation: documentation?.markdown ?? null,
    documentationPage: documentation?.page ?? null,
    documentationUrl: docsPath ? `https://uithing.com${docsPath}` : null,
    source: {
      files: component.files ?? [],
      composables: component.composables ?? [],
      plugins: component.plugins ?? [],
      utils: component.utils ?? [],
    },
    dependencies: {
      uiThingComponents: installPlan.uiThingComponents,
      npmDependencies: installPlan.npmDependencies,
      devDependencies: installPlan.devDependencies,
      nuxtModules: installPlan.nuxtModules,
      composables: installPlan.composables,
      plugins: installPlan.plugins,
      utils: installPlan.utils,
    },
    installPlan,
  };
}

export async function buildBlockDetail(event: any, block: BlockRecord) {
  const docsPath = getBlockDocsPath(block);
  const documentation = await getDocumentationContext(event, docsPath);
  const installPlan = buildInstallPlan([block.fileName.replace(/\.vue$/, "")]);

  return {
    kind: "block" as const,
    name: block.name,
    value: block.fileName.replace(/\.vue$/, ""),
    docsPath,
    documentation: documentation?.markdown ?? null,
    documentationPage: documentation?.page ?? null,
    documentationUrl: docsPath ? `https://uithing.com${docsPath}` : null,
    source: {
      fileName: block.fileName,
      path: block.path,
      fileContent: block.file,
    },
    dependencies: {
      uiThingComponents: installPlan.uiThingComponents,
      npmDependencies: installPlan.npmDependencies,
      devDependencies: installPlan.devDependencies,
      nuxtModules: installPlan.nuxtModules,
      composables: installPlan.composables,
      plugins: installPlan.plugins,
      utils: installPlan.utils,
    },
    installPlan,
  };
}

export function parseCommaList(value?: string | null) {
  if (!value) return [];

  return value
    .split(",")
    .map((entry) => normalizeQuery(entry))
    .filter(Boolean);
}

function getFieldComponent(field: string) {
  const mapping: Record<string, string[]> = {
    email: ["vee-input"],
    password: ["vee-input"],
    "confirm-password": ["vee-input"],
    name: ["vee-input"],
    phone: ["vee-input"],
    message: ["vee-textarea"],
    textarea: ["vee-textarea"],
    select: ["vee-select"],
    checkbox: ["vee-checkbox"],
    radio: ["vee-radio-group"],
    switch: ["switch"],
    date: ["vee-datepicker"],
    calendar: ["vee-datepicker"],
    number: ["vee-number-field"],
    amount: ["vee-currency-input"],
    currency: ["vee-currency-input"],
    file: ["vee-file-input"],
    tags: ["vee-tags-input"],
    otp: ["vee-pin-input"],
    pin: ["vee-pin-input"],
    rating: ["rating"],
  };

  return mapping[field] ?? ["vee-input"];
}

function getFieldValidation(field: string) {
  const rules: Record<string, string> = {
    email: "required + valid email format",
    password: "required + minimum length",
    "confirm-password": "required + matches password",
    name: "required + minimum length",
    phone: "optional or phone format",
    message: "required + minimum length",
    textarea: "required + minimum length",
    select: "required selection",
    checkbox: "boolean or consent requirement",
    radio: "required selection",
    switch: "boolean state",
    date: "required date",
    calendar: "required date",
    number: "required numeric range",
    amount: "currency formatting + numeric range",
    currency: "currency formatting + numeric range",
    file: "file type and size constraints",
    tags: "array length constraints",
    otp: "fixed-length code",
    pin: "fixed-length code",
    rating: "numeric range",
  };

  return rules[field] ?? "required";
}

export function buildPagePlan(pageType: string, sections?: string) {
  const preset = PAGE_PRESETS[pageType] ?? PAGE_PRESETS.custom;
  const requestedSections = parseCommaList(sections);

  const effectiveSections =
    pageType === "custom"
      ? requestedSections.map((section) => ({
          id: slugify(section),
          title: section.replace(/-/g, " "),
          query: section,
        }))
      : preset?.sections;

  const sectionPlans = effectiveSections?.map((section) => {
    const categoryCandidates = section?.categories?.length
      ? listBlockSummaries().filter((block) =>
          section.categories?.map((category) => slugify(category)).includes(block.category)
        )
      : [];

    const blockCandidates =
      categoryCandidates.length > 0
        ? categoryCandidates.slice(0, 3)
        : searchLibrary(section.query, "block", 3);

    const componentCandidates =
      section.componentValues
        ?.map((value) => {
          const component = findComponent(value);
          return component ? summarizeComponent(component) : null;
        })
        .filter(Boolean) ?? [];

    return {
      id: section.id,
      title: section.title,
      query: section.query,
      blocks: blockCandidates,
      components: componentCandidates,
      starterSelection: [
        blockCandidates[0]?.name,
        ...componentCandidates.map((component) => component?.value).filter(Boolean),
      ].filter(Boolean),
    };
  });

  const starterSelection = uniqueSorted(
    sectionPlans.flatMap((section) => section.starterSelection)
  );

  return {
    pageType,
    title: preset.title,
    description: preset.description,
    sectionOrder: sectionPlans.map((section) => section.title),
    sections: sectionPlans,
    installPlan: buildInstallPlan(starterSelection),
  };
}

export function buildFormPlan(formType: string, fields?: string) {
  const preset = FORM_PRESETS[formType] ?? FORM_PRESETS.custom;
  const requestedFields = parseCommaList(fields);
  const effectiveFields =
    requestedFields.length > 0
      ? requestedFields
      : preset.fields.length > 0
        ? preset.fields
        : ["email"];

  const recommendedComponents = uniqueSorted([
    ...preset.componentValues,
    ...effectiveFields.flatMap(getFieldComponent),
  ]);

  return {
    formType,
    title: preset.title,
    description: preset.description,
    fields: effectiveFields.map((field) => ({
      field,
      components: getFieldComponent(field),
      validation: getFieldValidation(field),
    })),
    validationStack: {
      library: "vee-validate",
      schemaOptions: ["yup", "zod"],
      recommended: "yup",
    },
    recommendedComponents,
    installPlan: buildInstallPlan(recommendedComponents),
  };
}

export function buildProjectSetup(projectName = "my-app", packageManager: PackageManager = "npm") {
  const commands = PACKAGE_MANAGER_COMMANDS[packageManager];

  return {
    packageManager,
    projectName,
    framework: "Nuxt 4",
    steps: [
      {
        title: "Create a Nuxt project",
        command: `${commands.dlx} nuxi@latest init ${projectName}`,
      },
      {
        title: "Install project dependencies",
        command:
          packageManager === "npm"
            ? `cd ${projectName} && npm install`
            : packageManager === "pnpm"
              ? `cd ${projectName} && pnpm install`
              : packageManager === "yarn"
                ? `cd ${projectName} && yarn install`
                : `cd ${projectName} && bun install`,
      },
      {
        title: "Initialize UI Thing",
        command: `cd ${projectName} && ${commands.dlx} ui-thing@latest init`,
      },
      {
        title: "Add starter components",
        command: `cd ${projectName} && ${commands.dlx} ui-thing@latest add button card input`,
      },
    ],
    notes: [
      "UI Thing is Nuxt-first and the CLI updates your project config for you.",
      "Component, composable, plugin, and utils files are copied into your app so you can edit them.",
      "Use get-install-plan once you know which components or blocks you want.",
    ],
  };
}
