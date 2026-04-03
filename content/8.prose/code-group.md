---
title: Code Group
description: Display multiple code snippets in a tabbed interface with automatic language detection, custom icons, and sync support across groups.
---

## Source code

Click :SourceCodeLink{component="ProseCodeGroup.global.vue" folder="content/prose/Code"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Overview

The `ProseCodeGroup` component creates a tabbed interface for displaying multiple code blocks. It's perfect for showing the same functionality in different languages, comparing implementations, or displaying related configuration files side by side.

::prose-callout{variant="info" title="Features"}

- **Automatic Language Icons** - Detects language from code fence and shows appropriate icon
- **Custom Icons** - Override with custom icons per tab
- **Tab Sync** - Synchronize selections across multiple code groups
- **Search Functionality** - Quick tab search for groups with many options
- **Responsive Design** - Works seamlessly on all screen sizes

::

## Basic Usage

Use the `::prose-code-group` wrapper with code fences. The filename in brackets becomes the tab label:

::ShowCase{prose}

::prose-code-group

```vue [app.vue] noFormat
<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
```

```vue [pages/index.vue] noFormat
<template>
  <div>
    <h1>Welcome</h1>
  </div>
</template>
```

::

#code

````mdc
::prose-code-group

```vue [app.vue] noFormat
<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
```

```vue [pages/index.vue] noFormat
<template>
  <div>
    <h1>Welcome</h1>
  </div>
</template>
```

::
````

::

## Multi-Language Examples

### Component Implementation

Show how to create the same component in different frameworks:

::ShowCase{prose}

::prose-code-group

```vue [Vue 3] hideHeader // hideHeader removes the name in the pre component
<script setup lang="ts">
  const count = ref(0);
  const increment = () => count.value++;
</script>

<template>
  <button @click="increment">Count: {{ count }}</button>
</template>
```

```tsx [React] hideHeader
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```

```svelte [Svelte] hideHeader
<script lang="ts">
  let count = 0
  const increment = () => count++
</script>

<button on:click={increment}>
  Count: {count}
</button>
```

```tsx [Solid] hideHeader
import { createSignal } from "solid-js";

export default function Counter() {
  const [count, setCount] = createSignal(0);

  return <button onClick={() => setCount(count() + 1)}>Count: {count()}</button>;
}
```

::

#code

````mdc
::prose-code-group

```vue [Vue 3] hideHeader // hideHeader removes the name in the pre component
<script setup lang="ts">
  const count = ref(0);
  const increment = () => count.value++;
</script>

<template>
  <button @click="increment">Count: {{ count }}</button>
</template>
```

```tsx [React] hideHeader
import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  )
}
```

```svelte [Svelte] hideHeader
<script lang="ts">
  let count = 0
  const increment = () => count++
</script>

<button on:click={increment}>
  Count: {count}
</button>
```

```tsx [Solid] hideHeader // Hide header removes the name in the pre component
import { createSignal } from 'solid-js'

export default function Counter() {
  const [count, setCount] = createSignal(0)

  return (
    <button onClick={() => setCount(count() + 1)}>
      Count: {count()}
    </button>
  )
}
```

::
````

::

### API Requests

Compare different HTTP client libraries:

::prose-code-group

```ts [Fetch API] hideHeader
async function getUser(id: string) {
  const response = await fetch(`/api/users/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  return response.json();
}
```

```ts [Axios] hideHeader
import axios from "axios";

async function getUser(id: string) {
  const { data } = await axios.get(`/api/users/${id}`);
  return data;
}
```

```ts [Ky] hideHeader
import ky from "ky";

async function getUser(id: string) {
  return ky.get(`/api/users/${id}`).json();
}
```

```ts [ofetch] hideHeader
import { ofetch } from "ofetch";

