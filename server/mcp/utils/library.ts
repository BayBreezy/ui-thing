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
  keywords: string[];
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
  /** Npm packages brought in by UI Thing components. `ui-thing add` installs these itself. */
  npmDependencies: string[];
  /** Npm packages imported directly by blocks. Blocks are copied by hand, so install these yourself. */
  blockNpmDependencies: string[];
  devDependencies: string[];
  nuxtModules: string[];
  /** Modules to list in `nuxt.config` modules by hand because `nuxi module add` cannot install them. */
  nuxtConfigModules: string[];
  composables: string[];
  plugins: string[];
  utils: string[];
  notes: string[];
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
  blockNpmDependencies: Set<string>;
  devDependencies: Set<string>;
  nuxtModules: Set<string>;
  nuxtConfigModules: Set<string>;
  composables: Set<string>;
  plugins: Set<string>;
  utils: Set<string>;
  processedComponents: Set<string>;
  unresolvedComponents: Set<string>;
  notes: Set<string>;
};

type PageSectionPlan = {
  id: string;
  title: string;
  query: string;
  /**
   * Block categories in priority order. Earlier entries win before later ones are considered. An
   * entry containing `/` is a source path prefix (`App/Header/`) for categories whose directory
   * name is shared by unrelated blocks, such as `Header` (app headers and contact headers).
   */
  categories?: string[];
  componentValues?: string[];
  /** Skip block suggestions for sections that are composed from components only. */
  noBlocks?: boolean;
};

type PagePreset = {
  title: string;
  description: string;
  category: "marketing" | "application" | "content" | "docs" | "ai";
  sections: PageSectionPlan[];
  /** Layout and composition guidance that the section list alone cannot express. */
  notes: string[];
  /** Docs pages worth reading before building this page type. */
  readNext?: string[];
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
      "tag-group",
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
      "vee-tag-group",
      "vee-tags-input",
      "vee-textarea",
      "vee-vue-form-slider",
      "vee-autocomplete",
      "vee-combobox",
      "vee-form-builder",
      "vee-password-input",
      "vee-rating",
      "vee-switch",
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
      "code-block",
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
      "trace",
      "avatar-label-group",
      "badge-group",
      "circular-progress",
      "credit-card",
      "marker",
      "tanstacktable",
    ],
  },
  {
    category: "actions",
    values: ["button", "button-group"],
  },
  {
    category: "layout",
    values: ["container", "gradient-divider", "floating-dock"],
  },
  {
    category: "ai",
    values: ["attachment", "bubble", "message", "message-scroller", "questionnaire", "terminal"],
  },
  {
    category: "effects",
    values: [
      "bg-pattern-circle",
      "bg-pattern-grid",
      "bg-pattern-square",
      "border-beam",
      "neon-gradient-card",
      "pointer-highlight",
      "retro-grid",
    ],
  },
  {
    category: "goodies",
    values: ["color-picker", "draggable", "editable", "fancy-icon", "flip-clock", "iframe-lazy"],
  },
];

/**
 * Words people search for that never appear in a component name or doc blurb. `sonner` is a toast
 * library, `dialog` is a modal, and so on. Keys are registry values or block categories.
 */
