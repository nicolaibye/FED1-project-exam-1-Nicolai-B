import { fetchPosts } from "../../api/posts/fetchPosts.js";
import { createFeedPostHtml } from "../../ui/createFeedPostHtml.js";
import { displayMessage } from "../../ui/displayMessage.js";

export async function displayFeedPosts() {
  document.addEventListener("DOMContentLoaded", async () => {
    try {
      const posts = await fetchPosts();
      createFeedPostHtml("#news-list", posts, "post");
    } catch (error) {
      console.error(error);
      displayMessage("#news-list", "error", error.message);
    }
  });
}
