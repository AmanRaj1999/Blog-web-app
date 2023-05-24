//javascript
document.addEventListener("DOMContentLoaded", function () {
  const addBlogLink = document.getElementById("add-blog-link");
  const addBlogFormContainer = document.getElementById(
    "add-blog-form-container"
  );
  const addBlogForm = document.getElementById("add-blog-form");
  const blogList = document.getElementById("blog-list");

  // Fetch data from API and display on the UI
  function fetchPosts() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((posts) => {
        blogList.innerHTML = "";

        posts.forEach((post) => {
          createBlogElement(post);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  // Create a blog post element
  function createBlogElement(post) {
    const blog = document.createElement("div");
    blog.classList.add("blog");
    blog.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.body}</p>
      <button class="delete-button" data-id="${post.id}">Delete</button>
    `;
    blogList.appendChild(blog);
  }

  // Add a new blog post
  function addBlog(event) {
    event.preventDefault();

    const titleInput = document.getElementById("title");
    const bodyInput = document.getElementById("body");

    const newPost = {
      title: titleInput.value,
      body: bodyInput.value,
    };

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    })
      .then((response) => response.json())
      .then(() => {
        titleInput.value = "";
        bodyInput.value = "";
        fetchPosts();
        addBlogFormContainer.style.display = "none";
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  // Delete a blog post
  function deletePost(postId) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        fetchPosts();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  // Fetch posts on page load
  fetchPosts();

  // Add event listener to the link
  addBlogLink.addEventListener("click", function (event) {
    event.preventDefault();
    addBlogFormContainer.style.display = "block";
  });

  // Add event listener to the form
  if (addBlogForm) {
    addBlogForm.addEventListener("submit", addBlog);
  }

  // Event delegation for the delete button
  blogList.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-button")) {
      const postId = event.target.dataset.id;
      deletePost(postId);
    }
  });
});
