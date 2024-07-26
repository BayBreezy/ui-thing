module.exports = {
  apps: [
    {
      name: "UI_THING",
      script: "./.output/server/index.mjs",
      instances: 1,
      port: 3090,
      env: {
        NODE_ENV: "production",
        PORT: 3090,
        PUBLIC_URL: "https://ui-thing.behonbaker.com",
      },
    },
  ],
};
