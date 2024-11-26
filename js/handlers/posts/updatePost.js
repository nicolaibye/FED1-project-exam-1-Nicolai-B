import { postsUrl } from "../../../js/constants/api.js";

export function updatePost(form, postId) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const tags = document
      .getElementById(`tags-${postId}`)
      .value.trim()
      .split(",")
      .map((tag) => tag.trim());
    const title = document.getElementById(`title-${postId}`).value.trim();
    const body = document.getElementById(`body-${postId}`).value.trim();
    const image = document.getElementById(`image-${postId}`).value.trim();

    if (tags.length < 3) {
      alert("Make sure you have at least 3 tags that are seperated by commas.");
      return;
    }

    if (title.length > 110) {
      alert("Make sure your title is under 110 characters.");
      return;
    }

    if (image) {
      try {
        const url = new URL(image);
        if (url === "") {
          alert("Please make sure to add an image.");
          return;
        }
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

    const updatedPost = {
      tags,
      title,
      body,
      media: { url: image, alt: `Image of ${title}` },
    };

    try {
      const response = await fetch(`${postsUrl}/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibmljb2xhaWJ5ZSIsImVtYWlsIjoibmljYnllMDIyMTdAc3R1ZC5ub3JvZmYubm8iLCJpYXQiOjE3MzE2NjE2OTJ9.tI3y1megWaJpdO8umQV1IcS3Udizl3Lh6kEsimXv6m0",
        },
        body: JSON.stringify(updatedPost),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Internal Server Error");
      }
      alert("Post updated successfully!");
      location.reload();
    } catch (error) {
      console.error("Error updating post:", error);
      alert(error.message);
    }
  });
}