async function getUser(id: string) {
  return ofetch(`/api/users/${id}`);
}
```

::

## Configuration Files

### Framework Setup

Show related configuration files together:

::prose-code-group

```ts [nuxt.config.ts] hideHeader
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@nuxt/content"],
  content: {
    highlight: {
      theme: "github-dark",
    },
  },
});
```

```js [tailwind.config.js] hideHeader
export default {
  content: ["./components/**/*.{vue,js,ts}", "./layouts/**/*.vue", "./pages/**/*.vue", "./app.vue"],
  theme: {
    extend: {},
  },
};
```

```json [package.json] hideHeader
{
  "name": "my-app",
  "scripts": {
    "dev": "nuxt dev",
    "build": "nuxt build",
    "preview": "nuxt preview"
  },
  "dependencies": {
    "nuxt": "^3.13.0",
    "@nuxt/content": "^2.13.0"
  }
}
```

```json [tsconfig.json] hideHeader
{
  "extends": "./.nuxt/tsconfig.json",
  "compilerOptions": {
    "strict": true,
    "types": ["@nuxt/types"]
  }
}
```

::

### Environment Variables

::prose-code-group

```bash [.env] hideHeader
DATABASE_URL=postgresql://localhost:5432/mydb
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-key
API_KEY=your-api-key
```

```bash [.env.example] hideHeader
DATABASE_URL=
REDIS_URL=
JWT_SECRET=
API_KEY=
```

```ts [env.d.ts] hideHeader
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      REDIS_URL: string;
      JWT_SECRET: string;
      API_KEY: string;
    }
  }
}

export {};
```

::

## Synced Code Groups

Use the `sync` prop to keep tab selections synchronized across multiple code groups on the same page:

### Installation

::prose-code-group{sync="package-manager"}

```bash [npm] hideHeader icon="devicon:npm"
npm install ui-thing@latest
```

```bash [pnpm] hideHeader icon="devicon:pnpm"
pnpm add ui-thing@latest
```

```bash [yarn] hideHeader icon="devicon:yarn"
yarn add ui-thing@latest
```

```bash [bun] hideHeader icon="devicon:bun"
bun add ui-thing@latest
```

::

### Run Dev Server

::prose-code-group{sync="package-manager"}

```bash [npm] hideHeader icon="devicon:npm"
npm run dev
```

```bash [pnpm] hideHeader icon="devicon:pnpm"
pnpm dev
```

```bash [yarn] hideHeader icon="devicon:yarn"
yarn dev
```

```bash [bun] hideHeader icon="devicon:bun"
bun dev
```

::

::prose-callout{variant="tip" title="Try It!"}
Click between tabs above - both groups stay synchronized because they use `sync="package-manager"`.
::

## Custom Icons

Override default language icons with custom ones:

::ShowCase{prose}

::prose-code-group

```ts [server.ts] icon="lucide:server"
import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.listen(PORT);
```

```ts [client.ts] icon="lucide:smartphone"
async function fetchData() {
  const response = await fetch("/api/data");
  return response.json();
}
```

```ts [database.ts] icon="lucide:database"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUsers() {
  return prisma.user.findMany();
}
```

::

#code

````mdc
::prose-code-group

```ts [server.ts] icon="lucide:server"
import express from 'express'

const app = express()
const PORT = 3000

app.get('/', (req, res) => {
  res.json({ message: 'Hello World' })
})

app.listen(PORT)
```

```ts [client.ts] icon="lucide:smartphone"
async function fetchData() {
  const response = await fetch('/api/data')
  return response.json()
}
```

```ts [database.ts] icon="lucide:database"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getUsers() {
  return prisma.user.findMany()
}
```

::
````

::

## Testing Examples

### Unit Tests

::prose-code-group

```ts [component.test.ts]
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import MyButton from "./MyButton.vue";

describe("MyButton", () => {
  it("renders correctly", () => {
    const wrapper = mount(MyButton, {
      props: { label: "Click me" },
    });

    expect(wrapper.text()).toBe("Click me");
  });

  it("emits click event", async () => {
    const wrapper = mount(MyButton);
    await wrapper.trigger("click");

    expect(wrapper.emitted("click")).toBeTruthy();
  });
});
```

```ts [utils.test.ts]
import { describe, expect, it } from "vitest";

import { calculateTotal, formatDate } from "./utils";

