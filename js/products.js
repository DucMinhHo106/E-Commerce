/* =====================================================
   js/products.js – Product Card + Products Page
   ===================================================== */
'use strict';

/* ── Shared product card HTML ── */
const ProductCard = {
    html(p) {
        return `
      <div class="product-card" onclick="Router.go('detail',{id:${p.id}})">
        <div class="product-img-wrap">
          <img src="${p.images[0]}" alt="${p.name}" loading="lazy"/>
          ${p.discount ? `<span class="discount-badge">-${p.discount}%</span>` : ''}
        </div>
        <div class="product-body">
          <div class="product-name">${p.name}</div>
          <div class="product-stars">
            ${starsHTML(p.rating)}
            <span class="star-count">(${p.reviews})</span>
          </div>
          <div class="product-price">${fmt(p.price)}</div>
          ${p.oldPrice ? `<div class="product-old-price">${fmt(p.oldPrice)}</div>` : '<div class="product-old-price-placeholder"></div>'}
        </div>
        <div class="product-card-footer">
          <button class="btn btn-add-cart"
            onclick="event.stopPropagation();Cart.add(${p.id})">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            Thêm vào giỏ
          </button>
        </div>
      </div>`;
    }
};

/* ── Products Page ── */
const ProductsPage = (() => {
    let filterCat = 'Tất cả';
    let filterPrice = 'all';
    let searchQuery = '';

    function _getFilteredSorted() {
        let list = [...PRODUCTS];

        if (filterCat && filterCat !== 'Tất cả')
            list = list.filter(p => p.category === filterCat);

        if (filterPrice === 'under5') list = list.filter(p => p.price < 5000000);
        if (filterPrice === '5to10') list = list.filter(p => p.price >= 5000000 && p.price < 10000000);
        if (filterPrice === '10to20') list = list.filter(p => p.price >= 10000000 && p.price < 20000000);
        if (filterPrice === 'above20') list = list.filter(p => p.price >= 20000000);

        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            list = list.filter(p =>
                p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
        }

        const sort = document.getElementById('sortSelect') ?.value || 'default';
        if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
        if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
        if (sort === 'name-asc') list.sort((a, b) => a.name.localeCompare(b.name, 'vi'));

        return list;
    }

    function render() {
        const list = _getFilteredSorted();
        const title = (filterCat && filterCat !== 'Tất cả') ? filterCat : 'Sản Phẩm';
        const titleEl = document.getElementById('productsTitle');
        const countEl = document.getElementById('productsCount');
        if (titleEl) titleEl.textContent = title;
        if (countEl) countEl.textContent = `Tìm thấy ${list.length} sản phẩm`;

        const grid = document.getElementById('productListGrid');
        if (!grid) return;
        grid.innerHTML = list.length ?
            list.map(p => ProductCard.html(p)).join('') :
            `<p class="no-results">Không tìm thấy sản phẩm phù hợp.</p>`;

        _syncSidebar();
    }

    function _syncSidebar() {
        document.querySelectorAll('.radio-opt[data-cat]').forEach(el => {
            const active = el.dataset.cat === filterCat;
            el.classList.toggle('active', active);
            el.querySelector('.radio-dot') ?.classList.toggle('active', active);
        });
        document.querySelectorAll('.radio-opt[data-price]').forEach(el => {
            const active = el.dataset.price === filterPrice;
            el.classList.toggle('active', active);
            el.querySelector('.radio-dot') ?.classList.toggle('active', active);
        });
    }

    function _bindSidebar() {
        document.addEventListener('click', e => {
            const catOpt = e.target.closest('.radio-opt[data-cat]');
            if (catOpt && document.getElementById('page-products') ?.classList.contains('active')) {
                filterCat = catOpt.dataset.cat;
                render();
                return;
            }
            const priceOpt = e.target.closest('.radio-opt[data-price]');
            if (priceOpt && document.getElementById('page-products') ?.classList.contains('active')) {
                filterPrice = priceOpt.dataset.price;
                render();
            }
        });
    }

    function setSearch(q) {
        searchQuery = q;
    }

    function setCat(cat) {
        filterCat = cat || 'Tất cả';
    }

    function init() {
        _bindSidebar();
        const sortSel = document.getElementById('sortSelect');
        if (sortSel) sortSel.addEventListener('change', render);
    }

    function enter(params = {}) {
        if (params.cat) filterCat = params.cat;
        if (params.search !== undefined) {
            searchQuery = params.search;
            filterCat = 'Tất cả';
        }
        render();
    }

    return {
        init,
        enter,
        render,
        setSearch,
        setCat
    };
})();

document.querySelectorAll('.radio-opt').forEach(item => {
    item.addEventListener('click', () => {

        const group = item.parentElement;

        // remove active tất cả trong group
        group.querySelectorAll('.radio-opt').forEach(el => {
            el.classList.remove('active');
            el.querySelector('.radio-dot') ?.classList.remove('active');
        });

        // add active cho cái click
        item.classList.add('active');
        item.querySelector('.radio-dot') ?.classList.add('active');

        // lấy data
        const cat = item.dataset.cat;
        const price = item.dataset.price;

        if (cat) {
            ProductsPage.setCat(cat);
        }

        if (price) {
            ProductsPage.setPrice(price);
        }

        ProductsPage.render();
    });
});