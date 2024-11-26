import { postsUrl } from "../../constants/api.js";

export async function fetchPostsById(postId) {
  const url = `${postsUrl}/${postId}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch post");
  }
  const post = await response.json();
  return post;
}
