import { getCollection } from "astro:content";

export async function GET({ request }: { request: Request }) {
  const url = new URL(request.url);
  const lang = url.searchParams.get("lang") ?? "en";
  const posts = (await getCollection("blog")).filter((p) => p.data.lang === lang);
  const items = posts.map((p) => ({
    id: p.id,
    title: p.data.title,
    description: p.data.description,
    tags: p.data.tags ?? [],
    category: p.data.category ?? null,
    author: p.data.author ?? null,
    url: `/blog/${p.id}/`,
  }));
  return new Response(JSON.stringify(items), {
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
  });
}

