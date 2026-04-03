---
title: Code Tree
description: Display a hierarchical file structure with expandable folders and file preview, perfect for showcasing project structures and code organization.
---

## Source code

Click :SourceCodeLink{component="ProseCodeTree.global.vue" folder="content/prose/CodeTree"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Overview

The `ProseCodeTree` component renders an interactive file tree navigator that displays code files in a two-panel layout. The left panel shows the directory structure with expandable folders, while the right panel displays the selected file's content with syntax highlighting.

::prose-callout{variant="info" title="Features"}

- **Interactive Navigation** - Click folders to expand/collapse, click files to view content
- **Material Icons** - Beautiful file and folder icons based on file extensions
- **Auto-expansion** - Automatically expands path to selected file
- **Keyboard Accessible** - Full keyboard navigation support
- **Responsive** - Adapts to mobile and desktop screens
- **Sort Intelligence** - Folders first, then alphabetically

::

## Basic Usage

:::ShowCase{prose}

::prose-code-tree{defaultValue="app.vue" title="Simple Vue App"}

```vue [app.vue]
<template>
  <div>
    <h1>Hello World</h1>
  </div>
</template>
```

```ts [utils.ts]
export function greet(name: string) {
  return `Hello, ${name}!`;
}
```

::

#code

````mdc
::prose-code-tree{defaultValue="app.vue" title="Simple Vue App"}

```vue [app.vue]
<template>
  <div>
    <h1>Hello World</h1>
  </div>
</template>
```

```ts [utils.ts]
export function greet(name: string) {
  return `Hello, ${name}!`
}
```

::
````

:::

## Project Showcase

Show a complete project structure:

:::ShowCase{prose}

::prose-code-tree{defaultValue="src/main.ts" title="TypeScript React App"}

```tsx [src/App.tsx]
import { useState } from "react";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default App;
```

```ts [src/main.ts]
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(
  document.getElementById('root')!
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

```ts [src/vite-env.d.ts]
/// <reference types="vite/client" />
```

```css [src/App.css]
.App {
  text-align: center;
  padding: 2rem;
}

button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background: #646cff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #535bf2;
}
```

```css [src/index.css]
:root {
  font-family: Inter, system-ui, sans-serif;
  line-height: 1.5;
  font-weight: 400;
}

body {
  margin: 0;
  min-height: 100vh;
}
```

```html [index.html]
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

```json [package.json]
{
  "name": "react-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "typescript": "^5.5.3",
    "vite": "^5.4.2"
  }
}
```

```json [tsconfig.json]
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

::

#code

````mdc
::prose-code-tree{defaultValue="src/main.ts" title="TypeScript React App"}

```tsx [src/App.tsx]
import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  )
}

export default App
```

```ts [src/main.ts]
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(
  document.getElementById('root')!
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

```ts [src/vite-env.d.ts]
/// <reference types="vite/client" />
```

```css [src/App.css]
.App {
  text-align: center;
  padding: 2rem;
}

button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background: #646cff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #535bf2;
}
```

```css [src/index.css]
:root {
  font-family: Inter, system-ui, sans-serif;
  line-height: 1.5;
  font-weight: 400;
}

body {
  margin: 0;
  min-height: 100vh;
}
```

```html [index.html]
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

```json [package.json]
{
  "name": "react-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "typescript": "^5.5.3",
    "vite": "^5.4.2"
  }
}
```

```json [tsconfig.json]
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

::

````

:::

## Expand All Folders

Use `expandAll` to show the full structure at once:

:::ShowCase{prose}

::prose-code-tree{expandAll title="API Routes"}

```ts [server/api/users/index.get.ts]
export default defineEventHandler(async (event) => {
  const users = await prisma.user.findMany();
  return users;
});
```

```ts [server/api/users/[id].get.ts]
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
  });

  if (!user) {
    throw createError({
      statusCode: 404,
      message: "User not found",
    });
  }

  return user;
});
```

```ts [server/api/users/index.post.ts]
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const user = await prisma.user.create({
    data: body,
  });

  return user;
});
```

```ts [server/api/posts/index.get.ts]
export default defineEventHandler(async (event) => {
  const posts = await prisma.post.findMany({
    include: { author: true },
  });
  return posts;
});
```

