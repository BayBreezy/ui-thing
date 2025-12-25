export default defineMcpResource({
  name: "design-patterns",
  title: "UI Thing Design Patterns & Best Practices",
  uri: "resource://uithing/design-patterns",
  description: `Curated collection of design patterns, layout strategies, and best practices for building modern web applications.

🎨 PURPOSE:
This resource provides AI assistants with battle-tested patterns and guidelines for:
- Page layouts and composition
- Component combinations that work well together
- Responsive design strategies
- Accessibility best practices
- User experience patterns

📐 COMMON PAGE LAYOUTS:

1. **Landing Page Pattern**
   Components: Hero → Features → Testimonials → CTA → Footer
   Blocks: BlockHero1-5, BlockFeature1-10, BlockTestimonial1-5, BlockCTA1-5, BlockFooter1-8
   
2. **Documentation Page**
   Components: Container, Breadcrumbs, Heading, Prose components
   Layout: Sidebar navigation + Main content + Table of contents
   
3. **Dashboard Pattern**
   Components: Card, DataTable, Chart, Badge, Button, Tabs
   Layout: Top nav → Sidebar → Grid of Cards with stats and charts
   
4. **E-commerce Product Page**
   Components: Carousel, Button, Badge, Tabs, Accordion, Dialog
   Layout: Image gallery + Product info + Tabs (Description, Reviews, Shipping)
   
5. **Blog/Article Page**
   Components: Container, Prose components, Card (related posts), Avatar
   Layout: Hero image → Article content → Author bio → Related posts
   
6. **Contact/Form Page**
   Components: Card, Form, Input, Textarea, Button, Alert
   Layout: Split (Contact info + Form) or Centered card
   
7. **Pricing Page**
   Components: Card, Badge, Button, Switch (monthly/yearly)
   Blocks: BlockPricing1-10
   Layout: Header → Pricing cards grid → FAQ → CTA
   
8. **About Page**
   Blocks: BlockAbout1-19
   Pattern: Story → Team → Values → Awards → Contact

🎯 COMPONENT COMBINATIONS:

**Form Patterns:**
- Input + Button (Search bar)
- Form + Input + Checkbox + Button (Sign up)
- Select + Input + DatePicker (Filters)
- Card + Form + Alert (Login/Register cards)

**Navigation Patterns:**
- Breadcrumbs + Heading (Page header)
- Tabs + Card (Tabbed content)
- Command + Dialog (Command palette)
- DropdownMenu + Avatar (User menu)

**Data Display:**
- DataTable + Badge + DropdownMenu (Actions)
- Card + Avatar + Badge (User cards)
- Carousel + Card (Product showcase)
- Accordion + Icon (FAQ sections)

**Feedback Patterns:**
- Toast/Sonner (Success/Error messages)
- Dialog + Form (Confirmation modals)
- Popover + Form (Quick actions)
- AlertDialog (Destructive actions)

📱 RESPONSIVE STRATEGIES:

**Mobile-First Approach:**
1. Stack vertically by default
2. Use Drawer instead of Dialog on mobile
3. Collapse navigation to hamburger menu
4. Use Sheet for mobile filters
5. Reduce padding/margins on small screens

**Breakpoint Usage:**
- sm (640px): 2-column grids, show more content
- md (768px): Sidebar appears, 3-column grids
- lg (1024px): Full desktop layout, 4-column grids
- xl (1280px): Max width containers, spacious layouts

♿ ACCESSIBILITY GUIDELINES:

1. **Always include:**
   - Semantic HTML structure
   - ARIA labels where needed
   - Keyboard navigation support
   - Focus indicators
   - Sufficient color contrast

2. **Forms:**
   - Use Label components
   - Provide error messages
   - Show validation states
   - Include helper text

3. **Interactive Elements:**
   - Minimum touch target: 44x44px
   - Clear hover/focus states
   - Loading states for async actions
   - Disabled states when appropriate

🎨 DESIGN TOKENS:

**Color Usage:**
- primary: Brand color, CTA buttons, links
- secondary: Less prominent actions
- destructive: Delete, cancel, dangerous actions
- muted: Subtle backgrounds, secondary text
- accent: Highlights, notifications

**Typography Scale:**
- text-xs (12px): Metadata, captions
- text-sm (14px): Body text, form inputs
- text-base (16px): Default body
- text-lg (18px): Larger body, leads
- text-xl to 5xl: Headings

**Spacing:**
- Consistent scale: 0.25rem increments
- Card padding: p-6 (24px)
- Section spacing: py-16 md:py-24
- Element gaps: gap-4 to gap-8

💡 AI USAGE TIPS:

1. **Start with blocks** for complete sections
2. **Use components** for custom implementations
3. **Combine patterns** for full pages
4. **Check dependencies** before suggesting components
5. **Consider responsive** behavior in layouts
6. **Include accessibility** features by default
7. **Use prose components** for content-heavy pages
8. **Leverage the design system** for consistency

📚 EXAMPLE WORKFLOWS:

**Creating a Landing Page:**
1. Choose a Hero block (BlockHero1-10)
2. Add Features section (BlockFeature1-10)
3. Include Social Proof (BlockTestimonial1-5)
4. Add Pricing (BlockPricing1-10)
5. Include CTA (BlockCTA1-5)
6. Finish with Footer (BlockFooter1-8)

**Building a Dashboard:**
1. Create layout with Container
2. Add stat Cards in a grid
3. Include DataTable for list data
4. Add Charts for visualizations
5. Use Tabs to organize sections
6. Include Dropdown menus for actions

**Designing a Form Page:**
1. Wrap in Card component
2. Use Form with VeeInput components
3. Add validation rules
4. Include Submit Button with loading state
5. Show Alert for success/error
6. Consider Dialog for multi-step forms`,
  _meta: {
    patternTypes: [
      "page-layouts",
      "component-combinations",
      "responsive-strategies",
      "accessibility-patterns",
      "design-tokens",
    ],
    framework: "Vue 3 + Nuxt 3",
    styling: "Tailwind CSS",
  },
  cache: "24h",
  async handler(uri: URL) {
    return {
      contents: [
        {
          uri: uri.toString(),
          mimeType: "text/markdown",
          text: `# UI Thing Design Patterns & Best Practices

This document provides comprehensive guidance for building modern, accessible web applications.

## Common Page Layouts

### 1. Landing Page
- **Flow:** Hero → Features → Testimonials → CTA → Footer
- **Blocks:** BlockHero, BlockFeature, BlockTestimonial, BlockCTA, BlockFooter
- **Purpose:** Convert visitors to customers

### 2. Documentation
- **Layout:** Sidebar + Main Content + TOC
- **Components:** Container, Breadcrumbs, Prose components
- **Purpose:** Technical content and guides

### 3. Dashboard
- **Layout:** Top Nav + Sidebar + Card Grid
- **Components:** Card, DataTable, Chart, Badge
- **Purpose:** Data visualization and management

### 4. E-commerce Product
- **Layout:** Gallery + Info + Tabs
- **Components:** Carousel, Button, Badge, Tabs, Accordion
- **Purpose:** Product showcase and purchase

### 5. Blog/Article
- **Layout:** Hero + Content + Related
- **Components:** Container, Prose, Card, Avatar
- **Purpose:** Content consumption

## Component Combination Patterns

### Forms
\`\`\`vue
<UiCard>
  <UiCardContent>
    <UiForm>
      <UiVeeInput name="email" label="Email" />
      <UiVeePassword name="password" label="Password" />
      <UiButton type="submit">Submit</UiButton>
    </UiForm>
  </UiCardContent>
</UiCard>
\`\`\`

### Data Display
\`\`\`vue
<UiCard>
  <UiCardHeader>
    <UiCardTitle>Users</UiCardTitle>
  </UiCardHeader>
  <UiCardContent>
    <UiDataTable :data="users" :columns="columns" />
  </UiCardContent>
</UiCard>
\`\`\`

### Navigation
\`\`\`vue
<UiBreadcrumbs>
  <UiBreadcrumbsItem to="/">Home</UiBreadcrumbsItem>
  <UiBreadcrumbsItem to="/docs">Docs</UiBreadcrumbsItem>
  <UiBreadcrumbsItem>Current</UiBreadcrumbsItem>
</UiBreadcrumbs>
\`\`\`

## Responsive Design

### Mobile-First
- Stack layouts vertically
- Use Drawer instead of Dialog
- Hamburger menu for navigation
- Reduce spacing on mobile

### Breakpoints
- \`sm:\` 640px - 2 columns
- \`md:\` 768px - Sidebar, 3 columns
- \`lg:\` 1024px - Full desktop, 4 columns
- \`xl:\` 1280px - Max width

## Accessibility

### Required Features
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Focus indicators
- Color contrast

### Form Accessibility
- Use Label components
- Show error messages
- Validation states
- Helper text

## Design Tokens

### Colors
- \`primary\` - Brand, CTAs
- \`secondary\` - Secondary actions
- \`destructive\` - Dangerous actions
- \`muted\` - Subtle elements

### Typography
- \`text-xs\` - Captions
- \`text-sm\` - Body text
- \`text-base\` - Default
- \`text-lg+\` - Headings

### Spacing
- Card: \`p-6\`
- Sections: \`py-16 md:py-24\`
- Elements: \`gap-4\` to \`gap-8\`

## Best Practices

1. Start with blocks for complete sections
2. Use components for custom work
3. Check dependencies first
4. Design mobile-first
5. Include accessibility by default
6. Use the design system consistently
7. Leverage prose for content
8. Test on multiple screen sizes`,
        },
      ],
    };
  },
});
