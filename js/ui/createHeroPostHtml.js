export function createHeroPostHtml(container, post, index) {
  let parent = container;
  if (typeof container === "string") {
    parent = document.querySelector(container);
  }

  parent.innerHTML = "";

  const currentPost = post[index];

  const { id, title, tags, media, author, created } = currentPost;

  const heroContainer = document.createElement("li");
  heroContainer.classList.add("hero-item");

  const heroLink = document.createElement("a");
  heroLink.href = `post/index.html?id=${id}`;

  const heroImage = document.createElement("img");
  heroImage.classList.add("hero-image");
  heroImage.alt = media.alt;
  heroImage.src = media.url;

  const heroHeaderContainer = document.createElement("div");
  heroHeaderContainer.classList.add("blog-post-header-container");

  const heroTag = document.createElement("p");
  heroTag.classList.add("blog-post-tag", "space-mono-regular");
  heroTag.textContent = tags[0] + " | " + tags[1] + " | " + tags[2];

  const heroTitle = document.createElement("h1");
  heroTitle.classList.add("blog-post-title", "space-mono-bold");
  heroTitle.textContent = title;

  const date = new Date(created);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  const heroBlurb = document.createElement("p");
  heroBlurb.classList.add("blog-post-author", "commissioner-regular");
  heroBlurb.textContent = `Written by ${author.name} | Published ${formattedDate}`;

  heroHeaderContainer.append(heroTag, heroTitle, heroBlurb);
  heroLink.append(heroImage, heroHeaderContainer);
  heroContainer.append(heroLink);

  parent.append(heroContainer);
}