::

#code

````mdc
::prose-code-tree{expandAll title="API Routes"}

```ts [server/api/users/index.get.ts]
export default defineEventHandler(async (event) => {
  const users = await prisma.user.findMany()
  return users
})
```

```ts [server/api/users/[id].get.ts]
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  const user = await prisma.user.findUnique({
    where: { id: Number(id) }
  })

  if (!user) {
    throw createError({
      statusCode: 404,
      message: 'User not found'
    })
  }

  return user
})
```

```ts [server/api/users/index.post.ts]
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const user = await prisma.user.create({
    data: body
  })

  return user
})
```

```ts [server/api/posts/index.get.ts]
export default defineEventHandler(async (event) => {
  const posts = await prisma.post.findMany({
    include: { author: true }
  })
  return posts
})
```

::

````

:::

## Component Library Structure

Perfect for documenting UI component libraries:

:::ShowCase{prose}

::prose-code-tree{defaultValue="components/Button/Button.vue" title="Component Library"}

```vue [components/Button/Button.vue]
<script setup lang="ts">
  import type { ButtonProps } from "./types";

  const props = withDefaults(defineProps<ButtonProps>(), {
    variant: "primary",
    size: "md",
  });
</script>

<template>
  <button :class="['button', `button--${variant}`, `button--${size}`]">
    <slot />
  </button>
</template>
```

```ts [components/Button/types.ts]
export interface ButtonProps {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}
```

```ts [components/Button/index.ts]
export { default as Button } from "./Button.vue";
export type { ButtonProps } from "./types";
```

```vue [components/Input/Input.vue]
<script setup lang="ts">
  import type { InputProps } from "./types";

  const props = defineProps<InputProps>();
  const emit = defineEmits<{
    "update:modelValue": [value: string];
  }>();
</script>

<template>
  <input
    :type="type"
    :placeholder="placeholder"
    :value="modelValue"
    @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    class="input"
  />
</template>
```

```ts [components/Input/types.ts]
export interface InputProps {
  modelValue?: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
}
```

```ts [components/Input/index.ts]
export { default as Input } from "./Input.vue";
export type { InputProps } from "./types";
```

```ts [components/index.ts]
export * from "./Button";
export * from "./Input";
```

::

#code

````mdc
::prose-code-tree{defaultValue="components/Button/Button.vue" title="Component Library"}

```vue [components/Button/Button.vue]
<script setup lang="ts">
  import type { ButtonProps } from "./types";

  const props = withDefaults(defineProps<ButtonProps>(), {
    variant: "primary",
    size: "md",
  });
</script>

<template>
  <button :class="['button', `button--${variant}`, `button--${size}`]">
    <slot />
  </button>
</template>
```

```ts [components/Button/types.ts]
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}
```

```ts [components/Button/index.ts]
export { default as Button } from './Button.vue'
export type { ButtonProps } from './types'
```

```vue [components/Input/Input.vue]
<script setup lang="ts">
  import type { InputProps } from "./types";

  const props = defineProps<InputProps>();
  const emit = defineEmits<{
    "update:modelValue": [value: string];
  }>();
</script>

<template>
  <input
    :type="type"
    :placeholder="placeholder"
    :value="modelValue"
    @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    class="input"
  />
</template>
```

```ts [components/Input/types.ts]
export interface InputProps {
  modelValue?: string
  type?: 'text' | 'email' | 'password'
  placeholder?: string
}
```

```ts [components/Input/index.ts]
export { default as Input } from './Input.vue'
export type { InputProps } from './types'
```

```ts [components/index.ts]
export * from './Button'
export * from './Input'
```

::

````

:::

## Configuration Files

Show configuration setups:

:::ShowCase{prose}

::prose-code-tree{defaultValue="vite.config.ts" title="Build Configuration"}

```ts [vite.config.ts]
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
});
```

```json [tsconfig.json]
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM"],
    "moduleResolution": "bundler",
    "paths": {
      "@/*": ["./src/*"]
    },
    "strict": true
  },
  "include": ["src/**/*"]
}
```

```js [tailwind.config.js]
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#646cff",
      },
    },
  },
  plugins: [],
};
```

