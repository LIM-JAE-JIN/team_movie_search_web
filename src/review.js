// Dom 요소 가져오기
const $id_submit_btn = document.getElementById("submit_btn");
const $review_reply_id = document.getElementById("review_reply_id");
const $review_reply_pw = document.getElementById("review_reply_pw");
const $id_review_reply_write_text = document.getElementById("review_reply_write_text");
const $star_grade_radio = document.getElementsByName("star_grade");
const $id_select_star_grade = document.getElementById("select_star_grade");
const $id_count_review = document.getElementById("count_review");
const $id_avg_star_score = document.getElementById("avg_star_score");



// 별점 계산
$star_grade_radio.forEach(function (radio) {
  radio.addEventListener("change", function () {
    const starScore = radio.value;
    $id_select_star_grade.innerText = starScore;
  });
});

// 현재 시간
const currentTime = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // 월은 0부터 시작하므로 +1
  const day = currentDate.getDate();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();
  return `(${year}.${month}.${day}   ${hours}:${minutes}:${seconds})` // 데이터 활용할 일 없으므로 텍스트로 저장해버림!!!
}

// 버튼 클릭 이벤트 처리
$id_submit_btn.addEventListener("click", function (event) {
  // 입력 값 가져오기
  const replyId = $review_reply_id.value;
  const replyPw = $review_reply_pw.value;
  const replytText = $id_review_reply_write_text.value;
  const formattedText = replytText.replace(/\n/g, '<br>'); // 댓글 저장 시 <br>로 저장되도록 replace!

  if (replytText === "") {
    alert("댓글을 작성해주세요!");
  } else if (replyId === "") {
    alert("아이디를 입력해주세요!");
  } else if (replyPw === "") {
    alert("비밀번호를 입력해주세요!");
  }
  else {
    let starScore;
    for (const radio of $star_grade_radio) {
      if (radio.checked) {
        starScore = radio.value;
        break;
      }
    }

    // 입력 값들 객체에 넣기
    const reply = {
      // movie_id,
      reply_id: replyId,
      reply_pw: replyPw,
      reply_star_score: starScore,
      reply_comment: formattedText,
      reply_currentDate: currentTime()
    }

    // 객체를 string화 (localStorage에 저장 시 문자열로 저장되어야함)
    const serializedReply = JSON.stringify(reply); // JSON.stringify() : JSON을 문자열로 변환(?)
    localStorage.setItem(replyId, serializedReply); // localStorage.setItem(Key,Value) : localStorage에 Key:Value 저장

    drawHtml();
    alert("등록이 완료되었습니다.") // 수정/삭제 시에도 alert창 띄울거임
  }
});

// html에서 review 조회하는 함수
let drawHtml = () => {
  // localStorage에 저장된 모든 값들을 불러오기
  const localStorageData = {}; // localStorage에 저장된 값들을 저장할 객체
  const localStorageKeys = Object.keys(localStorage); // Object.keys(localStorage) : localStorage에 저장된 key 값들 조회
  localStorageKeys.forEach((key) => {
    const value = localStorage.getItem(key); // localStorage에 저장된 key의 value값을 조회
    localStorageData[key] = JSON.parse(value); // JSON으로 변환 후 배열에 저장
  });


  //----- html 추가~~
  const $id_review_reply_list = document.getElementById("review_reply_list"); // reply list

  // 모든 입력 text 초기화
  $id_review_reply_list.innerHTML = ''; // review_reply_list(ul)의 하위 html 모두 지우기
  $id_review_reply_write_text.value = '';
  // $review_reply_id.value = ''; // 댓글 추가 작성 가능할 것 같아 일단 주석
  // $id_review_reply_write_text.value = ''; // 댓글 추가 작성 가능할 것 같아 일단 주석


  const countReview = Object.keys(localStorageData).length; // 댓글 수 계산
  $id_count_review.innerText = `(${countReview}명)`;

  let countStarScore = 0;
  // 모든 댓글 추가
  for (const key in localStorageData) {
    // localStorageData의 행수만큼 반복 실행!
    let temp_html = `
    <li class="review_reply_container">
      <div class="review_reply_box">
        <div class="review_reply_box_header">
          <div class="ratings rating_10">별점 : ${localStorageData[key].reply_star_score}</div>
          <button class="edit_btn">...</button>
        </div>
        <p class="review_review_content">${localStorageData[key].reply_comment}</p>
        <span class="review_reply_id">댓글 작성자 : </span><span class="review_reply_id">${localStorageData[key].reply_id}</span>
        <span class="review_reply_date">${localStorageData[key].reply_currentDate}</span>
      </div>
    </li>
    `;
    $id_review_reply_list.insertAdjacentHTML('beforeend', temp_html);// @@.insertAdjacentHTML('beforeend', temp_html) : @@의 마지막 요소 뒤에 temp_html 삽입
    countStarScore += Number(localStorageData[key].reply_star_score);
  };
  $id_avg_star_score.innerText = `${(countStarScore / countReview).toFixed(1)} 점`;
}

// export { };
// 선언된 너네 나가서 다른 파일에서 쓰이거라!!?
