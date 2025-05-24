import type { Edge, Node } from "@vue-flow/core";

export interface CustomTableField {
  name: string;
  type: string;
  isPrimary?: boolean;
  isForeign?: boolean;
}

export interface CustomTableData {
  label: string;
  fields: CustomTableField[];
  selected?: boolean;
}

export interface CustomTableEvents extends Record<string, any> {}

type CustomNodeType = Node<CustomTableData, CustomTableEvents, string>;

// Define the initial nodes (tables)
export const initialSchemaNodes: CustomNodeType[] = [
  {
    id: "users",
    type: "tableNode",
    position: { x: 800, y: 150 },
    data: {
      label: "users",
      fields: [
        { name: "id", type: "int", isPrimary: true },
        { name: "full_name", type: "varchar" },
        { name: "email", type: "varchar" },
        { name: "gender", type: "varchar" },
        { name: "date_of_birth", type: "date" },
        { name: "country_code", type: "varchar", isForeign: true },
        { name: "created_at", type: "timestamp" },
      ],
    },
  },
  {
    id: "orders",
    type: "tableNode",
    position: { x: 450, y: 183 },
    data: {
      label: "orders",
      fields: [
        { name: "id", type: "int", isPrimary: true },
        { name: "user_id", type: "int", isForeign: true },
        { name: "status", type: "varchar" },
        { name: "total_amount", type: "decimal" },
        { name: "created_at", type: "timestamp" },
      ],
    },
  },
  {
    id: "order_items",
    type: "tableNode",
    position: { x: 100, y: 150 },
    data: {
      label: "order_items",
      fields: [
        { name: "id", type: "int", isPrimary: true },
        { name: "order_id", type: "int", isForeign: true },
        { name: "product_id", type: "int", isForeign: true },
        { name: "quantity", type: "int" },
        { name: "unit_price", type: "decimal" },
      ],
    },
  },
  {
    id: "products",
    type: "tableNode",
    position: { x: 100, y: 460 },
    data: {
      label: "products",
      fields: [
        { name: "id", type: "int", isPrimary: true },
        { name: "merchant_id", type: "int", isForeign: true },
        { name: "name", type: "varchar" },
        { name: "description", type: "text" },
        { name: "price", type: "decimal" },
        { name: "status", type: "varchar" },
        { name: "created_at", type: "timestamp" },
      ],
    },
  },
  {
    id: "merchants",
    type: "tableNode",
    position: { x: 450, y: 493 },
    data: {
      label: "merchants",
      fields: [
        { name: "id", type: "int", isPrimary: true },
        { name: "name", type: "varchar" },
        { name: "email", type: "varchar" },
        { name: "country_code", type: "varchar", isForeign: true },
        { name: "created_at", type: "timestamp" },
      ],
    },
  },
  {
    id: "countries",
    type: "tableNode",
    position: { x: 800, y: 570 },
    data: {
      label: "countries",
      fields: [
        { name: "code", type: "varchar", isPrimary: true },
        { name: "name", type: "varchar" },
        { name: "continent_name", type: "varchar" },
        { name: "currency", type: "varchar" },
      ],
    },
  },
];

// Define the edges (relationships) between tables with specific column connections
export const initialSchemaEdges: Edge[] = [
  // User to Orders (one-to-many): users.id -> orders.user_id
  {
    id: "users-orders",
    source: "users",
    target: "orders",
    sourceHandle: "id",
    targetHandle: "user_id",
    type: "smoothstep",
  },
  // Orders to Order Items (one-to-many): orders.id -> order_items.order_id
  {
    id: "orders-order_items",
    source: "orders",
    target: "order_items",
    sourceHandle: "id",
    targetHandle: "order_id",
    type: "smoothstep",
  },
  // Products to Order Items (one-to-many): products.id -> order_items.product_id
  {
    id: "products-order_items",
    source: "products",
    target: "order_items",
    sourceHandle: "id",
    targetHandle: "product_id",
    type: "smoothstep",
  },
  // Merchants to Products (one-to-many): merchants.id -> products.merchant_id
  {
    id: "merchants-products",
    source: "merchants",
    target: "products",
    sourceHandle: "id",
    targetHandle: "merchant_id",
    type: "smoothstep",
  },
  // Countries to Users (one-to-many): countries.code -> users.country_code
  {
    id: "countries-users",
    source: "countries",
    target: "users",
    sourceHandle: "code",
    targetHandle: "country_code",
    type: "smoothstep",
  },
  // Countries to Merchants (one-to-many): countries.code -> merchants.country_code
  {
    id: "countries-merchants",
    source: "countries",
    target: "merchants",
    sourceHandle: "code",
    targetHandle: "country_code",
    type: "smoothstep",
  },
];
