export default [
  {
    name: "ShowCase",
    value: "show-case",
    description:
      "A prose component that shows a Preview of a component along with its code snippets in a tabbed interface.",
    filePath: "app/components/content/ShowCase.global.vue",
    fileName: "ShowCase.global.vue",
    components: ["tabs"],
  },
  {
    name: "Callout",
    value: "callout",
    description:
      "A prose component that displays important information with icons and variants for different message types.",
    filePath: "app/components/content/prose/Callout/ProseCallout.global.vue",
    fileName: "ProseCallout.global.vue",
    docsUrl: "/prose/callout",
  },
  {
    name: "Card",
    value: "card",
    description:
      "A prose component that display content in elegant cards with animated border beam effects, perfect for features, navigation, and content highlights.",
    filePath: "app/components/content/prose/Card/ProseCard.global.vue",
    fileName: "ProseCard.global.vue",
    components: ["border-beam"],
    prose: ["smart-icon"],
    docsUrl: "/prose/card",
  },
  {
    name: "Code Collapse",
    value: "code-collapse",
    description:
      "A prose component that is a collapsible code block wrapper, perfect for showing long code examples without overwhelming your documentation.",
    filePath: "app/components/content/prose/Code/ProseCodeCollapse.global.vue",
    fileName: "ProseCodeCollapse.global.vue",
    prose: ["smart-icon"],
    docsUrl: "/prose/code-collapse",
  },
  {
    name: "Code Copy",
    value: "code-copy",
    description:
      "A prose component that adds a copy-to-clipboard button to code blocks, enhancing user experience in documentation and tutorials.",
    filePath: "app/components/content/prose/Code/ProseCodeCopy.global.vue",
    fileName: "ProseCodeCopy.global.vue",
    components: ["tooltip", "button", "sonner"],
  },
  {
    name: "Code Group",
    value: "code-group",
    description:
      "A prose component that displays multiple code snippets in a tabbed interface with automatic language detection, custom icons, and sync support across groups.",
    filePath: "app/components/content/prose/Code/ProseCodeGroup.global.vue",
    fileName: "ProseCodeGroup.global.vue",
    prose: ["tabs"],
    docsUrl: "/prose/code-group",
    composables: ["useDefaultSlotItems"],
  },
  {
    name: "Code Snippet",
    value: "code-snippet",
    description:
      "A prose component that dynamically import and display code from your project files or external URLs without duplicating content in your documentation.",
    filePath: "app/components/content/prose/Code/ProseCodeSnippet.global.vue",
    fileName: "ProseCodeSnippet.global.vue",
    prose: ["callout"],
    docsUrl: "/prose/code-snippet",
  },
  {
    name: "Mermaid",
    value: "mermaid",
    description:
      "A prose component that renders interactive diagrams and flowcharts using Mermaid syntax with automatic theme detection and lazy loading.",
    filePath: "app/components/content/prose/Code/ProseMermaid.global.vue",
    fileName: "ProseMermaid.global.vue",
    prose: ["callout", "pre"],
    docsUrl: "/prose/mermaid",
    deps: ["mermaid"],
    plugins: ["mermaid.client"],
  },
  {
    name: "Pre",
    value: "pre",
    description:
      "A prose component that renders code snippets with syntax highlighting, line numbers, and optional copy-to-clipboard functionality.",
    filePath: "app/components/content/prose/Code/ProsePre.global.vue",
    fileName: "ProsePre.global.vue",
    prose: ["smart-icon", "code-copy", "mermaid"],
    deps: ["@baybreezy/file-extension-icon", "lodash-es"],
    composables: ["useDocPage"],
    modules: ["gtag"],
  },
  {
    name: "Code Tree",
    value: "code-tree",
    description:
      "A prose component that displays a hierarchical file structure with expandable folders and file preview, perfect for showcasing project structures and code organization.",
    filePath: "app/components/content/prose/CodeTree/ProseCodeTree.global.vue",
    fileName: "ProseCodeTree.global.vue",
    docsUrl: "/prose/code-tree",
    prose: ["pre"],
    deps: ["@baybreezy/file-extension-icon"],
    composables: ["useDefaultSlotItems"],
    components: ["gradient-divider"],
  },
  {
    name: "Collapsible",
    value: "collapsible",
    description:
      "A prose component that hide and reveal content with a collapsible component featuring customizable icons and labels.",
    filePath: "app/components/content/prose/ProseCollapsible.global.vue",
    fileName: "ProseCollapsible.global.vue",
    docsUrl: "/prose/collapsible",
    prose: ["smart-icon"],
    components: ["collapsible"],
  },
  {
    name: "Field",
    value: "field",
    description:
      "A prose component that displays component props or configuration options in a beautiful, readable format instead of traditional tables.",
    filePath: "app/components/content/prose/Field/ProseField.global.vue",
    fileName: "ProseField.global.vue",
    docsUrl: "/prose/field",
    prose: ["smart-icon", "pre"],
    components: ["tooltip"],
  },
  {
    name: "Field Group",
    value: "field-group",
    description:
      "A prose component that displays component props or configuration options in a beautiful, readable format instead of traditional tables.",
    filePath: "app/components/content/prose/Field/ProseFieldGroup.global.vue",
    fileName: "ProseFieldGroup.global.vue",
    docsUrl: "/prose/field",
    prose: ["field"],
  },
  {
    name: "Color Mode Image",
    value: "color-mode-image",
    description:
      "A prose component that allows you to use images in your content with zoom and styling options that adapt to light and dark color modes.",
    filePath: "app/components/content/prose/Images/ProseColorModeImage.global.vue",
    fileName: "ProseColorModeImage.global.vue",
    docsUrl: "/prose/image",
    prose: ["image"],
  },
  {
    name: "Image",
    value: "image",
    description:
      "A prose component that allows you to use images in your content with zoom and styling options.",
    filePath: "app/components/content/prose/Images/ProseImg.global.vue",
    fileName: "ProseImg.global.vue",
    docsUrl: "/prose/image",
    modules: ["image"],
    deps: ["ufo"],
  },
  {
    name: "PM Install",
    value: "pm-install",
    description:
      "A prose component that displays an install command for multiple package managers with automatic syncing and switching.",
    filePath: "app/components/content/prose/PackageManager/ProsePmInstall.global.vue",
    fileName: "ProsePmInstall.global.vue",
    docsUrl: "/prose/package-manager",
    composables: ["usePm"],
    prose: ["pre", "code-group"],
  },
  {
    name: "PM Run",
    value: "pm-run",
    description:
      "A prose component that displays a run command for multiple package managers with automatic syncing and switching.",
    filePath: "app/components/content/prose/PackageManager/ProsePmRun.global.vue",
    fileName: "ProsePmRun.global.vue",
    docsUrl: "/prose/package-manager",
    composables: ["usePm"],
    prose: ["pre", "code-group"],
  },
  {
    name: "PM X",
    value: "pm-x",
    description:
      "A prose component that displays an execute command for multiple package managers with automatic syncing and switching.",
    filePath: "app/components/content/prose/PackageManager/ProsePmX.global.vue",
    fileName: "ProsePmX.global.vue",
    docsUrl: "/prose/package-manager",
    composables: ["usePm"],
    prose: ["pre", "code-group"],
  },
  {
    name: "Steps",
    value: "steps",
    description:
      "A prose component that displays numbered sequential steps with auto-incrementing counters, perfect for tutorials, installation guides, and multi-step processes.",
    filePath: "app/components/content/prose/Step/Steps.global.vue",
    fileName: "Steps.global.vue",
    docsUrl: "/prose/steps",
    prose: ["step"],
  },
  {
    name: "Step",
    value: "step",
    description:
      "A prose component that displays numbered sequential steps with auto-incrementing counters, perfect for tutorials, installation guides, and multi-step processes.",
    filePath: "app/components/content/prose/Step/Step.global.vue",
    fileName: "Step.global.vue",
    docsUrl: "/prose/steps",
    prose: ["steps"],
  },
  {
    name: "Tabs",
    value: "tabs",
    description:
      "A prose component that displays content in a tabbed interface, perfect for organizing information and improving readability in documentation.",
    filePath: "app/components/content/prose/Tabs/ProseTabs.global.vue",
    fileName: "ProseTabs.global.vue",
    docsUrl: "/prose/tabs",
    prose: ["tabs-inner"],
    composables: ["useDefaultSlotItems"],
  },
  {
    name: "Tabs Inner",
    value: "tabs-inner",
    description:
      "A prose component that displays content in a tabbed interface, perfect for organizing information and improving readability in documentation.",
    filePath: "app/components/content/prose/Tabs/ProseTabsInner.global.vue",
    fileName: "ProseTabsInner.global.vue",
    docsUrl: "/prose/tabs",
    prose: ["tabs", "smart-icon"],
    components: ["tabs", "card", "scroll-area", "popover", "button", "command"],
    deps: ["@baybreezy/file-extension-icon"],
    composables: ["useDefaultSlotItems"],
  },
  {
    name: "Heading 1",
    value: "h1",
    description:
      "A prose component that displays styled heading level 1 elements for consistent typography in your content.",
    filePath: "app/components/content/prose/Typography/Headings/ProseH1.global.vue",
    fileName: "ProseH1.global.vue",
    docsUrl: "/prose/typography",
  },
  {
    name: "Heading 2",
    value: "h2",
    description:
      "A prose component that displays styled heading level 2 elements for consistent typography in your content.",
    filePath: "app/components/content/prose/Typography/Headings/ProseH2.global.vue",
    fileName: "ProseH2.global.vue",
    docsUrl: "/prose/typography",
  },
  {
    name: "Heading 3",
    value: "h3",
    description:
      "A prose component that displays styled heading level 3 elements for consistent typography in your content.",
    filePath: "app/components/content/prose/Typography/Headings/ProseH3.global.vue",
    fileName: "ProseH3.global.vue",
    docsUrl: "/prose/typography",
  },
  {
    name: "Heading 4",
    value: "h4",
    description:
      "A prose component that displays styled heading level 4 elements for consistent typography in your content.",
    filePath: "app/components/content/prose/Typography/Headings/ProseH4.global.vue",
    fileName: "ProseH4.global.vue",
    docsUrl: "/prose/typography",
  },
  {
    name: "Heading 5",
    value: "h5",
    description:
      "A prose component that displays styled heading level 5 elements for consistent typography in your content.",
    filePath: "app/components/content/prose/Typography/Headings/ProseH5.global.vue",
    fileName: "ProseH5.global.vue",
    docsUrl: "/prose/typography",
  },
  {
    name: "Heading 6",
    value: "h6",
    description:
      "A prose component that displays styled heading level 6 elements for consistent typography in your content.",
    filePath: "app/components/content/prose/Typography/Headings/ProseH6.global.vue",
    fileName: "ProseH6.global.vue",
    docsUrl: "/prose/typography",
  },
  {
    name: "Icon List",
    value: "icon-list",
    description:
      "A prose component that displays lists with custom icons and variants for each item.",
    filePath: "app/components/content/prose/Typography/Lists/ProseIconList.global.vue",
    fileName: "ProseIconList.global.vue",
    docsUrl: "/prose/icon-list",
    composables: ["useDefaultSlotItems"],
  },
  {
    name: "List Item",
    value: "li",
    description:
      "A prose component that displays styled list item elements for consistent typography in your content.",
    filePath: "app/components/content/prose/Typography/Lists/ProseLi.global.vue",
    fileName: "ProseLi.global.vue",
    docsUrl: "/prose/typography",
  },
  {
    name: "Ordered List",
    value: "ol",
    description:
      "A prose component that displays styled ordered list elements for consistent typography in your content.",
    filePath: "app/components/content/prose/Typography/Lists/ProseOl.global.vue",
    fileName: "ProseOl.global.vue",
    docsUrl: "/prose/typography",
  },
  {
    name: "Unordered List",
    value: "ul",
    description:
      "A prose component that displays styled unordered list elements for consistent typography in your content.",
    filePath: "app/components/content/prose/Typography/Lists/ProseUl.global.vue",
    fileName: "ProseUl.global.vue",
    docsUrl: "/prose/typography",
  },
  {
    name: "Table",
    value: "table",
    description:
      "A prose component that displays styled table elements for consistent typography in your content.",
    filePath: "app/components/content/prose/Typography/Table/ProseTable.global.vue",
    fileName: "ProseTable.global.vue",
    docsUrl: "/prose/typography",
    prose: ["thead", "tbody", "tr", "th", "td"],
  },
  {
    name: "Table Body",
    value: "tbody",
    description:
      "A prose component that displays styled table elements for consistent typography in your content.",
    filePath: "app/components/content/prose/Typography/Table/ProseTbody.global.vue",
    fileName: "ProseTbody.global.vue",
    docsUrl: "/prose/typography",
    prose: ["table"],
  },
  {
    name: "Table Data",
    value: "td",
    description:
      "A prose component that displays styled table elements for consistent typography in your content.",
    filePath: "app/components/content/prose/Typography/Table/ProseTd.global.vue",
    fileName: "ProseTd.global.vue",
    docsUrl: "/prose/typography",
    prose: ["table"],
  },
  {
    name: "Table Data",
    value: "td",
    description:
      "A prose component that displays styled table elements for consistent typography in your content.",
    filePath: "app/components/content/prose/Typography/Table/ProseTd.global.vue",
    fileName: "ProseTd.global.vue",
    docsUrl: "/prose/typography",
    prose: ["table"],
  },
  {
    name: "Table Header",
    value: "th",
    description:
      "A prose component that displays styled table elements for consistent typography in your content.",
    filePath: "app/components/content/prose/Typography/Table/ProseTh.global.vue",
    fileName: "ProseTh.global.vue",
    docsUrl: "/prose/typography",
    prose: ["table"],
  },
  {
    name: "Table Head",
    value: "thead",
    description:
      "A prose component that displays styled table elements for consistent typography in your content.",
    filePath: "app/components/content/prose/Typography/Table/ProseThead.global.vue",
    fileName: "ProseThead.global.vue",
    docsUrl: "/prose/typography",
    prose: ["table"],
  },
  {
    name: "Table Row",
    value: "tr",
    description:
      "A prose component that displays styled table elements for consistent typography in your content.",
    filePath: "app/components/content/prose/Typography/Table/ProseTr.global.vue",
    fileName: "ProseTr.global.vue",
    docsUrl: "/prose/typography",
    prose: ["table"],
  },
  {
    name: "Link <a>",
    value: "a",
    description:
      "A prose component that displays styled anchor link elements for consistent typography in your content.",
    filePath: "app/components/content/prose/Typography/ProseA.global.vue",
    fileName: "ProseA.global.vue",
    docsUrl: "/prose/typography",
  },
  {
    name: "Blockquote",
    value: "blockquote",
    description:
      "A prose component that displays styled blockquote elements for consistent typography in your content.",
    filePath: "app/components/content/prose/Typography/ProseBlockquote.global.vue",
    fileName: "ProseBlockquote.global.vue",
    docsUrl: "/prose/typography",
  },
  {
    name: "Emphasis <em>",
    value: "em",
    description:
      "A prose component that displays styled emphasis elements for consistent typography in your content.",
    filePath: "app/components/content/prose/Typography/ProseEm.global.vue",
    fileName: "ProseEm.global.vue",
    docsUrl: "/prose/typography",
  },
  {
    name: "Horizontal Rule",
    value: "hr",
    description:
      "A prose component that displays styled horizontal rule elements for consistent typography in your content.",
    filePath: "app/components/content/prose/Typography/ProseHr.global.vue",
    fileName: "ProseHr.global.vue",
    docsUrl: "/prose/typography",
  },
  {
    name: "Lead",
    value: "lead",
    description:
      "A prose component that displays styled lead text elements for consistent typography in your content.",
    filePath: "app/components/content/prose/Typography/ProseLead.global.vue",
    fileName: "ProseLead.global.vue",
    docsUrl: "/prose/typography",
  },
  {
    name: "Paragraph",
    value: "p",
    description:
      "A prose component that displays styled paragraph text elements for consistent typography in your content.",
    filePath: "app/components/content/prose/Typography/ProseP.global.vue",
    fileName: "ProseP.global.vue",
    docsUrl: "/prose/typography",
  },
  {
    name: "Strong <strong>",
    value: "strong",
    description:
      "A prose component that displays styled strong text elements for consistent typography in your content.",
    filePath: "app/components/content/prose/Typography/ProseStrong.global.vue",
    fileName: "ProseStrong.global.vue",
    docsUrl: "/prose/typography",
  },
  {
    name: "Smart Icon",
    value: "smart-icon",
    description:
      "A prose component that displays icons intelligently based on provided names, enhancing visual appeal and user experience in your content.",
    filePath: "app/components/content/prose/ProseSmartIcon.global.vue",
    fileName: "ProseSmartIcon.global.vue",
    deps: ["@iconify/utils"],
    modules: ["image"],
  },
];
