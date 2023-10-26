// 더보기 사용을 위한 moreview 카운트 선언 가져가야함
export let currentCount = 0;
export let loadCount = 5;
export let loadMoreButton = document.getElementById("loadMore");

// 카드 뿌리기 함수 = 가져가야함
export const generateMovieCards = async () => {
  const movies = await fetchMovieData();
  let loadMoreButton = document.getElementById("loadMore");
  let nextMovies = movies.slice(0, currentCount + loadCount); // 0~5번까지
  const cardList = document.querySelector("#card_wrapAllList");
  cardList.innerHTML = nextMovies
    .map(
      (movie) => `
            <li class="card_li">
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
    )
    .join("");
  currentCount = nextMovies.length; // 현재 length를 currentCount로 치환
  console.log(currentCount);

  // 모든 카드가 표시되었다면 더 보기 버튼 숨기기
  if (currentCount >= movies.length) {
    loadMoreButton.style.display = "none";
  };
};

// 더보기 함수를 위한 이벤트리스너
loadMoreButton.addEventListener("click", generateMovieCards);

export async function fetchMovieData() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiY2U4ODA3ZDNkNGUyZTVhY2IxYzk5Mzc2OWQ5N2E3OSIsInN1YiI6IjY1MmYzNjZhYTgwMjM2MDEzNzY4OWE2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GNyZMpov_2bKO1zPaS3oSUpaq9_6gzs1ULOjbuB1vds"
    }
  };

  const response = await fetch("https://api.themoviedb.org/3/movie/upcoming?language=ko-KR&page=1", options);
  const data = await response.json();
  return data.results;
}
