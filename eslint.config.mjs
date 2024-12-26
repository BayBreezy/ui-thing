import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  rules: {
    "vue/no-v-html": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "vue/multi-word-component-names": "off",
    "vue/require-default-prop": "off",
    "@typescript-eslint/no-empty-object-type": "off",
    "@typescript-eslint/ban-types": "off",
    "vue/no-multiple-template-root": "off",
  },
  ignores: [".nuxt", "node_modules"],
});
