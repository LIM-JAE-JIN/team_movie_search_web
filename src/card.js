//swiper 기본설정
var swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  effect: "fade",
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  }
});

var swiper2 = new Swiper2(".mySwiper2", {
  slidesPerView: 1,
  spaceBetween: 10,
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },
  breakpoints: {
    "@0.00": {
      slidesPerView: 1,
      spaceBetween: 10
    },
    "@0.75": {
      slidesPerView: 2,
      spaceBetween: 20
    },
    "@1.00": {
      slidesPerView: 3,
      spaceBetween: 40
    },
    "@1.50": {
      slidesPerView: 4,
      spaceBetween: 50
    }
  }
});
