export default defineMcpResource({
  name: "quick-start",
  title: "UI Thing Quick Start Guide for AI",
  uri: "resource://uithing/quick-start",
  description: `Quick start guide for AI assistants to rapidly design and build websites with UI Thing.

🚀 QUICK START WORKFLOW

**Step 1: Understand the Request**
- Identify the page type (landing, dashboard, docs, etc.)
- Determine required sections
- Note any specific features or components

**Step 2: Choose Your Approach**
- Use BLOCKS for rapid section building (recommended)
- Use COMPONENTS for custom implementations
- Combine both for maximum flexibility

**Step 3: Plan the Structure**
1. Browse blocks by category or check page-templates
2. List all needed blocks/components
3. Extract component dependencies
4. Note utils, composables, plugins

**Step 4: Provide Implementation**
1. Show installation commands
2. Provide complete code
3. Include responsive considerations
4. Add accessibility features

📦 AVAILABLE RESOURCES

1. **blocks** - 100+ pre-built page sections
2. **components** - 60+ fundamental UI elements
3. **prose** - 47 documentation/content components
4. **design-patterns** - Best practices & patterns
5. **page-templates** - 16 complete page examples
6. **examples** - Real-world applications
7. **documentation-pages** - Full docs library

🎯 COMMON TASKS

**Task: Build a Landing Page**
\`\`\`typescript
// 1. Access blocks resource
// 2. Select blocks:
- BlockHero1 (components: ["button", "badge"])
- BlockFeature2 (components: ["card"])
- BlockTestimonial3 (components: ["avatar", "card"])
- BlockPricing1 (components: ["card", "button", "switch"])
- BlockCTA2 (components: ["button"])
- BlockFooter1 (components: ["button"])

// 3. Installation
npx ui-thing@latest add button badge card avatar switch

// 4. Implementation
<template>
  <div>
    <BlockHero1 />
    <BlockFeature2 />
    <BlockTestimonial3 />
    <BlockPricing1 />
    <BlockCTA2 />
    <BlockFooter1 />
  </div>
</template>
\`\`\`

**Task: Build a Dashboard**
\`\`\`typescript
// 1. Check page-templates for dashboard pattern
// 2. Components needed:
- card (stat cards)
- datatable (data lists)
- button (actions)
- badge (status)
- dropdown-menu (actions)

// 3. Installation
npx ui-thing@latest add card datatable button badge dropdown-menu

// 4. Implementation pattern from page-templates resource
\`\`\`

**Task: Add Documentation**
\`\`\`typescript
// 1. Access prose components
// 2. Key components:
- ProseCallout (alerts/info boxes)
- ProseCodeGroup (code with tabs)
- ProseTabs (tabbed content)
- ProseSteps (numbered steps)

// 3. No installation needed (auto-global)
// 4. Use in markdown:
::callout{variant="info"}
This is an info box
::

:::code-group
\`\`\`vue [Component.vue]
<template>...</template>
\`\`\`
:::
\`\`\`

💡 BEST PRACTICES FOR AI

**1. Always Start with Research**
- Check design-patterns for layout ideas
- Browse page-templates for similar pages
- Review blocks by category
- Verify component availability

**2. Provide Complete Solutions**
- Installation commands (npx ui-thing@latest add ...)
- Full code implementation
- Dependencies clearly listed
- Mobile-responsive by default

**3. Follow Conventions**
- Use PascalCase for components (UiButton, BlockHero1)
- Props use kebab-case in templates
- TypeScript types when helpful
- Tailwind classes for styling

**4. Include Accessibility**
- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation
- Focus indicators
- Sufficient color contrast

**5. Optimize for Performance**
- Lazy load images
- Use v-for with :key
- Minimize unnecessary components
- Consider code splitting

🔍 SEARCH STRATEGIES

**Finding Blocks:**
1. Know the category (Hero, Features, Pricing, etc.)
2. Access blocks resource
3. Filter by category field
4. Check components array for dependencies

**Finding Components:**
1. Think of UI element needed
2. Access components resource
3. Search by name or value
4. Check files array for implementation

**Design Guidance:**
1. Access design-patterns resource
2. Find matching page layout
3. Review component combinations
4. Follow responsive strategies

📝 CODE TEMPLATES

**Basic Page Structure:**
\`\`\`vue
<template>
  <div>
    <!-- Hero/Header -->
    <BlockHero1 />
    
    <!-- Main Content -->
    <UiContainer class="py-16">
      <!-- Your content -->
    </UiContainer>
    
    <!-- Footer -->
    <BlockFooter1 />
  </div>
</template>
\`\`\`

**Form Pattern:**
\`\`\`vue
<template>
  <UiCard>
    <UiCardContent>
      <UiForm @submit="onSubmit">
        <UiVeeInput name="name" label="Name" />
        <UiVeeInput name="email" type="email" label="Email" />
        <UiButton type="submit">Submit</UiButton>
      </UiForm>
    </UiCardContent>
  </UiCard>
</template>

<script setup>
import { object, string } from 'yup'

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(
    object({
      name: string().required(),
      email: string().email().required(),
    })
  ),
})

const onSubmit = handleSubmit(async (values) => {
  // Handle submission
})
</script>
\`\`\`

**Data Display Pattern:**
\`\`\`vue
<template>
  <div class="space-y-4">
    <!-- Stats Grid -->
    <div class="grid gap-4 md:grid-cols-4">
      <UiCard v-for="stat in stats" :key="stat.title">
        <UiCardContent>
          <div class="text-2xl font-bold">{{ stat.value }}</div>
          <p class="text-xs text-muted-foreground">{{ stat.title }}</p>
        </UiCardContent>
      </UiCard>
    </div>
    
    <!-- Data Table -->
    <UiCard>
      <UiCardHeader>
        <UiCardTitle>Data</UiCardTitle>
      </UiCardHeader>
      <UiCardContent>
        <UiDataTable :data="data" :columns="columns" />
      </UiCardContent>
    </UiCard>
  </div>
</template>
\`\`\`

🎨 STYLING GUIDELINES

**Colors:**
- primary - Brand/CTA buttons
- secondary - Secondary actions
- destructive - Delete/cancel
- muted - Subtle elements

**Spacing:**
- py-16 md:py-24 - Sections
- p-6 - Cards
- gap-4 - Elements
- space-y-6 - Vertical stacks

**Typography:**
- text-4xl font-bold - Main headings
- text-2xl font-semibold - Sub headings
- text-lg - Lead text
- text-base - Body
- text-sm text-muted-foreground - Meta

**Responsive:**
- Mobile-first (design for small first)
- md: (768px) - Tablets
- lg: (1024px) - Desktop
- xl: (1280px) - Large screens

⚠️ COMMON PITFALLS

1. **Don't** mix Block styles with custom styling
2. **Don't** forget component dependencies
3. **Don't** skip mobile testing
4. **Don't** ignore accessibility
5. **Don't** over-complicate - use blocks when possible

✅ VALIDATION CHECKLIST

Before delivering code:
- [ ] All components are valid UI Thing components
- [ ] Installation command includes all dependencies
- [ ] Code is mobile-responsive
- [ ] Accessibility features included
- [ ] TypeScript types provided (if complex)
- [ ] Comments explain key sections
- [ ] Example data provided for demonstrations

🔗 QUICK LINKS

- Documentation: https://uithing.com
- CLI: \`npx ui-thing@latest add [component]\`
- Components List: Access components resource
- Blocks Library: Access blocks resource
- Examples: Access examples resource

---

**Remember:** The goal is to provide production-ready, accessible, responsive code that follows UI Thing conventions and best practices!`,
  _meta: {
    type: "guide",
    audience: "AI assistants",
    purpose: "rapid development",
  },
  cache: "24h",
  async handler(uri: URL) {
    return {
      contents: [
        {
          uri: uri.toString(),
          mimeType: "text/markdown",
          text: `# UI Thing Quick Start for AI

## 🚀 Fast Track Workflow

1. **Understand** → What does the user want to build?
2. **Plan** → Which blocks/components are needed?
3. **Extract** → What are the dependencies?
4. **Implement** → Provide complete, working code
5. **Validate** → Check responsive, accessible, complete

## 📦 Resource Quick Reference

| Resource | Use For | Count |
|----------|---------|-------|
| blocks | Pre-built sections | 100+ |
| components | UI building blocks | 60+ |
| prose | Content/docs elements | 47 |
| design-patterns | Best practices | Guide |
| page-templates | Complete pages | 16 |
| examples | Real applications | Multiple |

## 🎯 Example: Build Landing Page

### Step 1: Plan
- Hero → BlockHero1
- Features → BlockFeature2
- Social Proof → BlockTestimonial3
- Pricing → BlockPricing1
- CTA → BlockCTA2
- Footer → BlockFooter1

### Step 2: Dependencies
From blocks:
- button, badge (Hero)
- card (Features, Testimonials, Pricing)
- avatar (Testimonials)
- switch (Pricing)

### Step 3: Install
\`\`\`bash
npx ui-thing@latest add button badge card avatar switch
\`\`\`

### Step 4: Implement
\`\`\`vue
<template>
  <div>
    <BlockHero1 />
    <BlockFeature2 />
    <BlockTestimonial3 />
    <BlockPricing1 />
    <BlockCTA2 />
    <BlockFooter1 />
  </div>
</template>
\`\`\`

## 💡 Key Patterns

### Form with Validation
\`\`\`vue
<UiCard>
  <UiCardContent>
    <UiForm @submit="onSubmit">
      <UiVeeInput name="email" label="Email" />
      <UiVeePassword name="password" label="Password" />
      <UiButton type="submit">Submit</UiButton>
    </UiForm>
  </UiCardContent>
</UiCard>
\`\`\`

### Dashboard Stats
\`\`\`vue
<div class="grid gap-4 md:grid-cols-4">
  <UiCard v-for="stat in stats">
    <UiCardContent>
      <div class="text-2xl font-bold">{{ stat.value }}</div>
      <p class="text-xs text-muted-foreground">{{ stat.title }}</p>
    </UiCardContent>
  </UiCard>
</div>
\`\`\`

## ✅ Quality Checklist

- [ ] Valid UI Thing components only
- [ ] Installation command provided
- [ ] Mobile responsive
- [ ] Accessible by default
- [ ] Clean, commented code
- [ ] Example data included

## 🎨 Style Quick Reference

**Colors:** primary, secondary, destructive, muted
**Spacing:** py-16 (sections), p-6 (cards), gap-4 (elements)
**Text:** text-4xl (h1), text-2xl (h2), text-lg (lead), text-base (body)
**Responsive:** Mobile-first, md:, lg:, xl:

## ⚡ Pro Tips

1. Start with blocks for speed
2. Use components for customization
3. Check page-templates for patterns
4. Follow design-patterns guide
5. Always include accessibility
6. Think mobile-first
7. Keep it simple

---

**Remember:** Production-ready code that's responsive, accessible, and follows UI Thing conventions!`,
        },
      ],
    };
  },
});
