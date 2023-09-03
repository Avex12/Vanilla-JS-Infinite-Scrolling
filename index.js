const card_container = document.querySelector(".card-container");
const loader = document.querySelector("#loader");
let page = 1;
let url = `https://jsonplaceholder.typicode.com/posts?_limit=12&_page=${page}`;

// Initial Data Fetch
fetchPosts(url, renderPosts);

// Scroll Listener
window.addEventListener("scroll", () => {
  const clientHeight = card_container.clientHeight;
  const windowInnerHeight = window.innerHeight;
  const scrollTop = document.documentElement.scrollTop;

  if (windowInnerHeight + scrollTop >= clientHeight - 1) {
    if (page >= 10) return;
    page += 1;
    url = `https://jsonplaceholder.typicode.com/posts?_limit=12&_page=${page}`;
    fetchPosts(url, renderPosts);
  }
});

// Rendering Posts
function renderPosts(posts) {
  posts.forEach((post) => {
    const postCard = document.createElement("div");
    postCard.innerHTML = `<div class="card">
    <h1>${post.id}</h1>
    <h2>
      ${post.title}
    </h2>
    <p>
    ${post.body}
    </p>
  </div>`;
    card_container.appendChild(postCard);
  });
}

// Fetching Data
function fetchPosts(url, callback) {
  loader.classList.add("show");
  fetch(url)
    .then((data) => {
      return data.json();
    })
    .then((posts) => {
      callback(posts);
      loader.classList.remove("show");
    })
    .catch((err) => {
      console.log(err);
    });
}
