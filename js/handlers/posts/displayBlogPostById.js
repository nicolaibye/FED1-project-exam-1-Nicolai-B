import { displayMessage } from "../../ui/displayMessage.js";
import { fetchPostsById } from "../../api/posts/fetchPostsById.js";
import { createBlogPostHtml } from "../../ui/createBlogPostHtml.js";

export async function displayBlogPostById() {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const id = params.get("id");

  if (!id) {
    window.location.href = "/";
  }

  const container = "main";

  try {
    const post = await fetchPostsById(id);
    createBlogPostHtml(container, post);
  } catch (error) {
    console.error(error);
    displayMessage(container, "error", error.message);
  }
}
