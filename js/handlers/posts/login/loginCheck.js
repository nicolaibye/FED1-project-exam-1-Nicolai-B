export function loginCheck() {
  document.addEventListener("DOMContentLoaded", () => {
    const accessToken = localStorage.getItem("token");
    if (!accessToken) {
      alert("You must be logged in to view this page.");
      window.location.href = "../account/login.html";
    }
  });
}