```js [eslint.config.js]
import js from "@eslint/js";
import typescript from "@typescript-eslint/eslint-plugin";
import vue from "eslint-plugin-vue";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx,vue}"],
    plugins: {
      "@typescript-eslint": typescript,
      vue: vue,
    },
    rules: {
      "no-console": "warn",
      "no-debugger": "warn",
    },
  },
];
```

::

#code

````mdc
::prose-code-tree{defaultValue="vite.config.ts" title="Build Configuration"}

```ts [vite.config.ts]
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
```

```json [tsconfig.json]
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM"],
    "moduleResolution": "bundler",
    "paths": {
      "@/*": ["./src/*"]
    },
    "strict": true
  },
  "include": ["src/**/*"]
}
```

```js [tailwind.config.js]
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#646cff",
      },
    },
  },
  plugins: [],
};
```

```js [eslint.config.js]
import js from "@eslint/js";
import typescript from "@typescript-eslint/eslint-plugin";
import vue from "eslint-plugin-vue";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx,vue}"],
    plugins: {
      "@typescript-eslint": typescript,
      vue: vue,
    },
    rules: {
      "no-console": "warn",
      "no-debugger": "warn",
    },
  },
];
```

::

````

:::

## API Documentation

Document API endpoints:

:::ShowCase{prose}

::prose-code-tree{defaultValue="routes/auth.ts" title="API Endpoints"}

```ts [routes/auth.ts]
import { Router } from "express";

import { login, logout, register } from "../controllers/auth";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);

export default router;
```

```ts [routes/users.ts]
import { Router } from "express";

import { createUser, deleteUser, getUser, getUsers, updateUser } from "../controllers/users";
import { authenticate } from "../middleware/auth";

const router = Router();

router.get("/", authenticate, getUsers);
router.get("/:id", authenticate, getUser);
router.post("/", authenticate, createUser);
router.put("/:id", authenticate, updateUser);
router.delete("/:id", authenticate, deleteUser);

export default router;
```

```ts [routes/index.ts]
import { Router } from "express";

import authRoutes from "./auth";
import userRoutes from "./users";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);

export default router;
```

::

#code

````mdc
::prose-code-tree{defaultValue="routes/auth.ts" title="API Endpoints"}

```ts [routes/auth.ts]
import { Router } from 'express'
import { login, register, logout } from '../controllers/auth'

const router = Router()

router.post('/login', login)
router.post('/register', register)
router.post('/logout', logout)

export default router
```

```ts [routes/users.ts]
import { Router } from 'express'
import { getUsers, getUser, createUser, updateUser, deleteUser } from '../controllers/users'
import { authenticate } from '../middleware/auth'

const router = Router()

router.get('/', authenticate, getUsers)
router.get('/:id', authenticate, getUser)
router.post('/', authenticate, createUser)
router.put('/:id', authenticate, updateUser)
router.delete('/:id', authenticate, deleteUser)

export default router
```

```ts [routes/index.ts]
import { Router } from 'express'
import authRoutes from './auth'
import userRoutes from './users'

const router = Router()

router.use('/auth', authRoutes)
router.use('/users', userRoutes)

export default router
```

::
````

:::

## Testing Structure

Show test organization:

:::ShowCase{prose}

::prose-code-tree{defaultValue="tests/unit/utils.test.ts" title="Test Suite"}

```ts [tests/unit/utils.test.ts]
import { calculateTotal, formatDate } from "@/utils";
import { describe, expect, it } from "vitest";

describe("Utils", () => {
  describe("formatDate", () => {
    it("formats date correctly", () => {
      const date = new Date("2024-01-15");
      expect(formatDate(date)).toBe("Jan 15, 2024");
    });
  });

  describe("calculateTotal", () => {
    it("calculates sum of numbers", () => {
      expect(calculateTotal([10, 20, 30])).toBe(60);
    });

    it("returns 0 for empty array", () => {
      expect(calculateTotal([])).toBe(0);
    });
  });
});
```

