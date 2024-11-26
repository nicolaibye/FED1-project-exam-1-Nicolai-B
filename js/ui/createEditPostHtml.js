import { toggleEditForm } from "../handlers/posts/toggleEditForm.js";
import { updatePost } from "../handlers/posts/updatePost.js";
import { deleteEditPost } from "../handlers/posts/deleteEditPost.js";

export function createEditPostHtml(container, post) {
  let parent = container;
  if (typeof container === "string") {
    parent = document.querySelector(container);
  }

  parent.innerHTML = "";

  let postsArray = post.data;

  postsArray.forEach((post) => {
    const { id, title, body, tags, media } = post;

    const editContainer = document.createElement("li");
    editContainer.classList.add("news-item", "edit-item");
    editContainer.id = `edit-item-${id}`;

    const editButton = document.createElement("button");
    editButton.classList.add("edit-button", "gear");
    editButton.innerHTML = `<i class="fa-solid fa-gear"></i>`;
    editButton.setAttribute("edit-post-button-id", id);

    const editTrash = document.createElement("button");
    editTrash.classList.add("edit-button", "trash");
    editTrash.innerHTML = `<i class="fa-solid fa-trash"></i>`;

    const editLink = document.createElement("a");
    editLink.href = `./index.html?id=${id}`;

    const editImage = document.createElement("img");
    editImage.src = media.url;
    editImage.alt = media.alt;

    const editContentContainer = document.createElement("div");
    editContentContainer.classList.add("news-content");

    const editTag = document.createElement("p");
    editTag.classList.add("news-tag", "space-mono-regular");
    editTag.textContent = tags[0] + " | " + tags[1];

    const editTitle = document.createElement("h3");
    editTitle.classList.add("news-title", "space-mono-bold");
    editTitle.textContent = title;

    const editForm = document.createElement("form");
    editForm.classList.add("edit-form");
    editForm.setAttribute("id", `Form-${id}`);

    const tagsLabel = document.createElement("label");
    tagsLabel.setAttribute("for", `tags-${id}`);
    tagsLabel.textContent = "Tags (Minimum 3):";
    const tagsInput = document.createElement("input");
    tagsInput.type = "text";
    tagsInput.id = `tags-${id}`;
    tagsInput.name = "tags";
    tagsInput.value = tags.join(", ");

    const titleLabel = document.createElement("label");
    titleLabel.setAttribute("for", `title-${id}`);
    titleLabel.textContent = "Title:";
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.id = `title-${id}`;
    titleInput.name = "title";
    titleInput.value = title;

    const bodyLabel = document.createElement("label");
    bodyLabel.setAttribute("for", `body-${id}`);
    bodyLabel.textContent = "Body:";
    const bodyInput = document.createElement("textarea");
    bodyInput.id = `body-${id}`;
    bodyInput.name = "body";
    bodyInput.value = body;

    const imageLabel = document.createElement("label");
    imageLabel.setAttribute("for", `image-${id}`);
    imageLabel.textContent = "Image:";
    const imageInput = document.createElement("input");
    imageInput.type = "text";
    imageInput.id = `image-${id}`;
    imageInput.name = "Image";
    imageInput.value = media.url;

    const submitButton = document.createElement("button");
    submitButton.classList.add("update-button", "space-mono-regular");
    submitButton.type = "submit";
    submitButton.textContent = "Update";

    const lineBreak = document.createElement("br");

    editForm.append(
      tagsLabel,
      tagsInput,
      lineBreak.cloneNode(),
      titleLabel,
      titleInput,
      lineBreak.cloneNode(),
      bodyLabel,
      bodyInput,
      lineBreak.cloneNode(),
      imageLabel,
      imageInput,
      lineBreak.cloneNode(),
      submitButton
    );

    editContentContainer.append(editTag, editTitle);
    editLink.append(editImage, editContentContainer);
    editContainer.append(editButton, editTrash, editLink, editForm);
    parent.append(editContainer);

    toggleEditForm(editButton, editForm);
    updatePost(editForm, id);
    deleteEditPost(editTrash, id);
  });
}