describe("Utils", () => {
  it("formats date correctly", () => {
    const date = new Date("2024-01-15");
    expect(formatDate(date)).toBe("Jan 15, 2024");
  });

  it("calculates total", () => {
    expect(calculateTotal([10, 20, 30])).toBe(60);
  });
});
```

```ts [api.test.ts]
import { describe, expect, it, vi } from "vitest";

import { getUser } from "./api";

describe("API", () => {
  it("fetches user successfully", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ id: 1, name: "John" }),
      })
    ) as any;

    const user = await getUser("1");
    expect(user.name).toBe("John");
  });
});
```

::

## Database Schemas

### Prisma Schema

::prose-code-group

```prisma [schema.prisma]
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  posts     Post[]
  createdAt DateTime @default(now())
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
  createdAt DateTime @default(now())
}
```

```sql [migration.sql]
CREATE TABLE "User" (
  "id" SERIAL PRIMARY KEY,
  "email" TEXT NOT NULL UNIQUE,
  "name" TEXT,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "Post" (
  "id" SERIAL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "content" TEXT,
  "published" BOOLEAN NOT NULL DEFAULT false,
  "authorId" INTEGER NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("authorId") REFERENCES "User"("id")
);
```

```ts [types.ts]
export interface User {
  id: number;
  email: string;
  name: string | null;
  posts: Post[];
  createdAt: Date;
}

export interface Post {
  id: number;
  title: string;
  content: string | null;
  published: boolean;
  author: User;
  authorId: number;
  createdAt: Date;
}
```

::

## Styling Examples

### CSS Solutions

::prose-code-group

```css [styles.css]
.button {
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  background: #3b82f6;
  color: white;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
}

.button:hover {
  background: #2563eb;
}

.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

```scss [styles.scss]
.button {
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  background: #3b82f6;
  color: white;
  border: none;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #2563eb;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
```

```vue [Scoped CSS]
<style scoped>
  .button {
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    background: #3b82f6;
    color: white;
    border: none;
    cursor: pointer;
    transition: background 0.2s;
  }

  .button:hover {
    background: #2563eb;
  }

  .button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
```

```ts [Tailwind]
const buttonClasses = [
  "px-4 py-2",
  "rounded",
  "bg-blue-500",
  "text-white",
  "border-none",
  "cursor-pointer",
  "transition-colors",
  "hover:bg-blue-600",
  "disabled:opacity-50",
  "disabled:cursor-not-allowed",
].join(" ");
```

::

## Props

| Prop                | Type      | Default           | Description                                       |
| :------------------ | :-------- | :---------------- | :------------------------------------------------ |
| `inStack`           | `boolean` | `false`           | Whether the code group is in a stack layout       |
| `sync`              | `string`  | -                 | Sync identifier for syncing with other tab groups |
| `padded`            | `boolean` | `true`            | Whether to add padding around the tabs            |
| `disableSearch`     | `boolean` | `false`           | Disable the search functionality                  |
| `searchPlaceholder` | `string`  | `'Search Tab...'` | Placeholder text for the search input             |
| `searchEmpty`       | `string`  | `'No tab found.'` | Text to display when no tab is found              |
| `comboBoxFullWidth` | `boolean` | `false`           | Whether the combobox should take full width       |
| `class`             | `string`  | -                 | Additional classes to add to the wrapper          |

## Syntax

### Basic Structure

````mdc
::prose-code-group

```language [Tab Name]
code here
```

```language [Another Tab]
more code
```

::
````

### With Props

````mdc
::prose-code-group{sync="my-group" padded=false}

```ts [Option 1]
const a = 1
```

```ts [Option 2]
const b = 2
```

::
````

### With Icons

````mdc
::prose-code-group

```ts [server.ts] icon="lucide:server"
// server code
```

```ts [client.ts] icon="lucide:smartphone"
// client code
```

::
````

## Search Functionality

For code groups with many tabs, users can search:

::prose-code-group

```ts [auth.ts]
export async function login(email: string, password: string) {
  // Login logic
}
```

```ts [user.ts]
export async function getUser(id: string) {
  // Get user logic
}
```

```ts [post.ts]
export async function createPost(data: any) {
  // Create post logic
}
```

```ts [comment.ts]
export async function addComment(postId: string, text: string) {
  // Add comment logic
}
```

```ts [profile.ts]
export async function updateProfile(userId: string, data: any) {
  // Update profile logic
}
```

```ts [settings.ts]
export async function updateSettings(settings: any) {
  // Update settings logic
}
```

```ts [notification.ts]
export async function sendNotification(userId: string, message: string) {
  // Send notification logic
}
```

```ts [analytics.ts]
export async function trackEvent(event: string, data: any) {
  // Track event logic
}
```

::

::prose-callout{variant="tip" title="Search Tips"}
When you have 5 or more tabs, the `Combobox` variant is automatically used to help users find tabs quickly.
::

## Real-World Use Cases

### API Routes

::prose-code-group

```ts [GET /api/users] noFormat
export default defineEventHandler(async (event) => {
  const users = await prisma.user.findMany();
  return users;
});
```

```ts [GET /api/users/[id]] noFormat
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

```ts [POST /api/users] noFormat
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const user = await prisma.user.create({
    data: body,
  });

  return user;
});
```

```ts [PUT /api/users/[id]] noFormat
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const body = await readBody(event);

  const user = await prisma.user.update({
    where: { id: Number(id) },
    data: body,
  });

  return user;
});
```

```ts [DELETE /api/users/[id]] noFormat
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  await prisma.user.delete({
    where: { id: Number(id) },
  });

  return { success: true };
});
```

::

### Docker Setup

::prose-code-group

```dockerfile [Dockerfile]
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
```

```yaml [docker-compose.yml]
version: "3.8"

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/mydb
      - NODE_ENV=production
    depends_on:
      - db
      - redis

  db:
    image: postgres:16-alpine
    environment:
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=mydb
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

