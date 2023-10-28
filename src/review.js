//// Dom 요소 가져오기
// 댓글
const $id_review_list = document.getElementById("review_list");
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

// 영화 아이디 가져오기
// URL에서 쿼리 문자열을 가져옵니다
let queryString = window.location.search;
// URLSearchParams 객체를 사용하여 쿼리 문자열을 파싱합니다
let searchParams = new URLSearchParams(queryString);
// detail_id 매개변수의 값을 가져옵니다
let myMovieId = parseInt(searchParams.get("detail_id"));
console.log(myMovieId)

// 전역변수
let commentsMap;
let valuesIterator;
let sortedCommentsMap;
let localStorageData;
let count;
let countStarScore;
let edit_stats;
let target;
let target_num;

// Dom요소 조회 후 실행되는 이벤트
document.addEventListener("DOMContentLoaded", function () {
  drawHtml(); // 
  savelocalStroage(); // submit 버튼 클릭 시
  toggleEditBtn();
  toggleEditModal();
  deleteReview();
});

// 별점 계산
$star_grade_radio.forEach(function (radio) {
  radio.addEventListener("change", function () {
    const starScore = radio.value;
    $id_select_star_grade.innerText = starScore;
  });
});

// 저장 시간 조회
const currentTime = () => {
  const currentDate = new Date();
  return currentDate;
}

// 저장 시간 형식 변환
const formattedTime = (originalDate) => {
  const date = new Date(originalDate);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  const formattedDate = `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
  return formattedDate;
}

// localStroage 데이터 저장
const savelocalStroage = () => {
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
        movie_id: myMovieId,
        comment_num: `${myMovieId}_${count + 1}`,
        comment_id: commentId,
        comment_pw: commentPw,
        comment_star_score: starScore,
        comment_comment: formattedText,
        comment_currentDate: currentTime()
      }

      // 객체를 string화 (localStorage에 저장 시 문자열로 저장되어야함)
      const serializedcomment = JSON.stringify(comment); // JSON.stringify() : JSON을 문자열로 변환(?)
      localStorage.setItem(`${myMovieId}_${count + 1}`, serializedcomment); // localStorage.setItem(Key,Value) : localStorage에 Key:Value 저장

      drawHtml();
      alert("등록이 완료되었습니다.") // 수정/삭제 시에도 alert창 띄울거임
    }
  })
};

// localStroage 데이터 조회
const loadLocalStorage = () => {
  // localStorage에 저장된 모든 값들을 불러오기
  localStorageData = {}; // localStorage에 저장된 값들을 저장할 객체
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
}

// html에서 review 조회
let drawHtml = () => {
  loadLocalStorage(); // localStroage 데이터 조회
  //----- html 추가~~
  // input value 초기화
  $id_review_list.innerHTML = ''; // review_comment_list(ul)의 하위 html 모두 지우기
  $id_review_write_comment.value = '';

  countStarScore = 0;
  count = 0;
  valuesIterator = sortedCommentsMap.values(); // map의 value 값으로 배열 생성

  // 모든 댓글 추가
  for (const value of valuesIterator) {
    if (value.movie_id === myMovieId) {
      // valuesIterator의 행수만큼 반복 실행!
      count++;
      const originalDate = value.comment_currentDate;

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
              <button class="review_modal_delete_btn" id="review_delete_btn1${count}" data-target="review_etc_modal${count}"> 삭제하기 </button>
            </div>
            <div class="review_modal_etc" id="review_etc_modal${count}" >
                <span>비밀번호</span><input type="password" id="review_edit_pw${count}" class="review_etc_input" />
                <button id="submit_btn${count}" class="submit_btn" type="button">확인</button>
              </div>
          </div>
        </div>
        <p class="review_comment_text">${value.comment_comment}</p>
          <div class="review_comment_box_bottom">
            <span class="review_comment_id" id="review_comment_id${count}">${value.comment_id}</span>
            <span class="review_comment_date" id="review_comment_pw${count}">(${formattedTime(originalDate)})</span>
          </div>
        </div>
      </li>
      `;

      $id_review_list.insertAdjacentHTML('beforeend', temp_html);// @@.insertAdjacentHTML('beforeend', temp_html) : @@의 마지막 요소 뒤에 temp_html 삽입
      countStarScore += Number(value.comment_star_score);
    }
  };

  countReview(count, countStarScore);  // 댓글 수 조회
}

// 댓글 수 조회
const countReview = (count, countStarScore) => {
  $id_count_review.innerText = `(${count}명)`;
  if (count === 0) {
    // 댓글이 없을 경우
    let temp_html = `
      <div class="reivew_count_zero">첫 리뷰를 남겨주세요😁</div>
      `
    $id_review_list.insertAdjacentHTML('beforeend', temp_html);

    $id_avg_star_score.innerText = `측정 전`;
  }
  else {
    $id_avg_star_score.innerText = `${(countStarScore / count).toFixed(1)}점`;
  }
}

// 댓글 삭제 버튼 토글
const toggleEditBtn = () => {
  const $edit_btn = document.querySelectorAll('.review_edit_btn');
  $edit_btn.forEach((button) => {
    button.addEventListener("click", () => {
      console.log("... 버튼이 클릭되었습니다.");
      const target = button.getAttribute("data-target");
      const modal = document.getElementById(target);

      // edit
      if (modal.style.display === "none" || modal.style.display === "") {
        modal.style.display = "block"; // 표시
      } else {
        modal.style.display = "none"; // 숨김
      }

      // 계정 입력 modal 숨김
      const target_btn = target.replace("review_modal_edit", "review_etc_modal");
      const $review_edit_btn = document.getElementById(target_btn);
      $review_edit_btn.style.display = "none";
    });
  });
}

// 댓글 삭제 modal 토글
const toggleEditModal = () => {
  const $modal_edit_btn = document.querySelectorAll('.review_modal_delete_btn');

  $modal_edit_btn.forEach((button) => {
    button.addEventListener("click", () => {
      console.log("삭제하기 버튼이 클릭되었습니다.");
      target = button.getAttribute("data-target");
      target_num = target.slice(-1);
      // 의 id 조회한 후 숨기기
      const modal = document.getElementById(target);
      modal.style.display = "block";
      // 편집 modal의 id 조회한 후 숨기기
      const target_btn = target.replace("review_etc_modal", "review_modal_edit");
      const $review_edit_btn = document.getElementById(target_btn);
      $review_edit_btn.style.display = "none";

      edit_stats = "delete";
    });
  });
}

// 댓글 삭제 
const deleteReview = () => {
  const $buttons = document.querySelectorAll('.submit_btn');

  $buttons.forEach((button) => {
    button.addEventListener("click", () => {
      // 선택한 댓글의 key값 가져오기
      const selectKey = sortedCommentsMap[0];
      console.log(selectKey);

      // 선택한 댓글의 비밀번호 가져오기
      const selectValue = [...commentsMap.values()][target_num].comment_pw;
      console.log(selectValue);

      // 작성한 비밀번호 가져오기
      const target_pw = target.replace("review_etc_modal", "review_edit_pw");
      const $review_edit_pw = document.getElementById(target_pw);
      const input_edit_pw = $review_edit_pw.value
      console.log(input_edit_pw);

      if (selectValue != input_edit_pw) {
        console.log("비밀번호가 다르잖습니까!!");
      } else {
        // 삭제일 때
        console.log("삭제 버튼이 클릭되었습니다.");
        // localStorage.removeItem('key');
      }
    });
  });
}
