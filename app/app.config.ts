const repoBase = "https://github.com/BayBreezy/ui-thing";

export default defineAppConfig({
  docd: {
    github: {
      repo: repoBase,
      branch: "main",
      contentDir: "content",
    },
    ui: {
      borderType: "solid",
      header: {
        title: "UI Thing",
        logo: {
          alt: "UI Thing Logo",
          light: "/logo-light.svg",
          dark: "/logo-dark.svg",
          favicon: "/favicon.ico",
        },
      },
      body: {
        maxWidth: "800px",
      },
      extraLinks: [
        { icon: "lucide:star", label: "Star on Github", external: true, href: repoBase },
        {
          icon: "lucide:bug",
          label: "Report an issue",
          external: true,
          href: `${repoBase}/issues/new?template=bug_report.yml`,
        },
        {
          icon: "lucide:lightbulb",
          label: "Feature request",
          external: true,
          href: `${repoBase}/issues/new?template=feature-request.yml`,
        },
        {
          icon: "lucide:coffee",
          label: "Buy me coffee",
          external: true,
          href: "https://buymeacoffee.com/llehXIrI8g",
        },
      ],
      transition: {
        name: "fade",
      },
    },
  },
});
