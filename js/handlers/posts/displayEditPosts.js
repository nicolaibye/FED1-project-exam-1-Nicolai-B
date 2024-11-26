import { fetchPosts } from "../../api/posts/fetchPosts.js";
import { createEditPostHtml } from "../../ui/createEditPostHtml.js";
import { displayMessage } from "../../ui/displayMessage.js";

export async function displayEditPosts() {
  document.addEventListener("DOMContentLoaded", async () => {
    try {
      const posts = await fetchPosts();
      createEditPostHtml("#edit-list", posts);
    } catch (error) {
      console.error(error);
      displayMessage("#edit-list", "error", error.message);
    }
  });
}
