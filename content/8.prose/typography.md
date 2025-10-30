---
title: Typography
description: Explore the various typography styles and components available in the design system.
---

## Usage

This page demonstrates all the typography and prose components available in the UI library. The example below showcases headings, paragraphs, lists, tables, blockquotes, links, emphasis, code blocks, images, and more.

## Complete Example

:::ShowCase{prose}

# Building a Modern Web Application

::prose-lead
In this comprehensive guide, we'll explore the essential components and best practices for building a modern web application. From setting up your development environment to deploying to production, we'll cover everything you need to know.
::

## Getting Started

Before we dive into the code, let's understand what makes a modern web application. **Modern web apps** are characterized by their _responsiveness_, _performance_, and _user experience_. They leverage cutting-edge technologies to deliver seamless interactions across all devices.

### Prerequisites

Before you begin, ensure you have the following installed on your system:

::prose-icon-list{variant="info"}

Node.js (v18 or higher)

A modern code editor like VS Code

Git for version control

Basic understanding of the command line

::

#### Additional Tools

For an optimal development experience, consider installing these optional tools:

::prose-icon-list{variant="info"}
::prose-li{icon="lucide:package"}
Package manager like pnpm or yarn
::
::prose-li{icon="lucide:terminal"}
Terminal enhancer like Oh My Zsh
::
::prose-li{icon="lucide:chrome"}
Browser DevTools extensions
::
::prose-li{icon="lucide:git-branch"}
Git GUI client (optional)
::
::

---

## Installation Process

Let's start by setting up our project. Follow these steps carefully:

1. **Create a new project directory**
2. **Initialize your package manager**
3. **Install dependencies**
4. **Configure your build tools**

### Step 1: Project Initialization

Open your terminal and run the following commands:

::prose-code-group

```bash [npm] icon="devicon:npm" hideHeader
npm create vite@latest my-app
cd my-app
npm install
```

```bash [pnpm] icon="devicon:pnpm" hideHeader
pnpm create vite my-app
cd my-app
pnpm install
```

```bash [yarn] icon="devicon:yarn" hideHeader
yarn create vite my-app
cd my-app
yarn install
```

```bash [bun] icon="devicon:bun" hideHeader
bun create vite my-app
cd my-app
bun install
```

::

### Step 2: Project Structure

Your project should now have the following structure:

::prose-code-tree{defaultValue="src/App.vue" expandAll}

```vue [src/App.vue]
<template>
  <div>
    <h1>Hello World</h1>
  </div>
</template>
```

```ts [src/main.ts]
import { createApp } from "vue";

import App from "./App.vue";

createApp(App).mount("#app");
```

```json [package.json]
{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  }
}
```

```html [index.html]
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>My App</title>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```

::

---

## Core Concepts

> The secret to building great applications is understanding the fundamentals and applying them consistently. Focus on writing clean, maintainable code that others can easily understand and extend.

### Component Architecture

Modern frameworks encourage a component-based architecture. Here's what you need to know:

::prose-icon-list{variant="default"}
::prose-li{icon="lucide:box"}
**Encapsulation**: Each component manages its own state and logic
::
::prose-li{icon="lucide:repeat"}
**Reusability**: Write once, use everywhere with proper abstractions
::
::prose-li{icon="lucide:layers"}
**Composition**: Build complex UIs from simple, focused components
::
::prose-li{icon="lucide:workflow"}
**Data Flow**: Understand how data moves through your application
::
::

### State Management

As your application grows, managing state becomes crucial:

- **Local State**: Component-specific data using `useState` or `ref`
- **Global State**: Application-wide data using stores or context
- **Server State**: Data fetched from APIs with proper caching
- **URL State**: Navigation and routing parameters

#### State Management Patterns

::prose-tabs{variant="card"}
::div{label="Pinia" icon="logos:pinia"}

```ts
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    name: "",
    email: "",
    isAuthenticated: false,
  }),
  actions: {
    login(email: string) {
      this.email = email;
      this.isAuthenticated = true;
    },
    logout() {
      this.email = "";
      this.isAuthenticated = false;
    },
  },
});
```

::

::div{label="Vuex" icon="logos:vue"}

