document.addEventListener('DOMContentLoaded', function () {
    // 要素取得
    const aboutContent = document.getElementById('about-content');
    const header = document.querySelector('.site-header');
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    const heroLogo = document.querySelector('.hero-logo');
    const heroImage = document.querySelector('.hero-img');
    const introScreen = document.getElementById('intro-screen');
    const introTitle = document.getElementById("intro-title");
    const globalNav = document.querySelector('.global-nav');
    const closeBtn = document.getElementById('closeMenu');

    // タイピングアニメーション
    const titleText = "泉の森ペットクリニック";
    let i = 0;
    function typeWriter() {
      if (i < titleText.length) {
        introTitle.textContent += titleText.charAt(i);
        i++;
        setTimeout(typeWriter, 120);
      }
    }
    typeWriter();

    // introフェードアウト
    if (introScreen) {
      setTimeout(() => {
        introScreen.style.transition = 'opacity 1s ease';
        introScreen.style.opacity = '0';
        setTimeout(() => {
          introScreen.style.display = 'none';
        }, 3000);
      }, 3000);
    }

    // hero画像のズームアニメーション
    if (heroImage) {
      heroImage.style.animation = 'zoomHero 6s ease forwards';
    }

    // ハンバーガーメニュー開閉
    if (hamburger && navList) {
      hamburger.addEventListener('click', () => {
        const isOpen = hamburger.classList.toggle('open');
        globalNav.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
      
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
      const heroHeight = heroImage?.offsetHeight || 600;

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
      if (currentScroll > heroHeight - 50 || currentScroll > 100) {
        header.classList.add('visible');
        header.style.opacity = '1';
        header.style.transition = 'opacity 0.6s ease';
      } else {
        header.classList.remove('visible');
        header.style.opacity = '0';
        header.style.transition = 'opacity 0.6s ease';
      }
    });

    // ハンバーガーメニューとグローバルナビの連動
    if (hamburger && globalNav) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            globalNav.classList.toggle('open');
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            hamburger.classList.remove('open');
            globalNav.classList.remove('open');
        });
    }

    // ハンバーガーメニューのふわっと表示
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            hamburger.classList.add('visible');
        } else {
            hamburger.classList.remove('visible');
        }
    });
  });

