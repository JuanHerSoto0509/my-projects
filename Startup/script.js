// Scroll suave al hacer clic en los enlaces del menú
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const targetId = link.getAttribute('href').slice(1);
      const targetElement = document.getElementById(targetId);
      window.scrollTo({
        top: targetElement.offsetTop - 50,
        behavior: 'smooth'
      });
    });
  });
  
  // Animación de aparición al hacer scroll
  const elements = document.querySelectorAll('.feature');
  
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, {
    threshold: 0.5
  });
  
  elements.forEach(el => {
    observer.observe(el);
  });
  