```ts [tests/unit/components/Button.test.ts]
import Button from "@/components/Button.vue";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

describe("Button", () => {
  it("renders correctly", () => {
    const wrapper = mount(Button, {
      props: { label: "Click me" },
    });

    expect(wrapper.text()).toBe("Click me");
  });

  it("emits click event", async () => {
    const wrapper = mount(Button);
    await wrapper.trigger("click");

    expect(wrapper.emitted("click")).toBeTruthy();
  });

  it("applies variant class", () => {
    const wrapper = mount(Button, {
      props: { variant: "primary" },
    });

    expect(wrapper.classes()).toContain("button--primary");
  });
});
```

```ts [tests/integration/api.test.ts]
import app from "@/app";
import request from "supertest";
import { describe, expect, it } from "vitest";

describe("API Integration", () => {
  describe("GET /api/users", () => {
    it("returns list of users", async () => {
      const response = await request(app).get("/api/users");

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("POST /api/users", () => {
    it("creates new user", async () => {
      const userData = {
        email: "test@example.com",
        name: "Test User",
      };

      const response = await request(app).post("/api/users").send(userData);

      expect(response.status).toBe(201);
      expect(response.body.email).toBe(userData.email);
    });
  });
});
```

```ts [tests/setup.ts]
import { afterAll, afterEach, beforeAll } from "vitest";

import { server } from "./mocks/server";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

::

#code

````mdc
::prose-code-tree{defaultValue="tests/unit/utils.test.ts" title="Test Suite"}

```ts [tests/unit/utils.test.ts]
import { describe, it, expect } from 'vitest'
import { formatDate, calculateTotal } from '@/utils'

describe('Utils', () => {
  describe('formatDate', () => {
    it('formats date correctly', () => {
      const date = new Date('2024-01-15')
      expect(formatDate(date)).toBe('Jan 15, 2024')
    })
  })

  describe('calculateTotal', () => {
    it('calculates sum of numbers', () => {
      expect(calculateTotal([10, 20, 30])).toBe(60)
    })

    it('returns 0 for empty array', () => {
      expect(calculateTotal([])).toBe(0)
    })
  })
})
```

```ts [tests/unit/components/Button.test.ts]
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '@/components/Button.vue'

