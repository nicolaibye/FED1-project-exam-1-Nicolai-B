import { postsUrl } from "../../constants/api.js";

export async function fetchPosts() {
  const response = await fetch(postsUrl);

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  const posts = await response.json();
  return posts;
}
