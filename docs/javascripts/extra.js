document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('a[href^="http"]').forEach(function (link) {
    if (!link.href.startsWith(window.location.origin)) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });
});

// Carousel: <div class="carousel" markdown> with one image (+ optional *caption*) per paragraph.
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.carousel').forEach(function (box) {
    var slides = Array.prototype.filter.call(box.children, function (el) { return el.querySelector('img'); });
    if (slides.length < 2) return;
    var track = document.createElement('div');
    track.className = 'carousel__track';
    slides.forEach(function (s) { s.classList.add('carousel__slide'); track.appendChild(s); });
    box.innerHTML = '';
    box.appendChild(track);
    var nav = document.createElement('div');
    nav.className = 'carousel__nav';
    var prev = document.createElement('button');
    prev.type = 'button'; prev.className = 'carousel__arrow'; prev.setAttribute('aria-label', 'Previous'); prev.textContent = '‹';
    var next = document.createElement('button');
    next.type = 'button'; next.className = 'carousel__arrow'; next.setAttribute('aria-label', 'Next'); next.textContent = '›';
    var dots = document.createElement('div');
    dots.className = 'carousel__dots';
    var i = 0;
    function show(n) {
      i = (n + slides.length) % slides.length;
      slides.forEach(function (s, k) { s.hidden = k !== i; });
      Array.prototype.forEach.call(dots.children, function (d, k) { d.setAttribute('aria-current', k === i ? 'true' : 'false'); });
    }
    slides.forEach(function (_, k) {
      var d = document.createElement('button');
      d.type = 'button'; d.className = 'carousel__dot'; d.setAttribute('aria-label', 'Slide ' + (k + 1));
      d.addEventListener('click', function () { show(k); });
      dots.appendChild(d);
    });
    prev.addEventListener('click', function () { show(i - 1); });
    next.addEventListener('click', function () { show(i + 1); });
    nav.appendChild(prev); nav.appendChild(dots); nav.appendChild(next);
    box.appendChild(nav);
    box.tabIndex = 0;
    box.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') show(i - 1);
      if (e.key === 'ArrowRight') show(i + 1);
    });
    var x0 = null;
    track.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) show(i + (dx < 0 ? 1 : -1));
      x0 = null;
    });
    show(0);
  });
});
