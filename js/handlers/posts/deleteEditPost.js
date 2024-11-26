import { postsUrl } from "../../constants/api.js";

export function deleteEditPost(button, postId) {
  button.addEventListener("click", async () => {
    try {
      const response = await fetch(`${postsUrl}/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibmljb2xhaWJ5ZSIsImVtYWlsIjoibmljYnllMDIyMTdAc3R1ZC5ub3JvZmYubm8iLCJpYXQiOjE3MzE2NjE2OTJ9.tI3y1megWaJpdO8umQV1IcS3Udizl3Lh6kEsimXv6m0",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete post");
      }
      location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to delete post");
    }
  });
}
