document.addEventListener('DOMContentLoaded', () => {
  // Sticky Header logic
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    // The top banner is around 30-40px. 
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- About Video play/pause toggle ---
  const aboutVideo = document.getElementById('about-video');
  const aboutPlayBtn = document.getElementById('about-play-btn');
  if (aboutVideo && aboutPlayBtn) {
    aboutPlayBtn.addEventListener('click', () => {
      if (aboutVideo.paused) {
        aboutVideo.play();
        aboutPlayBtn.style.display = 'none';
      } else {
        aboutVideo.pause();
        aboutPlayBtn.style.display = 'flex';
      }
    });
    aboutVideo.addEventListener('click', () => aboutPlayBtn.click());
  }

  // Simple carousel dot interaction for general dots (if any left)
  const dots = document.querySelectorAll('.dot:not(.review-dots .dot)');
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      dots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
    });
  });

  // --- Travel Stories Reviews Carousel Logic ---
  const reviewsData = [
    {
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop",
      caption: "Leh - Ladakh",
      location: "Ladakh",
      title: "An unforgettable Himalayan adventure",
      text: "Our trip through Leh, Nubra Valley and Pangong Tso was beyond anything we imagined. The drivers knew every mountain pass by heart and the homestays were warm and welcoming. CTAtravels handled the high-altitude logistics perfectly — we never had to worry about a thing.",
      name: "Priya S.",
      details: "IN (CTAtravels India)"
    },
    {
      image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=800&auto=format&fit=crop",
      caption: "Srinagar - Kashmir",
      location: "Kashmir",
      title: "Paradise on Earth, truly",
      text: "Staying on a houseboat on Dal Lake and waking up to the snow-capped mountains was magical. The shikara rides, the gardens and the local Kashmiri hospitality made this the best trip of our lives. Everything was arranged flawlessly from start to finish.",
      name: "Rohan & Meera",
      details: "IN (CTAtravels India)"
    },
    {
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop",
      caption: "Manali - Himachal Pradesh",
      location: "Himachal Pradesh",
      title: "Breathtaking mountains and warm hospitality",
      text: "From the pine forests of Manali to the high passes near Spiti, every day brought a new view worth stopping for. Our guide made sure the pace was comfortable for the whole group. CTAtravels' attention to detail made this trip completely stress-free.",
      name: "Arjun K.",
      details: "IN (CTAtravels India)"
    }
  ];
  
  let currentReview = 0;
  const reviewCard = document.querySelector('.review-card');
  const reviewImage = document.querySelector('.review-image');
  const reviewCaption = document.querySelector('.review-image-caption');
  const reviewLocation = document.querySelector('.review-location span');
  const reviewTitle = document.querySelector('.review-title');
  const reviewText = document.querySelector('.review-text');
  const reviewerName = document.querySelector('.reviewer-name');
  const reviewerDetails = document.querySelector('.reviewer-details');
  const prevBtn = document.querySelector('.reviews-carousel-wrapper .dark-arrow[aria-label="Previous review"]');
  const nextBtn = document.querySelector('.reviews-carousel-wrapper .dark-arrow[aria-label="Next review"]');
  const reviewDots = document.querySelectorAll('.review-dots .dot');

  function updateReview(index) {
    if(!reviewImage) return;
    
    const data = reviewsData[index];
    
    // Simple fade out/in effect
    reviewCard.style.opacity = '0';
    
    setTimeout(() => {
      reviewImage.src = data.image;
      reviewCaption.textContent = data.caption;
      reviewLocation.textContent = data.location;
      reviewTitle.textContent = data.title;
      reviewText.textContent = data.text;
      reviewerName.textContent = data.name;
      reviewerDetails.textContent = data.details;
      
      // Update dots
      reviewDots.forEach(d => d.classList.remove('active'));
      if(reviewDots[index]) {
        reviewDots[index].classList.add('active');
      }
      
      reviewCard.style.opacity = '1';
    }, 300);
  }

  if (prevBtn && nextBtn && reviewCard) {
    reviewCard.style.transition = 'opacity 0.3s ease';
    
    prevBtn.addEventListener('click', () => {
      currentReview = (currentReview - 1 + reviewsData.length) % reviewsData.length;
      updateReview(currentReview);
    });
    
    nextBtn.addEventListener('click', () => {
      currentReview = (currentReview + 1) % reviewsData.length;
      updateReview(currentReview);
    });
    
    reviewDots.forEach((dot, index) => {
      if(index < reviewsData.length) {
        dot.addEventListener('click', () => {
          currentReview = index;
          updateReview(currentReview);
        });
      } else {
        // Hide extra dots if we don't have enough data for them
        dot.style.display = 'none';
      }
    });
  }

  // --- Swipe support for the reviews carousel (mobile) ---
  if (reviewCard) {
    let reviewTouchStartX = 0;
    let reviewTouchEndX = 0;

    reviewCard.addEventListener('pointerdown', (e) => {
      if (e.target.closest('button') || e.target.closest('a')) return;
      reviewTouchStartX = e.clientX;
      reviewTouchEndX = e.clientX;
    });

    reviewCard.addEventListener('pointermove', (e) => {
      if (reviewTouchStartX) reviewTouchEndX = e.clientX;
    });

    reviewCard.addEventListener('pointerup', () => {
      const diff = reviewTouchEndX - reviewTouchStartX;
      reviewTouchStartX = 0;

      if (Math.abs(diff) < 50) return; // ignore small taps/drags

      if (diff < 0) {
        currentReview = (currentReview + 1) % reviewsData.length;
      } else {
        currentReview = (currentReview - 1 + reviewsData.length) % reviewsData.length;
      }
      updateReview(currentReview);
    });
  }

  // --- Tour Tabs Logic ---
  const toursData = {
    personal: [
      {
        image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=600&auto=format&fit=crop",
        title: "Solo Trek: Hampta Pass",
        subtitle: "Himachal Pradesh in 7 Days",
        priceFrom: "₹899",
        priceOriginal: "₹1,199",
        discount: "25% off"
      },
      {
        image: "https://images.unsplash.com/photo-1571401835393-8c5f35328320?q=80&w=600&auto=format&fit=crop",
        title: "Leh Ladakh Self-Drive Expedition",
        subtitle: "Ladakh in 10 Days",
        priceFrom: "₹1,599",
        priceOriginal: "₹2,199",
        discount: "27% off"
      },
      {
        image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=600&auto=format&fit=crop",
        title: "Kashmir Solo Photography Tour",
        subtitle: "Kashmir in 6 Days",
        priceFrom: "₹749",
        priceOriginal: "₹999",
        discount: "25% off"
      },
      {
        image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=600&auto=format&fit=crop",
        title: "Spiti Valley Backpacking",
        subtitle: "Himachal Pradesh in 9 Days",
        priceFrom: "₹999",
        priceOriginal: "₹1,399",
        discount: "29% off"
      }
    ],
    group: [
      {
        image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=600&auto=format&fit=crop",
        title: "Golden Triangle of Ladakh: Leh–Nubra–Pangong",
        subtitle: "Ladakh in 8 Days",
        priceFrom: "₹1,099",
        priceOriginal: "₹1,599",
        discount: "31% off"
      },
      {
        image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=600&auto=format&fit=crop",
        title: "Kashmir Group Expedition: Srinagar & Gulmarg",
        subtitle: "Kashmir in 7 Days",
        priceFrom: "₹949",
        priceOriginal: "₹1,349",
        discount: "30% off"
      },
      {
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=600&auto=format&fit=crop",
        title: "Manali Adventure Camp",
        subtitle: "Himachal Pradesh in 6 Days",
        priceFrom: "₹699",
        priceOriginal: "₹999",
        discount: "30% off"
      },
      {
        image: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?q=80&w=600&auto=format&fit=crop",
        title: "Spiti Valley Group Expedition",
        subtitle: "Himachal Pradesh in 9 Days",
        priceFrom: "₹1,199",
        priceOriginal: "₹1,699",
        discount: "29% off"
      }
    ],
    honeymoon: [
      {
        image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=600&auto=format&fit=crop",
        title: "Romantic Kashmir: Houseboat & Shikara Rides",
        subtitle: "Kashmir in 6 Days",
        priceFrom: "₹1,299",
        priceOriginal: "₹1,799",
        discount: "28% off"
      },
      {
        image: "https://images.unsplash.com/photo-1524429656589-6633a470097c?q=80&w=600&auto=format&fit=crop",
        title: "Honeymoon in Manali & Solang Valley",
        subtitle: "Himachal Pradesh in 5 Days",
        priceFrom: "₹899",
        priceOriginal: "₹1,249",
        discount: "28% off"
      },
      {
        image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=600&auto=format&fit=crop",
        title: "Starlit Nights in Spiti Valley",
        subtitle: "Himachal Pradesh in 7 Days",
        priceFrom: "₹1,099",
        priceOriginal: "₹1,499",
        discount: "27% off"
      },
      {
        image: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=600&auto=format&fit=crop",
        title: "Leh Ladakh Honeymoon Special",
        subtitle: "Ladakh in 8 Days",
        priceFrom: "₹1,499",
        priceOriginal: "₹2,099",
        discount: "29% off"
      }
    ]
  };

  const dynamicToursTrack = document.getElementById('dynamic-tours-track');
  const tabBtns = document.querySelectorAll('.tab-btn');

  function generateTourHTML(tour) {
    return `
      <a href="#" class="trip-card" style="background-image: url('${tour.image}');">
        <h3 class="card-title">${tour.title}</h3>
        <p class="card-subtitle">${tour.subtitle}</p>
        <div class="card-price-row">
          <div class="price-info">
            <span class="price-from">From ${tour.priceFrom}</span>
            <span class="price-original">${tour.priceOriginal}</span>
          </div>
          <div class="discount-badge">${tour.discount}</div>
        </div>
      </a>
    `;
  }

  function loadTours(category) {
    if (!dynamicToursTrack) return;
    const tours = toursData[category] || toursData['personal'];
    
    // Slide out left and fade out
    dynamicToursTrack.style.opacity = '0';
    dynamicToursTrack.style.transform = 'translateX(-40px)';
    dynamicToursTrack.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    
    setTimeout(() => {
      // Inject new HTML
      dynamicToursTrack.innerHTML = tours.map(generateTourHTML).join('');
      
      // Instantly move to the right side (hidden)
      dynamicToursTrack.style.transition = 'none';
      dynamicToursTrack.style.transform = 'translateX(40px)';
      
      // Force DOM reflow so the browser registers the right-side position instantly
      void dynamicToursTrack.offsetWidth;
      
      // Fade and slide in from the right to the center
      dynamicToursTrack.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      dynamicToursTrack.style.opacity = '1';
      dynamicToursTrack.style.transform = 'translateX(0)';
    }, 300);
  }

  // Add click listeners to tabs
  tabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Remove active class from all
      tabBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked
      e.target.classList.add('active');
      
      // Load corresponding data
      const category = e.target.getAttribute('data-category');
      loadTours(category);
    });
  });

  // Load initial data on startup
  if (dynamicToursTrack) {
    loadTours('personal');
  }

  // --- Dynamic Hero Slider Logic ---
  const heroSection = document.getElementById('hero-section');
  const heroVideo = document.getElementById('hero-video');
  const heroBadge = document.getElementById('hero-badge');
  const heroTitle = document.getElementById('hero-title');
  const heroSubtitle = document.getElementById('hero-subtitle');
  const heroBottomText = document.getElementById('hero-bottom-text');
  const heroHandwriting = document.getElementById('hero-handwriting');
  const heroDots = document.querySelectorAll('#hero-dots .dot');

  // Slide data (video first, so it's what visitors see on load)
  const heroSlides = [
    {
      type: 'video',
      badge: '<em>NEW EXPERIENCES</em>',
      title: 'Discover the world<br>at your own pace',
      subtitle: 'Unforgettable adventures await',
      bottomText: 'Explore hidden gems and vibrant cultures',
      handwriting: 'Start your<br>journey today'
    },
    {
      type: 'image',
      badge: '<em>PRIME DAYS</em>',
      title: 'Expertly planned trips,<br>locally inspired',
      subtitle: 'Earn up to ₹500 reward',
      bottomText: "Lock today's price — no surprise surcharges later",
      handwriting: 'The best<br>local experiences',
      image: 'url(\'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=2000&auto=format&fit=crop\')'
    },
    {
      type: 'image',
      badge: '<em>BEST OF LATIN AMERICA</em>',
      title: 'Expect the Unexpected',
      subtitle: 'Expertly planned. Crafted to amaze.',
      bottomText: 'Travel in smaller groups. Explore freely.',
      handwriting: 'The best<br>local experiences',
      image: 'url(\'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2000&auto=format&fit=crop\')'
    }
  ];

  let currentHeroSlide = 0;
  let heroAdvanceTimer = null;
  let activeHeroVideo = null;

  const heroBgTrack = document.getElementById('hero-bg-track');
  const heroSlidesNodes = document.querySelectorAll('.hero-bg-slide');
  
  let isDragging = false;
  let startX = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let slideWidth = window.innerWidth;

  function updateSlideWidth() {
    if (heroSection) slideWidth = heroSection.clientWidth;
  }
  window.addEventListener('resize', updateSlideWidth);
  updateSlideWidth();

  function setHeroSlide(index, snap = true) {
    currentHeroSlide = index;
    if (currentHeroSlide < 0) currentHeroSlide = 0;
    if (currentHeroSlide > heroSlides.length - 1) currentHeroSlide = heroSlides.length - 1;

    const slide = heroSlides[currentHeroSlide];

    // Instant text update
    if (heroBadge) heroBadge.innerHTML = slide.badge;
    if (heroTitle) heroTitle.innerHTML = slide.title;
    if (heroSubtitle) heroSubtitle.innerHTML = slide.subtitle;
    if (heroBottomText) heroBottomText.innerHTML = slide.bottomText;
    if (heroHandwriting) heroHandwriting.innerHTML = slide.handwriting;

    // Update dots
    if (heroDots.length > 0) {
      heroDots.forEach(d => d.classList.remove('active'));
      if (heroDots[currentHeroSlide]) heroDots[currentHeroSlide].classList.add('active');
    }

    if (snap) {
      prevTranslate = currentHeroSlide * -slideWidth;
      currentTranslate = prevTranslate;
      setTrackPosition();
    }
  }

  function getPositionX(e) {
    return e.clientX;
  }

  function touchStart(e) {
    if (e.target.closest('button') || e.target.closest('a') || e.target.closest('input')) return;
    
    isDragging = true;
    startX = getPositionX(e);
    clearHeroAdvance();

    if (heroBgTrack) heroBgTrack.style.transition = 'none'; // Disable transition for 1:1 drag
  }

  function touchMove(e) {
    if (!isDragging) return;
    const currentPosition = getPositionX(e);
    const diff = currentPosition - startX;
    
    // Add resistance if trying to drag past edges
    if (currentHeroSlide === 0 && diff > 0) {
       currentTranslate = prevTranslate + (diff * 0.3); // Resistance
    } else if (currentHeroSlide === heroSlides.length - 1 && diff < 0) {
       currentTranslate = prevTranslate + (diff * 0.3); // Resistance
    } else {
       currentTranslate = prevTranslate + diff;
    }
    
    setTrackPosition();
  }

  function touchEnd() {
    if (!isDragging) return;
    isDragging = false;
    
    const movedBy = currentTranslate - prevTranslate;
    
    // Snap threshold
    if (movedBy < -100 && currentHeroSlide < heroSlides.length - 1) {
      currentHeroSlide += 1;
    } else if (movedBy > 100 && currentHeroSlide > 0) {
      currentHeroSlide -= 1;
    }
    
    snapToSlide();
    scheduleHeroAdvance();
  }

  function snapToSlide() {
    prevTranslate = currentHeroSlide * -slideWidth;
    currentTranslate = prevTranslate;
    if (heroBgTrack) heroBgTrack.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)'; // Premium easing
    setTrackPosition();
    setHeroSlide(currentHeroSlide, false);
  }

  function setTrackPosition() {
    if (!heroBgTrack) return;
    
    // Move the main track
    heroBgTrack.style.transform = `translate3d(${currentTranslate}px, 0, 0)`;
    
    // Parallax logic
    heroSlidesNodes.forEach((slideNode, index) => {
      // Offset of track relative to this specific slide
      const trackOffset = currentTranslate + (index * slideWidth);
      
      // Move media in opposite direction to create depth
      const parallaxAmount = trackOffset * 0.5; // 50% speed difference
      const mediaNode = slideNode.querySelector('.hero-bg-media');
      
      if (mediaNode) {
        mediaNode.style.transform = `translate3d(${-parallaxAmount}px, 0, 0) scale(1.05)`;
        
        // Optional: crossfade opacity based on distance
        const distance = Math.abs(trackOffset);
        const opacity = 1 - (distance / slideWidth);
        mediaNode.style.opacity = Math.max(0.3, opacity); // Fade out slightly as it moves away
        
        // Add transition back to media when not dragging
        if (!isDragging) {
            mediaNode.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.6s ease';
        } else {
            mediaNode.style.transition = 'none';
        }
      }
    });
  }

  function clearHeroAdvance() {
    clearTimeout(heroAdvanceTimer);
    heroAdvanceTimer = null;
    if (activeHeroVideo) {
      activeHeroVideo.removeEventListener('ended', advanceHeroSlide);
      activeHeroVideo = null;
    }
  }

  function advanceHeroSlide() {
    currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
    snapToSlide();
  }

  function scheduleHeroAdvance() {
    clearHeroAdvance();
    const slide = heroSlides[currentHeroSlide];

    if (slide.type === 'video') {
      const videoEl = heroBgTrack ? heroBgTrack.querySelector('.hero-bg-video') : null;
      if (videoEl) {
        activeHeroVideo = videoEl;
        videoEl.currentTime = 0;
        videoEl.play().catch(() => {});
        videoEl.addEventListener('ended', advanceHeroSlide, { once: true });
        return;
      }
    }

    // Images advance after a short 2-4s pause (video handles its own timing above)
    heroAdvanceTimer = setTimeout(advanceHeroSlide, 3000);
  }

  if (heroSection) {
    updateSlideWidth();
    setHeroSlide(0, true);
    scheduleHeroAdvance();

    heroSection.addEventListener('pointerdown', touchStart);
    heroSection.addEventListener('pointermove', touchMove);
    heroSection.addEventListener('pointerup', touchEnd);
    heroSection.addEventListener('pointercancel', touchEnd);
    heroSection.addEventListener('pointerleave', touchEnd);

    if (heroBgTrack) heroBgTrack.addEventListener('dragstart', e => e.preventDefault());

    heroDots.forEach((dot, index) => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        currentHeroSlide = index;
        snapToSlide();
        scheduleHeroAdvance();
      });
    });
  }

});
