import { createFeedPostHtml } from "./createFeedPostHtml.js";
import { fetchPosts } from "/js/api/posts/fetchPosts.js";

export async function createBlogPostHtml(container, post) {
  let parent = container;
  if (typeof container === "string") {
    parent = document.querySelector(container);
  }

  parent.innerHTML = "";

  const { title, body, tags, media, author, created } = post.data;

  const paragraphs = body.split(/\n+/);

  const metaTags = document.createElement("meta");
  metaTags.name = "keywords";
  metaTags.content = tags.join(", ");
  document.head.appendChild(metaTags);

  const metaOgTitle = document.createElement("meta");
  metaOgTitle.setAttribute("property", "og:title");
  metaOgTitle.content = `HotViews Labs | ${title}`;
  document.head.appendChild(metaOgTitle);

  const metaOgImage = document.createElement("meta");
  metaOgImage.setAttribute("property", "og:image");
  metaOgImage.content = media.url;
  document.head.appendChild(metaOgImage);

  const metaOgDescription = document.createElement("meta");
  metaOgDescription.setAttribute("property", "og:description");
  metaOgDescription.content = paragraphs[0];
  document.head.appendChild(metaOgDescription);

  document.title = `HotViews Labs | ${title}`;

  const blogPostHeader = document.createElement("section");
  blogPostHeader.classList.add("blog-post");

  const blogPostImage = document.createElement("img");
  blogPostImage.src = media.url;
  blogPostImage.alt = media.alt;

  const blogPostHeaderContainer = document.createElement("div");
  blogPostHeaderContainer.classList.add("blog-post-header-container");

  const blogPostTag = document.createElement("p");
  blogPostTag.classList.add("blog-post-tag", "space-mono-regular");
  blogPostTag.textContent = tags[0] + " | " + tags[1];

  const blogPostTitle = document.createElement("h1");
  blogPostTitle.classList.add("blog-post-title", "space-mono-bold");
  blogPostTitle.textContent = title;

  const date = new Date(created);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;
  const blogPostAuthor = document.createElement("p");
  blogPostAuthor.classList.add("blog-post-author", "commissioner-regular");
  blogPostAuthor.textContent = `Written by ${author.name} | Published ${formattedDate}`;

  blogPostHeaderContainer.append(blogPostTag, blogPostTitle, blogPostAuthor);
  blogPostHeader.append(blogPostImage, blogPostHeaderContainer);

  const postContent = document.createElement("section");
  postContent.classList.add("post-content");

  const postBlurb = document.createElement("p");
  postBlurb.classList.add("post-blurb", "commissioner-regular");
  postBlurb.textContent = paragraphs[0];

  const postBody = document.createElement("div");
  postBody.classList.add("post-body", "koh-santepheap-regular");

  paragraphs.slice(1).forEach((paragraph) => {
    const paragraphElement = document.createElement("p");
    paragraphElement.textContent = paragraph;
    const lineBreak = document.createElement("br");
    postBody.append(paragraphElement, lineBreak);
  });

  const postLatest = document.createElement("div");
  postLatest.classList.add("post-latest");

  const postLatestTitle = document.createElement("h2");
  postLatestTitle.classList.add("space-mono-regular");
  postLatestTitle.textContent = "Latest";

  const postLatestList = document.createElement("ul");
  postLatestList.classList.add("news-list");

  postLatest.append(postLatestTitle, postLatestList);
  postContent.append(postBlurb, postBody, postLatest);

  parent.append(blogPostHeader, postContent);

  const latestPostsContainer = document.querySelector(".news-list");
  const latestPostsData = await fetchPosts();
  const latestPostsArray = latestPostsData.data
    .sort((a, b) => new Date(b.created) - new Date(a.created))
    .slice(0, 3);
  const latestPosts = { data: latestPostsArray };
  createFeedPostHtml(latestPostsContainer, latestPosts, ".");
}
