export default defineCachedEventHandler(
  async () => {
    const categories = blockExamples.map((b) => b.category);
    return [...new Set(categories)];
  },
  { maxAge: 60 * 60 * 24 * 5 }
);
