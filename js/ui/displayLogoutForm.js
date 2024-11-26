export function displayLogoutForm() {
  document.addEventListener("DOMContentLoaded", () => {
    const accessToken = localStorage.getItem("token");
    const loginButton = document.querySelector("#login-button");
    const logoutButton = document.querySelector("#logout-button");
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");

    if (accessToken) {
      loginButton.style.display = "none";
      logoutButton.style.display = "inline-block";

      email.disabled = true;
      password.disabled = true;
    } else {
      loginButton.style.display = "inline-block";
      logoutButton.style.display = "none";
    }
  });
}
