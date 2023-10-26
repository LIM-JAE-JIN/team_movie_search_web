// card.js에서 가져오는 함수
import { fetchMovieData } from './card.js';


// DOM
const $searchBox = document.querySelector(".search_box");
const $searchInput = document.getElementById("search_input");
const $rank_mainBoard = document.querySelector(".rank_mainBoard");
const $rankWrap = document.querySelector(".rankWrap");

const $topTitle = document.querySelector('.search_title');


// 검색 시 새로고침 방지
$searchBox.addEventListener("submit", function (event) {
  event.preventDefault();
  searchedMovie();
});

// 검색된 카드 리스트를 뿌려주는 함수.
let searchedMovie = () => {
  if ($searchInput.value.length === 0) {
    alert("검색어가 입력되지 않았습니다.")
    return
  } else {
    alert(($searchInput.value) + "를(을) 검색한 결과 입니다.");
    $rank_mainBoard.style.display = "none"
    $rankWrap.style.display = "none"
  };
};

// 카드 정보들 다시 가져오기
const movieListAll = await fetchMovieData();
console.log("카드 전체 정보 : " + movieListAll);

// 검색어와 타이틀을 비교하여 저장
let searchedList = [];

$searchInput.addEventListener('input', (event) => {
  const value = $searchInput.value.toUpperCase();
  searchedList = movieListAll.filter(card => {
    console.log(card.title);
    const movieTitleElement = card["title"];
    console.log(movieTitleElement);
    if (movieTitleElement) {
      const movieTitle = movieTitleElement.toUpperCase();
      return movieTitle.includes(value) ? card : "";
    }
  })
})



// 상단 띠배너 타이틀 클릭 시 초기화면(새로고침)
$topTitle.addEventListener('click', function () {
  location.reload();
});