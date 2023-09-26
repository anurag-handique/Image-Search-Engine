const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");
const accessKey = "7DtIW_ygI1WSw-KiO8ZugtUVEIyjHCwcBt3XPEBZhpE";

const imageModal = document.getElementById("image-modal");
const modalImage = document.getElementById("modal-image");
const closeModal = document.querySelector(".close");

let switchState = false;
    
function toggleSwitch() {
    const toggleSwitch = document.querySelector('.ToggleSwitch');
    switchState = !switchState;
    toggleSwitch.classList.toggle('on', switchState);

    const body = document.body;
    const container = document.querySelector('.container');

    
    if (switchState) {
        
        container.style.backgroundColor = '#000'; 
    } else {
        
        container.style.backgroundColor = '#39297B';
    }

    if (switchState) {
       
        body.style.backgroundColor = '#000'; 
    } else {
       
        body.style.backgroundColor = '#39297B';
    }
}

function openModal(imageSrc) {
    modalImage.src = imageSrc;
    imageModal.style.display = "block";
}

function closeModalFunction() {
    imageModal.style.display = "none";
}

searchResult.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
        openModal(e.target.src);
    }
});

closeModal.addEventListener("click", () => {
    closeModalFunction();
});

window.addEventListener("click", (e) => {
    if (e.target === imageModal) {
        closeModalFunction();
    }
});

let keyword = "";
let page = 1;

async function searchImages() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=30`;
    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;
    results.map((result) => {
        const image = document.createElement("img");
        image.src = result.urls.small;
        const imageLink = document.createElement("a");
    
        imageLink.appendChild(image);
        searchResult.appendChild(imageLink);
    });
    showMoreBtn.style.display = "block";
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    searchResult.innerHTML = ""; 
    page = 1;
    searchImages();
});

showMoreBtn.addEventListener("click", () => {
    page++;
    searchImages();
});
