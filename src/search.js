// card.js에서 가져오는 함수
import { fetchMovieData } from './card.js';

// DOM
const $topTitle = document.querySelector('.search_title');
const $searchInput = document.getElementById("search_input");
const $rank_mainBoard = document.querySelector(".rank_mainBoard");
const $rank_mainBoardImg = document.querySelector(".rank_mainBoardImg");
const $rankWrap = document.querySelector(".rankWrap");
const $rankCard = document.querySelectorAll(".rankCard")
const $cardAllList = document.querySelector('.card_ol');
const $cardMoreBtn = document.querySelector('#loadMore');

// ======= 공통 =========
// 상단 띠배너 타이틀 클릭 시 초기화면(새로고침)
$topTitle.addEventListener('click', function () {
  location.reload();
});

// 카드 정보들 다시 가져오기
const movieListAll = await fetchMovieData(); // card.js에서 fetch 데이터 가져오기
// console.log(movieListAll);

// ======= 메인 =========
// rankWrap 부분에 카드 뿌리기 
movieListAll.sort((a, b) => b.vote_average - a.vote_average); // sort 메서드를 이용해 평점으로 정렬하기
const top5Movie = movieListAll.slice(0, 5); // 랭킹 5개 영화 카드 리스트
// console.log(top5Movie);

// 랭킹카드 뿌리는 함수
top5Movie.forEach((movie, idx) => { //movie 객체와 인덱스를 활용하는 콜백 함수 실행
  const rankHTML = `<li class="rankCard" movie-id="${movie.id}">
  <div class="card_poster">
  <div class="card_thumb_item">
      <div class="card_poster_movie">
        <img
          src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
          class="img_thumb"
          alt=""
        />
        <span class="rank_num">${idx + 1}</span>
      </div>
    </div>
  </div>
  <div class="card_title">
    <strong>
      <a half=""> ${movie.title} </a>
    </strong>
  </div>
</li>`;
  $rankWrap.innerHTML += rankHTML; // DOM요소에 rankHTML을 삽입
});


// 2) 랭킹 카드를 클릭하면 메인 이미지, 타이틀, 바뀌기
$rankWrap.addEventListener("click", (event) => {
  const clickTarget = event.target.closest('.rankCard'); // 클릭된 타겟 id에 접근하기 위하여 타겟 지정
  const clickCardId = parseInt(clickTarget.getAttribute('movie-id')); // 클릭된 타겟의 id값 지정 (숫자로 변환 / 변환 안할 시 아래 find 실행안됨)
  const clickedRankCard = top5Movie.find(item => item.id === clickCardId); // top5Movie의 id값과 타겟의 id값 비교
  if (clickedRankCard) {
    changeCnt(clickedRankCard); // 메인보드 컨텐츠 변경하는 함수 실행
  }
});

// 클릭 시 컨텐츠 변경하는 함수 
export const changeCnt = (movie) => { // movie 배열을 매개변수로 받는 함수

  $rank_mainBoard.innerHTML = `
  <div class="rank_mainBoardImg" style="background-image: url('https://image.tmdb.org/t/p/original${movie.backdrop_path}")></div>

  <div class="mainRankCnt">
    <h1 class="mainRankTitle">${movie.title}</h1>
    <p class="mainRankOverview">
      ${movie.overview}
    </p>
    <a href="./detail.html?detail_id=${movie.id}">
      <button class="mainRankBtn">상세보기</button>
    </a>
  </div>`;


};


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
      <span class="rank_num">${movie.vote_average.toFixed(1)}</span>
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
  // $searchInput.focus();
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

// 초기 메인 화면에 컨텐츠 띄우기 
changeCnt(top5Movie[0]);