export const generateMovieCards = async () => {
  const movies = await fetchMovieData();

  const cardList = document.querySelector("#card_wrapAllList");
  cardList.innerHTML = movies
    .map(
      (movie) => `
            <li class="card_li">
            <div class="card_poster">
              <a href="#" class="card_thumb_item">
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
              <a half="">${movie.title}</a>
            </strong>
          </div>
          </li>`
    )
    .join("");
};

async function fetchMovieData() {
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

generateMovieCards();