```ts
import { createStore } from "vuex";

export default createStore({
  state: {
    user: {
      name: "",
      email: "",
      isAuthenticated: false,
    },
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
  },
  actions: {
    login({ commit }, userData) {
      commit("SET_USER", userData);
    },
  },
});
```

::

::div{label="Composition API" icon="logos:typescript-icon"}

```ts
import { computed, ref } from "vue";

export function useAuth() {
  const user = ref(null);
  const isAuthenticated = computed(() => !!user.value);

  const login = async (credentials) => {
    user.value = await loginUser(credentials);
  };

  const logout = () => {
    user.value = null;
  };

  return { user, isAuthenticated, login, logout };
}
```

::
::

---

## Performance Optimization

Optimizing your application is critical for user experience. Here are the key areas to focus on:

| Technique          | Impact | Difficulty | Priority     |
| :----------------- | :----- | :--------- | :----------- |
| Code Splitting     | High   | Medium     | Must Have    |
| Lazy Loading       | High   | Easy       | Must Have    |
| Image Optimization | High   | Easy       | Must Have    |
| Caching Strategy   | Medium | Medium     | Should Have  |
| Bundle Analysis    | Medium | Easy       | Should Have  |
| Tree Shaking       | Low    | Auto       | Nice to Have |

### Common Pitfalls

::prose-icon-list{variant="warning"}
::prose-li{icon="lucide:alert-triangle"}
**Over-optimization**: Don't optimize prematurely. Measure first, then optimize
::
::prose-li{icon="lucide:zap-off"}
**Ignoring Bundle Size**: Large bundles slow down initial load time
::
::prose-li{icon="lucide:refresh-cw"}
**Too Many Re-renders**: Unnecessary re-renders waste CPU cycles
::
::prose-li{icon="lucide:database"}
**Poor Data Fetching**: Fetch data efficiently and cache when possible
::
::

---

## Styling Approaches

There are several ways to style your components:

1. **Traditional CSS**: Separate CSS files with class-based styling
2. **CSS Modules**: Scoped styles that won't leak globally
3. **CSS-in-JS**: Write styles in JavaScript with dynamic values
4. **Utility-First**: Use frameworks like Tailwind CSS
5. **Component Libraries**: Pre-styled components you can customize

### Example with Tailwind CSS

::prose-tabs{variant="line"}
::div{label="Component"}

```vue
<template>
  <button
    class="rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:opacity-50"
  >
    Click me
  </button>
</template>
```

::

::div{label="With Variants"}

```vue
<script setup lang="ts">
  import { tv } from "tailwind-variants";

  const button = tv({
    base: "rounded-lg px-4 py-2 font-semibold transition-colors",
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
        outline: "border-2 border-primary text-primary hover:bg-primary/10",
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2",
        lg: "px-6 py-3 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  });
</script>

<template>
  <button :class="button({ variant, size })">Click me</button>
</template>
```

::
::

---

## Testing Strategy

::prose-callout{variant="success"}

A well-tested application is easier to maintain and refactor.

::

Your testing strategy should include multiple layers:

::prose-icon-list
::prose-li{icon="lucide:check-circle" variant="success"}
**Unit Tests**: Test individual functions and components in isolation
::
::prose-li{icon="lucide:puzzle" variant="success"}
**Integration Tests**: Verify that different parts work together correctly
::
::prose-li{icon="lucide:monitor" variant="success"}
**E2E Tests**: Test complete user workflows from start to finish
::
::prose-li{icon="lucide:eye" variant="info"}
**Visual Regression**: Catch unintended UI changes automatically
::
::

### Testing Tools Comparison

| Tool            | Type        | Learning Curve | Best For              |
| :-------------- | :---------- | :------------- | :-------------------- |
| Vitest          | Unit        | Easy           | Component testing     |
| Jest            | Unit        | Easy           | General testing       |
| Cypress         | E2E         | Medium         | User flows            |
| Playwright      | E2E         | Medium         | Cross-browser testing |
| Testing Library | Integration | Easy           | React/Vue components  |

---

## Deployment

Once your application is ready, it's time to deploy. Here are common deployment options:

### Cloud Platforms

