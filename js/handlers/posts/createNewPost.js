import { postsUrl } from "../../constants/api.js";

export function createNewPost() {
  document.addEventListener("DOMContentLoaded", () => {
    const newPostOverlay = document.querySelector("#new-post-overlay");
    const newPostForm = document.querySelector("#new-post");
    const createButton = document.querySelector("#new-post-button");

    createButton.addEventListener("click", () => {
      newPostOverlay.classList.add("visible");
    });
    newPostOverlay.addEventListener("click", (event) => {
      if (event.target === newPostOverlay)
        newPostOverlay.classList.remove("visible");
    });

    newPostForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const tags = document
        .getElementById("new-post-tag")
        .value.trim()
        .split(",")
        .map((tag) => tag.trim());
      const title = document.getElementById("new-post-title").value.trim();
      const body = document.getElementById("new-post-body").value.trim();
      const image = document.getElementById("new-post-image").value.trim();

      if (!tags || !title || !body || !image) {
        alert("Please fill in all fields.");
        return;
      }

      if (tags.length < 3) {
        alert(
          "Make sure you have at least 3 tags that are seperated by commas."
        );
        return;
      }

      if (title.length > 110) {
        alert("Make sure your title is under 110 characters.");
        return;
      }

      if (image) {
        try {
          const url = new URL(image);
          if (url.protocol !== "http:" && url.protocol !== "https:") {
            alert(
              "Your image needs to be a valid URL starting with http:// or https://."
            );
            return;
          }
        } catch (error) {
          alert(
            "Your image needs to be a valid URL starting with http:// or https://."
          );
          return;
        }
      }

      const newPost = {
        tags,
        title,
        body,
        media: { url: image, alt: `Image of ${title}` },
      };

      try {
        const response = await fetch(`${postsUrl}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibmljb2xhaWJ5ZSIsImVtYWlsIjoibmljYnllMDIyMTdAc3R1ZC5ub3JvZmYubm8iLCJpYXQiOjE3MzE2NjE2OTJ9.tI3y1megWaJpdO8umQV1IcS3Udizl3Lh6kEsimXv6m0",
          },
          body: JSON.stringify(newPost),
        });

        if (!response.ok) {
          throw new Error("Failed to create post");
        }
        alert("Post created successfully!");
        newPostOverlay.classList.remove("visible");
        location.reload();
      } catch (error) {
        console.error("Error creating post:", error);
        alert(`An error occurred while creating the post. (${error.message})`);
      }
    });
  });
}
