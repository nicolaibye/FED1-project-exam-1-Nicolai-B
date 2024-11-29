import { displayHeroPosts } from "./handlers/posts/displayHeroPosts.js";
import { displayFeedPosts } from "./handlers/posts/displayFeedPosts.js";
import { loginUser } from "./handlers/posts/login/loginUser.js";
import { displayEditIcon } from "./ui/displayEditIcon.js";
import { displayLogoutForm } from "./ui/displayLogoutForm.js";
import { displayNavAvatar, displayNavLogout } from "./ui/displayNav.js";
import { logoutUser } from "./handlers/posts/login/logoutUser.js";
import { registerUser } from "./handlers/posts/registerUser.js";
import { displayEditPosts } from "./handlers/posts/displayEditPosts.js";
import { loginCheck } from "./handlers/posts/login/loginCheck.js";
import { createNewPost } from "./handlers/posts/createNewPost.js";
import { displayBlogPostById } from "./handlers/posts/displayBlogPostById.js";

displayEditIcon();
displayNavLogout();
displayNavAvatar();
logoutUser("nav-logout");

function router() {
  const { pathname } = window.location;
  switch (pathname) {
    case "/":
    case "/index.html":
    case "/index":
      displayHeroPosts();
      displayFeedPosts();
      break;
    case "/account/login.html":
    case "/account/login":
      loginUser("login-button", "email", "password");
      logoutUser("logout-button");
      displayLogoutForm();
      break;
    case "/account/register.html":
    case "/account/register":
      registerUser();
      break;
    case "/post/edit.html":
    case "/post/edit":
      loginCheck();
      displayEditPosts();
      createNewPost();
      break;
    case "/post/index.html":
    case "/post/index":
      displayBlogPostById();
      break;
  }
}

router();
