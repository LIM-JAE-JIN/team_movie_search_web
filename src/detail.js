const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MGI2YTY4OWQ1NTMwNTAyYmQ3MmVlNjY4NWJlMDUzOCIsInN1YiI6IjY0ZmUzOGZjYzNiZmZlMDEwMTI5NDAwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WxRRqtG5TE7NPS7X8Pfn100g3ozzHAiLzN_WB8g1HS4"
  }
};

fetch("https://api.themoviedb.org/3/movie/238?language=en-US", options)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
