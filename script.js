// get api url to placeholder profiles
const apiUrl = "https://reqres.in/";

// get elements from html
const formEl = document.querySelector("#loginForm");
const usersListEl = document.querySelector(".usersList");
const showUsersButtonEl = document.querySelector(".showUsersButton");
const userInfoContainerEl = document.querySelector(".userInfoContainer");

// when we press the submit button to log in...
formEl.addEventListener("submit", (event) => {
  // prevents the site from refreshing automatically when we press the button
  event.preventDefault();

  // fetch fake profiles and matches with the imput
  fetch("https://reqres.in/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: formEl["email"].value,
      password: formEl["password"].value,
    }),
  })
    .then((res) => res.json())
    .then((jsonData) => {
      // if we get an error, show the message
      if (jsonData.error) {
        const errorMessageEl = document.querySelector("#loginErrorMessage");
        errorMessageEl.innerHTML = jsonData.error;
        errorMessageEl.classList.remove("hide");
      }
      // otherwise, show the users button if we manage to log in
      else {
        const showUsersButtonEl = document.querySelector(".showUsersButton");
        showUsersButtonEl.classList.remove("hide");
      }
    });
});

// when we click on the "show users" button...
showUsersButtonEl.addEventListener("click", (e) => {
  // fetch all fake profiles
  fetch(apiUrl + "api/users")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      // create a variable that holds all users
      const users = data.data;
      // create a variable that holds all the users as a list
      const userList = users
        .map((user) => {
          console.log(user);
          return `<li class="user" data-userid="${user.id}">${user.first_name}</li>`;
        })
        .join("");
      // print the list of users
      usersListEl.innerHTML = userList;
    });
});

// when we click on users in the list...
usersListEl.addEventListener("click", (e) => {
  console.log(e.target.dataset.userid);
  // create a variable that holds the user id
  const userId = e.target.dataset.userid;
  // fetch the url of the profile that we click on
  fetch(`${apiUrl}api/users/${userId}`)
    .then((res) => res.json())
    .then((user) => {
      console.log(user);
      userInfoContainerEl.innerHTML = "";
      // create a variable that creates an element in html to print the name in
      const name = document.createElement("p");
      name.innerText = user.data.first_name + " " + user.data.last_name;

      // create a variable that creates an element in html to print the image in
      const avatarImg = document.createElement("img");
      avatarImg.src = user.data.avatar;

      // create a variable that creates an element in html to print the email in
      const email = document.createElement("p");
      email.innerText = user.data.email;

      // print name, avatar and email in corresponding elements
      userInfoContainerEl.append(name, avatarImg, email);
    });
});
