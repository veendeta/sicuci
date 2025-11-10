/* Simple interactive behaviors:
   - mobile nav toggle
   - smooth scroll for in-page anchors
   - intersection observer for fade-in (.fade-up)
   - basic contact form placeholders (alerts)
   - fill footer year
*/

// Mobile nav toggles (works on each page)
function setupNav(toggleId, navId) {
  const toggle = document.getElementById(toggleId) || document.getElementById('navToggle');
  const nav = document.getElementById(navId) || document.getElementById('mainNav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    toggle.classList.toggle('open');
  });
  // keyboard accessibility
  toggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle.click(); }
  });
}

// initialize navs (IDs present on each page)
setupNav('navToggle','mainNav');
setupNav('navToggle2','mainNav2');
setupNav('navToggle3','mainNav3');

// Smooth scroll for anchor links (for same-page anchors)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Intersection observer to reveal .fade-up
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-up').forEach(el => io.observe(el));

// Basic contact forms (show friendly alert; replace with API integration as needed)
function handleForm(selector) {
  const form = document.querySelector(selector);
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = (form.querySelector('input[name="name"]') || {}).value || '';
    const email = (form.querySelector('input[type="email"]') || {}).value || '';
    const message = (form.querySelector('textarea') || {}).value || '';
    if (!name || !email || !message) {
      alert('Please fill all fields before sending.');
      return;
    }
    alert(`Thanks ${name}! We received your message and will contact you soon.`);
    form.reset();
  });
}

handleForm('#contactForm');       // home -> contact small form (if exists)
handleForm('#contactFormPage');   // contact page form

// Fill footer years on three files (if IDs exist)
const setYear = (id) => { const el = document.getElementById(id); if (el) el.textContent = new Date().getFullYear(); };
setYear('year'); setYear('year2'); setYear('year3');

