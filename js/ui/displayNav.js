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

export function displayNavAvatar() {
  document.addEventListener("DOMContentLoaded", () => {
    const accessToken = localStorage.getItem("token");
    const avatarImage = localStorage.getItem("avatar");
    const navAvatar = document.querySelector("#nav-avatar");
    const navLogin = document.querySelector("#nav-login");

    if (avatarImage) {
      navAvatar.src = avatarImage;
    }

    if (accessToken) {
      navAvatar.style.display = "inline-block";
      navLogin.style.display = "none";

    } else {
      navAvatar.style.display = "none";
      navLogin.style.display = "inline-block";
    }
  });
}
