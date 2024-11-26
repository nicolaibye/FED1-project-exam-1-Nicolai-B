import { registerUrl } from "/js/constants/api.js";

export function registerUser() {
  document
    .getElementById("register")
    .addEventListener("submit", async (event) => {
      event.preventDefault();

      const name = document.getElementById("register-username").value.trim();
      if (name.length < 3) {
        alert("Your username needs to be at least 3 characters long.");
        return;
      }

      const bio =
        document.getElementById("register-bio").value.trim() ||
        "No bio provided.";

      const avatarUrl = document.getElementById("register-avatar").value.trim();
      if (avatarUrl) {
        try {
          const url = new URL(avatarUrl);
          if (url.protocol !== "http:" && url.protocol !== "https:") {
            alert(
              "Your profile picture needs to be a valid URL starting with http:// or https://."
            );
            return;
          }
        } catch (error) {
          alert(
            "Your profile picture needs to be a valid URL starting with http:// or https://."
          );
          return;
        }
      }
      const avatar = {
        url: avatarUrl || "",
        alt: "User profile picture.",
      };

      const banner = {
        url: "https://i.pinimg.com/736x/c2/fe/11/c2fe117ff92fde13a43abded19b590a3.jpg",
        alt: "User profile banner.",
      };
      const venueManager = document.getElementById(
        "register-venue-manager"
      ).checked;

      const email = document.getElementById("register-email").value.trim();
      if (!email.includes("@")) {
        alert("Please enter a valid email address.");
        return;
      }

      const password = document.getElementById("register-password").value;
      const passwordRequirements = /^[A-Za-z\d@$!%*?&]{8,}$/;

      if (!passwordRequirements.test(password)) {
        alert("Your password needs to be at least 8 characters long.");
        return;
      }

      const registerData = {
        name,
        email,
        password,
        bio,
        avatar: {
          url: avatar.url,
          alt: avatar.alt,
        },
        banner: {
          url: banner.url,
          alt: banner.alt,
        },
        venueManager,
      };

      try {
        const registerResponse = await fetch(registerUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registerData),
        });

        if (!registerResponse.ok) {
          const errorData = await registerResponse.json();
          console.error("Registration error:", errorData);
          alert(`Registration failed: ${errorData.message}`);
          return;
        } else {
          alert("Registration successful! Redirecting to login page.");
          window.location.href = "../account/login.html";
        }
      } catch (error) {
        console.error("Registration error:", error);
        alert(`An error occurred during registration: ${error.message}`);
      }
    });
}
