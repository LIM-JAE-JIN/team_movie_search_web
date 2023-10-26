// card.js에서 가져오는 함수
import { fetchMovieData } from './card.js';

// DOM
const $topTitle = document.querySelector('.search_title');
const $searchInput = document.getElementById("search_input");
const $rank_mainBoard = document.querySelector(".rank_mainBoard");
const $rank_mainBoardImg = document.querySelector(".rank_mainBoardImg");
const $rankWrap = document.querySelector(".rankWrap");
const $rankCard = document.querySelectorAll(".card_li rank")
const $cardAllList = document.querySelector('.card_ol');
const $cardMoreBtn = document.querySelector('#loadMore');

// ======= 공통 =========
// 상단 띠배너 타이틀 클릭 시 초기화면(새로고침)
$topTitle.addEventListener('click', function () {
  location.reload();
});

// 카드 정보들 다시 가져오기
const movieListAll = await fetchMovieData(); // card.jsㅕ에서 fetch 데이터 가져옴
console.log(movieListAll);

// ======= 메인 =========
// rankWrap 부분에 카드 뿌리기 
// 1) 전체 카드들 중에서 랭킹 카드로 담을 애들 중 상위 5개만 뿌리기

movieListAll.sort((a, b) => b.vote_average - a.vote_average);
const top5Movie = movieListAll.slice(0, 5);
// console.log(top5Movie);

// 랭킹카드 뿌리는 함수
top5Movie.forEach((movie, idx) => {
  const rankHTML = `<li class="card_li rank">
  <div class="card_poster">
  <a href="./detail.html?detail_id=${movie.id}" class="card_thumb_item">
      <div class="card_poster_movie">
        <img
          src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
          class="img_thumb"
          alt=""
        />
        <span class="rank_num">${idx + 1}</span>
      </div>
    </a>
  </div>
  <div class="card_title">
    <strong>
      <a half=""> ${movie.title} </a>
    </strong>
  </div>
</li>`;
  $rankWrap.innerHTML += rankHTML;
});
// 2) 랭킹 카드에 마우스를 가져다대면 메인 이미지, 타이틀, 바뀌기
// 해당 카드의 id 값으로 매칭하여 값을 불러오기?

$rank_mainBoardImg.style.backgroundImage = 'url("https://t1.daumcdn.net/cfile/tistory/99B9CB495C866F5717")'

// ======= 검색 =========
// 검색 실행 및 유효성 검사 함수
export const searching = () => {
  if ($searchInput.value.length === 0) { // 검색창에 단어를 입력하지 않은 경우
    alert("검색어가 입력되지 않았습니다.")
    return
  } else if (searchedList.length === 0) { // 검색된 결과가 없을 경우
    alert("검색 결과가 없습니다.");
    return
  } else { // 정상 검색되는 경우
    alert(($searchInput.value) + "를(을) 검색한 결과 입니다.");
    $rank_mainBoard.style.display = "none";
    $rankWrap.style.display = "none";
    $cardMoreBtn.style.display = "none";
    $cardAllList.innerHTML = "";

    searchedMoive(searchedList);
  };
};

// 검색된 카드를 뿌리는 함수 
const searchedMoive = (movieListAll) => {
  $cardAllList.innerHTML = movieListAll.map( // map함수로 새로운 배열을 반환
    (movie) => `<li class="card_li">
<div class="card_poster">
  <a href="./detail.html?detail_id=${movie.id}" class="card_thumb_item">
    <div class="card_poster_movie">
      <img
        src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
        class="img_thumb"
        alt="image"
      />
      <span class="rank_num">${movie.vote_average}</span>
    </div>
  </a>
</div>
<div class="card_title">
<strong>
  <a half="./detail.html?detail_id=${movie.id}">${movie.title}</a>
</strong>
</div>
</li>`
  ).join("");
};


// 검색어와 타이틀을 비교하여 저장
let searchedList = []; // 검색된 결과를 담을 새로운 배열 선언

$searchInput.addEventListener('input', (event) => {
  const value = $searchInput.value.toLowerCase();
  searchedList = movieListAll.filter(card => {
    const movieTitleElement = card.title;
    const movieTitle = movieTitleElement.toLowerCase();
    return movieTitle.includes(value) ? card : "";
  })
  console.log(searchedList);
})