::prose-icon-list{variant="info"}
::prose-li{icon="lucide:cloud"}
**Vercel**: Zero-config deployments for modern frameworks
::
::prose-li{icon="lucide:server"}
**Netlify**: Continuous deployment with powerful build plugins
::
::prose-li{icon="lucide:box"}
**AWS**: Scalable infrastructure with full control
::
::prose-li{icon="lucide:globe"}
**Cloudflare Pages**: Edge-first platform with great performance
::
::

### Deployment Checklist

Before deploying to production, ensure you've completed these tasks:

- [x] Run all tests and ensure they pass
- [x] Optimize images and assets
- [x] Configure environment variables
- [x] Set up error monitoring (e.g., Sentry)
- [ ] Configure analytics
- [ ] Set up CI/CD pipeline
- [ ] Review security headers
- [ ] Test in production-like environment

---

## Best Practices

> "Code is like humor. When you have to explain it, it's bad." - Cory House

Follow these principles to write better code:

### Code Quality

1. **Keep it Simple**: Write code that's easy to understand
2. **Be Consistent**: Follow established patterns and conventions
3. **Document Wisely**: Write comments that explain _why_, not _what_
4. **Refactor Regularly**: Clean up as you go, don't let technical debt accumulate

### Security Considerations

::prose-icon-list{variant="error"}
::prose-li{icon="lucide:shield-alert"}
Never expose API keys or secrets in client-side code
::
::prose-li{icon="lucide:lock"}
Always validate and sanitize user input
::
::prose-li{icon="lucide:key"}
Use HTTPS everywhere, especially for authentication
::
::prose-li{icon="lucide:user-check"}
Implement proper authentication and authorization
::
::

---

## Additional Resources

Want to learn more? Check out these resources:

- Official framework documentation
- Community forums and Discord servers
- YouTube tutorials and courses
- GitHub repositories with example projects

