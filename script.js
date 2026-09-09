const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }));
}

const modalTriggers = document.querySelectorAll('[data-modal]');
const closeModal = modal => {
  if (!modal) return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  modal.querySelectorAll('video').forEach(v => v.pause());
};
const openModal = modal => {
  if (!modal) return;
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  modal.querySelector('.modal-close')?.focus();
  modal.querySelectorAll('video').forEach(v => v.play().catch(() => {}));
};

modalTriggers.forEach(trigger => trigger.addEventListener('click', event => {
  event.preventDefault();
  openModal(document.getElementById(trigger.dataset.modal));
}));

document.querySelectorAll('[data-close-modal]').forEach(el => el.addEventListener('click', () => closeModal(el.closest('.modal'))));

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeModal(document.querySelector('.modal.is-open'));
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
