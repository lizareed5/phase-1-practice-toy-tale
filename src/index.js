let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    })
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
    //on dom load
  //fetch toys
  fetchAll()
  handleSubmit()
  })
const toyContainer = document.querySelector("#toy-collection")
const toyForm = document.querySelector(".add-toy-form")
const url = "http://localhost:3000/toys"
//fetch toys (GET)
  //add toy card
  //put card in DOM

const fetchAll = () => {
  fetch(url)
  .then((response) => response.json())
  .then((data) => data.forEach(character => addToyCard(character)))
}
//add toy card
const addToyCard = (character) => {
      //create all elements
  let div = document.createElement("div");
  let h2 = document.createElement("h2");
  let img = document.createElement("img");
  let p = document.createElement("p");
  let button = document.createElement("button");

    //populate elements
  div.classList.add("card")
  h2.innerText = character.name
  img.src = character.image
  img.classList.add("toy-avatar")
  p.innerText = `${character.likes} Likes`
  button.innerText = 'Like ❤️'
  button.classList.add("like-btn")
  button.setAttribute("id", character.id)
    //add any eventListeners
  button.addEventListener("click", (e) => {
    likeButton(e)
  })  
  div.appendChild(h2)
  div.appendChild(img)
  div.appendChild(p)
  div.appendChild(button)
  toyContainer.appendChild(div)

}
//on form submit
const handleSubmit = (e) => {
toyForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let toyObj = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0
  };
  addNewToy(toyObj)
})
}
  //add new toy (POST)
      //get form information
    //make POST request
    //if successful update DOM with new toy card
      //add toy card
const addNewToy = (toyObj) => {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",       
      "Accept": "application/json",
    },
    body:JSON.stringify(toyObj)
  })
  .then((response) => response.json())
  .then((toyObj) => addToyCard(toyObj))
  }

//on like button click
  //increase like (PATCH)
    //update in the DOM
const likeButton = (e) => {
  let id = e.target.id
  let btnTarget = e.target.previousElementSibling
  let numLikes = parseInt(btnTarget.innerText.split(' ')[0]) + 1

  fetch(`${url}/${id}`, {
    method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body:JSON.stringify({
          likes: numLikes
        })
  })

  btnTarget.innerText = `${numLikes} Likes`
}