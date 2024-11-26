export function displayNavLogout() {
  document.addEventListener("DOMContentLoaded", () => {
    const accessToken = localStorage.getItem("token");
    const logoutButton = document.querySelector("#nav-logout");

    if (accessToken) {
      logoutButton.style.display = "inline-block";
    } else {
      logoutButton.style.display = "none";
    }
  });
}
