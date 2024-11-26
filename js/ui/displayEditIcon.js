export function displayEditIcon() {
  document.addEventListener("DOMContentLoaded", () => {
    const accessToken = localStorage.getItem("token");
    const editIcon = document.querySelector(".edit-link");

    if (accessToken) {
      editIcon.style.display = "inline-block";
    } else {
      editIcon.style.display = "none";
    }
  });
}
