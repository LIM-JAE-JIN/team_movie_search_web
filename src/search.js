// card.js에서 가져오는 함수

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

    // return generateMovieCards(searchedList);
  };
};

// 카드 정보들 다시 가져오기
async function fetchMovieData() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiY2U4ODA3ZDNkNGUyZTVhY2IxYzk5Mzc2OWQ5N2E3OSIsInN1YiI6IjY1MmYzNjZhYTgwMjM2MDEzNzY4OWE2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GNyZMpov_2bKO1zPaS3oSUpaq9_6gzs1ULOjbuB1vds"
    }
  };
}





// 검색어와 타이틀을 비교하여 저장
let searchedList = [];
const cardArray = Array.from($cardList);
console.log(cardArray);

$searchInput.addEventListener('submit', (event) => {
  const value = $searchInput.value.toLowerCase();
  searchedList = cardArray.filter(card => {
    console.log(card);
    const movieTitleElement = card.querySelector('.card_title');
    if (movieTitleElement) {
      const movieTitle = movieTitleElement.textContent.toLocaleLowerCase();
      return movieTitle.includes(value) ? card : "";
    }
  })
})




// 상단 띠배너 타이틀 클릭 시 초기화면(새로고침)
$topTitle.addEventListener('click', function () {
  location.reload();
});