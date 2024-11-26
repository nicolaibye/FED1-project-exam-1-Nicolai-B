import { createApiKeyUrl, loginUrl } from "../../../constants/api.js";

export function loginUser(button, emailInput, passwordInput) {
  document.getElementById(button).addEventListener("click", async (event) => {
    event.preventDefault();

    const email = document.getElementById(emailInput).value.trim();
    const password = document.getElementById(passwordInput).value.trim();

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const apiKeyResponse = await fetch(createApiKeyUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibmljb2xhaWJ5ZSIsImVtYWlsIjoibmljYnllMDIyMTdAc3R1ZC5ub3JvZmYubm8iLCJpYXQiOjE3MzE2NjE2OTJ9.tI3y1megWaJpdO8umQV1IcS3Udizl3Lh6kEsimXv6m0",
        },
        body: JSON.stringify({ purpose: "login" }),
      });

      if (!apiKeyResponse.ok) {
        const error = await apiKeyResponse.json();
        console.error("Detailed Error:", error);
        throw new Error(error.message || "Internal Server Error");
      }

      const apiKeyData = await apiKeyResponse.json();
      const apiKey = apiKeyData.key;

      const loginResponse = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Noroff-API-Key": apiKey,
        },
        body: JSON.stringify({ email, password }),
      });

      if (!loginResponse.ok) {
        const errorData = await loginResponse.json();
        alert(`Login failed: ${errorData.message}`);
        return;
      } else {
        const loginData = await loginResponse.json();

        localStorage.setItem("token", loginData.data.accessToken);
        localStorage.setItem("username", loginData.data.name);
        localStorage.setItem("email", loginData.data.email);
        window.location.href = "../index.html";
      }
    } catch (error) {
      console.error("Login error:", error);
      alert(`An error occurred during login: ${error.message}`);
    }
  });
}
