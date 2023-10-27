// Dom 요소 가져오기
// 댓글
const $id_submit_btn = document.getElementById("submit_btn");
const $review_write_id = document.getElementById("review_write_id");
const $review_write_pw = document.getElementById("review_write_pw");
const $id_review_write_comment = document.getElementById("review_write_comment");

// 평균/합계
const $id_count_review = document.getElementById("review_count_review");

// 페이지 갱신 이벤트
document.addEventListener("DOMContentLoaded", function () {
  drawHtml();
});

// 현재 시간
const currentTime = () => {
  const currentDate = new Date();
  return currentDate;
}

// 버튼 클릭 이벤트 처리
$id_submit_btn.addEventListener("click", function (event) {
  // 입력 값 가져오기
  const commentId = $review_write_id.value;
  const commentPw = $review_write_pw.value;
  const commentText = $id_review_write_comment.value;
  const formattedText = commentText.replace(/\n/g, '<br>'); // 댓글 저장 시 <br>로 저장되도록 replace!

  if (commentText === "") {
    alert("댓글을 작성해주세요!");
  } else if (commentId === "") {
    alert("아이디를 입력해주세요!");
  } else if (commentPw === "") {
    alert("비밀번호를 입력해주세요!");
  } else {
    // 입력 값들 객체에 넣기
    const comment = {
      // movie_id,
      comment_id: commentId,
      comment_pw: commentPw,
      comment_comment: formattedText,
      comment_currentDate: currentTime()
    }

    // 객체를 string화 (localStorage에 저장 시 문자열로 저장되어야함)
    const serializedcomment = JSON.stringify(comment); // JSON.stringify() : JSON을 문자열로 변환(?)
    localStorage.setItem(commentId, serializedcomment); // localStorage.setItem(Key,Value) : localStorage에 Key:Value 저장

    drawHtml();
    alert("등록이 완료되었습니다.") // 수정/삭제 시에도 alert창 띄울거임
  }
});

let commentsMap;
let valuesIterator;
let sortedCommentsMap;
// html에서 review 조회하는 함수
let drawHtml = () => {
  // localStorage에 저장된 모든 값들을 불러오기
  const localStorageData = {}; // localStorage에 저장된 값들을 저장할 객체
  const localStorageKeys = Object.keys(localStorage); // Object.keys(localStorage) : localStorage에 저장된 key 값들 조회
  localStorageKeys.forEach((key) => {
    const value = localStorage.getItem(key); // localStorage에 저장된 key의 value값을 조회
    localStorageData[key] = JSON.parse(value); // JSON으로 변환 후 배열에 저장
  });

  // 객체를 Map으로 변환
  commentsMap = new Map(Object.entries(localStorageData));

  // Map을 comment_currentDate를 기준으로 정렬
  sortedCommentsMap = new Map([...commentsMap.entries()].sort((a, b) => {
    const dateA = new Date(a[1].comment_currentDate);
    const dateB = new Date(b[1].comment_currentDate);
    return dateB - dateA;
  }));

  //----- html 추가~~
  const $id_review_list = document.getElementById("review_list");


  // 모든 입력 text 초기화
  $id_review_list.innerHTML = ''; // review_comment_list(ul)의 하위 html 모두 지우기
  $id_review_write_comment.value = '';
  // $review_comment_id.value = ''; // 댓글 추가 작성 가능할 것 같아 일단 주석
  // $id_review_comment_write_text.value = ''; // 댓글 추가 작성 가능할 것 같아 일단 주석

  const countReview = Object.keys(localStorageData).length; // 댓글 수 계산
  $id_count_review.innerText = `현재 댓글 수 : ${countReview}`;

  let count = 0;
  valuesIterator = sortedCommentsMap.values(); // map의 value 값으로 배열 생성

  // 모든 댓글 추가
  for (const value of valuesIterator) {
    // valuesIterator의 행수만큼 반복 실행!
    count++;
    // const comment = sortedCommentsMap[key];
    let temp_html = `
    <li class="review_comment_wrapper">
    <div class="review_comment_box">
      <p class="review_comment_box_content">${value.comment_comment}</p>
      <div class="review_comment_box_bottom">
        <span class="review_comment_id" id="review_comment_id${count}">${value.comment_id}</span>
        <span class="review_comment_date" id="review_comment_pw${count}">${value.comment_currentDate}</span>
      </div>
    </div>
  </li>
    `;

    $id_review_list.insertAdjacentHTML('beforeend', temp_html);// @@.insertAdjacentHTML('beforeend', temp_html) : @@의 마지막 요소 뒤에 temp_html 삽입
  };
}
