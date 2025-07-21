document.addEventListener('DOMContentLoaded', function () {
  // 要素取得
  const aboutContent = document.getElementById('about-content');
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
      introTitle.textContent = "泉の森ペットクリニック";
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

  // aboutセクションのフェードイン
  if (aboutContent) {
    const fadeInObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          aboutContent.classList.add('visible');
          fadeInObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    fadeInObserver.observe(aboutContent);
  }

  // スライドショー制御
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;
  let currentSlide = 0;

  function showSlide(index) {
      slides.forEach((slide, i) => {
          slide.classList.toggle('active', i === index);
      });
  }

  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');

  if (prev && next && slides.length > 0) {
      prev.addEventListener('click', () => {
          currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
          showSlide(currentSlide);
      });

      next.addEventListener('click', () => {
          currentSlide = (currentSlide + 1) % totalSlides;
          showSlide(currentSlide);
      });

      setInterval(() => {
          currentSlide = (currentSlide + 1) % totalSlides;
          showSlide(currentSlide);
      }, 5000); // 5秒ごとに自動スライド

      showSlide(currentSlide); // 初期表示
  }

  // スクロール処理（パララックス・ロゴフェード・ヘッダー表示）
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // パララックス
    if (heroImage) {
      heroImage.style.backgroundPositionY = `${currentScroll * 0.3}px`;
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
    } else {
      header.classList.remove('visible');
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

