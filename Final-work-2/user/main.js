const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');
const container = document.getElementById('user-info');

fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
.then(res => res.json())
.then(user => {
    for (const key in user) {
      const div = document.createElement('div');
      if (typeof user[key] === 'object') {
        div.textContent = `${key}: ${JSON.stringify(user[key], null, 2)}`;
      } else {
        div.textContent = `${key}: ${user[key]}`;
      }
      container.appendChild(div);
    }

const btnPosts = document.createElement('button');
btnPosts.textContent = 'posts of current user';
container.appendChild(btnPosts);

btnPosts.addEventListener('click', () => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
    .then(res => res.json())
    .then(posts => {
    const postsContainer = document.createElement('div');
    postsContainer.id = 'posts-container';

    posts.forEach(post => {
    const postDiv = document.createElement('div');
    postDiv.textContent = post.title;

    const postLink = document.createElement('a');
    postLink.textContent = 'Details';
    postLink.href = `post-details.html?postId=${post.id}`;

    postDiv.appendChild(document.createElement('br'));
    postDiv.appendChild(postLink);

    postsContainer.appendChild(postDiv);
          });

    container.appendChild(postsContainer);
        });
    });
  });
