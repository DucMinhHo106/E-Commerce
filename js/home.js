/* =====================================================
   js/home.js – Home Page Logic
   ===================================================== */
'use strict';

const HomePage = (() => {

    function renderCategories() {
        const grid = document.getElementById('catGrid');
        if (!grid) return;
        grid.innerHTML = CATEGORIES.map(c => `
      <div class="cat-card" onclick="Router.go('products',{cat:'${c.name}'})">
        <img src="${c.img}" alt="${c.name}" loading="lazy"/>
        <div class="cat-label">${c.name}</div>
      </div>`).join('');
    }

    function renderFeatured() {
        const grid = document.getElementById('featuredGrid');
        if (!grid) return;
        const featured = PRODUCTS.filter(p => p.discount).slice(0, 4);
        grid.innerHTML = featured.map(p => ProductCard.html(p)).join('');
    }

    function init() {
        renderCategories();
        renderFeatured();

        // Hero parallax subtle
        const hero = document.querySelector('.hero');
        if (hero) {
            window.addEventListener('scroll', () => {
                const y = window.scrollY;
                hero.style.backgroundPositionY = `${y * 0.3}px`;
            }, {
                passive: true
            });
        }
    }

    return {
        init
    };
})();