const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('postId');

const postContainer = document.getElementById('post-info');
const commentsContainer = document.getElementById('comments-container');

fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
.then(res => res.json())
.then(post => {
for (const key in post) {
const div = document.createElement('div');
div.textContent = `${key}: ${post[key]}`;
postContainer.appendChild(div);
    }
fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
.then(res => res.json())
.then(comments => {
comments.forEach(comment => {
const commentDiv = document.createElement('div');
commentDiv.textContent = `${comment.name} (${comment.email}): ${comment.body}`;
commentsContainer.appendChild(commentDiv);
        });
      });
  });
