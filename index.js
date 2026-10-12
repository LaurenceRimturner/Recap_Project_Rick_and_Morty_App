import { createCharacterCard } from "./components/CharacterCard/CharacterCard.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]',
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let maxPage = 1;
let page = 1;
let searchQuery = "";

// Pagination Btns

prevButton.addEventListener("click", () => {
  if (page > 1) {
    page--;
    fetchCharacters();
  }
});

nextButton.addEventListener("click", () => {
  if (page < maxPage) {
    page++;
    fetchCharacters();
  }
});

// Search Bar
searchBar.addEventListener("submit", (event) => {
  event.preventDefault();
  searchQuery = event.target.elements.query.value;
  page = 1;
  cardContainer.innerHTML = "";
  fetchCharacters();
});

// API Fetch
async function fetchCharacters() {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${page}&name=${searchQuery}`,
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    maxPage = data.info.pages;
    console.log(data.results);
    for (const character of data.results) {
      const characterCard = createCharacterCard(character);
      cardContainer.append(characterCard);

      pagination.textContent = `${page} / ${maxPage}`;
    }

    prevButton.disabled = page === 1;
    nextButton.disabled = page === maxPage;
  } catch (error) {
    console.log("Error Message: ", error.message);
    cardContainer.innerHTML = "<p>Keine Charaktere gefunden.</p>";
    pagination.textContent = "0 / 0";
    prevButton.disabled = true;
    nextButton.disabled = true;
  }
}

fetchCharacters();
