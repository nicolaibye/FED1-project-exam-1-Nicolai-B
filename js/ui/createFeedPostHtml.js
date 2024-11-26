export function createFeedPostHtml(container, post, link) {
  let parent = container;
  if (typeof container === "string") {
    parent = document.querySelector(container);
  }

  parent.innerHTML = "";

  let postsArray = post.data;

  postsArray.forEach((post) => {
    const { id, title, tags, media } = post;

    const feedContainer = document.createElement("li");
    feedContainer.classList.add("news-item");

    const feedLink = document.createElement("a");
    feedLink.href = `${link}/index.html?id=${id}`;

    const feedImage = document.createElement("img");
    feedImage.alt = media.alt;
    feedImage.src = media.url;

    const feedContentContainer = document.createElement("div");
    feedContentContainer.classList.add("news-content");

    const feedTag = document.createElement("p");
    feedTag.classList.add("news-tag", "space-mono-regular");
    feedTag.textContent = tags[0] + " | " + tags[1];

    const feedTitle = document.createElement("h3");
    feedTitle.classList.add("news-title", "space-mono-bold");
    feedTitle.textContent = title;

    feedContentContainer.append(feedTag, feedTitle);
    feedLink.append(feedImage, feedContentContainer);
    feedContainer.append(feedLink);

    parent.append(feedContainer);
  });
}
