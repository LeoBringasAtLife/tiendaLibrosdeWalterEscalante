// Toggle menú móvil
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

menuToggle.addEventListener('click', function () {
  mobileMenu.classList.toggle('hidden');
});

// Toggle submenú Colección en móvil
const mobileColeccionBtn = document.getElementById('mobile-coleccion-btn');
const mobileColeccionMenu = document.getElementById('mobile-coleccion-menu');
const mobileColeccionIcon = mobileColeccionBtn?.querySelector('svg');

if (mobileColeccionBtn && mobileColeccionMenu) {
  mobileColeccionBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    mobileColeccionMenu.classList.toggle('hidden');
    if (mobileColeccionIcon) {
      mobileColeccionIcon.style.transform =
        mobileColeccionMenu.classList.contains('hidden')
          ? 'rotate(0deg)'
          : 'rotate(180deg)';
    }
  });
}

// Cerrar menú móvil al hacer click en un enlace
document.querySelectorAll('#mobile-menu a').forEach((link) => {
  link.addEventListener('click', function () {
    mobileMenu.classList.add('hidden');
  });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Manejo del formulario de suscripción
const subscriptionForm = document.getElementById('subscription-form');
const formMessage = document.getElementById('form-message');

if (subscriptionForm) {
  subscriptionForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const submitButton = this.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;

    // Deshabilitar botón y mostrar estado de carga
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';
    formMessage.classList.add('hidden');

    try {
      const response = await fetch(this.action, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json'
        }
      });

      if (response.ok) {
        // Éxito
        formMessage.textContent =
          '¡Gracias por suscribirte! Pronto recibirás nuestro contenido.';
        formMessage.className =
          'text-sm text-green-400 bg-green-900/20 px-4 py-2 rounded';
        this.reset();
      } else {
        // Error del servidor
        formMessage.textContent =
          'Hubo un error. Por favor, intenta nuevamente.';
        formMessage.className =
          'text-sm text-red-400 bg-red-900/20 px-4 py-2 rounded';
      }
    } catch (error) {
      // Error de red
      formMessage.textContent =
        'Error de conexión. Verifica tu internet e intenta nuevamente.';
      formMessage.className =
        'text-sm text-red-400 bg-red-900/20 px-4 py-2 rounded';
    } finally {
      // Restaurar botón
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }
  });
}

// Carrusel de testimonios (Multi-instance)
document.querySelectorAll('.testimonial-carousel').forEach((carousel) => {
  const track = carousel.querySelector('.testimonials-track');
  const prevButton = carousel.querySelector('.prev-testimonial');
  const nextButton = carousel.querySelector('.next-testimonial');
  const dots = carousel.querySelectorAll('.testimonial-dot');
  const pausePlayButton = carousel.querySelector('.pause-play-button');
  const pauseIcon = carousel.querySelector('.pause-icon');
  const playIcon = carousel.querySelector('.play-icon');

  let currentIndex = 0;
  const totalTestimonials = dots.length;
  let autoPlayInterval = null;
  let isPlaying = true;

  function updateCarousel() {
    const offset = -currentIndex * 100;
    track.style.transform = `translateX(${offset}%)`;

    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.remove('bg-gray-300', 'hover:bg-gray-400');
        dot.classList.add('bg-gray-900');
      } else {
        dot.classList.remove('bg-gray-900');
        dot.classList.add('bg-gray-300', 'hover:bg-gray-400');
      }
    });
  }

  function nextTestimonial() {
    currentIndex = (currentIndex + 1) % totalTestimonials;
    updateCarousel();
  }

  function prevTestimonial() {
    currentIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials;
    updateCarousel();
  }

  function startAutoPlay() {
    if (!isPlaying) {
      isPlaying = true;
      if (pauseIcon) pauseIcon.classList.remove('hidden');
      if (playIcon) playIcon.classList.add('hidden');
      autoPlayInterval = setInterval(nextTestimonial, 3000);
    }
  }

  function stopAutoPlay() {
    if (isPlaying) {
      isPlaying = false;
      if (pauseIcon) pauseIcon.classList.add('hidden');
      if (playIcon) playIcon.classList.remove('hidden');
      clearInterval(autoPlayInterval);
      autoPlayInterval = null;
    }
  }

  function toggleAutoPlay() {
    if (isPlaying) {
      stopAutoPlay();
    } else {
      startAutoPlay();
    }
  }

  // Event listeners
  if (nextButton) {
    nextButton.addEventListener('click', () => {
      stopAutoPlay();
      nextTestimonial();
      startAutoPlay();
    });
  }

  if (prevButton) {
    prevButton.addEventListener('click', () => {
      stopAutoPlay();
      prevTestimonial();
      startAutoPlay();
    });
  }

  if (pausePlayButton) {
    pausePlayButton.addEventListener('click', toggleAutoPlay);
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', function () {
      stopAutoPlay();
      currentIndex = index;
      updateCarousel();
      startAutoPlay();
    });
  });

  startAutoPlay();
});

const backToTopButton = document.getElementById('back-to-top');

if (backToTopButton) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.remove(
        'opacity-0',
        'invisible',
        'translate-y-4'
      );
    } else {
      backToTopButton.classList.add('opacity-0', 'invisible', 'translate-y-4');
    }
  });

  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
