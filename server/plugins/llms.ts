export default defineNitroPlugin((app) => {
  app.hooks.hook("llms:generate:full", (e, opts, content) => {
    content.unshift(`# UI Thing Documentation
    
> **Note:** This documentation corresponds to **UI Thing CLI v0.2.0** (major update).
 `);

    content.push(`## More Information
  
- [UI Thing CLI](https://github.com/BayBreezy/ui-thing-cli)`);
    content.push(`## Contact Information
  
- [GitHub](https://github.com/BayBreezy/)
- [Website](https://behonbaker.com/)
- [Email](mailto:behon.baker@yahoo.com)`);
  });
});
