export const token = process.env.SANITY_API_TOKEN;

if (!token) {
  throw new Error("SANITY_API_TOKEN is not set");
}
