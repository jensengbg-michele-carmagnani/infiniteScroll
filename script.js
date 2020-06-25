const postContainer = document.getElementById("posts-container");
const loading = document.querySelector(".loader");
const filter = document.getElementById("filter");

let limit = 5;
let page = 1;

// fetch post
async function getPosts() {
  const url = `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

// Display posts
async function showPosts() {
  const posts = await getPosts();
  console.log(posts);

  posts.forEach((post) => {
    const postEl = document.createElement("article");
    postEl.classList.add("post");
    postEl.innerHTML = `<div class="number">${post.id}</div>
    <div class="post-info">
      <h2 class="post-title">${post.title}</h2>
      <p class="post-body">
        ${post.body}
      </p>
    </div>`;
    postContainer.appendChild(postEl);
  });
}
// show loader and fetch more post
function showLoading() {
  loading.classList.add("show");
  setTimeout(() => {
    loading.classList.remove("show");
    setTimeout(() => {
      page++;
      showPosts();
    }, 300);
  }, 1000);
}
// show intial posts
showPosts();

// filter post by input
function filterPosts(e) {
  console.log(e.target.value);
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll(".post");

  posts.forEach((post) => {
    const title = post.querySelector(".post-title").innerText.toUpperCase();
    const body = post.querySelector("post-body").innerText.toUpperCase();

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = "flex";
    } else {
      post.style.display = "none";
    }
  });
}

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});

filter.addEventListener("input", filterPosts());
