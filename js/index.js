document.addEventListener("DOMContentLoaded", () => {
  const inputBtn = document.querySelector("input[name=submit]");
  // const userList = [];
  const ul = document.getElementById("user-list");
  const ulRepo = document.getElementById("repos-list");
  inputBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const inputBox = document.getElementById("search").value;
    // console.log(inputBox);
    // console.log("test");

    //resets input box after clicking submit
    document.getElementById("search").value = '';

    const configObject = {
      headers: {
        "Content-type": "application/json",
        Accept: "application/vnd.github.v3 + json",
      },
    };

    fetch(
      `https://api.github.com/search/users?q=${inputBox}`,
      configObject
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        data.items.forEach(data => displayUser(data))
      });

    function displayUser(data){
      const li = document.createElement("li");
      const avatarImg = document.createElement("img");
      const userLink = document.createElement('a');
      const linkText = document.createTextNode("Link to User Profile");
      const button = document.createElement("button");
      button.innerText = "show repo";

      const userName = document.createElement("h2");
      userName.innerText = data.login;
      userName.id = "name";

      // userName.innerText = data.login;
      avatarImg.src = data.avatar_url;
      
      userLink.append(linkText);
      userLink.title = "user profile link";
      userLink.href = data.url;

      li.append(userName, button, userLink, avatarImg);
      ul.append(li)

      function displayRepo(data){
        
        const li = document.createElement('li');

        const id = document.createElement("div");
        id.innerHTML = `ID: ${data.id} \n`;
        const name = document.createElement("div");
        name.innerHTML = `Name of Repository: ${data.name} \n`

        const owner = document.createElement("div");
        owner.innerHTML = `Owner: ${data.owner.login} \n`

        const htmlUrl = document.createElement("div");
        htmlUrl.innerHTML = `HTML URL: ${data.html_url} \n`;

        const fork = document.createElement("div");
        fork.innerHTML = `Fork Status: ${data.fork.toString()} <br/><br/>`

        li.append(owner, name, id, htmlUrl, fork);
        ulRepo.append(li);

       

      }

      button.addEventListener('click', (e) => {
        e.preventDefault();
        ulRepo.innerHTML = '';
        fetch (`https://api.github.com/users/${data.login}/repos`, configObject)
        .then(res => res.json())
        .then(data => {
          // console.log(data);
          // data.forEach(data => displayRepo(data))
          data.forEach(data => displayRepo(data));
        });


      })
    }

  
  


    // repos endpoint: https://api.github.com/users/octocat/repos
    //https://avatars.githubusercontent.com/u/583231?v=4 avatar
  });
});
