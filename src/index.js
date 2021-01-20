let addToy = false;
const toysURL = "http://localhost:3000/toys"
let toys = {}

document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.querySelector("#new-toy-btn");
    const toyFormContainer = document.querySelector(".container");
    addBtn.addEventListener("click", () => {
        // hide & seek with the form
        addToy = !addToy;
        if (addToy) {
            toyFormContainer.style.display = "block";
        } else {
            toyFormContainer.style.display = "none";
        }
    });

    fetchToys()
    postToy()
});


// DATA
//GET
function fetchToys() {
    fetch(toysURL)
        .then(res => res.json())
        .then(toys => renderToy(toys))
}

//CREATE
function postToy() {
    document.querySelector('.add-toy-form').addEventListener('submit', function () {
        let name = document.querySelector("input[name='name']").value
        let image = document.querySelector("input[name='image']").value

        fetch(toysURL, {
            method: 'POST',
            headers:
                {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
            body: JSON.stringify({
                "name": name,
                "image": image,
                "likes": 0
            })
        })
    })
}

//UPDATE
function updateLikes(toy) {
    fetch(toysURL + `/${toy.id}`, {
        method: 'PATCH',
        headers:
            {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        body: JSON.stringify({
            "likes": toy.likes + 1
        })
    }).then(function () {
        let card = document.getElementById(`${toy.id}`)
        let toyLikes = card.querySelector('p')
        toyLikes.textContent = `${toy.likes + 1} likes`
        toy.likes += 1
    })
}

//DELETE
function dltToy(toy) {
    fetch(toysURL + `/${toy.id}`, {
        method: 'DELETE',
        headers:
            {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
    }).then(function () {
        document.getElementById(`${toy.id}`).remove()
    })
}

//DOM
function renderToy(fetchedToys) {
    toys = fetchedToys
    const toyCollection = document.querySelector('div#toy-collection')

    toys.forEach(toy => {
        //create card for each toy
        const cardDiv = document.createElement('div')
        cardDiv.className = 'card'
        cardDiv.id = toy.id
        //add content to the card
        let h2 = document.createElement('h2')
        let img = document.createElement('img')
        let p = document.createElement('p')
        let button = document.createElement('button')
        let dltButton = document.createElement('button')


        h2.textContent = toy.name
        img.src = toy.image
        img.className = "toy-avatar"
        p.textContent = `${toy.likes} likes`
        button.textContent = 'Like <3'
        button.className = "like-btn"
        button.addEventListener('click', function () {
            updateLikes(toy)
        })
        dltButton.textContent = 'x'
        dltButton.addEventListener('click', function () {
            dltToy(toy)
        })
        //append content to the card
        cardDiv.append(h2, img, p, button, dltButton)
        //append card to toys layout
        toyCollection.appendChild(cardDiv)
    })
}