describe('Button', () => {
  it('renders correctly', () => {
    const wrapper = mount(Button, {
      props: { label: 'Click me' }
    })

    expect(wrapper.text()).toBe('Click me')
  })

  it('emits click event', async () => {
    const wrapper = mount(Button)
    await wrapper.trigger('click')

    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('applies variant class', () => {
    const wrapper = mount(Button, {
      props: { variant: 'primary' }
    })

    expect(wrapper.classes()).toContain('button--primary')
  })
})
```

```ts [tests/integration/api.test.ts]
import { describe, it, expect } from 'vitest'
import request from 'supertest'
import app from '@/app'

describe('API Integration', () => {
  describe('GET /api/users', () => {
    it('returns list of users', async () => {
      const response = await request(app).get('/api/users')

      expect(response.status).toBe(200)
      expect(Array.isArray(response.body)).toBe(true)
    })
  })

  describe('POST /api/users', () => {
    it('creates new user', async () => {
      const userData = {
        email: 'test@example.com',
        name: 'Test User'
      }

      const response = await request(app)
        .post('/api/users')
        .send(userData)

      expect(response.status).toBe(201)
      expect(response.body.email).toBe(userData.email)
    })
  })
})
```

```ts [tests/setup.ts]
import { beforeAll, afterAll, afterEach } from 'vitest'
import { server } from './mocks/server'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
```

::
````

:::

## Props

| Prop           | Type      | Default | Description                                                                 |
| :------------- | :-------- | :------ | :-------------------------------------------------------------------------- |
| `defaultValue` | `string`  | -       | Default file path to select on mount (e.g., `"src/main.ts"`)                |
| `expandAll`    | `boolean` | `false` | Expand all directories by default instead of just the path to selected file |
| `title`        | `string`  | -       | Optional title displayed above the file tree                                |
| `class`        | `string`  | -       | Additional CSS classes for the root container                               |

## Syntax

### Basic Structure

````mdc
::prose-code-tree

```language [path/to/file.ext]
code content
```

```language [another/file.ext]
more code
```

::
````

### With Props

````mdc
::prose-code-tree{defaultValue="src/App.vue" title="My Project"}

```vue [src/App.vue]
<template>
  <div>Hello</div>
</template>
```

::
````

### With Expand All

````mdc
::prose-code-tree{expandAll title="Full Structure"}

```ts [src/utils/helpers.ts]
export function helper() {}
```

::
````

## File Path Format

The file path in brackets `[path/to/file.ext]` determines the tree structure:

- `file.txt` - Root level file
- `folder/file.txt` - File inside folder
- `folder/subfolder/file.txt` - Nested structure
- Folders are created automatically from paths
- Files are sorted alphabetically within folders
- Folders always appear before files

## Keyboard Navigation

The component supports full keyboard navigation:

- **Arrow Up/Down** - Navigate between files and folders
- **Arrow Right** - Expand folder
- **Arrow Left** - Collapse folder
- **Enter/Space** - Select file or toggle folder
- **Tab** - Move focus to next interactive element
- **Home** - Jump to first item
- **End** - Jump to last item

## Accessibility Features

The component is built with accessibility in mind:

✅ **Semantic HTML** - Uses `<nav>`, `<button>`, and proper ARIA attributes  
✅ **ARIA Labels** - Descriptive labels for folders and files  
✅ **ARIA Expanded** - Indicates folder open/closed state  
✅ **ARIA Live Regions** - Announces content changes to screen readers  
✅ **Keyboard Navigation** - Full keyboard support  
✅ **Focus Indicators** - Visible focus rings for keyboard users  
✅ **Screen Reader Friendly** - Proper announcements and structure

## Vue Component Usage

You can also use it programmatically:

```vue
<template>
  <ProseCodeTree default-value="src/App.vue" title="My Project" expand-all>
    <ProsePre filename="src/App.vue" language="vue" :code="appCode" />
    <ProsePre filename="src/utils.ts" language="typescript" :code="utilsCode" />
  </ProseCodeTree>
</template>

<script setup>
  const appCode = ref(`<template>...</template>`);
  const utilsCode = ref(`export function...`);
</script>
```

## Best Practices

::prose-callout{variant="tip" title="Tips for Code Trees"}

- Use descriptive file paths that match real project structure
- Group related files in folders for better organization
- Set `defaultValue` to the most important file
- Use `title` to provide context about what's being shown
- Keep the number of files reasonable (10-20 max for best UX)
- Use meaningful file extensions for proper icon display
- Consider using `expandAll` for small structures (< 5 folders)
- Organize tests, components, and utilities in separate folders

::

## Common Patterns

### Starter Template

Show a complete starter project:

::prose-code-tree{defaultValue="src/App.vue" title="Vue 3 Starter"}

```vue [src/App.vue]
<template>
  <div id="app">
    <h1>Welcome to Vue 3</h1>
  </div>
</template>
```

```ts [src/main.ts]
import { createApp } from "vue";

import App from "./App.vue";

createApp(App).mount("#app");
```

```html [index.html]
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vue 3 Starter</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

```json [package.json]
{
  "name": "vue3-starter",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "vue": "^3.5.22"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^4.3.1",
    "typescript": "^5.5.3",
    "vite": "^5.4.2"
  }
}
```

::

### Documentation

Document a feature with related files:

::prose-code-tree{defaultValue="components/Feature.vue" title="Feature Implementation"}

```vue [components/Feature.vue]
<script setup lang="ts">
  import { useFeature } from "@/composables/useFeature";

  const { data, loading, error } = useFeature();
</script>
```

```ts [composables/useFeature.ts]
import axios from "axios";
import { ref } from "vue";

export function useFeature() {
  const data = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const fetchData = async () => {
    loading.value = true;
    try {
      const response = await axios.get("/api/feature");
      data.value = response.data;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  fetchData();

  return { data, loading, error };
}
```

```ts [types/feature.ts]
export interface FeatureData {
  id: number;
  name: string;
  description: string;
}
```

::

## Performance

The component is optimized for performance:

- **Lazy Rendering** - Only renders visible nodes
- **Smart Re-renders** - Only updates when selection changes
- **Efficient Sorting** - Cached sort results
- **Virtual Scrolling** - Tree viewport uses `max-height` with scroll
