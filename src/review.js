// Dom 요소 가져오기
// 댓글
const $id_submit_btn = document.getElementById("submit_btn");
const $review_write_id = document.getElementById("review_write_id");
const $review_write_pw = document.getElementById("review_write_pw");
const $id_review_write_comment = document.getElementById("review_write_comment");
// 별점
const $star_grade_radio = document.getElementsByName("review_star_grade");
const $id_select_star_grade = document.getElementById("review_select_star_grade");
const $radio_buttons = document.querySelectorAll('input[type="radio"]');
const $id_radio_image = document.getElementById('radio_image');
// 평균/합계
const $id_count_review = document.getElementById("review_count_review");
const $id_avg_star_score = document.getElementById("review_avg_star_score");

// 페이지 갱신 이벤트
document.addEventListener("DOMContentLoaded", function () {
  drawHtml();
});

// 별점 계산
$star_grade_radio.forEach(function (radio) {
  radio.addEventListener("change", function () {
    const starScore = radio.value;
    $id_select_star_grade.innerText = starScore;
  });
});

// $radio_buttons.forEach(radioButton => {
//   radioButton.addEventListener('change', function () {
//     if (this.checked) {
//       const imageSource = this.nextElementSibling.getAttribute('data-image');
//       $id_radio_image.src = imageSource;
//     }
//   });
// });

// $star_grade_radio.forEach(function (radio) {
//   radio.addEventListener("hover", function () {
//     const starScore = radio.value;
//     $id_select_star_grade.innerText = starScore;
//   });
// });




// 현재 시간
const currentTime = () => {
  const currentDate = new Date();
  // const year = currentDate.getFullYear();
  // const month = currentDate.getMonth() + 1; // 월은 0부터 시작하므로 +1
  // const day = currentDate.getDate();
  // const hours = currentDate.getHours();
  // const minutes = currentDate.getMinutes();
  // const seconds = currentDate.getSeconds();
  // return `(${year}.${month}.${day}   ${hours}:${minutes}:${seconds})` // 데이터 활용할 일 없으므로 텍스트로 저장해버림!!!
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
    let starScore;
    for (const radio of $star_grade_radio) {
      if (radio.checked) {
        starScore = radio.value;
        break;
      }
    }

    // 입력 값들 객체에 넣기
    const comment = {
      // movie_id,
      comment_id: commentId,
      comment_pw: commentPw,
      comment_star_score: starScore,
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

// html에서 review 조회하는 함수
let drawHtml = () => {
  // localStorage에 저장된 모든 값들을 불러오기
  const localStorageData = {}; // localStorage에 저장된 값들을 저장할 객체
  const localStorageKeys = Object.keys(localStorage); // Object.keys(localStorage) : localStorage에 저장된 key 값들 조회
  localStorageKeys.forEach((key) => {
    const value = localStorage.getItem(key); // localStorage에 저장된 key의 value값을 조회
    localStorageData[key] = JSON.parse(value); // JSON으로 변환 후 배열에 저장
  });

  // 객체를 배열로 변환해서 정렬하고 다시 배열을 객체로 변환하면!!!!
  // 객체에서는 정렬이.. 풀려버려....
  // 배열을 Map으로 바꿔서 써야만.. 하는 것일까...??
  // // 객체를 배열로 변환하여 comment_currentDate를 기준으로 정렬
  // const sortedComments = Object.entries(localStorageData).sort((a, b) => {
  //   const dateA = new Date(a[1].comment_currentDate);
  //   const dateB = new Date(b[1].comment_currentDate);
  //   return dateA - dateB;
  // });

  // console.log(sortedComments);

  // // 정렬된 배열을 다시 객체로 변환
  // const sortedlocalStorageData = {};
  // sortedComments.forEach(([key, value]) => {
  //   sortedlocalStorageData[key] = value;
  // });

  // console.log(sortedlocalStorageData);

  // 객체를 Map으로 변환
  const commentsMap = new Map(Object.entries(localStorageData));

  // Map을 comment_currentDate를 기준으로 정렬
  const sortedCommentsMap = new Map([...commentsMap.entries()].sort((a, b) => {
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
  $id_count_review.innerText = `(${countReview}명)`;

  let countStarScore = 0;
  let count = 0;
  const valuesIterator = sortedCommentsMap.values(); // map의 value 값으로 배열 생성

  // 모든 댓글 추가
  for (const value of valuesIterator) {
    // valuesIterator의 행수만큼 반복 실행!
    count++;
    // const comment = sortedCommentsMap[key];
    let temp_html = `
    <li class="review_comment_wrapper">
    <div class="review_comment_box">
      <div class="review_comment_box_header">
        <div class="star_grade">별점 : ${value.comment_star_score}</div>
        <div class="review_edit_wrapper" >
          <button class="review_edit_btn" data-target="review_modal_edit${count}">
            <img src="./contents/review_btn.png" alt="Button Icon" />
          </button>
          <div class="review_edit_btn_wrapper" id="review_modal_edit${count}">
            <button class="review_modal_edit_btn" id="review_edit_btn1${count}" data-target="review_etc_modal${count}"> 수정하기 </button>
            <button class="review_modal_delete_btn" id="review_delete_btn1${count}"> 삭제하기 </button>
            <div class="review_modal_etc" id="review_etc_modal${count}" >
              <span>아이디</span><input id="review_edit_id${count}" class="review_etc_input" /> 
              <span>비밀번호</span><input type="password" id="review_edit_pw${count}" class="review_etc_input" />
              <button id="submit_btn${count}" class="submit_btn" type="button">등록</button>
            </div>
          </div>
        </div>
      </div>
      <p class="review_comment_box_content">${value.comment_comment}</p>
      <div class="review_comment_box_bottom">
        <span class="review_comment_id"></span>
        <span class="review_comment_id">${value.comment_id}</span>
        <span class="review_comment_date">${value.comment_currentDate}</span>
      </div>
    </div>
  </li>
    `;

    $id_review_list.insertAdjacentHTML('beforeend', temp_html);// @@.insertAdjacentHTML('beforeend', temp_html) : @@의 마지막 요소 뒤에 temp_html 삽입
    countStarScore += Number(value.comment_star_score);
  };
  $id_avg_star_score.innerText = `${(countStarScore / countReview).toFixed(1)}점`;
}

document.addEventListener("DOMContentLoaded", function () {
  const $edit_btn = document.querySelectorAll('.review_edit_btn');

  $edit_btn.forEach((button) => {
    button.addEventListener("click", () => {
      console.log("... 버튼이 클릭되었습니다.");
      const target = button.getAttribute("data-target");
      const modal = document.getElementById(target);

      if (modal.style.display === "none" || modal.style.display === "") {
        modal.style.display = "block"; // 표시
      } else {
        modal.style.display = "none"; // 숨김
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const $modal_edit_btn = document.querySelectorAll('.review_modal_edit_btn');

  $modal_edit_btn.forEach((button) => {
    button.addEventListener("click", () => {
      console.log("버튼이 클릭되었습니다.");
      const target = button.getAttribute("data-target");
      const modal = document.getElementById(target);


      if (modal.style.display === "none" || modal.style.display === "") {
        modal.style.display = "block"; // 표시
      } else {
        modal.style.display = "none"; // 숨김
      }
    }
    );
  });
});