::prose-callout{icon="lucide:book-open" title="Further Reading"}
Explore the [official documentation](#) for detailed API references and advanced techniques.
::

---

## Conclusion

Building modern web applications requires understanding many concepts and tools. _Start small_, **iterate often**, and don't be afraid to experiment. The web platform is constantly evolving, and there's always something new to learn.

**Remember:** The goal is not perfection, but continuous improvement. Focus on delivering value to your users while writing maintainable code that your team can work with effectively.

Happy coding! :prose-smart-icon{name="lucide:sparkles" class="inline-block"}

#code

````mdc
# Building a Modern Web Application

::prose-lead
In this comprehensive guide, we'll explore the essential components and best practices for building a modern web application. From setting up your development environment to deploying to production, we'll cover everything you need to know.
::

## Getting Started

Before we dive into the code, let's understand what makes a modern web application. **Modern web apps** are characterized by their _responsiveness_, _performance_, and _user experience_. They leverage cutting-edge technologies to deliver seamless interactions across all devices.

### Prerequisites

Before you begin, ensure you have the following installed on your system:

::prose-icon-list{variant="info"}

Node.js (v18 or higher)

A modern code editor like VS Code

Git for version control

Basic understanding of the command line

::

#### Additional Tools

For an optimal development experience, consider installing these optional tools:

::prose-icon-list{variant="info"}
::prose-li{icon="lucide:package"}
Package manager like pnpm or yarn
::
::prose-li{icon="lucide:terminal"}
Terminal enhancer like Oh My Zsh
::
::prose-li{icon="lucide:chrome"}
Browser DevTools extensions
::
::prose-li{icon="lucide:git-branch"}
Git GUI client (optional)
::
::

---

## Installation Process

Let's start by setting up our project. Follow these steps carefully:

1. **Create a new project directory**
2. **Initialize your package manager**
3. **Install dependencies**
4. **Configure your build tools**

### Step 1: Project Initialization

Open your terminal and run the following commands:

::prose-code-group

```bash [npm] icon="devicon:npm" hideHeader
npm create vite@latest my-app
cd my-app
npm install
```

```bash [pnpm] icon="devicon:pnpm" hideHeader
pnpm create vite my-app
cd my-app
pnpm install
```

```bash [yarn] icon="devicon:yarn" hideHeader
yarn create vite my-app
cd my-app
yarn install
```

```bash [bun] icon="devicon:bun" hideHeader
bun create vite my-app
cd my-app
bun install
```

::

### Step 2: Project Structure

Your project should now have the following structure:

::prose-code-tree{defaultValue="src/App.vue" expandAll}

```vue [src/App.vue]
<template>
  <div>
    <h1>Hello World</h1>
  </div>
</template>
```

```ts [src/main.ts]
import { createApp } from "vue";

import App from "./App.vue";

createApp(App).mount("#app");
```

```json [package.json]
{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  }
}
```

```html [index.html]
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>My App</title>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```

::

---

## Core Concepts

> The secret to building great applications is understanding the fundamentals and applying them consistently. Focus on writing clean, maintainable code that others can easily understand and extend.

### Component Architecture

Modern frameworks encourage a component-based architecture. Here's what you need to know:

::prose-icon-list{variant="default"}
::prose-li{icon="lucide:box"}
**Encapsulation**: Each component manages its own state and logic
::
::prose-li{icon="lucide:repeat"}
**Reusability**: Write once, use everywhere with proper abstractions
::
::prose-li{icon="lucide:layers"}
**Composition**: Build complex UIs from simple, focused components
::
::prose-li{icon="lucide:workflow"}
**Data Flow**: Understand how data moves through your application
::
::

### State Management

As your application grows, managing state becomes crucial:

- **Local State**: Component-specific data using `useState` or `ref`
- **Global State**: Application-wide data using stores or context
- **Server State**: Data fetched from APIs with proper caching
- **URL State**: Navigation and routing parameters

#### State Management Patterns

::prose-tabs{variant="card"}
::div{label="Pinia" icon="logos:pinia"}

```ts
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    name: "",
    email: "",
    isAuthenticated: false,
  }),
  actions: {
    login(email: string) {
      this.email = email;
      this.isAuthenticated = true;
    },
    logout() {
      this.email = "";
      this.isAuthenticated = false;
    },
  },
});
```

::

::div{label="Vuex" icon="logos:vue"}

```ts
import { createStore } from "vuex";

export default createStore({
  state: {
    user: {
      name: "",
      email: "",
      isAuthenticated: false,
    },
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
  },
  actions: {
    login({ commit }, userData) {
      commit("SET_USER", userData);
    },
  },
});
```

::

::div{label="Composition API" icon="logos:typescript-icon"}

```ts
import { computed, ref } from "vue";

export function useAuth() {
  const user = ref(null);
  const isAuthenticated = computed(() => !!user.value);

  const login = async (credentials) => {
    user.value = await loginUser(credentials);
  };

  const logout = () => {
    user.value = null;
  };

  return { user, isAuthenticated, login, logout };
}
```

::
::

---

## Performance Optimization

Optimizing your application is critical for user experience. Here are the key areas to focus on:

| Technique          | Impact | Difficulty | Priority     |
| :----------------- | :----- | :--------- | :----------- |
| Code Splitting     | High   | Medium     | Must Have    |
| Lazy Loading       | High   | Easy       | Must Have    |
| Image Optimization | High   | Easy       | Must Have    |
| Caching Strategy   | Medium | Medium     | Should Have  |
| Bundle Analysis    | Medium | Easy       | Should Have  |
| Tree Shaking       | Low    | Auto       | Nice to Have |

### Common Pitfalls

::prose-icon-list{variant="warning"}
::prose-li{icon="lucide:alert-triangle"}
**Over-optimization**: Don't optimize prematurely. Measure first, then optimize
::
::prose-li{icon="lucide:zap-off"}
**Ignoring Bundle Size**: Large bundles slow down initial load time
::
::prose-li{icon="lucide:refresh-cw"}
**Too Many Re-renders**: Unnecessary re-renders waste CPU cycles
::
::prose-li{icon="lucide:database"}
**Poor Data Fetching**: Fetch data efficiently and cache when possible
::
::

---

## Styling Approaches

There are several ways to style your components:

1. **Traditional CSS**: Separate CSS files with class-based styling
2. **CSS Modules**: Scoped styles that won't leak globally
3. **CSS-in-JS**: Write styles in JavaScript with dynamic values
4. **Utility-First**: Use frameworks like Tailwind CSS
5. **Component Libraries**: Pre-styled components you can customize

### Example with Tailwind CSS

::prose-tabs{variant="line"}
::div{label="Component"}

```vue
<template>
  <button
    class="rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:opacity-50"
  >
    Click me
  </button>
</template>
```

::

::div{label="With Variants"}

```vue
<script setup lang="ts">
  import { tv } from "tailwind-variants";

  const button = tv({
    base: "rounded-lg px-4 py-2 font-semibold transition-colors",
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
        outline: "border-2 border-primary text-primary hover:bg-primary/10",
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2",
        lg: "px-6 py-3 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  });
</script>

<template>
  <button :class="button({ variant, size })">Click me</button>
</template>
```

::
::

---

## Testing Strategy

::prose-callout{variant="success"}
A well-tested application is easier to maintain and refactor.
::

Your testing strategy should include multiple layers:

::prose-icon-list
::prose-li{icon="lucide:check-circle" variant="success"}
**Unit Tests**: Test individual functions and components in isolation
::
::prose-li{icon="lucide:puzzle" variant="success"}
**Integration Tests**: Verify that different parts work together correctly
::
::prose-li{icon="lucide:monitor" variant="success"}
**E2E Tests**: Test complete user workflows from start to finish
::
::prose-li{icon="lucide:eye" variant="info"}
**Visual Regression**: Catch unintended UI changes automatically
::
::

### Testing Tools Comparison

| Tool            | Type        | Learning Curve | Best For              |
| :-------------- | :---------- | :------------- | :-------------------- |
| Vitest          | Unit        | Easy           | Component testing     |
| Jest            | Unit        | Easy           | General testing       |
| Cypress         | E2E         | Medium         | User flows            |
| Playwright      | E2E         | Medium         | Cross-browser testing |
| Testing Library | Integration | Easy           | React/Vue components  |

---

## Deployment

Once your application is ready, it's time to deploy. Here are common deployment options:

### Cloud Platforms

::prose-icon-list{variant="info"}
::prose-li{icon="lucide:cloud"}
**Vercel**: Zero-config deployments for modern frameworks
::
::prose-li{icon="lucide:server"}
**Netlify**: Continuous deployment with powerful build plugins
::
::prose-li{icon="lucide:box"}
**AWS**: Scalable infrastructure with full control
::
::prose-li{icon="lucide:globe"}
**Cloudflare Pages**: Edge-first platform with great performance
::
::

### Deployment Checklist

Before deploying to production, ensure you've completed these tasks:

- [x] Run all tests and ensure they pass
- [x] Optimize images and assets
- [x] Configure environment variables
- [x] Set up error monitoring (e.g., Sentry)
- [ ] Configure analytics
- [ ] Set up CI/CD pipeline
- [ ] Review security headers
- [ ] Test in production-like environment

---

## Best Practices

> "Code is like humor. When you have to explain it, it's bad." - Cory House

Follow these principles to write better code:

### Code Quality

1. **Keep it Simple**: Write code that's easy to understand
2. **Be Consistent**: Follow established patterns and conventions
3. **Document Wisely**: Write comments that explain _why_, not _what_
4. **Refactor Regularly**: Clean up as you go, don't let technical debt accumulate

### Security Considerations

::prose-icon-list{variant="error"}
::prose-li{icon="lucide:shield-alert"}
Never expose API keys or secrets in client-side code
::
::prose-li{icon="lucide:lock"}
Always validate and sanitize user input
::
::prose-li{icon="lucide:key"}
Use HTTPS everywhere, especially for authentication
::
::prose-li{icon="lucide:user-check"}
Implement proper authentication and authorization
::
::

---

## Additional Resources

Want to learn more? Check out these resources:

- Official framework documentation
- Community forums and Discord servers
- YouTube tutorials and courses
- GitHub repositories with example projects

::prose-callout{icon="lucide:book-open" title="Further Reading"}
Explore the [official documentation](#) for detailed API references and advanced techniques.
::

---

## Conclusion

Building modern web applications requires understanding many concepts and tools. _Start small_, **iterate often**, and don't be afraid to experiment. The web platform is constantly evolving, and there's always something new to learn.

**Remember:** The goal is not perfection, but continuous improvement. Focus on delivering value to your users while writing maintainable code that your team can work with effectively.

Happy coding! :prose-smart-icon{name="lucide:sparkles" class="inline-block"}

````

:::
