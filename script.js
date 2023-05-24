// Function to fetch blogs from the API
async function fetchBlogs() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const blogs = await response.json();
  return blogs;
}
// Function to render blogs in the UI
function renderBlogs(blogs) {
  const blogListElement = document.getElementById("blog-list");
  blogListElement.innerHTML = "";

  blogs.forEach((blog) => {
    const blogItem = document.createElement("div");
    blogItem.classList.add("blog-item");

    const titleElement = document.createElement("h2");
    titleElement.textContent = blog.title;

    const bodyElement = document.createElement("p");
    bodyElement.textContent = blog.body;

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteBlog(blog.id));

    blogItem.appendChild(titleElement);
    blogItem.appendChild(bodyElement);
    blogItem.appendChild(deleteButton);

    blogListElement.appendChild(blogItem);
  });
}
