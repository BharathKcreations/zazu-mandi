/**
 * ZAZU MANDI - Client Demo Interactive Logic
 * Vanilla JavaScript (Zero External Dependencies)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header Scroll Effect
  const header = document.getElementById('header');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Mobile Navigation Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu when a nav link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. Menu Category Filter Tabs
  const menuTabs = document.querySelectorAll('.menu-tab-btn');
  const menuCards = document.querySelectorAll('.menu-card');

  menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const selectedCategory = tab.getAttribute('data-category');

      // Update active state on buttons
      menuTabs.forEach(btn => btn.classList.remove('active'));
      tab.classList.add('active');

      // Filter cards
      menuCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (selectedCategory === 'all' || cardCategory === selectedCategory) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.35s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 4. Order Online Modal (Zero Backend)
  const orderModal = document.getElementById('orderModal');
  const openOrderModalBtn = document.getElementById('openOrderModalBtn');
  const heroOrderBtn = document.getElementById('heroOrderBtn');
  const closeOrderModalBtn = document.getElementById('closeOrderModalBtn');

  const openModal = () => {
    if (orderModal) {
      orderModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    if (orderModal) {
      orderModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (openOrderModalBtn) openOrderModalBtn.addEventListener('click', openModal);
  if (heroOrderBtn) heroOrderBtn.addEventListener('click', openModal);
  if (closeOrderModalBtn) closeOrderModalBtn.addEventListener('click', closeModal);

  // Close modal when clicking backdrop outside card
  if (orderModal) {
    orderModal.addEventListener('click', (e) => {
      if (e.target === orderModal) {
        closeModal();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && orderModal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // 5. ScrollSpy - Active Nav Link Indicator
  const sections = document.querySelectorAll('section[id], header[id]');
  const updateActiveNavLink = () => {
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
});
