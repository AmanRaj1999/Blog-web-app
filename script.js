// Function to fetch blogs from the API
async function fetchBlogs() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const blogs = await response.json();
  return blogs;
}
