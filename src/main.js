import { searching } from './search.js'
import { generateMovieCards } from './card.js'
generateMovieCards();


const $searchBox = document.querySelector(".search_box");
// 검색 기능
$searchBox.addEventListener("submit", function (event) {
  event.preventDefault();
  searching();
});