const SEARCH_KEYWORDS: Record<string, string[]> = {
  accordion: ["faq", "expandable", "collapse"],
  "alert-dialog": ["confirm", "confirmation", "destructive"],
  alert: ["banner", "callout", "notice", "message"],
  apexcharts: ["chart", "graph", "analytics", "plot"],
  avatar: ["profile picture", "user image"],
  badge: ["tag", "label", "status", "pill"],
  breadcrumbs: ["trail", "path"],
  button: ["cta", "action", "submit"],
  calendar: ["date", "schedule"],
  card: ["panel", "tile", "surface"],
  carousel: ["slider", "slideshow", "gallery"],
  checkbox: ["tick", "toggle", "consent"],
  command: ["command palette", "cmdk", "spotlight", "search"],
  "context-menu": ["right click"],
  datatable: ["table", "grid", "spreadsheet", "sorting", "filtering", "pagination"],
  tanstacktable: ["table", "grid", "headless", "sorting", "filtering", "pagination"],
  table: ["rows", "columns", "simple table"],
  datepicker: ["date picker", "calendar input", "date range"],
  dialog: ["modal", "popup", "lightbox"],
  draggable: ["kanban", "sortable", "reorder", "drag and drop", "board"],
  drawer: ["bottom sheet", "mobile sheet"],
  "dropdown-menu": ["dropdown", "menu", "actions menu"],
  dropfile: ["upload", "drag and drop", "file upload"],
  empty: ["empty state", "no results", "zero state"],
  form: ["validation", "vee-validate", "field"],
  input: ["text field", "textbox"],
  "input-group": ["addon", "prefix", "suffix"],
  "navigation-menu": ["mega menu", "navbar", "header nav"],
  navbar: ["header", "top bar", "navigation"],
  pagination: ["pages", "paging"],
  popover: ["popup", "floating panel"],
  progress: ["progress bar", "loading bar"],
  select: ["dropdown", "picker", "choose"],
  separator: ["divider", "hr", "line"],
  sheet: ["side panel", "slide over", "off canvas"],
  sidebar: ["app shell", "side navigation", "drawer"],
  skeleton: ["loading", "placeholder", "shimmer"],
  slider: ["range", "scrubber"],
  sonner: ["toast", "notification", "snackbar"],
  stepper: ["wizard", "steps", "multi step", "onboarding"],
  switch: ["toggle", "on off"],
  tabs: ["tabbed", "segmented"],
  textarea: ["multiline", "message box", "comment"],
  timeline: ["activity", "history", "roadmap"],
  tooltip: ["hint", "hover text"],
  tree: ["file tree", "hierarchy", "nested"],
  message: ["chat", "ai", "conversation"],
  "message-scroller": ["chat", "ai", "conversation", "thread"],
  bubble: ["chat", "ai", "conversation"],
  trace: ["reasoning", "tool call", "agent steps", "chain of thought"],
  "code-block": ["syntax highlighting", "snippet", "shiki"],
  Dashboards: ["admin", "analytics", "overview", "app"],
  Chart: ["graph", "analytics"],
  Sidebar: [
    "app shell",
    "navigation",
    "admin",
    "icon sidebar",
    "inset sidebar",
    "floating sidebar",
    "settings navigation",
    "workspace switcher",
    "chat list",
  ],
  Header: [
    "navbar",
    "top bar",
    "app header",
    "page header",
    "breadcrumbs",
    "profile header",
    "toolbar",
    "sticky header",
  ],
  Navigation: [
    "navbar",
    "header",
    "menu",
    "mega menu",
    "dropdown",
    "sticky header",
    "mobile menu",
    "app navbar",
    "floating navbar",
  ],
  Hero: [
    "landing",
    "above the fold",
    "headline",
    "landing page hero",
    "product tour",
    "email capture",
    "social proof",
    "aurora",
    "bento",
  ],
  HeaderSection: ["page header", "section heading", "title"],
  Feature: ["benefits", "services", "capabilities"],
  Pricing: ["plans", "tiers", "subscription"],
  Newsletter: [
    "subscribe",
    "email signup",
    "email capture",
    "mailing list",
    "waitlist",
    "preferences",
    "two step",
  ],
  Legal: [
    "privacy policy",
    "terms of service",
    "terms of use",
    "terms and conditions",
    "cookie policy",
    "cookie consent",
    "gdpr",
    "ccpa",
    "data request",
    "compliance",
    "policy",
    "agreement",
  ],
  ShopHero: [
    "ecommerce",
    "store hero",
    "shop hero",
    "storefront",
    "sale banner",
    "countdown",
    "promo",
    "featured product",
    "slider",
  ],
  ProductList: [
    "ecommerce",
    "product grid",
    "product listing",
    "catalog",
    "shop",
    "collection",
    "category",
    "filters",
    "sort",
    "wishlist",
    "quick view",
  ],
  ProductDetail: [
    "ecommerce",
    "product page",
    "product detail",
    "pdp",
    "gallery",
    "variants",
    "size picker",
    "color swatch",
    "reviews",
    "add to cart",
    "size guide",
    "bundle",
  ],
  Cart: [
    "ecommerce",
    "shopping cart",
    "cart drawer",
    "mini cart",
    "basket",
    "promo code",
    "free shipping",
    "empty cart",
  ],
  Checkout: [
    "ecommerce",
    "checkout",
    "payment form",
    "credit card",
    "shipping address",
    "delivery method",
    "express checkout",
    "order review",
    "guest checkout",
  ],
  Orders: [
    "ecommerce",
    "order history",
    "order confirmation",
    "order tracking",
    "track order",
    "returns",
    "refund",
    "order detail",
  ],
  TableLists: [
    "data table",
    "table",
    "admin table",
    "users table",
    "team directory",
    "customers",
    "invoices",
    "transactions",
    "api logs",
    "inventory",
    "list view",
  ],
  TableToolbars: [
    "data table",
    "table toolbar",
    "filter",
    "faceted filter",
    "search",
    "column visibility",
    "date range",
    "saved views",
    "density",
    "export",
  ],
  TableSelection: [
    "data table",
    "bulk actions",
    "select all",
    "row actions",
    "inline edit",
    "editable cells",
    "status select",
    "delete confirmation",
    "checkbox table",
  ],
  Checklist: [
    "onboarding",
    "checklist",
    "getting started",
    "setup progress",
    "progress ring",
    "milestones",
    "tips",
    "activation",
    "setup banner",
  ],
  WorkspaceSetup: [
    "onboarding",
    "workspace",
    "create workspace",
    "brand",
    "logo upload",
    "invite teammates",
    "connect integrations",
    "import data",
    "csv import",
    "notification preferences",
  ],
  Wizard: [
    "onboarding",
    "wizard",
    "multi step",
    "stepper",
    "setup flow",
    "review and confirm",
    "modal wizard",
    "step form",
  ],
  Welcome: [
    "onboarding",
    "welcome",
    "getting started",
    "first run",
    "product tour",
    "role picker",
    "use case",
    "plan picker",
    "setup progress",
  ],
  TableExpandable: [
    "data table",
    "expandable rows",
    "nested rows",
    "grouped rows",
    "master detail",
    "sticky header",
    "sticky column",
    "loading state",
    "empty state",
    "error state",
    "skeleton",
  ],
  Team: [
    "people",
    "about us",
    "staff",
    "employees",
    "leadership",
    "founders",
    "hiring",
    "careers",
    "directory",
  ],
  Testimony: [
    "testimonials",
    "reviews",
    "quotes",
    "wall of love",
    "customer story",
    "carousel",
    "slider",
    "ratings",
    "case study",
  ],
  SocialProof: [
    "logos",
    "trusted by",
    "customers",
    "logo cloud",
    "marquee",
    "reviews",
    "rating",
    "trust badges",
    "security",
    "case study",
    "activity feed",
  ],
  Login: ["sign in", "auth", "magic link", "passwordless", "passkey", "split screen"],
  SignUp: [
    "register",
    "create account",
    "auth",
    "onboarding",
    "multi-step",
    "wizard",
    "password strength",
  ],
  ForgotPassword: ["reset password", "recovery", "forgot", "two-step", "verification"],
  ResetPassword: ["new password", "change password", "recovery"],
  OTP: ["one time code", "verification code", "pin", "2fa"],
  Stats: [
    "kpi",
    "numbers",
    "metrics",
    "stat card",
    "sparkline",
    "progress ring",
    "kpi strip",
    "overview",
    "trend",
  ],
  Banner: [
    "announcement",
    "promo",
    "cookie consent",
    "alert",
    "notice",
    "countdown",
    "newsletter",
    "upgrade",
    "free shipping",
    "maintenance",
    "app download",
  ],
  Footer: [
    "site footer",
    "sitemap",
    "newsletter signup",
    "legal links",
    "social links",
    "language picker",
    "theme switcher",
  ],
  Metric: [
    "kpi",
    "numbers",
    "stats",
    "count up",
    "by the numbers",
    "social proof numbers",
    "reliability",
    "growth",
  ],
  CTA: ["call to action", "conversion"],
  Error: ["404", "500", "not found"],
  EmptyState: [
    "no data",
    "zero state",
    "no results",
    "inbox zero",
    "upload",
    "onboarding checklist",
    "invite team",
  ],
  Layout: ["settings page", "settings shell", "settings navigation", "preferences layout"],
  Profile: ["account", "avatar", "personal info", "company profile"],
  Security: ["password", "2fa", "two-factor", "sessions", "delete account", "danger zone"],
  Appearance: ["theme", "dark mode", "language", "timezone", "preferences"],
  Notifications: ["alerts", "email preferences", "digest", "push", "quiet hours"],
  Billing: ["invoices", "subscription", "payment method", "plan", "usage", "credit card"],
  Members: ["team", "invite", "roles", "permissions", "users", "seats"],
  Integrations: ["connected apps", "third party", "oauth", "marketplace"],
  ApiKeys: ["api keys", "tokens", "developer", "secrets"],
};

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
  { test: (path) => path.startsWith("Settings/Layout/"), docsPath: "/blocks/settings-layouts" },
  { test: (path) => path.startsWith("Settings/Profile/"), docsPath: "/blocks/settings-account" },
  { test: (path) => path.startsWith("Settings/Security/"), docsPath: "/blocks/settings-account" },
  {
    test: (path) => path.startsWith("Settings/Appearance/"),
    docsPath: "/blocks/settings-account",
  },
  {
    test: (path) => path.startsWith("Settings/Notifications/"),
    docsPath: "/blocks/settings-notifications",
  },
  { test: (path) => path.startsWith("Settings/Billing/"), docsPath: "/blocks/settings-billing" },
  { test: (path) => path.startsWith("Settings/Members/"), docsPath: "/blocks/settings-workspace" },
  {
    test: (path) => path.startsWith("Settings/Integrations/"),
    docsPath: "/blocks/settings-workspace",
  },
  { test: (path) => path.startsWith("Settings/ApiKeys/"), docsPath: "/blocks/settings-workspace" },
  { test: (path) => path.startsWith("Ecommerce/ShopHero/"), docsPath: "/blocks/ecommerce-hero" },
  {
    test: (path) => path.startsWith("Ecommerce/ProductList/"),
    docsPath: "/blocks/ecommerce-product-list",
  },
  {
    test: (path) => path.startsWith("Ecommerce/ProductDetail/"),
    docsPath: "/blocks/ecommerce-product-detail",
  },
  { test: (path) => path.startsWith("Ecommerce/Cart/"), docsPath: "/blocks/ecommerce-cart" },
  {
    test: (path) => path.startsWith("Ecommerce/Checkout/"),
    docsPath: "/blocks/ecommerce-checkout",
  },
  { test: (path) => path.startsWith("Ecommerce/Orders/"), docsPath: "/blocks/ecommerce-orders" },
  {
    test: (path) => path.startsWith("DataTable/TableLists/"),
    docsPath: "/blocks/data-table-lists",
  },
  {
    test: (path) => path.startsWith("DataTable/TableToolbars/"),
    docsPath: "/blocks/data-table-toolbars",
  },
  {
    test: (path) => path.startsWith("DataTable/TableSelection/"),
    docsPath: "/blocks/data-table-selection",
  },
  {
    test: (path) => path.startsWith("DataTable/TableExpandable/"),
    docsPath: "/blocks/data-table-expandable",
  },
  {
    test: (path) => path.startsWith("Onboarding/Welcome/"),
    docsPath: "/blocks/onboarding-welcome",
  },
  {
    test: (path) => path.startsWith("Onboarding/Wizard/"),
    docsPath: "/blocks/onboarding-wizard",
  },
  {
    test: (path) => path.startsWith("Onboarding/WorkspaceSetup/"),
    docsPath: "/blocks/onboarding-workspace-setup",
  },
  {
    test: (path) => path.startsWith("Onboarding/Checklist/"),
    docsPath: "/blocks/onboarding-checklist",
  },
];

const CHART_DOC_PATHS: Array<{ keyword: string; docsPath: string }> = [
  { keyword: "bar", docsPath: "/apex-charts/bar" },
  { keyword: "line", docsPath: "/apex-charts/line" },
  { keyword: "donut", docsPath: "/apex-charts/pie-donut" },
  { keyword: "pie", docsPath: "/apex-charts/pie-donut" },
  { keyword: "radar", docsPath: "/apex-charts/radar" },
  { keyword: "radial", docsPath: "/apex-charts/radial" },
];

