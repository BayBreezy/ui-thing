export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, "name");
  if (!name) {
    throw createError({
      statusCode: 400,
      statusMessage: "Please provide the name of the block that you need",
    });
  }
  // decode URI component to handle names with spaces or special characters
  const decodedName = decodeURIComponent(name).toLowerCase();
  const results = blockExamples.find(
    (b) => b.name.toLowerCase() == decodedName || b.fileName.toLowerCase().includes(decodedName)
  );
  return results;
});
