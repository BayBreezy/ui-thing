export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, "name");
  if (!name) {
    throw createError({
      statusCode: 400,
      statusMessage: "Please provide the name of the category that you need",
    });
  }
  const decodedName = decodeURIComponent(name).toLowerCase();

  return blockExamples.filter((b) => b.category.toLowerCase() === decodedName);
});
