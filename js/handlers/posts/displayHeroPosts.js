import { fetchPosts } from "../../api/posts/fetchPosts.js";
import { createHeroPostHtml } from "../../ui/createHeroPostHtml.js";
import { displayMessage } from "../../ui/displayMessage.js";

export async function displayHeroPosts() {
  document.addEventListener("DOMContentLoaded", async () => {
    try {
      let currentPostIndex = 0;
      const posts = await fetchPosts();
      const postsData = posts.data;
      const latestPosts = postsData
        .sort((a, b) => new Date(b.created) - new Date(a.created))
        .slice(0, 3);

      const currentPostContainer = document.querySelector("#hero-list");

      createHeroPostHtml(currentPostContainer, latestPosts, currentPostIndex);

      const heroButtonNext = document.querySelector(".hero-button-next");
      const heroButtonPrev = document.querySelector(".hero-button-prev");

      heroButtonNext.addEventListener("click", () => {
        currentPostIndex = (currentPostIndex + 1) % latestPosts.length;
        createHeroPostHtml(currentPostContainer, latestPosts, currentPostIndex);
      });

      heroButtonPrev.addEventListener("click", () => {
        currentPostIndex =
          (currentPostIndex - 1 + latestPosts.length) % latestPosts.length;
        createHeroPostHtml(currentPostContainer, latestPosts, currentPostIndex);
      });

      let touchStartX = 0;

      currentPostContainer.addEventListener("touchstart", (event) => {
        touchStartX = event.touches[0].clientX;
      });

      currentPostContainer.addEventListener("touchend", (event) => {
        const touchEndX = event.changedTouches[0].clientX;
        const swipeDistance = touchEndX - touchStartX;

        if (swipeDistance > 50) {
          currentPostIndex =
            (currentPostIndex - 1 + latestPosts.length) % latestPosts.length;
          createHeroPostHtml(
            currentPostContainer,
            latestPosts,
            currentPostIndex
          );
        } else if (swipeDistance < -50) {
          currentPostIndex = (currentPostIndex + 1) % latestPosts.length;
          createHeroPostHtml(
            currentPostContainer,
            latestPosts,
            currentPostIndex
          );
        }
      });
    } catch (error) {
      console.error(error);
      // error message to user.
      displayMessage("#hero-list", "error", error.message);
    }
  });
}
