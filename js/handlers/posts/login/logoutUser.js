export async function logoutUser(elementId) {
  document
    .getElementById(elementId)
    .addEventListener("click", async (event) => {
      localStorage.clear();
      window.location.href = "../index.html";
    });
}
