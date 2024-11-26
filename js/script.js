import { displayHeroPosts } from "./handlers/posts/displayHeroPosts.js";
import { displayFeedPosts } from "./handlers/posts/displayFeedPosts.js";
import { loginUser } from "./handlers/posts/login/loginUser.js";
import { displayEditIcon } from "./ui/displayEditIcon.js";
import { displayLogoutForm } from "./ui/displayLogoutForm.js";
import { displayNavLogout } from "./ui/displayNavLogout.js";
import { logoutUser } from "./handlers/posts/login/logoutUser.js";
import { registerUser } from "./handlers/posts/registerUser.js";
import { displayEditPosts } from "./handlers/posts/displayEditPosts.js";
import { loginCheck } from "./handlers/posts/login/loginCheck.js";
import { createNewPost } from "./handlers/posts/createNewPost.js";
import { displayBlogPostById } from "./handlers/posts/displayBlogPostById.js";

displayEditIcon();
displayNavLogout();
logoutUser("nav-logout");

function router() {
  const { pathname } = window.location;
  switch (pathname) {
    case "../":
    case "../index.html":
      displayHeroPosts();
      displayFeedPosts();
      break;
    case "../account/login.html":
      loginUser("login-button", "email", "password");
      logoutUser("logout-button");
      displayLogoutForm();
      break;
    case "../account/register.html":
      registerUser();
      break;
    case "../post/edit.html":
      loginCheck();
      displayEditPosts();
      createNewPost();
      break;
    case "../post/index.html":
      displayBlogPostById();
      break;
  }
}

router();
