export default defineMcpResource({
  name: "page-templates",
  title: "Complete Page Templates & Examples",
  uri: "resource://uithing/page-templates",
  description: `Ready-to-use page templates with complete component compositions and block combinations.

🎯 PURPOSE:
Provides AI with concrete examples of complete, production-ready pages that combine blocks and components effectively.

📄 TEMPLATE CATALOG:

1. **Homepage / Landing Page**
2. **About Us Page**
3. **Contact Page**
4. **Pricing Page**
5. **Blog / Articles Page**
6. **Blog Post / Article Page**
7. **Documentation Page**
8. **Dashboard Page**
9. **User Profile Page**
10. **Settings Page**
11. **Authentication Pages (Login, Register, Reset Password)**
12. **E-commerce Product Page**
13. **Shopping Cart Page**
14. **Checkout Page**
15. **404 Error Page**
16. **Terms of Service / Privacy Policy**

💡 Each template includes:
- Complete block/component list
- Layout structure
- Responsive considerations
- Code example
- Installation commands`,
  _meta: {
    totalTemplates: 16,
    categories: ["marketing", "content", "application", "ecommerce", "legal"],
  },
  cache: "24h",
  async handler(uri: URL) {
    const templates = [
      {
        id: "homepage",
        name: "Homepage / Landing Page",
        category: "marketing",
        description: "Modern landing page with hero, features, testimonials, and CTA",
        blocks: [
          "BlockHero1",
          "BlockFeature2",
          "BlockTestimonial3",
          "BlockPricing1",
          "BlockCTA2",
          "BlockFooter1",
        ],
        components: ["button", "card", "badge", "avatar"],
        installation: "npx ui-thing@latest add button card badge avatar",
        structure: `
<template>
  <div>
    <!-- Hero Section -->
    <BlockHero1 />
    
    <!-- Features Section -->
    <BlockFeature2 />
    
    <!-- Social Proof -->
    <BlockTestimonial3 />
    
    <!-- Pricing -->
    <BlockPricing1 />
    
    <!-- Final CTA -->
    <BlockCTA2 />
    
    <!-- Footer -->
    <BlockFooter1 />
  </div>
</template>`,
        tips: [
          "Use a compelling hero with clear value proposition",
          "Show features with icons and brief descriptions",
          "Include customer testimonials for trust",
          "Make pricing clear and actionable",
          "End with a strong CTA",
        ],
      },
      {
        id: "about-us",
        name: "About Us Page",
        category: "content",
        description: "Company story, team, values, and contact information",
        blocks: [
          "BlockAbout1",
          "BlockAbout2",
          "BlockAbout17",
          "BlockAbout15",
          "BlockAbout19",
          "BlockFooter1",
        ],
        components: ["card", "avatar", "badge", "button"],
        installation: "npx ui-thing@latest add card avatar badge button",
        structure: `
<template>
  <div>
    <!-- Company Overview -->
    <BlockAbout1 />
    
    <!-- Team Section -->
    <BlockAbout2 />
    
    <!-- Why Choose Us -->
    <BlockAbout17 />
    
    <!-- Awards & Recognition -->
    <BlockAbout15 />
    
    <!-- Contact Integration -->
    <BlockAbout19 />
    
    <BlockFooter1 />
  </div>
</template>`,
        tips: [
          "Tell your story authentically",
          "Showcase team with photos and roles",
          "Highlight unique value propositions",
          "Include trust signals (awards, certifications)",
          "Make it easy to get in touch",
        ],
      },
      {
        id: "contact",
        name: "Contact Page",
        category: "content",
        description: "Contact form with office locations and contact methods",
        blocks: ["BlockContact3", "BlockFooter1"],
        components: ["card", "form", "veeinput", "veetextarea", "button", "alert"],
        installation: "npx ui-thing@latest add card form veeinput veetextarea button alert",
        structure: `
<template>
  <div>
    <UiContainer class="py-16">
      <div class="mx-auto max-w-4xl">
        <h1 class="text-4xl font-bold">Get in Touch</h1>
        <p class="mt-4 text-lg text-muted-foreground">
          We'd love to hear from you
        </p>
        
        <div class="mt-12 grid gap-8 lg:grid-cols-2">
          <!-- Contact Info -->
          <div class="space-y-6">
            <div class="flex gap-4">
              <Icon name="lucide:mail" class="size-6 text-primary" />
              <div>
                <h3 class="font-semibold">Email</h3>
                <p class="text-sm text-muted-foreground">hello@company.com</p>
              </div>
            </div>
            <!-- More contact methods -->
          </div>
          
          <!-- Contact Form -->
          <UiCard>
            <UiCardContent>
              <UiForm @submit="onSubmit">
                <UiVeeInput name="name" label="Name" />
                <UiVeeInput name="email" type="email" label="Email" />
                <UiVeeTextarea name="message" label="Message" />
                <UiButton type="submit">Send Message</UiButton>
              </UiForm>
            </UiCardContent>
          </UiCard>
        </div>
      </div>
    </UiContainer>
    
    <BlockFooter1 />
  </div>
</template>`,
        tips: [
          "Provide multiple contact methods",
          "Include office locations if applicable",
          "Use validation on the form",
          "Show confirmation after submission",
          "Make it mobile-friendly",
        ],
      },
      {
        id: "pricing",
        name: "Pricing Page",
        category: "marketing",
        description: "Pricing tiers with features, comparison, and FAQ",
        blocks: ["BlockPricing1", "BlockAbout18", "BlockCTA1", "BlockFooter1"],
        components: ["card", "button", "badge", "switch", "collapsible"],
        installation: "npx ui-thing@latest add card button badge switch collapsible",
        structure: `
<template>
  <div>
    <!-- Pricing Cards -->
    <BlockPricing1 />
    
    <!-- FAQ Section -->
    <BlockAbout18 />
    
    <!-- Final CTA -->
    <BlockCTA1 />
    
    <BlockFooter1 />
  </div>
</template>`,
        tips: [
          "Highlight the most popular plan",
          "Show annual vs monthly toggle",
          "Include all features in each tier",
          "Add FAQ to address objections",
          "Make CTAs clear and prominent",
        ],
      },
      {
        id: "dashboard",
        name: "Dashboard Page",
        category: "application",
        description: "Admin dashboard with stats, charts, and data tables",
        blocks: [],
        components: ["card", "datatable", "button", "badge", "tabs", "select", "dropdown-menu"],
        installation:
          "npx ui-thing@latest add card datatable button badge tabs select dropdown-menu",
        structure: `
<template>
  <div class="container py-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold">Dashboard</h1>
      <UiButton>
        <Icon name="lucide:plus" class="mr-2 size-4" />
        New Item
      </UiButton>
    </div>
    
    <!-- Stats Grid -->
    <div class="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <UiCard v-for="stat in stats" :key="stat.title">
        <UiCardContent>
          <div class="text-2xl font-bold">{{ stat.value }}</div>
          <p class="text-xs text-muted-foreground">{{ stat.title }}</p>
        </UiCardContent>
      </UiCard>
    </div>
    
    <!-- Data Table -->
    <div class="mt-6">
      <UiCard>
        <UiCardHeader>
          <UiCardTitle>Recent Activity</UiCardTitle>
        </UiCardHeader>
        <UiCardContent>
          <UiDataTable :data="data" :columns="columns" />
        </UiCardContent>
      </UiCard>
    </div>
  </div>
</template>`,
        tips: [
          "Show key metrics at the top",
          "Use cards for stat grouping",
          "Include charts for visualizations",
          "Make tables interactive and searchable",
          "Add filters and sorting options",
        ],
      },
      {
        id: "auth-login",
        name: "Login Page",
        category: "application",
        description: "Authentication page with social login options",
        blocks: [],
        components: ["card", "form", "veeinput", "veepassword", "button", "divider"],
        installation: "npx ui-thing@latest add card form veeinput veepassword button divider",
        structure: `
<template>
  <div class="flex min-h-screen items-center justify-center p-4">
    <UiCard class="w-full max-w-md">
      <UiCardHeader>
        <UiCardTitle>Welcome Back</UiCardTitle>
        <UiCardDescription>Sign in to your account</UiCardDescription>
      </UiCardHeader>
      <UiCardContent>
        <UiForm @submit="onSubmit">
          <UiVeeInput name="email" type="email" label="Email" />
          <UiVeePassword name="password" label="Password" />
          
          <div class="flex items-center justify-between">
            <UiCheckbox label="Remember me" />
            <NuxtLink to="/forgot-password" class="text-sm text-primary">
              Forgot password?
            </NuxtLink>
          </div>
          
          <UiButton type="submit" class="w-full">Sign In</UiButton>
        </UiForm>
        
        <UiDivider label="Or continue with" />
        
        <div class="grid grid-cols-2 gap-4">
          <UiButton variant="outline">
            <Icon name="logos:google-icon" class="mr-2 size-4" />
            Google
          </UiButton>
          <UiButton variant="outline">
            <Icon name="logos:github-icon" class="mr-2 size-4" />
            GitHub
          </UiButton>
        </div>
        
        <p class="text-center text-sm text-muted-foreground">
          Don't have an account?
          <NuxtLink to="/register" class="text-primary">Sign up</NuxtLink>
        </p>
      </UiCardContent>
    </UiCard>
  </div>
</template>`,
        tips: [
          "Keep the form simple and focused",
          "Offer social login for convenience",
          "Include forgot password link",
          "Add link to registration",
          "Show clear error messages",
        ],
      },
      {
        id: "blog-list",
        name: "Blog / Articles List",
        category: "content",
        description: "Blog listing with filters, search, and pagination",
        blocks: ["BlockBlog1"],
        components: ["card", "input", "badge", "button", "pagination"],
        installation: "npx ui-thing@latest add card input badge button pagination",
        structure: `
<template>
  <div class="container py-16">
    <h1 class="text-4xl font-bold">Blog</h1>
    
    <!-- Search & Filters -->
    <div class="mt-8 flex gap-4">
      <UiInput placeholder="Search articles..." />
      <UiSelect placeholder="Category" />
    </div>
    
    <!-- Articles Grid -->
    <div class="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <UiCard v-for="post in posts" :key="post.id" class="pt-0">
        <img :src="post.image" class="h-48 w-full object-cover rounded-t-lg" />
        <UiCardContent>
          <div class="flex gap-2">
            <UiBadge>{{ post.category }}</UiBadge>
          </div>
          <h2 class="mt-3 text-xl font-bold">{{ post.title }}</h2>
          <p class="mt-2 text-sm text-muted-foreground">{{ post.excerpt }}</p>
          <div class="mt-4 flex items-center gap-3">
            <UiAvatar :src="post.author.avatar" size="sm" />
            <div class="text-sm">
              <p class="font-medium">{{ post.author.name }}</p>
              <p class="text-muted-foreground">{{ post.date }}</p>
            </div>
          </div>
        </UiCardContent>
      </UiCard>
    </div>
    
    <!-- Pagination -->
    <div class="mt-8 flex justify-center">
      <UiPagination :total="totalPages" v-model="currentPage" />
    </div>
  </div>
</template>`,
        tips: [
          "Show featured image for each post",
          "Include author info and date",
          "Add category badges",
          "Implement search and filters",
          "Use pagination for many posts",
        ],
      },
      {
        id: "documentation",
        name: "Documentation Page",
        category: "content",
        description: "Technical documentation with sidebar navigation and TOC",
        blocks: [],
        components: ["container", "breadcrumbs", "prose-*"],
        installation: "npx ui-thing@latest add container breadcrumbs",
        structure: `
<template>
  <div class="flex min-h-screen">
    <!-- Sidebar -->
    <aside class="hidden w-64 border-r lg:block">
      <nav class="sticky top-0 p-6">
        <!-- Navigation items -->
      </nav>
    </aside>
    
    <!-- Main Content -->
    <main class="flex-1">
      <UiContainer class="py-8">
        <UiBreadcrumbs>
          <UiBreadcrumbsItem to="/docs">Docs</UiBreadcrumbsItem>
          <UiBreadcrumbsItem>Current Page</UiBreadcrumbsItem>
        </UiBreadcrumbs>
        
        <article class="prose prose-slate dark:prose-invert max-w-none">
          <ContentDoc />
        </article>
      </UiContainer>
    </main>
    
    <!-- Table of Contents -->
    <aside class="hidden w-64 border-l xl:block">
      <nav class="sticky top-0 p-6">
        <!-- TOC items -->
      </nav>
    </aside>
  </div>
</template>`,
        tips: [
          "Use clear hierarchy in sidebar",
          "Show breadcrumbs for navigation",
          "Include table of contents",
          "Make code snippets copyable",
          "Add search functionality",
        ],
      },
    ];

    return {
      contents: [
        {
          uri: uri.toString(),
          mimeType: "application/json",
          text: JSON.stringify(
            {
              meta: {
                total: templates.length,
                categories: ["marketing", "content", "application", "ecommerce", "legal"],
                lastUpdated: new Date().toISOString(),
              },
              templates,
            },
            null,
            2
          ),
        },
      ],
    };
  },
});
