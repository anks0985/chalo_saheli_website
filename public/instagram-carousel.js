document.addEventListener('DOMContentLoaded', async function () {
  try {
    const response = await fetch('posts.csv');
    const text = await response.text();
    const lines = text.trim().split('\n').slice(1);
    const carousel = document.getElementById('instagram-carousel');

    const renderEmbeds = (urls) => {
      urls.forEach(url => {
        const cleanUrl = url.trim();
        const container = document.createElement('div');
        container.className = 'instagram-post';
        container.innerHTML = `
          <blockquote class="instagram-media"
            data-instgrm-permalink="${cleanUrl}"
            data-instgrm-version="14"
            style="background:#FFF; border:0; margin:1px auto; width:100%; padding:0;">
          </blockquote>
        `;
        carousel.appendChild(container);
      });
    };

    renderEmbeds(lines);

    const igScript = document.createElement('script');
    igScript.src = "https://www.instagram.com/embed.js";
    igScript.async = true;
    document.body.appendChild(igScript);

    igScript.onload = () => {
      if (window.instgrm) window.instgrm.Embeds.process();
    };

    // Auto-scroll effect (manual scrolling still works!)
    let autoScrollInterval;
    const wrapper = document.querySelector('.carousel-wrapper');

    const startAutoScroll = () => {
      autoScrollInterval = setInterval(() => {
        wrapper.scrollBy({
          left: 2, // pixels per step
          behavior: 'smooth'
        });

        // Reset to start if scrolled to the end
        if (wrapper.scrollLeft + wrapper.clientWidth >= wrapper.scrollWidth - 2) {
          wrapper.scrollTo({ left: 0, behavior: 'smooth' });
        }
      }, 20); // every 20ms = ~50fps
    };

    startAutoScroll();
    wrapper.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
    wrapper.addEventListener('mouseleave', startAutoScroll);

  } catch (error) {
    console.error("Instagram carousel error:", error);
  }
});
