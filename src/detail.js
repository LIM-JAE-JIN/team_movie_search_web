export const generateMovieDetail = async () => {
  // URL에서 쿼리 문자열을 가져옵니다
  let queryString = window.location.search;
  // URLSearchParams 객체를 사용하여 쿼리 문자열을 파싱합니다
  let searchParams = new URLSearchParams(queryString);
  // detail_id 매개변수의 값을 가져옵니다
  let detailId = parseInt(searchParams.get("detail_id"));
  // id값이 주소 detail_id와 같은 영화디테일 데이터 가져오기
  const detail = await fetchDetailData(detailId);
  // 널을 공간 id DOM
  const detailCont = document.querySelector("#detail_cont");
  console.log(detail);
  detailCont.innerHTML = `
    <figure>
      <img src="https://image.tmdb.org/t/p/w500${detail.poster_path}" alt="${detail.title} 포스트이미지" />
    </figure>
    <div class="detail_txt_cont">
      <div class="detail_tit">
        <h2>${detail.title}</h2>
        <p>${detail.original_title}, ${detail.title}, ${detail.release_date.slice(0, 4)}</p>
      </div>
      <div class="detail_cont">
        <dl class="list_cont">
          <dt>개봉</dt>
          <dd>${detail.release_date}</dd>
        </dl>
        <dl class="list_cont">
          <dt>장르</dt>
          <dd>${detail.genres.map((item) => item.name)}</dd>
        </dl>
        <dl class="list_cont">
          <dt>국가</dt>
          <dd>${detail.production_countries[0].name}</dd>
        </dl>
        <dl class="list_cont">
          <dt>평점</dt>
          <dd><span class="ico_movie ico_star"></span>${detail.vote_average.toFixed(1)}</dd>
        </dl>
        <dl class="list_cont">
          <dt>언어</dt>
          <dd>${detail.spoken_languages[0].name}</dd>
        </dl>
        <dl class="list_cont">
          <dt>러닝타임</dt>
          <dd>${detail.runtime}분</dd>
        </dl>
        <dl class="list_cont">
          <dt>줄거리</dt>
          <dd>${detail.overview ? detail.overview : "내용 없음"}</dd>
        </dl>
      </div>
    </div>
  `;
};
generateMovieDetail();

async function fetchDetailData(movie_id) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MGI2YTY4OWQ1NTMwNTAyYmQ3MmVlNjY4NWJlMDUzOCIsInN1YiI6IjY0ZmUzOGZjYzNiZmZlMDEwMTI5NDAwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WxRRqtG5TE7NPS7X8Pfn100g3ozzHAiLzN_WB8g1HS4"
    }
  };

  const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?language=ko-KR`, options);
  const data = await response.json();
  return data;
}