const PAGE_PRESETS: Record<string, PagePreset> = {
  landing: {
    title: "Landing page",
    description: "Marketing page with a strong narrative arc from hero to conversion.",
    category: "marketing",
    sections: [
      {
        id: "navbar",
        title: "Navigation",
        query: "navigation",
        categories: [
          "Navigation/BlockNavigation1",
          "Navigation/BlockNavigation5",
          "Navigation/BlockNavigation2",
          "Navigation",
        ],
      },
      {
        id: "hero",
        title: "Hero",
        query: "hero",
        categories: [
          "Hero/BlockHero2",
          "Hero/BlockHero1",
          "Hero/BlockHero6",
          "Hero",
          "HeaderSection",
        ],
      },
      { id: "features", title: "Features", query: "features", categories: ["Feature"] },
      {
        id: "social-proof",
        title: "Social proof",
        query: "social proof",
        categories: [
          "SocialProof/BlockSocialProof5",
          "SocialProof/BlockSocialProof2",
          "SocialProof",
          "Testimony",
        ],
      },
      { id: "pricing", title: "Pricing", query: "pricing", categories: ["Pricing"] },
      { id: "faq", title: "FAQ", query: "faq", categories: ["FAQ"] },
      { id: "cta", title: "CTA", query: "call to action", categories: ["CTA"] },
      {
        id: "footer",
        title: "Footer",
        query: "footer",
        categories: ["Footer/BlockFooter1", "Footer/BlockFooter4", "Footer/BlockFooter2", "Footer"],
      },
    ],
    notes: [
      "Put the page in `app/pages/index.vue`. Each block is a full-width section, so stack them directly without extra wrappers.",
      "Pick one block per section and keep the same visual tone (all centered, or all split layouts) so the page reads as one design.",
      "Edit the copy, links and imagery in every block. Block text is placeholder content.",
    ],
    readNext: ["/blocks/hero", "/examples/landing"],
  },
  dashboard: {
    title: "Dashboard",
    description: "Application shell with navigation, app chrome, stats, and data-heavy content.",
    category: "application",
    sections: [
      {
        id: "sidebar",
        title: "Sidebar",
        query: "app sidebar",
        categories: [
          "App/Sidebar/BlockAppSidebar1",
          "App/Sidebar/BlockAppSidebar5",
          "App/Sidebar/BlockAppSidebar4",
          "App/Sidebar/",
        ],
      },
      {
        id: "header",
        title: "Header",
        query: "app header",
        categories: [
          "App/Header/BlockAppHeader4",
          "App/Header/BlockAppHeader5",
          "App/Header/BlockAppHeader3",
          "App/Header/",
        ],
      },
      {
        id: "stats",
        title: "Stats",
        query: "app stats",
        categories: [
          "App/Stats/BlockAppStats14",
          "App/Stats/BlockAppStats11",
          "App/Stats/BlockAppStats13",
          "App/Stats/",
          "Metric",
        ],
      },
      {
        id: "charts",
        title: "Charts",
        query: "chart",
        categories: ["Chart"],
        componentValues: ["apexcharts", "card"],
      },
      {
        id: "data",
        title: "Data views",
        query: "dashboard table",
        categories: ["Dashboards"],
        componentValues: ["datatable", "tanstacktable", "tabs", "badge", "button"],
      },
    ],
    notes: [
      "Build the shell once in `app/layouts/default.vue` (sidebar + header + `<slot />`) and keep page content in `app/pages/*`.",
      "Wrap chart blocks in `<ClientOnly>` or use the `.client` variants; ApexCharts does not render on the server.",
      "Prefer `tanstacktable` for typed, headless tables you style yourself and `datatable` for DataTables.net features such as export and column reorder.",
    ],
    readNext: ["/blocks/dashboards", "/blocks/app-sidebar", "/examples/dashboard"],
  },
  auth: {
    title: "Authentication",
    description: "Entry, recovery, and account creation flows for product access.",
    category: "application",
    sections: [
      {
        id: "login",
        title: "Login",
        query: "login",
        categories: [
          "Login/BlockLoginSimpleCard",
          "Login/BlockLoginSplitQuote",
          "Login/BlockLoginSimpleSocial",
          "Login/",
        ],
      },
      {
        id: "signup",
        title: "Sign up",
        query: "sign up",
        categories: [
          "SignUp/BlockSignUpCard",
          "SignUp/BlockSignUpSplitQuote",
          "SignUp/BlockSignUpSocial",
          "SignUp/",
        ],
      },
      {
        id: "recovery",
        title: "Recovery",
        query: "forgot password reset password",
        categories: [
          "ForgotPassword/BlockForgotPasswordFlow",
          "ResetPassword/BlockResetPassword2",
          "ResetPassword/BlockResetPasswordSuccess",
          "ForgotPassword/",
          "ResetPassword/",
        ],
      },
      { id: "otp", title: "Verification code", query: "otp", categories: ["OTP"] },
    ],
    notes: [
      "Use a dedicated layout without the app shell (for example `app/layouts/auth.vue`) and `definePageMeta({ layout: 'auth' })`.",
      "Auth blocks ship UI only. Wire `onSubmit` to your auth provider and surface server errors with `UiAlert` or `setErrors`.",
    ],
    readNext: ["/blocks/login", "/blocks/forgot-reset-password", "/forms"],
  },
  docs: {
    title: "Documentation",
    description: "Docs layout with sidebar navigation and right-rail TOC.",
    category: "docs",
    sections: [
      {
        id: "shell",
        title: "Docs shell",
        query: "sidebar navigation header",
        noBlocks: true,
        componentValues: ["sidebar", "scrollspy", "breadcrumbs", "container", "card"],
      },
      {
        id: "content",
        title: "Content components",
        query: "docs content",
        noBlocks: true,
        componentValues: ["heading", "separator", "code-block", "tabs"],
      },
    ],
    notes: [
      "For markdown-driven docs, pair this with Nuxt Content. The docs shell here is composed from components, not blocks.",
    ],
  },
  pricing: {
    title: "Pricing page",
    description: "Commercial pricing narrative with plans, FAQ, and conversion CTA.",
    category: "marketing",
    sections: [
      { id: "header", title: "Header", query: "pricing hero", categories: ["HeaderSection"] },
      { id: "plans", title: "Plans", query: "pricing", categories: ["Pricing"] },
      { id: "faq", title: "FAQ", query: "faq", categories: ["FAQ"] },
      { id: "cta", title: "CTA", query: "cta", categories: ["CTA"] },
    ],
    notes: ["Keep the plan feature lists parallel in wording so tiers are easy to compare."],
    readNext: ["/blocks/pricing"],
  },
  about: {
    title: "About page",
    description: "Company story, team, values, and supporting proof.",
    category: "content",
    sections: [
      { id: "story", title: "Story", query: "about story", categories: ["About"] },
      { id: "team", title: "Team", query: "team", categories: ["Team"] },
      { id: "proof", title: "Proof", query: "social proof", categories: ["SocialProof"] },
      {
        id: "footer",
        title: "Footer",
        query: "footer",
        categories: ["Footer/BlockFooter1", "Footer/BlockFooter4", "Footer/BlockFooter2", "Footer"],
      },
    ],
    notes: ["Replace placeholder avatars and names with real content before shipping."],
    readNext: ["/blocks/about", "/blocks/team"],
  },
  contact: {
    title: "Contact page",
    description: "Contact details, office context, and a clean form path.",
    category: "content",
    sections: [
      {
        id: "header",
        title: "Contact header",
        query: "contact header",
        categories: ["Contact/Header/"],
      },
      {
        id: "form",
        title: "Contact form",
        query: "contact form",
        noBlocks: true,
        componentValues: ["form", "vee-input", "vee-textarea", "button", "card"],
      },
      { id: "faq", title: "FAQ", query: "faq", categories: ["FAQ"] },
    ],
    notes: [
      "Compose the form yourself from Vee components. Call `plan-form` with `formType: contact` for the field and validation plan.",
    ],
    readNext: ["/blocks/contact-header", "/forms"],
  },
  settings: {
    title: "Settings page",
    description: "Account or workspace settings with grouped forms and a danger zone.",
    category: "application",
    // Selectors are ordered so the best default for each section is picked first. A file-name
    // prefix such as `Settings/Security/BlockSettingsSecurityPassword` pins one block.
    sections: [
      {
        id: "layout",
        title: "Settings layout",
        query: "settings layout navigation",
        categories: [
          "Settings/Layout/BlockSettingsLayoutSidebarNav",
          "Settings/Layout/BlockSettingsLayoutTopNav",
          "Settings/Layout/BlockSettingsLayoutSplitSections",
          "Settings/Layout/BlockSettingsLayoutStackedCards",
        ],
        componentValues: ["tabs", "separator"],
      },
      {
        id: "profile",
        title: "Profile",
        query: "profile settings form",
        categories: [
          "Settings/Profile/BlockSettingsProfileForm",
          "Settings/Profile/BlockSettingsProfileCompany",
          "Settings/Profile/BlockSettingsProfileEditable",
        ],
        componentValues: ["card", "form", "vee-input", "vee-select", "button"],
      },
      {
        id: "security",
        title: "Password and security",
        query: "password security",
        categories: [
          "Settings/Security/BlockSettingsSecurityPassword",
          "Settings/Security/BlockSettingsSecurityTwoFactor",
          "Settings/Security/BlockSettingsSecuritySessions",
        ],
        componentValues: ["vee-password-input", "progress", "switch"],
      },
      {
        id: "appearance",
        title: "Appearance and language",
        query: "theme appearance preferences",
        categories: [
          "Settings/Appearance/BlockSettingsAppearanceTheme",
          "Settings/Appearance/BlockSettingsAppearancePreferences",
        ],
        componentValues: ["radio-group", "native-select"],
      },
      {
        id: "notifications",
        title: "Notifications",
        query: "notification preferences",
        categories: [
          "Settings/Notifications/BlockSettingsNotificationsSwitches",
          "Settings/Notifications/BlockSettingsNotificationsMatrix",
          "Settings/Notifications/BlockSettingsNotificationsDigest",
        ],
        componentValues: ["switch", "checkbox"],
      },
      {
        id: "danger",
        title: "Danger zone",
        query: "delete account",
        categories: ["Settings/Security/BlockSettingsSecurityDangerZone"],
        componentValues: ["alert-dialog", "alert", "button"],
      },
    ],
    notes: [
      "Pick one layout block as the page shell, then drop the section blocks into its content area. Every block is self-contained, so they also work on their own.",
      "Group related fields into one `UiCard` per concern, each with its own save button and success toast (`sonner`).",
      "Confirm destructive actions with `UiAlertDialog`, never a plain button.",
      "For billing, team and API key pages call `plan-page` with `billing` or `team-management`.",
    ],
    readNext: [
      "/blocks/settings-layouts",
      "/blocks/settings-account",
      "/blocks/settings-notifications",
      "/forms",
      "/components/sonner",
    ],
  },
  billing: {
    title: "Billing settings",
    description: "Plan, usage, payment methods and invoice history for a subscription product.",
    category: "application",
    sections: [
      {
        id: "overview",
        title: "Plan and usage",
        query: "billing plan usage",
        categories: ["Settings/Billing/BlockSettingsBillingOverview"],
        componentValues: ["card", "progress", "badge"],
      },
      {
        id: "plans",
        title: "Plan picker",
        query: "plan picker upgrade",
        categories: ["Settings/Billing/BlockSettingsBillingPlanPicker"],
        componentValues: ["radio-group", "switch"],
      },
      {
        id: "payment-methods",
        title: "Payment methods",
        query: "payment method card",
        categories: ["Settings/Billing/BlockSettingsBillingPaymentMethods"],
        componentValues: ["dialog", "input"],
      },
      {
        id: "invoices",
        title: "Invoice history",
        query: "invoices table",
        categories: ["Settings/Billing/BlockSettingsBillingInvoices"],
        componentValues: ["table", "badge", "checkbox"],
      },
    ],
    notes: [
      "The blocks use placeholder data and local state. Connect them to your payment provider (for example Stripe) and keep card entry in the provider's hosted fields.",
      "Show destructive plan changes, such as cancelling, behind `UiAlertDialog`.",
    ],
    readNext: ["/blocks/settings-billing", "/blocks/pricing", "/components/table"],
  },
  legal: {
    title: "Legal pages",
    description:
      "Privacy policy, terms of service, cookie policy and the controls around them: cookie consent, data requests and a policy changelog.",
    category: "content",
    sections: [
      {
        id: "document",
        title: "Policy document",
        query: "privacy policy terms of service",
        categories: ["Legal/BlockLegal2", "Legal/BlockLegal6", "Legal/BlockLegal3", "Legal"],
      },
      {
        id: "hub",
        title: "Legal hub",
        query: "legal hub documents",
        categories: ["Legal/BlockLegal10", "Legal/BlockLegal4"],
      },
      {
        id: "consent",
        title: "Cookie consent",
        query: "cookie consent preferences",
        categories: ["Legal/BlockLegal11", "Legal/BlockLegal5"],
        componentValues: ["switch", "dialog"],
      },
      {
        id: "requests",
        title: "Data requests",
        query: "data request gdpr",
        categories: ["Legal/BlockLegal9"],
        componentValues: ["input", "textarea", "radio-group"],
      },
      {
        id: "changelog",
        title: "Policy changelog",
        query: "policy updates changelog",
        categories: ["Legal/BlockLegal12"],
      },
      {
        id: "footer",
        title: "Footer",
        query: "footer",
        categories: ["Footer/BlockFooter1", "Footer"],
      },
    ],
    notes: [
      "The blocks ship with placeholder policy text for Acme Inc. It is not legal advice, so have a lawyer review and replace it with your own terms before publishing.",
      "Link `/legal/privacy`, `/legal/terms` and `/legal/cookies` from the footer and from sign up forms.",
      "The cookie consent blocks only store choices in local state. Persist them (for example in a cookie) and load analytics only after consent.",
    ],
    readNext: ["/blocks/legal", "/blocks/footer", "/components/switch"],
  },
  storefront: {
    title: "Storefront",
    description:
      "Shop home and category pages: a hero, collection tiles, product grids with filters, a sale countdown, recommendations and a footer.",
    category: "marketing",
    sections: [
      {
        id: "navbar",
        title: "Navigation with cart",
        query: "navigation cart",
        categories: ["Navigation/BlockNavigation6", "Navigation"],
      },
      {
        id: "hero",
        title: "Shop hero",
        query: "shop hero storefront",
        categories: [
          "Ecommerce/ShopHero/BlockShopHero1",
          "Ecommerce/ShopHero/BlockShopHero3",
          "Ecommerce/ShopHero/BlockShopHero6",
          "ShopHero",
        ],
      },
      {
        id: "collections",
        title: "Collections",
        query: "collection tiles categories",
        categories: [
          "Ecommerce/ProductList/BlockProductList5",
          "Ecommerce/ShopHero/BlockShopHero2",
        ],
      },
      {
        id: "products",
        title: "Product grid",
        query: "product grid listing",
        categories: [
          "Ecommerce/ProductList/BlockProductList1",
          "Ecommerce/ProductList/BlockProductList2",
          "Ecommerce/ProductList/BlockProductList3",
          "ProductList",
        ],
        componentValues: ["badge", "rating", "aspect-ratio", "button"],
      },
      {
        id: "promo",
        title: "Sale countdown",
        query: "sale countdown promo",
        categories: ["Ecommerce/ShopHero/BlockShopHero5", "Banner"],
      },
      {
        id: "recommended",
        title: "Recommended products",
        query: "recommended products carousel",
        categories: ["Ecommerce/ProductList/BlockProductList7"],
        componentValues: ["carousel"],
      },
      {
        id: "proof",
        title: "Customer reviews",
        query: "testimonials reviews",
        categories: ["Testimony", "SocialProof"],
      },
      {
        id: "newsletter",
        title: "Newsletter",
        query: "newsletter signup",
        categories: ["Newsletter"],
      },
      {
        id: "footer",
        title: "Footer",
        query: "footer",
        categories: ["Footer/BlockFooter1", "Footer"],
      },
    ],
    notes: [
      "The ecommerce blocks use a fictional store with placeholder Unsplash photos. Replace the typed `products` prop with your catalog and the `image` URLs with your own.",
      "Filters, sorting, wishlist and cart state live inside each block. Connect them to your store or API.",
      "Use ProductList blocks 2 or 3 for category pages and block 1 for featured rows on the home page.",
    ],
    readNext: ["/blocks/ecommerce-hero", "/blocks/ecommerce-product-list", "/components/carousel"],
  },
  "product-page": {
    title: "Product page",
    description:
      "A product detail page with a gallery, variant pickers, add to cart, reviews, a bundle offer, related products and a size guide.",
    category: "marketing",
    sections: [
      {
        id: "buy",
        title: "Gallery and buy box",
        query: "product page gallery variants add to cart",
        categories: [
          "Ecommerce/ProductDetail/BlockProductDetail1",
          "Ecommerce/ProductDetail/BlockProductDetail2",
          "Ecommerce/ProductDetail/BlockProductDetail3",
          "ProductDetail",
        ],
        componentValues: ["carousel", "toggle-group", "number-field", "accordion"],
      },
      {
        id: "size-guide",
        title: "Size guide and sticky bar",
        query: "size guide sticky add to cart",
        categories: ["Ecommerce/ProductDetail/BlockProductDetail8"],
        componentValues: ["dialog", "table"],
      },
      {
        id: "bundle",
        title: "Frequently bought together",
        query: "bundle frequently bought together",
        categories: ["Ecommerce/ProductDetail/BlockProductDetail7"],
        componentValues: ["checkbox", "select"],
      },
      {
        id: "reviews",
        title: "Customer reviews",
        query: "reviews rating breakdown",
        categories: ["Ecommerce/ProductDetail/BlockProductDetail5"],
        componentValues: ["rating", "progress", "vee-textarea"],
      },
      {
        id: "related",
        title: "Related products",
        query: "related products complete the look",
        categories: [
          "Ecommerce/ProductDetail/BlockProductDetail6",
          "Ecommerce/ProductList/BlockProductList7",
        ],
      },
    ],
    notes: [
      "Blocks 1 to 4 are alternative top of page layouts. Pick one, then add the size guide, bundle, reviews and related sections below it.",
      "The product object takes `images`, `colors`, `sizes` with an `inStock` flag, `highlights` and `details`. Selecting a color only changes the selection, so map each color to its own images.",
      "The add to cart handlers only update local state. Replace them with a call to your cart store or API.",
    ],
    readNext: [
      "/blocks/ecommerce-product-detail",
      "/components/carousel",
      "/components/toggle-group",
    ],
  },
  checkout: {
    title: "Cart and checkout",
    description:
      "The path from cart to paid order: a cart, express checkout, address, delivery, payment, order review and a confirmation.",
    category: "application",
    sections: [
      {
        id: "cart",
        title: "Cart",
        query: "shopping cart summary",
        categories: [
          "Ecommerce/Cart/BlockCart2",
          "Ecommerce/Cart/BlockCart3",
          "Ecommerce/Cart/BlockCart1",
          "Cart",
        ],
        componentValues: ["number-field", "progress", "sheet"],
      },
      {
        id: "flow",
        title: "Checkout flow",
        query: "checkout form order summary",
        categories: [
          "Ecommerce/Checkout/BlockCheckout1",
          "Ecommerce/Checkout/BlockCheckout2",
          "Ecommerce/Checkout/BlockCheckout8",
        ],
        componentValues: ["vee-input", "radio-group", "stepper"],
      },
      {
        id: "express",
        title: "Express and guest checkout",
        query: "express checkout guest sign in",
        categories: ["Ecommerce/Checkout/BlockCheckout5"],
        componentValues: ["tabs", "vee-password-input"],
      },
      {
        id: "address",
        title: "Address",
        query: "address form country",
        categories: ["Ecommerce/Checkout/BlockCheckout6"],
        componentValues: ["vee-select", "vee-input"],
      },
      {
        id: "delivery",
        title: "Delivery method",
        query: "delivery method shipping options",
        categories: ["Ecommerce/Checkout/BlockCheckout4"],
        componentValues: ["radio-group", "switch"],
      },
      {
        id: "payment",
        title: "Payment",
        query: "payment form credit card",
        categories: ["Ecommerce/Checkout/BlockCheckout3"],
        componentValues: ["credit-card", "vee-input"],
      },
      {
        id: "review",
        title: "Order review",
        query: "order review place order",
        categories: ["Ecommerce/Checkout/BlockCheckout7"],
        componentValues: ["vee-checkbox"],
      },
      {
        id: "confirmation",
        title: "Order confirmation",
        query: "order confirmation",
        categories: ["Ecommerce/Orders/BlockOrders1"],
      },
    ],
    notes: [
      "The checkout blocks validate and format input, then simulate a request. They never send card data anywhere. Use your payment provider's hosted fields or payment element for real card entry.",
      "Checkout blocks 1, 2 and 8 are alternative full layouts. Blocks 3 to 7 are single steps you can combine into your own flow.",
      "Calculate totals, shipping, tax and promo codes on your server. The values in the blocks are demo data.",
    ],
    readNext: [
      "/blocks/ecommerce-cart",
      "/blocks/ecommerce-checkout",
      "/components/stepper",
      "/forms",
    ],
  },
  orders: {
    title: "Customer orders",
    description: "The account side of shopping: order history, order detail, tracking and returns.",
    category: "application",
    sections: [
      {
        id: "history",
        title: "Order history",
        query: "order history table",
        categories: ["Ecommerce/Orders/BlockOrders3", "Ecommerce/Orders/BlockOrders4"],
        componentValues: ["table", "tabs", "badge", "pagination"],
      },
      {
        id: "detail",
        title: "Order detail",
        query: "order detail",
        categories: ["Ecommerce/Orders/BlockOrders5"],
        componentValues: ["progress", "breadcrumbs", "card"],
      },
      {
        id: "tracking",
        title: "Tracking",
        query: "order tracking timeline",
        categories: ["Ecommerce/Orders/BlockOrders2"],
        componentValues: ["timeline"],
      },
      {
        id: "returns",
        title: "Returns and refunds",
        query: "return request refund",
        categories: ["Ecommerce/Orders/BlockOrders6"],
        componentValues: ["vee-select", "radio-group", "number-field"],
      },
    ],
    notes: [
      "Order history blocks take an `orders` array and detail blocks take a single `order`. Map your API response to those shapes.",
      "Status colors come from a `statuses` map in each block. Rename or add states there.",
    ],
    readNext: ["/blocks/ecommerce-orders", "/components/timeline", "/components/table"],
  },
  "team-management": {
    title: "Team management",
    description: "Members, invitations, role permissions, integrations and API keys.",
    category: "application",
    sections: [
      {
        id: "members",
        title: "Members",
        query: "team members table",
        categories: ["Settings/Members/BlockSettingsMembersTable"],
        componentValues: ["table", "avatar", "dropdown-menu", "native-select"],
      },
      {
        id: "invite",
        title: "Invite teammates",
        query: "invite team",
        categories: ["Settings/Members/BlockSettingsMembersInvite"],
        componentValues: ["dialog", "badge"],
      },
      {
        id: "roles",
        title: "Roles and permissions",
        query: "roles permissions",
        categories: ["Settings/Members/BlockSettingsMembersRoles"],
        componentValues: ["table", "checkbox"],
      },
      {
        id: "integrations",
        title: "Integrations",
        query: "integrations connected apps",
        categories: [
          "Settings/Integrations/BlockSettingsIntegrationsGrid",
          "Settings/Integrations/BlockSettingsIntegrationsList",
        ],
        componentValues: ["card", "switch"],
      },
      {
        id: "api-keys",
        title: "API keys",
        query: "api keys",
        categories: ["Settings/ApiKeys/"],
        componentValues: ["alert-dialog", "dialog", "table"],
      },
    ],
    notes: [
      "Gate every action by role on the server too. The blocks only demonstrate the UI.",
      "API key secrets should be shown once at creation and stored hashed. The API keys block follows that flow.",
    ],
    readNext: ["/blocks/settings-workspace", "/components/table", "/components/dialog"],
  },
  onboarding: {
    title: "Onboarding flow",
    description: "Multi-step setup that collects information progressively.",
    category: "application",
    sections: [
      {
        id: "steps",
        title: "Step indicator and forms",
        query: "multi-step progress",
        categories: ["SignUp/BlockSignUpProgress", "SignUp/BlockSignUpSidebarProgress"],
        componentValues: ["stepper", "progress"],
      },
      {
        id: "forms",
        title: "Step forms",
        query: "onboarding form",
        noBlocks: true,
        componentValues: ["card", "form", "vee-input", "vee-select", "vee-radio-group", "button"],
      },
    ],
    notes: [
      "The multi-step sign up blocks use one `useForm` with a schema that changes per step and `keepValuesOnUnmount: true`, so back and next never lose data.",
      "Pick the horizontal progress block for short flows and the sidebar block when every step needs a title and description.",
    ],
    readNext: ["/blocks/sign-up", "/components/stepper", "/forms"],
  },
  "admin-table": {
    title: "Admin data table",
    description:
      "List-and-manage screen with search, filters, bulk actions, row actions, detail rows and empty states.",
    category: "application",
    sections: [
      {
        id: "toolbar",
        title: "Toolbar",
        query: "table toolbar filters",
        categories: [
          "DataTable/TableToolbars/BlockTableToolbars1",
          "DataTable/TableToolbars/BlockTableToolbars2",
          "DataTable/TableToolbars/BlockTableToolbars5",
          "DataTable/TableToolbars/",
        ],
        componentValues: ["input", "button", "dropdown-menu", "select", "popover", "tabs"],
      },
      {
        id: "table",
        title: "Table",
        query: "table",
        categories: [
          "DataTable/TableLists/BlockTableLists1",
          "DataTable/TableLists/BlockTableLists3",
          "DataTable/TableLists/BlockTableLists4",
          "DataTable/TableLists/",
        ],
        componentValues: ["table", "badge", "avatar", "pagination", "tanstacktable"],
      },
      {
        id: "selection",
        title: "Selection and row actions",
        query: "bulk actions row actions",
        categories: [
          "DataTable/TableSelection/BlockTableSelection1",
          "DataTable/TableSelection/BlockTableSelection2",
          "DataTable/TableSelection/BlockTableSelection6",
          "DataTable/TableSelection/",
        ],
        componentValues: ["checkbox", "dropdown-menu", "alert-dialog", "editable"],
      },
      {
        id: "details",
        title: "Expandable and detail rows",
        query: "expandable rows master detail",
        categories: [
          "DataTable/TableExpandable/BlockTableExpandable1",
          "DataTable/TableExpandable/BlockTableExpandable3",
          "DataTable/TableExpandable/",
        ],
        componentValues: ["table", "card", "separator"],
      },
      {
        id: "states",
        title: "Empty and loading states",
        query: "empty state",
        categories: [
          "DataTable/TableExpandable/BlockTableExpandable5",
          "App/EmptyState/BlockAppEmptyState1",
          "App/EmptyState/BlockAppEmptyState3",
          "App/EmptyState/BlockAppEmptyState4",
          "App/EmptyState/",
        ],
        componentValues: ["empty", "skeleton"],
      },
      {
        id: "editing",
        title: "Create and edit",
        query: "dialog form",
        noBlocks: true,
        componentValues: ["dialog", "sheet", "form", "vee-input", "alert-dialog"],
      },
    ],
    notes: [
      "Always design the empty, loading and error states. They are where generated UIs usually look unfinished.",
      "Open create/edit forms in a `UiSheet` or `UiDialog` so the table keeps its scroll position.",
      "The data table blocks are built on `UiTable` with plain Vue state and typed props such as `users`, `invoices` or `orders`. Search, sort and filters run on the client, so move to `UiTanStackTable` or server side queries once the data outgrows one page.",
      "Pair one toolbar block with one list block. Keep selection state in the page, not in the toolbar, so the bulk action bar and the table share it.",
    ],
    readNext: [
      "/blocks/data-table-lists",
      "/blocks/data-table-toolbars",
      "/blocks/data-table-selection",
      "/blocks/data-table-expandable",
      "/components/tanstacktable",
    ],
  },
  "ai-chat": {
    title: "AI chat interface",
    description: "Conversation thread with streaming messages, agent steps and a prompt composer.",
    category: "ai",
    sections: [
      {
        id: "thread",
        title: "Thread",
        query: "chat message",
        noBlocks: true,
        componentValues: ["message-scroller", "message", "bubble", "attachment"],
      },
      {
        id: "steps",
        title: "Agent steps",
        query: "reasoning tool",
        noBlocks: true,
        componentValues: ["trace", "code-block", "terminal", "collapsible"],
      },
      {
        id: "composer",
        title: "Prompt composer",
        query: "prompt input",
        noBlocks: true,
        componentValues: ["textarea", "button", "attachment", "dropdown-menu"],
      },
      {
        id: "shell",
        title: "Conversation list",
        query: "sidebar",
        categories: [
          "App/Sidebar/BlockAppSidebar8",
          "App/Sidebar/BlockAppSidebar1",
          "App/Sidebar/",
        ],
        componentValues: ["sidebar", "scroll-area"],
      },
    ],
    notes: [
      "AI Elements are copy-paste patterns, not CLI components. Read the pattern page, add the components it lists, then copy the example.",
      "Keep the composer pinned to the bottom and let `UiMessageScroller` own scrolling so streaming replies do not steal the user's scroll position.",
    ],
    readNext: ["/ai-elements/overview", "/ai-elements/chat", "/ai-elements/message"],
  },
  custom: {
    title: "Custom page",
    description: "Flexible starting point driven by the requested sections.",
    category: "content",
    sections: [],
    notes: [],
  },
};

