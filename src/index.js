console.log('%c HI', 'color: firebrick')

let breeds = [];

function fetchImages() {
    fetch('https://dog.ceo/api/breeds/image/random/4')
    .then(resp => resp.json())
    .then(json => renderImages(json));
}

function fetchBreeds() {
    fetch('https://dog.ceo/api/breeds/list/all')
    .then(resp => resp.json())
    .then(json => renderBreeds(json));
}

function renderImages(json) {
    const imgContainer = document.getElementById('dog-image-container');
    json.message.forEach(image => {
        const newImg = document.createElement('img');
        newImg.src = image;
        imgContainer.appendChild(newImg);
    });
}

function renderBreeds(json) {
    const breedContainer = document.getElementById('dog-breeds');
    breeds = Object.keys(json.message);
    breeds.forEach(breed => {
        const li = document.createElement('li');
        li.innerText = breed;
        li.className = "breed-list-item"
        breedContainer.appendChild(li);
    });
}

function addEventToBreeds() {
    document.getElementById('dog-breeds').addEventListener('click', function(e){
        if (e.target && e.target.matches("li.breed-list-item")) {
            e.target.style.color = "blue";
        }
    });
};

function addEventToDropdown() {
    document.getElementById('breed-dropdown').addEventListener('change', function(e){
        const selected = e.target.value;
        let filteredBreeds = breeds.filter(breed => breed.startsWith(selected))
        removeChildren(document.getElementById('dog-breeds'));
        addFilteredBreeds(filteredBreeds);
    });
};

function removeChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.lastChild);
    }
}

function addFilteredBreeds(filteredBreeds) {
    filteredBreeds.forEach(breed => {
        const li = document.createElement('li');
        li.innerText = breed;
        li.className = "breed-list-item"
        document.getElementById('dog-breeds').appendChild(li);
    });
}

// Events that will happen on page load
document.addEventListener('DOMContentLoaded', function() {
    fetchImages();
    fetchBreeds();
    addEventToBreeds();
    addEventToDropdown();
  })