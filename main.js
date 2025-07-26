document.addEventListener('DOMContentLoaded', function () {
  // 要素取得
  const header = document.querySelector('.site-header');
  const hamburger = document.querySelector('.hamburger');
  const heroLogo = document.querySelector('.hero-logo');
  const heroImage = document.querySelector('.hero-img');
  const introScreen = document.getElementById('intro-screen');
  const introTitle = document.getElementById("intro-title");
  const globalNav = document.querySelector('.global-nav');
  const closeBtn = document.getElementById('closeMenu');

  if (hamburger) {
    hamburger.setAttribute('aria-expanded', 'false');
  }

  // ✅ フェードアウト処理はこの中で直接書く
  if (introScreen) {
    // 日本語タイトルを設定
    if (introTitle) {
      introTitle.innerHTML = "泉の森<wbr>ペットクリニック";
    }

    setTimeout(() => {
      introScreen.style.transition = 'opacity 1s ease';
      introScreen.style.opacity = '0';

      setTimeout(() => {
        introScreen.style.display = 'none';
      }, 1000); // フェード時間
    }, 4000); // 表示時間
  }

  // ここに他の処理（アニメーション再適用など）を追加可能
  // hero画像のズームアニメーション
  if (heroImage) {
    heroImage.style.animation = 'zoomHero 6s ease forwards';
  }

    // スライダー制御
    const slides = document.querySelectorAll('.slider-container .slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
  
    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }
  
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        currentSlide = i;
        showSlide(currentSlide);
      });
    });
  
    setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }, 5000); // 5秒ごとに自動切り替え
  
    showSlide(currentSlide);
  
  // スクロール処理（パララックス・ロゴフェード・ヘッダー表示）
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // パララックス
    if (heroImage) {
      const offset = Math.min(currentScroll * 0.1, 150); // 最大100pxまで移動
      heroImage.style.objectPosition = `center calc(70% - ${offset}px)`;
    }

    // ロゴフェード
    if (heroLogo) {
      const maxFade = 100;
      const opacity = Math.max(0, 1 - currentScroll / maxFade);
      heroLogo.style.opacity = opacity;
    }

    // ヘッダー表示制御
    if (currentScroll > 50) {
      header.classList.add('visible');
      const logoSub = document.querySelector('.logo-sub'); // 英語部分の要素を取得
      if (logoSub) {
        logoSub.style.opacity = '1'; // 英語部分を表示
      }
    } else {
      header.classList.remove('visible');
      const logoSub = document.querySelector('.logo-sub'); // 英語部分の要素を取得
      if (logoSub) {
        logoSub.style.opacity = '0'; // 英語部分を非表示
      }
    }
  });

  // ハンバーガーメニューとグローバルナビの連動
  if (hamburger && globalNav) {
      hamburger.addEventListener('click', () => {
        const isOpen = hamburger.classList.toggle('open');
          globalNav.classList.toggle('open');
          hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
  }

  if (closeBtn) {
      closeBtn.addEventListener('click', () => {
          hamburger.classList.remove('open');
          globalNav.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
      });
  }

});

