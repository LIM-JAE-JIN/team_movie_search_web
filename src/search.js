// card.js에서 가져오는 함수
import { generateMovieCards } from "./card.js";

let currentCount = 0;
let loadCount = 5;
let loadMoreButton = document.getElementById("loadMore");

generateMovieCards();