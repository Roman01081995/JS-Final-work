fetch('https://jsonplaceholder.typicode.com/users')
  .then(res => res.json())
  .then(data => {
  const container = document.getElementById("users");

  data.forEach(user => {
  const userDiv = document.createElement("div");
  userDiv.textContent = `ID: ${user.id}, Name: ${user.name}`;

  const link = document.createElement("a");
  link.textContent = "Details";
  link.href = `user-details.html?id=${user.id}`;

  userDiv.appendChild(document.createElement("br"));
  userDiv.appendChild(link);

  container.appendChild(userDiv);
});
});
