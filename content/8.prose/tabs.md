---
title: Tabs
description: The Tabs component from the Prose collection allows you to create tabbed interfaces in your content.
---

## Source code

Click :SourceCodeLink{component="Tabs" folder="content/prose"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Variants

### Separate

:::ShowCase{:prose='true'}

::prose-tabs

    ::div{label="PostgreSQL" icon="logos:postgresql"}

    ### PostgreSQL Column Types

    ```ts
    import { integer, pgTable } from "drizzle-orm/pg-core";

    export const table = pgTable("table", {
      int: integer("int"),
    });
    ```

    ::

    ::div{label="MySQL" icon="logos:mysql-icon"}

    ### MySQL Column Types

    ```ts
    import { int, mysqlTable } from "drizzle-orm/mysql-core";

    const table = mysqlTable("table", {
      int: int("int"),
    });
    ```

    ::
    ::div{label="SQLite" icon="logos:sqlite"}

    ### SQLite Column Types

    ```ts lines
    import { integer, sqliteTable } from "drizzle-orm/sqlite-core";

    const table = sqliteTable("table", {
      id: integer("id"),
    });

    // you can customize integer mode to be number, boolean, timestamp, timestamp_ms
    integer("id", { mode: "number" });
    integer("id", { mode: "boolean" });
    integer("id", { mode: "timestamp_ms" });
    integer("id", { mode: "timestamp" }); // Date
    ```
    ::

::

#code

````mdc [Tabs.md]
::prose-tabs

    ::div{label="PostgreSQL" icon="logos:postgresql"}

    ### PostgreSQL Column Types

    ```ts
    import { integer, pgTable } from "drizzle-orm/pg-core";

    export const table = pgTable("table", {
      int: integer("int"),
    });
    ```

    ::

    ::div{label="MySQL" icon="logos:mysql-icon"}

    ### MySQL Column Types

    ```ts
    import { int, mysqlTable } from "drizzle-orm/mysql-core";

    const table = mysqlTable("table", {
      int: int("int"),
    });
    ```

    ::
    ::div{label="SQLite" icon="logos:sqlite"}

    ### SQLite Column Types

    ```ts lines
    import { integer, sqliteTable } from "drizzle-orm/sqlite-core";

    const table = sqliteTable("table", {
      id: integer("id"),
    });

    // you can customize integer mode to be number, boolean, timestamp, timestamp_ms
    integer("id", { mode: "number" });
    integer("id", { mode: "boolean" });
    integer("id", { mode: "timestamp_ms" });
    integer("id", { mode: "timestamp" }); // Date
    ```
    ::

::
````

:::

### Card

:::ShowCase{:prose='true'}

::prose-tabs{variant="card"}

    ::div{label="Installation" icon="lucide:download"}

    ### Setting Up Express API

    First, initialize your project and install the required dependencies:

    ```bash
    mkdir my-express-api && cd my-express-api
    npm init -y

    # Install core dependencies
    npm install express cors helmet morgan

    # Install development dependencies
    npm install -D nodemon @types/node typescript ts-node
    ```

    Create your basic project structure:

    ```bash
    mkdir src routes middleware controllers
    touch src/app.ts src/server.ts
    ```

    Update your `package.json` scripts:

    ```json [package.json] noFormat
    {
      "scripts": {
        "dev": "nodemon src/server.ts",
        "build": "tsc",
        "start": "node dist/server.js",
        "test": "jest"
      }
    }
    ```

    ::

    ::div{label="Configuration" icon="lucide:settings"}

    ### Project Configuration

    Create your TypeScript configuration:

    ```json [tsconfig.json] noFormat
    {
      "compilerOptions": {
        "target": "ES2020",
        "module": "commonjs",
        "outDir": "./dist",
        "rootDir": "./src",
        "strict": true,
        "esModuleInterop": true,
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true,
        "resolveJsonModule": true
      },
      "include": ["src/**/*"],
      "exclude": ["node_modules", "dist"]
    }
    ```

    Set up your main application file:

    ```ts [src/app.ts] noFormat
    import cors from "cors";
    import express from "express";
    import helmet from "helmet";
    import morgan from "morgan";

    const app = express();

    // Middleware
    app.use(helmet());
    app.use(cors());
    app.use(morgan("combined"));
    app.use(express.json({ limit: "10mb" }));
    app.use(express.urlencoded({ extended: true }));

    // Health check
    app.get("/health", (req, res) => {
      res.status(200).json({
        status: "OK",
        timestamp: new Date().toISOString(),
      });
    });

    export default app;
    ```

    ::

    ::div{label="Usage Examples" icon="lucide:code"}

    ### Building API Endpoints

    Create your server entry point:

    ```ts [src/server.ts] noFormat
    import app from "./app";
    import userRoutes from "./routes/users";

    const PORT = process.env.PORT || 3000;

    // Routes
    app.use("/api/users", userRoutes);

    // 404 handler
    app.use("*", (req, res) => {
      res.status(404).json({ error: "Route not found" });
    });

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
    ```

    Create your user routes:

    ```ts [routes/users.ts] noFormat
    import { Router } from "express";

    import { UserController } from "../controllers/UserController";

    const router = Router();
    const userController = new UserController();

    router.get("/", userController.getAllUsers);
    router.get("/:id", userController.getUserById);
    router.post("/", userController.createUser);
    router.put("/:id", userController.updateUser);
    router.delete("/:id", userController.deleteUser);

    export default router;
    ```

    Implement your controller:

    ```ts [controllers/UserController.ts] noFormat
    import { Request, Response } from "express";

    export class UserController {
      private users = [
        { id: 1, name: "John Doe", email: "john@example.com" },
        { id: 2, name: "Jane Smith", email: "jane@example.com" },
      ];

      getAllUsers = (req: Request, res: Response) => {
        res.json({ data: this.users, count: this.users.length });
      };

      getUserById = (req: Request, res: Response) => {
        const user = this.users.find((u) => u.id === parseInt(req.params.id));
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        res.json({ data: user });
      };

      createUser = (req: Request, res: Response) => {
        const { name, email } = req.body;
        const newUser = {
          id: this.users.length + 1,
          name,
          email,
        };
        this.users.push(newUser);
        res.status(201).json({ data: newUser });
      };
    }
    ```

    ::

    ::div{label="Advanced Tips" icon="lucide:lightbulb"}

    ### Pro Tips & Best Practices

    #### Environment Configuration

    Use environment variables for configuration:

    ```ts [src/config/index.ts] noFormat
    import dotenv from "dotenv";

    dotenv.config();

    export const config = {
      port: process.env.PORT || 3000,
      nodeEnv: process.env.NODE_ENV || "development",
      dbUrl: process.env.DATABASE_URL,
      jwtSecret: process.env.JWT_SECRET || "fallback-secret",
      corsOrigin: process.env.CORS_ORIGIN || "*",
    };
    ```

    #### Error Handling Middleware

    Implement global error handling:

    ```ts [middleware/errorHandler.ts] noFormat
    import { NextFunction, Request, Response } from "express";

    export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
      console.error(err.stack);

      res.status(500).json({
        error: "Something went wrong!",
        ...(process.env.NODE_ENV === "development" && {
          stack: err.stack,
        }),
      });
    };
    ```

    #### Input Validation

    Use validation middleware for request validation:

    ```ts [middleware/validation.ts] noFormat
    import { NextFunction, Request, Response } from "express";
    import { body, validationResult } from "express-validator";

    export const validateUser = [
      body("name").notEmpty().withMessage("Name is required"),
      body("email").isEmail().withMessage("Valid email is required"),

      (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        next();
      },
    ];
    ```

    #### Performance & Security

    - Use compression middleware for response compression
    - Implement rate limiting with `express-rate-limit`
    - Add request logging and monitoring
    - Use HTTPS in production
    - Implement proper authentication and authorization

    ::

```bash [.env.example] noFormat
PORT=3000
DATABASE_URL=mongodb://localhost:27017/myapp
JWT_SECRET=mysecretkey
CORS_ORIGIN=http://localhost:3000
```

::

#code

````mdc [Card Tabs]

  ::prose-tabs{variant="card"}

    ::div{label="Installation" icon="lucide:download"}

    ### Setting Up Express API

    First, initialize your project and install the required dependencies:

    ```bash
    mkdir my-express-api && cd my-express-api
    npm init -y

    # Install core dependencies
    npm install express cors helmet morgan

    # Install development dependencies
    npm install -D nodemon @types/node typescript ts-node
    ```

    Create your basic project structure:

    ```bash
    mkdir src routes middleware controllers
    touch src/app.ts src/server.ts
    ```

    Update your `package.json` scripts:

    ```json [package.json] noFormat
    {
      "scripts": {
        "dev": "nodemon src/server.ts",
        "build": "tsc",
        "start": "node dist/server.js",
        "test": "jest"
      }
    }
    ```

    ::

    ::div{label="Configuration" icon="lucide:settings"}

    ### Project Configuration

    Create your TypeScript configuration:

    ```json [tsconfig.json] noFormat
    {
      "compilerOptions": {
        "target": "ES2020",
        "module": "commonjs",
        "outDir": "./dist",
        "rootDir": "./src",
        "strict": true,
        "esModuleInterop": true,
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true,
        "resolveJsonModule": true
      },
      "include": ["src/**/*"],
      "exclude": ["node_modules", "dist"]
    }
    ```

    Set up your main application file:

    ```ts [src/app.ts] noFormat
    import cors from "cors";
    import express from "express";
    import helmet from "helmet";
    import morgan from "morgan";

    const app = express();

    // Middleware
    app.use(helmet());
    app.use(cors());
    app.use(morgan("combined"));
    app.use(express.json({ limit: "10mb" }));
    app.use(express.urlencoded({ extended: true }));

    // Health check
    app.get("/health", (req, res) => {
      res.status(200).json({
        status: "OK",
        timestamp: new Date().toISOString(),
      });
    });

    export default app;
    ```

    ::

    ::div{label="Usage Examples" icon="lucide:code"}

    ### Building API Endpoints

    Create your server entry point:

    ```ts [src/server.ts] noFormat
    import app from "./app";
    import userRoutes from "./routes/users";

    const PORT = process.env.PORT || 3000;

    // Routes
    app.use("/api/users", userRoutes);

    // 404 handler
    app.use("*", (req, res) => {
      res.status(404).json({ error: "Route not found" });
    });

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
    ```

    Create your user routes:

    ```ts [routes/users.ts] noFormat
    import { Router } from "express";

    import { UserController } from "../controllers/UserController";

    const router = Router();
    const userController = new UserController();

    router.get("/", userController.getAllUsers);
    router.get("/:id", userController.getUserById);
    router.post("/", userController.createUser);
    router.put("/:id", userController.updateUser);
    router.delete("/:id", userController.deleteUser);

    export default router;
    ```

    Implement your controller:

    ```ts [controllers/UserController.ts] noFormat
    import { Request, Response } from "express";

    export class UserController {
      private users = [
        { id: 1, name: "John Doe", email: "john@example.com" },
        { id: 2, name: "Jane Smith", email: "jane@example.com" },
      ];

      getAllUsers = (req: Request, res: Response) => {
        res.json({ data: this.users, count: this.users.length });
      };

      getUserById = (req: Request, res: Response) => {
        const user = this.users.find((u) => u.id === parseInt(req.params.id));
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        res.json({ data: user });
      };

      createUser = (req: Request, res: Response) => {
        const { name, email } = req.body;
        const newUser = {
          id: this.users.length + 1,
          name,
          email,
        };
        this.users.push(newUser);
        res.status(201).json({ data: newUser });
      };
    }
    ```

    ::

    ::div{label="Advanced Tips" icon="lucide:lightbulb"}

    ### Pro Tips & Best Practices

    #### Environment Configuration

    Use environment variables for configuration:

    ```ts [src/config/index.ts] noFormat
    import dotenv from "dotenv";

    dotenv.config();

    export const config = {
      port: process.env.PORT || 3000,
      nodeEnv: process.env.NODE_ENV || "development",
      dbUrl: process.env.DATABASE_URL,
      jwtSecret: process.env.JWT_SECRET || "fallback-secret",
      corsOrigin: process.env.CORS_ORIGIN || "*",
    };
    ```

    #### Error Handling Middleware

    Implement global error handling:

    ```ts [middleware/errorHandler.ts] noFormat
    import { NextFunction, Request, Response } from "express";

    export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
      console.error(err.stack);

      res.status(500).json({
        error: "Something went wrong!",
        ...(process.env.NODE_ENV === "development" && {
          stack: err.stack,
        }),
      });
    };
    ```

    #### Input Validation

    Use validation middleware for request validation:

    ```ts [middleware/validation.ts] noFormat
    import { NextFunction, Request, Response } from "express";
    import { body, validationResult } from "express-validator";

    export const validateUser = [
      body("name").notEmpty().withMessage("Name is required"),
      body("email").isEmail().withMessage("Valid email is required"),

      (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        next();
      },
    ];
    ```

    #### Performance & Security

    - Use compression middleware for response compression
    - Implement rate limiting with `express-rate-limit`
    - Add request logging and monitoring
    - Use HTTPS in production
    - Implement proper authentication and authorization

    ::

    ```bash [.env.example] noFormat
    PORT=3000
    DATABASE_URL=mongodb://localhost:27017/myapp
    JWT_SECRET=mysecretkey
    CORS_ORIGIN=http://localhost:3000
    ```

  ::

````

:::

### Line Style

:::ShowCase{:prose='true'}

::prose-tabs{variant="line"}

    ::div{label="Button Group"}
      :DocsButtonGroup
    ::

    ::div{label="Dialog"}
      :DocsDialog
    ::

    ::div{label="Gradient Button"}
      :DocsButtonGradientFlow
    ::

```sh [.env.example] noFormat lines
PORT=3000
DATABASE_URL=mongodb://localhost:27017/myapp
JWT_SECRET=mysecretkey
CORS_ORIGIN=http://localhost:3000
```

::

#code

````mdc [Line Style Tabs]
::prose-tabs{variant="line"}

    ::div{label="Button Group"}
      :DocsButtonGroup
    ::

    ::div{label="Dialog"}
      :DocsDialog
    ::

    ::div{label="Gradient Button"}
      :DocsButtonGradientFlow
    ::

```sh [.env.example] noFormat lines
PORT=3000
DATABASE_URL=mongodb://localhost:27017/myapp
JWT_SECRET=mysecretkey
CORS_ORIGIN=http://localhost:3000
```

::
````

:::

### Combobox

:::ShowCase{:prose='true'}

::prose-tabs{variant="combobox" }

    ::div{label="PostgreSQL" icon="logos:postgresql"}

    ### PostgreSQL Column Types

    ```ts
    import { integer, pgTable } from "drizzle-orm/pg-core";

    export const table = pgTable("table", {
      int: integer("int"),
    });
    ```

    ::

    ::div{label="MySQL" icon="logos:mysql-icon"}

    ### MySQL Column Types

    ```ts
    import { int, mysqlTable } from "drizzle-orm/mysql-core";

    const table = mysqlTable("table", {
      int: int("int"),
    });
    ```

    ::
    ::div{label="SQLite" icon="logos:sqlite"}

    ### SQLite Column Types

    ```ts lines
    import { integer, sqliteTable } from "drizzle-orm/sqlite-core";

    const table = sqliteTable("table", {
      id: integer("id"),
    });

    // you can customize integer mode to be number, boolean, timestamp, timestamp_ms
    integer("id", { mode: "number" });
    integer("id", { mode: "boolean" });
    integer("id", { mode: "timestamp_ms" });
    integer("id", { mode: "timestamp" }); // Date
    ```
    ::

```sh [.env.example] noFormat lines
PORT=3000
DATABASE_URL=mongodb://localhost:27017/myapp
JWT_SECRET=mysecretkey
CORS_ORIGIN=http://localhost:3000
```

::

#code

````mdc [Combobox Tabs]
::prose-tabs{variant="combobox" }

    ::div{label="PostgreSQL" icon="logos:postgresql"}

    ### PostgreSQL Column Types

    ```ts
    import { integer, pgTable } from "drizzle-orm/pg-core";

    export const table = pgTable("table", {
      int: integer("int"),
    });
    ```

    ::

    ::div{label="MySQL" icon="logos:mysql-icon"}

    ### MySQL Column Types

    ```ts
    import { int, mysqlTable } from "drizzle-orm/mysql-core";

    const table = mysqlTable("table", {
      int: int("int"),
    });
    ```

    ::
    ::div{label="SQLite" icon="logos:sqlite"}

    ### SQLite Column Types

    ```ts lines
    import { integer, sqliteTable } from "drizzle-orm/sqlite-core";

    const table = sqliteTable("table", {
      id: integer("id"),
    });

    // you can customize integer mode to be number, boolean, timestamp, timestamp_ms
    integer("id", { mode: "number" });
    integer("id", { mode: "boolean" });
    integer("id", { mode: "timestamp_ms" });
    integer("id", { mode: "timestamp" }); // Date
    ```
    ::

```sh [.env.example] noFormat lines
PORT=3000
DATABASE_URL=mongodb://localhost:27017/myapp
JWT_SECRET=mysecretkey
CORS_ORIGIN=http://localhost:3000
```

::
````

:::

### Synced Tabs

:::ShowCase{:prose='true'}

#### Scope 1

::prose-tabs{variant="card" sync="your-scope-name"}

    ::div{label="Card Tab"}

    ### This is a card-style tab

    ::

```ts [Code Tab]
console.log("Hello World!");
```

::

::prose-tabs{variant="card" sync="your-scope-name"}

    ::div{label="Card Tab"}

    ### This is a card-style tab

    ::

    ::div{label="Tab 2" icon="lucide:atom"}
    This is Tab #2
    ::

```ts [Code Tab]
console.log("Hello World!");
```

::

#### Scope 2

::prose-tabs{variant="line" sync="scope2"}

    ::div{label="Card Tab"}

    ### This is a card-style tab

    ::

    ::div{label="Tab 2" icon="lucide:atom"}
    This is Tab #2
    ::

```ts [Code Tab]
console.log("Hello World!");
```

::

::prose-tabs{variant="separate" sync="scope2"}

    ::div{label="Card Tab"}
    ### This is a card-style tab
    ::

    ::div{label="Tab 2" icon="lucide:atom"}
    This is Tab #2
    ::

```ts [Code Tab]
console.log("Hello World!");
```

::

#code

````mdc [Synced Tabs]

#### Scope 1

::prose-tabs{variant="card" sync="your-scope-name"}

    ::div{label="Card Tab"}

    ### This is a card-style tab

    ::

```ts [Code Tab]
console.log("Hello World!");
```

::

::prose-tabs{variant="card" sync="your-scope-name"}

    ::div{label="Card Tab"}

    ### This is a card-style tab

    ::

    ::div{label="Tab 2" icon="lucide:atom"}
    This is Tab #2
    ::

```ts [Code Tab]
console.log("Hello World!");
```

::

#### Scope 2

::prose-tabs{variant="line" sync="scope2"}

    ::div{label="Card Tab"}

    ### This is a card-style tab

    ::

    ::div{label="Tab 2" icon="lucide:atom"}
    This is Tab #2
    ::

```ts [Code Tab]
console.log("Hello World!");
```

::

::prose-tabs{variant="separate" sync="scope2"}

    ::div{label="Card Tab"}
    ### This is a card-style tab
    ::

    ::div{label="Tab 2" icon="lucide:atom"}
    This is Tab #2
    ::

```ts [Code Tab]
console.log("Hello World!");
```

````

:::