```yaml [.dockerignore]
node_modules
.nuxt
.output
.git
.env
.env.*
*.log
```

::

### GitHub Actions

::prose-code-group

```yaml [test.yml]
name: Test

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - run: npm ci
      - run: npm test
```

```yaml [deploy.yml]
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - run: npm ci
      - run: npm run build

      - name: Deploy to production
        run: |
          # Deploy command here
        env:
          API_KEY: ${{ secrets.API_KEY }}
```

```yaml [lint.yml]
name: Lint

on: [push, pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - run: npm ci
      - run: npm run lint
```

::

## Best Practices

::prose-callout{variant="tip" title="Tips for Code Groups"}

- Use descriptive tab names that clearly indicate what the code does
- Keep the number of tabs reasonable (5-10 max for best UX)
- Use `sync` prop when showing package manager commands across multiple groups
- Add custom icons to make tabs more visually distinct
- Use `noFormat` meta flag if you want to preserve exact filename formatting
- Use `hideHeader` meta flag if you want to hide the tab header
- Consider grouping related code (configs, routes, tests) together

::

## Accessibility

The component provides excellent keyboard navigation:

- **Tab** - Move between tabs
- **Enter/Space** - Activate selected tab
- **Arrow Keys** - Navigate tabs in the list
- **Type to Search** - Quick search when many tabs are present

Screen readers announce tab labels and active states properly.

## Vue Component Usage

You can also use it programmatically in Vue files:

```vue
<template>
  <ProseCodeGroup sync="my-group">
    <ProsePre filename="example.ts" language="typescript" :code="code1" />
    <ProsePre filename="another.ts" language="typescript" :code="code2" />
  </ProseCodeGroup>
</template>

<script setup>
  const code1 = "const a = 1";
  const code2 = "const b = 2";
</script>
```

## Related Components

::prose-icon-list

::prose-li{icon="lucide:table-2"}
[**ProseTabs**](/prose/tabs) - General-purpose tabbed interface
::

::prose-li{icon="lucide:workflow"}
[**ProseMermaid**](/prose/mermaid) - Diagram rendering in code blocks
::

::