export const PAGE_TYPES = Object.keys(PAGE_PRESETS) as [string, ...string[]];

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
    componentValues: ["form", "vee-input", "vee-select", "vee-switch", "button", "card", "alert"],
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
      "vee-rating",
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

export const PAGE_TEMPLATE_INDEX = Object.entries(PAGE_PRESETS)
  .filter(([id]) => id !== "custom")
  .map(([id, preset]) => ({
    id,
    name: preset.title,
    category: preset.category,
    description: preset.description,
    sections: preset.sections.map((section) => section.title),
    readNext: preset.readNext ?? [],
  }));

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

function getComponentCategory(value: string, docsPath?: string | null) {
  const match = COMPONENT_CATEGORY_GROUPS.find((group) => group.values.includes(value));

  if (match) {
    return match.category;
  }

  // Newly added components fall back to the docs section they live in.
  const section = docsPath?.split("/")[1];
  return section === "forms" || section === "goodies" ? section : "general";
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
    return chartMatch?.docsPath ?? "/blocks/chart";
  }

  const [segment] = path.split("/");
  const docSlugMap: Record<string, string> = {
    About: "about",
    Banner: "banner",
    CTA: "cta",
    Career: "career",
    Dashboards: "dashboards",
    Error: "error",
    FAQ: "faq",
    Feature: "features",
    Footer: "footer",
    HeaderSection: "header-section",
    Hero: "hero",
    Login: "login",
    Legal: "legal",
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
    category: getComponentCategory(component.value, component.docsPath),
    keywords: SEARCH_KEYWORDS[component.value] ?? [],
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

/**
 * Prefers the summary written in the block's own leading comment. Blocks without one fall back to
 * the UI Thing components they are built from, which is enough to tell variants apart.
 */
function describeBlock(block: BlockRecord) {
  const written = (block as { description?: string | null }).description;

  if (written) {
    return written;
  }

  const used = block.components?.length ? ` Built with: ${block.components.join(", ")}.` : "";
  return `${block.name} (${block.category} block).${used}`;
}

export function summarizeBlock(block: BlockRecord): LibrarySummary {
  return {
    kind: "block",
    name: block.name,
    value: block.fileName.replace(/\.vue$/, ""),
    description: describeBlock(block),
    docsPath: getBlockDocsPath(block),
    category: slugify(block.category),
    keywords: SEARCH_KEYWORDS[block.category] ?? [],
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
    blockNpmDependencies: new Set<string>(),
    devDependencies: new Set<string>(),
    nuxtModules: new Set<string>(),
    nuxtConfigModules: new Set<string>(),
    composables: new Set<string>(),
    plugins: new Set<string>(),
    utils: new Set<string>(),
    processedComponents: new Set<string>(),
    unresolvedComponents: new Set<string>(),
    notes: new Set<string>(),
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

/** Specifiers that resolve inside a Nuxt app and never need an npm install. */
const BUILTIN_IMPORT_PREFIXES = [".", "~", "@/", "#", "nuxt", "vue", "node:"];

/**
 * Lists the npm packages a block imports itself (`motion-v`, `yup`, `apexcharts`, ...). The
 * component registry only knows about packages owned by `Ui*` components, so without this scan an
 * install plan for most blocks would be missing packages the block needs to compile.
 */
export function extractBlockPackages(source: string) {
  const packages = new Set<string>();

  for (const match of source.matchAll(/(?:from|import)\s+["']([^"']+)["']/g)) {
    const specifier = match[1];

    if (BUILTIN_IMPORT_PREFIXES.some((prefix) => specifier.startsWith(prefix))) {
      continue;
    }

    const [scopeOrName, scoped] = specifier.split("/");
    packages.add(specifier.startsWith("@") ? `${scopeOrName}/${scoped}` : scopeOrName);
  }

  return [...packages];
}

/**
 * `motion-v` ships its Nuxt module as a subpath of the package, so `nuxi module add` cannot install
 * it. It is installed as an npm package and listed in `nuxt.config` by hand.
 */
const MOTION_MODULE = "motion-v/nuxt";

/**
 * Blocks use auto-imported globals (`<Icon>`, `<Motion>`) that only resolve when the matching Nuxt
 * module is registered, so infer the modules from the template.
 */
export function extractBlockNuxtModules(source: string) {
  const modules = new Set<string>();

  if (/<Icon[\s>]/.test(source)) modules.add("@nuxt/icon");
  if (/<(Motion|AnimatePresence|MotionConfig|LayoutGroup)[\s>]/.test(source)) {
    modules.add(MOTION_MODULE);
  }

  return [...modules];
}

/**
 * Identifiers that blocks reference but that only exist as auto-imports in the docs site, so a
 * copied block fails to compile until the consuming app defines them.
 */
const DOCS_SITE_GLOBALS: Array<{ name: string; note: string }> = [
  {
    name: "COMPANY_NAME",
    note: 'Blocks reference `COMPANY_NAME`. Define it once, for example `export const COMPANY_NAME = "Acme";` in `app/utils/constants.ts` (Nuxt auto-imports it), or replace the placeholder with real copy.',
  },
];

function collectBlockDependencies(block: BlockRecord, acc: DependencyAccumulator) {
  DOCS_SITE_GLOBALS.forEach(({ name, note }) => {
    const declared = new RegExp(`(?:const|let|var)\\s+${name}\\b`).test(block.file);
    if (!declared && new RegExp(`\\b${name}\\b`).test(block.file)) acc.notes.add(note);
  });

  extractBlockPackages(block.file).forEach((pkg) => acc.blockNpmDependencies.add(pkg));
  extractBlockNuxtModules(block.file).forEach((module) => {
    if (module === MOTION_MODULE) {
      acc.nuxtConfigModules.add(module);
      acc.blockNpmDependencies.add("motion-v");
    } else {
      acc.nuxtModules.add(module);
    }
  });

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
  // Packages a component already brings are installed by `ui-thing add`, so only list the rest.
  const blockNpmDependencies = uniqueSorted(
    [...acc.blockNpmDependencies].filter((pkg) => !acc.npmDependencies.has(pkg))
  );
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
    blockNpmDependencies,
    devDependencies,
    nuxtModules,
    nuxtConfigModules: uniqueSorted(acc.nuxtConfigModules),
    composables: uniqueSorted(acc.composables),
    plugins: uniqueSorted(acc.plugins),
    utils: uniqueSorted(acc.utils),
    notes: [
      ...acc.notes,
      "`addComponents` installs the listed components together with the npm packages they need (npmDependencies).",
      ...(blockNpmDependencies.length > 0
        ? [
            "Blocks are copied from get-block, not installed by the CLI. Run `installDependencies` for the packages the block imports directly.",
          ]
        : []),
      ...(nuxtModules.length > 0
        ? ["Nuxt modules must be registered; run `addNuxtModules` before first use."]
        : []),
      ...(acc.nuxtConfigModules.size > 0
        ? [
            `Add ${[...acc.nuxtConfigModules].map((m) => `"${m}"`).join(", ")} to the \`modules\` array in nuxt.config.ts so the block's auto-imported components resolve.`,
          ]
        : []),
    ],
    commands: {
      installDependencies:
        blockNpmDependencies.length > 0
          ? `${commands.install} ${blockNpmDependencies.join(" ")}`
          : null,
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
    keys: [
      { name: "name", weight: 3 },
      { name: "value", weight: 3 },
      { name: "keywords", weight: 2 },
      { name: "description", weight: 1 },
      { name: "category", weight: 1 },
      { name: "docsPath", weight: 0.5 },
    ],
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
      blockNpmDependencies: installPlan.blockNpmDependencies,
      devDependencies: installPlan.devDependencies,
      nuxtModules: installPlan.nuxtModules,
      nuxtConfigModules: installPlan.nuxtConfigModules,
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
      blockNpmDependencies: installPlan.blockNpmDependencies,
      devDependencies: installPlan.devDependencies,
      nuxtModules: installPlan.nuxtModules,
      nuxtConfigModules: installPlan.nuxtConfigModules,
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
    password: ["vee-password-input"],
    "confirm-password": ["vee-password-input"],
    name: ["vee-input"],
    phone: ["vee-input"],
    message: ["vee-textarea"],
    textarea: ["vee-textarea"],
    select: ["vee-select"],
    checkbox: ["vee-checkbox"],
    radio: ["vee-radio-group"],
    switch: ["vee-switch"],
    date: ["vee-datepicker"],
    calendar: ["vee-datepicker"],
    number: ["vee-number-field"],
    amount: ["vee-currency-input"],
    currency: ["vee-currency-input"],
    file: ["vee-file-input"],
    tags: ["vee-tags-input"],
    otp: ["vee-pin-input"],
    pin: ["vee-pin-input"],
    rating: ["vee-rating"],
    combobox: ["vee-combobox"],
    autocomplete: ["vee-autocomplete"],
    "multi-select": ["vee-multi-select"],
    slider: ["vee-vue-form-slider"],
    "date-field": ["vee-date-field"],
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
    combobox: "required selection",
    autocomplete: "required selection",
    "multi-select": "array length constraints",
    slider: "numeric range",
    "date-field": "required date",
  };

  return rules[field] ?? "required";
}

export function buildPagePlan(pageType: string, sections?: string) {
  const preset = PAGE_PRESETS[pageType] ?? PAGE_PRESETS.custom;
  const requestedSections = parseCommaList(sections);
  const allBlocks = listBlockSummaries();
  // A block can only fill one slot, so two sections never recommend the same file.
  const usedBlocks = new Set<string>();

  const effectiveSections: PageSectionPlan[] =
    pageType === "custom" || !(pageType in PAGE_PRESETS)
      ? requestedSections.map((section) => ({
          id: slugify(section),
          title: section.replace(/-/g, " "),
          query: section,
        }))
      : preset.sections;

  const sectionPlans = effectiveSections.map((section) => {
    let blockCandidates: LibrarySummary[] = [];

    if (!section.noBlocks) {
      // Walk categories in priority order so `Hero` wins over the fallback `HeaderSection`.
      const byCategory = (section.categories ?? []).flatMap((selector) =>
        allBlocks.filter((block) =>
          selector.includes("/")
            ? block.sourcePath?.startsWith(selector)
            : block.category === slugify(selector)
        )
      );
      const pool = byCategory.length > 0 ? byCategory : searchLibrary(section.query, "block", 6);

      blockCandidates = pool.filter((block) => !usedBlocks.has(block.value)).slice(0, 3);
      blockCandidates.forEach((block) => usedBlocks.add(block.value));
    }

    const componentCandidates =
      section.componentValues
        ?.map((value) => {
          const component = findComponent(value);
          return component ? summarizeComponent(component) : null;
        })
        .filter((component): component is LibrarySummary => component !== null) ?? [];

    return {
      id: section.id,
      title: section.title,
      query: section.query,
      blocks: blockCandidates,
      components: componentCandidates,
      starterSelection: [
        blockCandidates[0]?.value,
        ...componentCandidates.map((component) => component.value),
      ].filter((value): value is string => Boolean(value)),
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
    notes: preset.notes,
    readNext: preset.readNext ?? [],
    designGuidance: "Read resource://uithing/design-patterns before writing the page.",
    installPlan: buildInstallPlan(starterSelection),
  };
}

const YUP_RULES: Record<string, string> = {
  email: 'string().email().required().label("Email")',
  password: 'string().required().min(8).label("Password")',
  "confirm-password":
    'string().required().oneOf([ref("password")], "Passwords must match").label("Confirm password")',
  name: 'string().required().min(2).label("Name")',
  phone: 'string().label("Phone")',
  message: 'string().required().min(10).label("Message")',
  textarea: 'string().required().min(10).label("Message")',
  checkbox: 'boolean().oneOf([true], "Required").label("Consent")',
  switch: "boolean()",
  number: "number().required().min(0)",
  rating: "number().required().min(1).max(5)",
  tags: "array().of(string()).min(1)",
};

function toFieldKey(field: string) {
  return field.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase());
}

function buildFormExample(fields: string[]) {
  const keys = fields.map(toFieldKey);
  const schema = fields
    .map((field, index) => `  ${keys[index]}: ${YUP_RULES[field] ?? "string().required()"},`)
    .join("\n");
  const template = fields
    .map((field, index) => {
      const component = getFieldComponent(field)[0];
      const tag = `Ui${component
        .split("-")
        .map((part) => part[0].toUpperCase() + part.slice(1))
        .join("")}`;
      const label = field.replace(/-/g, " ").replace(/^./, (letter) => letter.toUpperCase());
      return `    <${tag} name="${keys[index]}" label="${label}" />`;
    })
    .join("\n");

  const yupImports = ["array", "boolean", "number", "object", "ref", "string"].filter(
    (name) => name === "object" || new RegExp(`\\b${name}\\(`).test(schema)
  );

  return `<script setup lang="ts">
import { ${yupImports.join(", ")} } from "yup";
import type { InferType } from "yup";

const schema = object({
${schema}
});

const { handleSubmit, isSubmitting } = useForm<InferType<typeof schema>>({
  validationSchema: schema,
});

const onSubmit = handleSubmit(async (values) => {
  // send values to your API, then confirm with useSonner("Saved")
});
</script>

<template>
  <form class="space-y-4" @submit="onSubmit">
${template}
    <UiButton type="submit" :loading="isSubmitting">Submit</UiButton>
  </form>
</template>`;
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
      schemaOptions: ["yup", "zod", "valibot", "joi"],
      recommended: "yup",
      note: "Blocks and docs examples use yup. Pass the schema straight to `useForm({ validationSchema })`; `useForm` and the Vee components are auto-imported via the @vee-validate/nuxt module.",
      installCommand: `${PACKAGE_MANAGER_COMMANDS.npm.install} yup @vee-validate/yup`,
    },
    wiringExample: buildFormExample(effectiveFields),
    readNext: [
      "/forms",
      ...recommendedComponents
        .filter((value) => value.startsWith("vee-"))
        .map((value) => normalizePath(findComponent(value)?.docsPath))
        .filter((path): path is string => Boolean(path)),
    ],
    recommendedComponents,
    installPlan: buildInstallPlan(recommendedComponents),
  };
}

export function buildProjectSetup(projectName = "my-app", packageManager: PackageManager = "npm") {
  const commands = PACKAGE_MANAGER_COMMANDS[packageManager];
  const cd = `cd ${projectName}`;

  return {
    packageManager,
    projectName,
    framework: "Nuxt 4",
    steps: [
      {
        title: "Create a Nuxt project",
        command: `${commands.dlx} nuxi@latest init ${projectName} --packageManager ${packageManager} --no-install`,
        note: "If nuxi prompts for official modules, accept the defaults; UI Thing adds what it needs.",
      },
      {
        title: "Install project dependencies",
        command: `${cd} && ${packageManager} install`,
      },
      {
        title: "Initialize UI Thing",
        command: `${cd} && ${commands.dlx} ui-thing@latest init --yes`,
        note: "`--yes` accepts the defaults (theme, paths, package manager). Without it the CLI asks questions and an agent will hang. Run `ui-thing@latest theme` afterwards to pick a different color theme.",
      },
      {
        title: "Add starter components",
        command: `${cd} && ${commands.dlx} ui-thing@latest add button card input`,
        note: "Always pass component names. With no arguments `add` opens an interactive picker.",
      },
    ],
    afterInit: [
      "`init` registers Tailwind CSS v4 and writes the design tokens to `app/assets/css/tailwind.css`.",
      "Components are copied into `app/components/Ui`, composables into `app/composables`, utils into `app/utils`. They are your code now; edit them freely.",
      "Render `<UiSonner />` once in `app.vue` if you use toasts (`ui-thing add sonner`), then call `useSonner('Saved')` anywhere.",
      "Components read `$colorMode`, so dark mode relies on `@nuxtjs/color-mode`. Check it is in `nuxt.config` modules after init and add it if not.",
    ],
    nextSteps: [
      "Read resource://uithing/design-patterns before writing any UI.",
      "Call plan-app for a multi-page product, or plan-page / plan-form for a single screen.",
      "Use get-install-plan once you know which components or blocks you want.",
    ],
    notes: [
      "UI Thing is Nuxt-first and the CLI updates your project config for you.",
      "Component, composable, plugin, and utils files are copied into your app so you can edit them.",
    ],
  };
}

type AppFeature = {
  keywords: string[];
  title: string;
  pageType: string;
  route: string;
  layout: "default" | "auth" | "marketing";
};

const APP_FEATURES: AppFeature[] = [
  {
    keywords: ["landing", "marketing", "homepage", "home page"],
    title: "Marketing site",
    pageType: "landing",
    route: "/",
    layout: "marketing",
  },
  {
    keywords: ["pricing", "plans", "subscription"],
    title: "Pricing",
    pageType: "pricing",
    route: "/pricing",
    layout: "marketing",
  },
  {
    keywords: ["about", "our team", "company"],
    title: "About",
    pageType: "about",
    route: "/about",
    layout: "marketing",
  },
  {
    keywords: ["contact", "support"],
    title: "Contact",
    pageType: "contact",
    route: "/contact",
    layout: "marketing",
  },
  {
    keywords: ["auth", "login", "sign in", "signup", "sign up", "register", "account"],
    title: "Authentication",
    pageType: "auth",
    route: "/login",
    layout: "auth",
  },
  {
    keywords: ["dashboard", "overview", "analytics", "admin", "saas"],
    title: "Dashboard",
    pageType: "dashboard",
    route: "/app",
    layout: "default",
  },
  {
    keywords: ["table", "manage", "crud", "users", "customers", "orders", "inventory", "records"],
    title: "Data management",
    pageType: "admin-table",
    route: "/app/records",
    layout: "default",
  },
  {
    keywords: ["settings", "profile", "preferences", "workspace"],
    title: "Settings",
    pageType: "settings",
    route: "/app/settings",
    layout: "default",
  },
  {
    keywords: ["billing", "invoice", "payment method", "subscription management"],
    title: "Billing",
    pageType: "billing",
    route: "/app/settings/billing",
    layout: "default",
  },
  {
    keywords: [
      "legal",
      "privacy policy",
      "terms of service",
      "terms of use",
      "cookie policy",
      "gdpr",
    ],
    title: "Legal pages",
    pageType: "legal",
    route: "/legal/privacy",
    layout: "marketing",
  },
  {
    keywords: [
      "ecommerce",
      "e-commerce",
      "online store",
      "storefront",
      "webshop",
      "product catalog",
      "product listing",
    ],
    title: "Storefront",
    pageType: "storefront",
    route: "/shop",
    layout: "marketing",
  },
  {
    keywords: ["product page", "product detail", "product details"],
    title: "Product page",
    pageType: "product-page",
    route: "/shop/[slug]",
    layout: "marketing",
  },
  {
    keywords: ["checkout", "shopping cart", "cart", "payment form"],
    title: "Cart and checkout",
    pageType: "checkout",
    route: "/checkout",
    layout: "marketing",
  },
  {
    keywords: ["order history", "order tracking", "order confirmation", "returns", "refund"],
    title: "Customer orders",
    pageType: "orders",
    route: "/account/orders",
    layout: "default",
  },
  {
    keywords: ["team member", "members", "invite", "roles", "permissions", "seats", "api key"],
    title: "Team management",
    pageType: "team-management",
    route: "/app/settings/members",
    layout: "default",
  },
  {
    keywords: ["onboarding", "wizard", "multi-step", "multi step"],
    title: "Onboarding",
    pageType: "onboarding",
    route: "/onboarding",
    layout: "auth",
  },
  {
    keywords: ["chat", " ai ", "assistant", "agent", "copilot", "llm"],
    title: "AI chat",
    pageType: "ai-chat",
    route: "/app/chat",
    layout: "default",
  },
  {
    keywords: ["docs", "documentation", "knowledge base", "help center"],
    title: "Documentation",
    pageType: "docs",
    route: "/docs",
    layout: "default",
  },
];

/**
 * Turns a product description into a route map. Each matched feature is expanded with
 * `buildPagePlan`, so the agent gets block and component candidates for every page in one call.
 */
export function buildAppPlan(description: string, features?: string) {
  const requestedFeatures = parseCommaList(features);
  const haystack = ` ${normalizeQuery(`${description} ${requestedFeatures.join(" ")}`)} `;

  let matched = APP_FEATURES.filter((feature) =>
    feature.keywords.some((keyword) => haystack.includes(keyword))
  );

  // Every product needs a way in and somewhere to land.
  for (const pageType of ["auth", "dashboard"]) {
    const feature = APP_FEATURES.find((entry) => entry.pageType === pageType);
    if (feature && !matched.includes(feature)) matched = [...matched, feature];
  }

  const pages = matched.map((feature) => {
    const plan = buildPagePlan(feature.pageType);
    return {
      route: feature.route,
      file: `app/pages${feature.route === "/" ? "/index" : feature.route}.vue`,
      title: feature.title,
      layout: feature.layout,
      pageType: feature.pageType,
      sectionOrder: plan.sectionOrder,
      starterSelection: plan.sections.flatMap((section) => section.starterSelection),
      notes: plan.notes,
      readNext: plan.readNext,
    };
  });

  const usesForms = pages.some((page) =>
    ["auth", "contact", "settings", "onboarding", "admin-table"].includes(page.pageType)
  );
  const sharedComponents = uniqueSorted([
    "button",
    "card",
    "sonner",
    ...(usesForms ? ["form", "vee-input", "alert"] : []),
  ]);

  return {
    description,
    requestedFeatures,
    layouts: [
      {
        name: "default",
        file: "app/layouts/default.vue",
        purpose: "Authenticated app shell: sidebar, header and `<slot />`.",
        build: "Start from the App Sidebar and App Header blocks from the dashboard page plan.",
      },
      {
        name: "marketing",
        file: "app/layouts/marketing.vue",
        purpose: "Public pages: Navigation block, `<slot />`, Footer block.",
        build: "Use one Navigation and one Footer block so every public page shares them.",
      },
      {
        name: "auth",
        file: "app/layouts/auth.vue",
        purpose: "Centered, chrome-free layout for login, sign-up and onboarding.",
        build: "A full-height flex container that centers the page content.",
      },
    ],
    pages,
    sharedComponents,
    installPlan: buildInstallPlan(
      uniqueSorted([...pages.flatMap((page) => page.starterSelection), ...sharedComponents])
    ),
    workflow: [
      "Run get-project-setup and execute the setup commands.",
      "Read resource://uithing/design-patterns and resource://uithing/conventions.",
      "Run the installPlan commands once for the whole app instead of per page.",
      "Build the layouts first, then the pages in route order. Call get-block and get-component for exact source.",
      "Call plan-form for every form and plan-page for more block alternatives on any page.",
      "Finish with loading, empty and error states, a dark-mode check and a 375px responsive check.",
    ],
  };
}
