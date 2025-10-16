const searchForm = document.querySelector('.search');
const searchBtn = document.querySelector('.search input[type="button"]');
searchBtn.addEventListener('click', () => {
    searchForm.classList.toggle('active');
});


const swiperCat = new Swiper('.cat-slider', {
  // Optional parameters
  initialSlide: 1,
  loop: true,
  spaceBetween: 30,
  grabCursor: true,
  // If we need pagination
  pagination: {
    el: '.cat-slider__pagination',
    clickable: true,
  },
  // Navigation arrows
  navigation: {
    nextEl: '.cat-slider__next',
    prevEl: '.cat-slider__prev',
  },
    breakpoints: {
    320: {
    slidesPerView: 'auto',      // ширина задаётся в CSS
    centeredSlides: true,
    spaceBetween: -10,
    },
    924: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
    1280: {
      slidesPerView: 5,
    }
  }
});
if(swiperCat){
  swiperCat.on('slideChange', () => {
  let slidesPerView = 5;
  slidesPerView = swiperCat.passedParams.breakpoints[1280].slidesPerView;
    const slidesCount = swiperCat.slides.length;
    const activeIndex = swiperCat.realIndex;
    const fifthIndex = (activeIndex + slidesPerView - 1) % slidesCount;
    const fourthIndex = (activeIndex + slidesPerView - 2) % slidesCount;
    swiperCat.slides.forEach(slide => slide.classList.remove('swiper-slide-blur'));
  if(window.innerWidth < 924){
    const prevIndex = (activeIndex - 1 + slidesCount) % slidesCount;
    const nextIndex = (activeIndex + 1) % slidesCount;
    slidesPerView = 3; 
      swiperCat.slides.forEach(slide => {
      const idx = Number(slide.dataset.swiperSlideIndex);
      if (idx === prevIndex || idx === nextIndex) {
        slide.classList.add('swiper-slide-blur');
      }
    });
    } else if(window.innerWidth < 1280){
      swiperCat.slides.forEach(slide => {
        const idx = Number(slide.dataset.swiperSlideIndex);
        if (idx === activeIndex|| idx === fourthIndex) {
          slide.classList.add('swiper-slide-blur');
        }
      });
    } else {
      swiperCat.slides.forEach(slide => {
        const idx = Number(slide.dataset.swiperSlideIndex);
        if (idx === activeIndex || idx === fifthIndex) {
          slide.classList.add('swiper-slide-blur');
        }
      });
    }
  });
}

const poolSlider = new Swiper('.popular-slider', {
  slidesPerView: 1,
  loop: true,
  navigation: {
    nextEl: '.popular-slider__next',
    prevEl: '.popular-slider__prev',
  },
    pagination: {
    el: '.popular-slider__pagination',
    clickable: true,
  },
  breakpoints: {
    620: {
      slidesPerView: 1.5,
    },
    840: {
      slidesPerView: 2,
    },
    1280: {
      slidesPerView: 3,
    }
  }
})

const blogSlider = new Swiper('.blog-slider', {
  loop: true,
  spaceBetween: 10,
    navigation: {
    nextEl: '.blog-slider__next',
    prevEl: '.blog-slider__prev',
  },
  pagination: {
    el: '.blog-slider__pagination',
    clickable: true,
  },
    breakpoints: {
    840: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    1340: {
      slidesPerView: 3,
      spaceBetween: 40,
    }
  }
})
const reviewsSlider = new Swiper('.reviews__slider', {
  slidesPerView: 'auto',
  spaceBetween: 10,
  navigation: {
  nextEl: '.reviews__slider--next',
  prevEl: '.reviews__slider--prev',
  },
  pagination: {
    el: '.reviews-slider__pagination',
    clickable: true,
  },
    breakpoints: {
    840: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    1340: {
      slidesPerView: 3,
      spaceBetween: 40,
    }
  }
})
const partnersSlider = new Swiper('.partners__slider', {
  loop: true,
  breakpoints: {
    320:{
  slidesPerView: 'auto',
    spaceBetween: 20,
    centeredSlides: true
        },
    560:{
      spaceBetween: 40,
      slidesPerView: 4,
    },
    840: {
      spaceBetween: 54,
      slidesPerView: 6,
    },
  }
})
// ============ HEART LIKE ==============

const poolItems = document.querySelectorAll('.pool-card');

if(poolItems.length > 0){
// Ключ для localStorage
const FAVORITES_KEY = 'favoritePools';

// Получаем избранные из localStorage (если есть)
let favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];

// Обновляем визуально (если в избранном)
poolItems.forEach(el => {
  const poolName = el.dataset.pool;
  if (favorites.includes(poolName)) {
    el.classList.add('favorites');
  }

  const poolHeart = el.querySelector('.pool-card__address--heart');
  poolHeart.addEventListener('click', () => {
    el.classList.toggle('favorites');

    if (el.classList.contains('favorites')) {
      // Добавляем в избранное
      if (!favorites.includes(poolName)) {
        favorites.push(poolName);
      }
    } else {
      // Удаляем из избранного
      favorites = favorites.filter(name => name !== poolName);
    }

    // Обновляем localStorage
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  });
});
}


