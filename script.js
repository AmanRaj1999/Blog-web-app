document.addEventListener("DOMContentLoaded", function () {
  const blogList = document.getElementById("blogList");
  const addBlogForm = document.getElementById("addBlogForm");

  // Fetch blogs from the API
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((blog) => {
        const blogItem = createBlogItem(blog);
        blogList.appendChild(blogItem);
      });
    });

  // Add new blog
  addBlogForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const titleInput = document.getElementById("titleInput");
    const contentInput = document.getElementById("contentInput");

    const newBlog = {
      title: titleInput.value,
      body: contentInput.value,
    };

    const blogItem = createBlogItem(newBlog);
    blogList.appendChild(blogItem);

    titleInput.value = "";
    contentInput.value = "";
  });

  // Delete blog
  blogList.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-button")) {
      const blogItem = e.target.parentElement;
      blogList.removeChild(blogItem);
    }
  });

  function createBlogItem(blog) {
    const blogItem = document.createElement("div");
    blogItem.className = "blog";

    const title = document.createElement("h2");
    title.textContent = blog.title;

    const content = document.createElement("p");
    content.textContent = blog.body;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Delete";

    blogItem.appendChild(title);
    blogItem.appendChild(content);
    blogItem.appendChild(deleteButton);

    return blogItem;
  }
});
