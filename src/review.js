// 버튼 요소와 textarea 요소 가져오기
const $id_submit_btn = document.getElementById("submit_btn");
const $review_reply_write_text = document.getElementById("review_reply_write_text");

// 버튼 클릭 이벤트 처리
$id_submit_btn.addEventListener("click", function (event) {
  // textarea의 값을 가져오기
  const replytText = $review_reply_write_text.value;
  // 가져온 댓글 내용을 출력 또는 원하는 작업 수행
  console.log(replytText);
});
